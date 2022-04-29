export interface getItemParameters {
    Key: {
        [key: string]: any
    };
    AttributesToGet?: Array<string>;
    ConsistentRead?: Boolean;
    ExpressionAttributeNames?: {
        [key: string]: any
    };
    ProjectionExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
};
export interface queryItemsParameters {
    AttributesToGet: Array<any>;
    ConditionalOperator: "AND" | "OR";
    ConsistentRead: Boolean;
    ExclusiveStartKey: {
        [key: string]: any
    };
    ExpressionAttributeNames: {
        [key: string]: any
    };
    ExpressionAttributeValues: {
        [key: string]: any
    };
    FilterExpression: string;
    IndexName: string;
    KeyConditionExpression: string;
    KeyConditions: {
        [key: string]: {
            ComparisonOperator: "EQ" | "NE" | "IN" | "LE" | "LT" | "GE" | "GT" | "BETWEEN" | "NOT_NULL" | "NULL" | "CONTAINS" | "NOT_CONTAINS" | "BEGINS_WITH"; /* required */
            AttributeValueList: Array<any>
        }
    };
    Limit: Number;
    ProjectionExpression: string;
    QueryFilter: {
        [key: string]: {
            ComparisonOperator: "EQ" | "NE" | "IN" | "LE" | "LT" | "GE" | "GT" | "BETWEEN" | "NOT_NULL" | "NULL" | "CONTAINS" | "NOT_CONTAINS" | "BEGINS_WITH"; /* required */
            AttributeValueList: Array<any>
        }
    };
    ReturnConsumedCapacity: "INDEXES" | "TOTAL" | "NONE",
    ScanIndexForward: Boolean;
    Select: "ALL_ATTRIBUTES" | "ALL_PROJECTED_ATTRIBUTES" | "SPECIFIC_ATTRIBUTES" | "COUNT";
};
export interface scanItemsParameters {
    AttributesToGet?: Array<string>;
    ConditionalOperator?: "AND" | "OR";
    ConsistentRead?: Boolean;
    ExclusiveStartKey?: {
        [key: string]: any
    };
    ExpressionAttributeNames?: {
        [key: string]: any
    };
    ExpressionAttributeValues?: {
        [key: string]: any
    };
    FilterExpression: string;
    IndexName?: string;
    Limit?: Number;
    ProjectionExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanFilter?: {
        [key: string]: {
            ComparisonOperator?: "EQ" | "NE" | "IN" | "LE" | "LT" | "GE" | "GT" | "BETWEEN" | "NOT_NULL" | "NULL" | "CONTAINS" | "NOT_CONTAINS" | "BEGINS_WITH"; /* required */
            AttributeValueList?: Array<any>
        }
    };
    Segment?: Number;
    Select?: "ALL_ATTRIBUTES" | "ALL_PROJECTED_ATTRIBUTES" | "SPECIFIC_ATTRIBUTES" | "COUNT";
    TotalSegments?: Number;
};
export interface createItemParameters {
    Item: {
        pk: string,
        sk: string,
        [key: string]: any
    };
    ConditionExpression?: string;
    ConditionalOperator?: "AND" | "OR";
    Expected?: {
        [key: string]: {
            ComparisonOperator?: "EQ" | "NE" | "IN" | "LE" | "LT" | "GE" | "GT" | "BETWEEN" | "NOT_NULL" | "NULL" | "CONTAINS" | "NOT_CONTAINS" | "BEGINS_WITH", /* required */
            AttributeValueList?: Array<any>,
            Exists?: Boolean,
            Value?: any /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */
        }
        /* '<AttributeName>': ... */
    };
    ExpressionAttributeNames?: {
        [key: string]: any
    };
    ExpressionAttributeValues?: {
        [key: string]: any
    };
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ReturnItemCollectionMetrics?: "SIZE" | "NONE";
    ReturnValues?: "NONE" | "ALL_OLD" | "UPDATED_OLD" | "ALL_NEW" | "UPDATED_NEW";
};
export interface updateItemParameters {
    Key: {
        pk: string,
        sk: string,
        [key: string]: any
    };
    AttributeUpdates?: {
        [key: string]: {
            Action: "ADD" | "PUT" | "DELETE",
            Value: any /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */
        },
        /* [key: string]: ... */
    },
    ConditionExpression?: string,
    ConditionalOperator?: "AND" | "OR";
    Expected?: {
        [key: string]: {
            ComparisonOperator?: "EQ" | "NE" | "IN" | "LE" | "LT" | "GE" | "GT" | "BETWEEN" | "NOT_NULL" | "NULL" | "CONTAINS" | "NOT_CONTAINS" | "BEGINS_WITH", /* required */
            AttributeValueList?: Array<any>,
            Exists?: Boolean,
            Value?: any /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */
        }
        /* [key: string]: ... */
    },
    ExpressionAttributeNames: {
        [key: string]: any
    };
    ExpressionAttributeValues: {
        [key: string]: any
    };
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ReturnItemCollectionMetrics?: "SIZE" | "NONE";
    ReturnValues?: "NONE" | "ALL_OLD" | "UPDATED_OLD" | "ALL_NEW" | "UPDATED_NEW";
    UpdateExpression: string
};