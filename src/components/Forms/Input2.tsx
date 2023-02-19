import { classNames } from "../../helpers/ui";
import InputMsg from "../alerts/InputMsg";


interface Input2Props {
    label?: string,
    placeholder?: string,
    hint?: string,
    hintType?: 'error' | 'success' | 'warning' | 'none',
    type?: string,
    class?: string,
    [key: string]: any
};

export default function({placeholder, label, hintType, hint, type, ...props}: Input2Props){
    return (
        <div className={classNames({
            'w-full mt-3': true
        })}>
            <label v-if="label" className="block mb-2 text-sm font-medium text-gray-900">{ label }</label>
            <input
                {...props}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={(placeholder || label)}
                type={type || 'text'} />
            {
                hint?<InputMsg type={hintType || 'error'}>{hint }</InputMsg>:null
            }
        </div>
    );
}