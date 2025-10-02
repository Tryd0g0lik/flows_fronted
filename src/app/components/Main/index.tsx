import React, {useState, useEffect} from "react";
import { PageMeta, Flow, Type, Status, BASIC_URL_API, Category, Subcategory, PageAssorty } from "@interfeces";

import "./style.css";
import { task0GetLines, task2GetNumbersOfType, task3GetCategories, task4GetSubcategories } from "./tasks";


export function MainFC({...props}: PageAssorty): React.JSX.Element {
    const {arrApiUrl, ...page} = props;
    const {title, ...more} = props.page;
    const [lines, setLines] = useState<Flow[]>([]);
    const [typedata, setTypedata] = useState<Type[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
    
    
    // Sequential execution with proper data flow
    const executeTasksSequentially = async (): Promise<void> => {
            try {
                // Step 1: Get lines, types, status
                const [flowResult, typeResult, statusResult] = await Promise.all([
                    task0GetLines(arrApiUrl[0]),
                    task0GetLines(arrApiUrl[1]),
                    task0GetLines(arrApiUrl[2])
                ]);

                // Set states for step 1
                if (flowResult && Array.isArray(flowResult)) setLines(flowResult as Flow[]);
                if (typeResult && Array.isArray(typeResult)) setTypedata(typeResult as Type[]);
                if (statusResult && Array.isArray(statusResult)) setStatus(statusResult as Status[]);

                // Step 2: Get category indexes (depends on lines and typedata)
                if (flowResult && typeResult && Array.isArray(flowResult) && Array.isArray(typeResult)) {
                    const categoryIndexes = await task2GetNumbersOfType(
                        flowResult as Flow[], 
                        typeResult as Type[]
                    );
                    // Step 3: Get categories (depends on category indexes)
                    if (categoryIndexes.length > 0) {
                        const categories = await task3GetCategories(arrApiUrl[3], categoryIndexes);
                        setCategory(categories);

                        // Step 4: Get subcategories (depends on categories)
                        if (categories.length > 0) {
                            const subcategories = await task4GetSubcategories(arrApiUrl[4], categories);
                            setSubcategory(subcategories);
                        }
                    }
                }                
            } catch (error) {
                console.error("Error in sequential execution:", error);
            }
        };
    
    useEffect(() => {
        executeTasksSequentially();
    },[]); 

    return (
        <>
        
        <header>
            <div className="flex items-center justify-between">
                <div className="flex items-left"></div>
                <div className="flex items-center"></div>
                <div className="flex items-right"></div>
            </div>
        </header>
        <div className="h flex items-center justify-center">
            <h1>{title}</h1>
        </div>
        <main className="flex justify-center">
            <section className="flex justify-center w-7xl">
                
                <div className="flex max-w-full w-full relative items-center justify-center bg-gray-50">
                    <div className="z-10  w-full overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                        <div className="flex flex-col w-full items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                            <h3 className="text-xl font-semibold">Записи</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Status</th>
                                    <th>Money</th>
                                    <th>Slug</th>
                                    <th>created_at</th>
                                    <th>updated_at</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* row 1 */}
                                
                                {lines? lines.map((item, index) => (
                                     <tr key={item.id} data-flow={item.id} className={`${(index % 2 === 0) ? "hover:bg-gray-300" : ''}`}>
                                        <td>{item.id}</td>
                                        <td data-type={item.type_id}>
                                            {typedata.length > 0 
                                                ? typedata.find(view => view.id === item.type_id)?.name || item.type_id
                                                : item.type_id
                                            }
                                        </td>
                                        
                                        <td >
                                            
                                                {category[index]?.name}
                                         
                                        </td>
                                        
                                        <td>
                                            <select defaultValue="Subcategory" className="select appearance-none">
                                                {subcategory.filter(view => (category[index].subcategories).includes(view.id)).map((item, index) => (
                                                    <option key={index} data-subcategery={item.id} >{item.name}</option>
                                                ))                                                    
                                                }
                                            </select>
                                        </td>
                                        <td data-status={item.status_id}>
                                            {status.length > 0 
                                                ? status.find(view => view.id === item.status_id)?.name || item.status_id
                                                : item.status_id
                                            }
                                        </td>
                                        <td>{item.money}</td>
                                        <td>{item.slug}</td>
                                        <td>{item.created_at ? item.created_at.split(".")[0] : item.created_at}</td>
                                        <td>{item.updated_at ? item.updated_at.split(".")[0] : item.updated_at}</td>
                                    </tr>
                                ))
                                 :
                                  <tr>
                                    <td colSpan={7} className="text-center">
                                        <span className="loading loading-bars loading-xl"></span>
                                    </td>
                                </tr> }
                                
                                
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>

            </section>
        </main>
        </>
    );
};
