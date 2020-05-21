import * as React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

export default class ErrorBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.error) {
            return null;
        } else {
            return (
                <p
                    style={{
                        marginBottom: 15,
                        background: "#fdecea",
                        padding: 15,
                        borderRadius: 3,
                        fontSize: "1.3em",
                    }}
                >
                    {`${this.props.error}`}
                </p>
            );
        }
    }
}
