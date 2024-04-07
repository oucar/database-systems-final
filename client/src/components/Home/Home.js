import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ChipInput from "material-ui-chip-input";

import { getProjectsBySearch } from "../../actions/projects";
import Projects from "../Projects/Projects";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const history = useHistory();

  const searchProject = () => {
    if (search.trim() || employees) {
      dispatch(getProjectsBySearch({ search, employees: employees.join(","), techStack: techStack.join(",")}));
      history.push(
        `/projects/search?searchQuery=${
          search || "none"
        }&employees=${employees.join(",")}&techStack=${techStack.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  // enter
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProject();
    }
  };

  const handleAddChipEmp = (emp) => setEmployees([...employees, emp]);

  const handleDeleteChipEmp = (chipToDelete) =>
    setEmployees(employees.filter((emp) => emp !== chipToDelete));

  const handleAddChipTS = (ts) => setTechStack([...techStack, ts]);

  const handleDeleteChipTS = (chipToDelete) =>
    setTechStack(techStack.filter((ts) => ts !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Projects setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              {/* Project Name */}
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Project Name"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* Employee */}
              <ChipInput
                style={{ margin: "10px 0" }}
                value={employees}
                onAdd={(chip) => handleAddChipEmp(chip)}
                onDelete={(chip) => handleDeleteChipEmp(chip)}
                label="Employee"
                variant="outlined"
              />
              {/* Tech Stack */}
              <ChipInput
                style={{ margin: "10px 0" }}
                value={techStack}
                onAdd={(chip) => handleAddChipTS(chip)}
                onDelete={(chip) => handleDeleteChipTS(chip)}
                label="Technology Stack"
                variant="outlined"
              />

              {/* Search button */}
              <Button
                onClick={searchProject}
                style={{
                  backgroundColor: "#2D4059",
                  color: "white",
                }}
                startIcon={<SearchIcon />}
                className={classes.searchButton}
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !employees.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
