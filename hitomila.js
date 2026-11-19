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
function totalPages(){var s=document.getElementById('mobile-single-page-select');if(s&&s.options&&s.options.length)return s.options.length;var max=1;document.querySelectorAll('option[value],a[href*="#"]').forEach(function(n){var v=parseInt(n.value||(n.getAttribute('href')||'').replace(/^.*#/,''),10);if(!isNaN(v)&&v>max)max=v;});return max;}
function galleryTitle(){var t=(document.title||'').trim();t=t.replace(/\s*\|\s*Hitomi\.la.*$/i,'');t=t.replace(/<[^>]*>/g,' ');t=t.replace(/\s+/g,' ').trim();return t||'Gallery';}
function pad(n,len){len=len||3;var s=''+n;while(s.length<len)s='0'+s;return s;}
function fname(page){return galleryTitle().replace(/[\\/:*?"<>|]+/g,'_')+'_'+pad(page,3)+'.png';}
function isSVG(u){return /\.svg(\?|#|$)/i.test(u||'');}
function b64ToBlob(b64){var p=b64.split(',');var mime=p[0].match(/:(.*?);/)[1];var bin=atob(p[1]);var arr=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return new Blob([arr],{type:mime});}
var seen=[];var deleted={};var selectMode=false;var selected={};var b64map={};
var lastScanKey='';
var head=document.createElement('div');head.style.cssText='background:#111;color:#fff;font:bold 14px sans-serif;padding:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:nowrap;overflow-x:auto;';
['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup'].forEach(function(ev){head.addEventListener(ev,function(e){e.stopPropagation();},{passive:true});});
head.appendChild(document.createTextNode('Images'));
var countEl=document.createElement('span');countEl.textContent=' (0)';countEl.style.cssText='color:#aaa;font-size:12px;margin-left:4px;';head.appendChild(countEl);
function updateCount(){countEl.textContent=' ('+seen.length+')';}
var btns=document.createElement('div');btns.style.cssText='display:flex;gap:2px;flex-wrap:nowrap;align-items:center;';
var box=document.createElement('div');box.style.cssText='background:#111;padding:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-family:sans-serif;width:100%;box-sizing:border-box;';
['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup'].forEach(function(ev){box.addEventListener(ev,function(e){e.stopPropagation();},{passive:true});});
var sel=document.createElement('div');sel.style.cssText='background:#000;padding:10px;display:flex;flex-direction:column;align-items:center;gap:8px;font-family:sans-serif;width:100%;box-sizing:border-box;overflow:hidden;';
function loadH2C(cb){if(window.html2canvas){cb();return;}var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.onload=cb;s.onerror=function(){alert('No se pudo cargar html2canvas (CSP?)');};document.head.appendChild(s);}
function toB64(src){return new Promise(function(resolve){var holder=document.createElement('div');holder.style.cssText='position:fixed;left:-99999px;top:0;background:#000;';var im=document.createElement('img');im.src=src;im.loading='eager';im.decoding='sync';im.style.display='block';var finish=function(){var w=im.naturalWidth,h=im.naturalHeight;if(!w||!h){holder.remove();resolve(null);return;}im.style.width=w+'px';im.style.height=h+'px';holder.style.width=w+'px';holder.style.height=h+'px';loadH2C(function(){html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000000',scale:1,width:w,height:h,logging:false}).then(function(c){holder.remove();resolve(c.toDataURL('image/png'));}).catch(function(){holder.remove();resolve(null);});});};holder.appendChild(im);document.body.appendChild(holder);if(im.complete&&im.naturalWidth>0){finish();}else{im.onload=finish;im.onerror=function(){holder.remove();resolve(null);};}});}
function visorImgs(){return [].slice.call(document.images).filter(function(i){return !box.contains(i)&&!sel.contains(i)&&i.naturalWidth>0&&!isSVG(i.currentSrc||i.src);});}
function visorURLs(){return visorImgs().map(function(i){return i.currentSrc||i.src;});}
function visorPageMap(){var cur=curPage();var max=totalPages();var imgs=visorImgs();var pages;if(imgs.length>=3){pages=[cur-1,cur,cur+1];}else if(imgs.length===2){if(cur<=1)pages=[1,2];else if(cur>=max)pages=[max-1,max];else pages=[cur-1,cur];}else{pages=[cur];}var order;if(imgs.length===3)order=[2,0,1];else if(imgs.length===2)order=[1,0];else order=[0];var out=[];for(var i=0;i<order.length&&i<imgs.length;i++){var p=pages[i];if(p<1||p>max)continue;out.push({img:imgs[order[i]],url:imgs[order[i]].currentSrc||imgs[order[i]].src,page:p});}out.sort(function(a,b){return a.page-b.page;});var pagesSeen={};out=out.filter(function(o){if(pagesSeen[o.page])return false;pagesSeen[o.page]=true;return true;});return out;}
function add(src,page){if(!src)return;if(isSVG(src))return;if(seen.indexOf(src)!==-1)return;if(deleted[src])return;seen.push(src);updateCount();var w=document.createElement('div');w.style.cssText='position:relative;';var t=document.createElement('img');t.src=src;t.loading='lazy';t.dataset.src=src;t.dataset.page=page;t.style.cssText='width:100%;height:110px;object-fit:cover;display:block;cursor:pointer;border:1px solid #333;border-radius:6px;';t.onclick=function(){if(selectMode){selected[src]=!selected[src];t.style.outline=selected[src]?'3px solid #2e7d32':'none';}else{showOne(src)}};w.appendChild(t);var lbl=document.createElement('div');lbl.textContent='Pág. '+page;lbl.style.cssText='color:#ddd;font-size:11px;text-align:center;margin-top:3px;';w.appendChild(lbl);var cb=document.createElement('div');cb.style.cssText='position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,.6);border:2px solid #fff;display:none;align-items:center;justify-content:center;color:#fff;font-size:12px;';cb.textContent='✓';w.appendChild(cb);t._cb=cb;box.appendChild(w);toB64(src).then(function(b64){if(b64){b64map[src]=b64;t.src=b64;t.dataset.b64='1';}});}
function scan(){var map=visorPageMap();var key=map.map(function(o){return o.page+'|'+o.url;}).join(',');if(key===lastScanKey)return;lastScanKey=key;map.forEach(function(o){add(o.url,o.page);});}
function resetGrid(){seen=[];lastScanKey='';box.innerHTML='';updateCount();scan();}
function refreshMenu(){try{[].slice.call(document.images).forEach(function(img){img.loading='eager';});}catch(e){}scan();}
function waitVisorNew(prev,cb){var tries=0;var stable=0;var last='';(function check(){if(window.__galleryStopped){if(cb)cb();return;}var now=visorURLs();var sig=now.join(',');if(sig===last)stable++;else stable=0;last=sig;var found=0;now.forEach(function(u){if(u&&prev.indexOf(u)===-1)found++;});if((found>=3&&stable>=1)||tries>=40){resetGrid();if(cb)cb();return;}tries++;setTimeout(check,700);})();}
function goHash(p){var h='#'+p;if(location.hash===h){location.hash=h+'-'+Date.now();setTimeout(function(){location.hash=h;try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}},0);}else{location.hash=h;try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}}}
function step(d){var c=curPage();var n=c+d;if(n<1)n=1;var prev=visorURLs();goHash(n);waitVisorNew(prev);}
function jump(target){if(!target)return;var dir=target>0?1:-1;var steps=Math.ceil(Math.abs(target)/3);var i=0;function stepOnce(){if(i>=steps){return;}var prev=visorURLs();i++;goHash(curPage()+dir*3);waitVisorNew(prev,function(){setTimeout(stepOnce,300);});}stepOnce();}
btns.appendChild(mk('Prev','#6a1b9a',function(){step(-3)}));
btns.appendChild(mk('Next','#6a1b9a',function(){step(3)}));
var inp=document.createElement('input');inp.type='number';inp.step='1';inp.placeholder='Jump';inp.style.cssText='width:60px;padding:5px;border-radius:5px;border:none;font-size:11px;';
btns.appendChild(inp);
btns.appendChild(mk('Go','#00838f',function(){var v=parseInt(inp.value,10);if(isNaN(v))return;jump(v);}));
btns.appendChild(mk('Refresh','#1565c0',function(){resetGrid();}));
var selBtn=mk('Select','#ef6c00',function(){selectMode=!selectMode;if(!selectMode){selected={};box.querySelectorAll('img').forEach(function(i){i.style.outline='none';i._cb.style.display='none';});}else{box.querySelectorAll('img').forEach(function(i){i._cb.style.display='flex';});}toggleBtn.style.display=selectMode?'inline-block':'none';delBtn.style.display=selectMode?'inline-block':'none';downBtn.style.display=selectMode?'inline-block':'none';selBtn.textContent=selectMode?'Cancel':'Select';});
var toggleBtn=mk('All','#00838f',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var all=imgs.every(function(i){return selected[i.dataset.src||i.src];});imgs.forEach(function(i){var k=i.dataset.src||i.src;selected[k]=!all;i.style.outline=!all?'3px solid #2e7d32':'none';i._cb.style.background=!all?'#2e7d32':'rgba(0,0,0,.6)';});toggleBtn.textContent=all?'None':'All';});
var delBtn=mk('Delete','#c62828',function(){var imgs=[].slice.call(box.querySelectorAll('img'));imgs.forEach(function(i){var k=i.dataset.src||i.src;if(selected[k]){deleted[k]=true;i.parentNode.remove();}});selected={};toggleBtn.textContent='All';updateCount();});
var downBtn=mk('Download','#2e7d32',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var list=imgs.filter(function(i){return selected[i.dataset.src||i.src];});if(!list.length){alert('No selection');return;}var idx=0;function next(){if(idx>=list.length)return;var el=list[idx];idx++;var k=el.dataset.src||el.src;var page=parseInt(el.dataset.page,10)||1;if(el.dataset.b64==='1'&&b64map[k]){var blob=b64ToBlob(b64map[k]);var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);setTimeout(next,800);}else{showOne(k,true);var tries=0;(function check(){if(window.__galleryShot){var canvas=window.__galleryShot;canvas.toBlob(function(blob){if(blob){var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);}window.__galleryShot=null;setTimeout(next,800);},'image/png');return;}tries++;if(tries>30){setTimeout(next,800);return;}setTimeout(check,500);})();}}next();});
var hideBtn=mk('Hide','#455a64',function(){var hidden=box.style.display==='none';box.style.display=hidden?'grid':'none';hideBtn.textContent=hidden?'Hide':'Show';});
toggleBtn.style.display='none';delBtn.style.display='none';downBtn.style.display='none';
btns.appendChild(selBtn);btns.appendChild(toggleBtn);btns.appendChild(delBtn);btns.appendChild(downBtn);btns.appendChild(hideBtn);
btns.appendChild(mk('Remove','#c62828',function(){window.__galleryStopped=true;if(window.__galleryWait){clearTimeout(window.__galleryWait);window.__galleryWait=null;}box.remove();head.remove();sel.remove();document.removeEventListener('click',b,true);document.removeEventListener('auxclick',b,true);document.removeEventListener('pointerdown',b,true);try{document.removeEventListener('touchstart',b,{capture:true,passive:false});}catch(e){document.removeEventListener('touchstart',b,true);}window.open=oo;window.__galleryInit=false;if(window.__galleryObserver){window.__galleryObserver.disconnect();window.__galleryObserver=null;}if(window.__adObserver){window.__adObserver.disconnect();window.__adObserver=null;}}));
head.appendChild(btns);
scan();
document.body.appendChild(head);
document.body.appendChild(box);
document.body.appendChild(sel);
function showOne(src,keep,fromDir){
window.__galleryShot=null;
if(window.__galleryHolder&&window.__galleryHolder.parentNode)window.__galleryHolder.parentNode.removeChild(window.__galleryHolder);
sel.innerHTML='';
var page=null;
var thumbs=box.querySelectorAll('img[data-src]');
for(var i=0;i<thumbs.length;i++){if(thumbs[i].dataset.src===src){page=parseInt(thumbs[i].dataset.page,10);break;}}
if(!page)page=curPage();
var useSrc=b64map[src]||src;
var app=document.createElement('div');
app.style.cssText='background:#000;display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px;box-sizing:border-box;';
var holder=document.createElement('div');
holder.style.cssText='position:fixed;left:-99999px;top:0;background:#000;';
window.__galleryHolder=holder;
var im=document.createElement('img');
im.src=useSrc;im.loading='eager';im.decoding='sync';im.style.cssText='display:block;';
var pre=document.createElement('img');
pre.style.cssText='max-width:100%;height:auto;display:block;border:1px solid #444;background:#000;will-change:transform,opacity;';
pre.src=useSrc;
var hint=document.createElement('div');
hint.style.cssText='color:#aaa;font-size:12px;text-align:center;max-width:90vw;';
var bar=document.createElement('div');
bar.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
var shot=null;
var curIdx=seen.indexOf(src);
if(curIdx<0)curIdx=0;
function go(d){if(!pre.parentNode)return;pre.style.transition='transform .25s ease, opacity .25s ease';pre.style.transform='translateX('+(d>0?'-100%':'100%')+')';pre.style.opacity='0';setTimeout(function(){var n=(curIdx+d+seen.length)%seen.length;curIdx=n;showOne(seen[n],false,d);},250);}
var finish=function(){var w=im.naturalWidth,h=im.naturalHeight;if(!w||!h){hint.textContent='Image not loaded';return;}im.style.width=w+'px';im.style.height=h+'px';holder.style.width=w+'px';holder.style.height=h+'px';loadH2C(function(){html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000000',scale:1,width:w,height:h,logging:false}).then(function(c){shot=c;window.__galleryShot=c;hint.textContent='Ready: '+c.width+'x'+c.height+' px';}).catch(function(e){hint.textContent='CORS: cannot capture';});});};
holder.appendChild(im);
document.body.appendChild(holder);
if(im.complete&&im.naturalWidth>0){finish();}else{im.onload=finish;im.onerror=function(){hint.textContent='Image failed to load';};}
bar.appendChild(mk('Download','#2e7d32',function(){if(!shot){hint.textContent='No capture yet. Wait for Ready.';return;}shot.toBlob(function(blob){if(!blob){hint.textContent='Blob failed';return;}var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);hint.textContent='Download triggered ('+fname(page)+')';},'image/png');}));
bar.appendChild(mk('Close','#c62828',function(){if(holder.parentNode)holder.parentNode.removeChild(holder);sel.innerHTML='';window.__galleryShot=null;}));
app.appendChild(pre);app.appendChild(hint);app.appendChild(bar);
sel.appendChild(app);
sel.scrollIntoView({behavior:'smooth',block:'start'});
if(fromDir){pre.style.transform='translateX('+(fromDir>0?'100%':'-100%')+')';pre.style.opacity='0';requestAnimationFrame(function(){requestAnimationFrame(function(){pre.style.transition='transform .25s ease, opacity .25s ease';pre.style.transform='translateX(0)';pre.style.opacity='1';});});}
var sx=0,sy=0,sw=false;
['touchstart','pointerdown'].forEach(function(ev){app.addEventListener(ev,function(e){if(e.touches&&e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;sw=true;}else if(e.clientX!==undefined){sx=e.clientX;sy=e.clientY;sw=true;}e.stopPropagation();},{passive:true});});
['touchend','pointerup'].forEach(function(ev){app.addEventListener(ev,function(e){if(!sw)return;sw=false;var x=e.changedTouches?e.changedTouches[0].clientX:e.clientX;var y=e.changedTouches?e.changedTouches[0].clientY:e.clientY;var dx=x-sx,dy=y-sy;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){go(dx<0?1:-1);}e.stopPropagation();},{passive:true});});
}
if(!window.__galleryObserver){
window.__galleryObserver=new MutationObserver(function(){
if(!document.body.contains(head)){document.body.appendChild(head);document.body.appendChild(box);document.body.appendChild(sel);scan();}
});
window.__galleryObserver.observe(document.body,{childList:true,subtree:false});
}
}catch(e){}})();
