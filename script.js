const runBtn = document.getElementById('runBtn');
const codeArea = document.getElementById('code');
const outputArea = document.getElementById('output');
const clearOut = document.getElementById('clearOut');
const sampleBtn = document.getElementById('sampleBtn');

runBtn.addEventListener('click', () => {
    try {
        const code = codeArea.value;
        const result = Umjunsik.run(code);
        outputArea.textContent += result;
    } catch (e) {
        outputArea.textContent += '에러: ' + (e && e.message ? e.message : String(e)) + '\n';
    }
});

clearOut.addEventListener('click', () => {
    outputArea.textContent = '';
});

sampleBtn.addEventListener('click', () => {
    const sample = [
        '엄 어 .. ..',
        '식 어 !',
        '엄 어 ..... .............',
        '식 어 ㅋ'
    ].join('\n');
    codeArea.value = sample;
});
