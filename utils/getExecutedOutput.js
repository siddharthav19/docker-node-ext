const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const curpath = path.join(__dirname, "outputs");

if (!fs.existsSync(curpath)) {
  fs.mkdirSync(curpath, { recursive: true });
}

const getExecutedOutput = async (language, filePath, inputFile, outputFile) => {
  let executableCode = path.basename(filePath).split(".")[0];
  let executableCodePath = "";
  let command = "";
  if (language == "cpp") {
    if (os.platform() === "linux") executableCode += ".out";
    else executableCode += ".exe";
    executableCodePath = path.join(curpath, executableCode);
    command = `g++ ${filePath} -o ${executableCodePath} && cd ${curpath} && .\\${executableCode} < ${inputFile} > ${outputFile}`;
    if (os.platform() === "linux")
      command = `g++ ${filePath} -o ${executableCodePath} && cd ${curpath} && ./${executableCode} < ${inputFile} > ${outputFile}`;
  }

  if (language == "py") {
    command = `py ${filePath} < ${inputFile} > ${outputFile}`;
    if (os.platform() === "linux")
      command = `python ${filePath} < ${inputFile} > ${outputFile}`;
  }

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err)
        return reject({
          k: "hre0",
          fullmessage: stderr,
          //   .split("." + language)[1]
          //   .replace("<module>", "current code"),
        });
      if (stderr) return reject({ message: stderr, err, k: "hre1" });
      console.log(stdout);
      resolve(stdout);
    });
  });
};

module.exports = getExecutedOutput;
