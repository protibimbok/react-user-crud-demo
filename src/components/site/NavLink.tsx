import { NavLink } from "react-router-dom"
import { classNames } from "../../helpers/ui"


interface NavLinkProps{
    to: string,
    children: any
}

export default function({to, children}:NavLinkProps) {
    return <NavLink className={({isActive})=>classNames({
        'block text-gray-700 rounded hover:text-blue-700': true,
        'text-blue-700': isActive
    })} to={to}>{children}</NavLink>
}