// 상위 테이블 클릭 시 해당 하위 요소들 토글
$(document).ready(function() {
  let activeToggle = null;

  const initialLink = $('.parent-items > li:first-child > a');
  const initialContentUrl = initialLink.attr('href');
  const initialchildItems = initialLink.next('.child-items');

  if (initialchildItems.css('display') === 'none') {
    initialchildItems.css('display', 'block');
    activeToggle = initialLink.parent();
  }

  fetchContent(initialContentUrl);

  $('.parent-items > li > a').click(function(event) {
    event.preventDefault();

    const clickedItem = $(this).parent();
    const childItems = clickedItem.find('.child-items');

    if (activeToggle && activeToggle[0] !== clickedItem[0]) {
      activeToggle.find('.child-items').hide();
    }

    childItems.toggle();
    activeToggle = childItems.is(':visible') ? clickedItem : null;
  });
});

// 상위 테이블 클릭 시 페이지 업로드
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".manual_list .parent-items > li > a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const contentUrl = link.getAttribute("href");
      fetchContent(contentUrl);
    });
  });
});

function fetchContent(contentUrl) {
  fetch(contentUrl)
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".box-contents").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error fetching content:", error);
  });
}