const CustomerFactory = require('../../../core/factories/customerFactory')
 
class Handler {
    async main(event){
        try {
            
            const customerFactory = await CustomerFactory.createInstance()
            const customers = await  customerFactory.findAll()
            return this.handlerSuccess(customers)
        } catch (error) {
            console.log('Oops...')
            return this.handlerError({statusCode:500})
        }
    }

    handlerSuccess(data){
        const response = {
            statusCode: 200,
            headers:{
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers":"*",
                "Access-Control-Allow-Metods":"*",
                "Accept":'*/*',
                "Content-Type":'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(data)
        }
        return response
    }

    handlerError(data){
        return {
            statusCode: data.statusCode || 501,
            headers:{
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers":"*",
                "Access-Control-Allow-Metods":"*",
                "Accept":'*/*',
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Credentials': true
            },
            body: 'Couldn\'t read Items !'
        }
    }
    
}
 
const handler = new Handler()
module.exports = handler.main.bind(handler)