/**
 * src\components\fields\InputEmpty.tsx
 */
interface InputProps {
    typeName?: string;
    placholderText?: string;
    classes?: string;
}

const Input: React.FC<InputProps> = ({ 
    typeName = 'text', 
    placholderText = 'Введите данные', 
    classes = 'input input-neutral',
}) => {
    return (
        <label className="input validator">
            <input type={typeName} placeholder={placholderText}  className={classes} />
        </label>
    );
};

export default Input;
