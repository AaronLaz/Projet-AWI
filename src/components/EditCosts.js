import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCosts, setCosts } from '../api/costs.api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FicheTechnique.css';

export default function EditCosts() {
  const [fluides, setFluides] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const history = useHistory();

  const navDetail = () => {
      const url = `/couts`;
      history.push(url);
  }
  
  useEffect(() => {
    getCosts().then((result) => {
      setFluides(result.fluides);
      setPersonnel(result.personnel);
    });
  }, []);

  const submit = () => {
      const cost = {
          "fluides":fluides,
          "personnel":personnel,
      };
      setCosts(cost).then(() => {navDetail();});
  }
  
  return (
    <><Helmet>Coûts</Helmet>
    <div style={{ height: 400, width: '100%' }}>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Entête de Fiche Technique</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="fluides">Couts des fluides</label>
                        <input className='FormInput' value={fluides} id="fluides" type="number" onChange={(event) => setFluides(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="personnel">Couts du personnel</label>
                        <input className='FormInput' value={personnel} id="personnel" type="number" onChange={(event) => setPersonnel(event.target.value)} />
                    </div>
                </div>
            </div>
        </div>
        <div className="mercurial-header-div">
            <button className="mercurial-add-button" onClick={() => submit()}>Confirmer</button>
            <a className='mercurial-add-link' href='/couts'><button className="mercurial-add-button">Annuler</button></a>
        </div>
    </div></>
  );
}