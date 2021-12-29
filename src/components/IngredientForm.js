import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { postIngredient } from '../api/ingredient.api';
import './IngredientForm.css';

export const IngredientForm = () => {

    const [code, setCode] = useState();
    const [libelle, setLibelle] = useState();
    const [unit, setUnit] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [allergen, setAllergen] = useState(false);
    const history = useHistory();

    const submit = () => {
        postIngredient(code, libelle, unit, price, stock, stock*price, allergen).then((result) => {navDetail();});
    }

    const navDetail = () => {
        const url = `/ingredient/${code}`;
        history.push(url);
    }

    return (
        <>
        <Helmet>Ajouter Ingredient</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Ingredient</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="code">Code</label>
                        <input className='FormInput' placeholder="Code" id="code" type="number" onChange={(event) => setCode(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="libelle">Libelle</label>
                        <input className='FormInput' placeholder="Libellé" id="libelle" type="text" onChange={(event) => setLibelle(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="unite">Unité</label>
                        <input className='FormInput' placeholder="Unité" id="unit" type="text" onChange={(event) => setUnit(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="prix_unitaire">Prix Unitaire (€)</label>
                        <input className='FormInput' type="number" step="0.01" name="prix_unitaire" placeholder="0.00" onChange={(event) => setPrice(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="stocks">Stocks</label>
                        <input className='FormInput' type="number" step="1" name="stocks" placeholder="0" onChange={(event) => setStock(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel'>Allergène</label>
                        <input className='FormInput' name="allergen" type="checkbox" onChange={(event) => setAllergen(event.target.checked)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => submit()}>Ajouter</button>
            </div>
        </div></>
    )
}