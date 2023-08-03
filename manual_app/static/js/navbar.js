function openDownloadLink() {
  const targetURL = "https://play.google.com/store/apps/details?id=kr.co.itsmore.gsm.and.app&hl=ko-KR";
  window.open(targetURL, "_blank");
}

document.getElementsByClassName("download-btn")[0].addEventListener("click", openDownloadLink);