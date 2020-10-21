const { seeds } = require("../../../knexfile");

module.exports = {
    async seed(knex){
        await knex('users').insert({
            login: 'chap0lin',
            senha: 'colorado'
        })
    }
}