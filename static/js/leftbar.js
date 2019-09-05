function topbar_info_clicked(e) {
    let ele = e.parentElement.parentElement.parentElement;
    if (ele.classList.contains('leftbar-clicked')) {
        ele.classList.remove('leftbar-clicked');
    }
    else {
        ele.classList.add('leftbar-clicked');
    }
}

