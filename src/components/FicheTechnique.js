import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './FicheTechnique.css';
import { useReactToPrint } from 'react-to-print'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getFicheTechnique } from '../api/fichetechnique.api';

export default function FicheTechnique() {

    const [fichetechnique,setFicheTechnique] = useState();
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

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
          setFicheTechnique(result);
          setLoading(true);
        });// eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return (
        loading ? <><div className='container' ref={referencePDF}>
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
                         <td className='info'><p className="centered"><b>{s.title}</b></p><p>{s.description}</p></td>
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
        <button className='FormSubmit' onClick={() => navStep()}>Ajouter une étape à la Fiche Technique</button>
        <button className='FormSubmit' onClick={() => navIngredient()}>Ajouter une un ingrédient à une étape</button></>: null
    );
}