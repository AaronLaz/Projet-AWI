import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getIngredient } from '../api/ingredient.api';
import './IngredientForm.css';

export default function DetailIngredient() {
    const [ingredient, setIngredient] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getIngredient(id).then((result) => {
            setIngredient(result);
        });
      }, []);
    return (
        <>
        <Helmet>Detail Ingredient</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Detail Ingredient</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="code">Code</label>
                        <input disabled className='FormInput' placeholder="Code" id="code" type="number" value={id}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="libelle">Libelle</label>
                        <input disabled className='FormInput' placeholder="Libellé" id="libelle" type="text" value={ingredient.libelle}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="unite">Unité</label>
                        <input disabled className='FormInput' placeholder="Unité" id="unit" type="text" value={ingredient.unit}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="prix_unitaire">Prix Unitaire (€)</label>
                        <input disabled className='FormInput' type="number" step="0.01" name="prix_unitaire" placeholder="0.00" value={ingredient.unitprice}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="stocks">Stocks</label>
                        <input disabled className='FormInput' type="number" step="1" name="stocks" placeholder="0" value={ingredient.stocks}/>
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel'>Allergène</label>
                        <input disabled className='FormInput' name="allergen" type="checkbox" checked={ingredient.allergene}/>
                    </div>
                </div>
            </div>
        </div></>
    )
}