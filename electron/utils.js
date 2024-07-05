const path = require('path');
const fs = require('fs-extra');
const { exec,spawn } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function extractApp(app) {
  const appPath = path.join(__dirname, '../demo-app');
  const writablePath = path.join(app.getPath('userData'), 'demo-app');
  if (fs.existsSync(writablePath)) {
    await fs.remove(writablePath);
  }
  await fs.copy(appPath, writablePath);
  return writablePath;
}

async function installDependencies(reactAppPath) {
  try {
    const installResult = await execPromise('npm install', { cwd: reactAppPath });
    console.log(`React app install stdout: ${installResult.stdout}`);
    // Start the React app after installation
    if (installResult.stderr) {
      console.error(`React app install stderr: ${installResult.stderr}`);
    }
    // Start the React app after installation
    spawn('node', ['esbuild.config.js'], { cwd: reactAppPath });
  } catch (error) {
    console.error(`Error installing React app dependencies: ${error}`);
    throw error;
  }
}

function createStructure(basePath, structure) {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  for (const key in structure) {
    if (structure.hasOwnProperty(key) && key !== 'isFile' && key !== 'description' && key !== 'prompt') {
      const item = structure[key];
      const itemPath = path.join(basePath, key);

      if (item.isFile) {
        const content = `${item.code}`;
        fs.writeFileSync(itemPath, content, 'utf8');
      } else {
        createStructure(itemPath, item);
      }
    }
  }
}

module.exports = {
  extractApp,
  installDependencies,
  createStructure
};
