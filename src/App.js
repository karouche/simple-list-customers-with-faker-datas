import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import TableUsersUI from './components/TableUsersUI'
import UserUI from './components/UserUI'
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
         <Router>
         <Switch>
          <Route exact path="/" component={TableUsersUI}/>
          <Route path="/users/:id" component={UserUI}/>
          <Route path="/users" component={TableUsersUI}/>
          </Switch>         
         </Router>         
      </div>
    );
  }
}

export default App;