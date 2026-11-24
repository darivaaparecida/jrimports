/* JRImports v2 — loja estática. "Banco" local em localStorage (chaves jrimports2_*).
   Sem backend, sem pagamento simulado. Pedidos ficam "Aguardando pagamento". */
const K={products:'jrimports2_products',categories:'jrimports2_categories',cart:'jrimports2_cart',orders:'jrimports2_orders',customers:'jrimports2_customers',coupons:'jrimports2_coupons',settings:'jrimports2_settings',favorites:'jrimports2_favorites',recent:'jrimports2_recent',newsletter:'jrimports2_newsletter',session:'jrimports2_session'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const BRL=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(k,fb){try{const v=JSON.parse(localStorage.getItem(k));return v??fb}catch{return fb}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(t._h);t._h=setTimeout(()=>t.hidden=true,2800)}
const U=(id,w=800)=>`https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
const SEED_CATS=[
 {id:'smartphones',name:'Smartphones',img:U('photo-1592750475338-74b7b21085ab',800),desc:'Os lançamentos mais desejados'},
 {id:'smartwatches',name:'Smartwatches',img:U('photo-1546868871-7041f2a55e12',800),desc:'Saúde e estilo no pulso'},
 {id:'audio',name:'Áudio e fones',img:U('photo-1505740420928-5e560c06d30e',800),desc:'Som imersivo premium'},
 {id:'informatica',name:'Informática',img:U('photo-1496181133206-80ce9b88a853',800),desc:'Notebooks e periféricos'},
 {id:'acessorios',name:'Acessórios',img:U('photo-1583394838336-acd977736f90',800),desc:'Para completar seu setup'},
 {id:'casa',name:'Casa e tecnologia',img:U('photo-1558089687-f282ffcbc126',800),desc:'Casa inteligente'},
 {id:'ofertas',name:'Ofertas especiais',img:U('photo-1607083206869-4c7672e72a8a',800),desc:'Preços especiais por tempo limitado'}];
const SEED_PRODUCTS=[
 {id:'p01',name:'Smartphone Aurora X Pro 256GB',category:'smartphones',price:4599,oldPrice:5499,stock:12,sku:'JR-SM-001',badge:'OFERTA',featured:true,isNew:false,sales:0,createdAt:'2026-11-20',images:[U('photo-1592750475338-74b7b21085ab'),U('photo-1511707171634-5f897ff02aa9')],desc:'Tela AMOLED 120Hz, câmera tripla de 108MP e bateria para o dia todo. Importado, com nota fiscal.',specs:'Tela 6,7" AMOLED • 256GB • 12GB RAM • 5G • Bateria 5.000mAh',variations:['Preto','Dourado','Azul']},
 {id:'p02',name:'Smartwatch Pulse S2 GPS',category:'smartwatches',price:1299,oldPrice:1599,stock:20,sku:'JR-SW-002',badge:'OFERTA',featured:true,isNew:true,sales:0,createdAt:'2026-11-22',images:[U('photo-1546868871-7041f2a55e12'),U('photo-1579586337278-3befd40fd17a')],desc:'Monitoramento de saúde, GPS integrado e bateria de até 10 dias.',specs:'Tela AMOLED 1,43" • GPS • Resistente à água 5ATM • Bluetooth 5.3',variations:['Preto','Prata']},
 {id:'p03',name:'Fone TWS Eclipse Pro com ANC',category:'audio',price:799,oldPrice:999,stock:30,sku:'JR-AU-003',badge:'OFERTA',featured:true,isNew:false,sales:0,createdAt:'2026-11-18',images:[U('photo-1505740420928-5e560c06d30e'),U('photo-1590658268037-6bf12165a8df')],desc:'Cancelamento ativo de ruído, graves profundos e estojo com carga rápida.',specs:'ANC • Bluetooth 5.3 • Até 30h com estojo • IPX5',variations:['Preto','Branco']},
 {id:'p04',name:'Notebook Ultra Slim 14" 16GB / 512GB',category:'informatica',price:6899,oldPrice:7999,stock:6,sku:'JR-NB-004',badge:'OFERTA',featured:true,isNew:false,sales:0,createdAt:'2026-11-15',images:[U('photo-1496181133206-80ce9b88a853'),U('photo-1611186871348-b1ce696e52c9')],desc:'Leve, rápido e com tela Full HD antirreflexo. Ideal para trabalho e estudos.',specs:'14" Full HD • 16GB RAM • SSD 512GB • Wi-Fi 6',variations:['Cinza','Prata']},
 {id:'p05',name:'Teclado Mecânico RGB ABNT2',category:'informatica',price:549,oldPrice:0,stock:25,sku:'JR-KB-005',badge:'',featured:true,isNew:true,sales:0,createdAt:'2026-11-23',images:[U('photo-1587829741301-dc798b83add3'),U('photo-1618384887929-16ec33fab9ef')],desc:'Switches mecânicos, iluminação RGB personalizável e construção em alumínio.',specs:'Switch Blue • RGB • USB-C • ABNT2',variations:['Preto']},
 {id:'p06',name:'Carregador GaN 65W USB-C Duplo',category:'acessorios',price:249,oldPrice:329,stock:40,sku:'JR-AC-006',badge:'OFERTA',featured:false,isNew:false,sales:0,createdAt:'2026-11-10',images:[U('photo-1583863788434-e58a36330cf0'),U('photo-1619489646924-b4fce76b1db5')],desc:'Carrega notebook e celular ao mesmo tempo, com proteção contra sobrecarga.',specs:'65W GaN • 2x USB-C • 1x USB-A',variations:['Preto','Branco']},
 {id:'p07',name:'Caixa de Som Portátil Boom 30W',category:'audio',price:599,oldPrice:0,stock:15,sku:'JR-AU-007',badge:'NOVO',featured:false,isNew:true,sales:0,createdAt:'2026-11-24',images:[U('photo-1608043152269-423dbba4e7e1'),U('photo-1589003077984-894e133dabab')],desc:'Som potente, resistente à água e bateria de até 18 horas.',specs:'30W • IP67 • Bluetooth 5.3 • 18h de bateria',variations:['Preto','Azul']},
 {id:'p08',name:'Aspirador Robô Smart Clean',category:'casa',price:1899,oldPrice:2299,stock:8,sku:'JR-CS-008',badge:'OFERTA',featured:true,isNew:false,sales:0,createdAt:'2026-11-12',images:[U('photo-1558089687-f282ffcbc126'),U('photo-1589256469067-ea99122bbdc4')],desc:'Mapeamento inteligente, controle por app e retorno automático à base.',specs:'Mapeamento a laser • App • 120 min de autonomia',variations:['Branco']},
 {id:'p09',name:'Power Bank 20.000mAh Carga Rápida',category:'acessorios',price:299,oldPrice:399,stock:50,sku:'JR-AC-009',badge:'OFERTA',featured:false,isNew:false,sales:0,createdAt:'2026-11-08',images:[U('photo-1609091839311-d5365f9ff1c5'),U('photo-1619489646924-b4fce76b1db5')],desc:'Carrega até 3 dispositivos ao mesmo tempo, com display digital.',specs:'20.000mAh • 22,5W • USB-C + 2x USB-A',variations:['Preto']},
 {id:'p10',name:'Smartphone Lite 128GB',category:'smartphones',price:2199,oldPrice:0,stock:18,sku:'JR-SM-010',badge:'',featured:false,isNew:true,sales:0,createdAt:'2026-11-21',images:[U('photo-1511707171634-5f897ff02aa9'),U('photo-1598327105666-5b89351aff97')],desc:'Ótimo custo-benefício: tela grande, câmera de 50MP e bateria duradoura.',specs:'6,5" • 128GB • 8GB RAM • 4G/5G',variations:['Preto','Verde']},
 {id:'p11',name:'Hub USB-C 7 em 1 4K',category:'informatica',price:399,oldPrice:499,stock:22,sku:'JR-HB-011',badge:'OFERTA',featured:false,isNew:false,sales:0,createdAt:'2026-11-14',images:[U('photo-1625723044792-44de16ccb4e9'),U('photo-1618410320928-25228d811631')],desc:'HDMI 4K, USB 3.0, leitor de cartão e carregamento pass-through.',specs:'HDMI 4K • 3x USB • SD/microSD • USB-C PD 100W',variations:['Cinza']},
 {id:'p12',name:'Luminária Smart RGB com Alexa',category:'casa',price:349,oldPrice:0,stock:28,sku:'JR-CS-012',badge:'NOVO',featured:false,isNew:true,sales:0,createdAt:'2026-11-24',images:[U('photo-1507473885765-e6ed057f782c'),U('photo-1513506003901-1e6a229e2d15')],desc:'Iluminação colorida controlável por voz e app, com modos de ambiente.',specs:'RGB • Wi-Fi • Compatível com Alexa e Google',variations:['Branco']}];
const SEED_SETTINGS={storeName:'JRImports',whatsapp:'',instagram:'',email:'contato@jrimports.com.br',gateway:'Não configurado — Mercado Pago / InfinitePay (configurar credenciais no backend)',shippingNote:'Frete e prazos calculados no checkout conforme o CEP.',freeShippingAbove:0};
const SEED_COUPONS=[{code:'BEMVINDO10',type:'percent',value:10,validUntil:'2027-12-31',maxUses:100,uses:0,minValue:0,active:true}];
function seed(){if(!localStorage.getItem(K.products))save(K.products,SEED_PRODUCTS);if(!localStorage.getItem(K.categories))save(K.categories,SEED_CATS);if(!localStorage.getItem(K.settings))save(K.settings,SEED_SETTINGS);if(!localStorage.getItem(K.coupons))save(K.coupons,SEED_COUPONS);if(!localStorage.getItem(K.cart))save(K.cart,[]);if(!localStorage.getItem(K.orders))save(K.orders,[]);if(!localStorage.getItem(K.customers))save(K.customers,[]);if(!localStorage.getItem(K.favorites))save(K.favorites,[]);if(!localStorage.getItem(K.recent))save(K.recent,[])}
seed();
const getProducts=()=>load(K.products,[]), getCats=()=>load(K.categories,[]), getSettings=()=>load(K.settings,SEED_SETTINGS);
const getCart=()=>load(K.cart,[]), getFavs=()=>load(K.favorites,[]), getOrders=()=>load(K.orders,[]);
let featuredFilter='todos', catalogPage=1; const PER_PAGE=8; let appliedCoupon=null;
let catalogState={q:'',cat:'todas',min:'',max:'',avail:false,offer:false,sort:'relevancia'};
function discount(p){return p.oldPrice&&p.oldPrice>p.price?Math.round((1-p.price/p.oldPrice)*100):0}
function cardHTML(p){
 const d=discount(p), fav=getFavs().includes(p.id);
 return `<article class="product-card reveal visible" data-id="${p.id}">
  <img src="${esc(p.images[0])}" alt="${esc(p.name)}" loading="lazy" data-open="${p.id}">
  <div class="pc-body">
   ${p.badge?`<span class="badge ${p.badge==='NOVO'?'new':''}">${esc(p.badge)}</span>`:''}
   <span class="pc-cat">${esc(catName(p.category))}</span>
   <h3 data-open="${p.id}">${esc(p.name)}</h3>
   <p>${p.oldPrice?`<span class="old-price">${BRL(p.oldPrice)}</span>`:''}<span class="pc-price">${BRL(p.price)}</span> ${d?`<span class="discount">-${d}%</span>`:''}</p>
   <p class="installments">em até 12x de ${BRL(p.price/12)} sem juros*</p>
   <p class="stock ${p.stock<=5?'low':''}">${p.stock>0?`Em estoque (${p.stock} un.)`:'Esgotado'}</p>
   <div class="pc-actions"><button class="btn btn-gold" data-add="${p.id}" ${p.stock<=0?'disabled':''}>Adicionar</button><button class="icon-btn" data-fav="${p.id}" aria-label="Favoritar">${fav?'♥':'♡'}</button><button class="btn btn-outline" data-open="${p.id}">Ver</button></div>
  </div></article>`}
function catName(id){const c=getCats().find(c=>c.id===id);return c?c.name:id}
function renderCategories(){
 $('#categoriesGrid').innerHTML=getCats().map(c=>`<button class="cat-card" data-cat="${c.id}"><img src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy"><div><strong>${esc(c.name)}</strong><span>${esc(c.desc)}</span></div></button>`).join('');
 $('#categoriesMenu').innerHTML=getCats().map(c=>`<button data-cat="${c.id}">${esc(c.name)}</button>`).join('');
 $('#catalogCats').innerHTML=`<label class="check"><input type="radio" name="cat" value="todas" checked> Todas</label>`+getCats().filter(c=>c.id!=='ofertas').map(c=>`<label class="check"><input type="radio" name="cat" value="${c.id}"> ${esc(c.name)}</label>`).join('');
 $('#heroProductCount').textContent=getProducts().length; $('#heroCatCount').textContent=getCats().length;
}
function sortList(list,mode){const l=[...list];if(mode==='menor')l.sort((a,b)=>a.price-b.price);if(mode==='maior')l.sort((a,b)=>b.price-a.price);if(mode==='novidades')l.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));return l}
function renderFeatured(){
 let list=getProducts().filter(p=>p.featured);
 if(featuredFilter==='mais-vendidos')list=sortList(list.filter(p=>(p.sales||0)>0),'relevancia').length?sortList(list.filter(p=>(p.sales||0)>0),'relevancia'):[]; // sem vendas reais, fica vazio (honesto)
 if(featuredFilter==='novidades')list=list.filter(p=>p.isNew);
 if(featuredFilter==='ofertas')list=list.filter(p=>p.oldPrice>p.price);
 list=sortList(list,$('#sortSelect').value);
 const grid=$('#featuredGrid'); grid.innerHTML=list.map(cardHTML).join('');
 $('#featuredEmpty').hidden=list.length>0;
 if(featuredFilter==='mais-vendidos'&&!list.length){$('#featuredEmpty').hidden=false;$('#featuredEmpty').querySelector('p').textContent='Ainda não há vendas registradas. Os mais vendidos aparecerão aqui com dados reais.'}
}
function renderBest(){const list=sortList(getProducts().filter(p=>(p.sales||0)>0),'relevancia').slice(0,4);$('#bestGrid').innerHTML=list.map(cardHTML).join('');$('#bestEmpty').hidden=list.length>0}
function renderNew(){$('#newGrid').innerHTML=sortList(getProducts().filter(p=>p.isNew),'novidades').map(cardHTML).join('')}
function filteredCatalog(){
 let list=getProducts();
 const s=catalogState;
 if(s.cat!=='todas')list=list.filter(p=>p.category===s.cat);
 if(s.q){const q=s.q.toLowerCase();list=list.filter(p=>(p.name+' '+p.desc).toLowerCase().includes(q))}
 if(s.min!=='')list=list.filter(p=>p.price>=+s.min);
 if(s.max!=='')list=list.filter(p=>p.price<=+s.max);
 if(s.avail)list=list.filter(p=>p.stock>0);
 if(s.offer)list=list.filter(p=>p.oldPrice>p.price);
 return sortList(list,s.sort);
}
function renderCatalog(){
 const list=filteredCatalog(); const total=list.length;
 $('#catalogCount').textContent=`${total} produto(s)`;
 const page=list.slice(0,catalogPage*PER_PAGE);
 $('#catalogGrid').innerHTML=page.map(cardHTML).join('');
 $('#catalogEmpty').hidden=total>0;
 $('#loadMoreBtn').style.display=catalogPage*PER_PAGE<total?'block':'none';
 const pages=Math.max(1,Math.ceil(total/PER_PAGE));
 $('#catalogPagination').innerHTML=Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" class="${catalogPage===i+1?'active':''}">${i+1}</button>`).join('');
}
function renderFavs(){
 const favs=getFavs().map(id=>getProducts().find(p=>p.id===id)).filter(Boolean);
 $('#favList').innerHTML=favs.map(cardHTML).join(''); $('#favEmpty').hidden=favs.length>0;
 $('#favCount').textContent=favs.length; $('#favCount').hidden=!favs.length;
 $$('#favCount').forEach(e=>e.textContent=favs.length);
}
function updateCounts(){const n=getCart().reduce((a,i)=>a+i.qty,0);$('#cartCount').textContent=n;$('#cartCount').hidden=!n;renderFavs()}
function addToCart(id,qty=1,variation=''){
 const p=getProducts().find(x=>x.id===id); if(!p||p.stock<=0)return toast('Produto indisponível.');
 const cart=getCart(); const ex=cart.find(i=>i.id===id&&i.variation===variation);
 if(ex){if(ex.qty+qty>p.stock)return toast('Quantidade acima do estoque.');ex.qty+=qty}else cart.push({id,qty,variation});
 save(K.cart,cart); updateCounts(); toast('Adicionado ao carrinho ✓'); renderCart();
}
function renderCart(){
 const cart=getCart(); const box=$('#cartItems');
 if(!cart.length){box.innerHTML='<p class="empty-state">Seu carrinho está vazio.</p>'}
 else box.innerHTML=cart.map(i=>{const p=getProducts().find(x=>x.id===i.id);if(!p)return'';return `<div class="cart-item"><img src="${esc(p.images[0])}" alt="${esc(p.name)}"><div class="ci-info"><strong>${esc(p.name)}</strong>${i.variation?`<br><small>${esc(i.variation)}</small>`:''}<br><span>${BRL(p.price)} un.</span><div class="qty-control"><button data-dec="${i.id}">−</button><span>${i.qty}</span><button data-inc="${i.id}">+</button></div></div><div><strong>${BRL(p.price*i.qty)}</strong><br><button class="link-btn" data-remove="${i.id}">Remover</button></div></div>`}).join('');
 const sub=cart.reduce((a,i)=>{const p=getProducts().find(x=>x.id===i.id);return a+(p?p.price*i.qty:0)},0);
 let disc=0; if(appliedCoupon){disc=appliedCoupon.type==='percent'?sub*appliedCoupon.value/100:Math.min(appliedCoupon.value,sub)}
 $('#cartSubtotal').textContent=BRL(sub); $('#cartDiscount').textContent='− '+BRL(disc); $('#cartTotal').textContent=BRL(sub-disc);
}
function openCart(){$('#cartDrawer').hidden=false;$('#cartOverlay').hidden=false;renderCart()}
function closeCart(){$('#cartDrawer').hidden=true;$('#cartOverlay').hidden=true}

