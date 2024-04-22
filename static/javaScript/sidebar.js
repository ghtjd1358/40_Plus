// fade-in / out 을 위함.
// 상위 메뉴의 부모 li 선택.
const homeMenu = document.getElementById("home");
const computerMenu = document.getElementById("computer");
const lifeMenu = document.getElementById("life");
const cultureMenu = document.getElementById("culture");
const communityMenu = document.getElementById("community");

// 각 상위 메뉴에서 a 선택.
const homeLink = homeMenu.querySelector("a");
const computerLink = computerMenu.querySelector("a");
const lifeLink = lifeMenu.querySelector("a");
const cultureLink = cultureMenu.querySelector("a");
const communityLink = communityMenu.querySelector("a");

// --------------------- 구 분 선 ----------------------
// 사이드바 토글 함수
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const togglebtn = document.getElementById("toggle-btn");
  const backbtn = document.getElementById("back-btn");
  const activeSubmenu = document.querySelector(".main-line-active");
 let nav;
 nav = document.querySelector(".headerNav");
  let commonbtn;
  commonbtn = document.querySelectorAll(".common-btn");
  let footer2s;
  footer2s = document.querySelectorAll('.menu-footer2');

  if (sidebar.style.marginLeft === "0px") {
    // 사이드 바 닫을 때
    backbtn.style.display = "none";
    sidebar.style.marginLeft = "-300px";
    main.style.marginLeft = "0";
    togglebtn.classList.remove("toggle-btn-after");
    togglebtn.classList.add("toggle-btn-before");
    togglebtn.innerText = "☰"; // '✕' 에서 다시 '☰' 로 변경
    sidebar.classList.remove("toggle-sidebar"); // 클래스 제거
    main.style.margin = "0 0 0 10%";
    if (commonbtn) {
      for (const commonbt of commonbtn) {
        commonbt.style.display = "block";
      }
    }
    if (nav) {
      nav.style.opacity = "1";
    }
    for (const footer2 of footer2s) {
      footer2.style.transition = 'transform 1s';
      footer2.style.transform = 'translateX(0px)';
    }
    

    // 각 링크들 애니메이션 삭제하기
    homeLink.classList.remove("fade-in");
    computerLink.classList.remove("fade-in");
    lifeLink.classList.remove("fade-in");
    cultureLink.classList.remove("fade-in");
    communityLink.classList.remove("fade-in");
  } else {
    // 사이드 바 보여주기
    sidebar.style.marginLeft = "0";
    main.style.marginLeft = "300px";
    togglebtn.classList.add("toggle-btn-after");
    togglebtn.innerText = "✕"; // '☰' 에서 '✕'로 변경
    sidebar.classList.add("toggle-sidebar"); // 클래스 추가
    if (commonbtn) {
      for (const commonbt of commonbtn) {
        commonbt.style.display = "none";
      }
    }
    if (nav) {
      nav.style.opacity = "0";
    }
    for (const footer2 of footer2s) {
      footer2.style.transition = 'transform 1s';
      footer2.style.transform = 'translateX(180px)';
    }


    // 각 li(링크)들 애니메이션 추가하기
    homeLink.classList.add("fade-in");
    computerLink.classList.add("fade-in");
    lifeLink.classList.add("fade-in");
    cultureLink.classList.add("fade-in");
    communityLink.classList.add("fade-in");

    // 활성화된 서브메뉴 일 때 사이드 바 닫고 다시 열었을 때 backbtn 다시 보여주기
    if (activeSubmenu) {
      backbtn.style.display = "block";
    }
  }
}

// --------------------- 구 분 선 ----------------------
// 서브 메뉴 보여주기.
function toggleSubmenu(Id) {
  const clickId = document.getElementById(Id);
  const backbtn = document.getElementById("back-btn");
  const ol = clickId.querySelector("ol");
  const lis = clickId.parentElement.children; // 부모 요소들 모음집

  console.log("클릭한 항목 >", clickId);
  console.log("ol >", ol);
  console.log("lis >", lis);

  // 토글된 메뉴의 클래스 추가 또는 제거
  clickId.classList.toggle("main-line-active");
  clickId.querySelector("a").style.display = "none";

  // back 버튼 생성
  backbtn.style.display = "block";

  // 토글될 때 다른 상위 메뉴들의 클래스 제거
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    if (li !== clickId) {
      li.classList.remove("main-line-active");
      console.log("clickId != li >", li);
      li.style.display = "none";
    }
  }
  // 클릭한 메뉴의 하위 메뉴 토글
  ol.style.display = ol.style.display === "block" ? "none" : "block";
  ol.classList.add("fade-in");
}
// 사이드 바 뒤로 가기 버튼
function goBack() {
  const backbtn = document.getElementById("back-btn");
  const togglebtn = document.getElementById("toggle-btn");
  // 현재 활성화된 하위 메뉴 찾기
  const activeSubmenu = document.querySelector(".main-line-active");

  if (activeSubmenu) {
    // 현재 활성화된 하위 메뉴의 상태 초기화
    activeSubmenu.classList.remove("main-line-active");
    activeSubmenu.querySelector("a").style.display = "flex";
    activeSubmenu.querySelector("ol").style.display = "none";
  }

  // 메인 메뉴들 보이게 하기
  const mainLines = document.querySelectorAll(".main-line");
  mainLines.forEach((line) => {
    line.style.display = "flex";
  });
  backbtn.style.display = "none";
}

// 이벤트 리스너 추가
document.getElementById("home").addEventListener("click", function () {
  toggleSubmenu("home");
});
document.getElementById("computer").addEventListener("click", function () {
  toggleSubmenu("computer");
});
document.getElementById("life").addEventListener("click", function () {
  toggleSubmenu("life");
});
document.getElementById("culture").addEventListener("click", function () {
  toggleSubmenu("culture");
});
