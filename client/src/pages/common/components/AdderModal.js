import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const AdderModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    props.addFn(e.target[0].value);
    props.onModalClose();
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label={props.modalName}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#5fc5d1",
                borderRadius: 25,
                "&:hover": {
                  backgroundColor: "#5fc5d1",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        style={{
          color: "white",
          backgroundColor: "#5fc5d1",
          borderRadius: 25,
          "&:hover": {
            backgroundColor: "#5fc5d1",
          },
        }}
        onClick={handleOpen}
      >
        Add {props.modalName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
