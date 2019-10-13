/* eslint-disable no-unused-vars */
function select(ele) {
    let p = ele.parentElement;
    if (p.firstElementChild.className == 'login-tab-select') {
        p.lastElementChild.className = 'login-tab-select';
        p.firstElementChild.className = '';
        document.getElementById('login-login').hidden = true;
        document.getElementById('login-signup').hidden = false;
    }
    else {
        p.firstElementChild.className = 'login-tab-select';
        p.lastElementChild.className = '';
        document.getElementById('login-signup').hidden = true;
        document.getElementById('login-login').hidden = false;
    }
    return 0;
}

