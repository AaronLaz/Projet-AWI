import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getFicheTechniques } from '../api/fichetechnique.api';


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
        <div style={{ height: 400, width: '100%' }}>
            <input type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
            <button onClick={() => searchFichesTechniques()}>Search</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>INTITULE</th>
                    <th>DESCRIPTION</th>
                    <th>AUTEUR</th>
                    <th>RESPONSABLE</th>
                    <th>NBRE DE COUVERTS</th>
                    <th>Voir la fiche technique</th>
                </tr>
                </thead>
                <tbody>
                {results.map((f) => (
                    <tr key={f.id}>
                        <th>{f.id}</th> 
                        <th>{f.name}</th>    
                        <th>{f.header}</th>
                        <th>{f.author}</th>
                        <th>{f.responsable}</th>
                        <th>{f.nbserved}</th>
                        <th><Link to={`/fichetechnique/${f.id}`}>Voir</Link></th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
}