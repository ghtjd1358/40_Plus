// 한 페이지당 표시할 항목 수
const postPerPage = 10;

// 한 번에 표시할 페이지 번호 수
const numDisplayPage = 5;

// 테이블과 페이지 번호를 관리할 함수
function showPage(currentPage) {
  const tableRows = document.querySelectorAll("table tr"); // [tr], [tr], [tr]
  const pagingDiv = document.getElementById("paging");
  const totalPages = Math.ceil((tableRows.length - 1) / postPerPage); // 총 페이지 수 계산
  const startPage = Math.max(1, currentPage - Math.floor(numDisplayPage / 2)); // 표시할 페이지 범위의 시작
  const endPage = Math.min(totalPages, startPage + numDisplayPage - 1); // 표시할 페이지 범위의 끝

  // 페이지 번호가 유효한지 확인
  if (currentPage < 1 || currentPage > totalPages) {
    return;
  }

  // 모든 행 숨김
  tableRows.forEach((row) => (row.style.display = "none"));

  // 헤더 행을 보이게 설정
  tableRows[0].style.display = "";

  // 현재 페이지에 해당하는 행들을 보이게 설정
  const startIndex = (currentPage - 1) * postPerPage + 1; // th 제외
  const endIndex = startIndex + postPerPage;
  for (let i = startIndex; i < endIndex && i < tableRows.length; i++) {
    tableRows[i].style.display = "";
  }

  // 페이지 번호 갱신
  updatepaging(totalPages, currentPage, startPage, endPage);
}

// 페이지 번호 갱신 함수
function updatepaging(totalPages, currentPage, startPage, endPage) {
  const pagingDiv = document.getElementById("paging");
  pagingDiv.innerHTML = "";

  // 이전 페이지 버튼
  const prevButton = createPageButton("<", currentPage - 1);
  prevButton.classList.add("prev-page");
  pagingDiv.appendChild(prevButton);

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
    if (i <= totalPages) {
      const pageButton = createPageButton(i, i);
      if (i === currentPage) {
        pageButton.classList.add("current-page");
      }
      pagingDiv.appendChild(pageButton);
    }
  }

  // 다음 페이지 버튼
  const nextButton = createPageButton(">", currentPage + 1);
  nextButton.classList.add("next-page");
  pagingDiv.appendChild(nextButton);
}

// 페이지 번호 버튼 생성 함수
function createPageButton(text, currentPage) {
  const pageButton = document.createElement("span");
  pageButton.classList.add("page-item");
  pageButton.textContent = text;

  // 클릭 이벤트 설정
  pageButton.addEventListener("click", () => showPage(currentPage));

  return pageButton;
}

// 커뮤니티 게시판 서치 (찾는 타입 + 문자열)
function searchCommunity() {
  const selectValue = document.getElementById("search-type").value;
  const str = document.getElementById("search-input").value;

  axios({
    method: "post",
    url: "/searchCommunity",
    data: {
      selectValue: selectValue,
      str: str,
    },
  }).then((result) => {
    console.log("searchCommunity 전송 성공");
  });
}

// 초기 페이지 로드 시 첫 번째 페이지 표시
showPage(1);
