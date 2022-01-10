import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './IngredientForm.css';
import { addIngredientToStep, getFicheTechnique } from '../api/fichetechnique.api';
import { getIngredients } from '../api/ingredient.api';

export default function AddIngredientToStep() {
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [stepid, setStepId] = useState();
    const [ingredientcode, setCode] = useState();
    const [quantity, setQuantity] = useState();
    const history = useHistory();
    const { id } = useParams();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }

    const submit = () => {
        if(stepid === undefined || ingredientcode === undefined || quantity === ""){
            window.alert("Attention! Il faut obligatoirement séléctionner une étape, un ingrédient et une quantité.")
        }else{
            const join = {
                "stepid":stepid,
                "ingredientcode":ingredientcode,
                "quantity":quantity,
            };
            addIngredientToStep(join).then((result) => {navDetail();});
        }
    }

    useEffect(() => {
        getIngredients().then((result)  => {
            setIngredients(result);
        })
        getFicheTechnique(id).then((result) => {
            setSteps(result.steps);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
        <Helmet>Ajouter un ingrédient à une étape</Helmet>
        <div className='FormContainer'>
            <div className='IForm'>
                <h3>Ajouter un ingrédient à une étape</h3>
                <div className='grid3'>
                    <label className='FormLabel' for="steps">Selectionnez l'étape :</label>
                    <select name="steps" id="steps" onChange={(event) => setStepId(event.target.value)}>
                        <option>Aucun</option>
                        {steps.map((s) => (
                            <option key={s.stepid} value={s.stepid}>{s.title}</option>
                        ))}
                    </select>
                </div>
                <div className='grid3'>
                    <label className='FormLabel' for="ingredients">Selectionnez l'ingrédient :</label>
                    <select name="ingredients" id="ingredients" onChange={(event) => setCode(event.target.value)}>
                        <option>Aucun</option>
                        {ingredients.map((i) => (
                            <option key={i.code} value={i.code}>{i.code.toString()+" - "+i.libelle}</option>
                        ))}
                    </select>
                </div>
                <div className='grid3'>
                    <label className='FormLabel' for="quantity">Quantité :</label>
                    <input className='FormInput' placeholder="1" id="quantity" type="number" onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <button className='FormSubmit' onClick={() => submit()}>Ajouter</button>
                <button className='DelButton' onClick={() => navDetail()}>Annuler</button>
            </div>
        </div>
        </>
    )
}