const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    // TODO: Add Cognito Authorization check here if not using API Gateway Authorizer
    // For now, relies on API Gateway Authorizer passing identity.

    try {
        const { resource, routeKey, rawPath, httpMethod } = event; // resource for REST/v1, routeKey/rawPath for HTTP v2
        const path = resource || routeKey || rawPath || "";
        const method = httpMethod || (event.requestContext && event.requestContext.http && event.requestContext.http.method);

        if (method === "PUT" && path.includes("bookings")) {
            try {
                const body = JSON.parse(event.body);
                const { BookingID, status } = body;

                if (!BookingID || !status) {
                    return {
                        statusCode: 400,
                        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                        body: JSON.stringify({ error: "Missing BookingID or status" }),
                    };
                }

                await ddb.send(new UpdateCommand({
                    TableName: "JessiesBookings",
                    Key: { BookingID },
                    UpdateExpression: "set #s = :s",
                    ExpressionAttributeNames: { "#s": "status" },
                    ExpressionAttributeValues: { ":s": status },
                }));

                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                    body: JSON.stringify({ message: "Booking status updated successfully" }),
                };

            } catch (err) {
                console.error("Update Error", err);
                return {
                    statusCode: 500,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                    body: JSON.stringify({ error: "Failed to update booking" }),
                };
            }
        }

        let tableName;
        if (path.includes("messages")) {
            tableName = "JessiesContacts";
        } else if (path.includes("bookings")) {
            tableName = "JessiesBookings";
        } else {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Invalid resource" })
            };
        }

        if (method !== "GET") {
            return {
                statusCode: 405, // Method Not Allowed
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Method not allowed" })
            };
        }

        const result = await ddb.send(new ScanCommand({ TableName: tableName }));

        // Sort by createdAt desc
        const items = result.Items ? result.Items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

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
