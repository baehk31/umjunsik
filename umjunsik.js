window.UmjunsikKor=(function(){
  function isVarName(t){return /^어+$/.test(t)}
  function isDotComma(t){return /^[\.,]+$/.test(t)}
  function parseAtom(t,vars){
    if(isDotComma(t)){let v=0;for(let ch of t)v+=ch=='.'?1:-1;return v}
    if(/^-?\d+$/.test(t))return parseInt(t,10)
    if(isVarName(t))return vars[t]??0
    throw new Error('알 수 없는 토큰: '+t)
  }
  function evalExpr(expr,vars){expr=expr.trim();if(expr==='')throw new Error('빈 표현식');let parts=expr.split(/\s+/);let acc=null;for(const p of parts){const v=parseAtom(p,vars);acc=acc===null?v:acc*v}return acc===null?0:acc}
  function run(code){
    if(typeof code!=='string')throw new Error('코드는 문자열이어야 함')
    const rawLines=code.split(/\r?\n/)
    let first=null,last=null
    for(let i=0;i<rawLines.length;i++){const t=rawLines[i].trim();if(t!=='' && first===null)first={i,t};if(t!=='')last={i,t}}
    if(!first)throw new Error('코드가 비어있음')
    if(first.t!=='어떻게')throw new Error("첫 줄은 '어떻게'여야 함")
    if(last.t!=='이 사람이름이냐ㅋㅋ')throw new Error("마지막 줄은 '이 사람이름이냐ㅋㅋ'여야 함")
    const bodyLines=rawLines.slice(first.i+1,last.i)
    const vars={},out=[]
    for(let raw of bodyLines){
      const line=raw.trim();if(line==='')continue
      if(line.startsWith('엄')){
        const rest=line.slice(1).trim();const m=rest.match(/^(\S+)\s+(.+)$/);if(!m)throw new Error('엄 구문 오류: '+line);const name=m[1],expr=m[2];if(!isVarName(name))throw new Error('변수명 오류: '+name);vars[name]=evalExpr(expr,vars);continue
      }
      const lastChar=line[line.length-1]
      if(lastChar==='!'||lastChar==='ㅋ'){
        let body=line.slice(0,-1).trim();if(body.startsWith('식'))body=body.slice(1).trim()
        if(body.startsWith('(')&&body.endsWith(')'))body=body.slice(1,-1).trim()
        const val=evalExpr(body,vars)
        if(lastChar==='!')out.push(String(val))
        else{const cp=Number(val);if(!Number.isFinite(cp))throw new Error('문자 출력 값이 유효하지 않음');out.push(String.fromCharCode(cp))}
        continue
      }
      throw new Error('알 수 없는 문장: '+line)
    }
    return out.join('')
  }
  return {run}
})();

window.UmjunsikEng=(function(){
  function isVarName(t){return /^uh+$/.test(t)}
  function isDotComma(t){return /^[\.,]+$/.test(t)}
  function parseAtom(t,vars){
    if(isDotComma(t)){let v=0;for(let ch of t)v+=ch=='.'?1:-1;return v}
    if(/^-?\d+$/.test(t))return parseInt(t,10)
    if(isVarName(t))return vars[t]??0
    throw new Error('unknown token: '+t)
  }
  function evalExpr(expr,vars){expr=expr.trim();if(expr==='')throw new Error('empty expression');let parts=expr.split(/\s+/);let acc=null;for(const p of parts){const v=parseAtom(p,vars);acc=acc===null?v:acc*v}return acc===null?0:acc}
  function run(code){
    if(typeof code!=='string')throw new Error('code must be string')
    const rawLines=code.split(/\r?\n/)
    let first=null,last=null
    for(let i=0;i<rawLines.length;i++){const t=rawLines[i].trim();if(t!==''&&first===null)first={i,t};if(t!=='')last={i,t}}
    if(!first)throw new Error('empty code')
    if(first.t!=='how')throw new Error("start must be 'how'")
    if(last.t!=='isthisanamelol')throw new Error("end must be 'isthisanamelol'")
    const bodyLines=rawLines.slice(first.i+1,last.i)
    const vars={},out=[]
    for(let raw of bodyLines){
      const line=raw.trim();if(line==='')continue
      if(line.startsWith('um')){
        const rest=line.slice(2).trim();const m=rest.match(/^(\S+)\s+(.+)$/);if(!m)throw new Error('um syntax error: '+line);const name=m[1],expr=m[2];if(!isVarName(name))throw new Error('invalid var name: '+name);vars[name]=
