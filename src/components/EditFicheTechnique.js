import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Loading } from './loading';
import './FicheTechnique.css';
import { getFicheTechnique, editFicheTechnique } from '../api/fichetechnique.api';

export default function EditFicheTechnique() {
    const [fichetechnique, setFicheTechnique] = useState();
    const [name, setName] = useState();
    const [header, setHeader] = useState();
    const [author, setAuthor] = useState();
    const [responsable, setResponsable] = useState();
    const [nbserved, setNbserved] = useState();
    const [category, setCategory] = useState();
    const [assaisonemments, setAss] = useState();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const navDetail = () => {
        const url = `/fichetechnique/${id}`;
        history.push(url);
    }
    
    const toInt = (val) => {
        if(val){
            return 1;
        }else{
            return 0;
        }
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
            "default":toInt(fichetechnique.default),
            "usecharges":toInt(fichetechnique.usecharges),
            "assaisonemments":assaisonemments
        };
        editFicheTechnique(techdoc).then((result) => {navDetail();});
    }

    useEffect(() => {
        getFicheTechnique(id).then((result) => {
            setFicheTechnique(result);
            setName(result.name);
            setHeader(result.header);
            setAuthor(result.author);
            setResponsable(result.responsable);
            setNbserved(result.nbserved);
            setCategory(result.category);
            setAss(result.assaisonemments);
        });
        setTimeout(() => setLoading(true),1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        loading ? 
        <>
        <Helmet>Modifier la Fiche Technique</Helmet>
        <div className='FormContainer'>
            <div className='Form'>
                <h3>Modifier Entête de Fiche Technique</h3>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="name">Nom</label>
                        <input className='FormInput' value={name} id="name" type="text" onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="header">Description</label>
                        <input className='FormInput' value={header} id="header" type="text" onChange={(event) => setHeader(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="author">Auteur</label>
                        <input className='FormInput' type="text" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="responsable">Responsable</label>
                        <input className='FormInput' type="text" name="responsable" value={responsable} onChange={(event) => setResponsable(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for="category">Catégorie</label>
                        <input className='FormInput' type="text" name="category" value={category} onChange={(event) => setCategory(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for='nbserved'>Nombre Servi</label>
                        <input className='FormInput' name="nbserved" type="number" step="1" value={nbserved} onChange={(event) => setNbserved(event.target.value)} />
                    </div>
                </div>
                <div className='blockForm'>
                    <div className='gridrow'>
                        <label className='FormLabel' for='nbserved'>Cout Assaisonnements</label>
                        <input className='FormInput' name="nbserved" type="number" step="0.01" value={assaisonemments} onChange={(event) => setAss(event.target.value)} />
                    </div>
                </div>
                <button className='FormSubmit' onClick={() => {submitHeader();}}>Modifier</button>
                <button className='FormSubmit' onClick={() => {navDetail();}}>Annuler</button>
            </div>
        </div>
        </>
        : <Loading></Loading>
    )
}

