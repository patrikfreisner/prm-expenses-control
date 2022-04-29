import { AxiosError, AxiosResponse } from "axios";
import { getLastMonth, getNextMonth } from "../Services/DateTime/DateTimeHandler";
import { createItem, deleteItem, getItem, scanItems, updateItem } from "../Services/InvokeAWS/InvokeBaseDynamoDBAPI";

test('time calculation is OK on Year change', () => {
    var _thDate = new Date();
    _thDate.setDate(1);
    _thDate.setMonth(0);

    expect(getLastMonth(_thDate).getMonth()).toEqual(11);
    expect(getNextMonth(_thDate).getMonth()).toEqual(1);
});

test('time calculation is OK on February', () => {
    var _thDate = new Date();
    _thDate.setDate(31);
    _thDate.setMonth(3);

    expect(getLastMonth(_thDate).getMonth()).toEqual(2);
    expect(getNextMonth(_thDate).getMonth()).toEqual(4);
});

test("create item on AWS DynamoDB successfully", async () => {
    await createItem("PRMDB001", {
        Item: {
            pk: "NO_TABLE#0000000000",
            sk: "NO_TABLE_SK#0000000000",
            newValue: "dsadsaokfwqpokepwoq"
        },
        Expected: {
            "pk": {
                Exists: false
            },
            "sk": {
                Exists: false
            }
        }
    }).then((response: AxiosResponse<any>) => {
        // response.data startsWith 'Created item'
        expect(response.data).toStrictEqual({});
    });
});

test("put don't allow to create duplicated item on AWS DynamoDB", async () => {
    await createItem("PRMDB001", {
        Item: {
            pk: "NO_TABLE#0000000000",
            sk: "NO_TABLE_SK#0000000000",
            newValue: "dsadsaokfwqpokepwoq"
        },
        Expected: {
            "pk": {
                Exists: false //
            },
            "sk": {
                Exists: false
            }
        }
    }).catch((error: AxiosError<any>) => {
        // error.response?.data.message equal 'The conditional request failed'
        expect(error.response?.data.message).toEqual("The conditional request failed");
    });
});

test("get item on AWS DynamoDB successfully", async () => {
    await getItem("PRMDB001", {
        Key: {
            pk: "NO_TABLE#0000000000",
            sk: "NO_TABLE_SK#0000000000"
        }
    }).then((response: AxiosResponse<any>) => {
        expect(response.data).toStrictEqual({
            Item: {
                pk: "NO_TABLE#0000000000",
                sk: "NO_TABLE_SK#0000000000",
                newValue: "dsadsaokfwqpokepwoq"
            }
        });
    });
});

test("update item on AWS DynamoDB Successfully", async () => {
    updateItem("PRMDB001", {
        Key: {
            pk: "NO_TABLE#0000000000",
            sk: "NO_TABLE_SK#0000000000",
        },
        ConditionExpression: 'pk = :pk and sk = :sk',
        ExpressionAttributeNames: {
            "#l": "newValue"
        },
        ExpressionAttributeValues: {
            ":pk": "NO_TABLE#0000000000",
            ":sk": "NO_TABLE_SK#0000000000",
            ":v": "novo valor"
        },
        UpdateExpression: "set #l = :v",
        ReturnValues: 'UPDATED_NEW'
    }).then((response: AxiosResponse<any>) => {
        expect(response.data).toStrictEqual({
            "Attributes": {
                "newValue": "novo valor"
            }
        });
    });
});

test("scan items on AWS DynamoDB Successfully", async () => {
    await scanItems("PRMDB001", {
        FilterExpression: "sk = :sk",
        ExpressionAttributeValues: {
            ":sk": "NO_TABLE_SK#0000000000"
        }
    }).then((response: AxiosResponse<any>) => {
        let data = response.data;
        // ScannedCount can change based on database growth
        delete data.ScannedCount;
        // newValue is not trusted as a valid test because all tests runs asynchronously
        delete data.Items[0].newValue;
        expect(response.data).toStrictEqual({
            Items: [
                {
                    pk: "NO_TABLE#0000000000",
                    sk: "NO_TABLE_SK#0000000000"
                }
            ],
            "Count": 1,
        });
    });
});

test("Delete item on AWS DynamoDB Successfully", async () => {
    await deleteItem("PRMDB001", "NO_TABLE#0000000000", "NO_TABLE_SK#0000000000")
        .then((response: AxiosResponse) => {
            expect(response.data).toEqual("Deleted item NO_TABLE#0000000000 NO_TABLE_SK#0000000000");
        });
});