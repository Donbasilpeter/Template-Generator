const path = require('path');
const fs = require('fs-extra');
const { exec, spawn } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const archiver = require('archiver');
const { PassThrough } = require('stream');

/**
 * Compresses a folder into a zip file and returns it as a buffer.
 * @param {string} folderPath - The path to the folder to be compressed.
 * @returns {Promise<Buffer>} - A promise that resolves with the compressed file as a buffer.
 */
function compressFolderToBuffer(folderPath) {
  return new Promise((resolve, reject) => {
      const archive = archiver('zip', {
          zlib: { level: 9 } // Sets the compression level.
      });

      const buffers = [];
      const passthrough = new PassThrough();

      passthrough.on('data', (chunk) => buffers.push(chunk));
      passthrough.on('end', () => resolve(Buffer.concat(buffers)));
      passthrough.on('error', (err) => reject(err));

      archive.on('warning', (err) => {
          if (err.code === 'ENOENT') {
              console.warn('Archiver warning:', err);
          } else {
              reject(err);
          }
      });

      archive.on('error', (err) => reject(err));

      archive.pipe(passthrough);

      archive.glob('**/*', {
          cwd: folderPath,
          ignore: ['node_modules/**']
      });

      archive.finalize();
  });
}

// Usage example:
const folderToCompress = 'your-folder-path'; // Replace with your folder path

compressFolderToBuffer(folderToCompress)
    .then((buffer) => {
        console.log('Folder compressed successfully');
        // Do something with the buffer, e.g., save to a file later
        // fs.writeFileSync('output.zip', buffer);
    })
    .catch((error) => {
        console.error(`Error compressing folder: ${error}`);
    });


async function extractApp(reactAppPath,appPath) {
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

async function createStructure(basePath, structure) {
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
  createStructure,
  compressFolderToBuffer
};
