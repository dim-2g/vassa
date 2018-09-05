'use strict';

// Пути приложения
var path = {
    base: './js/',
    lib: '../lib/',
    tpl: '../tpl/'
};

// Конфиг для require.js
require.config({
    baseUrl: path.base,
    shim: {
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: [
                'lodash',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: path.lib + 'jquery',
        lodash: path.lib + 'lodash',
        backbone: path.lib + 'backbone',
        text: path.lib + 'text',
        tpl: path.tpl
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});

// Старт приложения
require([
    'views/app'
], function (
    AppView
) {
    new AppView().render();
});