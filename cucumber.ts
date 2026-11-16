const glueCode = {
  tags: process.env.TAGS || '@addToCart',
  import: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
};

const featurePath = {
  paths: ['features/**/*.feature'],
};

const options = {
  ...glueCode,
  ...featurePath,
  format: [
    'progress-bar',
    'html:cucumber-report/report.html',
    'json:cucumber-report/report.json',
  ],
  formatOptions: {
    snippetInterface: 'async-await',
  },
};

export = {
  default: options,
};
