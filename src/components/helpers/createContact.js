import isMobilePhone from "validator/lib/isMobilePhone";

export default async function createContact(name, phone) {
    console.log(name, phone);
    if (isMobilePhone(phone, "en-US") === true) {
        console.log("valid contact", isMobilePhone(phone, "en-US"), phone);
        const uriName = encodeURIComponent(name);
        const uriPhone = encodeURIComponent(phone);

        try {
            const response = await fetch(
                `http://localhost:3000/create-contact?name=${uriName}&phone=${uriPhone}`
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
