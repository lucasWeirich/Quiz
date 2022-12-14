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
    const request = await fetch(`${API.url}${route}`, {
        method: method,
        headers: API.headers,
        body,
    });

    const response = await request.json();
    validationsRequest(request, response);

    if (response.token !== undefined && request.url.includes('/user_login')) {
        sessionStorage.setItem('token', response.token);
        window.location = 'index.html';
        alertMessage(response.message, '--ok');
        return;
    }

    clearInputs();
    return response;
}

// -----------------------------------------------------------------
// Function validations of request
function validationsRequest(req, res) {
    if (!req.ok) {
        alertMessage(`${res.message}: ${res.error}`, '--error');

        if (req.url.include('/user_login') || req.url.include('/user_add')) return;

        if (req.status === 401) {
            let html = document.querySelector('main');
            html.innerHTML = '';
            sessionStorage.removeItem('token');
            setInterval(() => {
                window.location = 'login.html';
            }, 2000)
        }
        return;
    }
    if (res.message) alertMessage(res.message, '--info');
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