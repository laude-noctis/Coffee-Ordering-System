const express = require('express');
const path = require('path');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs, resolvers
});

const app = express();

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // will get this working later
    //  app.use('/graphql', expressMiddleware(server, {
    //  context: authMiddleware
    //  }))

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
        })
    })
}

startApolloServer();