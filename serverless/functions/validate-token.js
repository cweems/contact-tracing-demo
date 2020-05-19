const nodeFetch = require("node-fetch");
const { Base64 } = require("js-base64");

exports.handler = async function (context, event, callback) {
    const { token } = event;

    console.log("Validating request token");
    const tokenValidationApi = `https://iam.twilio.com/v1/Accounts/${context.ACCOUNT_SID}/Tokens/validate`;
    const fetchResponse = await nodeFetch(tokenValidationApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Base64.encode(
                `${context.ACCOUNT_SID}:${context.AUTH_TOKEN}`
            )}`,
        },
        body: JSON.stringify({
            token,
        }),
    });

    const tokenResponse = await fetchResponse.json();
    console.log("Token validation response properties:");
    Object.keys(tokenResponse).forEach((key) => {
        console.log(`${key}: ${tokenResponse[key]}`);
    });
    if (!tokenResponse.valid) {
        response.setStatusCode(401);
        response.setBody({
            status: 401,
            message: "Your authentication token failed validation",
            detail: tokenResponse.message,
        });
        return callback(null, response);
    } else {
        response.setStatusCode(200);
        response.setBody({
            status: 200,
            message: "Your authentication token is valid",
            detail: tokenResponse.message,
        });
    }
};
