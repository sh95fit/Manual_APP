// function changeURL() {
// window.history.pushState({}, '', '/');
// }

// document.onkeydown = function (event) {
// // F5 키의 keyCode는 116입니다.
// // 또는 event.key를 사용하여 "F5"로도 확인할 수 있습니다.
// if (event.keyCode === 116 || event.key === "F5") {
//     changeURL();
//     event.preventDefault(); // 기본 F5 키 동작을 막습니다.
// }
// };


// window.addEventListener('beforeunload', function(event) {
//     // 경고창 띄우기
//     event.preventDefault(); // 기본 새로고침 동작을 막음
//     event.returnValue = ''; // 경고창 메시지를 표시하기 위해 빈 문자열로 설정

//     if (confirm('새로고침 하시겠습니까?')) {
//       changeURL(); // "예"를 누를 경우 changeURL 함수 실행
//     }
// });

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


// window.addEventListener('beforeunload', function(event) {
// // 새로고침 버튼을 클릭한 경우에만 경고창 띄우기
// if (event.clientX < 40 && event.clientY < 0) {
//     event.preventDefault(); // 기본 새로고침 동작을 막음
//     event.returnValue = ''; // 경고창 메시지를 표시하기 위해 빈 문자열로 설정

//     // 새로고침 할 것인지 경고창 띄우기
//     if (confirm('새로고침 하시겠습니까?')) {
//     changeURL(); // "예"를 누를 경우 changeURL 함수 실행
//     }
// }
// });