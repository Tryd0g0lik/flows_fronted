/**
 * src\components\Settings\index.tsx
 */
import React, {JSX, MouseEvent, useCallback, useEffect, useState } from 'react';
import Button from '@Component/ui/Button';
import Input from '@Component/ui/InputEmpty';
import selectCell from './handlers/selectCell';
import { Category, SabcategoryAPIURL, Status, Subcategory, Type } from '@interfeces';
import {taskGetCategroyStatus, 
    taskGetindexesLiveSubcategory,
     taskGetSubategroyLive,
     taskGetTypes,} from "@Component/Settings/tasks";


export function SettingsFC({...props}): JSX.Element {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const {flow, type, category, 
        status, money, slug, created_at, updated_at, ...more } = props.props;
    let { subcategory}  = props.props;
    // GET DATA FROM DB
    /**
     * @param statusCategor - result from request by DB to the table 'category'.
     * @param statusResult - result from request by DB to the table 'status'.
     */
    const childrenData = useCallback( async (): Promise<void> => {
        const [statusCategor, statusResult ] = await taskGetCategroyStatus(more);
        setCategories(statusCategor ? (statusCategor as Category[]): []);
        setStatuses(statusResult ? (statusResult as unknown as Status[]) : []);
    }, []);
    // GET COMPOMEMTS OF FORMS & DATA
    const inputTypeField = () => <Input placholderText={type.content} />;
    const inputMoneyField = () => <Input placholderText={money.content} />;
    const inputSlugField = () => <Input placholderText={slug.content} />;
    const inputCreated_atField = () => <Input typeName='date'  classes = 'created_at input input-neutral'  placholderText={created_at.content} />;
    const inputUpdated_atField = () => <Input typeName='date' classes = 'updated_at input input-neutral' placholderText={updated_at.content} />;
    
    const buttonField = () => <Button contentButton={"Сохранить"} classes={"save btn btn-outline btn-secondary"} classesDiv={''} />;
    useEffect(() =>{
        childrenData();
        // INSER THE DATE IN THE INPUTS
        const created_atDate = new Date(created_at.content);
        const updated_atDate = new Date(updated_at.content);
        (document.getElementsByClassName("created_at")[0] as HTMLInputElement).valueAsDate=created_atDate;
        (document.getElementsByClassName("updated_at")[0] as HTMLInputElement).valueAsDate = updated_atDate as unknown as  Date ;
        Promise.all([(async () =>{
                    const result = await taskGetTypes(more);
                    setTypes(result as Type[]);
                })(),]);
            
    }, []);
    // 
    return (
        <>        
            {/* row 1 */}
            <tr onMouseDown={(event: React.MouseEvent<HTMLTableRowElement>) => {
                if (!((event.target as HTMLElement).tagName.toLowerCase().startsWith("button")) 
                    || !([...(event.target as HTMLElement).classList].includes('save'))){
                    return;
                }
                const result = selectCell.getData(event);
                if (!result) {
                    return;
                }
            }} data-flow={flow.id}>
                <td>0</td>
                <td data-type={type.id}>
                    <select defaultValue="Type" className="select appearance-none" >
                        {/* TYPE */}
                        {types.length > 0 ? (types as Type[]).map((item: Status, index: number) => (
                            (item.id===Number(type.id))? (
                                <option key={0} selected data-type={item.id} >{item.name}</option>
                                
                            ): (
                                <option key={index + 1} data-type={item.id} >{item.name}</option>
                            )
                            
                        )): (<span className="loading loading-bars loading-xl"></span>)
                        }
                    
                    </select> 
                </td>
                {/* CATEGORY */}
                <td onMouseUp={async (event: MouseEvent)=>{
                    const result = await taskGetindexesLiveSubcategory(event);
                    const props = {subcategories: result, more: {...more}} as SabcategoryAPIURL;
                    setSubcategories(await taskGetSubategroyLive(props));
                    }}>
                    <select defaultValue="Category" className="select appearance-none" >
                        {categories? (categories as Category[]).map((item: Category, index: number) => (
                            (item.id===Number(category.id))?(
                                <option key={0} selected data-category={item.id} data-child={item.subcategories}>{item.name}</option>
                                
                            ): (
                                <option key={index + 1} data-categery={item.id} data-child={item.subcategories}>{item.name}</option>
                            )
                            
                        )): (<span className="loading loading-bars loading-xl"></span>)
                        }
                    </select>
                </td>
                {/* SUBCATEGORY */}
                <td data-name='subcategory' > 
                    <select defaultValue="Subcategory" className=" select appearance-none" >
                        
                        {subcategories?.length === 0 && subcategory? subcategory.map((item: {id: string,  content: string}, index: number) => (
                            <option key={index} data-subcategery={item.id} >{item.content}</option>
                        )):(subcategories?.length > 0 ? subcategories.map((item, index: number) => (
                            <option key={index} data-subcategery={item.id} >{item.name}</option>
                        )) : <span className="loading loading-bars loading-xl"></span>)
                        }
                    
                    </select>   
                    
                </td>
                {/* STATUS */}
                <td >
                    <select defaultValue="Status" className="select appearance-none" >
                        
                        {statuses? (statuses as Status[]).map((item: Status, index: number) => (
                            (item.id===Number(status.id))? (
                                <option key={0} selected data-status={item.id} >{item.name}</option>
                                
                            ): (
                                <option key={index + 1}  data-status={item.id} >{item.name}</option>
                            )
                            
                        )): (<span className="loading loading-bars loading-xl"></span>)
                        }
                    
                    </select> 
                </td>
                <td data-name="money">{inputMoneyField()}</td>
                <td data-name="slug">{inputSlugField()}</td>
                <td data-name="created_at">{inputCreated_atField()}</td>
                <td data-name="updated_at">{inputUpdated_atField()}</td>
                <td data-name="setting">
                    {buttonField()}
                    <div>
                        <button className="cansel btn btn-outline btn-warning" >Отмена</button>
                    </div>
                </td>
            </tr>
            
        </>
    );
}

