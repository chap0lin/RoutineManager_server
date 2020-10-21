//const Knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('routines', table =>{
            table.increments('id').primary();
            table.integer('id_task').notNullable().references('id').inTable('tasks');
            table.integer('id_day').notNullable().references('id').inTable('days');
        })
    },
    async down(knex){
        return knex.schema.dropTable('routines')
    }  
}