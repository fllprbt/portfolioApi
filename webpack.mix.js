const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

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
