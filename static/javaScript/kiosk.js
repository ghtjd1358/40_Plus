const totalPages = 14;
const pages = document.querySelectorAll('.page')
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


// 착한세트
const setMenu = [
    { name: "착한한우세트", price: '7,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한AZ버거세트", price: '7,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한doublex2버거세트", price: '7,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한핫크리스피세트", price: '7,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한리아미라클버거", price: '7,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" }
];

// 추천메뉴
const recommend = [
    { name: "착한한우세트", price: '8,900', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한AZ버거세트", price: '8,700', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한doublex2버거세트", price: '9,500', image: "https://v1.kiosapp.kr/img/101.09780be2.jpg" },
    { name: "착한크리스피버거세트", price: '7,900', image: "https://v1.kiosapp.kr/img/104.ff604441.jpg" },
    { name: "착한리아미라클버거세트", price: '8,100', image: "https://v1.kiosapp.kr/img/308.4809b6f6.jpg" }
];

// 사이드
const side = [
    { name: "치즈인더에그", price: '3,000', image: "https://v1.kiosapp.kr/img/1015.cb95b7e1.jpg" },
    { name: "포테이토", price: '1,500', image: "https://v1.kiosapp.kr/img/1001.6cf745db.jpg" },
    { name: "포테이토(L)", price: '1,900', image: "https://v1.kiosapp.kr/img/1001.6cf745db.jpg" },
    { name: "양념감자", price: '2,000', image: "https://v1.kiosapp.kr/img/1002.d6327997.jpg" },
    { name: "치즈스틱", price: '2,000', image: "https://v1.kiosapp.kr/img/1003.e6f82a2a.jpg" },
    { name: "롱치즈스틱", price: '1,800', image: "https://v1.kiosapp.kr/img/1008.d97316a6.jpg" },
];

// 음료
const drink = [
    { name: "오렌지쥬스(PET)", price: '2,500', image: "https://v1.kiosapp.kr/img/2012.0fd49c52.jpg" },
    { name: "레몬에이드", price: '2,500', image: "https://v1.kiosapp.kr/img/2013.8c2f5993.jpg" },
    { name: "콜라(L)", price: '1,900', image: "https://v1.kiosapp.kr/img/2003.082ff860.jpg" },
    { name: "사이다", price: '2,000', image: "https://v1.kiosapp.kr/img/2002.4b96fccc.jpg" },
    { name: "콜라", price: '2,000', image: "https://v1.kiosapp.kr/img/2001.082ff860.jpg" }
];

// 세트디저트
const setSide = [
    { name: "양념감자", price: '500', image: "https://v1.kiosapp.kr/img/1002.d6327997.jpg" },
    { name: "치즈스틱", price: '500', image: "https://v1.kiosapp.kr/img/1003.e6f82a2a.jpg" },
    { name: "오징어링", price: '700', image: "https://v1.kiosapp.kr/img/1001.6cf745db.jpg" },
    { name: "쉨쉨치킨", price: '1,000', image: "https://v1.kiosapp.kr/img/1005.8d795c26.jpg" },
    { name: "포테이토(L)", price: '400', image: "https://v1.kiosapp.kr/img/1001.6cf745db.jpg" },
    { name: "치즈인더에그", price: '1,000', image: "https://v1.kiosapp.kr/img/1015.cb95b7e1.jpg" },
    { name: "콘샐러드", price: '200', image: "https://v1.kiosapp.kr/img/1007.d51198db.jpg" },
    { name: "롱치즈스틱", price: '300', image: "https://v1.kiosapp.kr/img/1008.d97316a6.jpg" },
    { name: "아이스크림", price: '0', image: "https://v1.kiosapp.kr/img/1009.ddee81f3.jpg" },
    { name: "토네이도-초코", price: '300', image: "https://v1.kiosapp.kr/img/1010.8f5a36bf.jpg" },
    { name: "토네이도-딸기", price: '300', image: "https://v1.kiosapp.kr/img/1011.5b8cf999.jpg" },
    { name: "토네이도-녹차", price: '300', image: "https://v1.kiosapp.kr/img/1012.b328cfbb.jpg" }
];

// 세트드링크
const setDrink = [
    { name: "사이다", price: '0', image: "https://v1.kiosapp.kr/img/2002.4b96fccc.jpg" },
    { name: "콜라(L)", price: '200', image: "https://v1.kiosapp.kr/img/2003.082ff860.jpg" },
    { name: "사이다(L)", price: '0', image: "https://v1.kiosapp.kr/img/2004.4b96fccc.jpg" },
    { name: "아메리카노", price: '300', image: "https://v1.kiosapp.kr/img/2005.c734db08.jpg" },
    { name: "아이스아메리카노", price: '300', image: "https://v1.kiosapp.kr/img/2006.adfe025a.jpg" },
    { name: "아이스아메리카노(라지)", price: '800', image: "https://v1.kiosapp.kr/img/2007.d2bf8072.jpg" },
    { name: "카페라뗴", price: '700', image: "https://v1.kiosapp.kr/img/2005.c734db08.jpg" },
    { name: "아이스카페라뗴", price: '700', image: "https://v1.kiosapp.kr/img/2009.662fe7f5.jpg" },
    { name: "우유", price: '0', image: "https://v1.kiosapp.kr/img/2010.b30f6add.jpg" },
    { name: "오렌지쥬스(PET)", price: '800', image: "https://v1.kiosapp.kr/img/2012.0fd49c52.jpg" },
    { name: "레몬에이드", price: '800', image: "https://v1.kiosapp.kr/img/2013.8c2f5993.jpg" }
];

// create 카드
function createProduct(product, menuSelectId) {
    const productDiv = document.createElement("div");
    productDiv.className = "selectable";
    productDiv.onclick = function () { checkAnswer(2); };

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
    setTimeout(timeTable, 1500);
    goToPage12()
}

function goToPage12() {
    setTimeout(function () {
        currentPage = 13;
        showPage();
    }, 3000);
}



// 결제페이지(마지막)
function randomScore() {
    let randomNumber = Math.floor(Math.random() * 1000 + 1);
    const orderScore = document.querySelector('.account > h2');
    orderScore.textContent = randomNumber;
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
    updateScoreBoard();
}

// 점수판
function subsScore() {
    score >= subScore ? score -= subScore : score = 0;
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


// hover
document.addEventListener('mouseover', hoverTag);
document.addEventListener('mouseout', hoverTag);

function hoverTag(e) {
    let currentElement = e.target;

    if (currentElement.tagName === 'BUTTON') {
        currentElement.classList.toggle('shadow-drop-2-center', e.type === 'mouseover');
    }
}