/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
const Sqlquery = require('../dist/sql/v2'); // require('sql-query-node-sdk/sql/v1');
const { IamAuthenticator } = require('../dist/auth'); // require('sql-query-node-sdk/auth');

if (!process.env.SQL_API_KEY || !process.env.INSTANCE_CRN || !process.env.TARGET) {
  throw new Error(
    'You must set the environnment variables SQL_API_KEY, INSTANCE_CRN and TARGET before using the example.'
  );
}

const sqlStatement = `SELECT * FROM cos://us-geo/sql/customers.csv STORED AS CSV ORDER BY CustomerID LIMIT 50`;
let jobId;

// Create an IAM authenticator.
const authenticator = new IamAuthenticator({
  apikey: process.env.SQL_API_KEY,
});

// Construct the sqlqueryClient using the IAM authenticator.
const sqlqueryClient = new Sqlquery({
  authenticator,
  serviceUrl: `https://api.sql-query.cloud.ibm.com/v2`,
  instanceCrn: process.env.INSTANCE_CRN,
});

// Submit sql job and get the details of that job
sqlqueryClient
  .submitSqlJob({
    statement: sqlStatement,
    resultsetTarget: process.env.TARGET,
  })
  .then(response1 => {
    jobId = response1.result.job_id;
    console.log('Submit Job Details');
    console.log(JSON.stringify(response1.result, null, 2));
    console.log('----------------------------------------');
    return sqlqueryClient
      .getSqlJob({
        jobId: jobId,
      })
      .then(response2 => {
        console.log('Get Specific Job Details');
        console.log(JSON.stringify(response2.result, null, 2));
        console.log('----------------------------------------');
      });
  })
  .catch(error => console.error(error));

// list all the job for the instance
sqlqueryClient
  .listSqlJobs()
  .then(response => {
    console.log('List Jobs for the Instance');
    console.log(JSON.stringify(response.result, null, 2));
    console.log('----------------------------------------');
  })
  .catch(error => console.error(error));

// list all the catalog tables
sqlqueryClient
  .listTables()
  .then(response => {
    console.log('List all the catalog tables');
    console.log(JSON.stringify(response.result, null, 2));
    console.log('----------------------------------------');
  })
  .catch(error => console.error(error));
