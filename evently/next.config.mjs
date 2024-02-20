import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // modify the config
        config.cache = {
            type: 'filesystem',
            cacheDirectory: path.resolve('.temp_cache'),
        };

        // Important: return the modified config
        return config;
    },
};

export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {};



// export default nextConfig;
