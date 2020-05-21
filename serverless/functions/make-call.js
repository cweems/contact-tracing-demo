exports.handler = function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    let client = context.getTwilioClient();
    let phoneNumber = decodeURIComponent(event.phone);

    client.calls
        .create({
            url:
                "https://handler.twilio.com/twiml/EH0cec93170ee753443df16d8ce2baf140",
            to: phoneNumber,
            from: "+19123023656",
        })
        .then((call) => {
            console.log(call.sid);
            callback(null, response);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
};
