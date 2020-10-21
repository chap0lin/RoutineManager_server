const { seeds } = require("../../../knexfile");

module.exports = {
    async seed(knex){
        await knex('days').insert([
            {
                id_user: 1,
                day: '1',
                month: '10',
                year: '2020',
            },
            {
                id_user: 1,
                day: '2',
                month: '10',
                year: '2020',
            },
            {
                id_user: 1,
                day: '1',
                month: '11',
                year: '2020',
            },
            {
                id_user: 1,
                day: '2',
                month: '10',
                year: '2021',
            },
        
    ])
    }
}