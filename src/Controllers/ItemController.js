const knex = require('../database/connection')

class ItemController{
    async toggle(request, response){
        const {id} = request.params

        const task = await knex('tasks').where('id', '=', id).first()
        if(!task){
            return response.status(400).json({message: 'task not found.'})
        }
        const newStatus = task.status==0?1:0

        const update = await knex('tasks').where('id', '=', id).update({
            status: newStatus
        })    
        return response.json({
            message: `Toggle ${id} to ${newStatus}`
        })
    }
    async create(request, response){
        const {title, dayId} = request.body
        const trx = await knex.transaction()
        const idTask = await trx('tasks').insert({
            id_user: 1,
            title,
            status:0,
        })
        const idRoutine = await trx('routines').insert({
            id_task: idTask[0],
            id_day: dayId
        })
        await trx.commit()

        return response.json({
            id: idTask[0]
        })
    }
    async delete(request, response){
        const {id} = request.params

        const task = await knex('tasks').where('id', '=', id).del()

        return response.json({
            message: `Task ${id} Deleted`
        })
    }
}
module.exports = ItemController