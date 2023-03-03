import {DatabaseProvider} from './database.provider';
import {createModule} from 'graphql-modules';


export const DatabaseModule = createModule(
    {
        id: 'database_module',
        dirname: __dirname,
        providers: [
            DatabaseProvider
        ],
        typeDefs: []
    }
);
