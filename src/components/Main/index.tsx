
/**
 * src\classes\table.ts
 */
import React, {useState, useCallback, useEffect, JSX} from "react";
import { PageMeta, Flow, Type, Status, BASIC_URL_API, Category, Subcategory, PageAssorty, RootState } from "@interfeces";

import "./style.css";
import { task0GetLines, task2GetNumbersOfType, task3GetCategories, task4GetSubcategories } from "./tasks";
import Table from "src/services/table";
import handlerSettings from "./handlers/handlerForSettings";
import { SettingsFC } from "../Settings";
import {useDispatch, useSelector} from "react-redux";
import { setCurrentFlow } from "src/redux/features/tableRow/rowSlice";



export function MainFC({...props}: PageAssorty): React.JSX.Element {
    const {arrApiUrl, ...page} = props;
    const {title, ...more} = props.page;
    const [lines, setLines] = useState<Flow[]>([]);
    const [typedata, setTypedata] = useState<Type[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
    const [setting, setSetting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const currentFlow = useSelector((state: RootState) => state.flow); 
    // Sequential execution with proper data flow
    const executeTasksSequentially = useCallback(async (): Promise<void> => {
            try {
                // GET DATA FROM DB Step 1: Get lines, types, status
                /**
                 * @param statusResult - result from request by DB to the table 'status'.
                 * @param typeResult - result from request by DB to the table 'type'.
                 * @param flowResult - result from request by DB to the table 'flow'.
                 */
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
        }, []);

    const tableContent = setting ? (
            <SettingsFC props={{...currentFlow, ...setSetting, ...arrApiUrl}}  />
            
        ) : lines?.length > 0 ? (
            lines.map((item, index) => (                
                <tr key={item.id} data-flow={item.id} className={`${(index % 2 === 0) ? "hover:bg-gray-300" : ''}`}>
                    <td>{index}</td>
                    <td data-type={item.type_id}>
                        {typedata.length > 0 
                            ? typedata.find(view => view.id === item.type_id)?.name || item.type_id
                            : item.type_id
                        }
                    </td>
                    
                    <td data-category={category[index]?.id}>
                        {category[index]?.name}
                    </td>
                    
                    <td data-name='subcategory'>
                        <select defaultValue="Subcategory" className="readonly-select select appearance-none" >
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
                    <td data-name="money">{item.money}</td>
                    <td data-name="slug">{item.slug}</td>
                    <td data-name="created_at">{item.created_at ? item.created_at.split(".")[0] : item.created_at}</td>
                    <td data-name="updated_at">{item.updated_at ? item.updated_at.split(".")[0] : item.updated_at}</td>
                    <td data-name="setting">
                        <button className="cursor-pointer">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><path d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path></g></svg>
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={10} className="text-center">
                    <span className="loading loading-bars loading-xl"></span>
                </td>
            </tr>
        );
    
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
                            <h3 className="text-xl font-semibold">{setting ? "Редактор" : "Записи" }</h3>
                        </div>
                        <div className="overflow-x-auto overflow-y">
                            <table onMouseDown={(event: React.MouseEvent): void  => {
                                const table = new Table(event);
                                // CHECK
                                if (!(table.tagname.startsWith("svg")) || (table.tagname.startsWith("svg") && !((((table.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).getAttribute('data-name')?.startsWith("setting")))){
                                return;
                                }
                                // GET CONTENT/FLOW
                                const {getAllTdOfTr } = handlerSettings;
                                const arrContent = getAllTdOfTr(table.target as HTMLTableCellElement);
                                table.content = ((typeof arrContent).toLowerCase().startsWith("object")) ? arrContent as [] : [];
                                // SENDING AT FORM FOR CHANGED
                                dispatch(setCurrentFlow({...table.content}));
                                setSetting(true);
                                }} className="table table-xs">
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
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody onMouseDown={(event: React.MouseEvent<HTMLTableSectionElement>): void => {
                                    const target = event.target as HTMLElement;
                                    if (target.tagName.toLowerCase().startsWith('button') && (target.className).includes('cansel')) {
                                        setSetting(false);
                                    }
                                }}>
                                {/* row 1 */}
                                
                                {tableContent}
                                
                                
                                </tbody>
                            </table>
                            
                        </div>
                        {!setting ? (
                            <div className="join">
                            <button className="join-item btn">«</button>
                            <button className="join-item btn">Page 1</button>
                            <button className="join-item btn">»</button>
                        </div>
                        ) : "" }
                        
                    </div>
                </div>

            </section>
        </main>
        </>
    );
};
