exports.handler = function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    // let validateTokenPath = Runtime.getFunctions()["validate-token"].path;
    // let validateToken = require(validateTokenPath);

    // let validationResult = validateToken(token);
    // console.log(validationResult.body.status);

    //   if (validationResult.body.status !== '200') {
    //     response = validationResult;
    //     callback(null, response);
    //   }

    let client = context.getTwilioClient();

    client.sync
        .services(context.CONTACT_SYNC_SERVICE)
        .syncMaps(context.CONTACT_SYNC_MAP)
        .syncMapItems.create({
            key: event.phone,
            data: {
                name: event.name,
                phone: event.phone,
            },
        })
        .then((syncMapItem) => {
            console.log(syncMapItem);
            response.body = JSON.stringify(syncMapItem);
            callback(null, response);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
};
