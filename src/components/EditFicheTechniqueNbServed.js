import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Loading } from './loading';
import './IngredientForm.css';
import { getFicheTechnique, editFicheTechnique, editIngredientInStep } from '../api/fichetechnique.api';

export default function EditFicheTechniqueNbServed() {
    const [fichetechnique, setFicheTechnique] = useState();
    const [nbserved, setNbserved] = useState();
    const [initNbServed, setInitNbServed] = useState();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }
    
    const toInt = (val) => {
        if(val){
            return 1;
        }else{
            return 0;
        }
    }

    const submitHeader = () => {
        const techdoc = {
            "id":parseInt(id),
            "name":fichetechnique.name,
            "header":fichetechnique.header,
            "author":fichetechnique.author,
            "responsable":fichetechnique.responsable,
            "category":fichetechnique.category,
            "nbserved":parseInt(nbserved),
            "default":toInt(fichetechnique.default),
            "usecharges":toInt(fichetechnique.usecharges),
            "assaisonemments":fichetechnique.assaisonemments
        };
        console.log("Init : "+initNbServed);
        console.log("Final : "+nbserved);
        fichetechnique.steps.forEach((s) => {
            s.ingredients.forEach((i) => {
                const data = {
                    "stepid": s.stepid,
                    "ingredientcode": i.code,
                    "quantity": (i.quantity / initNbServed) * nbserved,
                };
                editIngredientInStep(data);
            });
        });
        editFicheTechnique(techdoc).then((result) => {navDetail();});
    }

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setFicheTechnique(result);
            setInitNbServed(result.nbserved);
            setNbserved(result.nbserved);
        });
        setTimeout(() => setLoading(true),1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        loading ? 
        <>
        <Helmet>Modifier la Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Modifier Nombre de couverts dans Fiche Technique</h3>
                <p>Cette modification impacte les quantités des ingrédients dans la fiche technique.</p>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for='nbserved'>Nombre de couverts</label>
                        <input className='FormInput' name="nbserved" type="number" step="1" value={nbserved} onChange={(event) => setNbserved(event.target.value)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => {submitHeader();}}>Enregistrer</button>
                <button className='DelButton' onClick={() => {navDetail();}}>Annuler</button>
            </div>
        </div>
        </>
        : <Loading></Loading>
    )
}

