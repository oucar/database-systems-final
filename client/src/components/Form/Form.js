import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import BackspaceTwoToneIcon from "@material-ui/icons/BackspaceTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createProject, updateProject } from "../../actions/projects";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectManager: "",
    projectDetails: "",
    employees: [],
    techStack: [],
    selectedFile: "",
  });
  const project = useSelector((state) =>
    currentId
      ? state.projects.projects.find(
          (projectDetails) => projectDetails._id === currentId
        )
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setProjectData({
      projectName: "",
      projectManager: "",
      projectDetails: "",
      projectData: "",
      employees: [],
      techStack: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!project?.projectName) clear();
    if (project) setProjectData(project);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createProject({ ...projectData, name: user?.result?.name }, history)
      );
      clear();
    } else {
      dispatch(
        updateProject(currentId, { ...projectData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Sign in to create, update and/or delete a project.
        </Typography>
      </Paper>
    );
  }

  const handleAddChipEmp = (emp) => {
    setProjectData({
      ...projectData,
      employees: [...projectData.employees, emp],
    });
  };

  const handleDeleteChipEmp = (chipToDelete) => {
    setProjectData({
      ...projectData,
      employees: projectData.employees.filter((emp) => emp !== chipToDelete),
    });
  };

  const handleAddChipTS = (ts) => {
    setProjectData({
      ...projectData,
      techStack: [...projectData.techStack, ts],
    });
  };

  const handleDeleteChipTS = (chipToDelete) => {
    setProjectData({
      ...projectData,
      techStack: projectData.techStack.filter((ts) => ts !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${project?.projectName}"` : "New Project"}
        </Typography>
        {/* Project Name */}
        <TextField
          name="projectName"
          variant="outlined"
          label="Project Name"
          style={{
            borderColor: "red",
          }}
          fullWidth
          value={projectData.projectName}
          onChange={(e) =>
            setProjectData({ ...projectData, projectName: e.target.value })
          }
        />
        {/* Project Details */}
        <TextField
          name="projectDetails"
          variant="outlined"
          label="Project Details"
          fullWidth
          multiline
          rows={4}
          value={projectData.projectDetails}
          onChange={(e) =>
            setProjectData({ ...projectData, projectDetails: e.target.value })
          }
        />
        {/* Project Manager */}
        <TextField
          name="projectManager"
          variant="outlined"
          label="Project Manager"
          fullWidth
          value={projectData.projectManager}
          onChange={(e) =>
            setProjectData({ ...projectData, projectManager: e.target.value })
          }
        />

        {/* Project Employees, chip input */}
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="employees"
            variant="outlined"
            label="Employees"
            fullWidth
            value={projectData.employees}
            onAdd={(chip) => handleAddChipEmp(chip)}
            onDelete={(chip) => handleDeleteChipEmp(chip)}
          />
        </div>

        {/* Project Tech Stack, chip input */}
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="techStack"
            variant="outlined"
            label="Tech Stack"
            fullWidth
            value={projectData.techStack}
            onAdd={(chip) => handleAddChipTS(chip)}
            onDelete={(chip) => handleDeleteChipTS(chip)}
          />
        </div>

        {/* File upload */}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProjectData({ ...projectData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          style={{
            backgroundColor: "#2D4059",
            color: "white",
          }}
          variant="contained"
          startIcon={<SendTwoToneIcon />}
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          style={{
            backgroundColor: "#EA5455",
            color: "white",
          }}
          variant="contained"
          startIcon={<BackspaceTwoToneIcon />}
          color="white"
          size="large"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
