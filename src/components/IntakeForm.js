import React from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

export default class IntakeForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    render() {
        return (
            <div style={{ margin: "15px;" }}>
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-phone"
                    label="Phone Number"
                    value={this.state.phone}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-email"
                    label="Email"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-email"
                    label="Address"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-notes"
                    label="Multiline"
                    multiline
                    rows="4"
                    defaultValue="Default Value"
                    margin="normal"
                    variant="outlined"
                />

                <Divider variant="middle" />
                <h1>Related Contacts</h1>
            </div>
        );
    }
}
