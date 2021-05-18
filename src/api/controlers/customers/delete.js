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
            body: JSON.stringify(data)
        }
        return response
    }

    handlerError(data){
        return {
            statusCode: data.statusCode || 501,
            headers: { 'Content-Type': 'text/plain'},
            body: 'Couldn\'t delete item !'
        }
    }
    
}
 
const handler = new Handler()
module.exports = handler.main.bind(handler)
