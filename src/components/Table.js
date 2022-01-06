import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getIngredients } from '../api/ingredient.api';
import { Loading } from './loading';
import './Table.css';

export default function Table() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchIngredients = () => {
    const regex = new RegExp(search.toLowerCase());
    const result = ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
    setResults(result);
  }

  const toBoolean = (bool) => {
    if(bool === 1){
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
    setTimeout(() => setLoading(true),1000);
  }, []);

  return (
    loading ?
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
              <td className="mercurial-thead-th">{i.code}</td>
              <td className="mercurial-tbody-th">{i.libelle}</td>
              <td className="mercurial-thead-th">{i.unit}</td>
              <td className="mercurial-thead-th">{i.unitprice}€</td>
              <td className="mercurial-thead-th">{i.stocks}</td>
              <td className="mercurial-thead-th">{i.stockvalue}€</td>
              <td className="mercurial-thead-th">{toBoolean(i.allergene)}</td>
              <td className="mercurial-thead-th"><Link to={`/ingredient/${i.code}`}>Voir</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></> : <Loading></Loading>
  );
}