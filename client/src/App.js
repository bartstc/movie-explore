import React, { Component } from 'react';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import Dashboard from './containers/Dashboard';
import Explore from './containers/Explore';
import Profile from './containers/Profile';
import AddMovie from './containers/AddMovie';
import MovieDetails from './containers/MovieDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/' exact component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/explore' component={Explore} />
            <Route path='/profile' component={Profile} />
            <Route path='/add' component={AddMovie} />
            <Route path='/movie/:title' component={MovieDetails} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
