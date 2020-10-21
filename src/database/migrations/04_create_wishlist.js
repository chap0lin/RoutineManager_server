//const Knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('wishlist', table =>{
            table.increments('id').primary();
            table.integer('id_task').notNullable().references('id').inTable('tasks');
        })
    },
    async down(knex){
        return knex.schema.dropTable('wishlist')
    }  
}