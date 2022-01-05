import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { getIngredient, supprIngredient } from '../api/ingredient.api';
import './IngredientForm.css';
import { Loading } from './loading';

export default function DetailIngredient() {
    const [ingredient, setIngredient] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getIngredient(id).then((result) => {
            setIngredient(result);
        });
        setTimeout(() => setLoading(true),1500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    const navDetail = () => {
        const url = `/mercurial`;
        history.push(url);
    }

    const deleteIngredient = () => {
        supprIngredient(id).then(() => navDetail());
    }

    const modifyIngredient = () => {
        const url = `/ingredient/update/${id}`;
        history.push(url);
    }

    const addStock = () => {
        const url = `/ingredient/addstock/${id}`;
        history.push(url);
    }

    return (
        loading ? <>
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
                <button className="DelButton" onClick={() => deleteIngredient()}>Supprimer</button>
                <button className="ModifyButton" onClick={() => modifyIngredient()}>Modifier</button>
                <button className="AddButton" onClick={() => addStock()}>Ajouter du stock</button>
            </div>
        </div></> : <Loading></Loading>
    )
}