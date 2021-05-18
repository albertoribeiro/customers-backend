const CustomerRepository = require('./../repositories/customerRepository')
const CustomerService = require('./../services/customerService')

async function createInstance(){
    const customerRepository = new CustomerRepository()
    const customerService = new CustomerService({
        repository: customerRepository
    })
    return customerService
}

module.exports = { createInstance }