var logConfigs = {
    "isRotating": true,
    "backupCount": 2,
    "rotatePeriod": "h",
    "rotateFrequency": "60",
    "logFolderPath": "./log/",
    "logFileName": "logs"
}

var serverConfigs = {
    "port": "3003"
}

module.exports = {
    log: logConfigs,
    server: serverConfigs
}