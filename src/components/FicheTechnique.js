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
    const [def,setDef] = useState([]);
    const [usecharges, setUseCharges] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
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
    const toInt = (val) => {
        if(val){
            return 1;
        }else{
            return 0;
        }
    }
    const commitChanges = () => {
        const data = {
            "id":id.toString(),
            "name":fichetechnique.name,
            "header":fichetechnique.header,
            "author":fichetechnique.author,
            "responsable":fichetechnique.responsable,
            "category":fichetechnique.category,
            "nbserved":fichetechnique.nbserved,
            "default":toInt(def),
            "usecharges":toInt(usecharges),
        }
        editFicheTechnique(data);
    }

    const deleteFiche = () => {
        const data = {
            "id": parseInt(id),
        }
        fichetechnique.steps.forEach((step) => {
            console.log(step);
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

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setFicheTechnique(result);
            setDef(result.default);
            setUseCharges(result.usecharges);
        });
        getCosts().then((result) => {
            setCosts(result);
        })
        setTimeout(() => setLoading(true),1000);
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
                        step.ingredients.map((i) =>(
                        <tr>
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
                            <th className='title'>N° PHASE</th>
                            <th className='title'>TECHNIQUES DE REALISATION</th>
                            <th className='title'>DUREE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fichetechnique.steps.map((s) => (
                        <tr>
                         <td className='info centered'>{s.rank}</td>
                         <td className='info'><p className="centered"><b>{s.title}</b></p><p>{s.header}</p></td>
                         <td className='info centered'>{s.time}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <h4>COUTS DE PRODUCTION</h4>
                <h4>PRIX DE VENTE</h4>
            </div>
        </div>
        <button onClick={() => toPDF()}>Print</button>
        <div>
            <div className='gridrow'>
                <label className='FormLabel' for="charges">Utiliser charges par défaut?</label>
                <input className='FormInput' checked={def} id="charges" type="checkbox" onChange={(event) => setDef(event.target.checked)} />
            </div>
            <div className='gridrow'>
                <label className='FormLabel' for="charges">Utiliser charges</label>
                <input disabled={def} className='FormInput' checked={usecharges} id="charges" type="checkbox" onChange={(event) => setUseCharges(event.target.checked)} />
            </div>
            <button onClick={() => commitChanges()}>Confirmer</button>
        </div>
        <button className='FormSubmit' onClick={() => navStep()}>Ajouter une étape à la Fiche Technique</button>
        <button className='FormSubmit' onClick={() => navIngredient()}>Ajouter une un ingrédient à une étape</button>
        <button className='FormSubmitDanger' onClick={() => deleteFiche()}>Supprimer</button></>
        : <Loading></Loading>
    );
}