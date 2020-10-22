const knex = require('../database/connection')

class SubitemController{
    async toggle(request, response){
        const {id} = request.params

        const subtask = await knex('subtasks').where('id', '=', id).first()
        if(!task){
            return response.status(400).json({message: 'subtask not found.'})
        }
        const newStatus = subtask.status==0?1:0

        const update = await knex('subtasks').where('id', '=', id).update({
            status: newStatus
        })    
        return response.json({
            message: `Toggle ${id} to ${newStatus}`
        })
    }
    async create(request, response){
        const {title, taskId} = request.body
        const subtask = await knex('subtasks').insert({
            id_task: taskId,
            title,
            status:0,
        })

        return response.json({
            id: subtask[0]
        })
    }
    async delete(request, response){
        const {id} = request.params

        const task = await knex('subtasks').where('id', '=', id).del()

        return response.json({
            message: `Subtask ${id} Deleted`
        })
    }
}
module.exports = SubitemController