let actividades = [
    {
        id: 16,
        nombre: 'Hacer mercado',
        check: false,
    },
    {
        id: 60,
        nombre: 'Estudiar para la prueba',
        check: false,
    },
    {
        id: 24,
        nombre: 'Sacar a pasear a Tobby',
        check: false,
    },
];

const addForm = document.getElementById("addForm");

addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleAdd();
});

const list_container = document.getElementById('tarea_list');

function handleRenderData() {
    list_container.innerHTML = '';

    actividades.forEach((tarea) => list_container.innerHTML += `
        <div>
            <p>${tarea.id}</p>
            <label for="tarea_list${tarea.id}">${tarea.nombre}</label>
            <input type="checkbox" name="${tarea.id}" id="tarea_list${tarea.id}" onchange="handleCheck(event)" ${tarea.check ? 'checked' : ''}>
            <button id="${tarea.id}" onclick="handleDelete(event)">X</button>
        </div>
        <hr>`

        
    );
}

handleRenderData();

function handleCheck(event) {
    const id = Number(event.target.name);
    const isChecked = event.target.checked;

    actividades = actividades.map((tarea) => tarea.id === id ? { ...tarea, check: isChecked } : tarea);

    handleUpdateCount();
}

function handleAdd() {
    const value = document.getElementById('add').value.trim();

    if (value) {
        const newId = Math.max(...actividades.map(tarea => tarea.id), 0) + 1;
        actividades.push({ id: newId, nombre: value, check: false });
        document.getElementById('add').value = '';
        handleRenderData();
        handleUpdateCount();
    }
}

function handleDelete(event) {
    const id = Number(event.target.id);
    actividades = actividades.filter((tarea) => tarea.id !== id);
    handleRenderData();
    handleUpdateCount();
}

function handleUpdateCount() {
    const total = actividades.length;
    const realizadas = actividades.reduce((count, tarea) => tarea.check ? count + 1 : count, 0);

    document.getElementById('total').textContent = total;
    document.getElementById('realizadas').textContent = realizadas;
}

handleUpdateCount();