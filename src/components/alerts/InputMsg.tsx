import { classNames } from "../../helpers/ui"
interface InputMsgProps{
    type: 'error' | 'success' | 'warning' | 'none',
    children: any
}
export default function({type, children}: InputMsgProps){
    return (<p
        className={classNames({
            'text-xs font-normal leading-normal mt-0 mb-1': true,
            'text-red-500' : 'error' == type,
            'text-yellow-500' : 'warning' == type,
            'text-emerald-600' : 'success' == type,
            'text-gray-600' : 'none' == type
        })}>
        {children}
    </p>);
}