import { writable } from 'svelte/store'

const todosWrite = writable([])

const todosStore = {
    subscribe: todosWrite.subscribe,
    setTodo: (todolist) => todosWrite.set(todolist),
    addTodo: (todoitm) => todosWrite.update(todoList => {
        return [todoitm, ...todoList]
    }),
    removeTodo: (id) =>  todosWrite.update(todoList => {
        return todoList.filter(itm => {
            if(itm.id !== id){
                return itm
            }
        })
    })
}

export default todosStore;