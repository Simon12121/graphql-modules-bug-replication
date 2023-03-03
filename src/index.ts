import './config';
import 'reflect-metadata';
import {DatabaseProvider} from './app/modules/database/database.provider';
import {Application, createApplication} from 'graphql-modules';
import {DatabaseModule} from './app/modules/database/database.module';
import express, {Express} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {expressMiddleware} from '@apollo/server/express4';
import {FeatureModule} from "./app/modules/features/feature1";

config();


async function startApolloServer(): Promise<void> {
    // Preload the database connection
    await DatabaseProvider.prototype.initDB();

    const application: Application = createApplication({
        modules: [
            DatabaseModule,
            FeatureModule
        ]
    });

    const app: Express = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema: application.createSchemaForApollo(),
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
        formatError: (err) => {
            console.log(err)
            return err;
        }
    });

    await server.start();
    app.use(
        '/graphql',
        bodyParser.json(),
        expressMiddleware(server)
    );

    await new Promise<void>(resolve => httpServer.listen({port: 4000}, resolve));

    console.log(`🚀 Server ready`);
}

startApolloServer().then(() => console.log('start apollo'));
