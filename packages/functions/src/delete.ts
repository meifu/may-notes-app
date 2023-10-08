import dynamodb from "@may-notes/core/dynamodb";
import handler from "@may-notes/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event?.pathParameters?.id, // The id of the note from path
        },
    }

    await dynamodb.delete(params)

    return JSON.stringify({ status: true })
})