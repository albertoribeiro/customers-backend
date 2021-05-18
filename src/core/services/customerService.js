const BaseService = require('./baseService')

class CustomerService extends BaseService{
    constructor({ repository }){
        super({ repository })
    }
}

module.exports = CustomerService