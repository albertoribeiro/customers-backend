const dynamoose = require('dynamoose')
const Schema = dynamoose.Schema

const schema = new Schema({
    id:{
        type: String,
        required: true,
        hashKey: true
    },
    name:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    document:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }    
})

const model = dynamoose.model(
    process.env.CUSTOMERS_TABLE,
    schema
)

module.exports = model