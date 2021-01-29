/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const SqlV2 = require('../../dist/sql/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'sql_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('SqlV2_integration', () => {
  const config = readExternalSources(SqlV2.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();
  expect(config).toHaveProperty('testInstanceCrn');
  expect(config).toHaveProperty('testTableName');
  expect(config).toHaveProperty('testStatement');
  expect(config).toHaveProperty('testTarget');
  expect(config).toHaveProperty('testJobId');

  const testInstanceCrn = config.testInstanceCrn;
  const testTableName = config.testTableName;
  const testStatement = config.testStatement;
  const testTarget = config.testTarget;
  const testJobId = config.testJobId;

  const sqlService = SqlV2.newInstance({
    instanceCrn: testInstanceCrn,
  });
  expect(sqlService).not.toBeNull();

  jest.setTimeout(timeout);

  test('listTables()', async () => {
    const res = await sqlService.listTables();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('getTable()', async () => {
    const params = {
      tableName: testTableName,
    };

    const res = await sqlService.getTable(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('submitSqlJob()', async () => {
    const params = {
      statement: testStatement,
      resultsetTarget: testTarget,
    };

    const res = await sqlService.submitSqlJob(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('listSqlJobs()', async () => {
    const res = await sqlService.listSqlJobs();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('getSqlJob()', async () => {
    const params = {
      jobId: testJobId,
    };

    const res = await sqlService.getSqlJob(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
