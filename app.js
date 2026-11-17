/* JRImports — loja estática, dados em localStorage, sem backend, sem Lovable */
(function(){
"use strict";
const BRL = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
const $ = (s,el)=> (el||document).querySelector(s);
const $$ = (s,el)=> Array.from((el||document).querySelectorAll(s));
const U = (id,w)=> "https://images.unsplash.com/"+id+"?q=80&w="+w+"&auto=format&fit=crop";

const SEED_CATEGORIES = [
  {id:"eletronicos",name:"Eletrônicos",img:U("photo-1498049794561-7780e7231661",900),desc:"Som, imagem e gadgets premium."},
  {id:"acessorios",name:"Acessórios",img:U("photo-1523170335258-f5ed11844a49",900),desc:"Detalhes que elevam o visual."},
  {id:"moda",name:"Moda",img:U("photo-1445205170230-053b83016050",900),desc:"Peças selecionadas, estilo internacional."},
  {id:"perfumes",name:"Perfumes",img:U("photo-1592945403244-b3fbafd7f539",900),desc:"Fragrâncias importadas marcantes."},
  {id:"tecnologia",name:"Tecnologia",img:U("photo-1518770660439-4636190af475",900),desc:"Inovação para o dia a dia."},
  {id:"utilidades",name:"Utilidades",img:U("photo-1524758631624-e2822e304c36",900),desc:"Praticidade com design premium."}
];

const SEED_PRODUCTS = [
  {id:"p01",name:"Fone Premium Noise Cancelling",category:"eletronicos",price:899.90,oldPrice:1299.90,stock:18,tag:"DESTAQUE",bestSeller:true,isNew:false,img:U("photo-1505740420928-5e560c06d30e",800),desc:"Fone over-ear com cancelamento ativo de ruído, 40h de bateria, som Hi-Res e acabamento premium em preto fosco."},
  {id:"p02",name:"Smartwatch Série Luxo",category:"tecnologia",price:1199.00,oldPrice:1599.00,stock:12,tag:"OFERTA",bestSeller:true,isNew:false,img:U("photo-1546868871-7041f2a55e12",800),desc:"Smartwatch com tela AMOLED, monitoramento de saúde, GPS e pulseira premium. Compatível com Android e iOS."},
  {id:"p03",name:"Perfume Importado Essence 100ml",category:"perfumes",price:649.90,oldPrice:849.90,stock:22,tag:"NOVO",bestSeller:false,isNew:true,img:U("photo-1541643600914-78b084683601",800),desc:"Fragrância importada marcante, notas amadeiradas e cítricas, fixação prolongada. Frasco de 100ml."},
  {id:"p04",name:"Mochila Urban Premium",category:"moda",price:549.90,oldPrice:699.90,stock:15,tag:"DESTAQUE",bestSeller:true,isNew:false,img:U("photo-1553062407-98eeb64c6a62",800),desc:"Mochila resistente à água, compartimento para notebook de até 15,6\", bolsos organizadores e design minimalista."},
  {id:"p05",name:"Óculos de Sol Aviador Gold",category:"acessorios",price:399.90,oldPrice:549.90,stock:20,tag:"OFERTA",bestSeller:false,isNew:true,img:U("photo-1572635196237-14b3f281503f",800),desc:"Óculos aviador com armação dourada, lentes com proteção UV400 e estojo premium incluso."},
  {id:"p06",name:"Caixa de Som Bluetooth 360°",category:"eletronicos",price:749.90,oldPrice:999.90,stock:9,tag:"DESTAQUE",bestSeller:true,isNew:false,img:U("photo-1545454675-3531b543be5d",800),desc:"Caixa de som 360°, graves profundos, resistente a respingos, 24h de bateria e pareamento duplo."},
  {id:"p07",name:"Câmera Instantânea Retro",category:"tecnologia",price:989.00,oldPrice:1199.00,stock:7,tag:"NOVO",bestSeller:false,isNew:true,img:U("photo-1516035069371-29a1b244cc32",800),desc:"Câmera instantânea de design retrô, fotos impressas na hora, modo selfie e flash automático."},
  {id:"p08",name:"Tênis Runner Importado",category:"moda",price:899.00,oldPrice:1199.00,stock:14,tag:"OFERTA",bestSeller:true,isNew:false,img:U("photo-1542291026-7eec264c27ff",800),desc:"Tênis de corrida importado, amortecimento responsivo, cabedal respirável e solado de alta aderência."},
  {id:"p09",name:"Relógio Clássico Dourado",category:"acessorios",price:1499.00,oldPrice:1999.00,stock:5,tag:"DESTAQUE",bestSeller:true,isNew:false,img:U("photo-1523275335684-37898b6baf30",800),desc:"Relógio clássico com detalhes dourados, pulseira em couro legítimo, vidro safira e resistência à água."},
  {id:"p10",name:"Teclado Mecânico RGB",category:"tecnologia",price:599.90,oldPrice:799.90,stock:16,tag:"",bestSeller:false,isNew:true,img:U("photo-1587829741301-dc798b83add3",800),desc:"Teclado mecânico com switches silenciosos, iluminação RGB personalizável e estrutura em alumínio."},
  {id:"p11",name:"Luminária de Mesa Premium",category:"utilidades",price:349.90,oldPrice:449.90,stock:11,tag:"OFERTA",bestSeller:false,isNew:false,img:U("photo-1507473885765-e6ed057f782c",800),desc:"Luminária de mesa com temperatura de cor ajustável, braço articulado e carregamento USB embutido."},
  {id:"p12",name:"Kit Acessórios Premium",category:"acessorios",price:459.90,oldPrice:599.90,stock:25,tag:"NOVO",bestSeller:false,isNew:true,img:U("photo-1591561954557-26941169b49e",800),desc:"Kit com bolsa organizadora, carteira e acessórios em couro sintético premium, ideal para viagens."}
];

function load(key, seed){
  try{
    const raw = localStorage.getItem(key);
    if(raw){ const v = JSON.parse(raw); if(Array.isArray(v) && v.length) return v; }
  }catch(e){}
  localStorage.setItem(key, JSON.stringify(seed));
  return JSON.parse(JSON.stringify(seed));
}
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

let products = load("jrimports_products", SEED_PRODUCTS);
let categories = load("jrimports_categories", SEED_CATEGORIES);
let settings = {};
try{ settings = JSON.parse(localStorage.getItem("jrimports_settings")||"{}"); }catch(e){ settings = {}; }
let cart = [];
try{ cart = JSON.parse(localStorage.getItem("jrimports_cart")||"[]"); }catch(e){ cart = []; }

let state = {filter:"todos", category:"todas", sort:"relevancia", search:""};
let currentProduct = null;

function catName(id){ const c = categories.find(x=>x.id===id); return c ? c.name : id; }
function discount(p){ return p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price/p.oldPrice)*100) : 0; }
function money(v){ return BRL.format(v); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }

