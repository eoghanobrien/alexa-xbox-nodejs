# Alexa XboxOn via NodeJS 4.3

Provides the code necessary for Alexa to talk to your Xbox using NodeJS and AWS Lambda.

You need to set up a lambda function, I've provided a build tool to do that automatically via Terminal.

You also need to create an Alexa Skill, [go to the Alexa Developer Console](https://developer.amazon.com/edw/home.html#/) and sign in. Once you're signed in, click the `Get Started` button under the Alexa Skills Kit. Click `Add a New Skill` and go through and fill out each field. It's easy enough to get the skill on your companion phone app from there. If you have any issues there are plenty of other tutorials on creating a skill.

Have fun.

## Installation

Make sure your user account roles and policies are in order in the IAM (Identity and Access Management) tool.

Open up port `5050` on your router, make it accessible to the public over `UDP (User Datagram Protocol)` and record your public **Xbox IP address** as an environment variable called `IP_ADDRESS` in Lambda's `Code` tab.

Power up your Xbox the usual way and find your **Xbox Live Device ID** by going to `Settings > System > Console info & updates` and looking under `Xbox Live device ID`. Record the ID as an environment variable called `LIVE_DEVICE_ID` in Lambda's `Code` tab.

Create a new credentials file `$ mkdir ~/.aws && touch ~/.aws/credentials` and add the following:

```yml
[default]
aws_access_key_id: <your_access_key_id>
aws_secret_access_key: <your_access_key_id>
aws_default_region: <your_default_region>
```

Open `gulpfile.js` in your editor, change the `lambda` and `options` variables.

```js
let params = {
  FunctionName: '<YOUR_LAMBDA_FUNCTION>',
  Role: '<YOUR_ROLE_ARN>',
  Description: "Power on your Xbox with Alexa",
  Timeout: 10
};

let options = {
  region: '<YOUR_AWS_REGION>'
};
```

See the [Gulp AWS Lambda](https://github.com/willyg302/gulp-awslambda) documentation for more info.

For fun, open up `src/index.js` and add some custom responses.

## Usage

In your terminal, run:

1. `$ yarn` or `npm install` to install the necessary modules.
2. `$ gulp build` to generate the zip file to  send to AWS Lambda.
3. `$ gulp deploy` to upload the zip file.

## Resources

- [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
- [JSHint](https://github.com/jshint/jshint)
- [Node Pre Commit](https://github.com/dwyl/learn-pre-commit)
- [Gulp](https://github.com/gulpjs/gulp)
- [Gulp Del](https://github.com/sindresorhus/del)
- [Gulp Run Sequence](https://github.com/OverZealous/run-sequence)
- [Gulp Zip](https://github.com/sindresorhus/gulp-zip)
- [Gulp AWS Lambda](https://github.com/willyg302/gulp-awslambda)
- [XboxOnOff](https://www.npmjs.com/package/xbox-onoff)
