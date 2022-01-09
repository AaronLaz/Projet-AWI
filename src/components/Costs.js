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
        <p>Couts des fluides : {costs.fluides}€ / h</p>
        <p>Couts du personnel : {costs.personnel}€ / h</p>
        <p>Markup : {costs.markup}%</p>
        <p>Markup without charges : {costs.markupnocharges}%</p>
        <p>Charges ? {toBoolean(costs.charges)}</p>
        <div className="mercurial-header-div">
          <a href='/couts/edit'><button className='AddButton'>Modifier</button></a>
        </div>
      </div>
    </div></>
  );
}