function toast(msg){
  const t = $("#toast"); if(!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 2600);
}

/* INTRO — só na primeira visita da sessão */
(function intro(){
  const el = $("#intro"); if(!el) return;
  if(sessionStorage.getItem("jrimports_intro")){ el.remove(); return; }
  sessionStorage.setItem("jrimports_intro","1");
  setTimeout(()=> el.classList.add("hide"), 1700);
  setTimeout(()=> el.remove(), 2400);
})();

/* HEADER / MENU */
const header = $("#siteHeader");
window.addEventListener("scroll", ()=> header && header.classList.toggle("scrolled", window.scrollY > 30), {passive:true});

const mobileMenu = $("#mobileMenu"), mmOverlay = $("#mobileMenuOverlay");
function closeMobile(){ mobileMenu.classList.remove("open"); mmOverlay.classList.remove("open"); }
$("#menuBtn").addEventListener("click", ()=>{ mobileMenu.classList.add("open"); mmOverlay.classList.add("open"); });
$("#closeMenuBtn").addEventListener("click", closeMobile);
mmOverlay.addEventListener("click", closeMobile);
$$(".mobile-nav a, .mobile-menu .btn").forEach(a=> a.addEventListener("click", closeMobile));

/* REVEAL */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); } });
},{threshold:.12});
$$(".reveal").forEach(el=> io.observe(el));

/* BUSCA */
const searchOverlay = $("#searchOverlay"), searchInput = $("#searchInput");
function openSearch(){ searchOverlay.classList.add("open"); searchInput.focus(); }
function closeSearch(){ searchOverlay.classList.remove("open"); }
$("#searchBtn").addEventListener("click", openSearch);
$("#closeSearchBtn").addEventListener("click", closeSearch);
function applySearch(){
  state.search = searchInput.value.trim().toLowerCase();
  closeSearch(); renderProducts();
  document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
}
$("#searchGoBtn").addEventListener("click", applySearch);
searchInput.addEventListener("keydown", e=>{ if(e.key==="Enter") applySearch(); if(e.key==="Escape") closeSearch(); });

