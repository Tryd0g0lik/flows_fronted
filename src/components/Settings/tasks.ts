/***
 * src\components\Settings\tasks.ts
 */
import {MouseEvent} from "react";
import getAllAndOne from "../Main/handlers/loaderOfRows";
import { Category, SabcategoryAPIURL, Subcategory } from "@interfeces";

/**
 * @description This is a task for get array of 'Type' from DB through:
 * ```js
 *  Promis.all([
 *  async() => {}
 *   const [resultTypes ] = await taskGetCategroyStatus(...)
 *     return resultTypes;
 * ])
 * ```
 * @param more - This is array from API URLs.
 * @return Type[] ```ts
    interface Type {
        id: number,
        slug: string,
        name: string,
        category: number
    }
    ```
 */
const taskGetTypes = async (more: string[]) => {
    try {
        const [resultTypes, ] = await  Promise.all([
            getAllAndOne(more[1]),
        ]);
        if (!resultTypes) return [];
        return resultTypes;
    } catch (error) {
        console.error("ERROR => ", (error as Error).message);
    }
    return [];
};


/**
 * @description This is a task for get data from DB through:
 * ```js
 *  Promis.all([
 *  async() => {}
 *   const [statusCategor, statusResult, ] = await taskGetCategroyStatus(...)
 *
 * ])
 * ```
 * @param statusCategor - result from request by DB to the table 'category'.
 * @param statusResult - result from request by DB to the table 'status'.
 */
const taskGetCategroyStatus = async (more: string[]) => {
    try {
        const [statusCategor, statusResult, ] = await  Promise.all([
            getAllAndOne(more[3]),
            getAllAndOne(more[2]),
        ]);
        if (!statusCategor || !statusResult) return [];
        return [statusCategor, statusResult];
    } catch (error) {
        console.error("ERROR => ", (error as Error).message);
    }
    return [];
};

/**
 * @description This function for geting - the select of category from user.
 *  Then we launching the 'taskGetindexesLiveSubcategory' function.
 * @param param0 ```json
 *  {
        subcategories: number[];
        more: string[];
    }
    ```
 * @returns  Subcategory[] ```ts
    [ {
        id: number,
        slug: string,
        name: string,
    }]
    ```
 */
const taskGetSubategroyLive = async ({...props}: SabcategoryAPIURL): Promise<Subcategory[] > => {

    try {
        // GET THE API URL
        const set = new Set();
        props.subcategories.forEach((integer) => {
            set.add(props.more[4] + `${String(integer)}/`);
        });
        // GET FUNCTION FOR ENYTHING API URL (from set) for request by DB to the table 'subcategory'.
        const setTask = new Set();
        [...set].forEach((item, index) => {
            setTask.add(
                async () => await getAllAndOne(item as string)
            );
        });
        // GET 'subcategory' - responses.

        const responses = await  Promise.all(([...setTask] as [ () => any ]).map( async (task ) => task()));
        if (!responses) return [] as Subcategory[];
        return [...responses] as Subcategory[];
    } catch (error) {
        console.error("ERROR => ", (error as Error).message);
    }
    return [];
};

/**
 * @description This function is task for live costomezation the 'Subcategory' when we chanhging the 'Category'.
 * @param props This param has the proparties ```js
 *  export interface SabcategoryAPIURL {
    subcategories:number[],
    more: string[]} // 'more' - pathname from API-url
    ```
 * @returns Category["subcategories"]  Example: [1, 4];
 */
const taskGetindexesLiveSubcategory = async (event: MouseEvent): Promise<Category["subcategories"] | []> => {
    if (!((event.target as HTMLSelectElement).tagName)?.toLowerCase().startsWith("select")) {
        return [] as Category["subcategories"];
    };
    const arrOptionHtml = (event.target as HTMLSelectElement).querySelectorAll("option");
    if (!(arrOptionHtml[0]?.hasAttribute("data-category"))){
        return [];
    };
    const target = event.target as HTMLSelectElement;
    // CATEGORY fIND THE SELECTED (by 'option' html);
    const selectedOption = Array.from(arrOptionHtml).find((item) => (((item as HTMLOptionElement).textContent).startsWith(target.value)));
    // GET 'data-child' FROM THE CELL OF CATEGORY - Type is the string.
    const result = selectedOption ? selectedOption.getAttribute("data-child") : "";
    // GET ARRAY OF NUMBERS
    const arrIndexesSubcategory = result ? result.split(","): [];
    // CHANGE THE TTYPE OF ELEMENTS FROM ARRAY - 'arrIndexesSubcategory'
    const numbers: Category["subcategories"] = [];
    arrIndexesSubcategory.forEach((item) => {
        numbers.push(Number(item));
    });
    // LET IS GO
    return [...numbers] as Category["subcategories"];
};


export {taskGetTypes, taskGetCategroyStatus,taskGetindexesLiveSubcategory, taskGetSubategroyLive};
