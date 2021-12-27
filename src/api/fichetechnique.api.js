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