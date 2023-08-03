// 구글 플레이 다운로드 링크 연결

function openDownloadLink() {
  const targetURL = "https://play.google.com/store/apps/details?id=kr.co.itsmore.gsm.and.app&hl=ko-KR";
  window.open(targetURL, "_blank");
}

document.getElementsByClassName("download-btn")[0].addEventListener("click", openDownloadLink);


////////////////////////////////////////////////////////////////////////////////////

// pdf 파일 다운로드

// 다운로드 버튼을 클릭하면 서버로 /generate_pdf 엔드포인트에 요청을 보냄
document.querySelector(".pdf-btn").addEventListener("click", function () {
  // 서버로 요청 보내기
  fetch("/generate_private_pdf")
  // fetch("/generate_multi_pdf")
    .then((response) => {
      // 응답의 내용을 blob 형태로 가져오기
      return response.blob();
    })
    .then((blob) => {
      // blob 형태의 데이터를 URL.createObjectURL로 URL로 변환
      const url = URL.createObjectURL(blob);

      // a 태그를 생성하여 다운로드 링크 생성
      const a = document.createElement("a");
      a.href = url;
      a.download = "more_user_manual.pdf";
      a.style.display = "none"; // a 태그를 화면에 표시하지 않음
      document.body.appendChild(a); // a 태그를 body에 추가

      // 다운로드 링크를 클릭하여 파일을 다운로드
      a.click();

      // a 태그 삭제
      document.body.removeChild(a);

      // URL.revokeObjectURL로 사용한 URL 해제
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error fetching PDF:", error);
    });
});


////////////////////////////////////////////////////////////////////////////////////

// 프린트 기능

document.querySelector(".printer-btn").addEventListener("click", function () {
  fetch("/generate_private_pdf")
  .then((response) => {
    return response.blob();
  })
  .then((blob) => {
    const url = URL.createObjectURL(blob);

    const newWindow = window.open(url);

    newWindow.onload = function () {
      newWindow.print();

      URL.revokeObjectURL(url);
    };
  })
  .catch((error) => {
    console.error("Error generating PDF : ", error);
  })
})


////////////////////////////////////////////////////////////////////////////////////

// const searchInput = document.querySelector(".search-input");
// const searchButton = document.querySelector(".search-button");
// let contentIds = [];
// let currentIndex = 0;

// function performSearch() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   if (searchTerm === "") return;

//   fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.length > 0) {
//         contentIds = data.map((item) => `${item}`);
//         console.log(contentIds);
//         loadNextContent();
//       } else {
//         console.log("검색 결과가 없습니다.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error performing search:", error);
//     });
// }

// // 입력창에서 엔터 키 입력 이벤트 처리
// searchInput.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     performSearch();
//   } else if (event.key === "Escape") {
//     searchInput.value = ""; // 검색어를 초기화
//     currentIndex = 0;
//     contentIds = [];
//   }
// });

// // 검색 버튼 클릭 이벤트 처리
// searchButton.addEventListener("click", function () {
//   performSearch();
// });

// function loadNextContent() {
//   if (currentIndex >= contentIds.length) {
//     currentIndex = 0;
//   }

//   const content = contentIds[currentIndex].replace(".html", "");
//   const url = `/manual/${content}`;

//   fetch(url)
//     .then((response) => response.text())
//     .then((data) => {
//       $('.box-contents').html(data);
//       scrollToSearchTerm();
//     })
//     .catch((error) => {
//       console.error("Error loading content :", error);
//     });

//   currentIndex++;
// }

// function scrollToSearchTerm() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   const searchTermElements = $('.box-contents').find(`*:contains('${searchTerm}')`);

//   if (searchTermElements.length > 0) {
//     const firstSearchTermElement = searchTermElements.eq(0);
//     firstSearchTermElement[0].scrollIntoView({ behavior: "smooth" });
//   }
// }

///////////////////////////////////

// const searchInput = document.querySelector(".search-input");
// const searchButton = document.querySelector(".search-button");
// let contentIds = [];
// let currentIndex = 0;

// function performSearch() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   if (searchTerm === "") return;

