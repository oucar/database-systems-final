import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/projects" />} />
          <Route path="/projects" exact component={Home} />
          <Route path="/projects/search" exact component={Home} />
          <Route path="/projects/:id" exact component={ProjectDetails} />
          <Route path={['/creators/:name', '/employeess/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/projects" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
