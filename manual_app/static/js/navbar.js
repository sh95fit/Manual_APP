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

// 검색 기능 추가

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
  const container = $('.box-contents').get(0);
  const content = container.textContent;
  const words = content.split(' ');
  const wordIndex = content.substring(0, position).split(' ').length - 1;
  const wordsBefore = words.slice(0, wordIndex);

  // 각 단어를 span 요소로 감싸서 단어의 높이를 측정
  const wordsWithSpans = wordsBefore.map(word => `<span>${word}</span>`);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = wordsWithSpans.join(' ');
  container.appendChild(tempDiv);


  // 검색어 위치 스크롤 적용
  const scrollToLine = (tempDiv.offsetHeight) || 0;

  // console.log(scrollToLine)
  // console.log(position)
  // console.log(wordsWithSpans)

  window.scrollTo({ top: scrollToLine, behavior: 'smooth' });

  // 임시 div 제거
  tempDiv.remove();
}

function applyHighlight(text, searchTerm) {
  const searchRegex = new RegExp(searchTerm, "gi");
  return text.replace(searchRegex, match => `<span class="highlight">${match}</span>`);
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