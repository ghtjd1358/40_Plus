const totalPages = 10;
const subScore = 5; 
let score = 100; 


const pages =  document.querySelectorAll('.page')
        let currentPage = 1;
        let selectedDivs = [];

        showPage(currentPage);

        function showPage(pageNumber) {
            pages.forEach(page => {
                page.style.display = 'none';
            });

            const currentPage = document.getElementById(`page${pageNumber}`);
            if (currentPage) {
                currentPage.style.display = 'block';
            }
            progressBar();
        }

        // next Btn
        function nextPage() {
            currentPage++;
            showPage(currentPage);
            resetSelection();
        }

        // prev button
        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                resetSelection();
            }
        }

        // 초기화 버튼
        function firstPage() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
            currentPage = 1;
            showPage(currentPage);
            score = 100;
            resetSelection();
}
        

        // 진행률
        function progressBar() {
            const progressBar = document.getElementById('progressbar');
            const progress = (currentPage - 1) / (totalPages - 1) * 100 + '%';
            progressBar.style.width = progress;
            const mathProgress = Math.floor(parseFloat(progress))
            progressBar.textContent = `진행 상황: ${mathProgress}%`;
        }

        function checkAnswer(divNumber) {
    if (divNumber % 2 !== 0 && selectedDivs.indexOf(divNumber) === -1) {
        selectedDivs.push(divNumber);
        if (selectedDivs.length === 1) {
            nextPage();
        }
    } else {
        subsScore(); 
        showModal();
    }
}

function resetSelection() {
            selectedDivs = [];
        }

function subsScore() {
    if (score >= subScore) {
        score -= subScore;
    } else {
        score = 0;
    }
    console.log('현재 점수:', score);
}

        

        function showModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'flex';
        }

        function hideModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }

        window.prevPage = prevPage;
        window.firstPage = firstPage;
        window.checkAnswer = checkAnswer;
        window.showModal = showModal;
        window.hideModal = hideModal;


        // page3 menu-selector
    const menuHeaders = document.querySelectorAll('.menu-header > div');
    const menuSelects = document.querySelectorAll('.menu-select');

// menuHeaders.forEach((menuHeader, i) => {
//     menuHeader.addEventListener('click', () => {
//         menuSelects.forEach((menuSelect, j) => {
//             menuSelect.classList.remove('active');
//         });
//         menuSelects[i].classList.add('active');
//     });
// });

menuHeaders.forEach((menuHeader, i) => {
    menuHeader.addEventListener('click', () => {
        menuSelects.forEach((menuSelect, j) => menuSelect.classList.toggle('active', i === j));
    });
});

// let products = [
//                     { id: 0, price: 7000, title: '햄버억' },
//                     { id: 1, price: 5000, title: '감자' },
//                     { id: 2, price: 6000, title: '콜라아' },//                 ];

//         function productsDiv(product) {
//             let div = document.createElement('div');
//             div.className = 'selectable';
//             div.innerHTML = `
//                 <img src="https://via.placeholder.com/600" class="w-100">
//                 <h2>${product.title}</h2>
//                 <h3>가격 : ${product.price}</h3>`;
//             return div;
//         }

//         products.forEach(product => menu-select-list.appendChild(productsDiv(product)));


// let startTime;
// let endTime;

// function startTimer() {
//     startTime = new Date();
// }

// function endTimer() {
//     endTime = new Date();
//     const elapsedTime = (endTime - startTime) / 1000;
//     console.log(`페이지 전환에 소요된 시간: ${elapsedTime}`);
// }

// function showPage(pageNumber) {
//     startTimer();

//     pages.forEach(page => {
//         page.style.display = 'none';
//     });

//     const currentPage = document.getElementById(`page${pageNumber}`);
//     if (currentPage) {
//         currentPage.style.display = 'block';
//     }
//     progressBar();
// }

// function nextPage() {
//     endTimer(); //
//     currentPage++;
//     showPage(currentPage);
//     resetSelection();
// }


// let int = setTimeout(page10, 5000);

// function page10() {
//     const page10Element = document.querySelector('#page10');
// }