const knex = require('../database/connection')

class ListController{
    async index(request, response){
        //listas dos dias meses a anos para apresentar
        console.log('Oi')
        const days = await knex('days').select('*').where('id_user', '=', 1).orderByRaw('year asc, month asc, day asc')
        var responseArray = []
        var currentYear = ''
        var currentMonth = ''
        var Year = {year: '', months: []}
        var Month = {month: '', days: []}
        days.map(day=>{
            if(day.year === currentYear){
                if(day.month === currentMonth){
                    Month.days.push({
                        id: day.id,
                        day: day.day
                    })
                }else{
                    currentMonth = day.month
                    Month = {
                        month: day.month,
                        days: [{
                            id: day.id,
                            day: day.day
                        }]
                    }
                }
            }else{
                currentYear = day.year
                currentMonth = day.month
                if(Month.month !== '')
                    Year.months.push(Month)
                Month = {
                    month: day.month,
                    days: [{
                        id: day.id,
                        day: day.day
                    }]
                }
                if(Year.year !== '')
                    responseArray.push(Year)
                Year = {
                    year: day.year,
                    months: [{...Month}]
                }
            }
        })
        if(Year !== [])
            responseArray.push(Year)

        return response.json(responseArray)

    }
    async create(request, response){
        const {day, month, year} = request.body
        const isToday = await knex('days').select('*').where('id_user', '=', 1).andWhere('day', '=', day).andWhere('month', '=', month).andWhere('year', '=', year)
        console.log('OKay vamo la' + day)
        if(isToday.length > 0){//insert tomorrow
            response.send('Data já definida')
            // const tomorrow = new Date()
            // tomorrow.setDate(tomorrow.getDate()+1)
            
            // const daysId = await trx('days').insert({
            //     id_user: 1,
            //     day: tomorrow.getDay(),
            //     month: `${tomorrow.getMonth()+1}`,
            //     year: tomorrow.getFullYear()
            // })
            console.log("Data ja definida")
        }else{//insert today
            const trx = await knex.transaction();
            const daysId = await trx('days').insert({
                id_user: 1,
                day,
                month,
                year
            })
            const tasksId1 = await trx('tasks').insert(
                {
                    id_user: 1,
                    title: 'Core 1',
                    status: 0
                }
            )
            const tasksId2 = await trx('tasks').insert(
                {
                    id_user: 1,
                    title: 'Core 2',
                    status: 0
                }
            )
            const tasksId3 = await trx('tasks').insert(
                {
                    id_user: 1,
                    title: 'Sub Creation',
                    status: 0
                },
            )
            const tasksId4 = await trx('tasks').insert(
                {
                    id_user: 1,
                    title: 'Sub Creation 2',
                    status: 0
                }
            )
            //console.log(JSON.stringify(tasksIds))
            const routines = await trx('routines').insert([
                {
                    id_task: tasksId1[0],
                    id_day: daysId[0]
                },
                {
                    id_task: tasksId2[0],
                    id_day: daysId[0]
                },
                {
                    id_task: tasksId3[0],
                    id_day: daysId[0]
                },
                {
                    id_task: tasksId4[0],
                    id_day: daysId[0]
                }
            ])
            await trx.commit()
            response.sendStatus(200)
        }
    }
    async show(request, response){
        const {id} = request.params
        const test = [
            {
                id: 1,
                title: "Item 1 da rotina",
                status: 0,
                newItem: '',
                subitems: [
                    {
                        id: 1,
                        title: "Subitem 1 do item 1",
                        status: 0
                    },
                    {
                        id: 2,
                        title: "Subitem 2 do item 1",
                        status: 1
                    }
                ]
            },
            {
                id: 2,
                title: "Item 2 da rotina",
                status: 0,
                newItem: '',
                subitems: [
                    {
                        id: 3,
                        title: "Subitem 1 do item 2",
                        status: 0
                    },
                    {
                        id: 4,
                        title: "Subitem 2 do item 2",
                        status: 0
                    }
                ]
            }
        ]

        //consultar rotinas
        //consultar todos os tasks
        //pra cada task pegar as subtasks

        `select
        b.id as id_task, b.title as t_task, b.status as t_status,
        c.id as id_subtask, c.title as t_subtask, c.status as s_subtask
        from routines a inner join task b on a.id_task = b.id left join subtask c on a.id_task = c.id_task
        where a.id_day = 1;`
            

        
        const day = await knex('days').where('id', '=', id).first()

        if(!day)
            return response.status(400).json({message: 'day not found.'})

        
        return response.json({
            message: `Subtask ${id} Deleted`
        })
    }
}
module.exports = ListController