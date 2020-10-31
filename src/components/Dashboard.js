import * as React from "react";
import { Actions, Manager } from "@twilio/flex-ui";
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
} from "@material-ui/core";

import { Add } from "@material-ui/icons";
import createContact from "./helpers/createContact";
import TableHeader from "./TableHeader";
import ContactList from "./ContactList";
import ErrorBar from "./ErrorBar";

export default class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            contacts: [],
            newName: "",
            newPhone: "",
            invalidPhone: false,
            error: null,
        };

        const manager = Manager.getInstance();
        this.token = manager.user.token;

        this.serviceBaseUrl = "http://localhost:3000";
        this.updateName = this.updateName.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.createContactClick = this.createContactClick.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch(
                `${this.serviceBaseUrl}/get-contacts?Token=${this.token}`
            );
            const json = await response.json();
            this.setState({ contacts: json });
        } catch (error) {
            console.log(error);
        }
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

        const inputStyles = {
            marginTop: 15,
            marginBottom: 15,
            marginRight: 15,
        };

        return (
            <div>
                <Paper style={{ padding: 15 }} elevation={0}>
                    <ErrorBar error={this.state.error} />
                    <Grid container spacing={8}>
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
                            <Table aria-label="simple table">
                                <TableHeader />
                                <TableBody
                                    style={{
                                        display: "block",
                                        overflowY: "auto",
                                        height: "70vh",
                                    }}
                                >
                                    <ContactList
                                        contacts={this.state.contacts}
                                    />
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
