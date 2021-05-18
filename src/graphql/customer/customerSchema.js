const typeDefinition  = `
    type Customer {
        id: String
        name: String
        birthday: String
        document: String
        email: String
        address: String
        zip: String
        phone: String
    }

    type Query {
        getCustomer(
            id: String
            name: String
        ): [Customer]
    }

    input CustomerUpdateInput {
        name: String!
        birthday: String!
        document: String!
        email: String!
        address: String!
        zip: String!
        phone: String!
    }

    type Mutation {
        createCustomer(
            name: String!,
            birthday: String!,
            document: String!,
            email: String!,
            address: String!,
            zip: String!,
            phone: String!,
        ): String,
        
        deleteCustomer(
            id: String!
        ): String,

        updateCustomer(
            id: String!,
            customer: CustomerUpdateInput
        ): Customer,
        
    }
`

module.exports = typeDefinition