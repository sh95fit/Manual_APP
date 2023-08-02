////////////////////////////////////////////////////////////////////////////////////

// 스크롤 위치로 이동
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

// "logoLink" 클릭 이벤트에 함수 연결
const logoLink = document.querySelector("#home-link");
logoLink.addEventListener("click", handleLogoLinkClick);

////////////////////////////////////////////////////////////////////////////////////

// // 스크롤 위치로 이동
// scrollToSavedPosition();

// // F5 키 누를 때 새로고침
// window.addEventListener('keydown', function(event) {
//   // F5 키를 누를 때에만 새로고침
//   if (event.keyCode === 116) {
//     event.preventDefault();
//     location.reload();
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
// window.addEventListener("scroll", () => {
//   applyPaddingToSections();
// });

// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.offsetHeight;

//     // 현재 스크롤 위치와 섹션의 위치, 높이를 비교하여 패딩 적용
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     if (scrollTop >= sectionTop - navbarHeight) {
//       section.style.paddingTop = navbarHeight + "px";
//     } else {
//       section.style.paddingTop = "0";
//     }
//   });

//   const logoLink = document.querySelector("#home-link");
//     logoLink.addEventListener("click", (event) => {
//     event.preventDefault(); // 기본 링크 동작 방지
//     localStorage.removeItem('scrollPosition'); // 저장된 스크롤 위치 초기화
//     window.location.href = "/"; // 홈 페이지로 이동
//   });
// }




// //스크롤 위치로 이동
// scrollToSavedPosition();

// // F5 키 누를 때 새로고침
// window.addEventListener('keydown', function(event) {
//   // F5 키를 누를 때에만 새로고침
//   if (event.keyCode === 116) {
//     event.preventDefault();
//     location.reload();
//   }
// });

// // 새로고침될 때 스크롤 위치로 이동하는 함수
// function scrollToSavedPosition() {
//   const scrollPosition = localStorage.getItem('scrollPosition');
//   if (scrollPosition) {
//     window.scrollTo(0, scrollPosition);
//   }
// }

// // 페이지 벗어날 때 스크롤 위치 저장
// window.addEventListener('beforeunload', function() {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   localStorage.setItem('scrollPosition', scrollTop);
// });

// // 네비게이션바 영역을 제외한 섹션 위치 적용
// window.addEventListener("scroll", () => {
//   applyPaddingToSections();
// });

// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   const observerOptions = {
//     rootMargin: `-${navbarHeight}px 0px 0px 0px`, // 루트 요소와 교차하는 영역을 설정
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const section = entry.target;
//       if (entry.isIntersecting) {
//         section.classList.add("active");
//         section.style.paddingTop = navbarHeight + "px";
//       } else {
//         section.classList.remove("active");
//         section.style.paddingTop = "0";
//       }
//     });
//   }, observerOptions);

//   sections.forEach((section) => {
//     observer.observe(section); // IntersectionObserver를 각 섹션에 적용
//   });

//     // 다른 섹션들 중 활성화된 섹션이 아닌 경우 "active" 클래스와 패딩 제거
//   sections.forEach((section) => {
//     if (section !== activeSection && section.classList.contains("active")) {
//       section.classList.remove("active");
//       section.style.paddingTop = "0"; // 패딩 제거
//     }
//   });
// }





// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   const observerOptions = {
//     rootMargin: `-${navbarHeight}px 0px 0px 0px`, // 루트 요소와 교차하는 영역을 설정
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const section = entry.target;
//       if (entry.isIntersecting) {
//         section.classList.add("active");
//         section.style.paddingTop = navbarHeight + "px";
//       } else {
//         section.classList.remove("active");
//         section.style.paddingTop = "0";
//       }
//     });
//   }, observerOptions);

//   sections.forEach((section) => {
//     observer.observe(section); // IntersectionObserver를 각 섹션에 적용
//   });
// }


/////////////////////////////////////////////////////////////////////

// // 패딩 적용 함수 (active 미적용)
// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이
//   let activeSection = null; // 현재 활성화된 섹션을 추적하기 위한 변수

//   sections.forEach((section) => {
//     const bounding = section.getBoundingClientRect();
//     if (bounding.top <= navbarHeight && bounding.bottom >= 0) {
//       if (!section.classList.contains("active")) {
//         section.classList.add("active"); // 섹션이 보이는 경우 active 클래스 추가
//         section.style.paddingTop = navbarHeight + "px"; // 패딩 적용
//       }
//       activeSection = section; // 활성화된 섹션을 업데이트
//     } else {
//       section.classList.remove("active"); // 섹션이 보이지 않는 경우 active 클래스 제거
//       section.style.paddingTop = "0"; // 패딩 제거
//     }
//   });
// }

//////////////////////////////////////////////////////////////////////////

// 패딩 적용 함수 (active 미변경)
// function applyPaddingToSections() {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   let activeSection = null; // 현재 활성화된 섹션을 추적하기 위한 변수

//   sections.forEach((section) => {
//     const bounding = section.getBoundingClientRect();
//     const isVisible = bounding.top <= navbarHeight && bounding.bottom >= 0;

//     if (isVisible) {
//       // 뷰포트에 보이는 섹션 중에서 이미 활성화된 섹션이 아닌 경우에만 처리
//       if (!section.classList.contains("active")) {
//         section.classList.add("active"); // active 클래스 추가
//         section.style.paddingTop = navbarHeight + "px"; // 패딩 적용

//         // 이미 활성화된 섹션에서 active 클래스와 패딩 제거
//         if (activeSection && activeSection !== section) {
//           activeSection.classList.remove("active");
//           activeSection.style.paddingTop = "0"; // 패딩 제거
//         }

//         activeSection = section; // 현재 활성화된 섹션 업데이트
//       }
//     } else {
//       // 뷰포트에 보이지 않는 경우 active 클래스와 패딩 제거
//       section.classList.remove("active");
//       section.style.paddingTop = "0"; // 패딩 제거
//     }
//   });
// }



  // // 다른 섹션들 중 활성화된 섹션이 아닌 경우 "active" 클래스와 패딩 제거
  // sections.forEach((section) => {
  //   if (section !== activeSection && section.classList.contains("active")) {
  //     section.classList.remove("active");
  //     section.style.paddingTop = "0"; // 패딩 제거
  //   }
  // });
// }




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


