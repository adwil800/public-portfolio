/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            loader: '@svgr/webpack',
            options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
                plugins: [
                {
                    name: 'preset-default',
                    params: {
                        overrides: { removeViewBox: false },
                    },
                },
                ],
            },
            }
        });

        return config;
    }, 
};

export default withNextIntl(nextConfig);
