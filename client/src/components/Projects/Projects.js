import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Project from './Project/Project';
import useStyles from './styles';

const Projects = ({ setCurrentId }) => {
  const { projects, isLoading } = useSelector((state) => state.projects);
  const classes = useStyles();

  if (!projects.length && !isLoading) return 'No projects';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {projects?.map((project) => (
          <Grid key={project._id} item xs={12} sm={12} md={6} lg={3}>
            <Project project={project} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Projects;
