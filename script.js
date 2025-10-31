const runBtn = document.getElementById('runBtn')
const codeArea = document.getElementById('code')
const outputArea = document.getElementById('output')
const clearOut = document.getElementById('clearOut')
const sampleBtn = document.getElementById('sampleBtn')
const langSelect = document.getElementById('langSelect')

runBtn.addEventListener('click', () => {
    try {
        const code = codeArea.value
        const lang = langSelect.value
        let result = ''
        if(lang === 'kor') result = UmjunsikKor.run(code)
        else result = UmjunsikEng.run(code)
        outputArea.textContent += result
    } catch (e) {
        outputArea.textContent += '에러: ' + (e && e.message ? e.message : String(e)) + '\n'
    }
})

clearOut.addEventListener('click', () => {
    outputArea.textContent = ''
})

sampleBtn.addEventListener('click', () => {
    const lang = langSelect.value
    if(lang === 'kor'){
        const sample = [
            '어떻게',
            '엄 어 .. ..',
            '식 어 !',
            '엄 어 ..... .............',
            '식 어 ㅋ',
            '이 사람이름이냐ㅋㅋ'
        ].join('\n')
        codeArea.value = sample
    } else {
        const sample = [
            'how',
            'um uh .. ..',
            'print uh !',
            'um uh ..... .............',
            'print uh lol',
            'isthisanamelol'
        ].join('\n')
        codeArea.value = sample
    }
})
