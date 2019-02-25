module.exports = {
  presets: [
    [
      '@babel/env', {
        targets: {
          "chrome": 70,
        },
      },
    ],
    '@babel/react'
  ],
};
