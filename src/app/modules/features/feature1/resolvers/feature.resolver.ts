import {FeatureProvider} from '../providers/feature.provider';

export default {
    Query: {
        getAllNames: async (parent, args, context) => {
            const featureProvider: FeatureProvider = context.injector.get(FeatureProvider);
            return featureProvider.getAllNames()
        }
    },
    Mutation: {
        initFeatureTest: async (parent, args, context) => {
            const featureProvider: FeatureProvider = context.injector.get(FeatureProvider);
            await featureProvider.initFeatureTest();
            return 'Test database is initialized';
        }
    }
};
