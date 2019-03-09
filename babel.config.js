module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    [
      '@babel/env', {
        targets: {
          "chrome": 70,
        },
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ]
};
