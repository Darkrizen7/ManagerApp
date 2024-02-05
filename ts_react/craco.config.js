const { compilerOptions } = require('./tsconfig.json');
const path = require('path');
module.exports = {
    webpack: {
        configure: webpackConfig => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
            );

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            webpackConfig['resolve'] = {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
                fallback: {
                    "os": require.resolve("os-browserify/browser"),
                    // "fs": false,
                    // "tls": false,
                    // "net": false,
                    "path": require.resolve("path-browserify"),
                    // "zlib": false,
                    // "http": false,
                    // "https": false,
                    "stream": false,
                    "buffer": require.resolve("buffer/"),
                    "crypto": require.resolve('crypto-browserify'),
                },
                modules: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, compilerOptions.baseUrl),
                ]
            }
            return webpackConfig;
        },
    },
}
