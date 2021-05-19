const Joi = require('@hapi/joi')
const decoratorValidator = require('../../util/decoratorValidator')
const globalEnum = require('../../util/globalEnum')
const CustomerFactory = require('../../../core/factories/customerFactory')
 
class Handler {

    static validator(){
        return Joi.object({
            name: Joi.string().max(100).min(5).required(),
            birthday: Joi.string().max(12).min(10).required(),
            document: Joi.string().max(12).min(10).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).min(10).required(),
            zip: Joi.string().max(20).min(4).required(),
            phone: Joi.string().max(12).min(10).required(),
        })
    }

    async main(event){
        try {
            const data = event.body
            const { id }  = event.pathParameters
            const customerFactory = await CustomerFactory.createInstance()
            const customer = await  customerFactory.findOne(id)

            if(!customer)
                return this.handlerSuccess({message:"Customer not found."})

            
            const updatedCustomer = await customerFactory.update(id,data)
            return this.handlerSuccess(updatedCustomer)
        } catch (error) {
            console.log('Oops...')
            console.log(error)
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
            body: 'Couldn\'t update item !'
        }
    }
    
}
 
const handler = new Handler()
module.exports = decoratorValidator(
    handler.main.bind(handler),
    Handler.validator(),
    globalEnum.ARG_TYPE.BODY
)

