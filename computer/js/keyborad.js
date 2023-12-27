// 단일 키 코드 값 가져오기.
let inputCode = '';
// 타자 속도 측정에 필요한 변수
let startTime = Date.now(); // 시작 시간

// ----------------------- 구 분 선 ----------------------- 
// (초기) 키 눌렀을 때 이벤트
window.addEventListener("keydown", (e) => {
    handleKeyEvents(e, true);
});

// (초기) 키 뗐을 때 이벤트
window.addEventListener("keyup", (e) => {
    handleKeyEvents(e, false);
});

// 키 이벤트를 처리하는 함수 (키 누를때마다 색 바뀌기)
function handleKeyEvents(e, isKeyDown) {
    // console.log(`Key event: key=${e.key}, code=${e.code}, isKeyDown=${isKeyDown}`);
    
    // 일반 키 + 특수 키 (통일)=> e.code 코드 값으로 받기.
    // const code = document.getElementById(e.code);

    inputCode = e.code;
    const codes = document.querySelectorAll(`.${e.code}`);
    
    for (const code of codes) {
        if (code) {
            if (isKeyDown) {
                code.classList.add("changed");
            } else {
                code.classList.remove("changed");
            }
        }
    }
}
// ----------------------- 구 분 선 -----------------------
// shift 키가 눌렸을 때 쌍모음 이벤트
document.addEventListener('keydown', function (event) {
    if (event.key === 'Shift') {
        document.body.classList.add('shift-pressed');
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'Shift') {
        document.body.classList.remove('shift-pressed');
    }
});
// ----------------------- 구 분 선 -----------------------
// 키보드 레이아웃 전환 함수
function toggleKeyboard() {
    const hgKeyboard = document.getElementById('hgkeyboard');
    const egKeyboard = document.getElementById('egkeyboard');
    const toggleButton = document.getElementById('toggleKeyboard');
    
    // "한글 자판"이 보이면 "영어 자판"으로, 그 반대도 마찬가지
    if (hgKeyboard.style.display !== 'none') {
        hgKeyboard.style.display = 'none';
        egKeyboard.style.display = 'block';
        toggleButton.innerText = '한글';
        
    } else {
        hgKeyboard.style.display = 'block';
        egKeyboard.style.display = 'none';
        toggleButton.innerText = '영문자';
    }
}
// ----------------------- 구 분 선 -----------------------
// 추가 부분: 과일 배열 및 현재 인덱스 변수
const word = ["단어","예시1","알잘딱깔센", "킹받네", "꾸안꾸"];
let wordIndex = 0;
const mean = ['해설1',"예시","'알아서 잘 딱 깔끔하고 센스있게'의 줄임말", "'열받네'에 킹을 더해 의미를 강조한 단어'", "'꾸민듯 안꾸민듯'의 줄임말"]
const mean = ["예시","예시","'알아서 잘 딱 깔끔하고 센스있게'의 줄임말", "'열받네'에 킹을 더해 의미를 강조한 단어'", "'꾸민듯 안꾸민듯'의 줄임말"]
let meanIndex = 0;

// 초기화 함수: 텍스트 설정 및 현재 인덱스 초기화
function initializeText() {;
    textToType.innerText = word[wordIndex]
    userInput.value = '';
    meanByText.innerText = mean[meanIndex]
    result.innerText = '정확도 : 0.00%';
    userInput.classList.remove('error');
    startTime = Date.now();
}
// 페이지 로드 시 초기화 호출
window.onload = initializeText;

//  타자 검정
// const originalText = "한글 타자 검정을 시작합니다. 아무내용이나 써보세요"; //정답
const textToType = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const result = document.getElementById('result');
const result2 = document.getElementById('result2');
const enters = document.querySelectorAll('.Enter');
const meanByText = document.getElementById('mean-by-text');


function checkTyping() {
    const userTypedText = userInput.value;  // 유저가 입력하는 값.
    const correctText = word[wordIndex];   // 정답 ex) (문제)알잘딱깔센
    const userTypedChars = userTypedText.split(''); // 사용자 입력을 글자 단위로 분할
    const correctChars = correctText.split(''); // 정답을 글자 단위로 분할
   
    const minLength = Math.min(userTypedChars.length, correctChars.length); // 최소 길이 찾기
    // console.log(minLength);

    // 각 글자를 비교하고 정확도 계산
    let correctCount = 0;
    for (let i = 0; i < minLength; i++) {
        if (userTypedChars[i] === correctChars[i]) {
            correctCount++;
        }
    }
    const accuracy = (correctCount / correctChars.length) * 100; // 정확도 계산

    // 정확도 출력
    if (userTypedText === correctText) {
        result.innerText = '정확도 : 100%';
        // console.log(enters);
        for (const enter of enters) {
            enter.classList.add('correct');
        }
        userInput.classList.remove('error');
        // console.log(event.key);  // undefined.
        // console.log(inputCode);  // 마지막으로 입력 된 값 확인 로그
        if(inputCode === 'Enter') {
            wordIndex = (wordIndex + 1) % word.length; // 정확하게 입력하면 다음 값으로 이동
            meanIndex = (meanIndex + 1) % mean.length;  
            // 타자 속도 측정 및 출력
            const endTime = Date.now();
            const elapsedTime = (endTime - startTime) / (1000*60); // 분 단위로 변환
            const typingSpeed = (correctText.length / 5) / elapsedTime; // 5글자당 단어당 평균 길이로 나누어 타자 속도 계산
            result2.innerText = `타자 속도 : ${(typingSpeed).toFixed(2) * 100} 타`;
        }
    } else if (correctText.startsWith(userTypedText)) {
        result.innerText = `정확도 : ${accuracy.toFixed(2)}%`;
        userInput.classList.remove('error');
    } else {
        result.innerText = `정확도 : ${accuracy.toFixed(2)}%`;
        for (const enter of enters) {
            enter.classList.remove('correct');
        }
        userInput.classList.add('error');
    }
}
// Enter 키 이벤트 처리
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        initializeText(); // 엔터 키 누르면 초기화
        for (const enter of enters) {
            enter.classList.remove('correct');
        }
        // 타자 속도 측정을 위해 다음 문제로 넘어갈 때마다 시작 시간 업데이트
        startTime = Date.now();
    }
});
