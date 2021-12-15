import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Table from './components/Table';



function App() {
  return (
    <div className="wrapper">
      <Router>
        <Route exact path={['/', '/mercurial']}>
          <div>
            <Header/>
          </div>
          <div>
            <Menu/>
          </div>
          <div>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/mercurial" component={Table}/>
          </div>
          <div>
            <Footer/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
