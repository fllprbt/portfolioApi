const mix = require('laravel-mix');

mix.ts('resources/js/app.tsx', 'public/js')
    .options({
        hmrOptions: { host: '0.0.0.0', port: 8088 },
        processCssUrls: false
    })
    .webpackConfig({
        resolve: {
            alias: { api: path.resolve(__dirname, 'resources/js') }
        }
    });
