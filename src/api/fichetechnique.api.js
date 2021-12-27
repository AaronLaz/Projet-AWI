import axios, { AxiosRequestConfig } from 'axios';
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