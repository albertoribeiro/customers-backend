const CustomerFactory = require('../../../core/factories/customerFactory')
 
class Handler {

     

    async main(event){
        try {
            const customerFactory = await CustomerFactory.createInstance()
            const { id }  = event.pathParameters
            await  customerFactory.delete(id)
            return this.handlerSuccess({})
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
                "Content-Type":'application/json'
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
                'Content-Type': 'text/plain'
            },
            body: 'Couldn\'t delete item !'
        }
    }
    
}
 
const handler = new Handler()
module.exports = handler.main.bind(handler)
