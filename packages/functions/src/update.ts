import { Table } from "sst/node/table";

import dynamodb from "@may-notes/core/dynamodb";
import handler from "@may-notes/core/handler";


export const main = handler(async (event) => {
    const data = JSON.parse(event.body || '{}')

    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            // The attributes of the item to be created
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
            noteId: event?.pathParameters?.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment || null,
            ':content': data.content || null,
        },
        ReturnValues: 'ALL_NEW',
    }

    await dynamodb.update(params)

    return JSON.stringify({ status: true })
})