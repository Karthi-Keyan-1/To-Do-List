const plus = document.getElementById("add")
const cancel = document.getElementById("cancel")
const add = document.getElementById("plus")
const form = document.getElementById("form")
const value1 = document.getElementById("date")
const value2 = document.getElementById("text")
const overlay = document.querySelector(".overlay")
const popup = document.querySelector(".popup")
const container = document.querySelector(".container")

var dumps = []
var editer = null

function show()
{
    container.innerHTML = ""
    dumps.forEach((item,index)=>{
        var box = document.createElement("div")
        box.className = "insider"
        box.innerHTML = `<h1>${item.date}</h1>
        <p>${item.area}</p>
        <div class="flex">
        <button onclick="update(${index})">Edit</button>
        <button onclick="dump(${index})">Delete</button
        </div>`
        container.append(box)
    })
}

async function load() {
    const response = await fetch("/tasks")
    dumps = await response.json()
    show()
}

load()

plus.addEventListener("click",()=>{
    overlay.style.display = "block"
    popup.style.display = "block"
})

cancel.addEventListener("click",()=>{
    event.preventDefault()
    overlay.style.display = "none"
    popup.style.display = "none"
    form.reset()
})

overlay.addEventListener("click",()=>{
    overlay.style.display = "none"
    popup.style.display = "none"
    form.reset()
})

add.addEventListener("click",async function(event) {
    event.preventDefault()
    if(value1.value.trim()===""||value2.value.trim==="")
    {
        alert("PLEASE FILL ALL THE FIELDS")
        return
    }
    if(editer)
    {
        await fetch(`/tasks/${editer}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                date:value1.value,
                area:value2.value
            })
        })
        editer = null
    }
    else{
        await fetch("/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            date:value1.value,
            area:value2.value
        })
    })
    }
    await load()
    overlay.style.display = "none"
    popup.style.display = "none"
    form.reset()
})

async function dump(index) {
    const id = dumps[index]._id
    await fetch(`/tasks/${id}`,{
        method:"DELETE"
    })
    await load()
}

async function update(index){
    editer = dumps[index]._id

    value1.value = dumps[index].date
    value2.value = dumps[index].area

    overlay.style.display = "block"
    popup.style.display = "block"
}