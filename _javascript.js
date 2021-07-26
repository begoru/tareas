const addButton= document.getElementById("addButton");

const modal = document.getElementById("modal");

const cancelButton = document.getElementById("cancelButton");
const acceptButton = document.getElementById("acceptButton");
const taskText = document.getElementById("taskText");

const ul = document.getElementById("taskList")

const arrayTareas =[];
/* Evento click en el botón de Añadir*/
addButton.addEventListener ("click", e => modal.style.display= "inline-flex");

/* Evento keyup del input del modal si hay texto o no de cara a habilitar el 
botón de ACEPTAR.
La ? es como poner if, en caso de cumplirse la condición antes del ?, se ejecutará
la sentencia del otro lado del ?; y los : significa else

taskText.addEventListener("keyup", e => taskText.value ? acceptButton.disabled = false : acceptButton.disabled = true)
*/

/* La forma ampliada del evento keyup anterior hubiera sido*/
taskText.addEventListener("keyup", (e)=>{
    if(taskText.value){
        acceptButton.disabled = false;
    }
    else{
        acceptButton.disabled = true;
    }
})

/* Quitar el modal cuando se haga click en el botón de CANCELAR*/
cancelButton.addEventListener("click", e=> modal.style.display="none");

/* Evento click en el botón Aceptar*/
acceptButton.addEventListener("click", ()=>{
    console.log(taskText.value)
    anadirTarea(taskText.value)
    taskText.value="";
    modal.style.display="none";
    

})
/* Añadir una tarea*/

function anadirTarea(nombreTarea){
    const tareaNueva = {
        nombre: nombreTarea,
        completada: false
    }
    arrayTareas.push(tareaNueva)
    ul.innerHTML = arrayTareas.map(tarea => {
        return `<li>
                    <label style="text-decoration:${tarea.completada ? 'line-through': 'none'}">
                        <input type="checkbox" ${tarea.completada ? 'checked' : ''}>
                         ${tarea.nombre}
                    </label>
                </li>`
    }).join('')
}
/* Tachar una tarea cuando se marque en el checkbox*/
ul.addEventListener("click", e => {
    if(e.target.nodeName == "INPUT") {
       if(e.target.checked){
            e.target.parentNode.style.textDecoration = 'line-through';
            const tareaIndex  = arrayTareas.findIndex( tarea => tarea.nombre == e.target.parentNode.textContent.trim() )
            arrayTareas[tareaIndex].completada = true;
        } 
       else if(e.target.checked === false){
        e.target.parentNode.style.textDecoration = 'none';
        const tareaIndexNochecked = arrayTareas.findIndex( tarea => tarea.nombre == e.target.parentNode.textContent.trim() );
        arrayTareas[tareaIndexNochecked].completada = false;
       }
    }
})
//Devolver el li con "No hay tareas" cuando el almacén esté vacío.