import React, { useEffect, useState, Link } from 'react';
import { Helmet } from 'react-helmet';
import { getFicheTechniques } from '../api/fichetechnique.api';
import { Loading } from './loading';

export const Label = () => {

    const [FicheTechniques, setFicheTechniques] = useState([]);
    const [ListeRecettes, setListeRecettes] = useState([]);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFicheTechniques().then((result) => {
            setFicheTechniques(result);
          });
          setTimeout(() => setLoading(true),1000);
      }, []);

    const searchFichesTechniques = () => {
        const regex = new RegExp(search.toLowerCase());
        const result = FicheTechniques.filter(FicheTechnique => FicheTechnique.name.toLowerCase().match(regex));
        setResults(result);
    }

    const ajouterRecette = (f) => {
        setListeRecettes((old) => [...old, f]);
    }

    const supprimerRecette = (f) => {
        const i = ListeRecettes.indexOf(f);
        ListeRecettes.splice(i,1)
        setListeRecettes(ListeRecettes.slice(0));
    }

  return (
      loading ?
      <>
      <Helmet>Imprimer une étiquette</Helmet>
      <div>
            <div className="mercurial-header-div">
                <div>
                   <input className="mercurial-search-input" type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
                    <button className="mercurial-search-button" onClick={() => searchFichesTechniques()}>Search</button> 
                </div>
                <a className='mercurial-add-link' href='/fichetechniques/add'><button className="mercurial-add-button">Ajouter</button></a>
            </div>
            <table className="mercurial-table">
                <thead className="mercurial-thead">
                <tr>
                    <th className="mercurial-thead-th">ID</th>
                    <th className="mercurial-thead-th">INTITULE</th>
                    <th className="mercurial-thead-th">DESCRIPTION</th>
                    <th className="mercurial-thead-th">RESPONSABLE</th>
                    <th className="mercurial-thead-th">NBRE DE COUVERTS</th>
                    <th className="mercurial-thead-th">Ajouter à l'étiquette</th>
                </tr>
                </thead>
                <tbody>
                {results.map((f) => (
                    <tr key={f.id}>
                        <td className="mercurial-thead-th">{f.id}</td> 
                        <td className="mercurial-tbody-th">{f.name}</td>    
                        <td className="mercurial-tbody-th">{f.header}</td>
                        <td className="mercurial-thead-th">{f.responsable}</td>
                        <td className="mercurial-thead-th">{f.nbserved}</td>
                        <td><button className="mercurial-thead-th" onClick={() => ajouterRecette(f)}>Ajouter</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {ListeRecettes.length !== 0 ?
            <table className="mercurial-table">
                <thead className="mercurial-thead">
                <tr>
                    <th className="mercurial-thead-th">ID</th>
                    <th className="mercurial-thead-th">INTITULE</th>
                    <th className="mercurial-thead-th">DESCRIPTION</th>
                    <th className="mercurial-thead-th">RESPONSABLE</th>
                    <th className="mercurial-thead-th">NBRE DE COUVERTS</th>
                    <th className="mercurial-thead-th">Supprimer de l'étiquette</th>
                </tr>
                </thead>
                <tbody>
                {ListeRecettes.map((i) => (
                    <tr key={i.id}>
                        <td className="mercurial-thead-th">{i.id}</td> 
                        <td className="mercurial-tbody-th">{i.name}</td>    
                        <td className="mercurial-tbody-th">{i.header}</td>
                        <td className="mercurial-thead-th">{i.responsable}</td>
                        <td className="mercurial-thead-th">{i.nbserved}</td>
                        <td><button className="mercurial-thead-th" onClick={() => supprimerRecette(i)}>Supprimer</button></td>
                    </tr>
                ))}
                </tbody>
            </table> : null
            }
        </div> 
      </> : <Loading></Loading>
  );
}