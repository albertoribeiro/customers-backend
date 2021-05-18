class BaseService {
    constructor({ repository }){
        this.repository = repository
    }

    async create(item){
        const id = `${new Date().getTime()}`
        return this.repository.create({...item,id})
    }

    async findOne(id){
        return this.repository.findOne(id)
    }

    async findAll(query){
        return this.repository.findAll(query)
    }

    async delete(id){
        return this.repository.delete(id)
    }

    async update(id,item){
        return this.repository.update(id,item)
    }
}

module.exports = BaseService