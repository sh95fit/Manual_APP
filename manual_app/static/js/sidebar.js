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


// // 네비게이션바 영역을 제외한 섹션 위치 적용
// window.addEventListener("scroll", () => {
//   const sections = document.querySelectorAll(".section");
//   const navbarHeight = 85; // 네비게이션 바의 높이

//   sections.forEach(section => {
//     const bounding = section.getBoundingClientRect();
//     if (bounding.top <= navbarHeight && bounding.bottom >= 0) {
//       section.style.paddingTop = navbarHeight + "px";
//     } else {
//       section.style.paddingTop = "0";
//     }
//   });
// });

