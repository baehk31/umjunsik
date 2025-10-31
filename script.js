:root{
  --bg:#0f1724;
  --card:#0b1220;
  --accent:#7dd3fc;
  --muted:#9ca3af;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Noto Mono", monospace;background:linear-gradient(180deg,#071023 0%, #081426 100%);color:#e6eef8}
.wrap{max-width:980px;margin:32px auto;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px;box-shadow:0 6px 30px rgba(2,6,23,0.6)}
h1{margin:0 0 12px;font-size:20px}
.editor-row{display:flex;gap:16px;align-items:flex-start}
#code{flex:1;height:340px;padding:12px;background:#001219;border:1px solid rgba(255,255,255,0.04);color:#dbeafe;border-radius:8px;font-size:14px;resize:vertical}
.controls{display:flex;flex-direction:column;gap:8px}
button{background:linear-gradient(180deg,var(--accent),#22d3ee);border:none;padding:10px 14px;border-radius:8px;color:#012;cursor:pointer;font-weight:600}
button:active{transform:translateY(1px)}
#output{margin-top:8px;height:160px;padding:12px;background:#000;border-radius:8px;color:#b7f5c6;overflow:auto;border:1px solid rgba(255,255,255,0.03)}
label{display:block;margin-top:14px;margin-bottom:6px;color:var(--muted)}
.notes{margin-top:8px;color:var(--muted);font-size:13px}
