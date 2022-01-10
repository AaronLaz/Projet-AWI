import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCosts } from '../api/costs.api';
import './FicheTechnique.css';

export default function Costs() {
  const [costs, setCosts] = useState([]);

  const toBoolean = (value) => {
    if(value){
      return "Oui";
    }else{
      return "Non";
    }
  }
  
  useEffect(() => {
    getCosts().then((result) => {
      setCosts(result);
    });
  }, []);
  
  return (
    <><Helmet>Coûts</Helmet>
    <div className='FormContainer'>
      <div className="Form">
        <h3>Cout des charges</h3>
        <div className="grid3">
          <label htmlFor="fluides">Couts des fluides :</label>
          <input id="fluides" type="text" disabled value={costs.fluides+"€ / h"}/>
        </div>
        <div className="grid3">
          <label htmlFor="personnel">Couts du personnel :</label>
          <input id="personnel" type="text" disabled value={costs.personnel+"€ / h"}/>
        </div>
        <h3>Calcul du prix de vente</h3>
        <div className="grid3">
          <label htmlFor="tac">Taux avec charges :</label>
          <input id="tac" type="text" disabled value={costs.markup+"%"}/>
        </div>
        <div className="grid3">
          <label htmlFor="tsc">Taux sans charges :</label>
          <input id="tsc" type="text" disabled value={costs.markupnocharges+"%"}/>
        </div>
        <h3>Réglage par défaut</h3>
        <div className="grid3">
          <label htmlFor="b">Utiliser les charges pour le calcul des couts :</label>
          <input id="b" type="text" disabled value={toBoolean(costs.charges)}/>
        </div>
        <div>
          <a href='/couts/edit'><button className='AddButton'>Modifier</button></a>
        </div>
      </div>
    </div></>
  );
}