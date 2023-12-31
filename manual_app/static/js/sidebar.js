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

    childItems.show(); // 하위 메뉴가 클릭되도 숨겨지지 않도록 변경

    if (childItems.is(':visible')) {
      clickedItem.addClass('active');
    } else {
      clickedItem.removeClass('active');
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

function toggleChildren(event) {
  event.stopPropagation(); // 이벤트 전파 방지 (상위 요소로의 전파 차단)
  const target = event.target; // 클릭된 요소 가져오기
  if (target.tagName === "A") {
    // 클릭된 요소가 앵커 태그인지 확인
    const sectionId = target.getAttribute("href"); // 앵커 태그의 href 속성 가져오기 (예: "#section1-1")
    $(".child-items li").removeClass("active"); // 모든 하위 li 요소의 활성화 클래스 제거
    $(target).parent().addClass("active"); // 클릭한 앵커 태그의 부모 li 요소에 활성화 클래스 추가
  }
}