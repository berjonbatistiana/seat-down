import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BusinessIcon from "@material-ui/icons/Business";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {
  addBuilding,
  addFloor,
  addTable,
  addChair,
  getCompanyAndUserData,
  getBuildings,
} from "../../../utils/API";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(2),
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  },
}));

export const AddBuilding = () => {
  const classes = useStyles();
  const history = useHistory();
  const getCompanyId = async () => {
    const user = localStorage.getItem("user");
    const { companyId } = await getCompanyAndUserData(user);
    return companyId;
  };

  const onSubmit = async ({ target }) => {
    const rawInputs = [];
    for (let i = 0; i < target.length; i++) {
      rawInputs.push(target[i].value);
    }
    const filteredInputs = rawInputs.filter((input) => input);
    const [
      buildingName,
      floorPrefix,
      numFloors,
      tablePrefix,
      numTables,
      chairPrefix,
      numChairs,
    ] = filteredInputs;
    const inputs = {
      buildingName,
      floorPrefix,
      numFloors,
      tablePrefix,
      numTables,
      chairPrefix,
      numChairs,
    };
    if (filteredInputs.length !== 7) {
      alert("Please fill out all of the fields");
      return;
    }
    const { data } = await getBuildings();
    const existingBuildings = data.map((resp) => resp.name);
    if (existingBuildings.includes(buildingName)) {
      alert(
        "This building name is already in use, please choose a different one."
      );
      return;
    }
    const [floorNames, tableNames, chairNames] = prepareToPost(inputs);
    postToDb(
      buildingName,
      floorNames,
      tableNames,
      chairNames,
      numTables,
      numChairs
    );
    history.push("/reserve");
  };

  const prepareToPost = ({
    buildingName,
    floorPrefix,
    numFloors,
    tablePrefix,
    numTables,
    chairPrefix,
    numChairs,
  }) => {
    const floorNames = iterateNumbers([buildingName], floorPrefix, numFloors);
    const tableNames = iterateNumbers(
      floorNames[Object.keys(floorNames)[0]],
      tablePrefix,
      numTables
    );
    const chairNames = {};
    Object.keys(tableNames).forEach((key, index) => {
      const tables = iterateNumbers(
        tableNames[key],
        `${chairPrefix}${index}`,
        numChairs
      );
      Object.keys(tables).forEach((table) => {
        chairNames[table] = tables[table];
      });
    });
    return [floorNames, tableNames, chairNames];
  };

  const iterateNumbers = (items, prefix, numChildren) => {
    const returnDict = {};
    items.forEach((item, index) => {
      const arr = [];
      for (let i = 0; i < numChildren; i++) {
        arr.push(`${prefix}${index}${i}`);
      }
      returnDict[item] = arr;
    });
    return returnDict;
  };

  const individualPost = async (requests) => {
    const ids = [];
    await axios
      .all(requests)
      .then((responses) => {
        responses.forEach((res) => {
          ids.push(res.data.id);
        });
      })
      .catch((e) => console.log(e));
    return ids;
  };

  const postToDb = async (
    buildingName,
    floorNames,
    tableNames,
    chairNames,
    numTables,
    numChairs
  ) => {
    const companyId = await getCompanyId();
    const buildingRequests = [addBuilding(buildingName, companyId)];
    const buildingResponse = await individualPost(buildingRequests);
    const floorRequests = [];
    floorNames[Object.keys(floorNames)[0]].forEach((floor) => {
      floorRequests.push(
        addFloor(floor, buildingResponse[0], numTables, companyId)
      );
    });
    const floorResponse = await individualPost(floorRequests);
    const tableRequests = [];
    Object.keys(tableNames).forEach((floor, index) => {
      tableNames[floor].forEach((table) => {
        tableRequests.push(addTable(table, floorResponse[index], numChairs));
      });
    });
    const tableResponse = await individualPost(tableRequests);
    const chairRequests = [];
    Object.keys(chairNames).forEach((table, index) => {
      chairNames[table].forEach((chair) => {
        chairRequests.push(addChair(chair, tableResponse[index]));
      });
    });
    await individualPost(chairRequests);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Building
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="buildingName"
                label="Building Name"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="floorPrefix"
                label="Floor Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numFloors"
                label="Number of Floors"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 9 } }}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tablePrefix"
                label="Table Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tablesPerFloor"
                label="Tables per Floor"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 9 } }}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="chairPrefix"
                label="Chair Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="chairsPerTable"
                label="Chairs per Table"
                InputProps={{ inputProps: { min: 1, max: 9 } }}
                type="number"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth className={classes.submit}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};
