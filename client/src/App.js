import React, { Component } from 'react';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/' exact component={SignUp} />
            <Route path='/signin' component={SignIn} />
          </Switch>
        </Layout>
      </Router>

    );
  }
}

export default App;
