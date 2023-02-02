//
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "global.scss";

import yaml from "js-yaml";
import projects from "data/projects.yaml";

import Index from "pages/index";
import Project from "pages/project";
import NotFoundPage from "pages/404";

const Site = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>

      {Object.entries(yaml.load(projects)).map(([key, value]) => (
        <Route key={key} exact path={"/" + value.path}>
          <Project title={key} slogan={value.slogan} />
        </Route>
      ))}

      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

ReactDOM.render(<Site />, document.getElementById("root"));
