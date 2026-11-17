/* JRImports Admin — localStorage, senha inicial admin123 (trocável em Configurações) */
(function(){
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const BRL = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
const money = v => BRL.format(v||0);
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2600); }
function get(k, d){ try{ const v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } }
function set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
function getSettings(){ return get("jrimports_settings", {}); }
function getPass(){ return getSettings().adminPass || "admin123"; }

/* LOGIN */
const loginScreen = $("#loginScreen"), shell = $("#adminShell");
if(sessionStorage.getItem("jrimports_admin")==="1"){ loginScreen.style.display="none"; shell.classList.add("show"); }
$("#loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  if($("#adminPass").value === getPass()){
    sessionStorage.setItem("jrimports_admin","1");
    loginScreen.style.display="none"; shell.classList.add("show"); renderAll();
  } else { $("#loginError").hidden = false; }
});
$("#logoutBtn").addEventListener("click", ()=>{ sessionStorage.removeItem("jrimports_admin"); location.reload(); });

/* TABS */
$$(".admin-tab").forEach(b=> b.addEventListener("click", ()=>{
  $$(".admin-tab").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  $$(".admin-panel").forEach(p=>p.classList.remove("active"));
  $("#panel-"+b.dataset.tab).classList.add("active");
}));

function products(){ return get("jrimports_products", []); }
function categories(){ return get("jrimports_categories", []); }
function orders(){ return get("jrimports_orders", []); }

/* DASHBOARD — dados reais do localStorage */
function renderDashboard(){
  const o = orders(), p = products();
  const delivered = o.filter(x=> x.status==="Entregue" || x.status==="Pago");
  const sales = o.reduce((s,x)=> s + (x.status==="Cancelado"?0:(x.total||0)), 0);
  $("#statSales").textContent = money(sales);
  $("#statOrders").textContent = o.length;
  $("#statPending").textContent = o.filter(x=> x.status==="Pendente").length;
  $("#statProducts").textContent = p.length;
  $("#statLow").textContent = p.filter(x=> (x.stock||0) <= 5).length;
  $("#statTicket").textContent = money(o.length ? sales/o.length : 0);
  const sold = {};
  o.forEach(x=> (x.items||[]).forEach(it=>{ sold[it.name] = (sold[it.name]||0) + (it.qty||0); }));
  const top = Object.entries(sold).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const max = top.length ? top[0][1] : 0;
  $("#bestSellers").innerHTML = top.length ? top.map(([n,q])=>
    '<div class="bar-row"><span>'+esc(n)+'</span><div class="bar-track"><div class="bar-fill" style="width:'+(max?Math.round(q/max*100):0)+'%"></div></div><strong>'+q+' un.</strong></div>').join("")
    : '<p style="color:var(--gray)">Nenhuma venda registrada ainda. Os dados aparecem aqui quando houver pedidos.</p>';
  $("#recentOrders").innerHTML = o.slice(-5).reverse().map(x=>
    '<tr><td>'+esc(x.id)+'</td><td>'+esc(x.customer||"—")+'</td><td>'+esc(x.date||"")+'</td><td>'+money(x.total)+'</td><td><span class="status-pill">'+esc(x.status)+'</span></td></tr>').join("")
    || '<tr><td colspan="5" style="color:var(--gray)">Nenhum pedido ainda.</td></tr>';
}

/* PRODUTOS */
function catOptions(sel){
  const selEl = $(sel);
  selEl.innerHTML = categories().map(c=>'<option value="'+esc(c.id)+'">'+esc(c.name)+'</option>').join("");
}
function renderProducts(){
  catOptions("#pfCategory");
  const p = products();
  $("#productsTable").innerHTML = p.map(x=>
    '<tr><td><img src="'+esc(x.img)+'" alt=""></td><td>'+esc(x.name)+'</td><td>'+esc((categories().find(c=>c.id===x.category)||{}).name||x.category)+'</td><td>'+money(x.price)+'</td><td>'+x.stock+'</td>'
    +'<td><div class="row-actions"><button class="btn-mini" data-edit="'+x.id+'">Editar</button><button class="btn-mini danger" data-del="'+x.id+'">Excluir</button></div></td></tr>').join("")
    || '<tr><td colspan="6" style="color:var(--gray)">Nenhum produto cadastrado.</td></tr>';
  $$("#productsTable [data-edit]").forEach(b=> b.addEventListener("click", ()=>{
    const x = products().find(v=>v.id===b.dataset.edit); if(!x) return;
    $("#pfId").value=x.id; $("#pfName").value=x.name; $("#pfCategory").value=x.category;
    $("#pfPrice").value=x.price; $("#pfOldPrice").value=x.oldPrice||""; $("#pfStock").value=x.stock;
    $("#pfTag").value=x.tag||""; $("#pfBest").checked=!!x.bestSeller; $("#pfNew").checked=!!x.isNew;
    $("#pfImg").value=x.img; $("#pfDesc").value=x.desc;
    $("#productFormTitle").textContent="Editar produto"; window.scrollTo({top:0,behavior:"smooth"});
  }));
  $$("#productsTable [data-del]").forEach(b=> b.addEventListener("click", ()=>{
    if(!confirm("Excluir este produto?")) return;
    set("jrimports_products", products().filter(v=>v.id!==b.dataset.del));
    renderAll(); toast("Produto excluído.");
  }));
}
$("#productForm").addEventListener("submit", e=>{
  e.preventDefault();
  const list = products();
  const id = $("#pfId").value || ("p"+Date.now());
  const item = {id, name:$("#pfName").value.trim(), category:$("#pfCategory").value,
    price:parseFloat($("#pfPrice").value)||0, oldPrice:parseFloat($("#pfOldPrice").value)||0,
    stock:parseInt($("#pfStock").value)||0, tag:$("#pfTag").value, bestSeller:$("#pfBest").checked,
    isNew:$("#pfNew").checked, img:$("#pfImg").value.trim(), desc:$("#pfDesc").value.trim()};
  const i = list.findIndex(v=>v.id===id);
  if(i>=0) list[i]=item; else list.push(item);
  set("jrimports_products", list);
  e.target.reset(); $("#pfId").value=""; $("#productFormTitle").textContent="Cadastrar produto";
  renderAll(); toast("Produto salvo.");
});
$("#pfCancel").addEventListener("click", ()=>{ $("#productForm").reset(); $("#pfId").value=""; $("#productFormTitle").textContent="Cadastrar produto"; });

