import * as React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

export default class TableHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
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
