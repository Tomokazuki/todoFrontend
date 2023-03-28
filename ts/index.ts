//const BACKEND_ROOT_URL = 'http://localhost:3001'
const BACKEND_ROOT_URL = 'https://todo-backend-0m1f.onrender.com'
import{ Task } from "./class/Task.js";
import{ Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL);

const list = <HTMLUListElement>document.querySelector('#todolist')
const input = <HTMLInputElement>document.querySelector('#newtodo')

input.disabled = true

todos.getTasks().then((tasks: Array<Task>)=>{
    tasks.forEach((task: Task)=>{
        renderTask(task)
    })
    input.disabled = false
}).catch(error => {
    alert(error)
});

/*
fetch(BACKEND_ROOT_URL)
  .then(response => response.json())
  .then((response)=>{
    response.forEach(node => {
        renderTask(node.description)
    });
    input.disabled = false
  }, (error) => {
    alert(error)
  })
*/

input.addEventListener('keypress', event => {
    if (event.key === "Enter") {    
      const text = input.value.trim()
      if (text !== '') {
        todos.addTask(text).then((task)=>{
          input.value = ''
          input.focus()
          renderTask(<Task>task)
        })
      }
      event.preventDefault()
    }
       /* const json = JSON.stringify({description: text})
        fetch(BACKEND_ROOT_URL + '/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => response.json())
        .then((response)=>{
            renderTask(text)
            input.value = ''
        }, (error) => {
            alert(error)
        })
    }
  }*/
})


const renderTask = (text:Task) => {
    const list_item :HTMLElement = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.setAttribute('data-key', text.id.toString())
    renderSpan(list_item, text.text)
    renderLink(list_item, text.id)

    list.append(list_item)
}

const renderSpan = (list_item: HTMLElement, text:string) => {
  const span = list_item.appendChild(document.createElement('span'))
  span.innerHTML = text
}

const renderLink = (list_item: HTMLElement, id:number) => {
  const link = list_item.appendChild(document.createElement('a'))
  link.innerHTML= '<i class="bi bi-trash"></i>'
  link.setAttribute('style', 'float: right')
  link.addEventListener('click', event => {
    todos.removeTask(id).then((id)=>{
      const elementToRemove :HTMLElement=document.querySelector(`[data-key="${id}"]`)
      if (elementToRemove) {
        list.removeChild(elementToRemove)
      }
    }).catch(error => {
      alert(error)
    })
  })

}