/* CATEGORIAS */
function renderCategories(){
  const c = categories(), p = products();
  $("#categoriesTable").innerHTML = c.map(x=>
    '<tr><td><img src="'+esc(x.img)+'" alt=""></td><td>'+esc(x.name)+'</td><td>'+esc(x.desc||"")+'</td><td>'+p.filter(v=>v.category===x.id).length+'</td>'
    +'<td><div class="row-actions"><button class="btn-mini" data-edit="'+x.id+'">Editar</button><button class="btn-mini danger" data-del="'+x.id+'">Excluir</button></div></td></tr>').join("")
    || '<tr><td colspan="5" style="color:var(--gray)">Nenhuma categoria cadastrada.</td></tr>';
  $$("#categoriesTable [data-edit]").forEach(b=> b.addEventListener("click", ()=>{
    const x = categories().find(v=>v.id===b.dataset.edit); if(!x) return;
    $("#cfId").value=x.id; $("#cfName").value=x.name; $("#cfDesc").value=x.desc||""; $("#cfImg").value=x.img;
    $("#catFormTitle").textContent="Editar categoria";
  }));
  $$("#categoriesTable [data-del]").forEach(b=> b.addEventListener("click", ()=>{
    if(!confirm("Excluir esta categoria? Produtos dela ficarão sem categoria válida.")) return;
    set("jrimports_categories", categories().filter(v=>v.id!==b.dataset.del));
    renderAll(); toast("Categoria excluída.");
  }));
}
$("#categoryForm").addEventListener("submit", e=>{
  e.preventDefault();
  const list = categories();
  const name = $("#cfName").value.trim();
  const id = $("#cfId").value || name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-");
  const item = {id, name, desc:$("#cfDesc").value.trim(), img:$("#cfImg").value.trim()};
  const i = list.findIndex(v=>v.id===id);
  if(i>=0) list[i]=item; else list.push(item);
  set("jrimports_categories", list);
  e.target.reset(); $("#cfId").value=""; $("#catFormTitle").textContent="Criar categoria";
  renderAll(); toast("Categoria salva.");
});
$("#cfCancel").addEventListener("click", ()=>{ $("#categoryForm").reset(); $("#cfId").value=""; $("#catFormTitle").textContent="Criar categoria"; });

/* PEDIDOS */
function renderOrders(){
  const o = orders();
  $("#noOrders").style.display = o.length ? "none" : "";
  $("#ordersTable").innerHTML = o.map((x,idx)=>{
    const items = (x.items||[]).map(i=> i.qty+"× "+esc(i.name)).join("<br>");
    return '<tr><td>'+esc(x.id)+'<br><small style="color:var(--gray)">'+esc(x.date||"")+'</small></td><td>'+esc(x.customer||"—")+'<br><small style="color:var(--gray)">'+esc(x.email||"")+'</small></td><td>'+items+'</td><td>'+money(x.total)+'</td>'
    +'<td><span class="status-pill">'+esc(x.status)+'</span></td>'
    +'<td><select data-status="'+idx+'" style="background:var(--card);color:var(--white);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:7px">'
    +["Pendente","Pago","Enviado","Entregue","Cancelado"].map(s=>'<option'+(s===x.status?" selected":"")+'>'+s+'</option>').join("")+'</select></td></tr>';
  }).join("");
  $$("#ordersTable [data-status]").forEach(sel=> sel.addEventListener("change", ()=>{
    const list = orders(); list[parseInt(sel.dataset.status)].status = sel.value;
    set("jrimports_orders", list); renderAll(); toast("Pedido atualizado para "+sel.value+".");
  }));
}

/* CONFIG */
function renderSettings(){
  const s = getSettings();
  $("#sfEmail").value = s.email||""; $("#sfWhats").value = s.whatsapp||""; $("#sfCnpj").value = s.cnpj||"";
}
$("#settingsForm").addEventListener("submit", e=>{
  e.preventDefault();
  const s = getSettings();
  s.email = $("#sfEmail").value.trim(); s.whatsapp = $("#sfWhats").value.trim(); s.cnpj = $("#sfCnpj").value.trim();
  if($("#sfPass").value.trim()) s.adminPass = $("#sfPass").value.trim();
  set("jrimports_settings", s);
  $("#sfPass").value=""; toast("Configurações salvas.");
});
$("#resetDataBtn").addEventListener("click", ()=>{
  if(!confirm("Restaurar os 12 produtos e 6 categorias de demonstração? Isso substitui os produtos e categorias atuais.")) return;
  localStorage.removeItem("jrimports_products"); localStorage.removeItem("jrimports_categories");
  location.reload();
});
$("#clearOrdersBtn").addEventListener("click", ()=>{
  if(!confirm("Apagar todos os pedidos?")) return;
  localStorage.removeItem("jrimports_orders"); renderAll(); toast("Pedidos apagados.");
});

function renderAll(){ renderDashboard(); renderProducts(); renderCategories(); renderOrders(); renderSettings(); }
if(sessionStorage.getItem("jrimports_admin")==="1") renderAll();
})();
