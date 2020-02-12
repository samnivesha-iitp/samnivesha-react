import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardHeader from "@material-ui/core/CardHeader";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import purple from "@material-ui/core/colors/purple";

let id = 0;
function createData(name, place, time) {
  id += 1;
  return { id, name, place, time };
}

const rows = [
  createData("Guest Lecture-1", "Senate Hall", "10:45pm"),
  createData("Bridge-it", "Block-9/R502", "12 pm"),
  createData("CiviQ", "Block-9/R109", "3 pm"),
  createData("House Of Card", "Block-9/R107", "3 pm"),
  createData("SAP2000", "Block-9/R102", "12 pm"),
  createData("AutoCAD", "Block-9/R104", "12 pm")
];

const ElevatedCardHeader01 = () => (
  <Card className={"MuiElevatedCard--01"}>
    <CardHeader
      className={"MuiCardHeader-root"}
      title={"Timetable"}
      subheader={"Day 1"}
      classes={{
        title: "MuiCardHeader-title",
        subheader: "MuiCardHeader-subheader"
      }}
    />
    <CardContent className={"MuiCardContent-root"}>
      <div className={"MuiCardContent-inner"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell align="right">Place</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

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

ElevatedCardHeader01.metadata = {
  name: "Elevated Card Header I",
  description: "Wonderful elevated card header"
};

export default ElevatedCardHeader01;
