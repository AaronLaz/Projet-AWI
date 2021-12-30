import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { getIngredient, addStock } from '../api/ingredient.api';
import './IngredientForm.css';

export default function AddStock() {
    const [ingredient, setIngredient] = useState([]);
    const [stock, setStock] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getIngredient(id).then((result) => {
            setIngredient(result);
            setStock(0);
        });// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    const navDetail = () => {
        const url = `/ingredient/${id}`;
        history.push(url);
    }

    const ajoutStock = () => {
        addStock(id, Number.parseInt(ingredient.stocks)+Number.parseInt(stock), ingredient.unitprice).then(() => navDetail());
    }


    return (
        <>
        <Helmet>Modifier Stock</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter du stock</h3>
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
                        <label className='FormLabel' for="stocks">Stock à ajouter</label>
                        <input className='FormInput' type="number" step="1" name="stocks" placeholder="0" value={stock} onChange={(event) => setStock(event.target.value)}/>
                    </div>
                </div>
                <button className="DelButton" onClick={() => navDetail()}>Annuler</button>
                <button className="AddButton" onClick={() => ajoutStock()}>Ajouter</button>
            </div>
        </div></>
    )
}