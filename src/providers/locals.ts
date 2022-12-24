import * as path from 'path';

require('dotenv').config();

class LocalsProvider {
    constructor() {
        
    };

    public static config() {
        return {
            STORAGE_PATH: path.join(__dirname, '../storages/'),
            STORAGE_URL: `${process.env.APP_URL}/storages`,
            FONTS : {
                arial: '/Windows/Fonts/arial.ttf'
            },
            PORT: 3000
        }
    };
}

export default LocalsProvider;