<script>
import {onMount} from 'svelte'
import TodoStore from '../store/todoStore'
import TextInput from '../components/textInput.svelte'
import TodoItems from '../components/todoitems.svelte'
import Card from '../components/card.svelte'
import Button from '../components/button.svelte'

let todoText = "";
let todoList = [];

const saveTodo = (event) =>  {

    fetch('https://svelte-todo-fdc4e.firebaseio.com/todos.json',{
        method: 'POST',
        body: JSON.stringify(todoText),
        headers: {
            ContentType: "application/json"
        }
    }).then(response => {
        if(!response.ok){
            throw new Error()
        }else{
            return response.json()
        }
    }).then(data => {
        console.log(data)
        TodoStore.addTodo({
            id: data,
            text: todoText
        })

    }).catch(err => {
        console.log(err)
    })
}

const removeTodo = (id) =>{
    console.log(id)
    
    let url = `https://svelte-todo-fdc4e.firebaseio.com/todos/${id}.json`
    fetch(url,{
        method: 'DELETE'
    }).then(response =>{
        if(!response.ok){
            throw new Error()
        }else{
            TodoStore.removeTodo(id)
        }
    }).catch(err =>{
        console.log(err)
    })
}

onMount(()=>{
    console.log('on mount')
    fetch('https://svelte-todo-fdc4e.firebaseio.com/todos.json',{
        method: 'GET',
    }).then(response =>{
        if(!response.ok){
            throw new Error()
        }else{
            return response.json()
        }
    }).then(data => {
        // console.log(data)
        for(let itm in data){
            todoList.push({
                id: itm,
                text: data[itm]
            })
        }
        console.log(todoList)
        TodoStore.setTodo(todoList)
    }).catch(err =>{
        console.log(err)
    })
})

</script>

<style>

.mycontent{
    width: 40%;
    position: relative;
    top: 10rem;
}

.inlist{
    /* padding-right: 1rem; */
    overflow-y: auto;
    height: 30vh;
}

</style>

<div class="container">
<div class="m-auto mycontent">
<h2 class="text-center">Todo App</h2>
<Card>
<TextInput label="Enter your todos.." value="" on:input={(event) => todoText = event.target.value}/>
<Button label="save" defaultcls="btn btn-success btn-block" on:click={saveTodo}></Button>
<hr>
{#if $TodoStore.length > 0}
<div class="inlist">
<ul class="list-group">
{#each $TodoStore as item (item.id)}
  <li class="list-group-item">
  <TodoItems todoText={item.text} on:click={removeTodo.bind(this,item.id)}/>
  </li>
{/each}
</ul>
</div>
{:else}
<p>Add some todos..</p>
{/if}
</Card>
</div>

</div>