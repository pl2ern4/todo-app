import TodoList from "@/components/todolist";
import AddItem from "@/components/AddItem";

interface Parameters{
  title:string;
  description: string;
}
const headers = {
  'Content-Type': 'application/json'
};

async function getData() {
  const SERVICEURI = `${`${process.env.SERVICEURI}`|| `http://localhost:300/`}get-list`;
  const res = await fetch(`${SERVICEURI}`,{
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const result = await res?.json();
  return result;
}
type JSONResponse = {
	_id:string
}
type DeleteJSONResponse = {
	ok:boolean;
  message?: string;
}
export default async function Home(props: any) {
  
  let todoList = await getData()
  const SERVICEURI = process.env.SERVICEURI||'http://localhost:4000/';
  const createTodoItem = async ({title, description}:Parameters) => {
    "use server"
    try {
      let res = await fetch(`${SERVICEURI}insert-in-data/`,{
      method: "POST",
      headers,
      body:JSON.stringify({title, description})
    });
      if(res.ok){
        const { _id }:JSONResponse = await res.json() as JSONResponse;
        return {
          result:true,
          todoList: [...todoList,{_id: _id, title, description}] 
        }
      }
      throw "Failed";
      
    }catch(e){
      return {
        result: false
      }
    }
  }
  const handleDelete = async (item:string)=>{
    "use server";
    const payload = JSON.stringify({item});
    try{
      let res = await fetch(`http://localhost:4000/delete-todo`,{
        method:"POST",
        headers,
        body: payload
      });
      const { ok, message } = res as DeleteJSONResponse;
      if(ok){
        throw message || "Failedddd"
      }
      return {
        result:true,
        data: item
      };
    }catch(e){
      return {
        result:false,
      }
    }
  }
  return (
    <div><TodoList todoList={todoList} handleDelete={handleDelete}/><AddItem onSubmit={createTodoItem}/></div>
  );
}
