import { useState } from 'react';
import type { UserModel } from "../types/model";

/**
 * I could have hardcoded these values in the component,
 * but in real life scenarios http requests are required to
 * search for tags or this kind of values.
 * This function is to simulate similar functionality
 */
const allTags = ["Work", "Education", "Hobby", "Freelance", "Business"];
export const getTags = (keyword: string) : string[] => {
    if(!keyword){
        return [...allTags];
    }
    keyword = keyword.toLowerCase();
    const res:string[] = [];
    allTags.forEach(tag=>{
        const t = tag.toLowerCase();
        if(
            t.indexOf(keyword) > -1 ||
            keyword.indexOf(t) > -1
        ){
            res.push(tag);
        }
    });
    return res;
}


export interface Response{
    error: boolean,
    message: string,
    errors?: {[key: string]: string}
}

export const addData = (data: any): Response => {
    let message;
    const errors:any = {};
    if(!data?.name){
        errors.name = 'The name field is required!';
    }else if(data.name.length > 60){
        errors.name = 'The name can not be longer than 60 charecters!';
    }else if(data.name.length < 3){
        errors.name = 'The name can not be shorter than 3 charecters!';
    }else if(data.name.match(/[^a-zA-Z\s]/)){
        errors.name = 'The name can contain only letters and spaces!';
    }else{
        data.name = data.name.trim();
    }

    if(!data?.password){
        errors.password = 'The password field is required!';
    }else if(data.password.length > 300){
        errors.password = 'The password can not be longer than 300 charecters!';
    }else if(data.password.length < 6){
        errors.password = 'The password can not be shorter than 6 charecters!';
    }

    if(!data.email){
        errors.email = 'The email field is required!';
    }else{
        data.email = data.email.toLowerCase();
        if(!data.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            errors.email = 'The email address is invalid!';
        }
    }

    // Skipped tags & profession verification intentionally
    
    message = errors.name || errors.email || errors.password;
    
    const error = !!message;
    if(!message){
        message = 'Registration successfull!';
        addToLocal(data);
    }

    return {
        error,
        message,
        errors
    };
}


export const getUsers = ():UserModel[] => JSON.parse(localStorage.getItem('users') || '[]');

function addToLocal(data: any) {
    const old = getUsers();
    old.push(data);
    localStorage.setItem('users', JSON.stringify(old));
}

export const removeUser = (idx: number) => {
    const users = getUsers();
    users.splice(idx, 1);
    localStorage.setItem('users', JSON.stringify(users));
}

export type SortType = 'asc' | 'desc';

export interface Sorting<T>{
    by: T,
    order: SortType
}


export function useSorter<T>(initial: T, order: SortType = 'desc'): [Sorting<T>, (by: T) => Sorting<T>] {
    let sort_by = initial;
    let sort_type = order;
    const [sorted, setSorted] = useState<Sorting<T>>({
        by: sort_by,
        order: sort_type
    });
    return [
        sorted,
        (by: T):Sorting<T> => {
            if(sort_by == by){
                sort_type = sort_type === 'desc' ? 'asc' : 'desc';
            }else{
                sort_by = by;
                sort_type = order;
            }
            const newSorted = {
                by: sort_by,
                order: sort_type
            }
            setSorted(newSorted);
            return newSorted;
        }
    ]
}