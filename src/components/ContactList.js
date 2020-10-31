import * as React from "react";
import { Actions, Manager } from "@twilio/flex-ui";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";

import formatPhoneNumber from "./helpers/formatPhoneNumber";

import {
    Phone,
    Voicemail,
    Sms,
    Email,
    DeleteForever,
} from "@material-ui/icons";

export default class ContactList extends React.Component {
    constructor() {
        super();

        this.state = {
            contacts: [],
        };

        const manager = Manager.getInstance();
        this.token = manager.user.token;
        this.serviceBaseUrl = "http://localhost:3000";
        this.clickToDial = this.clickToDial.bind(this);
        this.clickToSendVoiceAlert = this.clickToSendVoiceAlert.bind(this);
        this.clickToSendSMS = this.clickToSendSMS.bind(this);
        this.clickToSendEmail = this.clickToSendEmail.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    clickToDial(destinationNumber) {
        Actions.invokeAction("StartOutboundCall", {
            destination: destinationNumber,
        });
    }

    async clickToSendVoiceAlert(destinationNumber) {
        try {
            await fetch(
                `${this.serviceBaseUrl}/make-call?phone=${encodeURIComponent(
                    destinationNumber
                )}&Token=${this.token}`
            );
        } catch (error) {
            console.log(error);
            this.setState({
                error,
            });
        }
    }

    async clickToSendSMS(destinationNumber) {
        try {
            await fetch(
                `${this.serviceBaseUrl}/send-sms?phone=${encodeURIComponent(
                    destinationNumber
                )}&Token=${this.token}`
            );
        } catch (error) {
            console.log(error);
            this.setState({
                error,
            });
        }
    }

    async clickToSendEmail(destinationNumber) {
        try {
            await fetch(
                `${this.serviceBaseUrl}/send-email&Token=${this.token}`
            );
        } catch (error) {
            console.log(error);
            this.setState({
                error,
            });
        }
    }

    async deleteContact(key) {
        try {
            await fetch(
                `${this.serviceBaseUrl}/delete-contact?key=${encodeURIComponent(
                    key
                )}&Token=${this.token}`
            );

            const contacts = this.state.contacts.filter((el) => {
                if (el.phone !== key) {
                    return el;
                }
            });

            this.setState({
                contacts,
            });
        } catch (error) {
            console.log(error);
            this.setState({
                error,
            });
        }
    }

    render() {
        let contactList = [];
        if (this.props.contacts && this.props.contacts.length > 0) {
            contactList = this.props.contacts.map((contact) => {
                return (
                    <TableRow key={contact.phone}>
                        <TableCell
                            style={{
                                paddingLeft: 12,
                                width: "250px",
                                fontSize: "1.3em",
                            }}
                        >
                            {contact.name}
                        </TableCell>
                        <TableCell
                            style={{ width: "250px", fontSize: "1.3em" }}
                        >
                            {formatPhoneNumber(contact.phone)}
                        </TableCell>
                        <TableCell style={{ width: "650px" }}>
                            <Button
                                style={{ marginRight: "10px" }}
                                variant="outlined"
                                color="primary"
                                value={contact.phone}
                                onClick={() => this.clickToDial(contact.phone)}
                            >
                                <Phone style={{ marginRight: "3px" }} />
                                <span> Call</span>
                            </Button>
                            <Button
                                style={{ marginRight: "10px" }}
                                value={contact.phone}
                                variant="outlined"
                                onClick={() =>
                                    this.clickToSendVoiceAlert(contact.phone)
                                }
                            >
                                <Voicemail style={{ marginRight: "3px" }} />{" "}
                                Voice Alert
                            </Button>
                            <Button
                                style={{ marginRight: "10px" }}
                                value={contact.phone}
                                variant="outlined"
                                onClick={() =>
                                    this.clickToSendSMS(contact.phone)
                                }
                            >
                                <Sms style={{ marginRight: "3px" }} /> SMS Alert
                            </Button>
                            <Button
                                style={{ marginRight: "10px" }}
                                value={contact.phone}
                                variant="outlined"
                                onClick={() =>
                                    this.clickToSendEmail(contact.phone)
                                }
                            >
                                <Email style={{ marginRight: "3px" }} /> Email
                            </Button>
                        </TableCell>
                        <TableCell style={{ width: "50px" }}>
                            <Button
                                value={contact.phone}
                                style={{ float: "right" }}
                                onClick={() =>
                                    this.deleteContact(contact.phone)
                                }
                            >
                                <DeleteForever />
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            });
        } else {
            contactList = (
                <tr>
                    <td
                        style={{
                            marginTop: 15,
                            background: "#00000033",
                            padding: 15,
                            borderRadius: 3,
                            fontSize: "1.3em",
                        }}
                    >
                        No contacts
                    </td>
                </tr>
            );
        }

        return contactList;
    }
}
