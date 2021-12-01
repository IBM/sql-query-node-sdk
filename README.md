[![Build Status](https://travis-ci.com/IBM/sql-query-node-sdk.svg?branch=main)](https://travis-ci.com/IBM/sql-query-node-sdk)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
<!--
[![npm-version](https://img.shields.io/npm/v/IBM/sql-query-node-sdk.svg)](https://www.npmjs.com/package/sql-query-sdk)
-->
# SQL Query Node.js SDK
The IBM Cloud SqlQuery Node SDK allows developers to programmatically interact with SQL Query.

Disclaimer: this SDK is being released initially as a **pre-release** version.
Changes might occur which impact applications that use this SDK.

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud SQL Query Node.js SDK allows developers to programmatically interact with the following service.

Service Name | Import Path
--- | ---
[SQL Query](https://cloud.ibm.com/apidocs/sql-query) | sql-query-sdk/sql/v2

## Prerequisites
* You need an [IBM Cloud][ibm-cloud-onboarding] account.
* **Node.js >=10**: This SDK is tested with Node.js versions 10 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install @ibm-cloud/ibm-sql-query-sdk
```

## Using the SDK

```
const Sqlquery = require('@ibm-cloud/ibm-sql-query-sdk/sql/v2');
const { IamAuthenticator } =require('@ibm-cloud/ibm-sql-query-sdk/auth');

// Create an IAM authenticator.
const authenticator = new IamAuthenticator({
  apikey: <Your api key>,
});

// Set up the client.
const sqlqueryClient = new Sqlquery({
  authenticator,
  serviceUrl: `https://api.sql-query.cloud.ibm.com/v2`,
  instanceCrn: <Your sql query instance crn>,

// ...
});
```

Example and how to run it are available in the
[example](https://github.com/IBM/sql-query-node-sdk/tree/main/example) folder.

For general SDK usage information, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/sql-query-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).
