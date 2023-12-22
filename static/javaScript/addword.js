const url = new URL(location); // URLSearchParams 객체
const urlParams = url.searchParams; // URLSearchParams.get()
let result = urlParams.get("page"); // 3의 결과

// 한 페이지당 표시할 항목 수
const postPerPage = 5;
// 한 번에 표시할 페이지 번호 수
const numDisplayPage = 5;

// 초기 페이지 로드 시 첫 번째 페이지 표시
updatepaging(Math.ceil((words.length - 1) / postPerPage), 1, 1, 5);

const tableElement = document.querySelector("table");
const totalPages = Math.ceil((words.length) / postPerPage); // 총 페이지 수 계산

for (let i = 0; i <= totalPages; i++) {
  const currentPage = i + 1;
  const startPage = Math.max(1, currentPage - Math.floor(numDisplayPage / 2)); // 표시할 페이지 범위의 시작
  const endPage = Math.min(totalPages, startPage + numDisplayPage - 1); // 표시할 페이지 범위의 끝
  if (result == i + 1) {
    tableElement.innerHTML = `<tr>
<th class="th-number">번호</th>
<th class="th-word">단어 명</th>
<th class="th-meaning">단어 뜻</th>
<th class="th-username">유저명</th>
<th class="th-time">등록일</th>
</tr>`;
    for (let j = i*postPerPage ; j < postPerPage * (i+1); j++ ) {
        if ( j >= words.length) {
            break;
        }
        const trElement = document.createElement("tr");
        const tdElement1 = document.createElement("td");
        const tdElement2 = document.createElement("td");
        const tdElement3 = document.createElement("td");
        const tdElement4 = document.createElement("td");
        const tdElement5 = document.createElement("td");
        trElement.appendChild(tdElement1);
        trElement.appendChild(tdElement2);
        trElement.appendChild(tdElement3);
        trElement.appendChild(tdElement4);
        trElement.appendChild(tdElement5);
        tdElement1.textContent = words[j].number;
        tdElement2.textContent = words[j].word;
        tdElement3.textContent = words[j].meaning;
        tdElement4.textContent = words[j].name;
        const date = new Date(words[j].createdAt);
        tdElement5.textContent = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
        tableElement.appendChild(trElement);
    }

    updatepaging(totalPages, currentPage, parseInt((i)/5)*5+1, parseInt((i)/5)*5+5);
  }
}

// 테이블과 페이지 번호를 관리할 함수
// function showPage(currentPage) {
//   const tableRows = document.querySelectorAll("table tr"); // [tr], [tr], [tr]
//   const pagingDiv = document.getElementById("paging");
//   const totalPages = Math.ceil((words.length - 1) / postPerPage); // 총 페이지 수 계산

//   const startPage = Math.max(1, currentPage - Math.floor(numDisplayPage / 2)); // 표시할 페이지 범위의 시작
//   const endPage = Math.min(totalPages, startPage + numDisplayPage - 1); // 표시할 페이지 범위의 끝

//   console.log(totalPages); // 이게 왜 반올림이 되는가...?

  // 페이지 번호가 유효한지 확인
//   if (currentPage < 1 || currentPage > totalPages) {
//     return;
//   }

  // 모든 행 숨김
  //  tableRows.forEach(row => row.style.display = 'none');

  // 헤더 행을 보이게 설정
  //  tableRows[0].style.display = '';

  // 현재 페이지에 해당하는 행들을 보이게 설정
//   const startIndex = (currentPage - 1) * postPerPage + 1; // th 제외
//   const endIndex = startIndex + postPerPage;
//   for (let i = startIndex; i < endIndex && i < tableRows.length; i++) {
//     tableRows[i].style.display = "";
//   }

//   // 페이지 번호 갱신
//   updatepaging(totalPages, currentPage, startPage, endPage);
// }

// 페이지 번호 갱신 함수
function updatepaging(totalPages, currentPage, startPage, endPage) {
  const pagingDiv = document.getElementById("paging");
  pagingDiv.innerHTML = "";

  // 이전 페이지 버튼
  const prevButton = createPreviousIndexButton("<", currentPage);
  prevButton.classList.add("prev-page");
  pagingDiv.appendChild(prevButton);

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
    if (i <= totalPages) {
      const pageButton = createIndexButton(i, i);
      if (i === currentPage) {
        pageButton.classList.add("current-page");
      }
      pagingDiv.appendChild(pageButton);
    }
  }

  // 다음 페이지 버튼
  const nextButton = createNextIndexButton(">", currentPage);
  nextButton.classList.add("next-page");
  pagingDiv.appendChild(nextButton);
}

function createPageButton(text, currentPage) {
  const pageButton = document.createElement("span");
  pageButton.classList.add("page-item");
  pageButton.textContent = text;

  // 클릭 이벤트 설정
  pageButton.addEventListener("click", () => showPage(currentPage));

  return pageButton;
}

// 이전 버튼 생성 함수
function createPreviousIndexButton(text, currentPage) {
    const pageButton = document.createElement("a");
    if(!parseInt((currentPage-1)/5)*5) {
        pageButton.href = `/word?page=${1}`;
    } else {
        pageButton.href = `/word?page=${parseInt((currentPage-1)/5)*5}`;
    }
    pageButton.classList.add("page-item");
    pageButton.textContent = text;

    return pageButton;
  }

  // 이후 버튼 생성 함수
function createNextIndexButton(text, currentPage) {
    const pageButton = document.createElement("a");
    const totalPages = Math.ceil((words.length) / postPerPage); // 총 페이지 수 계산
    if (parseInt((currentPage-1)/5)*5+6 >= totalPages) {
        pageButton.href = `/word?page=${totalPages}`;
    } else {
        pageButton.href = `/word?page=${parseInt((currentPage-1)/5)*5+6}`;
    }
    pageButton.classList.add("page-item");
    pageButton.textContent = text;

    return pageButton;
  }

// 페이지 번호 버튼 생성 함수
function createIndexButton(text, currentPage) {
  const pageButton = document.createElement("a");
  pageButton.href = `/word?page=${text}`;
  pageButton.classList.add("page-item");
  pageButton.textContent = text;

  return pageButton;
}



const addWordButtonElement = document.querySelector("#addWord");
const resultElement = document.querySelector("#result");
const form = document.forms["addword"];
async function addWord() {
  const res = await axios({
    url: "/word/addword",
    method: "post",
    data: {
      name: form.name.value,
      mean: form.mean.value,
    },
  });
  resultElement.textContent = res.data.msg;
  form.reset();
}
addWordButtonElement.addEventListener("click", addWord);
