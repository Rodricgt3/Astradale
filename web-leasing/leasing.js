'use strict';

(async () => {
  const catalog = document.querySelector('[data-mods]');
  const form = document.querySelector('#request');
  if (!catalog && !form) return;

  const params = new URLSearchParams(location.search);
  const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  const money = amount => currency.format(amount) + ' MXN';
  const status = document.querySelector(catalog ? '#quote-status' : '#request-status');
  const storageKey = 'fomo-leasing-quote-v1';

  try {
    const configUrl = new URL('config.json', document.currentScript.src);
    const response = await fetch(configUrl);
    if (!response.ok) throw new Error('Configuración no disponible');
    const { plans, modules } = await response.json();
    const owns = (object, key) => Object.hasOwn(object, key);
    let draft = {};
    try { draft = JSON.parse(sessionStorage.getItem(storageKey)) || {}; } catch {}
    const selected = new Set(Array.isArray(draft.modules) ? draft.modules.filter(id => owns(modules, id)) : []);
    const planField = catalog ? document.querySelector('#quote-plan') : form.elements.plan;
    const initial = catalog || params.get('tipo') === 'mods' ? draft.plan : params.get('plan');
    if (owns(plans, initial)) planField.value = initial;

    function estimate(planId, moduleIds) {
      const plan = owns(plans, planId) ? plans[planId] : null;
      const lines = [...moduleIds].map(id => ({
        id, ...modules[id],
        incluido: Boolean(plan?.included.includes(id))
      }));
      const implementation = lines.reduce((sum, item) => sum + (item.incluido ? 0 : item.price), 0);
      return { plan, lines, implementation, first: plan ? plan.monthly + (plan.hostingMonthly ?? 0) + implementation : null,
        monthly: plan ? plan.monthly + (plan.hostingMonthly ?? 0) : null };
    }

    function rows(quote) {
      return [
        ['Suscripción mensual del sitio', quote.plan ? money(quote.plan.monthly) : 'Por definir'],
        ['Alojamiento mensual', quote.plan?.hostingMonthly != null ? money(quote.plan.hostingMonthly) : 'Por confirmar y desglosar en la propuesta'],
        ['Implementación única de módulos', money(quote.implementation)],
        ['Servicios Cloud adicionales', quote.lines.some(item => ['publisher', 'monitor', 'inventory'].includes(item.id)) ? 'Requiere cotizar capacidad y servicios' : 'Según los requisitos del proyecto'],
        ['Dominio y licencias externas', 'Se cotizan por separado si aplican'],
        ['Costos pendientes de evaluación', 'Compatibilidad, integraciones y servicios adicionales'],
        ['Primer mes · subtotal conocido', quote.first === null ? 'Elige un plan' : money(quote.first)],
        ['Mensualidad posterior · subtotal conocido', quote.monthly === null ? 'Elige un plan' : money(quote.monthly)]
      ];
    }

    if (catalog) {
      const list = document.querySelector('#quote-items');
      const totals = document.querySelector('#quote-totals');
      const buttons = [...catalog.querySelectorAll('[data-mod]')];
      function render(message = '') {
        const quote = estimate(planField.value, selected);
        for (const button of buttons) {
          const id = button.dataset.mod;
          const included = quote.plan?.included.includes(id);
          button.disabled = Boolean(included);
          button.setAttribute('aria-pressed', String(!included && selected.has(id)));
          button.textContent = included ? 'Incluido en tu plan' : selected.has(id) ? 'Quitar de mi cotización' : 'Añadir a mi cotización';
        }
        list.replaceChildren();
        for (const item of quote.lines) {
          const li = document.createElement('li');
          li.textContent = item.name + ' · ' + (item.incluido ? 'Incluido en el plan' : money(item.price)) + '. ' + item.extras + ' ';
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.textContent = 'Quitar';
          remove.setAttribute('aria-label', 'Quitar ' + item.name);
          remove.addEventListener('click', () => {
            selected.delete(item.id);
            render(item.name + ' retirado.');
            buttons.find(button => button.dataset.mod === item.id)?.focus();
          });
          li.append(remove);
          list.append(li);
        }
        totals.replaceChildren();
        for (const [label, amount] of rows(quote)) {
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          dt.textContent = label;
          dd.textContent = amount;
          totals.append(dt, dd);
        }
        status.textContent = message;
        try { sessionStorage.setItem(storageKey, JSON.stringify({ plan: planField.value, modules: [...selected] })); }
        catch { status.textContent += ' La selección se conserva mientras esta página esté abierta.'; }
      }
      for (const button of buttons) button.addEventListener('click', () => {
        const id = button.dataset.mod;
        if (selected.has(id)) {
          selected.delete(id);
          render(modules[id].name + ' retirado.');
        } else {
          selected.add(id);
          render(modules[id].name + ' añadido.');
        }
      });
      planField.addEventListener('change', () => render('Plan actualizado.'));
      render();
      return;
    }

    const type = form.elements.tipo;
    if ([...type.options].some(option => option.value === params.get('tipo'))) type.value = params.get('tipo');
    const buyout = document.querySelector('#buyout-fields');
    const preview = document.querySelector('#request-quote');
    const resource = params.get('recurso');
    if (resource && type.value === 'cloud') form.elements.comentarios.value = 'Recurso a ampliar: ' + resource.slice(0, 100);
    function update() {
      buyout.hidden = type.value !== 'compra';
      buyout.disabled = buyout.hidden;
      form.elements.motivo.required = !buyout.hidden;
      const quote = estimate(planField.value, type.value === 'mods' ? selected : []);
      preview.textContent = type.value === 'mods'
        ? quote.lines.map(item => item.name + (item.incluido ? ' (incluido)' : '')).join(', ') || 'Sin módulos seleccionados.'
        : '';
    }
    update();
    type.addEventListener('change', update);
    planField.addEventListener('change', update);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const fields = Object.fromEntries(new FormData(form));
      const quote = estimate(fields.plan, fields.tipo === 'mods' ? selected : []);
      const lines = [
        'Fomo Effect · Solicitud: ' + type.selectedOptions[0].textContent,
        'Fecha: ' + new Date().toISOString(),
        'Estado: borrador preparado, pendiente de entrega',
        'Cliente: ' + fields.cliente, 'Correo: ' + fields.correo, 'Sitio: ' + fields.sitio,
        'Plan: ' + (quote.plan?.name ?? 'Por definir'),
        ...quote.lines.map(item => item.name + ': ' + (item.incluido ? 'incluido' : money(item.price)) + '. ' + item.extras),
        ...(fields.tipo === 'mods' || fields.tipo === 'leasing' ? rows(quote).map(([label, amount]) => label + ': ' + amount) : ['Servicios pendientes: cotización individual.']),
        ...(!buyout.hidden ? ['Motivo: ' + fields.motivo, 'Fomo Cloud: ' + fields.cloud, 'Mantenimiento: ' + fields.mantenimiento, 'Migración: ' + fields.migracion] : []),
        'Comentarios: ' + fields.comentarios
      ];
      const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }));
      const download = document.createElement('a');
      download.href = url;
      download.download = 'solicitud-fomo-effect.txt';
      download.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = 'Solicitud preparada. Compártela por WhatsApp para entregarla.';
    });
    form.querySelector('button[type=submit]').disabled = false;
  } catch {
    status.textContent = 'No pudimos cargar los planes. Recarga la página para volver a intentarlo.';
  }
})();
