import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getFicheTechniques } from '../api/fichetechnique.api';
import { Loading } from './loading';
import './Table.css'


export default function ListeFicheTechniques() {

    const [FicheTechniques, setFicheTechniques] = useState([]);
    const [search, setSearch] = useState('');
    const [catSearch, setCatSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getFicheTechniques().then((result) => {
            setFicheTechniques(result);
            setResults(result);
            setupCategories(result);
        });
        setTimeout(() => setLoading(true),1000);
      }, []);

    const setupCategories = (techdocs) => {
        let tempList = [];
        techdocs.forEach((doc) => {
            if(!tempList.includes(doc.category)){
                tempList.push(doc.category);
            }
        });
        setCategories(tempList);
    }

    const searchFichesTechniques = () => {
        const regex = new RegExp(search.toLowerCase());
        const result = FicheTechniques.filter(FicheTechnique => FicheTechnique.name.toLowerCase().match(regex));
        setResults(result);
      }
    
    const searchByCategory = () => {
        const regex = new RegExp(catSearch.toLowerCase());
        const result = FicheTechniques.filter(FicheTechnique => FicheTechnique.category.toLowerCase().match(regex));
        setResults(result);
    }

    return(
        loading ?
        <>
        <Helmet><title>Liste des Fiches Techniques</title></Helmet>
        <div>
            <div className="mercurial-header-div">
                <div>
                   <input className="mercurial-search-input" type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
                    <button className="mercurial-search-button" onClick={() => searchFichesTechniques()}>Chercher</button> 
                </div>
                <div>
                    <select className="mercurial-search-input" name="steps" id="steps" onChange={(event) => setCatSearch(event.target.value)}>
                        <option value="">Tous</option>
                        {categories.map((f) => (
                            <>
                            <option key={f} value={f}>{f}</option>
                            </>
                        ))}
                    </select>
                    <button className="mercurial-search-button" onClick={() => searchByCategory()}>Chercher</button> 
                </div>
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
                        <td className="mercurial-thead-th">{f.id}</td> 
                        <td className="mercurial-tbody-th">{f.name}</td>    
                        <td className="mercurial-tbody-th">{f.header}</td>
                        <td className="mercurial-thead-th">{f.author}</td>
                        <td className="mercurial-thead-th">{f.responsable}</td>
                        <td className="mercurial-thead-th">{f.nbserved}</td>
                        <td className="mercurial-thead-th"><Link to={`/fichetechnique/${f.id}`}>Voir</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
        : <Loading></Loading>
    );
}