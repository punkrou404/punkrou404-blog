const path = require('path');
require('dotenv').config();

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty',
            };
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, './src'),
        };
        return config;
    },
    env: {
        access_key: process.env.ACCESS_KEY,
    },
};
