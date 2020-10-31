import * as React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { InputItem } from "@twilio/flex-ui";

export default class TableHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <TableHead style={{ display: "block" }}>
                {/* <InputItem /> */}
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
                            width: "625px",
                        }}
                    >
                        Actions
                    </TableCell>
                    <TableCell
                        style={{
                            paddingLeft: 12,
                            width: "50px",
                        }}
                    />
                </TableRow>
            </TableHead>
        );
    }
}