/* CONTA / INFO */
const infoModal = $("#infoModal");
function openInfo(title, html){
  $("#infoTitle").textContent = title; $("#infoBody").innerHTML = html;
  infoModal.classList.add("open");
}
$("#accountBtn").addEventListener("click", ()=> openInfo("Sua conta", "<p>Área do cliente em versão demonstrativa: seus pedidos ficam salvos neste navegador e podem ser acompanhados pelo painel administrativo.</p><p>Para gerenciar produtos, categorias e pedidos, use o painel administrativo abaixo.</p>"));
$("#closeInfoModal").addEventListener("click", ()=> infoModal.classList.remove("open"));
infoModal.addEventListener("click", e=>{ if(e.target===infoModal) infoModal.classList.remove("open"); });
$$("[data-faq]").forEach(a=> a.addEventListener("click", e=>{
  e.preventDefault();
  const k = a.dataset.faq;
  const map = {
    ajuda:"<p>Central de ajuda: fale com a JRImports pelo WhatsApp ou e-mail informado no rodapé. Respondemos em horário comercial.</p>",
    faq:"<p><strong>Como comprar?</strong> Escolha o produto, adicione ao carrinho e finalize o pedido. O pagamento é confirmado pelo provedor real quando configurado.</p><p><strong>Qual o prazo de entrega?</strong> O prazo e o frete são calculados no checkout, conforme seu CEP.</p>",
    troca:"<p>Política de troca: o produto pode ser trocado em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor, desde que esteja sem uso e na embalagem original.</p>",
    privacidade:"<p>Política de privacidade: seus dados são usados somente para processar e entregar seu pedido. Não compartilhamos seus dados com terceiros sem sua autorização.</p>"
  };
  openInfo(a.textContent.trim(), map[k]||"<p>Informação disponível em breve.</p>");
}));
$$("[data-info]").forEach(a=> a.addEventListener("click", e=>{
  e.preventDefault();
  const k = a.dataset.info;
  openInfo(a.textContent.trim(), k==="entregas"
    ? "<p>Entregas para todo o Brasil. Prazo e frete calculados no checkout, conforme seu CEP e a disponibilidade em estoque.</p>"
    : "<p>Formas de pagamento: o pagamento é confirmado pelo provedor real quando configurado (cartão, Pix ou boleto, conforme o provedor). Nenhum pagamento é simulado neste site.</p>");
}));

/* CATEGORIAS — select + grade visual */
function renderCategorySelect(){
  const sel = $("#categorySelect"); if(!sel) return;
  sel.innerHTML = '<option value="todas">Todas as categorias</option>' + categories.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.name)+'</option>').join("");
  sel.value = state.category;
}
function renderCategories(){
  const grid = $("#categoriesGrid"); if(!grid) return;
  grid.innerHTML = categories.map(c=>{
    const n = products.filter(p=>p.category===c.id).length;
    return '<article class="category-card reveal visible" data-cat="'+esc(c.id)+'" tabindex="0" role="button" aria-label="Ver produtos de '+esc(c.name)+'">'
      + '<img src="'+esc(c.img)+'" alt="'+esc(c.name)+'" loading="lazy">'
      + '<div class="category-info"><span>Explorar</span><h3>'+esc(c.name)+'</h3><p>'+esc(c.desc||"")+' • '+n+' produto'+(n===1?"":"s")+'</p></div></article>';
  }).join("");
  $$(".category-card", grid).forEach(card=>{
    const go = ()=>{ state.category = card.dataset.cat; state.filter = "todos";
      $$(".filter-btn").forEach(b=> b.classList.toggle("active", b.dataset.filter==="todos"));
      renderCategorySelect(); renderProducts();
      document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
    };
    card.addEventListener("click", go);
    card.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" ") { e.preventDefault(); go(); } });
  });
}

