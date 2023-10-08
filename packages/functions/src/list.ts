import { Table } from "sst/node/table"

import handler from "@may-notes/core/handler"
import dynamodb from "@may-notes/core/dynamodb"

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        // 'KeyConditionExpression' defines the condition for the query - 'userId = :userId': only return items with matching 'userId' partition key
        KeyConditionExpression: 'userId = :userId',
        // 'ExpressionAttributeValues' defines the value in the condition - ':userId': defines 'userId' to be the id of the author
        ExpressionAttributeValues: {
            ':userId': event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
        },
    }

    const result = await dynamodb.query(params)

    return JSON.stringify(result.Items)
})