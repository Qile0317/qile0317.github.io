const fs = require('fs');
const https = require('https');
const path = require('path');

// Define the URL for the raw PDF and the GitHub API for the main branch's commit
const cvUrl = 'https://raw.githubusercontent.com/Qile0317/cv/main/cv-qile-yang.pdf';
const commitApiUrl = 'https://api.github.com/repos/Qile0317/cv/commits/main';
const localFilePath = path.join(__dirname, '..', 'assets', 'cv-qile-yang.pdf');
const cvDataFilePath = path.join(__dirname, '..', '_data', 'cv-data.yml'); // Path to the YAML file

// Function to ensure the assets directory exists
function ensureDirectoryExists() {
  const dirPath = path.dirname(localFilePath);

  if (!fs.existsSync(dirPath)) {
    console.log('Assets directory does not exist. Creating it...');
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to fetch the latest commit hash from GitHub
function fetchLatestCommitHash() {
  return new Promise((resolve, reject) => {
    https.get(commitApiUrl, { headers: { 'User-Agent': 'node.js' } }, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const commitData = JSON.parse(data);
          resolve(commitData.sha); // Return commit hash (SHA)
        });
      } else {
        reject('Failed to fetch commit data');
      }
    });
  });
}

// Function to read the commit hash from the cv-data.yml file
function readCommitHashFromYaml() {
  if (fs.existsSync(cvDataFilePath)) {
    const fileContents = fs.readFileSync(cvDataFilePath, 'utf-8');
    const lines = fileContents.split('\n');
    const commitLine = lines.find(line => line.startsWith('cv-commit:'));
    if (commitLine) {
      return commitLine.split(':')[1].trim();
    }
  }
  return null;
}

// Function to store the commit hash in the cv-data.yml file
function storeCommitHashInYaml(commitHash) {
  const yamlContent = `cv-commit: ${commitHash}\n`;
  fs.writeFileSync(cvDataFilePath, yamlContent, 'utf-8');
}

// Function to check if the CV should be downloaded
async function shouldDownload() {
  try {
    // Fetch the latest commit hash from GitHub
    const latestCommitHash = await fetchLatestCommitHash();

    // Read the stored commit hash from cv-data.yml
    const storedCommitHash = readCommitHashFromYaml();

    // If the stored commit hash is the same as the latest one, and the file exists, no need to download
    if (storedCommitHash === latestCommitHash && fs.existsSync(localFilePath)) {
      console.log('CV is up-to-date. Skipping download.');
      return false; // No download needed
    }

    // If the file doesn't exist or the commit hash has changed, proceed with download
    console.log('CV file has changed or is not present. Downloading...');
    
    // Store the latest commit hash in cv-data.yml
    storeCommitHashInYaml(latestCommitHash);

    return true; // File needs to be downloaded
  } catch (error) {
    console.error('Error checking for file changes:', error);
    return false; // Fail-safe, prevent download if there's an error
  }
}

// Function to download the CV
function downloadCv() {
  https.get(cvUrl, (res) => {
    const fileStream = fs.createWriteStream(localFilePath);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log('CV downloaded successfully!');
    });
  });
}

// Main function to check if download is needed and perform the download
async function main() {
  ensureDirectoryExists(); // Ensure the assets directory exists

  const downloadNeeded = await shouldDownload();

  if (downloadNeeded) {
    downloadCv();
  }
}

// Run the script
main();
