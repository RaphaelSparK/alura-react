import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AutorBox from './Autor'

ReactDOM.render(
<Router>
    <div>
      <Route exact path="/" component={App} >
        <Route path="/autor" component={AutorBox}/>
        <Route path="/livro" />
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);
