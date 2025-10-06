/**
 * src\interfaces.ts
 */
import { store } from "./redux/store";

const APP_HOST = process.env.APP_HOST || '83.166.245.209';
const APP_PORT = process.env.APP_PORT || '8000';
const APP_PROTOCOL = process.env.HTTP || 'http';

export const APP_URL = !APP_PORT ? `${APP_PROTOCOL}://${APP_HOST}` : `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;
export const BASIC_URL_API = `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}/api/page`;
/* COMMON */
export interface PageMeta {
    page: {
        title: string;
        description: string;
        keywords: Array<string>;
        pathName: string;
    };
}
export interface PageAssorty {
    page: {
        title: string;
        description: string;
        keywords: Array<string>;
        pathName: string;
    },
    arrApiUrl: string[]
}


export type RootState = ReturnType<typeof store.getState>;

/** DATA FROM DB */
// Property of flow
export interface Flow {
    id: number,
    slug: string,
    money: number,
    comment?: string,
    created_at: string,
    updated_at: string,
    type_id: number,
    status_id: number
}

// Property of type
export interface Type {
    id: number,
    slug: string,
    name: string,
    category: number
}

// Property of statys
export interface Status {
    id: number,
    name: string
}

// Property of category
export interface Subcategory {
    id: number,
    slug: string,
    name: string,
}

// Property of category
export interface Category {
    id: number,
    slug: string,
    name: string,
    subcategories: Number[]
}


// For work into the tasks from component of 'Settings'
export interface SabcategoryAPIURL {
    subcategories:number[],
    more: string[]}
