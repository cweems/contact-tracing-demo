const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(context.SENDGRID_API_KEY);

    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    const message = {
        to: context.RECIPIENT_EMAIL,
        from: "trial@trail.com",
        subject: "COVID-19 Resources",
        text: "Our records indicate you may have been exposed to COVID-19.",
    };
    sgMail
        .send(message)
        .then(() => {
            callback(null, response);
        })
        .catch((e) => {
            console.log(e);
        });
});
