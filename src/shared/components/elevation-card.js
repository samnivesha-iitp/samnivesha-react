import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardHeader from "@material-ui/core/CardHeader";
import TableBody from "@material-ui/core/TableBody";
import { TableFooter } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import purple from "@material-ui/core/colors/purple";
import { NavLink } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";

let id = 0;
function createData(name, place, time) {
  id += 1;
  return { id, name, place, time };
}

const rows = [
  createData("SAP2000", "Block-9/R102", "10:30 am"),
  createData("AutoCAD", "Block-9/R104", "10:30 am")
];

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 300
  }
});
const ElevatedCardHeader01 = () => {
  const classes = useStyles();
  return (
    <Card className={"MuiElevatedCard--01"}>
      <CardHeader
        className={"MuiCardHeader-root"}
        title={"Timetable"}
        subheader={"Day 0 - 14 February"}
        classes={{
          title: "MuiCardHeader-title",
          subheader: "MuiCardHeader-subheader"
        }}
      />
      <CardContent className={"MuiCardContent-root"}>
        <div className={"MuiCardContent-inner"}>
          <Table className={classes.table}>
            <TableHead>
              <StyledTableRow>
                <TableCell>Event</TableCell>
                <TableCell align="right">Place</TableCell>
                <TableCell align="right">Time</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ padding: "6px" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right" style={{ padding: "6px" }}>
                    {row.place}
                  </TableCell>
                  <TableCell align="right" style={{ padding: "6px" }}>
                    {row.time}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <div className="content" style={{paddingTop:'10px'}}>
                <NavLink className="button is-link is-small" style={{backgroundColor:'#3273dc'}} to="/schedule">
                  View More
                </NavLink>
              </div>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

ElevatedCardHeader01.getTheme = muiBaseTheme => {
  const offset = 40;
  const cardShadow = "0px 14px 80px rgba(34, 35, 58, 0.2)";
  const headerShadow = "4px 4px 20px 1px rgba(0, 0, 0, 0.2)";
  return {
    MuiCard: {
      root: {
        "&.MuiElevatedCard--01": {
          marginTop: offset,
          borderRadius: muiBaseTheme.spacing(0.5),
          transition: "0.3s",
          boxShadow: cardShadow,
          position: "relative",
          width: "100%",
          overflow: "initial",
          background: "#ffffff",
          padding: `${muiBaseTheme.spacing(2)}px 0`,
          "& .MuiCardHeader-root": {
            flexShrink: 0,
            position: "absolute",
            top: -offset,
            right: 20,
            left: 20,
            borderRadius: muiBaseTheme.spacing(0.5),
            backgroundColor: purple[500],
            overflow: "hidden",
            boxShadow: headerShadow,
            textAlign: "left",
            "& .MuiCardHeader-title": {
              color: "#ffffff",
              fontWeight: 900,
              letterSpacing: 1
            },
            "& .MuiCardHeader-subheader": {
              color: "#ffffff",
              opacity: 0.87,
              fontWeight: 200,
              letterSpacing: 0.4
            }
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            "& .MuiCardContent-inner": {
              paddingTop: "15px",
              overflowX: "auto"
            }
          }
        }
      }
    }
  };
};

export default ElevatedCardHeader01;
