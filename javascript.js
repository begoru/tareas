window.addEventListener("load", () => {
    printTask();
})

//Guardamos en una variable la funcionalidad de convertir el array strinficado a un array.
//Al método getItem le tenemos que pasar una clave para identificar a qué almacen hace referencia.
const getDataFromStorage = ()=>{
    return JSON.parse(localStorage.getItem("tareas")) ?? []
}

const openModalButton = document.getElementById("addButton");

const modal = document.getElementById("modal");

const acceptButton = document.getElementById("acceptButton");

// El array tiene que ser igual al contenido que hay dentro de la carpeta localstorage que como está guardado en formato string con la función getDataFromStorage, le decimos que la devuelva en formato JSON, para ello la función la tenemos que crear previamente y como la hemos metido en una variable, no tiene el hoisting, motivo por el que se crea primero.
//En caso de que no haya nada, como será la 1ºvez, para que no devuelva undefined, que devuelva un array vacío.

let arrayTareas = getDataFromStorage();

// Para actualizar los datos que vayamos incluyendo en el array a lo largo del código.
// Es decir esta función la vamos a incluir dentro de la función añadir, editar(checkeado o no) y eliminar de las tareas.

const setDataFromStorage = ()=>{
    localStorage.setItem("tareas", JSON.stringify(arrayTareas))
}

// Abrir el modal
// El modal se va a poner display inline-flex
const openModal = ()=>{
     console.log("modal")
     modal.style.display = "inline-flex";
};

//Cerrar el modal al hacer click en el botón CANCELAR 
//1. Poner el modal en display none.
const closeModal = ()=>{
    console.log("cancelar")
    modal.style.display = "none"
};


//Habilitar botón ACEPTAR:
//1. El input tiene que tener algún caracter (longitud es > 0 es truely) ? sentencia disabled = false, : sentencia disabled = true
//e.target hace referencia a la propiedad del objeto del cual se lanzó el evento
// e.currentTarget al padre del elemento en ese contexto.
const aceptButtonEnabled =(e)=>{
    console.log("botón aceptar habilitado")
    e.target.value.length 
    ? acceptButton.disabled = false  
    : acceptButton.disabled = true;
    
}

//Pintar el html de la nueva tarea dentro del html (función creada antes que la siguiente porque al estar guardada dentro de una constante pierde el hoisting - alzado)
//1. Capturar el ul para después aplicarle el método innerHtml que 
//2. Crear un array a partir de otro que devuelva el html dinámico de la nueva tarea
const printTask = ()=>{
    const ul = document.getElementById("taskList")
    ul.innerHTML =  arrayTareas.map(({name, completed, id})=>{
        return `<li>
                    <label style="text-decoration: ${completed ? "line-through" : "none"}">
                        <input onchange="toggleTask(${id})" type="checkbox" ${completed ? "checked" : ""}>
                            ${name}
                    </label>
                    <button class="deleteButton" onclick="deleteTask(${id})">Borrar
                    </button>
                </li>`
    } ).join("")
    
}

//Función de Añadir tarea al hacer click en el botón ACEPTAR:
// 1. Añadir esa tarea al arrayTareas que será de tipo objeto con 2 propiedades.
// 2. Limpiar el input.
// 3. Cerrar el modal.
// 4. Invocar la función printTask para pintar la tarea dentro del ul.

const addTask = ()=>{
    console.log("añadir tarea")
    const input = document.getElementById("taskText");
    const task = {
        name: input.value,
        completed : false,
        id: Date.now()
    };
    arrayTareas.unshift(task);
    input.value = "";
    closeModal();
    printTask();
    setDataFromStorage()

};

// Función del toggle:
// Coger la tarea en la que ha habido un marcado o desmarcado e ir al almacén, buscar el objeto por su id y cambiarle su propiedad "completed" por lo contrario.
//Para evitar que 2 tareas con el mismo nombre se vean afectadas, tomamos como referencia su propiedad "id" en vez de su "name".
//Después tiene que volver a pintar todo el html con el array actualizado.


const toggleTask = (id)=>{
    
    const task = arrayTareas.find( tarea => tarea.id == id );
    const taskIndex = arrayTareas.findIndex(tarea => tarea.id == id)
    arrayTareas[taskIndex].completed = task.completed ? false : true;
    

    printTask();
    setDataFromStorage()
};

const deleteTask = (id)=>{
   
    arrayTareas = arrayTareas.filter(tarea => tarea.id !== id )
    printTask()
    setDataFromStorage()
}

//Devolver el li con "No hay tareas" cuando el almacén esté vacío.


