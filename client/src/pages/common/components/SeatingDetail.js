import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const SeatingDetail = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.initial}
          </Avatar>
        }
        title={props.name}
        subheader={props.role}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Company: {props.company}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Building: {props.building}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Floor: {props.floor}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Desk: {props.desk}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Seat: {props.seat}
        </Typography>
      </CardContent>
    </Card>
  );
}
// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardContent from "@material-ui/core/CardContent";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));
//
// export const SeatingDetail = (props) => {
//   const classes = useStyles();
//   const { reservationData } = props;
//   return (
//     <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             RSV
//           </Avatar>
//         }
//         title={reservationData.username}
//         subheader={reservationData.roleName}
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Company: {reservationData.companyName}
//         </Typography>
//
//         <Typography variant="body2" color="textSecondary" component="p">
//           Building: {reservationData.building}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Floor: {reservationData.floor}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Desk: {reservationData.desk}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Seat: {reservationData.seat}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };
