const fs = require("fs");
const getExecutedOutput = require("../utils/getExecutedOutput");
const generateFile = require("../utils/generateFile");
const path = require("path");
const os = require("os");
console.log(os.platform());

const curPath = __dirname;
const inputPath = path.join(curPath, "in.txt");
const outputPath = path.join(curPath, "out.txt");

const compileCode = async (req, res, next) => {
  try {
    const { language, code, input, checkingPath = "", evalType } = req.body;
    console.log(req.body);
    console.log({ inputPath, outputPath });
    await fs.promises.writeFile(inputPath, input);
    const filePath = await generateFile(language, code);
    await getExecutedOutput(language, filePath, inputPath, outputPath);
    const data = (await fs.promises.readFile(outputPath)).toString();
    res.json({
      status: "1",
      data: { output: data, compilation: "succesful" },
    });
  } catch (error) {
    res.status(300).send({
      status: "0",
      data: {
        compilation: "unsuccesful",
        output: "error",
        message: error.message || error,
      },
    });
  }
};

exports.compileCode = compileCode;
