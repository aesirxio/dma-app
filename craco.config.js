const { DefinePlugin } = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  eslint: {
    enable: false,
  },

  webpack: {
    plugins: {
      add: [
        new DefinePlugin({
          VERSION: JSON.stringify(gitRevisionPlugin.version()),
        }),
      ],
    },
  },
};
