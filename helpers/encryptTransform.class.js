const chalk = require("chalk");
const { Transform } = require("stream");

const { rotEncode, rotDecode } = require("./rot.js");

class EncryptTransform extends Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, enc, done) {
    let rot = "";

    switch (this.action) {
      case "encode":
        rot = rotEncode(chunk.toString("utf8"), this.shift);
        break;
      case "decode":
        rot = rotDecode(chunk.toString("utf8"), this.shift);
        break;
      default:
        process.stderr.write(chalk.red("✘ Erorr") + ' "Action not found :("\n');
        process.exit(1);
    }

    this.push(rot);
    done();
  }
}

module.exports = EncryptTransform;
