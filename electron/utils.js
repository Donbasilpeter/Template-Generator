const path = require('path');
const fs = require('fs-extra');
const { exec, spawn } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function extractApp(reactAppPath) {
  const appPath = path.join(__dirname, '../demo-app');
  if (fs.existsSync(reactAppPath)) {
    await fs.remove(reactAppPath);
  }
  await fs.copy(appPath, reactAppPath);
}

async function installDependencies(reactAppPath) {
  try {
    const installResult = await execPromise('npm install', { cwd: reactAppPath });
    console.log(`React app install stdout: ${installResult.stdout}`);
    if (installResult.stderr) {
      console.error(`React app install stderr: ${installResult.stderr}`);
    }
  } catch (error) {
    console.error(`Error installing React app dependencies: ${error}`);
    throw error;
  }
}

 function runBuild(reactAppPath) {
  try {
    const buildProcess = spawn('node', ['esbuild.config.js'], { cwd: reactAppPath });
    buildProcess.stdout.on('data', (data) => {
      console.log(`Build stdout: ${data}`);
    });
    buildProcess.stderr.on('data', (data) => {
      console.error(`Build stderr: ${data}`);
    });
    buildProcess.on('close', (code) => {
      console.log(`Build process exited with code ${code}`);
    });
  } catch (error) {
    console.error(`Error running build script: ${error}`);
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
  runBuild,
  createStructure
};
