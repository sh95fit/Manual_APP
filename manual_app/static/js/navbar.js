function openDownloadLink() {
  const targetURL = "https://play.google.com/store/apps/details?id=kr.co.itsmore.gsm.and.app&hl=ko-KR";
  window.open(targetURL, "_blank");
}

document.getElementsByClassName("download-btn")[0].addEventListener("click", openDownloadLink);


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