import React, { Component } from 'react'

export default class IngredientForm extends Component {
    render() {
        return (
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="Libellé" id="libelle" type="text" class="validate" />
                            <label for="libelle">Libelle</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select>
                            <option value="" disabled selected>Choisir l'unité</option>
                            <option value="1">KG</option>
                            <option value="2">L</option>
                            <option value="3">Unités</option>
                        </select>
                        <label>Unité</label>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="number" step="0.01" name="prix_unitaire" placeholder="0.00" class="validate"/>
                            <label for="prix_unitaire">Prix Unitaire (€)</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="number" step="1" name="stocks" placeholder="0" class="validate"/>
                            <label for="stocks">Stocks</label>
                        </div>
                        <div class="input-field col s12">
                            <input type="text" step="1" name="stocks_val" placeholder="" class="validate"/>
                            <label for="stocks_val">Stocks Val</label>
                        </div>
                    </div>
                    <div>
                        <label>Allergène</label>
                        <p>
                            <input name="allergene" type="radio" id="true" />
                            <label for="true">Oui</label>
                        </p>
                        <p>
                            <input name="allergene" type="radio" id="false" />
                            <label for="false">Non</label>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}