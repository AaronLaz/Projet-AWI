import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FicheTechnique.css';
import { getFicheTechnique, editIngredientInStep, deleteIngredientFromStep } from '../api/fichetechnique.api';

export default function EditIngredientInStep() {
    const [steps, setSteps] = useState([]);
    const [step, setStep] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState();
    const [quantity, setQuantity] = useState();
    const history = useHistory();
    const { id } = useParams();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }

    const submitHeader = () => {
        if(step == undefined || ingredient == undefined){
            window.alert("Attention! Il faut obligatoirement séléctionner une étape et un ingrédient.")
        }else{
            const s = {
                "stepid": step.stepid,
                "ingredientcode": ingredient.code,
                "quantity": quantity,
            }
            editIngredientInStep(s).then((result) => {navDetail();});
        }
    }

    const setToStep = (sid) => {
        steps.forEach((s) => {
            if(s.stepid == sid){
                setIngredients(s.ingredients);
                setStep(s);
            }
        })
    }

    const setToIngredient = (c) => {
        ingredients.forEach((i) => {
            if(i.code = c){
                setIngredient(i);
                setQuantity(i.quantity);
            }
        })
    }

    const deleteIngredient = () => {
        if(step == undefined || ingredient == undefined){
            window.alert("Attention! Il faut obligatoirement séléctionner une étape et un ingrédient.")
        }else{
            const data = {
                "stepid":step.stepid,
                "ingredientcode":ingredient.code,
            }
            deleteIngredientFromStep(data).then((result) => {
                navDetail();
            })
        }
    }

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setSteps(result.steps)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
        <Helmet>Ajouter Une Etape la Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Une Etape la Fiche Technique</h3>
                <div>
                    <label for="steps">Selectionnez l'étape : </label>
                    <select name="steps" id="steps" onChange={(event) => setToStep(event.target.value)}>
                        <option>Aucun</option>
                        {steps.map((s) => (
                            <>
                            <option key={s.stepid} value={s.stepid}>{s.title}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="steps">Selectionnez l'ingrédient : </label>
                    <select name="ingredient" id="ingredient" onChange={(event) => setToIngredient(event.target.value)}>
                        <option>Aucun</option>
                        {ingredients.map((s) => (
                            <>
                            <option key={s.code} value={s.code}>{s.libelle}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="quantity">Quantité</label>
                        <input className='FormInput' type="number" name="quantity" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                    </div>
                </div>
                <div className="ButtonDiv">
                    <button className='AddButton' onClick={() => submitHeader()}>Enregistrer</button>
                    <button className='FormSubmit' onClick={() => navDetail()}>Annuler</button>
                    <button className='DelButton' onClick={() => deleteIngredient()}>Supprimer</button>
                </div>
            </div>
        </div>
        </>
    )
}

