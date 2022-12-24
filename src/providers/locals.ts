import * as path from 'path';

require('dotenv').config();

class LocalsProvider {
    constructor() {
        
    };

    public static config() {
        return {
            STORAGE_PATH: path.join(__dirname, '../../storages/'),
            STORAGE_URL: `${process.env.APP_URL}/storages`,
            FONTS : {
                arial: '/Windows/Fonts/arial.ttf'
            },
            INTRO_VIDEO: process.env.INTRO_VIDEO,
            OUTRO_VIDEO: process.env.OUTRO_VIDEO,
            PORT: 3000
        }
    };
}

export default LocalsProvider;