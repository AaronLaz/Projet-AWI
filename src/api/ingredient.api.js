import axios, { AxiosRequestConfig } from 'axios';
export async function getIngredients() {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/ingredient/get/all`;
            const config = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                console.log(ingredients.data);
                resolve(ingredients.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}