/* ---- Produto (modal) ---- */
let currentProduct=null, currentQty=1;
function openProduct(id){
 const p=getProducts().find(x=>x.id===id); if(!p)return; currentProduct=p; currentQty=1;
 const rec=load(K.recent,[]).filter(x=>x!==id); rec.unshift(id); save(K.recent,rec.slice(0,4));
 $('#pmImage').src=p.images[0]; $('#pmImage').alt=p.name;
 $('#pmThumbs').innerHTML=p.images.map((im,i)=>`<img src="${esc(im)}" data-thumb="${im}" class="${i===0?'active':''}" alt="Miniatura ${i+1}">`).join('');
 $('#pmName').textContent=p.name; $('#pmCategory').textContent=catName(p.category);
 $('#pmOld').textContent=p.oldPrice?BRL(p.oldPrice):''; $('#pmPrice').textContent=BRL(p.price);
 $('#pmInstallments').textContent='em até 12x de '+BRL(p.price/12)+' sem juros*';
 $('#pmStock').textContent=p.stock>0?`Em estoque (${p.stock} unidades) — SKU ${p.sku}`:'Esgotado';
 $('#pmStock').className='stock'+(p.stock<=5?' low':'');
 $('#pmDesc').textContent=p.desc; $('#pmSpecs').innerHTML=`<p><strong>Especificações:</strong> ${esc(p.specs)}</p>`;
 $('#pmVariations').innerHTML=(p.variations||['Padrão']).map(v=>`<option>${esc(v)}</option>`).join('');
 $('#pmQty').value=1;
 const b=$('#pmBadge'); if(p.badge){b.hidden=false;b.textContent=p.badge}else b.hidden=true;
 $('#pmFav').textContent=getFavs().includes(p.id)?'♥':'♡';
 $('#pmRelated').innerHTML=getProducts().filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4).map(cardHTML).join('')||'<p>Nenhum relacionado.</p>';
 $('#pmRecent').innerHTML=load(K.recent,[]).filter(x=>x!==p.id).map(x=>getProducts().find(y=>y.id===x)).filter(Boolean).map(cardHTML).join('')||'<p>Nenhum produto visualizado recentemente.</p>';
 $('#productModal').hidden=false;
}
function closeProduct(){$('#productModal').hidden=true}
/* ---- Institucional ---- */
const INSTITUTIONAL={
 contato:{t:'Contato',h:`<p>Fale com a JRImports:</p><ul><li>E-mail: <span id="instEmail"></span></li><li>WhatsApp: configurável no painel administrativo.</li><li>Instagram: configurável no painel administrativo.</li></ul><p>Atendimento em horário comercial. Responderemos o quanto antes.</p>`},
 faq:{t:'Perguntas frequentes',h:`<p><strong>Como sei os detalhes de cada produto?</strong> Confira a descrição e as especificações na página de cada produto.</p><p><strong>Como acompanho meu pedido?</strong> Use a aba "Acompanhar pedido" com o número do pedido.</p><p><strong>Como funciona o pagamento?</strong> O pedido é registrado como Aguardando pagamento. O pagamento real é feito pelo gateway configurado — nenhum pagamento é simulado aqui.</p>`},
 privacidade:{t:'Política de privacidade',h:`<p>Texto modelo, configurável no painel administrativo e sujeito a revisão conforme a operação real e a LGPD. Coletamos apenas os dados necessários para processar seu pedido e não compartilhamos seus dados sem sua autorização.</p>`},
 termos:{t:'Termos de uso',h:`<p>Texto modelo, configurável no painel administrativo. Ao usar a loja, você concorda com estes termos, com as políticas de troca, entrega e privacidade.</p>`},
 troca:{t:'Política de troca e devolução',h:`<p>Texto modelo, configurável no painel administrativo. Solicite troca/devolução pelo atendimento, informando o número do pedido, dentro do prazo legal. Os produtos devem estar em perfeito estado.</p>`},
 entrega:{t:'Política de entrega',h:`<p>Texto modelo, configurável no painel administrativo. Entregamos para todo o Brasil. Prazos e frete variam por CEP e são confirmados no checkout.</p>`},
 rastreio:{t:'Acompanhar pedido',h:`<p>Digite o número do pedido (ex.: JR-1001):</p><div style="display:flex;gap:8px"><input id="trackInput" placeholder="JR-1001"><button class="btn btn-gold btn-sm" id="trackBtn">Buscar</button></div><div id="trackResult" style="margin-top:12px"></div>`}};
