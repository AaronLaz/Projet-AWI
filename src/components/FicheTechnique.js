import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './FicheTechnique.css';
import { useReactToPrint } from 'react-to-print'; 
import { getFicheTechnique } from '../api/fichetechnique.api';

export default function FicheTechnique() {

    const [fichetechnique,setFicheTechnique] = useState([]);
    const [step, setStep] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    const referencePDF = useRef();
    const toPDF = useReactToPrint({
        content: () => referencePDF.current
    });
    const { id } = useParams();

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
          setFicheTechnique(result);
          setStep(result.steps);// eslint-disable-next-line
          result.steps.map((s)=>{
              ingredient.push(s.ingredients);
              setIngredient(ingredient.slice(0));
          });
        });// eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <><div className='container' ref={referencePDF}>
            <div>
                <h3>FICHE TECHNIQUE</h3>
            </div>
            <div className="grid1">
                <h4 className='title'>INTITULE</h4>
                <h4 className='title'>RESPONSABLE</h4>
                <h4 className='title'>NBRE DE COUVERTS</h4>
                <p className='info'>{fichetechnique.name}</p>
                <p className='info'>{fichetechnique.responsable}</p>
                <p className='info'>{fichetechnique.nbserved}</p>
            </div>
            <div className="grid2">
                <div className='grid1'>
                    <h4 className='title'>DENREES</h4>
                    <h4 className='title'>UNITES</h4>
                    <h4 className='title'>QUANTITES</h4>
                    {ingredient.forEach((s2) => {
                        s2.forEach(i => (
                        <>
                         <p className='info'>{i.libelle}</p>
                         <p className='info'>{i.unit}</p>
                         <p className='info'>{i.quantity}</p>
                        </>
                        )) 
                    })}
                    
                </div>
                <div className='grid1'>
                    <h4 className='title'>N° PHASE</h4>
                    <h4 className='title'>TECHNIQUES DE REALISATION</h4>
                    <h4 className='title'>DUREE</h4>
                    {step.map((s) => (
                        <>
                         <p className='info'>{s.stepid}</p>
                         <div className='info'><p>{s.title}</p><p>{s.description}</p></div>
                         <p className='info'>{s.time}</p>
                        </>
                    ))
                    }
                        
                </div>
            </div>
            <div>
                <h4>COUTS DE PRODUCTION</h4>
                <h4>PRIX DE VENTE</h4>
            </div>
        </div>
        <button onClick={() => toPDF()}>Print</button></>
    );
}