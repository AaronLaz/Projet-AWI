import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCosts } from '../api/costs.api';
import './IngredientForm.css';

export default function Costs() {
  const [costs, setCosts] = useState([]);

  const toBoolean = (value) => {
    return (value==1).toString();
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
        <p>Couts des fluides : {costs.fluides}€ / h</p>
        <p>Couts du personnel : {costs.personnel}€ / h</p>
        <h3>Calcul du prix de vente</h3>
        <p>Taux avec charges : {costs.markup}%</p>
        <p>Taux sans charges : {costs.markupnocharges}%</p>
        <h3>Réglage par défaut</h3>
        <p>Utiliser les charges pour le calcul des couts ? {toBoolean(costs.charges)}</p>
        <div className="mercurial-header-div">
          <a href='/couts/edit'><button className='AddButton'>Modifier</button></a>
        </div>
      </div>
    </div></>
  );
}