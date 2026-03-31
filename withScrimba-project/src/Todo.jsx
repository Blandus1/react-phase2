import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function Todo(){
const [todos, setTodos] = useState([])
const [newTodo, setNewTodo] = useState('')

function handleInputChange(e){
    setNewTodo(e.target.value)
}

function handleAddition(){
   setTodos( (todo)=> [...todo, newTodo])
   setNewTodo("")
}
function handleDelete(id){
setTodos(todos=> todos.filter((_,index)=> index !== id))
}


    return(
        <>
        <div className=''>
       <div className=" min-h-22.5 h-20 p-40 ">
           <input type='text' aria-label='Things to do'  placeholder="Add todo...." value={newTodo}  onChange={handleInputChange} className="bg-[#cece2d] rounded-3xl min-h-10 pl-5 "/>
              <button onClick={handleAddition} className="bg-red-100 rounded-full  ">
                <FontAwesomeIcon icon= {faPlus}/>
            </button>
       </div>
       <div>
                <ol className='gap-5'>
            {todos.map((todo,id)=>
                <li key={id}> 
                  <input type="checkbox" className='border border-black'/>
                <span>{todo}</span>
                   <button onClick={()=>handleDelete(id)} className="bg-[#cece2d] rounded-full ">
                <FontAwesomeIcon icon= {faTrash}/>
            </button>
            </li>
        )}
        </ol>

       </div>
    </div>
        
      
        </>
    )
}


export default Todo;