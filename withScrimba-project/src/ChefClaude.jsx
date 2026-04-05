import {useState} from 'react'

function ChefClaude(){

const [addItem, setAddItem]= useState([])
const AlllistItems=['wrty','uuru']

function handleInput(e){
setAddItem(e.target.value)
}

function handleSubmit(e){
e.preventDefault()
console.log("Form submitted")
}
const listItems= AlllistItems.map(item=>(
    <li key={item}>{item}</li>
))
function handleItems(){
    setAddItem(prev=> prev+ 1)
}

    return(
        <>
        <header className=" flex bg-[rgb(250,250,248)] items-center justify-center shadow-xl h-20 font-bold" >
            <h1 className="font-bold ">  
                Chef Claude
            </h1>
        </header>
        <main className="p-10 h-38">
            <form onSubmit={handleSubmit} className="flex gap-4 ">
                <input type="text" placeholder="e.g. oregano" aria-label="Add ingredient" name="List items"  onChange={handleInput} className=" flex-1 min-w-0 justify-center rounded-md bg-white border border-black shadow-l p-3"/>
                <button onClick={handleItems} className="bg-black text-white  border border-black rounded-md p-3 font-serif "> + Add ingredient</button>
            
            </form>
             <ol>
                {listItems}
            </ol>
        </main>
        </>
    )
}

export default ChefClaude;