import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Table from './components/Table';
import IngredientForm from './components/IngredientForm';
import { useEffect, useState } from 'react';



function App() {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    setStyle({
      paddingLeft: '300px',
      paddingTop: '20px',
    });
  },[]);

  return (
    <div className="wrapper">
      <Router>
        <Route exact path={['/', '/mercurial', '/mercurial/add']}>
          <div>
            <Header/>
          </div>
          <div>
            <Menu/>
          </div>
          <div style={style} className="App-content">
            <Route exact path="/" component={Table}/>
            <Route exact path="/mercurial" component={Table}/>
            <Route exact path="/mercurial/add" component={IngredientForm}/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
