exports.handler = function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );
    response.appendHeader("Access-Control-Allow-Methods", "POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    let client = context.getTwilioClient();
    let phoneNumber = decodeURIComponent(event.phone);

    client.messages
        .create({
            body: "Public health department: you may have been exposed to C-19",
            from: "+19123023656",
            to: phoneNumber,
        })
        .then((message) => {
            callback(null, response);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
};
