const url = new URL(location); // URLSearchParams 객체
const urlParams = url.searchParams; // URLSearchParams.get()
let result = urlParams.get('page');// 3의 결과


 

// 한 페이지당 표시할 항목 수
 const postPerPage = 1;
 // 한 번에 표시할 페이지 번호 수
 const numDisplayPage = 5;

 // 테이블과 페이지 번호를 관리할 함수
 function showPage(currentPage) {
     const tableRows = document.querySelectorAll('table tr');    // [tr], [tr], [tr]
     const pagingDiv = document.getElementById('paging');
     const totalPages = Math.ceil((words.length - 1) / postPerPage); // 총 페이지 수 계산
     console.log(totalPages);    // 이게 왜 반올림이 되는가...?

     for (let i = 1; i <= totalPages; i++) {
        if (result == i) {
            const trElement = document.createElement('tr');
            const tdElement1 = document.createElement('td');
            const tdElement2 = document.createElement('td');
            const tdElement3 = document.createElement('td');
            const tdElement4 = document.createElement('td');
            const tdElement5 = document.createElement('td');
            trElement.appendChild(tdElement1);
            trElement.appendChild(tdElement2);
            trElement.appendChild(tdElement3);
            trElement.appendChild(tdElement4);
            trElement.appendChild(tdElement5);
            tdElement1.textContent = words[i].number;
            tdElement2.textContent = words[i].word;
            tdElement3.textContent = words[i].meaning;
            tdElement4.textContent = words[i].name;
            tdElement5.textContent = words[i].createAt;
        }
    }

     const startPage = Math.max(1, currentPage - Math.floor(numDisplayPage / 2)); // 표시할 페이지 범위의 시작
     const endPage = Math.min(totalPages, startPage + numDisplayPage - 1); // 표시할 페이지 범위의 끝

     // 페이지 번호가 유효한지 확인
     if (currentPage < 1 || currentPage > totalPages) {
         return;
     }

     // 모든 행 숨김
    //  tableRows.forEach(row => row.style.display = 'none');

     // 헤더 행을 보이게 설정
    //  tableRows[0].style.display = '';

     // 현재 페이지에 해당하는 행들을 보이게 설정
     const startIndex = (currentPage - 1) * postPerPage + 1;     // th 제외
     const endIndex = startIndex + postPerPage;                 
     for (let i = startIndex; i < endIndex && i < tableRows.length; i++) {
         tableRows[i].style.display = '';
     }

     // 페이지 번호 갱신
     updatepaging(totalPages, currentPage, startPage, endPage);
 }

 // 페이지 번호 갱신 함수
 function updatepaging(totalPages, currentPage, startPage, endPage) {
     const pagingDiv = document.getElementById('paging');
     pagingDiv.innerHTML = '';

     // 이전 페이지 버튼
     const prevButton = createPageButton('<', currentPage - 1);
     prevButton.classList.add('prev-page');
     pagingDiv.appendChild(prevButton);

     // 페이지 번호 버튼
     for (let i = startPage; i <= endPage; i++) {
         if (i <= totalPages) {
         const pageButton = createIndexButton(i, i);
         if (i === currentPage) {
             pageButton.classList.add('current-page');
         }
         pagingDiv.appendChild(pageButton);
     }
     }

     // 다음 페이지 버튼
     const nextButton = createPageButton('>', currentPage + 1);
     nextButton.classList.add('next-page');
     pagingDiv.appendChild(nextButton);
 }

 function createPageButton(text, currentPage) {
    const pageButton = document.createElement('span');
    pageButton.classList.add('page-item');
    pageButton.textContent = text;

    // 클릭 이벤트 설정
    pageButton.addEventListener('click', () => showPage(currentPage));

    return pageButton;
}

 // 페이지 번호 버튼 생성 함수
 function createIndexButton(text, currentPage) {
     const pageButton = document.createElement('a');
     pageButton.href = `/word/addword?page=${text}`;
     pageButton.classList.add('page-item');
     pageButton.textContent = text;

     // 클릭 이벤트 설정
     pageButton.addEventListener('click', () => showPage(currentPage));

     return pageButton;
 }

 // 초기 페이지 로드 시 첫 번째 페이지 표시
 showPage(1);

 const addWordButtonElement = document.querySelector('#addWord');
    const resultElement = document.querySelector('#result');
    const form = document.forms['addword'];
    async function addWord() {
        const res = await axios({
            url: '/word/addword',
            method: 'post',
            data: {
                name: form.name.value,
                mean: form.mean.value
            }
        })
        resultElement.textContent = res.data.msg;
        form.reset();
        
    }
    addWordButtonElement.addEventListener('click', addWord);