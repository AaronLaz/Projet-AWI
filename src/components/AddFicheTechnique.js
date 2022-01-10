import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FicheTechnique.css';
import { addFicheTechnique } from '../api/fichetechnique.api';

export default function AddFicheTechnique() {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [header, setHeader] = useState();
    const [author, setAuthor] = useState();
    const [responsable, setResponsable] = useState();
    const [nbserved, setNbserved] = useState();
    const [category, setCategory] = useState();
    const [assaisonemments, setAss] = useState();
    const history = useHistory();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }

    const submitHeader = () => {
        const techdoc = {
            "id":parseInt(id),
            "name":name,
            "header":header,
            "author":author,
            "responsable":responsable,
            "category":category,
            "nbserved":parseInt(nbserved),
            "default":1,
            "usecharges":0,
            "assaisonemments":assaisonemments
        };
        addFicheTechnique(techdoc).then((result) => {navDetail();});
    }

    return (
        <>
        <Helmet>Ajouter Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Ajouter Entête de Fiche Technique</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="id">ID</label>
                        <input className='FormInput' placeholder="ID" id="id" type="number" onChange={(event) => setId(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="name">Nom</label>
                        <input className='FormInput' placeholder="Nom" id="name" type="text" onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="header">Description</label>
                        <input className='FormInput' placeholder="header" id="header" type="text" onChange={(event) => setHeader(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="author">Auteur</label>
                        <input className='FormInput' type="text" name="author" placeholder="Auteur" onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="responsable">Responsable</label>
                        <input className='FormInput' type="text" name="responsable" placeholder="Responsable" onChange={(event) => setResponsable(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="category">Catégorie</label>
                        <input className='FormInput' type="text" name="category" placeholder="Categorie" onChange={(event) => setCategory(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for='nbserved'>Nombre Servi</label>
                        <input className='FormInput' name="nbserved" type="number" step="1" placeholder="1" onChange={(event) => setNbserved(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for='nbserved'>Couts Assaisonnements</label>
                        <input className='FormInput' name="nbserved" type="number" step="0.01" placeholder="0" onChange={(event) => setAss(event.target.value)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => {submitHeader();}}>Ajouter l'entête de Fiche Technique</button>
                <button className='FormSubmit' onClick={() => {navDetail();}}>Annuler</button>
            </div>
        </div>
        </>
    )
}

