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
        username: document.querySelector('#new [name="username"]'),
        password: document.querySelector('#new [name="password"]'),
    }
}

// -----------------------------------------------------------------
// screens of login
const screensLogin = [
    {
        html: document.querySelector('.__display .__singin'),
        status: true,
    },
    {
        html: document.querySelector('.__display .__new'),
        status: false,
    },
];

// -----------------------------------------------------------------
// Function change screem for sing in or new user
function changeScreen() {
    screensLogin.forEach(screen => {
        screen.html.classList.remove('--active');

        if (screen.status === true) {
            screen.html.classList.add('--active');
        }
    });
}

let updateScreen = document.querySelector('.--updateScreen');
updateScreen.addEventListener('click', function () {
    screensLogin.forEach(screen => {
        if (screen.status === true) return screen.status = false;
        if (screen.status === false) return screen.status = true;
    });
    changeScreen();
});

// -----------------------------------------------------------------
// Sing in 
forms.singin.form.addEventListener('submit', function (e) {
    e.preventDefault();

    let body = {
        username: forms.singin.username.value,
        password: forms.singin.password.value,
    }

    allRequest('user_login', 'post', JSON.stringify(body));
});

// -----------------------------------------------------------------
// New user 
forms.new.form.addEventListener('submit', function (e) {
    e.preventDefault();

    let body = {
        name: forms.new.name.value,
        username: forms.new.username.value,
        password: forms.new.password.value,
    }

    if (!(validationsNewUser(body))) return

    allRequest('user_add', 'post', JSON.stringify(body));
});

// -----------------------------------------------------------------
// Function validations for add new user
function validationsNewUser(body) {
    // ------------------------------
    // validate if null
    if (body.name === '' || body.username === '' || body.password === '') {
        alertMessage('Preencha todos os campos!', '--info');
        return false;
    }
    if (body.name === '' || body.username === '' || body.password === '') {
        alertMessage('Preencha todos os campos!', '--info');
        return false;
    }
    // ------------------------------
    // validate business rules
    if (body.name.length < 5 || body.name.length > 50) {
        alertMessage('Nome deve ter no mínimo 5 e no máximo 50 caracteres!', '--info');
        return false;
    }
    if (body.username.length < 5 || body.username.length > 20) {
        alertMessage('Username deve ter no mínimo 5 e no máximo 20 caracteres!', '--info');
        return false;
    }
    if (body.password.length < 10 || body.name.length > 30) {
        alertMessage('Senha deve ter no mínimo 10 e no máximo 30 caracteres!', '--info');
        return false;
    }
    return true;
}