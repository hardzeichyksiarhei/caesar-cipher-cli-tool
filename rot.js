#!/usr/bin/env node

const stream = require("stream");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const program = require("commander");
const pckg = require("./package.json");

const Validator = require("./helpers/validator.class");
const EncryptTransform = require("./helpers/encryptTransform.class");

const pipeline = util.promisify(stream.pipeline);
const { log, info } = console;
const errorMessage = chalk.red.bold("✘ Erorr");
const successMessage = chalk.green.bold("✔ Successful");
const codeMessage = chalk.yellow.bold("Code");

const actionHandler = async () => {
  let { shift, input, output, action } = program.opts();

  /* Validation */
  if (!Validator.isInteger(shift)) {
    process.stderr.write(`${errorMessage} "Shift is not integer :("\n`);
    process.exit(1);
  }
  if (!Validator.isIn(action, ["encode", "decode"])) {
    process.stderr.write(
      `${errorMessage} \"Action must be included in the given list ['encode', 'decode'] :(\"\n`
    );
    process.exit(1);
  }

  Validator.isEmpty(input) &&
    info(
      chalk.white(
        "Input text [press ENTER to encode/decode | press CTRL + C to exit]:"
      )
    );

  try {
    await pipeline(
      !Validator.isEmpty(input) ? fs.createReadStream(input) : process.stdin,
      new EncryptTransform(shift, action),
      !Validator.isEmpty(output) ? fs.createWriteStream(output) : process.stdout
    );

    log(`${successMessage} text ${action}d`);
  } catch (e) {
    process.stderr.write(`${errorMessage} ${e.message}\n`);
    process.exit(1);
  }
};

process.stdin.setEncoding("utf8");
process.on("exit", (code) => log(`${codeMessage} ${code}`));
process.on("SIGINT", () => {
  process.exit(0);
});

program.storeOptionsAsProperties(false).version(pckg.version);

program
  .requiredOption("-s, --shift <num>", "A shift", parseInt)
  .requiredOption("-a --action <action>", "An action encode/decode")
  .option("-i, --input <filename>", "An input file")
  .option("-o --output <filename>", "An output file")
  .action(actionHandler);

program.parse(process.argv);
