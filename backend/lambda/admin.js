const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    // TODO: Add Cognito Authorization check here if not using API Gateway Authorizer
    // For now, relies on API Gateway Authorizer passing identity.

    try {
        const { resource, routeKey, rawPath } = event; // resource for REST/v1, routeKey/rawPath for HTTP v2
        const path = resource || routeKey || rawPath || "";

        let tableName;
        if (path.includes("messages")) {
            tableName = "JessiesContacts";
        } else if (path.includes("bookings")) {
            tableName = "JessiesBookings";
        } else {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Invalid resource" })
            };
        }

        const result = await ddb.send(new ScanCommand({ TableName: tableName }));

        // Sort by createdAt desc
        const items = result.Items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(items),
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
