import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCosts } from '../api/costs.api';
import './Table.css';

export default function Costs() {
  const [costs, setCosts] = useState([]);
  
  useEffect(() => {
    getCosts().then((result) => {
      setCosts(result);
    });
  }, []);
  
  return (
    <><Helmet>Coûts</Helmet>
    <div style={{ height: 400, width: '100%' }}>
      <div className="mercurial-header-div">
        <a className='mercurial-add-link' href='/couts/edit'><button className="mercurial-add-button">Modifier</button></a>
      </div>
      <div>
        <p>Couts des fluides : {costs.fluides}€ / h</p>
        <p>Couts du personnel : {costs.personnel}€ / h</p>
      </div>
    </div></>
  );
}