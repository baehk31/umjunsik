window.UmjunsikKor = (function(){
  function isVarName(t){return /^어+$/.test(t)}
  function isDotComma(t){return /^[\.,]+$/.test(t)}
  function parseAtom(t, vars){
    if(isDotComma(t)){let v=0;for(let ch of t){v += ch=='.'?1:-1}return v}
    if(/^-?\d+$/.test(t))return parseInt(t,10)
    if(isVarName(t))return vars[t] ?? 0
    throw new Error('알 수 없는 토큰: '+t)
  }
  function evalExpr(expr, vars){expr=expr.trim(); if(expr==='')throw new Error('빈 표현식'); const parts=expr.split(/\s+/); let acc=null; for(const p of parts){const v=parseAtom(p, vars); acc = acc===null? v : acc * v} return acc===null?0:acc}
  function run(code){
    if(typeof code!=='string')throw new Error('코드는 문자열이어야 함')
    const rawLines=code.split(/\r?\n/)
    let firstNonEmpty=null, lastNonEmpty=null
    for(let i=0;i<rawLines.length;i++){const t=rawLines[i].trim(); if(t!=='' && firstNonEmpty===null) firstNonEmpty={i,t}; if(t!=='') lastNonEmpty={i,t}}
    if(!firstNonEmpty) throw new Error('코드가 비어있음')
    if(firstNonEmpty.t !== '어떻게') throw new Error("프로그램은 첫 줄이 '어떻게'로 시작해야 함")
    if(lastNonEmpty.t !== '이 사람이름이냐ㅋㅋ') throw new Error("프로그램은 마지막 줄이 '이 사람이름이냐ㅋㅋ'로 끝나야 함")
    const bodyLines = rawLines.slice(firstNonEmpty.i+1, lastNonEmpty.i)
    const vars={}
    const out=[]
    for(let raw of bodyLines){
      const line = raw.trim()
      if(line==='') continue
      if(line.startsWith('엄')){
        const rest = line.slice(1).trim()
        const m = rest.match(/^(\S+)\s+(.+)$/)
        if(!m) throw new Error('엄 구문 오류: '+line)
        const name = m[1]
        const expr = m[2]
        if(!isVarName(name)) throw new Error('변수명 오류: '+name)
        const val = evalExpr(expr, vars)
        vars[name] = val
        continue
      }
      const lastChar = line[line.length-1]
      if(lastChar === '!' || lastChar === 'ㅋ'){
        const body = line.slice(0,-1).trim()
        let exprBody = body
        if(exprBody.startsWith('식')) exprBody = exprBody.slice(1).trim()
        if(exprBody.startsWith('(') && exprBody.endsWith(')')) exprBody = exprBody.slice(1,-1).trim()
        const val = evalExpr(exprBody, vars)
        if(lastChar === '!'){ out.push(String(val)) } else {
          const codePoint = Number(val)
          if(!Number.isFinite(codePoint)) throw new Error('문자 출력 값이 유효하지 않음')
          out.push(String.fromCharCode(codePoint))
        }
        continue
      }
      throw new Error('알 수 없는 문장: '+line)
    }
    return out.join('')
  }
  return { run }
})();

window.UmjunsikEng = (function(){
  function isVarName(t){return /^uh+$/.test(t)}
  function isDotComma(t){return /^[\.,]+$/.test(t)}
  function parseAtom(t, vars){
    if(isDotComma(t)){let v=0;for(let ch of t){v += ch=='.'?1:-1}return v}
    if(/^-?\d+$/.test(t))return parseInt(t,10)
    if(isVarName(t))return vars[t] ?? 0
    throw new Error('unknown token: '+t)
  }
  function evalExpr(expr, vars){expr=expr.trim(); if(expr==='')throw new Error('empty expression'); const parts=expr.split(/\s+/); let acc=null; for(const p of parts){const v=parseAtom(p, vars); acc = acc===null? v : acc * v} return acc===null?0:acc}
  function run(code){
    if(typeof code!=='string')throw new Error('code must be string')
    const rawLines=code.split(/\r?\n/)
    let firstNonEmpty=null, lastNonEmpty=null
    for(let i=0;i<rawLines.length;i++){const t=rawLines[i].trim(); if(t!=='' && firstNonEmpty===null) firstNonEmpty={i,t}; if(t!=='') lastNonEmpty={i,t}}
    if(!firstNonEmpty) throw new Error('empty code')
    if(firstNonEmpty.t !== 'how') throw new Error("program must start with 'how'")
    if(lastNonEmpty.t !== 'isthisanamelol') throw new Error("program must end with 'isthisanamelol'")
    const bodyLines = rawLines.slice(firstNonEmpty.i+1, lastNonEmpty.i)
    const vars={}
    const out=[]
    for(let raw of bodyLines){
      const line = raw.trim()
      if(line==='') continue
      if(line.startsWith('um')){
        const rest = line.slice(2).trim()
        const m = rest.match(/^(\S+)\s+(.+)$/)
        if(!m) throw new Error('um syntax error: '+line)
        const name = m[1]
        const expr = m[2]
        if(!isVarName(name)) throw new Error('invalid var name: '+name)
        const val = evalExpr(expr, vars)
        vars[name] = val
        continue
      }
      const lastWord = line.split(/\s+/).pop()
      if(lastWord === '!' || lastWord === 'lol'){
        let body = line
        if(lastWord === '!') body = line.slice(0, -1).trim()
        else body = line.slice(0, -3).trim()
        let exprBody = body
        if(exprBody.startsWith('print')) exprBody = exprBody.slice(5).trim()
        if(exprBody.startsWith('(') && exprBody.endsWith(')')) exprBody = exprBody.slice(1,-1).trim()
        const val = evalExpr(exprBody, vars)
        if(lastWord === '!'){ out.push(String(val)) } else {
          const codePoint = Number(val)
          if(!Number.isFinite(codePoint)) throw new Error('invalid char code')
          out.push(String.fromCharCode(codePoint))
        }
        continue
      }
      throw new Error('unknown statement: '+line)
    }
    return out.join('')
  }
  return { run }
})();
