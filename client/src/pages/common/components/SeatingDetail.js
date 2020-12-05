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

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            SM
          </Avatar>
        }
        title="Sean Marten"
        subheader="Software Engineer"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Company: The Software Company
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Department: Software Engineering
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Building: Hightower
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Floor: 5
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Desk: 15
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Seat: 3
        </Typography>
      </CardContent>
    </Card>
  );
}
