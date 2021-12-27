import React, { Component, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { getIngredients } from '../api/ingredient.api';

export default function Table() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const searchIngredients = () => {
    const regex = new RegExp(search.toLowerCase());
    const result = ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
    setResults(result);
  }

  useEffect(() => {
    getIngredients().then((result) => {
      setIngredients(result);
      setResults(result);
    });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <input type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
      <button onClick={() => searchIngredients()}>Search</button>
      <table>
        <thead>
          <tr>
            <th>CODE</th>
            <th>LIBELLE</th>
            <th>UNITE</th>
            <th>PRIX UNITAIRE</th>
            <th>STOCKS</th>
            <th>VALEUR DU STOCK</th>
            <th>ALLERGENE</th>
          </tr>
        </thead>
        <tbody>
          {results.map((i) => (
            <tr key={i.code}>
              <th>{i.code}</th>
              <th>{i.libelle}</th>
              <th>{i.unit}</th>
              <th>{i.unitprice}</th>
              <th>{i.stocks}</th>
              <th>{i.stockvalue}</th>
              <th>{i.allergene}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}