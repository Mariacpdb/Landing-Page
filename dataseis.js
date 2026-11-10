/* Data-SEIS WordPress: navegacao, pesquisa, favoritos e links QuickSight em nova aba. */
(function () {
  'use strict';
  /* Incorporacao no iframe desligada: agora usamos links diretos em nova aba. */
  const EMBED_URLS = {
    'radar-judicial-1g': ''
  };
  /* LINKS DIRETOS: abre os paineis em outra aba via SSO institucional.
     OBS: todas as URLs abaixo sao /dashboards/ (nao /embed/share/).
     Os quatro paineis de Controle apontam para sheets diferentes do mesmo dashboard.
     Metas Nacionais nao existe no catalogo atual de 29 itens e nao foi adicionada.
     RLS da Consulta Processual ainda precisa de validacao institucional.
     Nunca incluir credenciais AWS neste arquivo. */
  const PANEL_LINKS = {
    // Gestão Estratégica — URLs canonicas para SSO, sem /embed/share/
    'metas-nacionais': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/58092298-c1d3-4f2d-81ce-1f972fc50b2d',
    'premio-fucsia': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/64019b38-823d-4e08-882f-445f4e4f7604',
    // Controle da Unidade
    'radar-judicial-1g': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/6a9cd74c-0396-483b-95fc-91d2726c0dbc',
    'controle-acervo': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/079da1de-abdc-4ff7-be1d-7cdae9e92af4/sheets/079da1de-abdc-4ff7-be1d-7cdae9e92af4_098455bb-377b-4b82-92fc-66e0c4f90637',
    'controle-conclusos': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/079da1de-abdc-4ff7-be1d-7cdae9e92af4/sheets/079da1de-abdc-4ff7-be1d-7cdae9e92af4_f5076d0d-849a-4371-acfe-dfd8f38aefc9',
    'controle-entradas-saidas': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/079da1de-abdc-4ff7-be1d-7cdae9e92af4/sheets/079da1de-abdc-4ff7-be1d-7cdae9e92af4_826a3d15-1368-4e31-ace6-d3fc06ccc71d',
    'controle-produtividade': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/079da1de-abdc-4ff7-be1d-7cdae9e92af4/sheets/079da1de-abdc-4ff7-be1d-7cdae9e92af4_06daaca6-fa58-4541-90fa-6b5f59311cb1',
    // Produtividade
    'prod-boletim': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/77687204-ea35-4e25-ab62-5fba3316046a',
    'prod-magistrados': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/16d9179f-5062-4c8d-b610-3a991a7db96e',
    'prod-pessoa': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/cf2eedec-3ff6-43cc-b588-ebc435fd7094',
    // Conselhos Superiores
    'cjf-autoinspecao': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/0fac9036-b312-45cd-9f3a-4f92e24602a6',
    'cjf-questoes': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/71fd21d7-b0cc-40d2-8a28-1521540adedd',
    'cjf-sem-primeiro-julgamento': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/394ff371-a04b-4c25-a9a1-d551f018553e',
    'cnj-boletim-acervo': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/0e695afe-73b7-4562-b10b-b849bc3ab37f',
    'cnj-boletim-produtividade': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/77687204-ea35-4e25-ab62-5fba3316046a',
    'cnj-boletim-gerencial': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/d896f97d-7e28-4db8-9632-60d46e5d3f25',
    'cnj-acervo-atual': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/0338fc56-2955-40b8-bf7a-33f88c0f5783',
    'cnj-estatisticas-unidade': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/b06e04c6-dbd5-4e80-81cd-d10df8e61244',
    'cnj-acervo-regiao': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/e316976f-ccb1-4552-bfae-a76a507348fc',
    'cnj-acervo-segundo-grau': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/c29168ce-ab75-4973-baa3-71b0434c29f8',
    // Acervo
    'acervo-boletim': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/0e695afe-73b7-4562-b10b-b849bc3ab37f',
    'acervo-gerencial': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/d896f97d-7e28-4db8-9632-60d46e5d3f25',
    'acervo-atual': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/0338fc56-2955-40b8-bf7a-33f88c0f5783',
    'acervo-estatisticas': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/b06e04c6-dbd5-4e80-81cd-d10df8e61244',
    'acervo-especializacao': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/26fae9c8-a4b8-4165-978f-594a21597dc8',
    'acervo-regiao': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/e316976f-ccb1-4552-bfae-a76a507348fc',
    'acervo-segundo-grau': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/c29168ce-ab75-4973-baa3-71b0434c29f8',
    // Movimentação Processual — RLS pendente
    'mov-consulta': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/a80953d8-439c-4127-9527-b71ad3a667bb',
    // Movimentação Processual — confirmar destino
    'mov-tarefas': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/a80953d8-439c-4127-9527-b71ad3a667bb',
    // Ordem Cronológica — link visível diferente de destino
    'ordem-primeiro': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/d2a39381-4600-416e-aa98-2fd35cdd579a',
    // Ordem Cronológica
    'ordem-segundo': 'https://sa-east-1.quicksight.aws.amazon.com/sn/account/trf6-quick/dashboards/9d217df3-3e61-43c6-806d-fcc9cb6e1edd'
  };
  const STORAGE_KEY = 'dataseis-central-favoritos';
  function start() {
    const root = document.getElementById('ds-central-final');
    if (!root || root.classList.contains('ds-app-ready')) return;
    const screens = Array.from(root.querySelectorAll('.ds-view[id]'));
    const byId = new Map(screens.map(el => [el.id, el]));
    const links = Array.from(root.querySelectorAll('.ds-nav-link,.ds-mobile-links a'));
    const catalogLinks = Array.from(root.querySelectorAll('.ds-catalog-item'));
    const panelMeta = new Map(Array.from(root.querySelectorAll('.ds-panel[data-panel]')).map(el => [el.dataset.panel, el]));
    let favorites = [];
    try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); if (Array.isArray(saved)) favorites = saved.filter(k => typeof k === 'string' && panelMeta.has(k)); } catch (_) {}
    function saveFavorites() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); } catch (_) {} }
    function updateFavorites() {
      root.querySelectorAll('[data-favorite]').forEach(btn => {
        const chosen = favorites.includes(btn.dataset.favorite);
        btn.textContent = chosen ? '★' : '☆';
        btn.setAttribute('aria-pressed', String(chosen));
        const meta = panelMeta.get(btn.dataset.favorite);
        if (meta) btn.setAttribute('aria-label', (chosen ? 'Remover dos favoritos: ' : 'Adicionar aos favoritos: ') + meta.dataset.title);
      });
      const list = root.querySelector('#ds-favorites-items');
      list.replaceChildren();
      if (!favorites.length) {
        const p = document.createElement('p'); p.textContent = 'Você ainda não adicionou painéis aos favoritos.'; list.appendChild(p);
      } else {
        favorites.forEach(id => {
          const meta = panelMeta.get(id); if (!meta) return;
          const a = document.createElement('a'); a.href = '#ds-painel-' + id; a.textContent = meta.dataset.title;
          list.appendChild(a);
        });
      }
    }
    /* Abrir somente os painéis mapeados em nova aba, sem alterar
       links de categorias, menu, pesquisa ou favoritos. */
    root.addEventListener('click', ev => {
      const anchor = ev.target.closest('a[href^="#ds-painel-"]');
      if (!anchor || !root.contains(anchor)) return;
      const panelId = anchor.getAttribute('href').slice('#ds-painel-'.length);
      const externalUrl = PANEL_LINKS[panelId];
      if (!externalUrl) return;
      try {
        const u = new URL(externalUrl);
        if (u.protocol !== 'https:' || !/(^|\.)quicksight\.aws\.amazon\.com$/i.test(u.hostname)) return;
      } catch (_) { return; }
      ev.preventDefault();
      ev.stopImmediatePropagation();
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }, true);
    root.addEventListener('click', ev => {
      const favorite = ev.target.closest('[data-favorite]');
      if (!favorite || !root.contains(favorite)) return;
      ev.preventDefault();
      const id = favorite.dataset.favorite;
      favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
      saveFavorites(); updateFavorites();
    });
    const search = root.querySelector('#ds-search-input');
    const status = root.querySelector('#ds-search-result');
    const empty = root.querySelector('#ds-search-empty');
    function norm(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR'); }
    function filter() {
      const q = norm(search.value.trim()); let found = 0;
      root.querySelectorAll('.ds-catalog-group').forEach(group => {
        let groupCount = 0;
        group.querySelectorAll('.ds-catalog-item').forEach(a => {
          const visible = norm(a.dataset.search).includes(q); a.hidden = !visible;
          if (visible) {found++; groupCount++;}
        });
        group.hidden = groupCount === 0;
      });
      status.textContent = q ? found + (found === 1 ? ' painel encontrado.' : ' painéis encontrados.') : catalogLinks.length + ' painéis disponíveis para consulta.';
      empty.hidden = found !== 0;
    }
    search.addEventListener('input', filter);
    function safeEmbed(url) {
      if (!url) return false;
      try {
        const u = new URL(url);
        return u.protocol === 'https:' && /(^|\.)quicksight\.aws\.amazon\.com$/i.test(u.hostname) && /\/(embed|embedding)\//.test(u.pathname);
      } catch (_) { return false; }
    }
    function syncEmbeds(current) {
      root.querySelectorAll('.ds-embed-frame').forEach(frame => {
        if (!current.contains(frame)) { frame.src = 'about:blank'; frame.remove(); }
      });
      if (!current.matches('.ds-view-panel')) return;
      const panelId = current.dataset.panelId;
      const url = EMBED_URLS[panelId];
      if (!safeEmbed(url)) return;
      const shell = current.querySelector('.ds-embed-shell');
      if (!shell) return;
      const message = shell.querySelector('.ds-embed-unavailable');
      if (message) message.hidden = true;
      let iframe = shell.querySelector('iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.className = 'ds-embed-frame';
        const title = current.querySelector('h2');
        iframe.title = title ? title.textContent : 'Painel QuickSight';
        iframe.setAttribute('allowfullscreen','');
        iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
        shell.appendChild(iframe);
      }
      if (iframe.getAttribute('src') !== url) iframe.src = url;
    }
    function navigate(initial) {
      const route = decodeURIComponent(location.hash.slice(1));
      const current = byId.get(route) || byId.get('ds-inicio');
      screens.forEach(screen => {
        const active = screen === current;
        screen.classList.toggle('ds-view-active', active);
        screen.setAttribute('aria-hidden', String(!active));
      });
      const highlighted = current.matches('.ds-view-panel') ? current.dataset.parent : current.id;
      links.forEach(a => {
        const active = a.getAttribute('href') === '#' + highlighted;
        a.classList.toggle('ds-nav-selected',active);
        if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
      });
      syncEmbeds(current);
      if (!initial) root.scrollIntoView({behavior:'auto',block:'start'});
    }
    root.classList.add('ds-app-ready');
    updateFavorites();filter();navigate(true);
    window.addEventListener('hashchange', () => navigate(false));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();