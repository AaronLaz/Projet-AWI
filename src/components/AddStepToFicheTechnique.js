import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './IngredientForm.css';
import { addStepToFicheTechnique, addStep, freeStepID } from '../api/fichetechnique.api';

export default function AddStepToFicheTechnique() {
    // eslint-disable-next-line
    const [stepid, setStepId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [time, setTime] = useState();
    const [rank, setRank] = useState();
    const history = useHistory();
    const { id } = useParams();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }

    const submitHeader = () => {
        freeStepID().then((result) => {
            setStepId(result.stepid);
            const step = {
                "stepid":result.stepid,
                "title":title,
                "description":description,
                "time":time,
            };
            addStep(step).then((res) => {
                const join = {
                    "docid":id,
                    "stepid":result.stepid,
                    "rank":rank,
                };
                addStepToFicheTechnique(join).then((re) => navDetail());
            });
        })
    }

    return (
        <>
            <Helmet>Ajouter Une Etape la Fiche Technique</Helmet>
            <div className='FormContainer'>
                <div className='Form'>
                    <h3>Ajouter Une Etape la Fiche Technique</h3>
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
                    <div className='blockForm'>
                        <div className='gridrow'>
                            <label className='FormLabel' for="rank">Phase</label>
                            <input className='FormInput' type="number" name="rank" step="1" placeholder="0" onChange={(event) => setRank(event.target.value)} />
                        </div>
                    </div>
                    <button className='FormSubmit' onClick={() => submitHeader()}>Ajouter</button>
                    <button className='DelButton' onClick={() => navDetail()}>Annuler</button>
                </div>
            </div>
        </>
    )
}

