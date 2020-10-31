const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    let client = context.getTwilioClient();
    console.log(decodeURIComponent(event.key));

    client.sync
        .services(context.CONTACT_SYNC_SERVICE)
        .syncMaps(context.CONTACT_SYNC_MAP)
        .syncMapItems(decodeURIComponent(event.key))
        .remove()
        .then((syncMapItem) => {
            response.body = JSON.stringify(syncMapItem);
            callback(null, response);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
});
