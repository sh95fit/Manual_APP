// 스크롤 위치로 이동
scrollToSavedPosition();

// F5 키 누를 때 새로고침
window.addEventListener('keydown', function(event) {
  // F5 키를 누를 때에만 새로고침
  if (event.keyCode === 116) {
    event.preventDefault();
    location.reload(true);
  }
});

// 새로고침될 때 스크롤 위치로 이동하는 함수
function scrollToSavedPosition() {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
  }
}

// 네비게이션바 영역을 제외한 섹션 위치 적용
window.addEventListener("scroll", () => {
  applyPaddingToSections();
});

function applyPaddingToSections() {
  const sections = document.querySelectorAll(".section");
  const navbarHeight = 85; // 네비게이션 바의 높이

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // 현재 스크롤 위치와 섹션의 위치, 높이를 비교하여 패딩 적용
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop >= sectionTop - navbarHeight) {
      section.style.paddingTop = navbarHeight + "px";
    } else {
      section.style.paddingTop = "0";
    }
  });
}

// 초기화 함수
function handleLogoLinkClick(event) {
  event.preventDefault(); // 기본 링크 동작 방지
  localStorage.removeItem('scrollPosition'); // 저장된 스크롤 위치 초기화
  window.scrollTo(0, 0); // 페이지 맨 위로 스크롤
  window.location.href = "/"; // 홈 페이지로 이동
}

// // "logoLink" 클릭 이벤트에 함수 연결
// const logoLink = document.querySelector("#home-link");
// logoLink.addEventListener("click", handleLogoLinkClick);