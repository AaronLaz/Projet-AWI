import React, { Component, useState, useEffect, useRef } from 'react';
import './FicheTechnique.css';
import { useReactToPrint } from 'react-to-print'; 
import { getFicheTechniques } from '../api/fichetechnique.api';

export default function FicheTechnique() {

    const [fichetechniques,setFicheTechniques] = useState([]);

    const referencePDF = useRef();
    const toPDF = useReactToPrint({
        content: () => referencePDF.current
    });

    useEffect(() => {
        getFicheTechniques().then((result) => {
          setFicheTechniques(result);
        });
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
                <p className='info'>test</p>
                <p className='info'>bambi</p>
                <p className='info'>2</p>
            </div>
            <div className="grid2">
                <div className='grid1'>
                    <h4 className='title'>DENREES</h4>
                    <h4 className='title'>UNITES</h4>
                    <h4 className='title'>QUANTITES</h4>
                </div>
                <div className='grid1'>
                    <h4 className='title'>N° PHASE</h4>
                    <h4 className='title'>TECHNIQUES DE REALISATION</h4>
                    <h4 className='title'>DUREE</h4>
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