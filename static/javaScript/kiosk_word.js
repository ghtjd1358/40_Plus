//button
function wordButton() {
    const buttons = document.querySelectorAll('.word-box > button');
    buttons.forEach((button, i) => {
        button.addEventListener('click', () => showPage(i + 1));
    });
}

function initialize() {
    showPage(0);
}

// page
function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => page.style.display = 'none');
    pages[pageIndex].style.display = 'block';
}


// prev
function prevPage() {
    showPage(0);;
}


wordButton();

// 초기화
initialize();
