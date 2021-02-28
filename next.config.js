const path = require('path');
const DOMAIN = process.env.domain;
if (!DOMAIN) {
    throw new Error(`Can't read Environment Valiable.`);
}

module.exports = {
    images: {
        path: '/_next/image',
        domains: [DOMAIN, 'grass-graph.moshimo.works'],
    },
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/blog/1',
                permanent: true,
            },
            {
                source: '/blog/post',
                destination: '/blog/1',
                permanent: true,
            },
        ]
    },
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
};
