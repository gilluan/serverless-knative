'use strict';

// create a folder deployment
//  ######################

// in folder deployment, create a file app.js
//  ######################
// const express = require("express");
// const app = express();

// app.get("/", function(req, res) {
//   console.log("Hello world received a request.");

//   const target = process.env.TARGET || "World";
//   res.send("Hello " + target + "!");
// });

// const port = process.env.PORT || 8080;
// app.listen(port, function() {
//   console.log("Hello world listening on port", port);
// });

//  Create a start command
//  ######################
//  {
//   "name": "[fn_name]",
//   "version": "1.0.0",
//   "description": "",
//   "main": "app.js",
//   "scripts": {
//     "start": "node app.js"
//   },
//   "author": "",
//   "license": "Apache-2.0"
// }

//  In the deployment folder, create Dockerfile
//  ##########################################
//  # Use the official Node 8 image.
//  # https://hub.docker.com/_/node
//  FROM node:8
 
//  # Create and change to the app directory.
//  WORKDIR /usr/src/app
 
//  # Copy application dependency manifests to the container image.
//  # A wildcard is used to ensure both package.json AND package-lock.json are copied.
//  # Copying this separately prevents re-running npm install on every code change.
//  COPY package*.json ./
 
//  # Install production dependencies.
//  RUN npm install --only=production
 
//  # Copy local code to the container image.
//  COPY . .
 
//  # Configure and document the service HTTP port.
//  ENV PORT 8080
//  EXPOSE $PORT
 
//  # Run the web service on container startup.
//  CMD [ "npm", "start" ]


// * Create a service[fn_name].yaml

// apiVersion: serving.knative.dev/v1alpha1
// kind: Service
// metadata:
//   name: [fn_name]
//   namespace: default
// spec:
//   runLatest:
//     configuration:
//       revisionTemplate:
//         spec:
//           container:
//             image: docker.io/{username}/[fn_name]
//             env:
//               - name: TARGET
//                 value: "Node.js Sample v1"

// * Building a file app

// # Build the container on your local machine
// > docker build -t {username}/[fn_name] .

// # Push the container to docker registry
// > docker push {username}/[fn_name]

// * Apply yaml file

// > kubectl apply --filename service-[fn_name].yaml

// * Get a ip address for your service
// > kubectl get svc knative-ingressgateway --namespace istio-system

// * Get the URL for your service
// > kubectl get ksvc [fn_name]  --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain

// * Removing the app deployment

// > kubectl delete --filename service-[fn_name].yaml




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
