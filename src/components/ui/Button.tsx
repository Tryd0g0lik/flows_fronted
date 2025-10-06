/**
 * src\components\ui\Button.tsx
 */
import {JSX} from "react";
interface Button{
    contentButton: string,
     classes: string,
     classesDiv: string
    }
const Button = ({contentButton='Отправить', classes ="btn btn-neutral join-item", classesDiv = ''}: Button): JSX.Element => {
    return(
        <div className={classesDiv}>
            <button className={classes}>{contentButton}</button>
        </div>
    );
};

export default Button;
