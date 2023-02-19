import { classNames } from "../../helpers/ui"
import InputMsg from "../alerts/InputMsg"


interface SelectProps{
    label?: string,
    hint?: string,
    hintType?: 'error' | 'success' | 'warning' | 'none',
    className?: string,
    children?: any,
    [key: string]: any
};

export default function({label, hint, hintType, className, children,  ...props}: SelectProps){
    return (
        <div className={classNames({
            'mt-3': true,
            className: true
        })}>
            <div>
                <label v-if="label" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <select
                    {...props}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                    {children}
                </select>
            </div>
            <InputMsg type={hintType || 'error'}>{hint}</InputMsg>
        </div>
    );
}