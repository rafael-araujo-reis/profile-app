const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { share } = require('@angular-architects/module-federation/webpack');

module.exports = {
  output: {
    uniqueName: 'profileApp',
    publicPath: 'auto',
    clean: true,
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'profileApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/app/profile/profile.module.ts',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      }),
    }),
  ],
  mode: 'production',
  devtool: false,
};
