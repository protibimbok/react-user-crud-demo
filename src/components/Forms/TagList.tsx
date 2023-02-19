import { useEffect, useRef, useState } from "react";
import { classNames, gsapTL } from "../../helpers/ui";
import { ClassNames } from "../../types/ui";
import InputMsg from "../alerts/InputMsg";
interface TagListProps {
    label?: string;
    placeholder?: string;
    hint?: string;
    hintType?: "error" | "success" | "warning" | "none";
    className?: ClassNames;
    fetcher: (keyword: string) => string[];
    onChange?: (tags: string[]) => void;
}
export default function ({
    label,
    placeholder,
    hint,
    hintType,
    className,
    fetcher,
    onChange
}: TagListProps) {
    const [tags, setTags] = useState<string[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const listEL = useRef<HTMLUListElement>(null);
    

    useEffect(()=>{
        setAllTags([...fetcher('')]);
        const handler = ()=>{

            if(!listEL.current  || listEL.current.classList.contains('hidden')){
                return;
            }
            listEL.current.classList.remove('overflow-y-auto');
            gsapTL()
            .timeScale(3)
            .to(listEL.current, {height: 0}).then(()=>{
                listEL.current?.classList.add('hidden');
            })
        };
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler);
    }, [])

    return (
        <div className={classNames(["w-full relative", className])} onClick={evt=>evt.stopPropagation()}>
            <label v-if="label" className="block mb-2 text-sm font-medium">
                {label}
            </label>
            <div className="flex flex-wrap bg-slate-50 rounded-lg p-2.5 border text-sm">
                {tags.map((tag, idx) => (
                    <div
                        key={'selected_tag_' + idx}
                        v-for="item in tags"
                        data-id="item"
                        className="bg-white px-1 py-px rounded-md mx-1 relative pr-6 tracking-wider shadow"
                    >
                        {tag}
                        <button
                            type="button"
                            className="absolute right-0 text-red-500 hover:bg-red-500 hover:text-white py-0 px-1.5 rounded-full"
                            onClick = {()=>{
                                const newTags = [...tags.filter(t=>t != tag)];
                                setTags(newTags);
                                setAllTags([...allTags, tag]);
                                onChange && onChange(newTags);
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    className="px-1 py-0 m-0 border-0 flex-grow bg-transparent focus:outline-none"
                    placeholder={placeholder || label}
                    onFocus = {()=>{
                        if(!listEL.current?.classList.contains('hidden')){
                            return;
                        }
                        listEL.current.classList.remove('hidden');
                        gsapTL()
                        .timeScale(2)
                        .fromTo(listEL.current, {height: 0}, {height: 'auto'})
                        .then(()=>{
                            listEL.current?.classList.add('overflow-y-auto');
                        });
                    }}
                    onInput = {(evt: any)=>{
                        const all = fetcher(evt.target.value);
                        setAllTags([...all.filter(tag=>tags.indexOf(tag) == -1)]);
                    }}
                />
            </div>
            {hint?<InputMsg type={hintType || "error"}>{hint}</InputMsg>:null}
            <ul
                ref={listEL}
                className="absolute top-full inset-x-0 shadow-lg rounded-lg mt-0.5 bg-white border max-h-96 hidden overflow-hidden"
            >
                {allTags.length == 0 ?
                    <li v-if="allTags.length == 0">
                        <p className="p-4 text-red-400">
                            No item found that matches your query!
                        </p>
                    </li> :
                    allTags.map((tag, idx) => <li
                        key={'all_tag_'+idx}
                        className="border-b first:rounded-t-lg last:border-none">
                        <button
                            type="button"
                            className="px-4 py-3 cursor-pointer hover:bg-gray-100 w-full text-left"
                            onClick={()=>{
                                setAllTags([...allTags.filter(it => it != tag)]);
                                const newTags = [...tags, tag];
                                setTags(newTags);
                                onChange && onChange(newTags);
                            }}
                        >
                            {tag}
                        </button>
                    </li>)
                }
            </ul>
        </div>
    );
}
