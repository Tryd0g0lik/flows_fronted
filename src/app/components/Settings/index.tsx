/**
 * src\app\components\Settings\index.tsx
 */
import React, {JSX, useEffect } from 'react';
import Button from 'src/components/fields/Button';
import Input from 'src/components/fields/InputEmpty';
import selectCell from './handlers/selectCell';
export function SettingsFC({...props}): JSX.Element {
    const {flow, type, category, subcategory, 
        status, money, slug, created_at, updated_at } = props.props;
    
    // GET COMPOMEMTS OF FORMS & DATA
    const inputTypeField = () => <Input placholderText={type.content} />;
    const inputCategoryField = () => <Input placholderText={category.content} />;
    const inputStatusField = () => <Input placholderText={status.content} />;
    const inputMoneyField = () => <Input placholderText={money.content} />;
    const inputSlugField = () => <Input placholderText={slug.content} />;
    const inputCreated_atField = () => <Input typeName='date'  classes = 'created_at input input-neutral'  placholderText={created_at.content} />;
    const inputUpdated_atField = () => <Input typeName='date' classes = 'updated_at input input-neutral' placholderText={updated_at.content} />;
    const buttonField = () => <Button contentButton={"Сохранить"} classes={"btn btn-outline btn-secondary"} classesDiv={''} />;
    useEffect(() =>{
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
                <td data-status={status.id}>
                    {inputStatusField()}
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
