/* eslint-disable no-unused-vars */
function topbar_info_clicked(e) {
    let ele = e.parentElement.parentElement.parentElement;
    let container = document.getElementById('container-center');
    if (ele.classList.contains('leftbar-clicked')) {
        ele.classList.remove('leftbar-clicked');
        container.classList.remove('container-center-filter');
    }
    else {
        ele.classList.add('leftbar-clicked');
        container.classList.add('container-center-filter');
    }
}

