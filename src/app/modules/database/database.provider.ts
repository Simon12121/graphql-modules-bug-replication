import {Injectable} from 'graphql-modules';
import {MongoClient} from 'mongodb';

@Injectable({
    global: true
})
export class DatabaseProvider {
    private client: MongoClient;

    public async initDB(): Promise<void> {
        console.log('Connect to MongoDB...');
        try {
            const client = new MongoClient(process.env.MONGO_DB_URI);
            this.client = await client.connect();
            console.log('Connected successfully to MongoDB.');
        } catch (error) {
            console.log(error);
        }
    }

    public getClient(): MongoClient {
        if (!this.client) {
            console.log('The connection to MongoDB is not defined.');
            this.initDB();
        }
        return this.client;
    }

}
