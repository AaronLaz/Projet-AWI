import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCosts, setCosts } from '../api/costs.api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './IngredientForm.css';

export default function EditCosts() {
  const [fluides, setFluides] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [markup, setMarkup] = useState([]);
  const [markupnocharges, setMarkupNoCharges] = useState([]);
  const [charges, setCharges] = useState([]);
  const history = useHistory();

  const navDetail = () => {
      const url = `/couts`;
      history.push(url);
  }
  
  useEffect(() => {
    getCosts().then((result) => {
      setFluides(result.fluides);
      setPersonnel(result.personnel);
      setMarkup(result.markup);
      setMarkupNoCharges(result.markupnocharges);
      setCharges(result.charges);
    });
  }, []);

  const submit = () => {
      let val = 0;
      if(charges){
          val=1;
      }
      const cost = {
          "fluides":fluides,
          "personnel":personnel,
          "markup":markup,
          "markupnocharges":markupnocharges,
          "charges":val,
      };
      setCosts(cost).then(() => {navDetail();});
  }
  
  return (
    <><Helmet>Coûts</Helmet>
    <div style={{ height: 400, width: '100%' }}>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Paramètres des coûts de l'application</h3>
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
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="markup">Multiplicateur du prix avec charges</label>
                        <input className='FormInput' defaultValue={markup} id="markup" type="number" onChange={(event) => setMarkup(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="markupnocharges">Multiplicateur du prix sans charges</label>
                        <input className='FormInput' defaultValue={markupnocharges} id="markupnocharges" type="number" onChange={(event) => setMarkupNoCharges(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="charges">Utiliser charges par défaut?</label>
                        <input className='FormInput' checked={charges} id="charges" type="checkbox" onChange={(event) => setCharges(event.target.checked)} />
                    </div>
                </div>
                    <button className="FormSubmit" onClick={() => submit()}>Confirmer</button>
                    <button className="DelButton" onClick={() => navDetail()}>Annuler</button>
            </div>
        </div>
    </div></>
  );
}