'use strict';

const KnativeProvider = require('./provider');
const KnativeDeploy = require('./deploy');

// const KnativeProvider = require('./provider/knativeProvider');
// const KnativeDeploy = require('./deploy/knativeDeploy');
// const KnativeRemove = require('./remove/knativeRemove');
// const KnativeInvoke = require('./invoke/knativeInvoke');
// const KnativeInfo = require('./info/knativeInfo');
// const KnativeLogs = require('./logs/knativeLogs');

class KnativeIndex {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.serverless.pluginManager.addPlugin(KnativeProvider);
    this.serverless.pluginManager.addPlugin(KnativeDeploy);
  }
}


module.exports = KnativeIndex;
