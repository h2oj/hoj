function topbar_info_clicked(ele) {
    if (ele.classList.contains('topbar-info-clicked')) {
        ele.classList.remove('topbar-info-clicked');
    }
    else {
        ele.classList.add('topbar-info-clicked');
    }
}

