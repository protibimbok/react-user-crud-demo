import { classNames } from "../../helpers/ui";
import type { ClassNames } from "../../types/ui";

interface Button1Props{
    variant?: 'primary' | 'blue' | 'danger' | 'dark' | 'none',
    type?: 'button' | 'submit' | 'reset',
    className?: ClassNames,
    children?: any,
    [key: string]: any
}

export default function({type, variant, className, children, ...props}: Button1Props){
    return (
        <button
        {...props}
        type={type || 'button'}
        className={classNames([
            'font-bold uppercase text-xs px-5 py-2.5 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150',
            className,
            {
                'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-300' : 'primary' == variant,
                'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300' : 'blue' == variant,
                'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-300' : 'dark' == variant,
                'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300' : 'danger' == variant,
                'bg-white text-gray-600 hover:bg-gray-50 focus:ring-gray-100 border border-gray-300' : 'none' == variant,
            },
        ])}>
        {children}
    </button>
    );
}