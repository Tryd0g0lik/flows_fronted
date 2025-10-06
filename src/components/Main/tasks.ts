/**
 * src\components\Main\tasks.ts
 */
import { PageMeta, Flow, Type, Status, BASIC_URL_API, Category, Subcategory } from "@interfeces";


import getAllAndOne from "./handlers/loaderOfRows";

 // First GET DATA FLOW, TYPE, STATUS
export const  task0GetLines = async (url: string): Promise<Flow[] | Type[] | Status[] | false> => {
    const separate_url = url.split("/");
    if ((separate_url[separate_url.length - 2]).startsWith('category')
    || (separate_url[separate_url.length - 2]).startsWith('subcategory')) {
        return false;
    }

    try {
        const response = await getAllAndOne(url);
        if (!response) {
            console.log("Maybe something went wrong!");
            return false;
        };
        return response as Flow[] | Type[] | Status[];
    } catch (error) {
        const message = (error as Error).message;
        console.log(message);
        throw new Error(message);
    }
};

// GET NUMBER TYPE FROM FLOW & NUMBER OF CATEGORIES FROM TYPE
export const  task2GetNumbersOfType = async (lines: Flow[], typedata: Type[]): Promise<number[]> => {
    let arrOfIndexes = [] as number[];

    // Get indexes of types from lines
    lines.forEach((item) => arrOfIndexes.push(item.type_id));
    arrOfIndexes = [...new Set(arrOfIndexes)];

    // Get index of categories from typedata
    let ArrOfIndexesCategory = [] as number[];
    arrOfIndexes.forEach((num) => {
        const typeItem = typedata.find(item => item.id === num);
        if (typeItem && !ArrOfIndexesCategory.includes(typeItem.category)) {
            ArrOfIndexesCategory.push(typeItem.category);
        }
    });

    return ArrOfIndexesCategory;
};

// GET CATEGORIES
export const  task3GetCategories = async (url: string, categoryIndexes: number[]): Promise<Category[]> => {
    const separate_url = url.split("/");
    if (!(separate_url[separate_url.length - 2]).startsWith('category')) {
        return [];
    }

    let arrUrlSingleCategory = [] as string[];
    // Get array of url for single category
    categoryIndexes.forEach((item) => {
        arrUrlSingleCategory.push(`${url}${item}/`);
    });

    try {
        let arrCategory = [] as Category[];
        for (let i = 0; i < arrUrlSingleCategory.length; i++) {
            // Get single category by API
            const response = await getAllAndOne(arrUrlSingleCategory[i]);
            if (!response) {
                console.log("Maybe, category - something went wrong!");
                continue;
            };
            arrCategory.push(response as Category);
        }
        return arrCategory;
    } catch (error) {
        const message = (error as Error).message;
        console.log(message);
        throw new Error(message);
    }
};

// GET SUBCATEGORIES
export const  task4GetSubcategories = async (url: string, categories: Category[]): Promise<Subcategory[]> => {
    const separate_url = url.split("/");
    if (!(separate_url[separate_url.length - 2]).startsWith('subcategory')) {
        return [];
    }

    try {
        const arrSubCategory = [] as Subcategory[];
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < categories[i].subcategories.length; j++) {
                // Get single subcategory by API
                const response = await getAllAndOne(`${url}${categories[i].subcategories[j]}/`);
                if (!response) {
                    console.log("Maybe, subcategory - something went wrong!");
                    continue;
                };
                arrSubCategory.push(response as Subcategory);
            }
        }
        return arrSubCategory;
    } catch (error) {
        const message = (error as Error).message;
        console.log(message);
        throw new Error(message);
    }
};
