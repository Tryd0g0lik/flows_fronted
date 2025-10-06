/**
 * src\components\Main\handlers\loaderOfRows.ts
 */
import {BASIC_URL_API, Category, Flow, Status, Subcategory, Type, } from 'src/interfaces';

async function getAllAndOne(apiPath: string): Promise<boolean | Flow| Flow[]| Type| Type[]
| Status | Status[] | Category | Category[] | Subcategory | Subcategory[]>  {
    try {
        const response = await fetch(apiPath);
        if (!response.ok) false;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Method GET to the server by API '${apiPath}' failed`);
    };
    return false;
}

export default getAllAndOne;
