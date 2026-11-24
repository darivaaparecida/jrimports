# JRImports v2 — Loja premium (projeto novo, separado)

Versão melhor da JRImports, construída do zero como **outro projeto**, sem usar o projeto Lovable antigo (ID `3ddd10da-df9d-4996-916b-a1b971fa6c37`) e sem gastar créditos do Lovable.

Site estático (HTML/CSS/JS vanilla, sem build step), rota Git/GitHub Pages.

## Arquivos
- `index.html` — loja: hero, categorias, destaques, promo, mais vendidos, novidades, catálogo com filtros reais, produto (modal com galeria/zoom/variações), carrinho, checkout, área do cliente, institucionais, newsletter, WhatsApp flutuante
- `styles.css` — identidade preto `#080808` / dourado `#D4AF37`
- `app.js` — lógica da loja, dados em `localStorage` (chaves `jrimports2_*`)
- `admin.html` / `admin.js` / `admin.css` — painel administrativo completo
- `robots.txt`, `sitemap.xml` — SEO

## Admin
Abra `admin.html`. Senha inicial: **`admin123`** — altere em Configurações → Alterar senha do admin.

Dashboard mostra dados **reais** do navegador (faturamento, vendas dia/mês, pedidos, ticket médio, estoque baixo, gráfico dos últimos 7 dias). Começa em **0** — nenhum número é inventado. Mais vendidos também só aparecem com vendas reais registradas.

## Catálogo inicial
12 produtos demo realistas (importados, preços em BRL, Unsplash), editáveis/excluíveis no admin. São produtos de demonstração — cadastre os produtos reais no admin.

## Publicar no GitHub Pages
1. Crie um repositório novo no GitHub (ex.: `jrimports-v2`) — o Muse não consegue criar repositórios pela API.
2. Envie estes arquivos para a branch `main`.
3. Em Settings → Pages → Deploy from a branch → `main` / root → Save.
4. Aguarde alguns minutos e abra `https://<seu-usuario>.github.io/jrimports-v2/`.

## Limitações honestas
- **localStorage não sincroniza** entre dispositivos/navegadores: produtos, pedidos e clientes ficam só no navegador onde foram cadastrados. Para sincronizar de verdade é preciso backend/banco de dados.
- **Pagamento real precisa de gateway + backend**: o checkout registra o pedido como `Aguardando pagamento` e **não simula pagamento aprovado**. Configure Mercado Pago / InfinitePay no admin (campo Gateway) e integre via backend antes de vender.
- **Senha do admin é demo**: protege só a tela neste navegador, não é segurança de produção.
- **ViaCEP**: a busca de endereço usa a API pública ViaCEP; sem internet, preencha o endereço manualmente.
- **Autenticação do cliente é local**: senhas ficam só neste navegador (hash simples, demonstração). Para produção, use autenticação com backend.
- WhatsApp: configure o número no admin (só números, com DDI+DDD). Sem número configurado, o botão do produto avisa que ainda não foi configurado.
- Textos legais/institucionais são modelos configuráveis — revise conforme a operação real e a LGPD.
