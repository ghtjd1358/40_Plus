const totalPages = 14;
const pages =  document.querySelectorAll('.page')
let currentPage = 1;

const subScore = 5; 
let score = 105; 

let selectedDivs = [];



// 페이지
showPage(currentPage);
      console.log('Current Page:', currentPage);

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
            endTimer();
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
            showPage();
            score = 105;
            subsScore();
            // removeChecked();
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




//정답 체크 및 초기화
    function checkAnswer(divNumber) {
    if (divNumber % 2 == 1 && selectedDivs.indexOf(divNumber) === -1) {
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



// 10 page
const paymentsBoxs = document.querySelectorAll('.payments1');
// console.log(paymentsBoxs)

// paymentsBoxs.forEach((paymentsBox,i) => {
//     paymentsBox.addEventListener('click', () => {
//         paymentsBoxs.forEach((paymentsBoxj) => {
//             paymentsBoxj.classList.remove('checked');
//         })
//         paymentsBoxs[i].classList.add('checked')
//     })
// })

paymentsBoxs.forEach(paymentsBox => {
     paymentsBox.addEventListener('click', () => {
            paymentsBox.classList.add('checked');
    })   
})

function removeChecked() {
    paymentsBoxs.forEach(paymentsBox => {
        paymentsBox.classList.remove('checked')
    })
}




// 12 -> 13 page
const paymentsTable = document.querySelector('.payments-modal3-table > p');

function timeTable() {
    paymentsTable.textContent = '결제 진행 중입니다. 잠시만 기다려주세요';
}

function handleClick() {
    nextPage();
    setTimeout(timeTable, 3000);
    goToPage12()
}
    
function goToPage12() {
    setTimeout(function() { 
        currentPage = 13;
        showPage();
    }, 5000);  
}



// 결제페이지(마지막)
function randomScore() {
    let randomNumber = Math.floor(Math.random() * 1000 + 1);
    const orderScore = document.querySelector('.account > h2');
    orderScore.textContent = randomNumber;
    // console.log(randomNumber);
} 

// 타이머

let startTime;
let endTime;
let elapsedTime;

function startTimer() {
    startTime = new Date();
    nextPage();
}

function endTimer() {
    endTime = new Date();
    elapsedTime = Number(Math.floor((endTime - startTime) / 1000));
    // console.log(`타입 : `,typeof elapsedTime)
    // console.log(`시간: ${elapsedTime}`);
    updateScoreBoard();
}

// 점수판
function subsScore() {
    score >= subScore ? score -= subScore : score = 0;
    // console.log('현재 점수:', score);
    updateScoreBoard();
}

const scoreboardBox = document.querySelector('.scoreboard-box');

function updateScoreBoard() {
    const scoreText = score > 50 ? `매장에서도 주문 가능합니다.` : `<span>${score}</span>점으로는 아무 것도 할 수 없습니다.`;
    
    scoreboardBox.innerHTML = `
        <h3>총 점수 : <span>${score}</span>점</h3>
        <h3>총 평가 : ${scoreText}</h3>
        <h3>총 소요된 : ${elapsedTime}초 입니다.</h3>
    `;
}


subsScore();




// animation
// document.addEventListener('click', hoverTag);
// document.addEventListener('mouseout', hoverTag);

// function hoverTag(e) {
//     let currentElement = e.target;

//     if (currentElement.tagName === 'BUTTON') {
//         currentElement.classList.toggle('shadow-drop-2-center', e.type === 'mouseover');
//     } else if (currentElement.tagName === 'DIV') {
//         currentElement.classList.toggle('shadow-drop-2-center', e.type === 'mouseover');
//     }
// }




