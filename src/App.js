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
import ModifyIngredient from './components/ModifyIngredient';
import AddStock from './components/AddStock';
import AddFicheTechnique from './components/AddFicheTechnique';
import AddStepToFicheTechnique from './components/AddStepToFicheTechnique';
import AddIngredientToStep from './components/AddIngredientToStep';
import EditIngredientInStep from './components/EditIngredientInStep';
import EditFicheTechnique from './components/EditFicheTechnique';
import EditStep from './components/EditStep';
import Costs from './components/Costs';
import EditCosts from './components/EditCosts';
import { Label } from './components/Label';



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
        <Route exact path={['/', 
        '/mercurial', 
        '/mercurial/add',
        '/fichetechnique/:id',
        '/fichetechniques',
        '/listeallergenes',
        '/ingredient/:id',
        '/ingredient/update/:id',
        '/ingredient/addstock/:id', 
        '/fichetechniques/add', 
        "/fichetechnique/addStep/:id", 
        "/fichetechnique/addIngredient/:id",
        "/fichetechnique/editStep/:id",
        "/fichetechnique/edit/:id",
        "/fichetechnique/editIngredient/:id",
        "/couts",
        "/couts/edit",
        "/labels"]}>
          <div>
            <Menu/>
          </div>
          <div style={style} className="App-content">
            <Route exact path="/" component={Table}/>
            <Route exact path="/mercurial" component={Table}/>
            <Route exact path="/mercurial/add" component={IngredientForm}/>
            <Route exact path="/ingredient/:id" component={DetailIngredient}/>
            <Route exact path="/ingredient/update/:id" component={ModifyIngredient}/>
            <Route exact path="/ingredient/addstock/:id" component={AddStock}/>
            <Route exact path="/listeallergenes" component={ListeAllergenes}/>
            <Route exact path="/fichetechnique/:id" component={FicheTechnique}/>
            <Route exact path="/fichetechniques" component={ListeFicheTechniques}/>
            <Route exact path="/fichetechniques/add" component={AddFicheTechnique}/>
            <Route exact path="/fichetechnique/addStep/:id" component={AddStepToFicheTechnique}/>
            <Route exact path="/fichetechnique/addIngredient/:id" component={AddIngredientToStep}/>
            <Route exact path="/fichetechnique/editStep/:id" component={EditStep}/>
            <Route exact path="/fichetechnique/edit/:id" component={EditFicheTechnique}/>
            <Route exact path="/fichetechnique/editIngredient/:id" component={EditIngredientInStep}/>
            <Route exact path="/couts" component={Costs}/>
            <Route exact path="/couts/edit" component={EditCosts}/>
            <Route exact path="/labels" component={Label}/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
