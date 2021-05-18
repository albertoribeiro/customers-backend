const CustomerFactory = require('../../../core/factories/customerFactory')
 
class Handler {
    async main(event){
        try {
            const { id }  = event.pathParameters
            const customerFactory = await CustomerFactory.createInstance()
            const customer = await  customerFactory.findOne(id)
            return this.handlerSuccess(customer)
        } catch (error) {
            console.log('Oops...')
            return this.handlerError({statusCode:500})
        }
    }

    handlerSuccess(data){
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        }
        return response
    }

    handlerError(data){
        return {
            statusCode: data.statusCode || 501,
            headers: { 'Content-Type': 'text/plain'},
            body: 'Couldn\'t read Items !'
        }
    }
    
}
 
const handler = new Handler()
module.exports = handler.main.bind(handler)