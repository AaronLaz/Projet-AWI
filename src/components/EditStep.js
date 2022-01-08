import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FicheTechnique.css';
import { editStep, getFicheTechnique, editStepInFicheTechnique, deleteStepFromFiche } from '../api/fichetechnique.api';

export default function EditStep() {

    const [steps, setSteps] = useState([]);
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
        if(stepid == undefined){
            window.alert("Attention! Il faut obligatoirement séléctionner une étape.")
        }else{
            const step = {
                "stepid":stepid,
                "title":title,
                "description":description,
                "time":time,
            };
            const extra = {
                "docid": id,
                "stepid": stepid,
                "rank": rank,
            };
            editStepInFicheTechnique(extra).then((result) => {
                editStep(step).then((result) => {navDetail();});
            });
        }
    }

    const deleteStep = () => {
        if(stepid == undefined){
            window.alert("Attention! Il faut obligatoirement séléctionner une étape.")
        }else{
            const data = {
                "stepid": stepid
            };
            deleteStepFromFiche(data).then((result) => {navDetail();});
        }
    }

    const setToStep = (sid) => {
        setStepId(sid);
        steps.forEach((s) => {
            if(s.stepid == sid){
                setTitle(s.title);
                setDescription(s.description);
                setTime(s.time);
                setRank(s.rank);
            }
        })
    }

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setSteps(result.steps);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
        <Helmet>Ajouter Une Etape la Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Une Etape la Fiche Technique</h3>
                <div>
                    <label for="steps">Selectionnez l'étape : </label>
                    <select name="steps" id="steps" onChange={(event) => setToStep(event.target.value)}>
                        <option>Aucun</option>
                        {steps.map((s) => (
                            <>
                            <option key={s.stepid} value={s.stepid}>{s.title}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="title">Titre</label>
                        <input className='FormInput' value={title} id="title" type="text" onChange={(event) => setTitle(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="description">Description</label>
                        <input className='FormInput' value={description} id="description" type="text" onChange={(event) => setDescription(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="time">Temps</label>
                        <input className='FormInput' type="number" name="time" step="1" value={time} onChange={(event) => setTime(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="rank">Phase</label>
                        <input className='FormInput' type="number" name="rank" step="1" value={rank} onChange={(event) => setRank(event.target.value)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => submitHeader()}>Enregistrer</button>
                <button className='FormSubmit' onClick={() => navDetail()}>Annuler</button>
                <button className='FormSubmitDanger' onClick={() => deleteStep()}>Supprimer</button>
            </div>
        </div>
        </>
    )
}

