module.exports = function DatadogTrace(moduleOptions) {
    const path = require('path')
    const hostAppPkg = require(path.resolve(this.options.rootDir, 'package.json'))

    let mergedOptions = {
        hostname: process.env.DD_AGENT_HOST || 'localhost',
        env: process.env.DD_ENV,
        service: process.env.DD_SERVICE,
        version: process.env.DD_VERSION,
        logInjection: process.env.DD_LOGS_INJECTION,
        logLevel: process.env.DD_LOG_LEVEL,
        clientToken: process.env.DD_CLIENT_TOKEN,
        runtimeMetrics: process.env.DD_RUNTIME_METRICS_ENABLED,
        sampleRate: process.env.DD_TRACE_SAMPLE_RATE,
        enabled: process.env.DD_TRACE_ENABLED,
        debug: process.env.DD_TRACE_DEBUG,
        ...moduleOptions,
        ...this.options.datadogTrace
    }
    require('dd-trace').init(mergedOptions)
}

module.exports.meta = require('./package.json')