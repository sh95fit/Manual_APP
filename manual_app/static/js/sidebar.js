// // 상위 테이블 클릭 시 해당 하위 요소들 토글
// $(document).ready(function() {
//   let activeToggle = null;

//   const initialLink = $('.parent-items > li:first-child > a');
//   const initialContentUrl = initialLink.attr('href');
//   const initialchildItems = initialLink.next('.child-items');

//   if (initialchildItems.css('display') === 'none') {
//     initialchildItems.css('display', 'block');
//     activeToggle = initialLink.parent();
//   }

//   fetchContent(initialContentUrl);

//   $('.parent-items > li > a').click(function(event) {
//     event.preventDefault();

//     const clickedItem = $(this).parent();
//     const childItems = clickedItem.find('.child-items');

//     if (activeToggle && activeToggle[0] !== clickedItem[0]) {
//       activeToggle.find('.child-items').hide();
//     }

//     childItems.toggle();
//     activeToggle = childItems.is(':visible') ? clickedItem : null;
//   });
// });

// // 상위 테이블 클릭 시 페이지 업로드
// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll(".manual_list .parent-items > li > a");
//   links.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
//       const contentUrl = link.getAttribute("href");
//       fetchContent(contentUrl);
//     });
//   });
// });

// function fetchContent(contentUrl) {
//   fetch(contentUrl)
//   .then((response) => response.text())
//   .then((data) => {
//     document.querySelector(".box-contents").innerHTML = data;
//   })
//   .catch((error) => {
//     console.error("Error fetching content:", error);
//   });
// }

$(document).ready(function() {
  const links = $('.parent-items > li > a');

  links.click(function(event) {
    event.preventDefault();

    const clickedItem = $(this).parent();
    const childItems = clickedItem.find('.child-items');

    if (!childItems.is(':visible')) {
      $('.parent-items > li.active > .child-items').hide();
      $('.parent-items > li.active').removeClass('active');
    }

    childItems.toggle();

    if (childItems.is(':visible')) {
      clickedItem.addClass('active');
    }

    fetchContent($(this).attr('href'));
  });

  // 초기 로드 시 첫 번째 항목의 하위 메뉴와 컨텐츠 표시
  const initialLink = links.first();
  const initialChildItems = initialLink.next('.child-items');

  initialLink.parent().addClass('active');
  initialChildItems.show();
  fetchContent(initialLink.attr('href'));
});

function fetchContent(contentUrl) {
  fetch(contentUrl)
    .then((response) => response.text())
    .then((data) => {
      $('.box-contents').html(data);
    })
    .catch((error) => {
      console.error("Error fetching content:", error);
    });
}