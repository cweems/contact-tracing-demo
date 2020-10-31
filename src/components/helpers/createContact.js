import isMobilePhone from "validator/lib/isMobilePhone";
import { Manager } from "@twilio/flex-ui";

export default async function createContact(name, phone) {
    console.log(name, phone);
    if (isMobilePhone(phone, "en-US") === true) {
        console.log("valid contact", isMobilePhone(phone, "en-US"), phone);
        const uriName = encodeURIComponent(name);
        const uriPhone = encodeURIComponent(phone);

        const manager = Manager.getInstance();
        const token = manager.user.token;

        try {
            const response = await fetch(
                `http://localhost:3000/create-contact?name=${uriName}&phone=${uriPhone}&Token=${token}`
            );
            const json = await response.json();
            const newEntry = json.data;

            return newEntry;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        throw new Error("Invalid Contact");
    }
}