//   fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.length > 0) {
//         contentIds = data.map((item) => `${item}`);
//         console.log(contentIds);
//         // currentIndex = 0; // 검색 결과를 초기화
//         loadNextContent(); // 첫 번째 HTML 로드
//       } else {
//         console.log("검색 결과가 없습니다.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error performing search:", error);
//     });
// }

// // 입력창에서 엔터 키 입력 이벤트 처리
// searchInput.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     performSearch();
//   } else if (event.key === "Escape") {
//     searchInput.value = ""; // 검색어를 초기화
//     currentIndex = 0;
//     contentIds = [];
//   }
// });

// // 검색 버튼 클릭 이벤트 처리
// searchButton.addEventListener("click", function () {
//   performSearch();
// });

// function loadNextContent() {
//   if (currentIndex >= contentIds.length) {
//     // 모든 검색 결과를 다 처리한 경우
//     currentIndex = 0;
//     return;
//   }

//   const content = contentIds[currentIndex].replace(".html", "");
//   const url = `/manual/${content}`;

//   fetch(url)
//     .then((response) => response.text())
//     .then((data) => {
//       $('.box-contents').html(data);
//       currentIndex++; // 다음 HTML로 넘어가기
//       scrollToNextSearchTerm(); // 검색어별 스크롤 이동
//     })
//     .catch((error) => {
//       console.error("Error loading content:", error);
//     });
// }

// function scrollToNextSearchTerm() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   if (searchTerm === "") return;

//   const searchTermElements = $('.box-contents').find(`*:contains('${searchTerm}')`);

//   if (searchTermElements.length > 0) {
//     const firstSearchTermElement = searchTermElements.eq(0);
//     firstSearchTermElement[0].scrollIntoView({ behavior: "smooth" });
//   }
// }


//////////////////////////////////////////////////////////////////////////////////



// // 검색어 입력란과 검색 버튼을 가져옵니다.
// const searchInput = document.querySelector(".search-input");
// const searchButton = document.querySelector(".search-button");
// let contentIds = [];
// let currentIndex = 0;
// let lastSearchedTerm = "";

// // 검색을 수행하는 함수
// function performSearch() {
//   // 검색어를 가져옵니다.
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   if (searchTerm === "") return;

//   // 이전 검색어와 다른 경우에만 초기화합니다.
//   if (lastSearchedTerm !== searchTerm) {
//     currentIndex = 0;
//     contentIds = [];
//     lastSearchedTerm = searchTerm;
//   }

//   // 서버로 검색 요청을 보냅니다.
//   fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.length > 0) {
//         // 검색 결과가 있으면 contentIds에 저장하고 다음 검색 내용을 로드합니다.
//         contentIds = data.map((item) => `${item}`);
//         console.log(contentIds);
//         loadNextContent();
//       } else {
//         console.log("검색 결과가 없습니다.");
//       }
//     })
//     .catch((error) => {
//       console.error("검색 중 오류 발생:", error);
//     });
// }

// // 입력창에서 엔터 키 입력 이벤트 처리
// searchInput.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     moveToNextSearchTerm();
//   } else if (event.key === "Escape") {
//     searchInput.value = ""; // 검색어를 초기화
//     currentIndex = 0;
//     contentIds = [];
//     lastSearchedTerm = "";
//   }
// });

// // 검색 버튼 클릭 이벤트 처리
// searchButton.addEventListener("click", function () {
//   performSearch();
// });

// // 다음 검색어가 포함된 위치로 이동하는 함수
// function moveToNextSearchTerm() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   const searchTermElements = $('.box-contents').find(`*:contains('${searchTerm}')`);

//   if (searchTermElements.length > 0) {
//     // 현재 검색어의 위치 인덱스를 찾습니다.
//     const currentIndex = searchTermElements.toArray().findIndex((element) => element.classList.contains("found-term"));

