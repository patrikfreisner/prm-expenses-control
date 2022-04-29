import axios, { AxiosResponse } from "axios";
import { createItemParameters, getItemParameters, queryItemsParameters, scanItemsParameters, updateItemParameters } from "./InterfaceDynamoDBAPIs";

export const API_BASE_URL = "https://n1ecug9pmk.execute-api.us-east-1.amazonaws.com/V1";

export async function getItem(table: string, resourceData: getItemParameters): Promise<AxiosResponse<any>> {
    // ------ AWS 'get' function parameters
    // ////// TableName is overwrited by API
    return axios.post(API_BASE_URL + "/" + table + "/getItem", resourceData);
}

export async function queryItems(table: string, resourceData: queryItemsParameters): Promise<AxiosResponse<any>> {
    // ------ AWS 'query' function parameters
    // ////// TableName is overwrited by API
    return axios.post(API_BASE_URL + "/" + table + "/queryItems", resourceData);
}

export async function scanItems(table: string, resourceData: scanItemsParameters): Promise<AxiosResponse<any>> {
    _apiUsageWarn();
    // ------ AWS 'scan' function parameters
    // ////// TableName is overwrited by API
    // ////// scan is very expensive to use, try to avoid it!

    return axios.post(API_BASE_URL + "/" + table + "/scanItems", resourceData);
}

export async function createItem(table: string, resourceData: createItemParameters): Promise<AxiosResponse<any>> {
    // ------ AWS 'put' function parameters
    // ////// TableName is overwrited by API

    return axios.post(API_BASE_URL + "/" + table + "/createItem", resourceData);
}

export async function updateItem(table: string, resourceData: updateItemParameters): Promise<AxiosResponse<any>> {
    // ------ AWS 'update' function parameters
    // ------ TableName is overwrited by API

    return axios.put(API_BASE_URL + "/" + table + "/updateItem", resourceData);
}

export async function deleteItem(table: string, pk: string, sk: string): Promise<AxiosResponse<any>> {
    // ------ AWS 'delete' function parameters
    // Key: { /* required */
    //   '<AttributeName>': someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
    //   /* '<AttributeName>': ... */
    // },
    // TableName: 'STRING_VALUE', /* required */
    // ConditionExpression: 'STRING_VALUE',
    // ConditionalOperator: AND | OR,
    // Expected: {
    //   '<AttributeName>': {
    //     AttributeValueList: [
    //       someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
    //       /* more items */
    //     ],
    //     ComparisonOperator: EQ | NE | IN | LE | LT | GE | GT | BETWEEN | NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH,
    //     Exists: true || false,
    //     Value: someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */
    //   },
    //   /* '<AttributeName>': ... */
    // },
    // ExpressionAttributeNames: {
    //   '<ExpressionAttributeNameVariable>': 'STRING_VALUE',
    //   /* '<ExpressionAttributeNameVariable>': ... */
    // },
    // ExpressionAttributeValues: {
    //   '<ExpressionAttributeValueVariable>': someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
    //   /* '<ExpressionAttributeValueVariable>': ... */
    // },
    // ReturnConsumedCapacity: INDEXES | TOTAL | NONE,
    // ReturnItemCollectionMetrics: SIZE | NONE,
    // ReturnValues: NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW

    return axios.delete(API_BASE_URL + "/" + table + "/deleteItem", { params: { pk, sk } });
}

function _apiUsageWarn() {
    if (process.env.NODE_ENV !== "production") {
        console.warn(
            "#### AWS REST API USAGE WARN!",
            "\nMessage: 'scan' method was used in a request, we recommend to avoid using this function to avoid low performance and highly cost on AWS Infraestructure."
        );
    }
}