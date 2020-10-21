//const Knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('days', table =>{
            table.increments('id').primary();
            table.integer('id_user').notNullable().references('id').inTable('users');
            table.string('day').notNullable();
            table.string('month').notNullable();
            table.string('year').notNullable();
            table.timestamp('inserted_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('days')
    }  
}