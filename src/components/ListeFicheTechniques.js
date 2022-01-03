import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getFicheTechniques } from '../api/fichetechnique.api';
import './Table.css'


export default function ListeFicheTechniques() {

    const [FicheTechniques, setFicheTechniques] = useState([]);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        getFicheTechniques().then((result) => {
          setFicheTechniques(result);
          setResults(result);
        });
      }, []);

    const searchFichesTechniques = () => {
        const regex = new RegExp(search.toLowerCase());
        const result = FicheTechniques.filter(FicheTechnique => FicheTechnique.name.toLowerCase().match(regex));
        setResults(result);
      }

    return(
        <>
        <Helmet><title>Liste des Fiches Techniques</title></Helmet>
        <div>
            <div className="mercurial-header-div">
                <input className="mercurial-search-input" type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
                <button className="mercurial-search-button" onClick={() => searchFichesTechniques()}>Search</button>
                <a className='mercurial-add-link' href='/fichetechniques/add'><button className="mercurial-add-button">Ajouter</button></a>
            </div>
            <table className="mercurial-table">
                <thead className="mercurial-thead">
                <tr>
                    <th className="mercurial-thead-th">ID</th>
                    <th className="mercurial-thead-th">INTITULE</th>
                    <th className="mercurial-thead-th">DESCRIPTION</th>
                    <th className="mercurial-thead-th">AUTEUR</th>
                    <th className="mercurial-thead-th">RESPONSABLE</th>
                    <th className="mercurial-thead-th">NBRE DE COUVERTS</th>
                    <th className="mercurial-thead-th">Voir la fiche technique</th>
                </tr>
                </thead>
                <tbody>
                {results.map((f) => (
                    <tr key={f.id}>
                        <th className="mercurial-thead-th">{f.id}</th> 
                        <th className="mercurial-tbody-th">{f.name}</th>    
                        <th className="mercurial-tbody-th">{f.header}</th>
                        <th className="mercurial-thead-th">{f.author}</th>
                        <th className="mercurial-thead-th">{f.responsable}</th>
                        <th className="mercurial-thead-th">{f.nbserved}</th>
                        <th className="mercurial-thead-th"><Link to={`/fichetechnique/${f.id}`}>Voir</Link></th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
}