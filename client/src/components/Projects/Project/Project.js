import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  IconButton,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { deleteProject } from "../../../actions/projects";
import useStyles from "./styles";

const Project = ({ project, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;

  const openProject = (e) => {
    history.push(`/projects/${project._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openProject}
      >
        <CardMedia
          className={classes.media}
          image={
            project.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          projectName={project.projectName}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{project.name}</Typography>
          <Typography variant="body2">
            {moment(project.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === project?.creator ||
          user?.result?._id === project?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(project._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <EditTwoToneIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          {/* Employees */}
          <Typography variant="body2" color="textPrimary" component="h2">
            {project.employees.map((emp, index) => `${emp}, `)}
          </Typography>
        </div>
        <div className={classes.details}>
          {/* Tech Stack */}
          <Typography variant="body2" color="textSecondary" component="h2">
            {project.techStack.map((ts) => `${ts} `)}
          </Typography>
        </div>

        <Typography
          className={classes.projectName}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {project.projectName}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {project.projectDetails.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === project?.creator ||
          user?.result?._id === project?.creator) && (
          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => dispatch(deleteProject(project._id))}
            style={{
              color: "#EA5455",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Project;
