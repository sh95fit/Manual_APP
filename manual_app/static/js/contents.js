//스크롤 위치로 이동
scrollToSavedPosition();

// F5 키 누를 때 새로고침
window.addEventListener('keydown', function(event) {
  // F5 키를 누를 때에만 새로고침
  if (event.keyCode === 116) {
    event.preventDefault();
    location.reload();
  }
});

// 새로고침될 때 스크롤 위치로 이동하는 함수
function scrollToSavedPosition() {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
  }
}

// 페이지 벗어날 때 스크롤 위치 저장
window.addEventListener('beforeunload', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  localStorage.setItem('scrollPosition', scrollTop);
});

// 네비게이션바 영역을 제외한 섹션 위치 적용
window.addEventListener("scroll", () => {
  applyPaddingToSections();
});

// 패딩 적용 함수
function applyPaddingToSections() {
  const sections = document.querySelectorAll(".section");
  const navbarHeight = 85; // 네비게이션 바의 높이

  sections.forEach(section => {
    const bounding = section.getBoundingClientRect();
    if (bounding.top <= navbarHeight && bounding.bottom >= 0) {
      section.classList.add("active"); // 섹션이 보이는 경우 active 클래스 추가
      section.style.paddingTop = navbarHeight + "px"; // 패딩 적용
    } else {
      section.classList.remove("active"); // 섹션이 보이지 않는 경우 active 클래스 제거
      section.style.paddingTop = "0"; // 패딩 제거
    }
  });
}


///////////////////////////////////////////////////////////////////////

// window.addEventListener('load', function() {
//   // 스크롤 위치로 이동
//   scrollToSavedPosition();

//   // F5 키 누를 때 새로고침
//   window.addEventListener('keydown', function(event) {
//     // F5 키를 누를 때에만 새로고침
//     if (event.keyCode === 116) {
//       event.preventDefault();
//       location.reload();
//     }
//   });

//   // 페이지 벗어날 때 스크롤 위치와 패딩 여부 저장
//   window.addEventListener('beforeunload', function() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     localStorage.setItem('scrollPosition', scrollTop);

//     const sections = document.querySelectorAll(".section");
//     sections.forEach(section => {
//       const bounding = section.getBoundingClientRect();
//       const hasPadding = section.classList.contains("active");
//       if (bounding.top <= 85 && bounding.bottom >= 0) {
//         localStorage.setItem(`hasPadding_${section.id}`, hasPadding ? 'true' : 'false');
//       }
//     });
//   });

//   // 네비게이션바 영역을 제외한 섹션 위치 적용
//   applyPaddingToSections();

//   // 홈 링크 클릭 시 스크롤 위치 초기화
//   const homeLink = document.getElementById('home-link');
//   if (homeLink) {
//     homeLink.addEventListener('click', function(event) {
//       event.preventDefault();
//       localStorage.removeItem('scrollPosition'); // 스크롤 위치 데이터 삭제
//       location.href = this.getAttribute('href'); // 홈으로 이동
//     });
//   }
// });

// // 새로고침될 때 스크롤 위치로 이동하는 함수
// function scrollToSavedPosition() {
//   const scrollPosition = localStorage.getItem('scrollPosition');
//   if (scrollPosition) {
//     window.scrollTo(0, scrollPosition);
//   }
// }

// // 네비게이션바 영역을 제외한 섹션 위치 적용
// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   sections.forEach(section => {
//     const bounding = section.getBoundingClientRect();
//     if (bounding.top <= navbarHeight && bounding.bottom >= 0) {
//       const hasPadding = localStorage.getItem(`hasPadding_${section.id}`);
//       if (hasPadding === 'true') {
//         section.classList.add("active"); // 섹션이 보이는 경우 active 클래스 추가
//         section.style.paddingTop = navbarHeight + "px"; // 패딩 적용
//       } else {
//         section.classList.remove("active"); // 섹션이 보이지 않는 경우 active 클래스 제거
//         section.style.paddingTop = "0"; // 패딩 제거
//       }
//     }
//   });
// }

// // 스크롤 이벤트 처리
// window.addEventListener("scroll", () => {
//   applyPaddingToSections();
// });


//////////////////////////////////////////////////////////////////////////////////////


// window.addEventListener('load', function() {
//   // 스크롤 위치로 이동
//   scrollToSavedPosition();

//   // F5 키 누를 때 새로고침
//   window.addEventListener('keydown', function(event) {
//     // F5 키를 누를 때에만 새로고침
//     if (event.keyCode === 116) {
//       event.preventDefault();
//       location.reload();
//     }
//   });

//   // 새로고침될 때 스크롤 위치와 패딩 여부 저장
//   window.addEventListener('beforeunload', function() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     localStorage.setItem('scrollPosition', scrollTop);

//     const sections = document.querySelectorAll(".section");
//     sections.forEach(section => {
//       const bounding = section.getBoundingClientRect();
//       const hasPadding = section.classList.contains("active");
//       if (bounding.top <= 85 && bounding.bottom >= 0) {
//         localStorage.setItem(`hasPadding_${section.id}`, hasPadding ? 'true' : 'false');
//       }
//     });
//   });

//   // 네비게이션바 영역을 제외한 섹션 위치 적용
//   applyPaddingToSections();

//   // 홈 링크 클릭 시 스크롤 위치 초기화
//   const homeLink = document.getElementById('home-link');
//   if (homeLink) {
//     homeLink.addEventListener('click', function(event) {
//       event.preventDefault();
//       localStorage.removeItem('scrollPosition'); // 스크롤 위치 데이터 삭제
//       location.href = this.getAttribute('href'); // 홈으로 이동
//     });
//   }
// });

// // 새로고침될 때 스크롤 위치로 이동하는 함수
// function scrollToSavedPosition() {
//   const scrollPosition = localStorage.getItem('scrollPosition');
//   if (scrollPosition) {
//     window.scrollTo(0, scrollPosition);
//   }
// }

// // 네비게이션바 영역을 제외한 섹션 위치 적용
// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   sections.forEach(section => {
//     const bounding = section.getBoundingClientRect();
//     if (bounding.top <= navbarHeight && bounding.bottom >= 0) {
//       const hasPadding = localStorage.getItem(`hasPadding_${section.id}`);
//       if (hasPadding === 'true') {
//         section.classList.add("active"); // 섹션이 보이는 경우 active 클래스 추가
//         section.style.paddingTop = navbarHeight + "px"; // 패딩 적용
//       } else {
//         section.classList.remove("active"); // 섹션이 보이지 않는 경우 active 클래스 제거
//         section.style.paddingTop = "0"; // 패딩 제거
//       }
//     }
//   });
// }

// // 스크롤 이벤트 처리
// window.addEventListener("scroll", () => {
//   applyPaddingToSections();
// });


