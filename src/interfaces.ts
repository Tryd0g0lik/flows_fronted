import { store } from "./redux/store";

/**
 * src\interfaces.ts
 */
const APP_HOST = process.env.APP_HOST || '83.166.245.209';
const APP_PORT = process.env.APP_PORT || '8000';
const APP_PROTOCOL = process.env.HTTP || 'http';

export const APP_URL = !APP_PORT ? `${APP_PROTOCOL}://${APP_HOST}` : `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;
/* COMMON */
export interface PageMeta {
    page: {
        title: string;
        description: string;
        keywords: Array<string>;
        pathName: string;
    };
}



export type RootState = ReturnType<typeof store.getState>;
