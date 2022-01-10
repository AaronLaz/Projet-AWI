import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useReactToPrint } from 'react-to-print';
import { addStock } from '../api/ingredient.api';
import { Loading } from './loading';

export default function EditionEtiquette(props) {
    const [loading, setLoading] = useState(false);
    const [listeFiche, setListeFiche] = useState([]);
    const [vente, setVente] = useState(false);
    const [emporter, setEmporter] = useState(false);
    const history = useHistory();

    const referencePDF = useRef();
    const toPDF = useReactToPrint({
        content: () => referencePDF.current
    });

    const verifierStock = () => {
        let ok = true;
        let ingredients = [];
        listeFiche.forEach(fiche => {
            let ficheQuantite = fiche.quantite;
            fiche.fiche.ingredients.forEach(i => {
                const ingredient = (element) => element.code === i.code;
                const index = ingredients.findIndex(ingredient);
                if(index === -1){
                    ingredients.push(i);
                    const index2 = ingredients.findIndex(ingredient);
                    ingredients[index2].quantite*=ficheQuantite;
                } else{
                    ingredients[index].quantite+=i.quantite*ficheQuantite;
                }
            })
        })
        ingredients.forEach(i => {
            if(i.quantite > i.stocks){
                ok = false;
            }
        })
        return ok;
    }

    const modifierStock = () => {
        if(vente){
            if(verifierStock()){
                listeFiche.forEach(fiche => {
                    fiche.fiche.ingredients.forEach(i => {
                        addStock(i.code,i.stocks - i.quantite, i.unitprice);
                    })
                }) 
            } else{
                alert("Le stock n'est pas suffisant pour réaliser cette vente.");
                return;
            }
        }
        setTimeout(() => toPDF(), 2000);
        setTimeout(() => history.push(`/mercurial`), 2000);
    }

    useEffect(() => {
        setListeFiche(props.liste);
        setTimeout(() => setLoading(true), 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        loading ? <>
            <Helmet>Edition étiquette</Helmet>
            <div className="containerLabel">
                <h3>Edition de l'étiquette</h3>
                <div className="checkbox">
                    <div>
                        <input className="demo5" type="checkbox" id="vente" name="vente" onChange={(event) => setVente(event.target.checked)}/>
                        <label htmlFor="vente"></label>
                    </div>
                    <label className="checkbox-label">Vente</label>
                </div>
                <div className="checkbox">
                    <div>
                        <input className="demo5" type="checkbox" id="emporter" name="emporter" onChange={(event) => setEmporter(event.target.checked)}/>
                        <label htmlFor="emporter"></label>
                    </div>
                    <label className="checkbox-label">A Emporter</label>
                </div>
                <div className="label" ref={referencePDF}>
                    <table className="label-table">
                        <thead className="label-thead">
                            <tr>
                                <th className="label-thead-th">INTITULE</th>
                                <th className="label-thead-th">QUANTITE</th>
                                { emporter ? <th className="label-thead-th">INGREDIENTS</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {listeFiche.map((f) => (
                                <tr key={f.fiche.id}>
                                    <td className="label-tbody-th">{f.fiche.name}</td>
                                    <td className="label-tbody-th2">{f.quantite}</td>
                                    { emporter ? 
                                    <td className="label-tbody-th"><ul>{f.fiche.ingredients.map((i) => <li>{i.allergene ? <b>{i.libelle}</b> : i.libelle}</li>)}</ul></td>
                                    : null
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="AddButton" onClick={() => modifierStock()}>Print</button>
            </div>
        </> : <Loading></Loading>
    )
}