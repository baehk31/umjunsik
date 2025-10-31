const runBtn = document.getElementById('runBtn');
const codeArea = document.getElementById('code');
const outputArea = document.getElementById('output');

runBtn.addEventListener('click', () => {
    const code = codeArea.value;

    try {
        const result = Umjunsik.run(code); // umjunsik.js에서 제공하는 실행 함수
        outputArea.textContent = result;
    } catch (e) {
        outputArea.textContent = '에러: ' + e.message;
    }
});
