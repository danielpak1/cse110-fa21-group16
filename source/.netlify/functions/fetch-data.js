const fetch = require("node-fetch-commonjs");
const APIKey = process.env.API_KEY;
const API_Endpoint = `https://api.spoonacular.com/recipes/random?apiKey=${APIKey}&number=30`;

/**
 * This function fetches the data directly from spoonacular API
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
		fetch(API_Endpoint)
        .then(res => res.json())
        .then(data => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(data)
            })
        }).catch(error => reject(false));
	});
};