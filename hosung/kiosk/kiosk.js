const totalPages = 12;
const pages =  document.querySelectorAll('.page')
let currentPage = 1;

const subScore = 5; 
let score = 105; 

let selectedDivs = [];



// 페이지
        showPage(currentPage);

        function showPage() {
            pages.forEach(page => {
                page.style.display = 'none';
            });

            const currentPages = document.getElementById(`page${currentPage}`);
            if (currentPages) {
                currentPages.style.display = 'block';
            }
            progressBar();
        }

        // 다음 버튼
        function nextPage() {
            currentPage++;
            showPage(currentPage);
            randomScore(); 
            resetSelection();
        }

        // 이전 버튼
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
            score = 105;
            subsScore();
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

// 초기화
function resetSelection() {
            selectedDivs = [];
        }


// 모달
        function showModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'flex';
        }

        function hideModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }

        // page3 menu-selector
    const menuHeaders = document.querySelectorAll('.menu-header > div');
    const menuSelects = document.querySelectorAll('.menu-select');

menuHeaders.forEach((menuHeader, i) => {
    menuHeader.addEventListener('click', () => {
        menuSelects.forEach((menuSelect, j) => menuSelect.classList.toggle('active', i === j));
    });
});




// create 카드
function createProduct(product, menuSelectId) {
    const productDiv = document.createElement("div");
    productDiv.className = "selectable";
    productDiv.onclick = function() { checkAnswer(2); };

    const img = document.createElement("img");
    img.src = product.image;

    const name = document.createElement("h2");
    name.textContent = product.name;

    const price = document.createElement("h3");
    price.textContent = product.price;

    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(price);

    const menuSelect = document.getElementById(menuSelectId);
    menuSelect.appendChild(productDiv);
}

setMenu.forEach(product => createProduct(product, 'set-menu'));

recommend.forEach(product => createProduct(product, 'recommend'));
side.forEach(product => createProduct(product, 'side'));
drink.forEach(product => createProduct(product, 'drink'));

setSide.forEach(product => createProduct(product, 'setSide'));
setSide.forEach(product => createProduct(product, 'setSide1'));

setDrink.forEach(product => createProduct(product, 'setDrink'));
setDrink.forEach(product => createProduct(product, 'setDrink1'));



// 타이머
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



// let int = setTimeout(page10, 5000);
// function page10() {
//     const page10Element = document.querySelector('#page10');
// }




// 결제페이지(마지막)
function randomScore() {
    let randomNumber = Math.floor(Math.random() * 1000 + 1);
    const orderScore = document.querySelector('.account > h2');
    orderScore.textContent = randomNumber;
    console.log(randomNumber);
} 

// 점수판
function subsScore() {
    score >= subScore ? score -= subScore : score = 0;
    console.log('현재 점수:', score);
    UpdateScoreBoard();  
}

const scoreboardBox = document.querySelector('.scoreboard-box');

function UpdateScoreBoard() {  // 함수 이름 수정
    const scoreText = score > 50 ? `매장에서도 주문 가능합니다.` : `<span>${score}</span>점으로는 아무 것도 할 수 없습니다.`;

    scoreboardBox.innerHTML = `
        <h3>총 점수 : <span>${score}</span>점</h3>
        <h3>총 평가 : ${scoreText}</h3>
    `;
}

subsScore()
