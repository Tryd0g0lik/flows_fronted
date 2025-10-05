/**
 * src\app\components\Settings\index.tsx
 */
import React, {JSX, useCallback, useEffect, useState } from 'react';
import Button from 'src/components/fields/Button';
import Input from 'src/components/fields/InputEmpty';
import selectCell from './handlers/selectCell';
import getAllAndOne from '../Main/handlers/loaderOfRows';
import { Status } from '@interfeces';

export function SettingsFC({...props}): JSX.Element {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const {flow, type, category, subcategory, 
        status, money, slug, created_at, updated_at, ...more } = props.props;
    
    // GET DATA FROM DB
    /**
     * @param statusResult - result from request by DB to the table 'status'.
     */
    const childrenData = useCallback( async (): Promise<void> => {
        try {
            const [statusResult, ] = await  Promise.all([getAllAndOne(more[2])]);
            if (!statusResult){
                return;
            }
            setStatuses((statusResult as Status[]));
        } catch (error) {
            console.error("ERROR => ", (error as Error).message);
        }       

    }, []);
    // GET COMPOMEMTS OF FORMS & DATA
    const inputTypeField = () => <Input placholderText={type.content} />;
    const inputCategoryField = () => <Input placholderText={category.content} />;
    // const inputStatusField = () => <Input placholderText={status.content} />;
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
    });
    
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
                    {inputTypeField()}                    
                </td>
                
                <td data-category={category.id}>
                    {inputCategoryField()}
                </td>
                
                <td data-name='subcategory'>
                    <select defaultValue="Subcategory" className=" select appearance-none" >
                        
                        {subcategory.map((item: {id: string,  content: string}, index: number) => (
                            <option key={index} data-subcategery={item.id} >{item.content}</option>
                        ))                                                    
                        }
                    
                    </select>                  
                    
                </td>
                <td >
                    {/* {inputStatusField()} */}
                    <select defaultValue="Status" className="select appearance-none" >
                        
                        {statuses? (statuses as Status[]).map((item: Status, index: number) => (
                            (item.id===Number(status.id))? (
                                <option key={0} selected data-status={item.id} >{item.name}</option>
                                
                            ): (
                                <option key={index + 1 }  data-status={item.id} >{item.name}</option>
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