//     if (currentIndex !== -1) {
//       // 현재 검색어의 다음 위치로 이동합니다.
//       const nextIndex = (currentIndex + 1) % searchTermElements.length;
//       const nextElement = searchTermElements.get(nextIndex);
//       nextElement.scrollIntoView({ behavior: "smooth" });
//       nextElement.classList.add("found-term");
//     } else {
//       // 현재 페이지에서 검색어의 첫 위치로 이동합니다.
//       const firstSearchTermElement = searchTermElements.get(0);
//       firstSearchTermElement.scrollIntoView({ behavior: "smooth" });
//       firstSearchTermElement.classList.add("found-term");
//     }
//   }
// }

// // 다음 내용을 로드하는 함수
// function loadNextContent() {
//   // 이전 검색어와 다른 경우에만 초기화합니다.
//   if (lastSearchedTerm !== searchInput.value.trim().toLowerCase()) {
//     currentIndex = 0;
//     contentIds = [];
//     lastSearchedTerm = searchInput.value.trim().toLowerCase();
//   }

//   if (currentIndex >= contentIds.length) {
//     currentIndex = 0;
//     lastSearchedTerm = "";
//     return; // 모든 HTML 페이지에서 검색어의 모든 발생을 찾았습니다.
//   }

//   const content = contentIds[currentIndex].replace(".html", "");
//   const url = `/manual/${content}`;

//   fetch(url)
//     .then((response) => response.text())
//     .then((data) => {
//       $('.box-contents').html(data);
//       searchTermElements = []; // 새로운 컨텐츠를 로드할 때 검색어 위치를 다시 찾기 위해 초기화합니다.
//       scrollToSearchTerm();
//     })
//     .catch((error) => {
//       console.error("내용 로드 중 오류 발생:", error);
//     });

//   currentIndex++;
// }

// // 검색어가 있는 위치로 스크롤하는 함수
// function scrollToSearchTerm() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   searchTermElements = Array.from($('.box-contents').find(`*:contains('${searchTerm}')`));

//   if (searchTermElements.length > 0) {
//     // 검색어를 찾은 위치로 이동합니다.
//     const firstSearchTermElement = searchTermElements[0];
//     firstSearchTermElement.scrollIntoView({ behavior: "smooth" });
//     firstSearchTermElement.classList.add("found-term");
//   }
// }












const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
let contentIds = [];
let currentIndex = 0;

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") return;

  fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        contentIds = data.map((item) => `${item}`);
        // console.log(contentIds);
        loadNextContent();
      } else {
        console.log("검색 결과가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("Error performing search:", error);
    });
}

function loadNextContent() {
  if (currentIndex >= contentIds.length) {
    currentIndex = 0;
  }

  const content = contentIds[currentIndex].replace(".html", "");
  const url = `/manual/${content}`;

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      $('.box-contents').html(data);
      findAndStoreSearchOccurrences();
    })
    .catch((error) => {
      console.error("Error loading content :", error);
    });

  // currentIndex++;
}

let searchIndex = 0;

function findAndStoreSearchOccurrences() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") return;

  const contentHTML = $('.box-contents').html();
  const searchRegex = new RegExp(searchTerm, "gi");
  let occurrences = [];
  let match;

  while ((match = searchRegex.exec(contentHTML)) !== null) {
    const occurrence = {
      position: match.index,
      length: match[0].length,
    };
    occurrences.push(occurrence);
  }

  // console.log("검색어 위치와 개수:", occurrences);
  // console.log(occurrences.length);
  // console.log(occurrences[searchIndex].position);
  // console.log(searchIndex);

  if (occurrences.length > 0) {
    scrollToPosition(occurrences[searchIndex].position);
    if (searchIndex >= occurrences.length -1) {
      currentIndex++;
      searchIndex = 0;
    } else {
      searchIndex++;
    }
  } else {
    searchIndex = -1;
  }
}

function scrollToPosition(position) {
  window.scrollTo({ top: position, behavior: 'smooth' });
}







// 입력창에서 엔터 키 입력 이벤트 처리
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  } else if (event.key === "Escape") {
    searchInput.value = ""; // 검색어를 초기화
    currentIndex = 0;
    contentIds = [];
  }
});

// 검색 버튼 클릭 이벤트 처리
searchButton.addEventListener("click", function () {
  performSearch();
});