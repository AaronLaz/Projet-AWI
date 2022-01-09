import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { getIngredient, updateIngredient } from '../api/ingredient.api';
import './IngredientForm.css';

export default function ModifyIngredient() {
    const { id } = useParams();
    const history = useHistory();
    const [libelle, setLibelle] = useState();
    const [unit, setUnit] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [allergen, setAllergen] = useState();

    useEffect(() => {
        getIngredient(id).then((result) => {
            setLibelle(result.libelle);
            setUnit(result.unit);
            setPrice(result.unitprice);
            setStock(result.stocks);
            setAllergen(result.allergene);
        });// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    const navDetail = () => {
        const url = `/ingredient/${id}`;
        history.push(url);
    }

    const update = () => {
        updateIngredient(id, libelle, unit, price, stock, stock*price, allergen).then(() => navDetail());
    }

    return (
        <>
        <Helmet>Detail Ingredient</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Detail Ingredient</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="code">Code</label>
                        <input disabled className='FormInput' id="code" type="number" value={id}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="libelle">Libelle</label>
                        <input className='FormInput' id="libelle" type="text" value={libelle} onChange={(event) => setLibelle(event.target.value)}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="unite">Unité</label>
                        <input className='FormInput' id="unit" type="text" value={unit} onChange={(event) => setUnit(event.target.value)}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="prix_unitaire">Prix Unitaire (€)</label>
                        <input className='FormInput' type="number" step="0.01" name="prix_unitaire" value={price} onChange={(event) => setPrice(event.target.value)}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="stocks">Stocks</label>
                        <input className='FormInput' type="number" step="1" name="stocks" value={stock} onChange={(event) => setStock(event.target.value)}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel'>Allergène</label>
                        <input className='FormInput' name="allergen" type="checkbox" checked={allergen} onChange={(event) => setAllergen(event.target.checked)}/>
                    </div>
                </div>
                <div className="ButtonDiv">
                    <button className="DelButton" onClick={() => navDetail()}>Annuler</button>
                    <button className="ModifyButton" onClick={() => update()}>Confirmer</button>
                </div>
            </div>
        </div></>
    )
}