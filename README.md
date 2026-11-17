# JRImports — E-commerce premium de importados

Loja estática premium em HTML, CSS e JavaScript puro — **sem Lovable, sem backend, sem gastar créditos do Lovable**. Feita para publicar no GitHub Pages.

## Identidade
- Preto predominante `#080808` / `#111111` / `#171717`, dourado metálico `#D4AF37` / `#F5D77A` / `#8C6A1D`, branco `#F5F5F5`, cinza `#929292`.
- Fontes: Montserrat (títulos) + Manrope/Inter (textos), via Google Fonts.
- Sem emojis na interface; ícones em SVG minimalista estilo Lucide.

## Arquivos
| Arquivo | O quê |
|---|---|
| `index.html` | Loja completa: intro, header, hero, diferenciais, vitrine, categorias, banner, sobre, depoimentos, carrinho, checkout, footer |
| `styles.css` | Todo o CSS premium, responsivo mobile-first |
| `app.js` | Lógica da loja: produtos, filtros, busca, carrinho, checkout, pedidos |
| `admin.html` | Painel administrativo |
| `admin.css` | Complementos de estilo do admin |
| `admin.js` | Lógica do admin: dashboard, CRUD de produtos/categorias, pedidos, configurações |
| `robots.txt` / `sitemap.xml` | SEO básico |

## Como abrir localmente
Abra `index.html` no navegador, ou sirva a pasta com um servidor estático:
```bash
cd jrimports
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Como publicar no GitHub Pages
1. Suba todos os arquivos para o repositório `darivaaparecida/jrimports`, branch `main`, na raiz.
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → branch `main` / `/ (root)` → Save**.
3. O site fica em `https://darivaaparecida.github.io/jrimports/`

## Dados (localStorage, sem backend)
- `jrimports_products` — produtos (seed inicial com 12 produtos demonstrativos)
- `jrimports_categories` — categorias (seed com 6)
- `jrimports_cart` — carrinho
- `jrimports_orders` — pedidos criados no checkout
- `jrimports_settings` — e-mail, WhatsApp, CNPJ e senha do admin

Os dados ficam no navegador de quem acessa. Para uma loja real com vários dispositivos, será preciso um backend/banco de dados (ex.: Supabase/Firebase) — a estrutura de dados já está separada por chaves para facilitar essa migração.

## Painel administrativo
- Acesse `admin.html` (ou o link “Abrir painel administrativo” no modal de conta).
- **Senha inicial: `admin123`** — troque-a em **Configurações** no próprio painel.
- Dashboard com vendas, pedidos, pendentes, produtos, estoque baixo e mais vendidos — **todos com dados reais do localStorage (0 quando vazio, sem números inventados)**.
- CRUD completo de produtos e categorias, atualização de status de pedidos, configurações de contato e senha.

## Checkout e pagamento
O checkout **não simula pagamento**. Ele cria o pedido com status **Pendente** e informa claramente que o pagamento só será confirmado pelo provedor real quando configurado (ex.: Mercado Pago, Stripe, Pix). Para receber de verdade, integre um provedor de pagamento e um backend para confirmar o pedido.

## Depoimentos
Os 3 depoimentos da página inicial são demonstrativos e estão marcados como **“Exemplo”** até que avaliações reais sejam cadastradas.

## O que está pronto / limitações
- ✅ Loja completa, responsiva (320 a 1920px), animações suaves, intro cinematográfica, carrinho, checkout, admin.
- ⚠️ Dados só no navegador (localStorage) — não sincronizam entre dispositivos sem backend.
- ⚠️ Pagamento real precisa de provedor + backend.
- ⚠️ Admin com senha simples local — não usar como única proteção em produção com backend; serve como painel demonstrativo/local.
