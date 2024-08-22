import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {


    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {

    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    // console.log(newTodos, todos)
    saveToLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-auto">
        <h1 className="font-bold flex justify-center text-lg">iTask - Your Task Planner</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-1/2 rounded-lg" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-slate-300 p-2 py-1 rounded-lg mx-6 text-slate-700 font-bold hover:bg-slate-400 cursor-pointer disabled:bg-slate-400">Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold pt-4">You Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 '>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-slate-300 p-2 py-1 rounded-lg mx-2 text-slate-700 font-bold hover:bg-slate-400"><MdEditSquare /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-slate-300 p-2 py-1 rounded-lg mx-2 text-slate-700 font-bold hover:bg-slate-400"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
