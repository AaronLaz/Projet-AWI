import axios from 'axios';
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
                resolve(ingredients.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function getIngredient(id) {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/ingredient/get/${id}`;
            const config = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                resolve(ingredients.data[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// requires input names code, libelle, unit, unitprice, stocks, stockvalue and allergene
export async function postIngredient(code, libelle, unit, price, stock, stockprice, allergen){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/ingredient/post`;
            const config = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: {
                    "code": code,
                    "libelle": libelle,
                    "unit": unit,
                    "unitprice": price,
                    "stocks": stock,
                    "stockvalue": stockprice,
                    "allergene": allergen,
                }
            };
            axios(url, config).then((result) => {
                resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    })
}

export async function supprIngredient(id){
    return new Promise((resolve, reject) => {
        try{
            const url = `https://awi-backend.herokuapp.com/ingredient/delete/${id}`;
            const config = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json' 
                },
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}
