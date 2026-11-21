(function(){
var d=document,b=d.body;
// menu
var bu=d.querySelector('.burger'),nav=d.getElementById('nav');
if(bu){bu.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){b.classList.remove('menu-open');bu.setAttribute('aria-expanded','false')}});}
// drag-scroll helper
function dragScroll(el,onEnd){var down=false,sx=0,sl=0,moved=false;
el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=el.scrollLeft;});
window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;el.classList.add('drag');}el.scrollLeft=sl-dx;});
window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){el.classList.remove('drag');onEnd&&onEnd();}});
el.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
el.addEventListener('dragstart',function(e){e.preventDefault()});}
// carousels
d.querySelectorAll('[data-car]').forEach(function(c){var tr=c.querySelector('.tr'),dots=c.querySelectorAll('.dots i'),n=dots.length;
function idx(){return Math.round(tr.scrollLeft/tr.clientWidth)}
function upd(){var i=idx();dots.forEach(function(x,j){x.classList.toggle('on',j===i)})}
function go(i){i=(i+n)%n;tr.scrollTo({left:i*tr.clientWidth,behavior:'smooth'})}
tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
c.querySelector('.ar.l').addEventListener('click',function(){go(idx()-1)});
c.querySelector('.ar.r').addEventListener('click',function(){go(idx()+1)});
dragScroll(tr,function(){go(idx())});upd();});
// gallery
var g=d.getElementById('gal');if(g){dragScroll(g);d.querySelectorAll('[data-g]').forEach(function(x){x.addEventListener('click',function(){g.scrollBy({left:+x.dataset.g*g.clientWidth*.8,behavior:'smooth'})})});}
// lightbox
var lb=d.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),items=[],cur=0,last;
function show(i){cur=(i+items.length)%items.length;var im=items[cur];li.src=im.dataset.full;li.alt=im.alt;lp.textContent=im.alt;}
d.querySelectorAll('[data-lb]').forEach(function(btn){var im=btn.querySelector('img');items.push(im);var k=items.length-1;
btn.addEventListener('click',function(){last=btn;show(k);lb.classList.add('open');b.style.overflow='hidden';lb.querySelector('.x').focus();});});
function close(){lb.classList.remove('open');b.style.overflow='';li.src='';last&&last.focus();}
lb.querySelector('.x').addEventListener('click',close);
lb.querySelector('.pv').addEventListener('click',function(){show(cur-1)});
lb.querySelector('.nx').addEventListener('click',function(){show(cur+1)});
lb.addEventListener('click',function(e){if(e.target===lb)close()});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))});
// form preselect
var fu=d.getElementById('q-usl'),fm=d.getElementById('q-mat');
function sel(s,v){if(!s)return;for(var i=0;i<s.options.length;i++){if(s.options[i].text===v){s.selectedIndex=i;s.classList.add('pick');setTimeout(function(){s.classList.remove('pick')},1600);}}}
d.querySelectorAll('[data-usluga]').forEach(function(a){a.addEventListener('click',function(){sel(fu,a.dataset.usluga)})});
d.querySelectorAll('[data-material]').forEach(function(a){a.addEventListener('click',function(){sel(fm,a.dataset.material)})});
var qp=new URLSearchParams(location.search);if(qp.get('usluga'))sel(fu,qp.get('usluga'));
d.querySelectorAll('[data-usluga-go]').forEach(function(a){a.href='index.html?usluga='+encodeURIComponent(a.getAttribute('data-usluga-go'))+'#wycena'});
// file drop
var dr=d.getElementById('drop');if(dr){var fi=dr.querySelector('input'),dt=d.getElementById('drop-t');
fi.addEventListener('change',function(){if(fi.files.length){dt.textContent=Array.prototype.map.call(fi.files,function(f){return f.name}).join(', ');dr.classList.add('has');}});
['dragenter','dragover'].forEach(function(t){dr.addEventListener(t,function(){dr.classList.add('has')})});}
var qf=d.getElementById('qform');if(qf){qf.addEventListener('submit',function(e){e.preventDefault();var m=d.getElementById('demo');m.classList.add('show');m.scrollIntoView({block:'nearest',behavior:'smooth'});});}
// map facade
var mp=d.querySelector('[data-map]');if(mp){mp.addEventListener('click',function(){var f=d.createElement('iframe');f.src=mp.dataset.map;f.title='Mapa dojazdu Krusz-Tech';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mp.replaceWith(f);});}
// mobile bar
var mb=d.getElementById('mbar'),hero=d.querySelector('.hero,.phero');
if(mb&&hero&&'IntersectionObserver' in window){new IntersectionObserver(function(es){mb.classList.toggle('show',!es[0].isIntersecting)}).observe(hero);}
})();
