require('dotenv').config();
const mix = require('laravel-mix');
let webpack = require('webpack')

let dotenvplugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_URL: JSON.stringify(process.env.APP_URL),
    }
})

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
        },
        plugins: [
            dotenvplugin,
        ]
    });
