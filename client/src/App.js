import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UIStore from './utils/UIstore';

import Layout from './layout/Layout';
import withSession from './utils/withSession';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import Home from './containers/home/Home';
import Explore from './containers/Explore';
import Profile from './containers/profile/Profile';
import AuthProfile from './containers/profile/AuthProfile';
import AddMovie from './containers/AddMovie';
import MovieDetails from './containers/movie/MovieDetails';

const App = ({ refetch, session }) => {
  return (
    <UIStore>
      <Router>
        <Layout session={session}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' render={() => <SignUp refetch={refetch} />} />
            <Route path='/signin' render={() => <SignIn refetch={refetch} />} />
            <Route path='/explore' component={Explore} />
            <Route path='/profile' render={() => <AuthProfile session={session} refetch={refetch} />} />
            <Route path='/user/:username' render={() => <Profile session={session} refetch={refetch} />} />
            <Route path='/add' render={() => <AddMovie session={session} />} />
            <Route path='/movie/:_id' component={MovieDetails} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </UIStore>
  );
};

export default withSession(App);