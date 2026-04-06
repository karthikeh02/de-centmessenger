module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './src/app',
          '@crypto': './src/crypto',
          '@network': './src/network',
          '@storage': './src/storage',
          '@ui': './src/ui',
          '@store': './src/store',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
  ],
};
