function changeURL() {
    window.history.pushState({}, '', '/');
}

document.onkeydown = function (event) {
// F5 키의 keyCode는 116입니다.
// 또는 event.key를 사용하여 "F5"로도 확인할 수 있습니다.
if (event.keyCode === 116 || event.key === "F5") {
    event.preventDefault(); // 기본 F5 키 동작을 막습니다.

    changeURL(); // "예"를 누를 경우 changeURL 함수 실행
    window.location.reload(); // 새로고침
    }
};