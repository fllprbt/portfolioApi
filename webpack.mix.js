require('dotenv').config();
const mix = require('laravel-mix');
const webpack = require('webpack');

const {
    env: {
        NODE_ENV,
        APP_URL,
        ROUTE_REGISTER,
        ROUTE_LOGIN,
        ROUTE_RESEND_VERIFICATION,
        ROUTE_SEND_PASSWORD_RESET_EMAIL,
        ROUTE_RESET_PASSWORD
    }
} = process;

const dotenvplugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
        APP_URL: JSON.stringify(APP_URL),
        ROUTE_REGISTER: JSON.stringify(ROUTE_REGISTER),
        ROUTE_LOGIN: JSON.stringify(ROUTE_LOGIN),
        ROUTE_RESEND_VERIFICATION: JSON.stringify(ROUTE_RESEND_VERIFICATION),
        ROUTE_SEND_PASSWORD_RESET_EMAIL: JSON.stringify(
            ROUTE_SEND_PASSWORD_RESET_EMAIL
        ),
        ROUTE_RESET_PASSWORD: JSON.stringify(ROUTE_RESET_PASSWORD)
    }
});

mix.ts('resources/js/App.tsx', 'public/js')
    .options({
        hmrOptions: { host: '0.0.0.0', port: 8088 },
        processCssUrls: false
    })
    .webpackConfig({
        resolve: {
            alias: { api: path.resolve('', 'resources/js') }
        },
        plugins: [dotenvplugin]
    })
    .disableNotifications();
