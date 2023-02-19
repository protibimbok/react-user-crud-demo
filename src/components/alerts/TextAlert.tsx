import type { ReactElement } from "react";
import { classNames } from "../../helpers/ui"

interface TextAlertProps{
    onClose?: () => any,
    type: 'error' | 'success' | 'warning' | 'none',
    wrapperClass?: string,
    icon?: ReactElement,
    children?: any
};


export default function({onClose, type, wrapperClass, children}: TextAlertProps){
    return (
        <div 
        className={classNames([
            'px-6 py-4 border-0 rounded relative mb-4 items-center',
            {
                'text-red-800 bg-red-200':'error' == type,
                'text-yellow-900 bg-yellow-200':'warning' == type,
                'text-emerald-800 bg-emerald-200':'success' == type,
                'text-gray-800 bg-gray-400':'none' == type,
            },
            wrapperClass
        ])}>
        <div className="inline align-middle">
            {children}
        </div>
        {onClose?<button
            type="button"
            onClick={onClose}
            className={classNames({
                'flex justify-center items-center absolute -right-2 -top-2 outline-none h-5 w-5 rounded-full text-xl text-white pb-1': true,
                'bg-red-800': 'error' == type,
                'bg-yellow-900': 'warning' == type,
                'bg-emerald-800': 'success' == type,
                'bg-gray-800': 'none' == type
            })}>
            ×
        </button>:null}
    </div>
    );
}