import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UIStore from './utils/UIstore';

import Layout from './layout/Layout';
import withSession from './utils/withSession';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import Dashboard from './containers/dashboard/Dashboard';
import Explore from './containers/Explore';
import Profile from './containers/profile/Profile';
import AddMovie from './containers/AddMovie';
import MovieDetails from './containers/movie/MovieDetails';

const App = ({ refetch, session }) => {
  return (
    <UIStore>
      <Router>
        <Layout session={session}>
          <Switch>
            <Route path='/' exact render={() => <SignUp refetch={refetch} />} />
            <Route path='/signin' render={() => <SignIn refetch={refetch} />} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/explore' component={Explore} />
            <Route path='/profile' render={() => <Profile session={session} />} />
            <Route path='/add' render={() => <AddMovie session={session} />} />
            <Route path='/movie/:title' component={MovieDetails} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </UIStore>
  );
};

export default withSession(App);