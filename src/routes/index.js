import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import FoodDetails from '../pages/FoodDetails';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/fooddetails/:id" component={FoodDetails} />
  </Switch>
);

export default Routes;
