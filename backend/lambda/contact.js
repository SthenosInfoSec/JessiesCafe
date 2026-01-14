const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const client = new DynamoDBClient({ region: "eu-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Missing required fields" }),
            };
        }

        const item = {
            ContactID: randomUUID(),
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
            status: "NEW"
        };

        await ddb.send(new PutCommand({
            TableName: "JessiesContacts",
            Item: item,
        }));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Message sent successfully", id: item.ContactID }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
