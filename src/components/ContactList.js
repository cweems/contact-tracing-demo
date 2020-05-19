import * as React from "react";
import { Actions } from "@twilio/flex-ui";
import {
    Grid,
    TextField,
    FormControl,
    Fab,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Button,
} from "@material-ui/core";

import { Add, DeleteForever, Phone } from "@material-ui/icons";
import formatPhoneNumber from "./helpers/formatPhoneNumber";
import createContact from "./helpers/createContact";

export default class DirectoryAdmin extends React.Component {
    constructor() {
        super();

        this.state = {
            contacts: [],
            newName: "",
            newPhone: "",
            invalidPhone: false,
            error: null,
        };

        this.serviceBaseUrl = "http://localhost:3000";
        this.updateName = this.updateName.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.createContactClick = this.createContactClick.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.clickToDial = this.clickToDial.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch(`${this.serviceBaseUrl}/get-contacts`);
            const json = await response.json();
            console.log(json);
            this.setState({ contacts: json });
        } catch (error) {
            console.log(error);
        }
    }

    clickToDial(destinationNumber) {
        Actions.invokeAction("StartOutboundCall", {
            destination: destinationNumber,
        });
    }

    async createContactClick(e) {
        e.preventDefault();

        createContact(this.state.newName, this.state.newPhone)
            .then((result) => {
                let contacts = this.state.contacts;
                contacts.push(result);

                this.setState({
                    newName: "",
                    newPhone: "",
                    contacts: contacts,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    async deleteContact(key) {
        try {
            await fetch(
                `${this.serviceBaseUrl}/delete-contact?key=${encodeURIComponent(
                    key
                )}`
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

    updateName(e) {
        this.setState({
            newName: e.target.value,
        });
    }

    updatePhone(e) {
        this.setState({
            newPhone: e.target.value,
            invalidPhone: false,
        });
    }

    render() {
        let errorComponent;

        if (this.state.error) {
            errorComponent = (
                <p
                    style={{
                        marginBottom: 15,
                        background: "#fdecea",
                        padding: 15,
                        borderRadius: 3,
                        fontSize: "1.3em",
                    }}
                >
                    {`${this.state.error}`}
                </p>
            );
        }

        let contactList;
        if (this.state.contacts.length > 0) {
            contactList = this.state.contacts.map((pn) => {
                return (
                    <TableRow key={pn.phone}>
                        <TableCell
                            style={{
                                paddingLeft: 12,
                                width: "250px",
                                fontSize: "1.3em",
                            }}
                        >
                            {pn.name}
                        </TableCell>
                        <TableCell
                            style={{ width: "250px", fontSize: "1.3em" }}
                        >
                            {formatPhoneNumber(pn.phone)}
                        </TableCell>
                        <TableCell style={{ width: "250px" }}>
                            <Button
                                value={pn.phone}
                                onClick={() => this.clickToDial(pn.phone)}
                            >
                                <Phone />
                            </Button>
                        </TableCell>
                        <TableCell style={{ width: "250px" }}>
                            <Button
                                value={pn.phone}
                                style={{ float: "right" }}
                                onClick={() => this.deleteContact(pn.phone)}
                            >
                                <DeleteForever />
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            });
        } else {
            contactList = (
                <p
                    style={{
                        marginTop: 15,
                        background: "#00000033",
                        padding: 15,
                        borderRadius: 3,
                        fontSize: "1.3em",
                    }}
                >
                    No contacts
                </p>
            );
        }

        const inputStyles = {
            marginTop: 15,
            marginBottom: 15,
            marginRight: 15,
        };

        return (
            <div>
                <Paper style={{ padding: 15 }} elevation={0}>
                    {errorComponent}
                    <Grid spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h3">
                                Contact Tracing Directory
                            </Typography>
                            <Typography component="p">
                                Enter contacts manually or integrate with an
                                exernal system.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={this.createContactClick}>
                                <FormControl>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        style={inputStyles}
                                        value={this.state.newName}
                                        onChange={this.updateName}
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
                                        onChange={this.updatePhone}
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
                        </Grid>
                        <Grid item xs={12}>
                            <Table stickyheader aria-label="simple table">
                                <TableHead style={{ display: "block" }}>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                paddingLeft: 12,
                                                width: "250px",
                                            }}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                paddingLeft: 12,
                                                width: "250px",
                                            }}
                                        >
                                            Phone Number
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                paddingLeft: 12,
                                                width: "250px",
                                            }}
                                        >
                                            Actions
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                paddingLeft: 12,
                                                width: "250px",
                                            }}
                                        />
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    style={{
                                        display: "block",
                                        overflowY: "auto",
                                        height: "70vh",
                                    }}
                                >
                                    {contactList}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
