const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const client = new DynamoDBClient({ region: "eu-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { name, date, time, guests, phone, email } = body;

        if (!name || !date || !time || !guests || !phone) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Missing required fields" }),
            };
        }

        const item = {
            BookingID: randomUUID(),
            name,
            date,
            time,
            guests: parseInt(guests),
            phone,
            email,
            createdAt: new Date().toISOString(),
            status: "PENDING"
        };

        await ddb.send(new PutCommand({
            TableName: "JessiesBookings",
            Item: item,
        }));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Booking received successfully", id: item.BookingID }),
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
