import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Create from './views/Create';
import Show from './views/Show';
import Edit from './views/Edit';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container fixed>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/show/:id" component={Show} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
