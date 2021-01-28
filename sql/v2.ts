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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.24.0-fac1d4cc-20210108-162022
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * SQL Query is a stateless service for analyzing rectangular data stored in IBM Cloud Object Store using ANSI SQL.
 */

class SqlV2 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.sql-query.cloud.ibm.com/v2';
  static DEFAULT_SERVICE_NAME: string = 'sql';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SqlV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {SqlV2}
   */

  public static newInstance(options: UserOptions): SqlV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SqlV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** The cloud resource name (CRN) of the SQL query service instance. */
  instanceCrn: string;

  /**
   * Construct a SqlV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.instanceCrn - The cloud resource name (CRN) of the SQL query service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SqlV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['instanceCrn'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SqlV2.DEFAULT_SERVICE_URL);
    }
    this.instanceCrn = options.instanceCrn;
  }

  /*************************
   * catalog
   ************************/

  /**
   * List catalog tables.
   *
   * Retrieve a list of the first 100 tables that are defined for the given instance in the catalog.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SqlV2.Response<SqlV2.TableList>>}
   */
  public listTables(params?: SqlV2.ListTablesParams): Promise<SqlV2.Response<SqlV2.TableList>> {
    const _params = Object.assign({}, params);

    const query = {
      'instance_crn': this.instanceCrn
    };

    const sdkHeaders = getSdkHeaders(SqlV2.DEFAULT_SERVICE_NAME, 'v2', 'listTables');

    const parameters = {
      options: {
        url: '/tables',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get information about a specific catalog table.
   *
   * Returns information about the specified catalog table.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.tableName - Name of the catalog table for which information is to be retrieved. Table names
   * are case-insensitive and must only contain alphabetic and numeral characters, and underscore (_).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SqlV2.Response<SqlV2.TableInformation>>}
   */
  public getTable(params: SqlV2.GetTableParams): Promise<SqlV2.Response<SqlV2.TableInformation>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['tableName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'instance_crn': this.instanceCrn
    };

    const path = {
      'table_name': _params.tableName
    };

    const sdkHeaders = getSdkHeaders(SqlV2.DEFAULT_SERVICE_NAME, 'v2', 'getTable');

    const parameters = {
      options: {
        url: '/tables/{table_name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * sQLJobs
   ************************/

  /**
   * Run an SQL job.
   *
   * Runs an SQL job using the *IBM Cloud SQL Query* service and stores the result in a new CSV data set in *IBM Cloud
   * Object Storage*. The `FROM` clause references rectangular data that is stored in a Parquet, CSV, or JSON file in
   * *IBM Cloud Object Storage*. Click <a
   * href="https://console.bluemix.net/docs/services/sql-query/sql-query.html#overview">here</a> for more information.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.statement - This is the SQL query to be submitted. The table names specified in its FROM
   * clause must correspond to files in one or more *IBM Cloud Object Storage* instances. The INTO clause of the query
   * indicates the endpoint, bucket, and (optionally) subfolder in *IBM Cloud Object Storage* in which the query result
   * is to be stored. Within the specified target, each result is stored in a separate subfolder with a name that
   * indicates the job ID. The job ID of a query is returned by the GET endpoint.
   * @param {string} [params.resultsetTarget] - This field provides an alternative way to specify the target URI for a
   * query. It is supported to preserve backward compatibility and will be removed in a future API version. Use the INTO
   * clause of the SQL query to specify the target URI instead.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SqlV2.Response<SqlV2.SqlJobInfoShort>>}
   */
  public submitSqlJob(params: SqlV2.SubmitSqlJobParams): Promise<SqlV2.Response<SqlV2.SqlJobInfoShort>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['statement'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'statement': _params.statement,
      'resultset_target': _params.resultsetTarget
    };

    const query = {
      'instance_crn': this.instanceCrn
    };

    const sdkHeaders = getSdkHeaders(SqlV2.DEFAULT_SERVICE_NAME, 'v2', 'submitSqlJob');

    const parameters = {
      options: {
        url: '/sql_jobs',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get information about recent SQL jobs.
   *
   * Returns information about recently submitted SQL jobs.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SqlV2.Response<SqlV2.SqlJobInfoList>>}
   */
  public listSqlJobs(params?: SqlV2.ListSqlJobsParams): Promise<SqlV2.Response<SqlV2.SqlJobInfoList>> {
    const _params = Object.assign({}, params);

    const query = {
      'instance_crn': this.instanceCrn
    };

    const sdkHeaders = getSdkHeaders(SqlV2.DEFAULT_SERVICE_NAME, 'v2', 'listSqlJobs');

    const parameters = {
      options: {
        url: '/sql_jobs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get information about a specific SQL job.
   *
   * Returns information about the specified SQL job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - ID of the SQL job for which information is to be retrieved. This ID is returned when
   * an SQL job is submitted, and when information about recently submitted SQL jobs is requested.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SqlV2.Response<SqlV2.SqlJobInfoFull>>}
   */
  public getSqlJob(params: SqlV2.GetSqlJobParams): Promise<SqlV2.Response<SqlV2.SqlJobInfoFull>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['jobId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'instance_crn': this.instanceCrn
    };

    const path = {
      'job_id': _params.jobId
    };

    const sdkHeaders = getSdkHeaders(SqlV2.DEFAULT_SERVICE_NAME, 'v2', 'getSqlJob');

    const parameters = {
      options: {
        url: '/sql_jobs/{job_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace SqlV2 {

  /** Options for the `SqlV2` constructor. */
  export interface Options extends UserOptions {

    /** The cloud resource name (CRN) of the SQL query service instance. */
    instanceCrn: string;
  }

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listTables` operation. */
  export interface ListTablesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTable` operation. */
  export interface GetTableParams {
    /** Name of the catalog table for which information is to be retrieved. Table names are case-insensitive and
     *  must only contain alphabetic and numeral characters, and underscore (_).
     */
    tableName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `submitSqlJob` operation. */
  export interface SubmitSqlJobParams {
    /** This is the SQL query to be submitted. The table names specified in its FROM clause must correspond to files
     *  in one or more *IBM Cloud Object Storage* instances. The INTO clause of the query indicates the endpoint,
     *  bucket, and (optionally) subfolder in *IBM Cloud Object Storage* in which the query result is to be stored.
     *  Within the specified target, each result is stored in a separate subfolder with a name that indicates the job
     *  ID. The job ID of a query is returned by the GET endpoint.
     */
    statement: string;
    /** This field provides an alternative way to specify the target URI for a query. It is supported to preserve
     *  backward compatibility and will be removed in a future API version. Use the INTO clause of the SQL query to
     *  specify the target URI instead.
     */
    resultsetTarget?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSqlJobs` operation. */
  export interface ListSqlJobsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSqlJob` operation. */
  export interface GetSqlJobParams {
    /** ID of the SQL job for which information is to be retrieved. This ID is returned when an SQL job is
     *  submitted, and when information about recently submitted SQL jobs is requested.
     */
    jobId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Information about a table column. */
  export interface ColumnInformation {
    /** The name of the column. */
    name: string;
    /** The data type of the column. */
    type: string;
    /** Whether the column may contain NULL values. */
    nullable?: boolean;
  }

  /** Full information about an SQL job, including output or error information. */
  export interface SqlJobInfoFull {
    /** Identifier for an SQL job. */
    job_id: string;
    /** Execution status of an SQL job. */
    status: string;
    /** ID of the user who submitted an SQL job. */
    user_id: string;
    /** Timestamp indicating when an SQL job was accepted by the service. */
    submit_time: string;
    /** The SQL query that the job processes. */
    statement: string;
    /** The service plan id of the instance. */
    plan_id?: string;
    /** Format of the query result. */
    resultset_format?: string;
    /** A URI that indicates where the query result is stored. This URI can be used as input for another SQL query.
     *  The result comprises all objects that have a name with this URI as its prefix.
     */
    resultset_location?: string;
    /** Timestamp indicating when the job finished processing. */
    end_time?: string;
    /** Number of rows returned. */
    rows_returned?: number;
    /** Number of rows read. */
    rows_read?: number;
    /** Number of bytes read. */
    bytes_read?: number;
    /** Number of objects skipped using index management.(Optional). */
    objects_skipped?: number;
    /** Number of objects qualified using index management.(Optional). */
    objects_qualified?: number;
    /** An error that was encountered while processing the job. */
    error?: string;
    /** Detailed information about the error. */
    error_message?: string;
    /** Suggests possible optimizations for a query. */
    hints?: string[];
  }

  /** List of information about SQL jobs. */
  export interface SqlJobInfoList {
    /** The SQL jobs. */
    jobs: SqlJobInfoShort[];
  }

  /** Abridged information about an SQL job, including its identifier and processing status. */
  export interface SqlJobInfoShort {
    /** Identifier for an SQL job. */
    job_id: string;
    /** Execution status of an SQL job. */
    status: string;
    /** ID of the user who submitted an SQL job. */
    user_id?: string;
    /** Timestamp indicating when an SQL job was accepted by the service. */
    submit_time?: string;
    /** Boolean indicating when an SQL job has an improvement hint. */
    has_hints?: boolean;
  }

  /** Detailed information about a catalog table. */
  export interface TableInformation {
    /** The name of a catalog table. */
    name: string;
    /** The type of a catalog table (for example, "TABLE" or "VIEW"). */
    type: string;
    /** The columns of the table. */
    columns: ColumnInformation[];
  }

  /** List of catalog tables. */
  export interface TableList {
    /** The table names. */
    tables: string[];
    /** Metadata about the returned tables. */
    tables_metadata: TableMetadata[];
  }

  /** Short metadata about a catalog table. */
  export interface TableMetadata {
    /** The name of a catalog table. */
    name: string;
    /** The type of a catalog table (for example, "TABLE" or "VIEW"). */
    type: string;
  }

}

export = SqlV2;