function showInstitutional(key,scroll=true){
 $$('.tab[data-institutional]').forEach(b=>b.classList.toggle('active',b.dataset.institutional===key));
 const c=INSTITUTIONAL[key]; if(!c)return;
 $('#institutionalContent').innerHTML=`<h3>${c.t}</h3>${c.h}`;
 const em=$('#instEmail'); if(em)em.textContent=getSettings().email||'';
 const tb=$('#trackBtn'); if(tb)tb.onclick=()=>{const n=$('#trackInput').value.trim().toUpperCase();const o=getOrders().find(x=>x.number===n);$('#trackResult').innerHTML=o?`<p><strong>Pedido ${esc(o.number)}</strong> — Status: <strong>${esc(o.status)}</strong><br>Cliente: ${esc(o.customer.name)}<br>Rastreamento: ${esc(o.tracking||'Ainda não informado')}</p>`:'<p>Pedido não encontrado. Confira o número.</p>'};
 if(scroll)document.getElementById('institucional').scrollIntoView({behavior:'smooth'});
}
/* ---- Checkout / ViaCEP ---- */
function checkoutSummary(){
 const cart=getCart(); const sub=cart.reduce((a,i)=>{const p=getProducts().find(x=>x.id===i.id);return a+(p?p.price*i.qty:0)},0);
 let disc=0; if(appliedCoupon)disc=appliedCoupon.type==='percent'?sub*appliedCoupon.value/100:Math.min(appliedCoupon.value,sub);
 $('#coSummary').innerHTML=`<h3>Resumo do pedido</h3>${cart.map(i=>{const p=getProducts().find(x=>x.id===i.id);return p?`<p>${esc(p.name)} × ${i.qty} — ${BRL(p.price*i.qty)}</p>`:''}).join('')||'<p>Carrinho vazio.</p>'}<p>Subtotal: ${BRL(sub)}</p><p>Desconto: − ${BRL(disc)}</p><p><strong>Total: ${BRL(sub-disc)}</strong></p><p class="hint">* Parcelamento em até 12x, quando configurado no gateway. Preços recalculados aqui a partir do catálogo — não confiamos em valores enviados pelo navegador.</p>`;
 return {sub,disc,total:sub-disc};
}
async function fetchCep(){
 const cep=$('#coCep').value.replace(/\D/g,''); if(cep.length!==8)return toast('Digite um CEP com 8 dígitos.');
 try{const r=await fetch(`https://viacep.com.br/ws/${cep}/json/`);const d=await r.json();if(d.erro)return toast('CEP não encontrado.');
 $('#coAddress').value=d.logradouro||'';$('#coDistrict').value=d.bairro||'';$('#coCity').value=d.localidade||'';$('#coState').value=d.uf||'';toast('Endereço encontrado ✓');
 }catch{toast('Não foi possível buscar o CEP. Preencha manualmente.')}
}
/* ---- Auth / cliente ---- */
function currentUser(){return load(K.session,null)}
function openCustomer(){
 const u=currentUser(); if(!u){$('#authModal').hidden=false;return}
 const orders=getOrders().filter(o=>o.customer.email===u.email);
 $('#customerTitle').textContent='Olá, '+u.name;
 $('#customerProfile').innerHTML=`<p><strong>${esc(u.name)}</strong><br>${esc(u.email)}</p>`;
 $('#customerOrders').innerHTML=orders.length?orders.map(o=>`<p><strong>${esc(o.number)}</strong> — ${esc(o.status)} — ${BRL(o.total)} — ${esc(o.date)}</p>`).join(''):'<p>Nenhum pedido ainda.</p>';
 $('#customerAddresses').innerHTML=orders.length?orders.map(o=>`<p>${esc(o.address)}, ${esc(o.numberAddr)} — ${esc(o.city)}/${esc(o.state)}</p>`).join(''):'<p>Nenhum endereço salvo.</p>';
 const favs=getFavs().map(id=>getProducts().find(p=>p.id===id)).filter(Boolean);
 $('#customerFavs').innerHTML=favs.length?favs.map(p=>`<p>${esc(p.name)}</p>`).join(''):'<p>Nenhum favorito.</p>';
 $('#customerModal').hidden=false;
}
/* ---- WhatsApp ---- */
function waLink(msg){const s=getSettings();const num=(s.whatsapp||'').replace(/\D/g,'');return num?`https://wa.me/${num}?text=${encodeURIComponent(msg)}`:'#';}
function updateWa(){const s=getSettings();const a=$('#waFloat');a.href=waLink(s.whatsapp?`Olá! Vim pelo site JRImports e quero ajuda.`:'Olá! Vim pelo site JRImports.');a.style.display=s.whatsapp?'flex':'flex';}
/* ---- Eventos globais ---- */
function bind(){
 document.addEventListener('click',e=>{
  const open=e.target.closest('[data-open]'); if(open){openProduct(open.dataset.open);return}
  const add=e.target.closest('[data-add]'); if(add){addToCart(add.dataset.add);return}
  const fav=e.target.closest('[data-fav]'); if(fav){const id=fav.dataset.fav;let f=getFavs();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];save(K.favorites,f);updateCounts();renderFeatured();renderCatalog();renderFavs();toast(f.includes(id)?'Adicionado aos favoritos ♥':'Removido dos favoritos.');return}
  const cat=e.target.closest('[data-cat]'); if(cat){catalogState.cat=cat.id==='ofertas'?'todas':cat.id;if(cat.id==='ofertas')catalogState.offer=true;else catalogState.offer=false;catalogPage=1;syncFilterUI();renderCatalog();document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});return}
  const nav=e.target.closest('[data-nav]'); if(nav){e.preventDefault();const id=nav.dataset.nav;const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});$('#mobileMenu').hidden=true;return}
  const inst=e.target.closest('[data-institutional]'); if(inst){showInstitutional(inst.dataset.institutional);return}
  const inc=e.target.closest('[data-inc]'); if(inc){const c=getCart();const it=c.find(x=>x.id===inc.dataset.inc);const p=getProducts().find(x=>x.id===inc.dataset.inc);if(it&&it.qty<p.stock)it.qty++;save(K.cart,c);updateCounts();renderCart();return}
  const dec=e.target.closest('[data-dec]'); if(dec){const c=getCart();const it=c.find(x=>x.id===dec.dataset.dec);if(it){it.qty--;if(it.qty<=0)c.splice(c.indexOf(it),1)}save(K.cart,c);updateCounts();renderCart();return}
  const rem=e.target.closest('[data-remove]'); if(rem){save(K.cart,getCart().filter(x=>x.id!==rem.dataset.remove));updateCounts();renderCart();return}
  const pg=e.target.closest('[data-page]'); if(pg){catalogPage=+pg.dataset.page;renderCatalog();return}
  const th=e.target.closest('[data-thumb]'); if(th){$('#pmImage').src=th.dataset.thumb;$$('#pmThumbs img').forEach(i=>i.classList.toggle('active',i===th));return}
 });
 $('#searchBtn').onclick=doSearch; $('#searchInput').addEventListener('input',doSearch);
 $('#categoriesBtn').onclick=()=>{const m=$('#categoriesMenu');m.hidden=!m.hidden;$('#categoriesBtn').setAttribute('aria-expanded',String(!m.hidden))};
 $('#menuBtn').onclick=()=>{$('#mobileMenu').hidden=!$('#mobileMenu').hidden};
 $('#cartBtn').onclick=openCart; $('#cartClose').onclick=closeCart; $('#cartOverlay').onclick=closeCart; $('#continueBtn').onclick=closeCart;
 $('#accountBtn').onclick=openCustomer; $('#mobileAccountBtn').onclick=openCustomer;
 $('#favBtn').onclick=()=>{$('#favModal').hidden=false;renderFavs()}; $('#mobileFavBtn').onclick=()=>{$('#favModal').hidden=false;renderFavs()};
 $('#favClose').onclick=()=>$('#favModal').hidden=true;
 $('#pmClose').onclick=closeProduct; $('#productModal').addEventListener('click',e=>{if(e.target.id==='productModal')closeProduct()});
 $('#pmImage').onclick=()=>$('#pmImage').classList.toggle('zoomed');
 $('#pmMinus').onclick=()=>{currentQty=Math.max(1,currentQty-1);$('#pmQty').value=currentQty};
 $('#pmPlus').onclick=()=>{currentQty++;$('#pmQty').value=currentQty};
 $('#pmQty').onchange=e=>{currentQty=Math.max(1,+e.target.value||1);e.target.value=currentQty};
 $('#pmAddCart').onclick=()=>{if(currentProduct)addToCart(currentProduct.id,currentQty,$('#pmVariations').value)};
 $('#pmBuyNow').onclick=()=>{if(currentProduct){addToCart(currentProduct.id,currentQty,$('#pmVariations').value);closeProduct();$('#checkoutModal').hidden=false;checkoutSummary()}};
 $('#pmWhats').onclick=()=>{const s=getSettings();if(!s.whatsapp)return toast('WhatsApp ainda não configurado na loja.');window.open(waLink(`Olá! Tenho interesse no produto ${currentProduct.name} (${BRL(currentProduct.price)}).`),'_blank')};
 $('#pmFav').onclick=()=>{if(!currentProduct)return;let f=getFavs();f=f.includes(currentProduct.id)?f.filter(x=>x!==currentProduct.id):[...f,currentProduct.id];save(K.favorites,f);updateCounts();$('#pmFav').textContent=f.includes(currentProduct.id)?'♥':'♡';toast('Favorito atualizado.')};
 $('#heroExplore').onclick=()=>document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});
 $('#heroOffers').onclick=()=>{featuredFilter='ofertas';syncFeaturedChips();renderFeatured();document.getElementById('destaques').scrollIntoView({behavior:'smooth'})};
 $('#heroCardBtn').onclick=()=>openProduct('p01');
 $('#promoBtn').onclick=()=>{featuredFilter='ofertas';syncFeaturedChips();renderFeatured();document.getElementById('destaques').scrollIntoView({behavior:'smooth'})};
 $('#featuredFilters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;featuredFilter=b.dataset.filter;syncFeaturedChips();renderFeatured()});
 $('#featuredClear').onclick=()=>{featuredFilter='todos';syncFeaturedChips();renderFeatured()};
 $('#sortSelect').onchange=renderFeatured;
 $('#catalogSort').onchange=e=>{catalogState.sort=e.target.value;catalogPage=1;renderCatalog()};
 $('#catalogSearch').oninput=e=>{catalogState.q=e.target.value;catalogPage=1;renderCatalog()};
 $('#priceMin').onchange=e=>{catalogState.min=e.target.value;catalogPage=1;renderCatalog()};
 $('#priceMax').onchange=e=>{catalogState.max=e.target.value;catalogPage=1;renderCatalog()};
 $('#availOnly').onchange=e=>{catalogState.avail=e.target.checked;catalogPage=1;renderCatalog()};
 $('#offerOnly').onchange=e=>{catalogState.offer=e.target.checked;catalogPage=1;renderCatalog()};
 $('#clearFilters').onclick=clearCatalogFilters; $('#catalogClear').onclick=clearCatalogFilters;
 $('#loadMoreBtn').onclick=()=>{catalogPage++;renderCatalog()};
 $('#filterModalBtn').onclick=()=>{$('#filterModalBody').innerHTML=$('#filtersPanel').innerHTML.replace(/ id="[^"]+"/g,'');$('#filterModal').hidden=false};
 $('#filterClose').onclick=()=>$('#filterModal').hidden=true;
 $('#filterApply').onclick=()=>{const b=$('#filterModalBody');const q=b.querySelector('input[type=search]');if(q)catalogState.q=q.value;const cat=b.querySelector('input[name=cat]:checked');if(cat)catalogState.cat=cat.value;const nums=b.querySelectorAll('input[type=number]');if(nums[0])catalogState.min=nums[0].value;if(nums[1])catalogState.max=nums[1].value;const ch=b.querySelectorAll('input[type=checkbox]');if(ch[0])catalogState.avail=ch[0].checked;if(ch[1])catalogState.offer=ch[1].checked;catalogPage=1;$('#catalogSearch').value=catalogState.q;$('#priceMin').value=catalogState.min;$('#priceMax').value=catalogState.max;syncFilterUI();$('#filterModal').hidden=true;renderCatalog();toast('Filtros aplicados.')}; 
 $('#applyCouponBtn').onclick=()=>{
   const code=$('#couponInput').value.trim().toUpperCase(); const c=load(K.coupons,[]).find(x=>x.code===code&&x.active);
   if(!c)return $('#couponMsg').textContent='Cupom inválido ou inativo.';
   if(c.validUntil&&new Date(c.validUntil)<new Date())return $('#couponMsg').textContent='Cupom vencido.';
   if(c.maxUses&&c.uses>=c.maxUses)return $('#couponMsg').textContent='Cupom esgotado.';
   appliedCoupon=c; $('#couponMsg').textContent='Cupom aplicado: '+c.code; renderCart(); toast('Cupom aplicado ✓');
 };
 $('#checkoutBtn').onclick=()=>{if(!getCart().length)return toast('Seu carrinho está vazio.');closeCart();$('#checkoutModal').hidden=false;$('#coSuccess').hidden=true;$('#checkoutForm').hidden=false;checkoutSummary()};
 $('#coClose').onclick=()=>$('#checkoutModal').hidden=true;
 $('#coSuccessClose').onclick=()=>{$('#checkoutModal').hidden=true};
 $('#searchCepBtn').onclick=fetchCep;
 $('#checkoutForm').addEventListener('submit',e=>{
   e.preventDefault();
   const cart=getCart(); if(!cart.length)return $('#coMsg').textContent='Carrinho vazio.';
   const {total}=checkoutSummary();
   const orders=getOrders(); const number='JR-'+(1001+orders.length);
   const order={number,status:'Aguardando pagamento',date:new Date().toISOString().slice(0,10),total,items:cart.map(i=>{const p=getProducts().find(x=>x.id===i.id);return {id:i.id,name:p?p.name:i.id,price:p?p.price:0,qty:i.qty}}),customer:{name:$('#coName').value,email:$('#coEmail').value,phone:$('#coPhone').value},address:$('#coAddress').value,numberAddr:$('#coNumber').value,city:$('#coCity').value,state:$('#coState').value,delivery:$('#coDelivery').value,tracking:''};
   // Baixa de estoque (dados reais)
   const prods=getProducts(); cart.forEach(i=>{const p=prods.find(x=>x.id===i.id);if(p)p.stock=Math.max(0,p.stock-i.qty)}); save(K.products,prods);
   if(appliedCoupon){const cs=load(K.coupons,[]);const c=cs.find(x=>x.code===appliedCoupon.code);if(c)c.uses++;save(K.coupons,cs);appliedCoupon=null}
   orders.push(order); save(K.orders,orders);
   save(K.cart,[]); updateCounts(); renderCart(); renderFeatured(); renderCatalog();
   $('#checkoutForm').hidden=true; $('#coSuccess').hidden=false;
   $('#coSuccessText').textContent=`Pedido ${number} registrado como Aguardando pagamento, total ${BRL(total)}. Nenhum pagamento foi simulado — siga as instruções do gateway configurado para concluir o pagamento.`;
   toast('Pedido registrado ✓');
 });
 $('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();const em=$('#newsletterEmail').value.trim();const list=load(K.newsletter,[]);if(!list.includes(em))list.push(em);save(K.newsletter,list);$('#newsletterMsg').textContent='E-mail cadastrado. Obrigado!';e.target.reset()});
 // Auth
 $('#tabLogin').onclick=()=>{$('#tabLogin').classList.add('active');$('#tabRegister').classList.remove('active');$('#loginForm').hidden=false;$('#registerForm').hidden=true};
 $('#tabRegister').onclick=()=>{$('#tabRegister').classList.add('active');$('#tabLogin').classList.remove('active');$('#loginForm').hidden=true;$('#registerForm').hidden=false};
 $('#authClose').onclick=()=>$('#authModal').hidden=true;
 $('#customerClose').onclick=()=>$('#customerModal').hidden=true;
 $('#logoutBtn').onclick=()=>{localStorage.removeItem(K.session);$('#customerModal').hidden=true;toast('Você saiu.')};
 $('#loginForm').addEventListener('submit',e=>{e.preventDefault();const em=$('#loginEmail').value.trim().toLowerCase();const cs=load(K.customers,[]);const u=cs.find(x=>x.email===em);if(!u||u.pass!==btoa($('#loginPass').value))return $('#loginMsg').textContent='E-mail ou senha inválidos.';save(K.session,{name:u.name,email:u.email});$('#authModal').hidden=true;openCustomer();toast('Bem-vindo(a) de volta!')});
 $('#registerForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#regName').value.trim(),em=$('#regEmail').value.trim().toLowerCase(),pass=$('#regPass').value;const cs=load(K.customers,[]);if(cs.find(x=>x.email===em))return $('#regMsg').textContent='Já existe uma conta com este e-mail.';cs.push({name,email:em,pass:btoa(pass),createdAt:new Date().toISOString().slice(0,10)});save(K.customers,cs);save(K.session,{name,email:em});$('#authModal').hidden=true;openCustomer();toast('Conta criada ✓')});
 $('#forgotLink').onclick=()=>{const em=$('#loginEmail').value.trim();if(!em)return $('#loginMsg').textContent='Digite seu e-mail acima para recuperar a senha.';$('#loginMsg').textContent='Recuperação local (demonstração): nenhum e-mail real é enviado neste site estático. Para redefinir, crie uma nova conta ou fale com o atendimento.'};
 // Scroll / progress / reveal
 window.addEventListener('scroll',()=>{const h=document.documentElement;$('#progressBar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:.1});
 $$('.reveal').forEach(el=>io.observe(el));
 setTimeout(()=>$('#loader').classList.add('hidden'),900);
}
function doSearch(){
 const q=$('#searchInput').value.trim().toLowerCase(); const box=$('#searchResults');
 if(q.length<2){box.hidden=true;return}
 const res=getProducts().filter(p=>(p.name+' '+p.desc).toLowerCase().includes(q)).slice(0,5);
 box.innerHTML=res.map(p=>`<button data-open="${p.id}">${esc(p.name)} — ${BRL(p.price)}</button>`).join('')||'<button disabled>Nenhum produto encontrado.</button>';
 box.hidden=false;
 box.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{box.hidden=true;openProduct(b.dataset.open)});
}
function syncFeaturedChips(){$$('#featuredFilters .chip').forEach(c=>c.classList.toggle('active',c.dataset.filter===featuredFilter))}
function syncFilterUI(){$$('input[name="cat"]').forEach(r=>r.checked=r.value===catalogState.cat);$('#availOnly').checked=catalogState.avail;$('#offerOnly').checked=catalogState.offer}
function clearCatalogFilters(){catalogState={q:'',cat:'todas',min:'',max:'',avail:false,offer:false,sort:'relevancia'};catalogPage=1;$('#catalogSearch').value='';$('#priceMin').value='';$('#priceMax').value='';syncFilterUI();renderCatalog()}
// Init
renderCategories(); renderFeatured(); renderBest(); renderNew(); renderCatalog(); renderFavs(); updateCounts(); updateWa(); showInstitutional('contato',false); bind();
