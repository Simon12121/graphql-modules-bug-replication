import {createModule} from 'graphql-modules';
import {loadFilesSync} from '@graphql-tools/load-files';
import {FeatureProvider} from './providers/feature.provider';

export const FeatureModule = createModule({
    id: 'feature_module',
    typeDefs: loadFilesSync(__dirname + '/schema/'),
    resolvers: loadFilesSync(__dirname + '/resolvers/'),
    providers: [
        FeatureProvider
    ],
    middlewares: {
        Query: {
            getAllNames: []
        },
        Mutation: {
            initFeatureTest: []
        }
    }
});
