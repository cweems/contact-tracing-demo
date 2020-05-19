require("dotenv").config();
const expect = require("chai").expect;
const nock = require("nock");
const sinon = require("sinon");

const createContact = require("../functions/create-contact").handler;
const response = require("./mock/create-contact-response");
const Twilio = require("twilio").Twilio;

beforeEach(() => {
    const client = require("twilio")(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN
    );

    const event = {};
    const callback = () => {};
    nock("https://sync.twilio.com")
        .get(
            `/v1/Services/${process.env.CONTACT_SYNC_SERVICE}/Maps/${process.env.CONTACT_SYNC_MAP}/Items`
        )
        .reply(200, response);
});

describe("Create contact tests", () => {
    it("Should create a contact", () => {
        sinon.stub(Twilio.prototype, "Response").callsFake(() => {
            "mock";
        });
        return createContact(event, context, callback).then((response) => {
            console.log(response);
            expect(typeof response).to.equal("object");
        });
    });
});