/* VITRINE */
function filteredProducts(){
  let list = products.slice();
  if(state.category !== "todas") list = list.filter(p=> p.category === state.category);
  if(state.filter === "mais-vendidos") list = list.filter(p=> p.bestSeller);
  if(state.filter === "novidades") list = list.filter(p=> p.isNew);
  if(state.filter === "ofertas") list = list.filter(p=> discount(p) > 0);
  if(state.search){
    const q = state.search;
    list = list.filter(p=> (p.name+" "+p.desc+" "+catName(p.category)).toLowerCase().includes(q));
  }
  if(state.sort === "menor-preco") list.sort((a,b)=> a.price-b.price);
  else if(state.sort === "maior-preco") list.sort((a,b)=> b.price-a.price);
  else if(state.sort === "maior-desconto") list.sort((a,b)=> discount(b)-discount(a));
  else list.sort((a,b)=> (b.bestSeller?1:0)-(a.bestSeller?1:0) || (b.isNew?1:0)-(a.isNew?1:0));
  return list;
}
function productCard(p){
  const d = discount(p);
  const tag = p.tag ? '<span class="badge'+(p.tag==="OFERTA"?" badge-offer":"")+'">'+esc(p.tag)+'</span>' : "";
  const dt = d ? '<span class="discount-tag">−'+d+'%</span>' : "";
  return '<article class="product-card">'
    + '<div class="product-img"><img src="'+esc(p.img)+'" alt="'+esc(p.name)+'" loading="lazy">'+tag+dt+'</div>'
    + '<div class="product-body"><span class="product-cat">'+esc(catName(p.category))+'</span>'
    + '<h3>'+esc(p.name)+'</h3>'
    + '<p class="product-price">'+(p.oldPrice?'<s>'+money(p.oldPrice)+'</s>':"")+'<strong>'+money(p.price)+'</strong></p>'
    + '<p class="product-stock">'+(p.stock>0 ? (p.stock<=5 ? "Últimas "+p.stock+" unidades" : "Em estoque") : "Esgotado")+'</p>'
    + '<div class="product-actions"><button class="btn btn-outline" data-details="'+p.id+'">Ver detalhes</button>'
    + '<button class="btn btn-gold" data-add="'+p.id+'" '+(p.stock<=0?"disabled":"")+'>Adicionar</button></div>'
    + '</div></article>';
}
function renderProducts(){
  const grid = $("#productsGrid"); if(!grid) return;
  const list = filteredProducts();
  grid.innerHTML = list.map(productCard).join("");
  $("#emptyState").hidden = list.length > 0;
  $("#resultsInfo").textContent = list.length + " produto" + (list.length===1?"":"s") + (state.search ? ' para "'+state.search+'"' : "") + (state.category!=="todas" ? " em "+catName(state.category) : "");
  $$("[data-add]", grid).forEach(b=> b.addEventListener("click", ()=> addToCart(b.dataset.add, 1)));
  $$("[data-details]", grid).forEach(b=> b.addEventListener("click", ()=> openProduct(b.dataset.details)));
}
$("#filters").addEventListener("click", e=>{
  const btn = e.target.closest(".filter-btn"); if(!btn) return;
  $$(".filter-btn").forEach(b=> b.classList.remove("active"));
  btn.classList.add("active"); state.filter = btn.dataset.filter; renderProducts();
});
$("#sortSelect").addEventListener("change", e=>{ state.sort = e.target.value; renderProducts(); });
$("#categorySelect").addEventListener("change", e=>{ state.category = e.target.value; renderProducts(); });
$("#verOfertasBtn").addEventListener("click", ()=>{
  state.filter = "ofertas";
  $$(".filter-btn").forEach(b=> b.classList.toggle("active", b.dataset.filter==="ofertas"));
  renderProducts(); document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
});

