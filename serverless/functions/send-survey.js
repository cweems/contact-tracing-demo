const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    client = context.getTwilioClient();

    client.studio
        .flows(context.SURVEY_FLOW_SID)
        .executions.create({
            to: event.toPhoneNumber,
            from: "+14133233662",
        })
        .then((execution) => {
            callback(null, response);
        })
        .catch((err) => {
            response.appendHeader("Content-Type", "plain/text");
            response.setBody(err.message);
            response.setStatusCode(500);
            console.log(err.message);
            callback(null, response);
        });
});
