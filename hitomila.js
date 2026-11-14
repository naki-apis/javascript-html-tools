(function(){try{if(window.__galleryInit){return;}window.__galleryInit=true;
var BLOCK=['displayvertising.com','popads.net','propellerads.com','adsterra.com','juicyads.com','onclickads.net','revcontent.com','mgid.com','taboola.com','outbrain.com','doubleclick.net','googlesyndication.com','adservice.google.com'];
var re=new RegExp('('+BLOCK.map(function(d){return d.replace(/\./g,'\\.')}).join('|')+')','i');
function clean(){document.querySelectorAll('script[src],iframe[src],a[href],img[src],link[href]').forEach(function(n){var u=n.src||n.href||'';if(u&&re.test(u))n.remove();});}
clean();
if(!window.__adObserver){window.__adObserver=new MutationObserver(function(muts){muts.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){try{if(re.test(n.src||n.href||'')){n.remove();return;}if(n.querySelectorAll){n.querySelectorAll('script[src],iframe[src],a[href],img[src],link[href]').forEach(function(x){if(re.test(x.src||x.href||''))x.remove();});}}catch(e){}}});});});window.__adObserver.observe(document.documentElement,{childList:true,subtree:true});}
var so=function(u){try{return new URL(u,location.href).origin===location.origin}catch(e){return false}};
var fl=function(e){while(e&&e!==document){if(e.tagName==='A')return e;e=e.parentNode}return null};
var b=function(e){var a=fl(e.target);if(!a)return;var h=a.getAttribute('href')||'';var tg=a.getAttribute('target')||'';if(tg&&tg!=='_self'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return;}if(!h||h[0]==='#'||h.indexOf('javascript:')===0||so(h))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()};
document.addEventListener('click',b,true);
document.addEventListener('auxclick',b,true);
document.addEventListener('pointerdown',b,true);
try{document.addEventListener('touchstart',b,{capture:true,passive:false});}catch(e){document.addEventListener('touchstart',b,true);}
document.addEventListener('contextmenu',function(e){var a=fl(e.target);if(a){e.preventDefault();}},true);
document.addEventListener('mousedown',function(e){if(e.button===1){var a=fl(e.target);if(a&&(a.getAttribute('target')||'')!=='_self'){e.preventDefault();e.stopPropagation();}}},true);
var oo=window.open;window.open=function(){return null};
document.addEventListener('submit',function(e){var f=e.target;if(f&&(f.getAttribute('target')||'')!=='_self'){e.preventDefault();e.stopPropagation();}},true);
function mk(t,bg,f){var x=document.createElement('button');x.textContent=t;x.style.cssText='padding:5px 8px;border:none;border-radius:5px;color:#fff;background:'+bg+';margin:2px;font-size:11px;';x.onclick=f;return x;}
function curPage(){var m=location.hash.match(/#(\d+)/);return m?parseInt(m[1],10):1;}
function isSVG(u){return /\.svg(\?|#|$)/i.test(u||'');}
var seen=[];var deleted={};var selectMode=false;var selected={};
var head=document.createElement('div');head.style.cssText='background:#111;color:#fff;font:bold 14px sans-serif;padding:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:nowrap;overflow-x:auto;';
head.appendChild(document.createTextNode('Images'));
var btns=document.createElement('div');btns.style.cssText='display:flex;gap:2px;flex-wrap:nowrap;align-items:center;';
var box=document.createElement('div');box.style.cssText='background:#111;padding:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-family:sans-serif;width:100%;box-sizing:border-box;';
var sel=document.createElement('div');sel.style.cssText='background:#000;padding:10px;display:flex;flex-direction:column;align-items:center;gap:8px;font-family:sans-serif;width:100%;box-sizing:border-box;';
function add(src){if(!src)return;if(isSVG(src))return;if(seen.indexOf(src)!==-1)return;if(deleted[src])return;seen.push(src);var w=document.createElement('div');w.style.cssText='position:relative;';var t=document.createElement('img');t.src=src;t.loading='lazy';t.style.cssText='width:100%;height:110px;object-fit:cover;display:block;cursor:pointer;border:1px solid #333;border-radius:6px;';t.onclick=function(){if(selectMode){selected[src]=!selected[src];t.style.outline=selected[src]?'3px solid #2e7d32':'none';}else{show(src)}};w.appendChild(t);var cb=document.createElement('div');cb.style.cssText='position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,.6);border:2px solid #fff;display:none;align-items:center;justify-content:center;color:#fff;font-size:12px;';cb.textContent='✓';w.appendChild(cb);t._cb=cb;box.appendChild(w);}
function scan(){[].slice.call(document.images).forEach(function(img){var u=img.currentSrc||img.src;if(u&&img.naturalWidth>0&&!isSVG(u))add(u);});}
function refreshMenu(){try{[].slice.call(document.images).forEach(function(img){img.loading='eager';});}catch(e){}scan();}
function menuURLs(){return [].slice.call(box.querySelectorAll('img')).map(function(i){return i.src;});}
function waitMenuNew(prevURLs){if(window.__galleryWait){clearTimeout(window.__galleryWait);window.__galleryWait=null;}window.__galleryStopped=false;(function check(){if(window.__galleryStopped)return;refreshMenu();var now=menuURLs();var found=0;now.forEach(function(u){if(u&&prevURLs.indexOf(u)===-1)found++;});if(found>=3)return;window.__galleryWait=setTimeout(check,700);})();}
function goHash(p){var h='#'+p;if(location.hash===h){location.hash=h+'-'+Date.now();setTimeout(function(){location.hash=h;try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}},0);}else{location.hash=h;try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}}}
function step(d){var c=curPage();var n=c+d;if(n<1)n=1;var prevURLs=menuURLs();goHash(n);waitMenuNew(prevURLs);}
function jump(target){if(!target)return;var dir=target>0?1:-1;var steps=Math.ceil(Math.abs(target)/3);var i=0;function next(){if(i>=steps){var prevURLs=menuURLs();waitMenuNew(prevURLs);return;}i++;goHash(curPage()+dir*3);setTimeout(next,600);}next();}
btns.appendChild(mk('Prev','#6a1b9a',function(){step(-3)}));
btns.appendChild(mk('Next','#6a1b9a',function(){step(3)}));
var inp=document.createElement('input');inp.type='number';inp.step='1';inp.placeholder='Jump';inp.style.cssText='width:60px;padding:5px;border-radius:5px;border:none;font-size:11px;';
btns.appendChild(inp);
btns.appendChild(mk('Go','#00838f',function(){var v=parseInt(inp.value,10);if(isNaN(v))return;jump(v);}));
btns.appendChild(mk('Refresh','#1565c0',function(){refreshMenu();}));
var selBtn=mk('Select','#ef6c00',function(){selectMode=!selectMode;if(!selectMode){selected={};box.querySelectorAll('img').forEach(function(i){i.style.outline='none';i._cb.style.display='none';});}else{box.querySelectorAll('img').forEach(function(i){i._cb.style.display='flex';});}toggleBtn.style.display=selectMode?'inline-block':'none';delBtn.style.display=selectMode?'inline-block':'none';downBtn.style.display=selectMode?'inline-block':'none';selBtn.textContent=selectMode?'Cancel':'Select';});
var toggleBtn=mk('All','#00838f',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var all=imgs.every(function(i){return selected[i.src];});imgs.forEach(function(i){selected[i.src]=!all;i.style.outline=!all?'3px solid #2e7d32':'none';i._cb.style.background=!all?'#2e7d32':'rgba(0,0,0,.6)';});toggleBtn.textContent=all?'None':'All';});
var delBtn=mk('Delete','#c62828',function(){var imgs=[].slice.call(box.querySelectorAll('img'));imgs.forEach(function(i){if(selected[i.src]){deleted[i.src]=true;i.parentNode.remove();}});selected={};toggleBtn.textContent='All';});
var downBtn=mk('Download','#2e7d32',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var list=imgs.filter(function(i){return selected[i.src];});if(!list.length){alert('No selection');return;}var idx=0;function next(){if(idx>=list.length)return;var src=list[idx].src;idx++;show(src);var tries=0;(function check(){if(shot){var a=document.createElement('a');a.href=shot.toDataURL('image/png');a.download='img_'+idx+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(next,800);return;}tries++;if(tries>20){next();return;}setTimeout(check,500);})();}next();});
var hideBtn=mk('Hide','#455a64',function(){var hidden=box.style.display==='none';box.style.display=hidden?'grid':'none';hideBtn.textContent=hidden?'Hide':'Show';});
toggleBtn.style.display='none';delBtn.style.display='none';downBtn.style.display='none';
btns.appendChild(selBtn);btns.appendChild(toggleBtn);btns.appendChild(delBtn);btns.appendChild(downBtn);btns.appendChild(hideBtn);
btns.appendChild(mk('Remove','#c62828',function(){window.__galleryStopped=true;if(window.__galleryWait){clearTimeout(window.__galleryWait);window.__galleryWait=null;}box.remove();head.remove();sel.remove();document.removeEventListener('click',b,true);document.removeEventListener('auxclick',b,true);document.removeEventListener('pointerdown',b,true);try{document.removeEventListener('touchstart',b,{capture:true,passive:false});}catch(e){document.removeEventListener('touchstart',b,true);}window.open=oo;window.__galleryInit=false;if(window.__galleryObserver){window.__galleryObserver.disconnect();window.__galleryObserver=null;}if(window.__adObserver){window.__adObserver.disconnect();window.__adObserver=null;}}));
head.appendChild(btns);
scan();
document.body.appendChild(head);
document.body.appendChild(box);
document.body.appendChild(sel);
function show(src){
sel.innerHTML='';
shot=null;
var p=document.createElement('img');p.src=src;p.style.cssText='max-width:100%;height:auto;display:block;background:#000;';
var hint=document.createElement('div');hint.style.cssText='color:#aaa;font-size:12px;';
var bar=document.createElement('div');bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;justify-content:center;';
var ho=document.createElement('div');ho.style.cssText='position:absolute;left:-99999px;top:0;';
var im=document.createElement('img');im.src=src;im.style.display='block';
var fin=function(){var w=im.naturalWidth,h=im.naturalHeight;im.style.width=w+'px';im.style.height=h+'px';ho.style.width=w+'px';ho.style.height=h+'px';h2c(function(){html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000',scale:1,width:w,height:h}).then(function(c){shot=c;hint.textContent='Ready: '+c.width+'x'+c.height+' px';}).catch(function(){});});};
function h2c(cb){if(window.html2canvas){cb();return;}var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.onload=cb;document.head.appendChild(s);}
ho.appendChild(im);sel.appendChild(ho);
if(im.complete){fin();}else{im.onload=fin;}
bar.appendChild(mk('Download','#2e7d32',function(){if(!shot)return;var a=document.createElement('a');a.href=shot.toDataURL('image/png');a.download='captura_'+Math.random().toString(36).slice(2,8)+'.png';document.body.appendChild(a);a.click();a.remove();}));
bar.appendChild(mk('Close','#c62828',function(){sel.innerHTML='';shot=null;}));
sel.appendChild(p);sel.appendChild(hint);sel.appendChild(bar);
sel.scrollIntoView({behavior:'smooth',block:'start'});
}
if(!window.__galleryObserver){
window.__galleryObserver=new MutationObserver(function(){
if(!document.body.contains(head)){document.body.appendChild(head);document.body.appendChild(box);document.body.appendChild(sel);scan();}
});
window.__galleryObserver.observe(document.body,{childList:true,subtree:false});
}
}catch(e){}})();
