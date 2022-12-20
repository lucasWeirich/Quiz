// -----------------------------------------------------------------
// Variables API
const API = {
    url: 'http://localhost:3000/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    }
}

// -----------------------------------------------------------------
// Function all Request
async function allRequest(route, method, body) {
    loader('open');
    const request = await fetch(`${API.url}${route}`, {
        method: method,
        headers: API.headers,
        body,
    });

    const response = await request.json();
    validationsRequest(request, response);

    if (response.token !== undefined && request.url.includes('/user_login')) {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', response.idUser);
        window.location = 'index.html';
        alertMessage(response.message, '--ok');
        return;
    }

    clearInputs();
    loader();
    return response;
}

// -----------------------------------------------------------------
// Function validations of request
function validationsRequest(req, res) {
    if (!req.ok) {
        alertMessage(`${res.message}: ${res.error}`, '--error');

        if (req.status === 401) {
            let html = document.querySelector('main');
            html.innerHTML = '';
            sessionStorage.removeItem('token');
            setInterval(() => {
                window.location = 'login.html';
            }, 2000);
        }
        return;
    }
    if (res.message) alertMessage(res.message, '--info');
}

// -----------------------------------------------------------------
// Get data user
async function getDataUser(id) {
    const user = await allRequest(`user/${id}`, 'get');

    const html_name = document.querySelectorAll('.--name-user');
    html_name.forEach(i => {
        i.innerHTML = user.name;
    });
}

// -----------------------------------------------------------------
// Function clear inputs 
function clearInputs() {
    const inputs = document.querySelectorAll('.reset');
    inputs.forEach(i => {
        i.value = '';
    });
}

// -----------------------------------------------------------------
// Function logoff user
function logoffUser() {
    sessionStorage.clear('token', '');
    window.location = 'login.html';
}

// -----------------------------------------------------------------
// Function loader
function loader(func) {
    let loader = document.getElementById('loader-wrapper');
    switch (func) {
        case 'open':
            loader.classList.add('--active');
            break;

        default:
            loader.classList.remove('--active');
            break;
    }
}

// -----------------------------------------------------------------
// Function open popups
function openPopups(type) {
    const popup = document.querySelector(`.__popup.--${type}`);
    popup.classList.add('--active');
    popup.addEventListener('click', function (e) {
        if (e.target === popup) popup.classList.remove('--active');
    });
}

// -----------------------------------------------------------------
// Function add params of URL
function addParamsURL(nameParam, valueParam) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(nameParam, valueParam);
}

// -----------------------------------------------------------------
// Function alert messages
function alertMessage(txt, status) {
    let msgAlert = document.getElementById('alertMessage');

    msgAlert.innerText = txt;
    msgAlert.classList.add(status);
    msgAlert.classList.add('--active');

    setTimeout(() => {
        msgAlert.classList.remove(status);
        msgAlert.classList.remove('--active');
    }, 4000);
}