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



// 초기 페이지 로드 시 첫 번째 페이지 표시
showPage(1);


function detailCommunityPage(postNumber) {
  axios({
    method: "post",
    url: "/detailCommunityPage",
    data: { number: parseInt(postNumber) }, // 객체 형태로 전달
  }).then((result) => {
    location.href =
      "/readCommunity?number=" + JSON.stringify(result.data.number);
  });
}

// 글쓰기 페이지 이동
function writeCommunity() {
  if (! pageUserid) {
    return swal("로그인이 필요합니다.", "", "error").then(function () {
      location.href = "/login";
    });
  }

  window.location.href = "/writeCommunity";
}

async function logout(event) {
  event.preventDefault();
  const res = await axios({
    method: "post",
    url: "/logout",
  });
  swal(
    "로그아웃이 완료되었습니다!",
    "게시글 작성을 위해 로그인해주세요!",
    "success"
  ).then(function () {
    location.href = "/community";
  });
}

// 글 조회 시 세부 페이지 이동
function {
  axios({
    method: "post",
    url: "/detailCommunityPage",
    data: { number: parseInt(postNumber) }, // 객체 형태로 전달
  }).then((result) => {
    location.href =
      "/readCommunity?number=" + JSON.stringify(result.data.number);
  });
}

// 검색어로 찾기
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
    const table = document.querySelector(".table");
    const tableRow = document.querySelectorAll(".tableRow");

    let html = "";
    // 검색 결과가 있을 때만 모달 창 열기
    if (result.data.data.length > 0) {
      for (let i = 0; i < tableRow.length; i++) {
        tableRow[i].remove();
      }
      for (let i = 0; i < result.data.data.length; i++) {
        const { number, userid, title, content, view, date } =
          result.data.data[i];
        html += `<tr onclick="detailCommunityPage('${number}')" class="tableRow">
              <td>${number}</td>
              <td>${title}</td>
              <td>${userid}</td>
              <td>${view}</td>
              <td>${date}</td>
            </tr>`;
      }
      table.insertAdjacentHTML("beforeend", html);
      showPage(1);
    } else {
      // 검색 결과가 없을 때의 처리 (예: 알림 메시지 등)
      console.log("검색 결과가 없습니다.");
    }
  });
}
