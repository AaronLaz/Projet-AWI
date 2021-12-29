import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getIngredients } from '../api/ingredient.api';
import './Table.css';

export default function Table() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const searchIngredients = () => {
    const regex = new RegExp(search.toLowerCase());
    const result = ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
    setResults(result);
  }

  const toBoolean = (bool) => {
    if(bool == 1){
      return "Oui";
    }else{
      return "Non";
    }
  }

  useEffect(() => {
    getIngredients().then((result) => {
      setIngredients(result);
      setResults(result);
    });
  }, []);

  return (
    <><Helmet>Mercurial</Helmet>
    <div style={{ height: 400, width: '100%' }}>
      <div className="mercurial-header-div">
        <div>
          <input className="mercurial-search-input" type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
          <button className="mercurial-search-button" onClick={() => searchIngredients()}>Rechercher</button>
        </div>
        <a className='mercurial-add-link' href='/mercurial/add'><button className="mercurial-add-button">Ajouter</button></a>
      </div>
      <table className="mercurial-table">
        <thead className="mercurial-thead">
          <tr>
            <th className="mercurial-thead-th">CODE</th>
            <th className="mercurial-thead-th">LIBELLE</th>
            <th className="mercurial-thead-th">UNITE</th>
            <th className="mercurial-thead-th">PRIX UNITAIRE</th>
            <th className="mercurial-thead-th">STOCKS</th>
            <th className="mercurial-thead-th">VALEUR DU STOCK</th>
            <th className="mercurial-thead-th">ALLERGENE</th>
            <th className="mercurial-thead-th">Voir les détails</th>
          </tr>
        </thead>
        <tbody>
          {results.map((i) => (
            <tr key={i.code}>
              <th className="mercurial-thead-th">{i.code}</th>
              <th className="mercurial-tbody-th">{i.libelle}</th>
              <th className="mercurial-thead-th">{i.unit}</th>
              <th className="mercurial-thead-th">{i.unitprice}€</th>
              <th className="mercurial-thead-th">{i.stocks}</th>
              <th className="mercurial-thead-th">{i.stockvalue}€</th>
              <th className="mercurial-thead-th">{toBoolean(i.allergene)}</th>
              <th className="mercurial-thead-th"><Link to={`/ingredient/${i.code}`}>Voir</Link></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
}