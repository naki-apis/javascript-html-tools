(function(){try{if(window.__galleryInit){return;}window.__galleryInit=true;
var so=function(u){try{return new URL(u,location.href).origin===location.origin}catch(e){return false}};
var fl=function(e){while(e&&e!==document){if(e.tagName==='A')return e;e=e.parentNode}return null};
var b=function(e){var a=fl(e.target);if(!a)return;var h=a.getAttribute('href')||'';var tg=a.getAttribute('target')||'';if(tg&&tg!=='_self'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return;}if(!h||h[0]==='#'||h.indexOf('javascript:')===0||so(h))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()};
document.addEventListener('click',b,true);
document.addEventListener('auxclick',b,true);
document.addEventListener('pointerdown',b,true);
document.addEventListener('touchstart',b,{capture:true,passive:false});
document.addEventListener('contextmenu',function(e){var a=fl(e.target);if(a){e.preventDefault();}},true);
document.addEventListener('mousedown',function(e){if(e.button===1){var a=fl(e.target);if(a&&(a.getAttribute('target')||'')!=='_self'){e.preventDefault();e.stopPropagation();}}},true);
var oo=window.open;window.open=function(){return null};
document.addEventListener('submit',function(e){var f=e.target;if(f&&(f.getAttribute('target')||'')!=='_self'){e.preventDefault();e.stopPropagation();}},true);
function mk(t,bg,f){var x=document.createElement('button');x.textContent=t;x.style.cssText='padding:10px 14px;border:none;border-radius:6px;color:#fff;background:'+bg+';margin:4px;font-size:14px;';x.onclick=f;return x;}
var seen=[];
var head=document.createElement('div');head.style.cssText='background:#111;color:#fff;font:bold 16px sans-serif;padding:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;';
head.appendChild(document.createTextNode('Images'));
var btns=document.createElement('div');
btns.appendChild(mk('Refresh','#1565c0',function(){scan()}));
btns.appendChild(mk('Remove','#c62828',function(){
box.remove();head.remove();sel.remove();
document.removeEventListener('click',b,true);
document.removeEventListener('auxclick',b,true);
document.removeEventListener('pointerdown',b,true);
document.removeEventListener('touchstart',b,{capture:true,passive:false});
window.open=oo;window.__galleryInit=false;
if(window.__galleryObserver){window.__galleryObserver.disconnect();window.__galleryObserver=null;}
}));
head.appendChild(btns);
var box=document.createElement('div');box.style.cssText='background:#111;padding:10px;display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;font-family:sans-serif;width:100%;box-sizing:border-box;';
var sel=document.createElement('div');sel.style.cssText='background:#000;padding:10px;display:flex;flex-direction:column;align-items:center;gap:8px;font-family:sans-serif;width:100%;box-sizing:border-box;';
function add(src){if(seen.indexOf(src)!==-1)return;seen.push(src);var t=document.createElement('img');t.src=src;t.loading='lazy';t.style.cssText='width:100%;height:110px;object-fit:cover;cursor:pointer;border:1px solid #333;border-radius:6px;display:block;';t.onclick=function(){show(src)};box.appendChild(t);}
function scan(){[].slice.call(document.images).forEach(function(img){if(img.src&&img.naturalWidth>0)add(img.currentSrc||img.src);});}
scan();
document.body.appendChild(head);
document.body.appendChild(box);
document.body.appendChild(sel);
function show(src){
sel.innerHTML='';
var p=document.createElement('img');p.src=src;p.style.cssText='max-width:100%;height:auto;display:block;background:#000;';
var hint=document.createElement('div');hint.style.cssText='color:#aaa;font-size:12px;';
var bar=document.createElement('div');bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;justify-content:center;';
var ho=document.createElement('div');ho.style.cssText='position:absolute;left:-99999px;top:0;';
var shot=null;
function h2c(cb){if(window.html2canvas){cb();return;}var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.onload=cb;document.head.appendChild(s);}
var im=document.createElement('img');im.src=src;im.style.display='block';
var fin=function(){var w=im.naturalWidth,h=im.naturalHeight;im.style.width=w+'px';im.style.height=h+'px';ho.style.width=w+'px';ho.style.height=h+'px';h2c(function(){html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000',scale:1,width:w,height:h}).then(function(c){shot=c;hint.textContent='Ready: '+c.width+'x'+c.height+' px';}).catch(function(){});});};
ho.appendChild(im);sel.appendChild(ho);
if(im.complete){fin();}else{im.onload=fin;}
bar.appendChild(mk('Clear','#455a64',function(){sel.innerHTML='';}));
bar.appendChild(mk('Capture','#2e7d32',function(){if(!shot)return;var a=document.createElement('a');a.href=shot.toDataURL('image/png');a.download='captura_'+Math.random().toString(36).slice(2,8)+'.png';document.body.appendChild(a);a.click();a.remove();}));
bar.appendChild(mk('Close','#c62828',function(){sel.innerHTML='';}));
sel.appendChild(p);sel.appendChild(hint);sel.appendChild(bar);
sel.scrollIntoView({behavior:'smooth',block:'start'});
}
if(!window.__galleryObserver){
window.__galleryObserver=new MutationObserver(function(){
if(!document.body.contains(head)){
document.body.appendChild(head);
document.body.appendChild(box);
document.body.appendChild(sel);
scan();
}
});
window.__galleryObserver.observe(document.body,{childList:true,subtree:false});
}
}catch(e){}})();
