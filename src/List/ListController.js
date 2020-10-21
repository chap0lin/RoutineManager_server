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
        const isToday = await knex('days').select('*').where('id', '=', 1).andWhere('day', '=', day).andWhere('month', '=', month).andWhere('year', '=', year)
        console.log('OKay vamo la' + day)
        if(isToday.length > 0){//insert tomorrow
            const trx = await knex.transaction();
            const daysId = await trx('days').insert({
                id_user: 1,
                day: `${parseInt(day)+1}`,
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
            console.log("dale")
        }else{//insert today

        }
        response.sendStatus(200)
    }
}
module.exports = ListController