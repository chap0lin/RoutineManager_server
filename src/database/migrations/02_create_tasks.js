//const Knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('tasks', table =>{
            table.increments('id').primary();
            table.integer('id_user').notNullable().references('id').inTable('users');
            table.string('title').notNullable();
            table.integer('status').notNullable();
            table.timestamp('inserted_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('tasks')
    }  
}