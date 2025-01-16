import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TableUsersUI from './components/TableUsersUI';
import UserUI from './components/UserUI';
import React from 'react';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={TableUsersUI}/>
          <Route path="/users/:id" component={UserUI}/>
          <Route path="/users" component={TableUsersUI}/>
          </Switch>         
    </Router>
  );
}

export default App;