//const Knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('users', table =>{
            table.increments('id').primary();
            table.string('login').notNullable();
            table.string('senha').notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('users')
    }  
}