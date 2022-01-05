import axios from 'axios';
export async function getCosts() {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/costs/get`;
            const config = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((costs) => {
                resolve(costs.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function setCosts(cost){
    return new Promise((resolve, reject) => {
        try {
            const url = `https://awi-backend.herokuapp.com/costs/set`;
            const config = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json' 
                },
                data: cost
            };
            axios(url, config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    })
}