/* MODAL PRODUTO */
const productModal = $("#productModal");
function openProduct(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  currentProduct = p;
  $("#pmImg").src = p.img; $("#pmImg").alt = p.name; $("#pmImg").classList.remove("zoomed");
  $("#pmBadge").textContent = p.tag || catName(p.category);
  $("#pmBadge").style.display = p.tag ? "" : "none";
  $("#pmName").textContent = p.name;
  $("#pmCategory").textContent = catName(p.category);
  $("#pmOldPrice").textContent = p.oldPrice ? money(p.oldPrice) : "";
  $("#pmPrice").textContent = money(p.price);
  $("#pmDiscount").textContent = discount(p) ? "−"+discount(p)+"%" : "";
  const st = $("#pmStock");
  st.textContent = p.stock>0 ? (p.stock<=5 ? "Últimas "+p.stock+" unidades em estoque" : "Em estoque — "+p.stock+" unidades disponíveis") : "Produto esgotado";
  st.className = "pm-stock" + (p.stock<=0 ? " out" : p.stock<=5 ? " low" : "");
  $("#pmDesc").textContent = p.desc;
  $("#pmQty").value = 1;
  $("#pmAddCart").disabled = p.stock<=0; $("#pmBuy").disabled = p.stock<=0;
  const rel = products.filter(x=> x.category===p.category && x.id!==p.id).slice(0,3);
  const relList = rel.length ? rel : products.filter(x=> x.id!==p.id).slice(0,3);
  $("#pmRelated").innerHTML = relList.map(r=> '<button type="button" data-rel="'+r.id+'"><img src="'+esc(r.img)+'" alt="'+esc(r.name)+'" loading="lazy"><span>'+esc(r.name)+' — '+money(r.price)+'</span></button>').join("");
  $$("#pmRelated [data-rel]").forEach(b=> b.addEventListener("click", ()=> openProduct(b.dataset.rel)));
  productModal.classList.add("open");
}
$("#closeProductModal").addEventListener("click", ()=> productModal.classList.remove("open"));
productModal.addEventListener("click", e=>{ if(e.target===productModal) productModal.classList.remove("open"); });
$("#pmImg").addEventListener("click", e=> e.target.classList.toggle("zoomed"));
$("#pmMinus").addEventListener("click", ()=>{ const q=$("#pmQty"); q.value = Math.max(1, parseInt(q.value||"1")-1); });
$("#pmPlus").addEventListener("click", ()=>{ const q=$("#pmQty"); q.value = Math.min(99, parseInt(q.value||"1")+1); });
$("#pmAddCart").addEventListener("click", ()=>{ if(currentProduct){ addToCart(currentProduct.id, parseInt($("#pmQty").value||"1")); } });
$("#pmBuy").addEventListener("click", ()=>{ if(currentProduct){ addToCart(currentProduct.id, parseInt($("#pmQty").value||"1"), true); productModal.classList.remove("open"); openCart(); } });
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ productModal.classList.remove("open"); $("#checkoutModal").classList.remove("open"); infoModal.classList.remove("open"); closeSearch(); closeCart(); closeMobile(); } });

