/**
 * src\app\components\Settings\index.tsx
 */
import {JSX, useState } from 'react';
import Button from 'src/components/fields/Button';
import Input from 'src/components/fields/InputEmpty';
export function SettingsFC({...props}): JSX.Element {
    const {flow, type, category, subcategory, 
        status, money, slug, created_at, updated_at } = props.props;
    const setSettings = props.usesetting;
    const inputTypeField = () => <Input placholderText={type.content} />;
    const inputCategoryField = () => <Input placholderText={category.content} />;
    const inputStatusField = () => <Input placholderText={status.content} />;
    const inputMoneyField = () => <Input placholderText={money.content} />;
    const inputSlugField = () => <Input placholderText={slug.content} />;
    const inputCreated_atField = () => <Input placholderText={created_at.content} />;
    const inputUpdated_atField = () => <Input placholderText={updated_at.content} />;
     
    const buttonField = () => <Button contentButton={"Сохранить"} classes={"btn btn-outline btn-secondary"} classesDiv={''} />;
    const buttonCansField = () => <Button contentButton={"Отмена"} classes={"btn btn-outline btn-warning"} classesDiv={''} />;
    return (
        <>        
            {/* row 1 */}
            <tr data-flow={flow.id}>
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
                    {buttonCansField()}
                </td>
            </tr>
            
        </>
    );
}