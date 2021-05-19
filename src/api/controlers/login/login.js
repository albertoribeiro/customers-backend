const users = require('../../../../db/users.json')
const JWT_KEY = process.env.JWT_KEY
const { sign } = require('jsonwebtoken')
const login = async event => {
    console.log('Login invoked!..', new Date().toISOString(), event.body)

    const {
        email,
        password
    } = JSON.parse(event.body)


    const validUser = users.find(
        user => 
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    )

    if(!validUser) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Unauthorized'
            })
        }
    }

    const signUser = {
        scopes: validUser.scopes,
        email: validUser.email
    }

    const token = sign({
        user: signUser,
    }, JWT_KEY, { expiresIn: '50m'})

    return {
        statusCode: 200,
        body: JSON.stringify({
            token,
            user: validUser.email
        })
    }
}

exports.handler = login