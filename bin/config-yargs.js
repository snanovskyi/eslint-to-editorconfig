module.exports = yargs => {
  yargs
    .usage(
      '$0 [config] [options]',
      'Transform configuration from ESLint to EditorConfig format',
      builder => {
        builder.positional('config', {
          describe: 'Specify ESLint config file',
          type: 'string',
        });
      }
    )
    .options({
      output: {
        alias: 'o',
        default: '.editorconfig',
        describe: 'Specify output file',
        string: true,
      },
      cwd: {
        default: process.cwd(),
        describe: 'Specify directory that should be considered as current working directory',
        string: true,
      },
      stdout: {
        boolean: true,
        default: false,
        describe: 'Print result to stdout',
      },
    })
    .help('help')
    .alias('help', 'h')
    .version()
    .alias('version', 'v');
};
