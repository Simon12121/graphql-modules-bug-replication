import {Injectable} from 'graphql-modules';
import {DatabaseProvider} from '../../../database/database.provider';
import {Db, Document, FindCursor} from 'mongodb';

const TEST_COLLECTION = 'names'
const NAME_FIELD = 'name';
const TEST_NAME = 'testName'

const NUMBER_OF_TEST_DOCUMENTS = 5000;

@Injectable()
export class FeatureProvider {

    constructor(private databaseProvider: DatabaseProvider) {
    }

    public async getAllNames(): Promise<Array<string>> {
        const db: Db = this.databaseProvider.getClient().db();

        const cursor: FindCursor = db
            .collection(TEST_COLLECTION)
            .find({});

        const names: Array<string> = [];
        while (await cursor.hasNext()) {
            const doc: Document = await cursor.next();
            const name: string = doc[TEST_NAME];
            names.push(name);
        }
        return names;
    }

    public async initFeatureTest(): Promise<void> {
        const db: Db = this.databaseProvider.getClient().db();

        const nameDocuments: Array<Document> = [];
        for (let i = 0; i < NUMBER_OF_TEST_DOCUMENTS; i++) {
            nameDocuments.push(
                {
                    [NAME_FIELD]: TEST_NAME
                }
            );
        }

        await db
            .collection(TEST_COLLECTION)
            .insertMany(nameDocuments);
    }
}
