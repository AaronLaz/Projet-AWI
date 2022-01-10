import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getTickets } from '../api/fichetechnique.api';
import EditionEtiquette from './EditionEtiquette';
import { Loading } from './loading';

export const Label = () => {
    
    const [FicheTechniques, setFicheTechniques] = useState([]);
    const [ListeRecettes, setListeRecettes] = useState([]);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(true);


    useEffect(() => {
        getTickets().then((result) => {
            setFicheTechniques(result);
            setResults(result);
          });
          setTimeout(() => setLoading(true),1000);
      }, []);

    const searchFichesTechniques = () => {
        const regex = new RegExp(search.toLowerCase());
        const result = FicheTechniques.filter(FicheTechnique => FicheTechnique.name.toLowerCase().match(regex));
        setResults(result);
    }

    const ajouterRecette = (f) => {
        const fiche = (element) => element.fiche=== f;
        const index = ListeRecettes.findIndex(fiche);
        if(index === -1){
            ListeRecettes.push({"fiche": f,"quantite": 1});
        } else{
            ListeRecettes[index].quantite+=1;
        }
        setListeRecettes(ListeRecettes.slice(0));
    }

    const supprimerRecette = (f) => {
        const fiche = (element) => element.fiche=== f;
        const index = ListeRecettes.findIndex(fiche);
        if(ListeRecettes[index].quantite === 1){
            ListeRecettes.splice(index,1);
        } else{
            ListeRecettes[index].quantite-=1;
        }
        setListeRecettes(ListeRecettes.slice(0));
    }
    const resetRecettes = () => {
        setListeRecettes([]);
    }

  return (
      loading ?
      <>
      <Helmet>Imprimer une étiquette</Helmet>
      { step ?
      <div className="containerLabel">
            <h3>Liste des fiches techniques</h3>
            <div className="searchForLabel">
                <input className="mercurial-search-input" type="text" onChange={(ev) => setSearch(ev.target.value)} placeholder="Recherche par libellé"></input>
                <button className="mercurial-search-button" onClick={() => searchFichesTechniques()}>Search</button> 
                <button className="mercurial-search-button" onClick={() => resetRecettes()}>Reinitialiser</button>
            </div>
            <table className="mercurial-table">
                <thead className="mercurial-thead">
                <tr>
                    <th className="mercurial-thead-th">INTITULE</th>
                    <th className="mercurial-thead-th">Ajouter à l'étiquette</th>
                </tr>
                </thead>
                <tbody>
                {results.map((f) => (
                    <tr key={f.id}>
                        <td className="mercurial-tbody-th">{f.name}</td>
                        <td className="mercurial-thead-th"><button className='AddButton2' onClick={() => ajouterRecette(f)}>Ajouter</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3 className="labelTitle">Contenu de l'étiquette</h3>
            <table className="mercurial-table">
                <thead className="mercurial-thead">
                <tr>
                    <th className="mercurial-thead-th">INTITULE</th>
                    <th className="mercurial-thead-th">QUANTITE</th>
                    <th className="mercurial-thead-th">Retirer de l'étiquette</th>
                </tr>
                </thead>
                <tbody>
                {ListeRecettes.map((i) => (
                    <tr key={i.fiche.id}>
                        <td className="mercurial-tbody-th">{i.fiche.name}</td>
                        <td className="mercurial-tbody-th">{i.quantite}</td>
                        <td className="mercurial-thead-th"><button className="DelButton2" onClick={() => supprimerRecette(i.fiche)}>Retirer 1</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {ListeRecettes.length !== 0 ?
                <button className="ModifyButton" onClick={() => setStep(false)}>Edition de l'étiquette</button> : null
            }
        </div> : <EditionEtiquette liste={ListeRecettes}/>
        } 
      </> : <Loading></Loading>
  );
}