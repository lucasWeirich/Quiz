// -----------------------------------------------------------------
// Variables Global
const forms = {
    singin: {
        form: document.querySelector('#singin'),
        username: document.querySelector('#singin [name="username"]'),
        password: document.querySelector('#singin [name="password"]'),
    },
    new: {
        form: document.querySelector('#new'),
        name: document.querySelector('#new [name="name"]'),
        password: document.querySelector('#new [name="password"]'),
    }
}

// -----------------------------------------------------------------
// Initialized function get data user
getDataUser(sessionStorage.user);

// -----------------------------------------------------------------
// Form create room
forms.new.form.addEventListener('submit', function (e) {
    e.preventDefault();

    let body = {
        idAdm: sessionStorage.user,
        name: forms.new.name.value,
        password: forms.new.password.value,
        status: document.querySelector('#new [name="status"]:checked').value
    }

    if (!(validationsNewRoom(body))) return

    allRequest('room', 'post', JSON.stringify(body));
});

// -----------------------------------------------------------------
// Function validations for add new user
function validationsNewRoom(body) {
    // ------------------------------
    // validate if null
    if (body.name === '' || body.password === '' || body.status === '') {
        alertMessage('Preencha todos os campos!', '--info');
        return false;
    }
    // ------------------------------
    // validate business rules
    if (body.name.length < 5 || body.name.length > 50) {
        alertMessage('Nome da sala deve ter no mínimo 5 e no máximo 50 caracteres!', '--info');
        return false;
    }
    if (body.password.length < 10 || body.name.length > 30) {
        alertMessage('Senha deve ter no mínimo 10 e no máximo 30 caracteres!', '--info');
        return false;
    }
    return true;
}

// -----------------------------------------------------------------
// Function fill html with all rooms
async function fillAllRooms() {
    const html = document.querySelector('.__all_rooms');
    html.innerHTML = '';

    const rooms = await allRequest('room', 'get');

    rooms.forEach(room => {
        html.innerHTML += `
            <div class="__room">
                <span class="--name">${room.name}</span>
                <div class="--options">
                    <a onclick="() => {console.log(${room.id})}" class="--status --${room.status === 1 ? 'open' : 'close'}"></a>
                    <a href="room.html?idRoom=${room.id}" class="--edit"><img src="assets/img/icons/edit.svg" alt="Edit"></a>
                    <a onclick="deleteRoom(${room.id})" class="--delete"><img src="assets/img/icons/delete.svg" alt="Delete"></a>
                </div><!-- --options -->
            </div>
        `;
    });
}
fillAllRooms();

// -----------------------------------------------------------------
// Function delete room
function deleteRoom(id) {
    allRequest(`room/${id}`, 'delete');
}