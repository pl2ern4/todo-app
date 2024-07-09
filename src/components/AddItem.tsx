'use client';

import { FormEvent } from 'react'

const formStyle = {
    borderColor:"grey",
}
const AddItem = ({onSubmit}:{onSubmit:any}) =>{
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title');
        const description = formData.get('description')
        const {result} = await onSubmit({title, description});
        if(result===true){
            window.location.reload()
        }
        
     }
    return(
        <form method="POST" style={formStyle} onSubmit={handleSubmit}>
            <input style={formStyle} type="text" name="title" required/>
            <textarea name="description" required/>
            <input type="submit" value="Add to List"/>
        </form>
    )
}

export default AddItem;