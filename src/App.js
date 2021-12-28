import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Table from './components/Table';
import {IngredientForm} from './components/IngredientForm';
import { useEffect, useState } from 'react';
import FicheTechnique from './components/FicheTechnique';
import ListeFicheTechniques from './components/ListeFicheTechniques';
import ListeAllergenes from './components/ListeAllergenes';
import DetailIngredient from './components/DetailIngredient';



function App() {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    setStyle({
      paddingLeft: '260px',
      paddingTop: '20px',
    });
  },[]);

  return (
    <div>
      <Router>
        <Route exact path={['/', '/mercurial', '/mercurial/add','/fichetechnique/:id','/fichetechniques','/listeallergenes','/ingredient/:id']}>
          <div>
            <Menu/>
          </div>
          <div style={style} className="App-content">
            <Route exact path="/" component={Table}/>
            <Route exact path="/mercurial" component={Table}/>
            <Route exact path="/mercurial/add" component={IngredientForm}/>
            <Route exact path="/ingredient/:id" component={DetailIngredient}/>
            <Route exact path="/listeallergenes" component={ListeAllergenes}/>
            <Route exact path="/fichetechnique/:id" component={FicheTechnique}/>
            <Route exact path="/fichetechniques" component={ListeFicheTechniques}/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
