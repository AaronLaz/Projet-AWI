import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FicheTechnique.css';
import { addStepToFicheTechnique, addStep } from '../api/fichetechnique.api';

export default function AddStepToFicheTechnique() {

    const [stepid, setStepId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [time, setTime] = useState();
    const history = useHistory();
    const { id } = useParams();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }

    const submitHeader = () => {
        const step = {
            "stepid":stepid,
            "title":title,
            "description":description,
            "time":time,
        };
        const join = {
            "docid":id,
            "stepid":stepid,
        };
        addStep(step).then((result) => {addStepToFicheTechnique(join).then((result) => {navDetail();})});
    }

    return (
        <>
        <Helmet>Ajouter Une Etape la Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Une Etape la Fiche Technique</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="stepid">ID</label>
                        <input className='FormInput' placeholder="ID" id="stepid" type="number" onChange={(event) => setStepId(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="title">Titre</label>
                        <input className='FormInput' placeholder="Nom" id="title" type="text" onChange={(event) => setTitle(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="description">Description</label>
                        <input className='FormInput' placeholder="Description" id="description" type="text" onChange={(event) => setDescription(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="time">Temps</label>
                        <input className='FormInput' type="number" name="time" step="1" placeholder="0" onChange={(event) => setTime(event.target.value)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => submitHeader()}>Ajouter l'étape à la Fiche Technique</button>
            </div>
        </div>
        </>
    )
}

