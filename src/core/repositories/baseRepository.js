
class BaseRepository{
    constructor({ schema }){
        this.schema = schema
    }

    async create(item){

        return this.schema.create(item)
    }

    async findOne(id){
        return this.schema.query({ id: { eq: id } }).exec()
    }

    async findAll(query){
        return this.schema.scan(query).exec()
    }

    async delete(id){
        return this.schema.delete({id})
    }

    async update(id,item){
        return this.schema.update({id:id},item)
    }
}

module.exports = BaseRepository 