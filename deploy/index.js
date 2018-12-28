'use strict';


class KnativeDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('knative');

    this.commands = {
        deploy: {
          usage: 'Deploy your function in k8s',
          lifecycleEvents: [
            'hello',
            'world',
          ],
          options: {
            message: {
              usage:
                'Specify the message you want to deploy '
                + '(e.g. "--message \'My Message\'" or "-m \'My Message\'")',
              required: true,
              shortcut: 'm',
            },
          },
        },
      };
  
       this.hooks = {
        'before:deploy:hello': this.beforeWelcome.bind(this),
        'deploy:world': this.displayHelloMessage.bind(this),
        'after:deploy:world': this.afterHelloWorld.bind(this),
      };
  }

  beforeWelcome() {
    this.serverless.cli.log('Deploy works!');
  }

  
   displayHelloMessage() {
    this.serverless.cli.log(`${this.options.message}`);
  }

   afterHelloWorld() {
    this.serverless.cli.log('Deployed Successful!');
  }
}

module.exports = KnativeDeploy;
