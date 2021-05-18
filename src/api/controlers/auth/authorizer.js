const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('../../util/buildIAMPolicy')
const myRoles = {
    // role name vs function name
    'customers': 'private'
}
const authorizeUser = (userScopes, methodArn) => {
    return userScopes.find(
        scope => methodArn.indexOf(myRoles[scope])
    )
}

exports.handler = async event => {
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
         
        const user = decodedUser.user
        const userId = user.email
        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        const authorizerContext = {
            user: JSON.stringify(user)
        }
        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow': 'Deny',
            event.methodArn,
            authorizerContext
        ) 
        return policyDocument
    } catch (error) {
        console.log('auth error**', error.stack)
 
        return {
            statusCode: 401,
            body: error.stack
        }
    }
}