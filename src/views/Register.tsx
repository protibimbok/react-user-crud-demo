import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextAlert from "../components/alerts/TextAlert";
import Button1 from "../components/buttons/Button1";
import Input2 from "../components/Forms/Input2";
import Select2 from "../components/Forms/Select2";
import TagList from "../components/Forms/TagList";
import { addData, getTags, type Response } from "../helpers/crud";
import { setTitle } from "../helpers/site";


export default function(){
    const {response, tagHint, setTags, submit} = useSubmit();
    const formEl = useRef<HTMLFormElement>(null);
    useEffect(()=>{
        setTitle('Register');
    }, []);

    return (
        <div className="container mx-auto mt-5 p-4">
        <div className="bg-white rounded-lg border max-w-2xl mx-auto">
            <h3 className="px-4 py-3 font-bold text-md border-b">Register</h3>
            <form className="block p-4" ref={formEl}>
                {response || tagHint?<TextAlert type={(response?.error || tagHint)?'error':'success'}>{ response?.message || tagHint }</TextAlert>:null}
                <Input2
                    name="name"
                    label="Name"
                    hint={response?.errors?.name}/>
                <Input2
                    name="email"
                    label="Email"
                    type="email"
                    hint={response?.errors?.email}/>
                
                <Input2
                    name="password"
                    label="Password"
                    type="password"
                    hint={response?.errors?.password}/>
                <Select2
                    name="profession"
                    label="Profession">
                    <option value="">Select Profession</option>
                    <option value="student">Student</option>
                    <option value="techer">Techer</option>
                    <option value="other">Other</option>
                </Select2>
                <TagList
                    fetcher={getTags}
                    label="What would you use this service for?"
                    placeholder="Type"
                    hint={tagHint ||  'Select a maximum of 3 items'}
                    hintType={tagHint?'error':'none'}
                    onChange={setTags}/>
                <Button1
                    onClick = {()=>{
                        if(formEl.current){
                            submit(formEl.current);
                        }
                    }}
                    className="mt-4">
                    Sign UP
                </Button1>
            </form>
        </div>
    </div>
    );
}



function useSubmit() {
    const [response, setResponse] = useState<Response | null>(null);
    const [tagHint, setTagHint] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const navigate = useNavigate();
    const submit = (formEl?: HTMLFormElement) =>{
        if(!formEl){
            return;
        }
        if(tags.length == 0){
            setTagHint('Please select at least one tag...');
            return;
        }else if(tags.length > 3){
            setTagHint('Maximum three tags are allowed...');
            return;
        }
        
        setTagHint(null);
        const data = {
            uses: tags
        };
        for(let i = formEl.length - 1; i > -1; i-- ){
            //@ts-ignore
            data[formEl[i].name] = formEl[i].value;
        }
        const res = addData(data);
        console.log(res);
        if(!res.error){
            navigate('/');
        }
        setResponse(res);
    }
    return {response, tagHint, submit, setTags};
}
