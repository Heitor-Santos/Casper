import React from 'react';
import ReactDOM from 'react-dom';
import App from './Login/App';
import Dashboard from './Dashboard/Dashboard'
import reportWebVitals from './reportWebVitals';
import {HashRouter, Route, Switch} from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={App}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </HashRouter>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
