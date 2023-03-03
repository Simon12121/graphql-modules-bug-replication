import {config as configDotenv} from 'dotenv';
import {resolve} from 'path';


switch (process.env.NODE_ENV) {
    case 'test':
        configDotenv({
            path: resolve(__dirname, '../environment/test.env')
        });
        break;
    case 'development':
        configDotenv({
            path: resolve(__dirname, '../environment/.env')
        });
        break;
    default:
        configDotenv({
            path: resolve(__dirname, '../environment/.env')
        });
}
