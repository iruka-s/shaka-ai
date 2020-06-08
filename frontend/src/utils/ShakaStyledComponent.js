import { withStyles } from '@material-ui/core/styles';
import { TableRow, TableCell } from "@material-ui/core";

export const MainTableRow = withStyles({
    head: {
        height: "40px",
    },
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: "#ebebc9"
        },
        "&:nth-of-type(2n)": {
            backgroundColor: "#fbfcf9"
        }
    }
})(TableRow);

export const MainTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#3a3137",
        color: theme.palette.common.white,
        padding: "0.5px"
    },
    body: {
        fontSize: theme.props.fontSize,
        "&:last-child": {
            paddingRight: "0"
        }
    }
}))(TableCell);
