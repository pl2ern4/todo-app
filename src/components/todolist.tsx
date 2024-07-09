'use client';

import { useState } from "react";

type ToDoListProp = {
    _id:string;
    title:string;
    description: string
}

const TodoList = ({todoList, handleDelete}: {todoList: ToDoListProp[], handleDelete:(item:any)=>Promise<any>}) => {
    const [list, setList] = useState(todoList);
    if(!todoList?.length){
        return null;
    }
    const handleClick = async (id: string)=>{
        const {result, data} = await handleDelete(id);
        if(result===true){
            setList(list.filter(o=>o._id!==data))
        }
    }   
    return (<div>
        {
            list.map(({_id,title, description},_)=>(
                <div key={_id}><span>{title}</span><span>{ description }</span><button type="button" onClick={()=>handleClick(_id)}>X</button></div>
            ))
        }
    </div>)
}
export default TodoList;