/* JRImports v2 — Admin. Dados reais do localStorage (jrimports2_*). Sem números inventados. */
const K={products:'jrimports2_products',categories:'jrimports2_categories',cart:'jrimports2_cart',orders:'jrimports2_orders',customers:'jrimports2_customers',coupons:'jrimports2_coupons',settings:'jrimports2_settings',adminPass:'jrimports2_admin_pass',adminAuth:'jrimports2_admin_auth'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const BRL=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(k,fb){try{return JSON.parse(localStorage.getItem(k))??fb}catch{return fb}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function toast(m){const t=$('#adminToast');t.textContent=m;t.hidden=false;setTimeout(()=>t.hidden=true,2800)}
function download(name,obj){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;a.click()}
const STATUS=['Aguardando pagamento','Pagamento aprovado','Em preparação','Enviado','Entregue','Cancelado'];
// Login
if(sessionStorage.getItem(K.adminAuth)==='1')showPanel();
$('#adminLoginForm').addEventListener('submit',e=>{e.preventDefault();const pass=localStorage.getItem(K.adminPass)||'admin123';if($('#adminPass').value===pass){sessionStorage.setItem(K.adminAuth,'1');showPanel()}else $('#adminLoginMsg').textContent='Senha incorreta.'});
function showPanel(){$('#adminLogin').hidden=true;$('#adminPanel').hidden=false;renderAll()}
$('#adminLogout').onclick=()=>{sessionStorage.removeItem(K.adminAuth);location.reload()};
$$('.side-link').forEach(b=>b.onclick=()=>{$$('.side-link').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.admin-main section').forEach(s=>s.hidden=true);$('#tab-'+b.dataset.tab).hidden=false});
function renderAll(){renderDash();renderProducts();renderOrders();renderCustomers();renderCoupons();renderSettings();renderCatsAdmin()}
function renderDash(){
 const orders=load(K.orders,[]), prods=load(K.products,[]);
 const paid=orders.filter(o=>o.status!=='Cancelado');
 const total=paid.reduce((a,o)=>a+Number(o.total||0),0);
 const today=new Date().toISOString().slice(0,10);
 const month=today.slice(0,7);
 const daySales=orders.filter(o=>o.date===today&&o.status!=='Cancelado').reduce((a,o)=>a+Number(o.total||0),0);
 const monthSales=orders.filter(o=>(o.date||'').startsWith(month)&&o.status!=='Cancelado').reduce((a,o)=>a+Number(o.total||0),0);
 const pending=orders.filter(o=>o.status==='Aguardando pagamento').length;
 const done=orders.filter(o=>o.status==='Entregue').length;
 const ticket=paid.length?total/paid.length:0;
 const low=prods.filter(p=>p.stock<=5);
 $('#dashCards').innerHTML=[
  ['Faturamento total',BRL(total)],['Vendas de hoje',BRL(daySales)],['Vendas do mês',BRL(monthSales)],
  ['Pedidos pendentes',pending],['Pedidos entregues',done],['Produtos',prods.length],
  ['Estoque baixo',low.length],['Ticket médio',BRL(ticket)]
 ].map(([l,v])=>`<div class="card"><strong>${v}</strong><span>${l}</span></div>`).join('');
 // gráfico últimos 7 dias (vendas reais)
 const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return d.toISOString().slice(0,10)});
 const vals=days.map(d=>orders.filter(o=>o.date===d&&o.status!=='Cancelado').reduce((a,o)=>a+Number(o.total||0),0));
 const max=Math.max(...vals,1);
 $('#salesChart').innerHTML=vals.map((v,i)=>`<div class="chart-bar" style="height:${Math.max(4,v/max*100)}%" title="${days[i]}: ${BRL(v)}"><span>${days[i].slice(5)}</span></div>`).join('');
 $('#lowStock').innerHTML=low.length?low.map(p=>`<p>${esc(p.name)} — ${p.stock} un. (SKU ${esc(p.sku||'')})</p>`).join(''):'<p class="muted">Nenhum produto com estoque baixo.</p>';
 const badge=$('#ordersBadge'); badge.textContent=pending; badge.hidden=!pending;
}
function renderProducts(){
 const prods=load(K.products,[]);
 $('#productsTable').innerHTML=prods.map(p=>`<tr><td>${esc(p.name)}</td><td>${BRL(p.price)}${p.oldPrice?`<br><s>${BRL(p.oldPrice)}</s>`:''}</td><td>${p.stock}</td><td>${esc(p.sku||'')}</td><td>${esc(p.category)}</td><td><button class="btn btn-outline btn-sm" data-edit="${p.id}">Editar</button> <button class="btn btn-outline btn-sm" data-del="${p.id}">Excluir</button></td></tr>`).join('')||'<tr><td colspan="6">Nenhum produto cadastrado.</td></tr>';
 $$('#productsTable [data-edit]').forEach(b=>b.onclick=()=>editProduct(b.dataset.edit));
 $$('#productsTable [data-del]').forEach(b=>b.onclick=()=>{if(confirm('Excluir este produto?')){save(K.products,load(K.products,[]).filter(p=>p.id!==b.dataset.del));renderAll();toast('Produto excluído.')}});
 $('#pfCategory').innerHTML=load(K.categories,[]).map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');
}
function editProduct(id){
 const p=load(K.products,[]).find(x=>x.id===id); if(!p)return;
 $('#productForm').hidden=false; $('#productFormTitle').textContent='Editar produto';
 $('#pfId').value=p.id; $('#pfName').value=p.name; $('#pfCategory').value=p.category;
 $('#pfPrice').value=p.price; $('#pfOldPrice').value=p.oldPrice||''; $('#pfStock').value=p.stock; $('#pfSku').value=p.sku||'';
 $('#pfImages').value=(p.images||[]).join('\n'); $('#pfDesc').value=p.desc||''; $('#pfSpecs').value=p.specs||'';
 $('#pfVariations').value=(p.variations||[]).join(', '); $('#pfCreated').value=p.createdAt||'';
 $('#pfFeatured').checked=!!p.featured; $('#pfNew').checked=!!p.isNew; $('#pfBadge').value=p.badge||'';
 $('#productForm').scrollIntoView({behavior:'smooth'});
}
$('#newProductBtn').onclick=()=>{$('#productForm').hidden=false;$('#productFormTitle').textContent='Novo produto';$('#productForm').reset();$('#pfId').value='';$('#pfCreated').value=new Date().toISOString().slice(0,10)};
$('#pfCancel').onclick=()=>{$('#productForm').hidden=true};
$('#productForm').addEventListener('submit',e=>{
 e.preventDefault();
 const prods=load(K.products,[]); const id=$('#pfId').value||('p'+Date.now());
 const data={id,name:$('#pfName').value.trim(),category:$('#pfCategory').value,price:+$('#pfPrice').value,oldPrice:+$('#pfOldPrice').value||0,stock:+$('#pfStock').value,sku:$('#pfSku').value.trim(),images:$('#pfImages').value.split('\n').map(s=>s.trim()).filter(Boolean),desc:$('#pfDesc').value.trim(),specs:$('#pfSpecs').value.trim(),variations:$('#pfVariations').value.split(',').map(s=>s.trim()).filter(Boolean),createdAt:$('#pfCreated').value||new Date().toISOString().slice(0,10),featured:$('#pfFeatured').checked,isNew:$('#pfNew').checked,badge:$('#pfBadge').value.trim().toUpperCase(),sales:0};
 if(!data.images.length)data.images=['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'];
 const ex=prods.findIndex(p=>p.id===id);
 if(ex>=0){data.sales=prods[ex].sales||0;prods[ex]=data}else prods.push(data);
 save(K.products,prods); $('#productForm').hidden=true; renderAll(); toast('Produto salvo ✓');
});
function renderCatsAdmin(){
 $('#categoriesAdmin').innerHTML=load(K.categories,[]).map(c=>`<p>${esc(c.name)} <button class="link-btn" data-delcat="${c.id}" style="display:inline;color:#f66">Excluir</button></p>`).join('');
 $$('[data-delcat]').forEach(b=>b.onclick=()=>{save(K.categories,load(K.categories,[]).filter(c=>c.id!==b.dataset.delcat));renderAll()});
}
$('#categoryForm').addEventListener('submit',e=>{e.preventDefault();const cats=load(K.categories,[]);const name=$('#cfName').value.trim();cats.push({id:name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-'),name,img:$('#cfImg').value.trim()||'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',desc:$('#cfDesc').value.trim()});save(K.categories,cats);e.target.reset();renderAll();toast('Categoria adicionada ✓')});
function renderOrders(){
 const orders=load(K.orders,[]);
 $('#ordersTable').innerHTML=orders.map(o=>`<tr><td>${esc(o.number)}</td><td>${esc(o.customer?.name||'')} <br><small>${esc(o.customer?.email||'')}</small></td><td>${BRL(o.total)}</td><td>${esc(o.status)}</td><td>${esc(o.date||'')}</td><td><button class="btn btn-outline btn-sm" data-view="${o.number}">Ver</button></td></tr>`).join('')||'<tr><td colspan="6">Nenhum pedido ainda.</td></tr>';
 $$('#ordersTable [data-view]').forEach(b=>b.onclick=()=>viewOrder(b.dataset.view));
}
function viewOrder(num){
 const o=load(K.orders,[]).find(x=>x.number===num); if(!o)return;
 const d=$('#orderDetail'); d.hidden=false;
 d.innerHTML=`<h3>Pedido ${esc(o.number)}</h3><p>Cliente: ${esc(o.customer?.name||'')} — ${esc(o.customer?.email||'')} — ${esc(o.customer?.phone||'')}</p><p>Endereço: ${esc(o.address||'')}, ${esc(o.numberAddr||'')} — ${esc(o.city||'')}/${esc(o.state||'')}</p><p>Entrega: ${esc(o.delivery||'')}</p><h4>Itens</h4>${(o.items||[]).map(i=>`<p>${esc(i.name)} × ${i.qty} — ${BRL(i.price*i.qty)}</p>`).join('')}<p><strong>Total: ${BRL(o.total)}</strong></p>
 <label>Status <select id="odStatus">${STATUS.map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></label>
 <label>Código de rastreamento <input id="odTrack" value="${esc(o.tracking||'')}"></label>
 <button class="btn btn-gold btn-sm" id="odSave">Salvar</button>`;
 $('#odSave').onclick=()=>{const orders=load(K.orders,[]);const ex=orders.find(x=>x.number===num);ex.status=$('#odStatus').value;ex.tracking=$('#odTrack').value.trim();save(K.orders,orders);renderAll();toast('Pedido atualizado ✓')};
 d.scrollIntoView({behavior:'smooth'});
}
function renderCustomers(){
 const cs=load(K.customers,[]), orders=load(K.orders,[]);
 $('#customersTable').innerHTML=cs.map(c=>{const os=orders.filter(o=>o.customer?.email===c.email);const total=os.filter(o=>o.status!=='Cancelado').reduce((a,o)=>a+Number(o.total||0),0);const last=os.length?os[os.length-1].date:'—';return `<tr><td>${esc(c.name)}</td><td>${esc(c.email)}</td><td>${os.length}</td><td>${BRL(total)}</td><td>${esc(last)}</td></tr>`}).join('')||'<tr><td colspan="5">Nenhum cliente cadastrado.</td></tr>';
}
function renderCoupons(){
 const cs=load(K.coupons,[]);
 $('#couponsTable').innerHTML=cs.map(c=>`<tr><td>${esc(c.code)}</td><td>${c.type==='percent'?c.value+'%':BRL(c.value)}</td><td>${esc(c.validUntil||'—')}</td><td>${c.uses||0}/${c.maxUses||'∞'}</td><td>${c.active?'Ativo':'Inativo'}</td><td><button class="btn btn-outline btn-sm" data-togglecp="${c.code}">${c.active?'Desativar':'Ativar'}</button> <button class="btn btn-outline btn-sm" data-delcp="${c.code}">Excluir</button></td></tr>`).join('')||'<tr><td colspan="6">Nenhum cupom.</td></tr>';
 $$('[data-togglecp]').forEach(b=>b.onclick=()=>{const cs2=load(K.coupons,[]);const c=cs2.find(x=>x.code===b.dataset.togglecp);c.active=!c.active;save(K.coupons,cs2);renderCoupons()});
 $$('[data-delcp]').forEach(b=>b.onclick=()=>{save(K.coupons,load(K.coupons,[]).filter(x=>x.code!==b.dataset.delcp));renderCoupons()});
}
$('#couponForm').addEventListener('submit',e=>{e.preventDefault();const cs=load(K.coupons,[]);cs.push({code:$('#cpCode').value.trim().toUpperCase(),type:$('#cpType').value,value:+$('#cpValue').value,validUntil:$('#cpValid').value,maxUses:+$('#cpMax').value||0,uses:0,minValue:+$('#cpMin').value||0,active:true});save(K.coupons,cs);e.target.reset();renderCoupons();toast('Cupom criado ✓')});
function renderSettings(){
 const s=load(K.settings,{});
 $('#stName').value=s.storeName||'JRImports'; $('#stWhatsapp').value=s.whatsapp||''; $('#stInstagram').value=s.instagram||''; $('#stEmail').value=s.email||''; $('#stGateway').value=s.gateway||''; $('#stShipping').value=s.shippingNote||''; $('#stFree').value=s.freeShippingAbove||0;
}
$('#settingsForm').addEventListener('submit',e=>{e.preventDefault();save(K.settings,{storeName:$('#stName').value.trim(),whatsapp:$('#stWhatsapp').value.trim(),instagram:$('#stInstagram').value.trim(),email:$('#stEmail').value.trim(),gateway:$('#stGateway').value.trim(),shippingNote:$('#stShipping').value.trim(),freeShippingAbove:+$('#stFree').value||0});$('#stMsg').textContent='Configurações salvas ✓'});
$('#passwordForm').addEventListener('submit',e=>{e.preventDefault();const cur=localStorage.getItem(K.adminPass)||'admin123';if($('#pwCurrent').value!==cur)return $('#pwMsg').textContent='Senha atual incorreta.';localStorage.setItem(K.adminPass,$('#pwNew').value);$('#pwMsg').textContent='Senha alterada ✓';e.target.reset()});
$('#exportBtn').onclick=()=>download('jrimports-pedidos.json',load(K.orders,[]));
$('#exportAllBtn').onclick=()=>download('jrimports-v2-dados.json',{products:load(K.products,[]),orders:load(K.orders,[]),customers:load(K.customers,[]),coupons:load(K.coupons,[]),settings:load(K.settings,{})});
$('#wipeBtn').onclick=()=>{if(confirm('Apagar TODOS os dados locais? Isso não pode ser desfeito.')){Object.values(K).forEach(k=>localStorage.removeItem(k));location.reload()}};
$('#resetDemoBtn').onclick=()=>{if(confirm('Restaurar os 12 produtos demo? Produtos atuais serão substituídos.')){localStorage.removeItem(K.products);location.href='index.html'}};
