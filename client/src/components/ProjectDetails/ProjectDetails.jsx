import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";

import { getProject, getProjectsBySearch } from "../../actions/projects";
import ChangeLogSection from "./ChangeLogSection";
import useStyles from "./styles";

const Project = () => {
  const { project, projects, isLoading } = useSelector(
    (state) => state.projects
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProject(id));
  }, [id]);

  useEffect(() => {
    if (project) {
      dispatch(
        getProjectsBySearch({
          search: "none",
          employees: project?.employees.join(","),
          techStack: project?.employees.join(","),
        })
      );
    }
  }, [project]);

  if (!project) return null;

  const openProject = (_id) => history.push(`/projects/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedProjects = projects.filter(({ _id }) => _id !== project._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {project.projectName}
          </Typography>
          <Divider />
          <Typography gutterBottom variant="h6">
            {project.projectDetails}
          </Typography>

          {/* EMPLOYEES */}
          <Typography variant="h6" color="textPrimary">
            Assigned Employees:{" "}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {project.employees.map((emp) => (
              <Typography key={emp}>{`- ${emp}`} </Typography>
            ))}
          </Typography>

          <Typography variant="h6" color="textPrimary">
            Tech Stack:{" "}
          </Typography>
          <Typography
            gutterBottom
            className={classes.sideBySide}
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {project.techStack.map((ts) => (
              <Typography key={ts}>
                {" "}
                {ts}
                {`, `}
              </Typography>
            ))}
          </Typography>

          <Typography variant="h6">
            Project Creator:
            <Link
              to={`/creators/${project.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${project.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(project.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <ChangeLogSection project={project} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          {/* placeholder image */}
          <img
            className={classes.media}
            width="50%"
            src={
              project.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={project.projectName}
          />
        </div>
      </div>
      {!!recommendedProjects.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            Similar Projects:{" "}
          </Typography>
          <Divider />
          <div className={classes.recommendedProjects}>
            {recommendedProjects.map(
              ({ projectName, name, projectDetails, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openProject(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {projectName}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {projectDetails}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Project;
