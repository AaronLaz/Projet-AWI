import axios from 'axios';

export async function getFicheTechniques() {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/get/all`;
            const config = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fichetechniques) => {
                resolve(fichetechniques.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function getFicheTechnique(id) {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/get/${id}`;
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fichetechnique) => {
                resolve(fichetechnique.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function getDocIDForStep(stepid){
    return new Promise((resolve, reject) => {
        try{
            const url = `https://awi-backend.herokuapp.com/technicaldoc/docid/get/${stepid}`;
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((result) => {
                resolve(result.data.docid);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function getTickets() {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/tickets`;
            const config = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fichetechniques) => {
                resolve(fichetechniques.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function addFicheTechnique(techdoc){
    return new Promise((resolve, reject) => {
        console.log(techdoc);
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/post/header`;
            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id": techdoc.id,
                    "name": techdoc.name,
                    "header": techdoc.header,
                    "author": techdoc.author,
                    "responsable": techdoc.responsable,
                    "category": techdoc.category,
                    "nbserved": techdoc.nbserved,
                    "default": techdoc.default,
                    "usecharges": techdoc.usecharges,
                    "assaisonemments": techdoc.assaisonemments,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
                console.log(result);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function editFicheTechnique(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/put/header`;
            const config = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id": data.id,
                    "name": data.name,
                    "header": data.header,
                    "author": data.author,
                    "responsable": data.responsable,
                    "category": data.category,
                    "nbserved": data.nbserved,
                    "default": data.default,
                    "usecharges": data.usecharges,
                    "assaisonemments": data.assaisonemments,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function deleteFicheTechnique(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/delete`;
            const config = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id": data.id,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function deleteFicheTechniqueStep(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/delete/step`;
            const config = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function addStep(step){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/post/step`;
            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id": step.stepid,
                    "title": step.title,
                    "description": step.description,
                    "time": step.time,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function editStep(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/put/step`;
            const config = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                    "title": data.title,
                    "description": data.description,
                    "time": data.time,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function deleteStepFromFiche(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/delete/step`;
            const config = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function addStepToFicheTechnique(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/post/stepinheader`;
            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "docid": data.docid,
                    "stepid": data.stepid,
                    "rank": data.rank,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

// function pulls an ID that hasn't been taken from the database of steps
export async function freeStepID(){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/stepids/get`;
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json' 
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function editStepInFicheTechnique(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/put/stepinheader`;
            const config = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "docid": data.docid,
                    "stepid": data.stepid,
                    "rank": data.rank,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function addIngredientToStep(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/post/ingredientinstep`;
            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                    "ingredientcode": data.ingredientcode,
                    "quantity":data.quantity,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function editIngredientInStep(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/put/ingredientinstep`;
            const config = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                    "ingredientcode": data.ingredientcode,
                    "quantity": data.quantity,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function deleteIngredientFromStep(data){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/technicaldoc/delete/ingredientinstep`;
            const config = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "stepid": data.stepid,
                    "ingredientcode": data.ingredientcode,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}