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
  const [catSearch, setCatSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchIngredients = () => {
    const regex = new RegExp(search.toLowerCase());
    const result = ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
    setResults(result);
  }

  const allCat = {
    "min":0,
    "max":100000,
    "category":"Tous",
  };

  const toBoolean = (bool) => {
    if(bool === 1){
      return "Oui";
    }else{
      return "Non";
    }
  }
    
  const searchByCategory = () => {
    let cat = catSearch.split('|');
    const result = ingredients.filter(ingredient => (ingredient.code >= cat[0] && ingredient.code <= cat[1]));
    setResults(result);
  }

  // categorisation search is done by comparing the ingredient code to the categories initialised below.
  const initCategories = () => {
    let array = [];
    array.push(allCat);
    let a = {
      "min":100,
      "max":199,
      "category":"Viandes / Volailles",
    };
    array.push(a);
    a = {
      "min":200,
      "max":299,
      "category":"Poisson et Crustaces",
    };
    array.push(a);
    a = {
      "min":300,
      "max":399,
      "category":"Crèmerie",
    };
    array.push(a);
    a = {
      "min":400,
      "max":499,
      "category":"Fruits et Légumes",
    };
    array.push(a);
    a = {
      "min":500,
      "max":1000000,
      "category":"Epicerie",
    };
    array.push(a);
    setCategories(array);
  }

  useEffect(() => {
    getIngredients().then((result) => {
      setIngredients(result);
      setResults(result);
      initCategories();
      setCatSearch(allCat);
    });
    setTimeout(() => setLoading(true),1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div>
              <select className="mercurial-search-input" name="steps" id="steps" onChange={(event) => setCatSearch(event.target.value)}>
                  {categories.map((c) => (
                            <option key={c.category} value={`${c.min}|${c.max}`}>{c.category}</option>
                        ))}
              </select>
              <button className="mercurial-search-button" onClick={() => searchByCategory()}>Chercher</button> 
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