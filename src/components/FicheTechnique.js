import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './FicheTechnique.css';
import { useReactToPrint } from 'react-to-print';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getFicheTechnique, editFicheTechnique, deleteFicheTechnique, deleteFicheTechniqueStep } from '../api/fichetechnique.api';
import { getCosts } from '../api/costs.api';
import { Loading } from './loading';

export default function FicheTechnique() {
    const [costs, setCosts] = useState();
    const [fichetechnique, setFicheTechnique] = useState();
    const [def, setDef] = useState([]);
    const [usecharges, setUseCharges] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const referencePDF = useRef();
    const toPDF = useReactToPrint({
        content: () => referencePDF.current
    });
    const { id } = useParams();

    const navStep = () => {
        const url = `/fichetechnique/addStep/${id}`;
        history.push(url);
    }
    const navIngredient = () => {
        const url = `/fichetechnique/addIngredient/${id}`;
        history.push(url);
    }
    const navList = () => {
        const url = `/fichetechniques`;
        history.push(url);
    }
    const navEditStep = () => {
        const url = `/fichetechnique/editStep/${id}`
        history.push(url);
    }
    const navEditIngredient = () => {
        const url = `/fichetechnique/editIngredient/${id}`
        history.push(url);
    }
    const navEditFiche = () => {
        const url = `/fichetechnique/edit/${id}`;
        history.push(url);
    }

    // function converts booleans to integers
    const toInt = (val) => {
        if (val) {
            return 1;
        } else {
            return 0;
        }
    }
    const commitChanges = () => {
        const data = {
            "id": id.toString(),
            "name": fichetechnique.name,
            "header": fichetechnique.header,
            "author": fichetechnique.author,
            "responsable": fichetechnique.responsable,
            "category": fichetechnique.category,
            "nbserved": fichetechnique.nbserved,
            "default": toInt(def),
            "usecharges": toInt(usecharges),
            "assaisonemments": fichetechnique.assaisonemments,
        }
        editFicheTechnique(data);
    }

    const deleteFiche = () => {
        const data = {
            "id": parseInt(id),
        }
        fichetechnique.steps.forEach((step) => {
            const d = {
                "stepid": parseInt(step.stepid),
            }
            deleteFicheTechniqueStep(d);
        })
        console.log(data);
        deleteFicheTechnique(data).then((result) => {
            navList();
        });
    }

    // these functions calculate costs
    const calculCoutMatiere = () => {
        let sum = 0;
        fichetechnique.steps.forEach((s) => {
            s.ingredients.forEach((i) => {
                sum += i.quantity * i.unitprice;
            });
        });
        return sum;
    }

    const calculCoutChargesFluides = () => {
        let sum = 0;
        if (def) {
            if (costs.charges) {
                fichetechnique.steps.forEach((s) => {
                    sum += (s.time / 60) * (costs.fluides);
                })
            }
        } else {
            if (usecharges) {
                fichetechnique.steps.forEach((s) => {
                    sum += (s.time / 60) * (costs.fluides);
                })
            }
        }
        return sum;
    }

    const calculCoutChargesPersonnel = () => {
        let sum = 0;
        if (def) {
            if (costs.charges) {
                fichetechnique.steps.forEach((s) => {
                    sum += (s.time / 60) * (costs.personnel);
                })
            }
        } else {
            if (usecharges) {
                fichetechnique.steps.forEach((s) => {
                    sum += (s.time / 60) * (costs.personnel);
                })
            }
        }
        return sum;
    }

    const calculCoutAssaisonnement = () => {
        if (fichetechnique.assaisonemments <= 0) {
            return calculCoutMatiere() * 0.05;
        } else {
            return fichetechnique.assaisonemments;
        }
    }

    const totalCouts = () => {
        return calculCoutChargesFluides() + calculCoutChargesPersonnel() + calculCoutMatiere() + calculCoutAssaisonnement();
    }

    const calculPrixVente = (byPortion) => {
        // boolean byPortion : if true, then price is divided by the number of portions, else it will be the price for the whole production.
        let val = 0;
        if (def) {
            if (costs.charges) {
                val = totalCouts() * (costs.markup / 100)
            } else {
                val = totalCouts() * (costs.markupnocharges / 100)
            }
        } else {
            if (usecharges) {
                val = totalCouts() * (costs.markup / 100)
            } else {
                val = totalCouts() * (costs.markupnocharges / 100)
            }
        }
        if (byPortion) {
            return val / fichetechnique.nbserved;
        } else {
            return val;
        }
    }

    const calculBeneficeParPortion = () => {
        let couts = totalCouts();
        let vente = calculPrixVente(true) / 1.1;
        return vente - (couts / fichetechnique.nbserved)
    }

    const portionsVendusPourRentabilit?? = () => {
        let chargesVar = calculCoutAssaisonnement() + calculCoutMatiere();
        let chargesFix = calculCoutChargesFluides() + calculCoutChargesPersonnel();
        let vente = calculPrixVente(true) / 1.1;
        let mcv = (vente - chargesVar / fichetechnique.nbserved) / vente;
        let result = chargesFix / mcv;
        if (chargesFix === 0) {
            result = totalCouts() / mcv;
        }
        return Math.ceil(result);
    }

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setFicheTechnique(result);
            setDef(result.default);
            setUseCharges(result.usecharges);
        });
        getCosts().then((result) => {
            setCosts(result);
        })
        setTimeout(() => setLoading(true), 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        loading ?
            <><div className='container' ref={referencePDF}>
                <div>
                    <h3>FICHE TECHNIQUE</h3>
                </div>
                <div className="grid1">
                    <h4 className='title'>INTITULE</h4>
                    <h4 className='title'>RESPONSABLE</h4>
                    <h4 className='title'>NBRE DE COUVERTS</h4>
                    <p className='info centered'>{fichetechnique.name}</p>
                    <p className='info centered'>{fichetechnique.responsable}</p>
                    <p className='info centered'>{fichetechnique.nbserved}</p>
                </div>
                <div className="grid2">
                    <table>
                        <thead>
                            <tr>
                                <th className='title'>DENREES</th>
                                <th className='title'>UNITES</th>
                                <th className='title'>QUANTITES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fichetechnique.steps.map((step) =>
                                step.ingredients.map((i) => (
                                    <tr key={step.rank+"_"+i.code}>
                                        <td className='info centered'>{i.libelle}</td>
                                        <td className='info centered'>{i.unit}</td>
                                        <td className='info centered'>{i.quantity}</td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th className='title'>N?? PHASE</th>
                                <th className='title'>TECHNIQUES DE REALISATION</th>
                                <th className='title'>DUREE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fichetechnique.steps.map((s) => (
                                <tr key={s.rank}>
                                    <td className='info centered'>{s.rank}</td>
                                    <td className='info'><p className="centered"><b>{s.title}</b></p><p>{s.description}</p></td>
                                    <td className='info centered'>{s.time}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                <div hidden={checked}>
                    <h4>COUTS DE PRODUCTION</h4>
                    <p>Couts mati??re : {(calculCoutMatiere()).toFixed(2)}???</p>
                    <p>Cout assaisonnement : {(calculCoutAssaisonnement()).toFixed(2)}???</p>
                    <p>Couts fluides : {(calculCoutChargesFluides()).toFixed(2)}???</p>
                    <p>Couts personnel : {(calculCoutChargesPersonnel()).toFixed(2)}???</p>
                    <h4>PRIX DE VENTE</h4>
                    <p>Prix de vente : {(calculPrixVente(false)).toFixed(2)}???</p>
                    <p>Prix de vente par portion : {(calculPrixVente(true)).toFixed(2)}???</p>
                    <p>B??n??fice par portion : {(calculBeneficeParPortion()).toFixed(2)}???</p>
                    <p>Pour que cette recette soit rentable, il faut vendre au moins {portionsVendusPourRentabilit??()} portions.</p>
                </div>
            </div>
                <div className='container'>
                <div className="ButtonDiv2">
                        <button className='FormSubmit' onClick={() => navStep()}>Ajouter une ??tape ?? la Fiche Technique</button>
                        <button className='FormSubmit' onClick={() => navIngredient()}>Ajouter une un ingr??dient ?? une ??tape</button>
                        <button className='FormSubmit' onClick={() => navEditStep()}>Modifier une ??tape</button>
                        <button className='FormSubmit' onClick={() => navEditIngredient()}>Modifier un ingr??dient</button>
                        <button className='FormSubmit' onClick={() => navEditFiche()}>Modifier</button>
                        <button className='AddButton' onClick={() => toPDF()}>Print</button>
                        <button className='DelButton' onClick={() => deleteFiche()}>Supprimer</button>
                    </div>
                    <div>
                        <div className='checkbox'>
                            <div>
                                <input className="demo5" checked={def} id="defaut" type="checkbox" onChange={(event) => setDef(event.target.checked)} />
                                <label htmlFor="defaut"></label>
                            </div>
                            <label className='checkbox-label'>Utilise les param??tres de couts par d??faut</label>
                        </div>
                        <div className='checkbox'>
                            <div>
                                <input disabled={def} className="demo5" checked={usecharges} id="charges" type="checkbox" onChange={(event) => setUseCharges(event.target.checked)} />
                                <label htmlFor="charges"></label>
                            </div>
                            <label className='checkbox-label'>Utilise charges pour calculer les couts</label>
                        </div>
                        <button className='AddButton' onClick={() => commitChanges()}>Confirmer</button>
                    </div>
                    <div className='checkbox'>
                        <div>
                           <input className="demo5" checked={checked} id="checked" type="checkbox" onChange={(event) => setChecked(event.target.checked)} /> 
                           <label htmlFor="checked"></label>
                        </div>
                        <label className='checkbox-label'>Cacher les couts</label>
                    </div>
                </div>
            </>
            : <Loading></Loading>
    );
}