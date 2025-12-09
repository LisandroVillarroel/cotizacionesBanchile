// karma.conf.js
// Proyecto: cotizacionesBanchile
// Angular 17 + Jasmine + Edge (Chromium) Headless mediante karma-edgium-launcher

const path = require('path');

module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // El builder de Angular se ocupa de empaquetado y archivos
    files: [],
    preprocessors: {},

    // Reporters
    reporters: ['progress', 'kjhtml'],
    jasmineHtmlReporter: { suppressAll: true },

    // Puertos / logging
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    // Ejecutar una sola vez (ideal para CI). En local, puedes poner autoWatch: true.
    autoWatch: false,
    singleRun: true,
    restartOnFileChange: false,

    // Plugins
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-edgium-launcher'),
    ],

    browsers: ['EdgeHeadless'],

    /**
     * Launchers personalizados para Edge.
     * - EdgeHeadless: uso local sin 'no-sandbox'.
     * - EdgeHeadlessCI: uso en contenedores/CI con flags adicionales.
     *
     * Nota: karma-edgium soporta nombres 'Edge', 'EdgeHeadless', etc.
     *       y permite custom flags vía customLaunchers.  (ver README)
     */
    customLaunchers: {
      EdgeHeadless: {
        base: 'Edge',
        flags: [
          '--headless=new',               // headless moderno
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--window-size=1280,800',
        ],
      },
      EdgeHeadlessCI: {
        base: 'Edge',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--window-size=1280,800',
          '--no-sandbox',                 // necesario si corres como root en contenedores
          '--disable-dev-shm-usage',      // estabiliza en Docker (memoria compartida)
        ],
      },
    },

    // Cobertura (opcional)
    coverageReporter: {
      dir: path.join(__dirname, './coverage/cotizacionesBanchile'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },

    // Timeouts más holgados para pipelines lentos
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,

    /**
     * (Opcional) Fijar ruta del binario de Edge:
     * Puedes definirla por variable de entorno antes de ejecutar Karma:
     *   Windows: set EDGE_BIN="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
     *   Linux:   export EDGE_BIN="/usr/bin/microsoft-edge"
     *   macOS:   export EDGE_BIN="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
     *
     * karma-edgium admite definir rutas y variantes de Edge; consulta su README.
     */
  });
};
