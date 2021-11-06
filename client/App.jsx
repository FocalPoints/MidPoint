import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import Access from './components/Access'
// import Main from './components/Main'


// connect to endpoints
const App = () => (
  <div id="app">
    <Router>
      <Switch>
        <Route path='/' element={<Access/>} /> v6
        {/* <Route exact path='/main' component={Main} /> */}
      </Switch>
    </Router>
  </div>
);

export default App;