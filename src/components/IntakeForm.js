import React from "react";
import Divider from "@material-ui/core/Divider";
import createContact from "./helpers/createContact";
import ContactList from "./ContactList";
import SyncClient from "twilio-sync";
import { Manager } from "@twilio/flex-ui";

import {
    Grid,
    TextField,
    FormControl,
    Fab,
    TableRow,
    TableCell,
    Typography,
    Button,
} from "@material-ui/core";

import formatPhoneNumber from "./helpers/formatPhoneNumber";
import {
    Add,
    DeleteForever,
    Phone,
    Email,
    Sms,
    Voicemail,
} from "@material-ui/icons";

export default class IntakeForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            phone: "",
            email: "",
            address: "",
            comments: "",
            secondaryName: "",
            secondaryPhone: "",
            secondaryContacts: [],
        };

        const manager = Manager.getInstance();
        this.token = manager.user.token;

        this.serviceBaseUrl = "http://localhost:3000";
        this.handleChange = this.handleChange.bind(this);
        this.createSecondaryContact = this.createSecondaryContact.bind(this);
        this.updateSecondaryName = this.updateSecondaryName.bind(this);
        this.updateSecondaryPhone = this.updateSecondaryPhone.bind(this);
        this.clickToSendSurvey = this.clickToSendSurvey.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    // async loadContact(identifier) {}

    async componentDidMount() {
        let mapClient = await fetch(
            `${this.serviceBaseUrl}/create-sync-token?Token=${this.token}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const syncClient = new SyncClient(data.token);

                return syncClient
                    .map("MPb5ad1753e67d4bff9719714157823881")
                    .then(function (map) {
                        console.log(
                            "Successfully opened a Map. SID: " + map.sid
                        );

                        return map;
                    })
                    .catch(function (error) {
                        console.log("Unexpected error", error);
                    });
            });

        mapClient.on(
            "itemUpdated",
            function (args) {
                console.log("Map item " + args.item.key + " was updated");
                console.log("args.item.value:", args.item.value);

                let value = args.item.value;

                this.setState({
                    name: value.name,
                    phone: value.phone,
                    email: value.email,
                    address: value.address,
                    comments: value.comments,
                });
                console.log("args.isLocal:", args.isLocal);
            }.bind(this)
        );
    }

    updateState(phone, email, address, comments) {
        this.setState({
            phone: phone,
            email: email,
            address: address,
            comments: comments,
        });
    }

    async createSecondaryContact(e) {
        e.preventDefault();

        createContact(this.state.secondaryName, this.state.secondaryPhone)
            .then((result) => {
                let contacts = this.state.secondaryContacts;
                contacts.push(result);

                this.setState({
                    secondaryName: "",
                    secondaryPhone: "",
                    secondaryContacts: contacts,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    updateSecondaryName(e) {
        this.setState({
            secondaryName: e.target.value,
        });
    }

    updateSecondaryPhone(e) {
        this.setState({
            secondaryPhone: e.target.value,
            invalidPhone: false,
        });
    }

    async clickToSendSurvey(destinationNumber) {
        console.log("send survey", destinationNumber);
        try {
            await fetch(
                `${
                    this.serviceBaseUrl
                }/send-survey?toPhoneNumber=${encodeURIComponent(
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

    async clickToVoiceAlert(destinationNumber) {
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

    render() {
        const inputStyles = {
            marginTop: 15,
            marginBottom: 15,
            marginRight: 15,
            marginLeft: 15,
        };

        return (
            <div style={{ paddingLeft: 15 }}>
                <Grid style={{ padding: 15 }} item xs={12}>
                    <Typography variant="h5" component="h3">
                        Contact Information
                    </Typography>
                    <Typography component="p">
                        Add additional contact information and notes.
                    </Typography>
                </Grid>
                <TextField
                    id="outlined-name"
                    label="Name"
                    style={inputStyles}
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-phone"
                    label="Phone Number"
                    style={inputStyles}
                    value={this.state.phone}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-email"
                    label="Email"
                    style={inputStyles}
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-email"
                    label="Address"
                    style={inputStyles}
                    value={this.state.address}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-notes"
                    label="Comments"
                    style={inputStyles}
                    value={this.state.comments}
                    multiline
                    rows="4"
                    margin="normal"
                    variant="outlined"
                />

                <Button
                    style={{ margin: 15 }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        this.clickToSendSurvey(this.props.identifier)
                    }
                >
                    Send Survey
                </Button>

                <Divider variant="middle" />
                <Grid style={{ padding: 15 }} item xs={12}>
                    <Typography variant="h5" component="h3">
                        Secondary Contacts
                    </Typography>
                    <Typography component="p">
                        Enter contact information for individuals who have come
                        in contact with this person.
                    </Typography>
                </Grid>
                <form onSubmit={this.createSecondaryContact}>
                    <FormControl>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            style={inputStyles}
                            value={this.state.newName}
                            onChange={this.updateSecondaryName}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="phone-number"
                            error={this.state.invalidPhone}
                            label="Phone Number"
                            variant="outlined"
                            style={inputStyles}
                            value={this.state.newPhone}
                            onChange={this.updateSecondaryPhone}
                        />
                    </FormControl>
                    <Fab
                        color="primary"
                        type="submit"
                        aria-label="Add"
                        style={inputStyles}
                    >
                        <Add />
                    </Fab>
                </form>
                <ContactList contacts={this.state.secondaryContacts} />
            </div>
        );
    }
}
