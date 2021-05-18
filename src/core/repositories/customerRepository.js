const BaseRepository = require('./baseRepository')
const schema = require('./schemas/customerSchema')

class CustomerRepository extends BaseRepository{
    constructor(){
        super({
            schema
        })
    }
}

module.exports = CustomerRepository