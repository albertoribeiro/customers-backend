const resolvers = {
    Query: {
        async getCustomer(root, args, context, info){
            return context.Customer.findAll(args)
        }
    },
    Mutation: {
        async createCustomer(root, args, context, info){
            const { id } = await context.Customer.create(args)
            return id
        },
        async deleteCustomer(root, args, context, info){
            const { id } = args
            await context.Customer.delete(id)
            return ""
        },
        async updateCustomer(root, args, context, info){
            const { id, customer } = args
            const existsCustomer = await context.Customer.findOne(id)
            if(!existsCustomer)
                return {}
            
            const updetedCstomer = await context.Customer.update(id,customer)

            return updetedCstomer
        },
    },
}

module.exports = resolvers