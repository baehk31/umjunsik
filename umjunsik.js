window.Umjunsik = (function(){
  function isVarName(t){
    return /^어+$/.test(t);
  }
  function isDotComma(t){
    return /^[\.,]+$/.test(t);
  }
  function parseAtom(t, vars){
    if(isDotComma(t)){
      let val = 0;
      for(let ch of t){ val += ch === '.' ? 1 : -1; }
      return val;
    }
    if(/^-?\d+$/.test(t)){
      return parseInt(t,10);
    }
    if(isVarName(t)){
      return vars[t] ?? 0;
    }
    throw new Error('알 수 없는 토큰: ' + t);
  }
  function evalExpr(expr, vars){
    expr = expr.trim();
    if(expr === '') throw new Error('빈 표현식');
    const parts = expr.split(/\s+/);
    let acc = null;
    for(const p of parts){
      const v = parseAtom(p, vars);
      acc = acc === null ? v : acc * v;
    }
    return acc === null ? 0 : acc;
  }
  function run(code){
    if(typeof code !== 'string') throw new Error('코드는 문자열이어야 함');
    const lines = code.split(/\r?\n/);
    const vars = {};
    const out = [];
    for(let raw of lines){
      const line = raw.trim();
      if(line === '') continue;
      if(line.startsWith('엄')){
        const rest = line.slice(1).trim();
        const m = rest.match(/^(\S+)\s+(.+)$/);
        if(!m) throw new Error('엄 구문 오류: ' + line);
        const name = m[1];
        const expr = m[2];
        if(!isVarName(name)) throw new Error('변수명 오류: ' + name);
        const val = evalExpr(expr, vars);
        vars[name] = val;
        continue;
      }
      const lastChar = line[line.length-1];
      if(lastChar === '!' || lastChar === 'ㅋ'){
        const body = line.slice(0, -1).trim();
        let exprBody = body;
        if(exprBody.startsWith('식')) exprBody = exprBody.slice(1).trim();
        if(exprBody.startsWith('(') && exprBody.endsWith(')')) exprBody = exprBody.slice(1, -1).trim();
        const val = evalExpr(exprBody, vars);
        if(lastChar === '!'){
          out.push(String(val));
        } else {
          const codePoint = Number(val);
          if(!Number.isFinite(codePoint)) throw new Error('문자 출력 값이 유효하지 않음');
          out.push(String.fromCharCode(codePoint));
        }
        continue;
      }
      throw new Error('알 수 없는 문장: ' + line);
    }
    return out.join('');
  }
  return { run };
})();