/* CARRINHO */
const cartDrawer = $("#cartDrawer"), cartOverlay = $("#cartOverlay");
function saveCart(){ localStorage.setItem("jrimports_cart", JSON.stringify(cart)); }
function cartTotals(){
  let sub=0, old=0;
  cart.forEach(it=>{ const p=products.find(x=>x.id===it.id); if(!p) return; sub += p.price*it.qty; if(p.oldPrice) old += p.oldPrice*it.qty; });
  return {sub, disc: Math.max(0, old-sub), total: sub};
}
function renderCart(){
  const box = $("#cartItems"); if(!box) return;
  const count = cart.reduce((s,i)=> s+i.qty, 0);
  $("#cartCount").textContent = count;
  $("#cartDrawerCount").textContent = count ? "("+count+" item"+(count===1?"":"ns")+")" : "";
  if(!cart.length){ box.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.<br>Explore os produtos em destaque.</p>'; }
  else{
    box.innerHTML = cart.map(it=>{
      const p = products.find(x=>x.id===it.id); if(!p) return "";
      return '<div class="cart-item"><img src="'+esc(p.img)+'" alt="'+esc(p.name)+'">'
        + '<div><h4>'+esc(p.name)+'</h4><p>'+money(p.price)+'</p>'
        + '<div class="qty"><button type="button" data-dec="'+p.id+'" aria-label="Diminuir">−</button><span>'+it.qty+'</span><button type="button" data-inc="'+p.id+'" aria-label="Aumentar">+</button></div></div>'
        + '<button class="cart-remove" data-del="'+p.id+'">Remover</button></div>';
    }).join("");
    $$("[data-inc]", box).forEach(b=> b.addEventListener("click", ()=> changeQty(b.dataset.inc, 1)));
    $$("[data-dec]", box).forEach(b=> b.addEventListener("click", ()=> changeQty(b.dataset.dec, -1)));
    $$("[data-del]", box).forEach(b=> b.addEventListener("click", ()=>{ cart = cart.filter(i=> i.id!==b.dataset.del); saveCart(); renderCart(); }));
  }
  const t = cartTotals();
  $("#cartSubtotal").textContent = money(t.sub);
  $("#cartDiscount").textContent = "− "+money(t.disc);
  $("#cartTotal").textContent = money(t.total);
  const ct = $("#checkoutTotal"); if(ct) ct.textContent = money(t.total);
}
function changeQty(id, d){
  const it = cart.find(i=> i.id===id); if(!it) return;
  const p = products.find(x=>x.id===id);
  it.qty += d;
  if(p && it.qty > p.stock) it.qty = p.stock;
  if(it.qty <= 0) cart = cart.filter(i=> i.id!==id);
  saveCart(); renderCart();
}
function addToCart(id, qty, silent){
  const p = products.find(x=>x.id===id); if(!p || p.stock<=0){ toast("Produto indisponível no momento."); return; }
  const it = cart.find(i=> i.id===id);
  const next = (it?it.qty:0) + qty;
  if(next > p.stock){ toast("Quantidade maior que o estoque disponível ("+p.stock+")."); return; }
  if(it) it.qty = next; else cart.push({id, qty});
  saveCart(); renderCart();
  if(!silent) toast("Adicionado ao carrinho: "+p.name);
}
function openCart(){ renderCart(); cartDrawer.classList.add("open"); cartOverlay.classList.add("open"); }
function closeCart(){ cartDrawer.classList.remove("open"); cartOverlay.classList.remove("open"); }
$("#cartBtn").addEventListener("click", openCart);
$("#closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
$("#continueBtn").addEventListener("click", ()=>{ closeCart(); document.getElementById("produtos").scrollIntoView({behavior:"smooth"}); });
$("#cepBtn").addEventListener("click", ()=>{
  const cep = $("#cepInput").value.replace(/\D/g,"");
  $("#cepMsg").textContent = cep.length===8
    ? "CEP "+cep.slice(0,5)+"-"+cep.slice(5)+" registrado. O frete e o prazo serão confirmados na finalização, conforme sua região."
    : "Digite um CEP válido com 8 dígitos.";
});

/* CHECKOUT */
const checkoutModal = $("#checkoutModal");
$("#checkoutBtn").addEventListener("click", ()=>{
  if(!cart.length){ toast("Seu carrinho está vazio."); return; }
  renderCart(); $("#orderSuccess").hidden = true; $("#checkoutForm").style.display = "";
  checkoutModal.classList.add("open");
});
$("#closeCheckoutModal").addEventListener("click", ()=> checkoutModal.classList.remove("open"));
checkoutModal.addEventListener("click", e=>{ if(e.target===checkoutModal) checkoutModal.classList.remove("open"); });
$("#checkoutForm").addEventListener("submit", e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const orders = JSON.parse(localStorage.getItem("jrimports_orders")||"[]");
  const t = cartTotals();
  const order = {
    id: "JR-" + String(orders.length+1).padStart(4,"0"),
    date: new Date().toISOString().slice(0,10),
    customer: fd.get("nome"), email: fd.get("email"), phone: fd.get("telefone"),
    cep: fd.get("cep"), address: fd.get("endereco"), city: fd.get("cidade"), obs: fd.get("obs")||"",
    items: cart.map(it=>{ const p=products.find(x=>x.id===it.id); return {id:it.id, name:p?p.name:it.id, price:p?p.price:0, qty:it.qty}; }),
    total: t.total, status: "Pendente"
  };
  // baixa de estoque
  cart.forEach(it=>{ const p=products.find(x=>x.id===it.id); if(p) p.stock = Math.max(0, p.stock-it.qty); });
  save("jrimports_products", products);
  orders.push(order); localStorage.setItem("jrimports_orders", JSON.stringify(orders));
  cart = []; saveCart(); renderCart(); renderProducts();
  e.target.style.display = "none";
  $("#orderNumber").textContent = order.id;
  $("#orderSuccess").hidden = false;
  toast("Pedido "+order.id+" criado com status Pendente.");
});
$("#orderSuccessBtn").addEventListener("click", ()=>{ checkoutModal.classList.remove("open"); closeCart(); });

/* RODAPÉ DINÂMICO */
$("#year").textContent = new Date().getFullYear();
if(settings.cnpj) $("#footerCnpj").textContent = "CNPJ: "+settings.cnpj;
if(settings.email) $("#footerContact").textContent = "Atendimento: "+settings.email;

/* INIT */
renderCategorySelect();
renderCategories();
renderProducts();
renderCart();
})();
