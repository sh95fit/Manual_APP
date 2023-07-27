$(document).ready(function() {
  let activeToggle = null;

  // 상위 테이블 클릭 시 해당 하위 요소들 토글
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