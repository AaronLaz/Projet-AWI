import React, { Component, useState } from 'react';
import { postIngredient } from '../api/ingredient.api';

export default function IngredientForm() {

    const [code, setCode] = useState();
    const [libelle, setLibelle] = useState();
    const [unit, setUnit] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [allergen, setAllergen] = useState(false);

    const submit = () => {
        postIngredient(code, libelle, unit, price, stock, stock*price, allergen);
    }

    return (
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input placeholder="Code" id="code" type="number" class="validate" onChange={(event) => setCode(event.target.value)}/>
                        <label for="code">Code</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input placeholder="Libellé" id="libelle" type="text" class="validate" onChange={(event) => setLibelle(event.target.value)}/>
                        <label for="libelle">Libelle</label>
                    </div>
                </div>
                <div class="input-field col s12">
                    <div class="input-field col s12">
                        <input placeholder="Unité" id="unit" type="text" class="validate" onChange={(event) => setUnit(event.target.value)}/>
                        <label for="unite">Unité</label>
                    </div>
                </div>
                <div class="row">
                    <div class="row">
                        <input type="number" step="0.01" name="prix_unitaire" placeholder="0.00" class="validate" onChange={(event) => setPrice(event.target.value)}/>
                        <label for="prix_unitaire">Prix Unitaire (€)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="number" step="1" name="stocks" placeholder="0" class="validate" onChange={(event) => setStock(event.target.value)}/>
                        <label for="stocks">Stocks</label>
                    </div>
                </div>
                <div>
                    <label>Allergène</label>
                    <input name="allergen" type="checkbox" onChange={(event) => setAllergen(event.target.checked)}/>
                </div>
                <div>
                    <button onClick={() => submit()}>Ajouter l'Ingredient</button>
                </div>
            </div>
        </div>
    )
}