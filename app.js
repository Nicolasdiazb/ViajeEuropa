// Food ledger for the November 2026 family trip.
// Pace uses finished days only, so a morning does not look "under budget"
// just because today's meals have not been paid yet.

const STORAGE_KEY = "europe-trip-2026-v1";
const REHEARSE_KEY = "europe-trip-2026-rehearse";
const TOTAL_CENTS = 150000;
const RESERVE_CENTS = 10000;
const PLAN_CENTS = 140000;

const CATEGORIES = [
  { id: "meals", label: "Comidas y mercado", budget: 116500 },
  { id: "cafes", label: "Cafés y onces", budget: 23500 },
  { id: "reserve", label: "Reserva", budget: 10000 },
  { id: "other", label: "Otro", budget: 0 },
];

const DAYS = [
  {
    date: "2026-11-20",
    city: "Salida",
    meals: 0,
    cafes: 0,
    note: "Día anterior al plan de comida. Lo que anotes igual sale de los €1.500.",
    items: [],
  },
  {
    date: "2026-11-21",
    city: "Aeropuertos · París / Ámsterdam",
    meals: 189,
    cafes: 0,
    note: "Traslado nocturno hacia París.",
    items: [
      { meal: "Almuerzo", place: "Aeropuerto Charles de Gaulle", planned: 105, category: "meals" },
      { meal: "Cena", place: "Aeropuerto Schiphol", planned: 84, category: "meals" },
    ],
  },
  {
    date: "2026-11-22",
    city: "París",
    meals: 214,
    cafes: 28,
    note: "El supermercado cubre las comidas del 22 al 25 de noviembre, incluida la comida para los traslados.",
    items: [
      { meal: "Desayuno", place: "Afuera", planned: 49, category: "meals" },
      { meal: "Supermercado", place: "Mercado", planned: 165, category: "meals", covers: "Cubre comidas del 22 al 25" },
      { meal: "Almuerzo", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cena", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 28, category: "cafes" },
    ],
  },
  {
    date: "2026-11-23",
    city: "París",
    meals: 0,
    cafes: 28,
    note: "Las comidas salen del supermercado del 22. Anota solo lo nuevo, como cafés.",
    items: [
      { meal: "Desayuno", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Almuerzo", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cena", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 28, category: "cafes" },
    ],
  },
  {
    date: "2026-11-24",
    city: "París",
    meals: 0,
    cafes: 28,
    note: "Puede ser el día de Versalles. Lleva comida del supermercado del 22.",
    items: [
      { meal: "Desayuno", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Almuerzo", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cena", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 28, category: "cafes" },
    ],
  },
  {
    date: "2026-11-25",
    city: "París → Chamonix",
    meals: 0,
    cafes: 28,
    note: "Lleva comida del supermercado del 22 para el traslado.",
    items: [
      { meal: "Desayuno", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Almuerzo", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cena", place: "Supermercado del 22", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 28, category: "cafes" },
    ],
  },
  {
    date: "2026-11-26",
    city: "Chamonix",
    meals: 336,
    cafes: 42,
    note: "El supermercado cubre la cena del 26, las tres comidas del 27 y el desayuno del 28.",
    items: [
      { meal: "Desayuno", place: "Afuera", planned: 56, category: "meals" },
      { meal: "Almuerzo", place: "Afuera", planned: 140, category: "meals" },
      { meal: "Supermercado", place: "Mercado", planned: 140, category: "meals", covers: "Cubre la cena del 26 y hasta el desayuno del 28" },
      { meal: "Cena", place: "Supermercado del 26", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 42, category: "cafes" },
    ],
  },
  {
    date: "2026-11-27",
    city: "Chamonix",
    meals: 0,
    cafes: 42,
    note: "Las comidas salen del supermercado del 26. Anota solo lo nuevo, como cafés.",
    items: [
      { meal: "Desayuno", place: "Supermercado del 26", planned: 0, covered: true },
      { meal: "Almuerzo", place: "Supermercado del 26", planned: 0, covered: true },
      { meal: "Cena", place: "Supermercado del 26", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 42, category: "cafes" },
    ],
  },
  {
    date: "2026-11-28",
    city: "Chamonix → París → Ámsterdam",
    meals: 210,
    cafes: 14,
    note: "El plan dice salida de Chamonix a las 10:00. Confírmalo con los tiquetes.",
    items: [
      { meal: "Desayuno", place: "Supermercado del 26", planned: 0, covered: true },
      { meal: "Almuerzo", place: "Afuera", planned: 105, category: "meals" },
      { meal: "Cena", place: "Afuera", planned: 105, category: "meals" },
      { meal: "Cafés y onces", place: "", planned: 14, category: "cafes" },
    ],
  },
  {
    date: "2026-11-29",
    city: "Ámsterdam",
    meals: 216,
    cafes: 25,
    note: "El minimercado también cubre el desayuno del 30.",
    items: [
      { meal: "Desayuno", place: "Afuera", planned: 56, category: "meals" },
      { meal: "Almuerzo", place: "Afuera", planned: 105, category: "meals" },
      { meal: "Minimercado", place: "Mercado", planned: 55, category: "meals", covers: "Cubre la cena de hoy y el desayuno del 30" },
      { meal: "Cena", place: "Minimercado del 29", planned: 0, covered: true },
      { meal: "Cafés y onces", place: "", planned: 25, category: "cafes" },
    ],
  },
  {
    date: "2026-11-30",
    city: "Regreso",
    meals: 0,
    cafes: 0,
    note: "El desayuno sale del minimercado del 29. Las otras comidas dependen de lo que incluyan los vuelos.",
    items: [
      { meal: "Desayuno", place: "Minimercado del 29", planned: 0, covered: true },
      { meal: "Otras comidas", place: "Incluidas en los vuelos, si los tiquetes lo dicen", planned: 0, covered: true },
    ],
  },
];

function budgetCents(day) {
  return (day.meals + day.cafes) * 100;
}

function auditPlan() {
  const problems = [];
  const meals = DAYS.reduce((sum, day) => sum + day.meals, 0);
  const cafes = DAYS.reduce((sum, day) => sum + day.cafes, 0);
  if (meals !== 1165) problems.push(`meals ${meals}`);
  if (cafes !== 235) problems.push(`cafes ${cafes}`);
  if (meals * 100 + cafes * 100 !== PLAN_CENTS) problems.push("plan cents");
  if (PLAN_CENTS + RESERVE_CENTS !== TOTAL_CENTS) problems.push("total");
  const expected = [
    "2026-11-20", "2026-11-21", "2026-11-22", "2026-11-23", "2026-11-24",
    "2026-11-25", "2026-11-26", "2026-11-27", "2026-11-28", "2026-11-29", "2026-11-30",
  ];
  if (DAYS.map((day) => day.date).join() !== expected.join()) problems.push("dates");
  for (const day of DAYS) {
    const sum = day.items.reduce((total, item) => total + item.planned, 0);
    if (sum !== day.meals + day.cafes) problems.push(`${day.date} items ${sum}`);
    for (const item of day.items) {
      if (item.covered && item.planned !== 0) problems.push(`${day.date} covered cost`);
    }
  }
  return problems;
}

function parseEurosToCents(input) {
  let text = String(input ?? "").trim().replace(/\s/g, "").replace(/€/g, "");
  if (!text) return null;
  let normalized = null;
  const hasDot = text.includes(".");
  const hasComma = text.includes(",");
  if (hasDot && hasComma) {
    const decimalSep = text.lastIndexOf(".") > text.lastIndexOf(",") ? "." : ",";
    const thousandsSep = decimalSep === "." ? "," : ".";
    const parts = text.split(decimalSep);
    if (parts.length !== 2) return null;
    const whole = parts[0].split(thousandsSep).join("");
    const frac = parts[1];
    if (!/^\d+$/.test(whole) || !/^\d{1,2}$/.test(frac)) return null;
    normalized = `${whole}.${frac}`;
  } else if (hasDot || hasComma) {
    const bits = text.split(hasDot ? "." : ",");
    if (bits.length === 2) {
      const whole = bits[0] === "" ? "0" : bits[0];
      if (/^\d{1,4}$/.test(whole) && /^\d{1,2}$/.test(bits[1])) normalized = `${whole}.${bits[1]}`;
    }
    if (!normalized && bits.every((bit, index) => (index === 0 ? /^\d{1,3}$/ : /^\d{3}$/).test(bit))) {
      normalized = bits.join("");
    }
    if (!normalized) return null;
  } else if (/^\d+$/.test(text)) {
    normalized = text;
  } else {
    return null;
  }
  const [whole, frac = ""] = normalized.split(".");
  if (frac.length > 2) return null;
  const cents = Number(whole) * 100 + Number((frac + "00").slice(0, 2));
  if (!Number.isSafeInteger(cents) || cents <= 0 || cents > TOTAL_CENTS) return null;
  return cents;
}

function formatCents(cents) {
  const negative = cents < 0;
  const abs = Math.abs(cents);
  const euros = Math.floor(abs / 100);
  const frac = abs % 100;
  const body = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(euros);
  const text = frac ? `${body},${String(frac).padStart(2, "0")}` : body;
  return `${negative ? "−" : ""}€${text}`;
}

function formatSigned(cents) {
  if (cents > 0) return `+${formatCents(cents)}`;
  return formatCents(cents);
}

function categoryLabel(id) {
  return CATEGORIES.find((category) => category.id === id)?.label || "Otro";
}

function findDay(date) {
  return DAYS.find((day) => day.date === date) || null;
}

function parseDay(iso) {
  return new Date(`${iso}T12:00:00`);
}

function realTodayISO(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function formatDay(iso) {
  const label = parseDay(iso).toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return label.replace(/[.,]/g, "").replace(/\s+/g, " ").trim();
}

function daysUntil(target, from) {
  return Math.round((parseDay(target) - parseDay(from)) / 86400000);
}

function affectsEnvelope(expense) {
  return expense.category !== "reserve";
}

function spentOn(expenses, date, envelopeOnly) {
  return expenses
    .filter((expense) => expense.date === date && (!envelopeOnly || affectsEnvelope(expense)))
    .reduce((sum, expense) => sum + expense.amountCents, 0);
}

function buildSummary(expenses, today) {
  const spentCents = expenses.reduce((sum, expense) => sum + expense.amountCents, 0);
  const closedAllowanceCents = DAYS.filter((day) => day.date < today).reduce((sum, day) => sum + budgetCents(day), 0);
  const closedSpentCents = expenses
    .filter((expense) => expense.date < today && affectsEnvelope(expense))
    .reduce((sum, expense) => sum + expense.amountCents, 0);
  const potCents = closedAllowanceCents - closedSpentCents;
  const day = findDay(today);
  const todayBudgetCents = day ? budgetCents(day) : 0;
  const todaySpentCents = expenses
    .filter((expense) => expense.date === today && affectsEnvelope(expense))
    .reduce((sum, expense) => sum + expense.amountCents, 0);
  const todayReserveCents = expenses
    .filter((expense) => expense.date === today && expense.category === "reserve")
    .reduce((sum, expense) => sum + expense.amountCents, 0);
  const byCategory = { meals: 0, cafes: 0, reserve: 0, other: 0 };
  for (const expense of expenses) byCategory[expense.category] += expense.amountCents;
  const quietDays = DAYS
    .filter((day) => day.date < today && budgetCents(day) > 0 && spentOn(expenses, day.date, true) === 0)
    .map((day) => day.date);
  let mode = "during";
  if (today < DAYS[0].date) mode = "before";
  else if (today > DAYS[DAYS.length - 1].date) mode = "after";
  return {
    today,
    mode,
    day,
    spentCents,
    remainingCents: TOTAL_CENTS - spentCents,
    potCents,
    todayBudgetCents,
    todaySpentCents,
    todayReserveCents,
    leftTodayCents: todayBudgetCents + potCents - todaySpentCents,
    byCategory,
    quietDays,
  };
}

function pacePhrase(cents) {
  if (cents > 0) return { word: "In the green", className: "green" };
  if (cents < 0) return { word: "In deficit", className: "red" };
  return { word: "Even", className: "even" };
}

function dayStatus(day, today, expenses) {
  if (day.date > today) return "future";
  if (day.date === today) return "today";
  const variance = budgetCents(day) - spentOn(expenses, day.date, true);
  if (variance > 0) return "under";
  if (variance < 0) return "over";
  return "exact";
}

function centsToInput(cents) {
  const euros = Math.floor(cents / 100);
  const frac = cents % 100;
  if (!frac) return String(euros);
  return `${euros},${String(frac).padStart(2, "0")}`;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeRate(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0 || number > 100000000) return null;
  return Math.round(number * 100) / 100;
}

function sanitizeExpense(raw) {
  if (!raw || typeof raw !== "object") return null;
  const date = String(raw.date || "");
  if (!findDay(date)) return null;
  const cents = Number(raw.amountCents);
  if (!Number.isInteger(cents) || cents <= 0 || cents > TOTAL_CENTS) return null;
  const category = CATEGORIES.some((item) => item.id === raw.category) ? raw.category : "other";
  return {
    id: String(raw.id || uid()).slice(0, 80),
    date,
    amountCents: cents,
    category,
    note: String(raw.note || "").slice(0, 140),
    createdAt: String(raw.createdAt || new Date().toISOString()),
  };
}

function sortedExpenses(expenses) {
  return [...expenses].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return String(b.createdAt).localeCompare(String(a.createdAt));
  });
}

const TripApp = {
  DAYS,
  TOTAL_CENTS,
  auditPlan,
  parseEurosToCents,
  formatCents,
  buildSummary,
  budgetCents,
  sanitizeExpense,
};

if (typeof module !== "undefined" && module.exports) module.exports = TripApp;
globalThis.TripApp = TripApp;

function emptyState() {
  return { version: 1, eurToCop: null, expenses: [] };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const data = JSON.parse(raw);
    return {
      version: 1,
      eurToCop: sanitizeRate(data.eurToCop),
      expenses: Array.isArray(data.expenses) ? data.expenses.map(sanitizeExpense).filter(Boolean) : [],
    };
  } catch {
    return emptyState();
  }
}

let state = typeof localStorage === "undefined" ? emptyState() : loadState();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatCopFromCents(cents) {
  if (!state.eurToCop || cents === 0) return "";
  const cop = Math.round((cents * state.eurToCop) / 100);
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cop);
}

function rehearsingDate() {
  try {
    const saved = sessionStorage.getItem(REHEARSE_KEY);
    if (saved && findDay(saved)) return saved;
  } catch {
    /* sessionStorage can be blocked */
  }
  return null;
}

function currentToday() {
  return rehearsingDate() || realTodayISO();
}

function bannerHTML() {
  const saved = rehearsingDate();
  if (!saved) return "";
  return `<div class="banner"><span>Ensayo · hoy es ${esc(formatDay(saved))}. La fecha del teléfono es ${esc(formatDay(realTodayISO()))}.</span><button type="button" data-action="stop-rehearse">Usar la fecha real</button></div>`;
}

function barHTML(spentCents, budgetCentsValue, label) {
  const ratio = budgetCentsValue > 0 ? spentCents / budgetCentsValue : (spentCents > 0 ? 1 : 0);
  const width = Math.max(0, Math.min(100, ratio * 100));
  const over = budgetCentsValue > 0 && spentCents > budgetCentsValue;
  const extra = over ? `<p class="over-note">Te pasaste ${formatCents(spentCents - budgetCentsValue)}</p>` : "";
  return `<div class="bar" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="${budgetCentsValue}" aria-valuenow="${Math.max(0, spentCents)}" aria-valuetext="${esc(label)}"><span class="${over ? "over" : ""}" style="--w:${width.toFixed(1)}%"></span></div>${extra}`;
}

function donutHTML(remainingCents, totalCents) {
  const left = Math.max(0, Math.min(totalCents, remainingCents));
  const ratio = totalCents > 0 ? left / totalCents : 0;
  const radius = 46;
  const circ = 2 * Math.PI * radius;
  const dash = (ratio * circ).toFixed(2);
  const over = remainingCents < 0;
  const pct = over ? 0 : Math.round(ratio * 100);
  return `<svg class="donut${over ? " over" : ""}" viewBox="0 0 120 120" role="img" aria-label="Queda el ${pct}% del viaje"><circle class="donut-track" cx="60" cy="60" r="${radius}"></circle><circle class="donut-value" cx="60" cy="60" r="${radius}" stroke-dasharray="${dash} ${circ.toFixed(2)}" transform="rotate(-90 60 60)"></circle><text class="donut-pct" x="60" y="58" text-anchor="middle">${pct}%</text><text class="donut-label" x="60" y="76" text-anchor="middle">queda</text></svg>`;
}

function dayChartHTML(today) {
  const max = Math.max(...DAYS.map((day) => Math.max(budgetCents(day), spentOn(state.expenses, day.date, true))), 1);
  const cols = DAYS.map((day) => {
    const budget = budgetCents(day);
    const spent = spentOn(state.expenses, day.date, true);
    const status = dayStatus(day, today, state.expenses);
    const plan = budget === 0 ? 8 : Math.max(12, Math.round((budget / max) * 100));
    const used = spent === 0 ? 0 : Math.max(8, Math.round((Math.min(spent, max) / max) * 100));
    const num = Number(day.date.slice(-2));
    return `<a class="col ${status}" href="#/day/${day.date}"><span class="col-plot" style="--plan-h:${plan}%;--spent-h:${used}%"><span class="col-plan"></span><span class="col-spent"></span></span><span class="col-num">${num}</span></a>`;
  }).join("");
  return `<section class="card"><h2>Gráfico por día</h2><div class="columns">${cols}</div><p class="chart-key"><span><i class="swatch plan"></i>Sobre</span><span><i class="swatch spent"></i>Gastado</span><span><i class="swatch over"></i>De más</span></p></section>`;
}

function paceHTML(cents) {
  const pace = pacePhrase(cents);
  const name = cents > 0 ? "a favor" : cents < 0 ? "en déficit" : "al día";
  return `<p class="pill ${pace.className}">Pozo ${name} · ${formatSigned(cents)}</p>`;
}

function expenseHTML(expense) {
  const title = expense.note || categoryLabel(expense.category);
  return `<a class="expense" href="#/edit/${encodeURIComponent(expense.id)}"><span class="who"><strong>${esc(title)}</strong><small>${esc(categoryLabel(expense.category))} · ${esc(formatDay(expense.date))}</small></span><span class="amount">${formatCents(expense.amountCents)}</span></a>`;
}

function planItemHTML(day, item) {
  const place = [item.place, item.covers].filter(Boolean).join(" · ");
  if (item.covered || item.planned === 0) {
    return `<li class="plan covered"><div><strong>${esc(item.meal)}</strong><span>${esc(place || "Sin costo extra")}</span></div><span class="badge">Cubierto</span></li>`;
  }
  const note = encodeURIComponent([item.meal, item.place].filter(Boolean).join(" · "));
  const href = `#/add?date=${day.date}&amount=${item.planned}&category=${item.category}&note=${note}`;
    return `<li class="plan"><div><strong>${esc(item.meal)}</strong><span>${esc(place)}</span></div><a class="plan-log" href="${href}">Anotar ${formatCents(item.planned * 100)}</a></li>`;
}

function categoryCard(summary) {
  const rows = CATEGORIES.filter((category) => category.budget > 0 || summary.byCategory[category.id] > 0).map((category) => {
    const spent = summary.byCategory[category.id];
    const left = category.budget - spent;
    const foot = category.budget === 0
      ? `<p class="cat-foot">Fuera de los tres sobres</p>`
      : `<p class="cat-foot${left < 0 ? " over" : ""}">${left < 0 ? `${formatCents(Math.abs(left))} de más` : `Quedan ${formatCents(left)}`}</p>`;
    return `<div class="cat"><div class="cat-head"><strong>${esc(category.label)}</strong><span>${formatCents(spent)} de ${category.budget ? formatCents(category.budget) : "—"}</span></div>${barHTML(spent, category.budget, `${category.label}: gastado ${formatCents(spent)}`)}${foot}</div>`;
  }).join("");
  return `<section class="card"><h2>Categorías</h2>${rows}</section>`;
}

function tripCard(summary, thirdLabel, thirdCents) {
  const cop = formatCopFromCents(summary.remainingCents);
  return `<section class="card"><h2>Viaje</h2><div class="stats"><div><span>Gastado</span><strong>${formatCents(summary.spentCents)}</strong></div><div><span>Queda</span><strong>${formatCents(summary.remainingCents)}</strong></div><div><span>${esc(thirdLabel)}</span><strong>${formatCents(thirdCents)}</strong></div></div>${barHTML(summary.spentCents, TOTAL_CENTS, `Gastado ${formatCents(summary.spentCents)} de ${formatCents(TOTAL_CENTS)}`)}${cop ? `<p class="cop-line">Unos ${esc(cop)} disponibles</p>` : ""}</section>`;
}

function todayExplain(summary) {
  const envelope = formatCents(summary.todayBudgetCents);
  const spent = formatCents(summary.todaySpentCents);
  let text = `El sobre de hoy es ${envelope}. Hoy llevas ${spent}.`;
  if (summary.potCents > 0) text = `El sobre de hoy es ${envelope}, más ${formatCents(summary.potCents)} ahorrados antes. Hoy llevas ${spent}.`;
  if (summary.potCents < 0) text = `El sobre de hoy es ${envelope}, menos ${formatCents(Math.abs(summary.potCents))} que vienen de días anteriores. Hoy llevas ${spent}.`;
  if (summary.todayReserveCents > 0) text += ` Reserva de hoy ${formatCents(summary.todayReserveCents)}, fuera del sobre.`;
  return text;
}

function quietHTML(summary) {
  if (!summary.quietDays.length) return "";
  const labels = summary.quietDays.map((date) => formatDay(date)).join(", ");
  return `<p class="callout">No hay gastos en ${esc(labels)}. El pozo los cuenta como ahorrados, así que el verde puede estar mal hasta que los anotes.</p>`;
}

function heroLabel(summary) {
  if (summary.leftTodayCents > 0) return "Te queda hoy";
  if (summary.leftTodayCents < 0) return "Te pasaste hoy";
  return "Hoy ya no queda";
}

function renderToday(summary) {
  if (summary.mode === "before") {
    const first = findDay("2026-11-21");
    const departureIn = daysUntil("2026-11-20", realTodayISO());
    const when = departureIn === 1 ? "Falta 1 día para salir" : `Faltan ${departureIn} días para salir`;
    const logged = sortedExpenses(summary.spentCents ? state.expenses : []);
    return `<section class="hero"><div class="hero-copy"><p class="kicker">${esc(when)} · 7 personas</p><h1>Presupuesto de comida</h1><p class="hero-num">${formatCents(summary.remainingCents)}</p>${formatCopFromCents(summary.remainingCents) ? `<p class="hero-cop">Unos ${esc(formatCopFromCents(summary.remainingCents))}</p>` : ""}<p class="explain">París, Chamonix y Ámsterdam. Los sobres diarios empiezan el 21 de noviembre.</p></div>${donutHTML(summary.remainingCents, TOTAL_CENTS)}</section>${tripCard(summary, "21 nov", budgetCents(first))}${dayChartHTML(summary.today)}<section class="card"><h2>Primer sobre</h2><p><strong>${esc(formatDay(first.date))} · ${esc(first.city)}</strong></p><p class="help">${formatCents(budgetCents(first))} planeados. Almuerzo y cena en los aeropuertos.</p><p style="margin-top:12px"><a class="secondary" href="#/day/${first.date}">Ver ese día</a></p></section>${logged.length ? `<section class="card"><h2>Anotado</h2><div class="stack">${logged.map(expenseHTML).join("")}</div></section>` : ""}<a class="primary" href="#/add">Anotar un gasto</a>`;
  }

  if (summary.mode === "after") {
    return `<section class="hero"><div class="hero-copy"><p class="kicker">Viaje terminado</p><h1>${summary.potCents < 0 ? "Por encima del plan" : "Contra el plan diario"}</h1><p class="hero-num${summary.potCents < 0 ? " neg" : ""}">${formatSigned(summary.potCents)}</p><p class="explain">Esto compara el gasto con el plan de €1.400. La reserva de €100 está por fuera. Quedan ${formatCents(summary.remainingCents)} de los €1.500.</p>${paceHTML(summary.potCents)}</div>${donutHTML(summary.remainingCents, TOTAL_CENTS)}</section>${quietHTML(summary)}${dayChartHTML(summary.today)}${tripCard(summary, "Pozo", summary.potCents)}${categoryCard(summary)}`;
  }

  const day = summary.day;
  const cop = formatCopFromCents(summary.leftTodayCents);
  const loggedToday = state.expenses.filter((expense) => expense.date === summary.today);
  const departureZero = day.date === "2026-11-20" && summary.todaySpentCents === 0 && summary.potCents === 0;
  const hero = departureZero
    ? `<section class="hero"><div class="hero-copy"><p class="kicker">${esc(formatDay(day.date))} · ${esc(day.city)}</p><h1>Hoy no hay sobre</h1><p class="explain">El plan empieza mañana, ${esc(formatDay("2026-11-21"))}, con ${formatCents(budgetCents(findDay("2026-11-21")))}.</p></div>${donutHTML(summary.remainingCents, TOTAL_CENTS)}</section>`
    : `<section class="hero"><div class="hero-copy"><p class="kicker">${esc(formatDay(day.date))} · ${esc(day.city)}</p><h1>${heroLabel(summary)}</h1><p class="hero-num${summary.leftTodayCents < 0 ? " neg" : ""}">${formatCents(summary.leftTodayCents)}</p>${cop ? `<p class="hero-cop">Unos ${esc(cop)}</p>` : ""}<p class="explain">${esc(todayExplain(summary))}</p>${paceHTML(summary.potCents)}</div>${donutHTML(summary.remainingCents, TOTAL_CENTS)}</section>`;
  const meals = day.items.length
    ? `<section class="card"><h2>Comidas de hoy</h2><ul class="plan-list">${day.items.map((item) => planItemHTML(day, item)).join("")}</ul></section>`
    : "";
  const note = day.note ? `<p class="callout">${esc(day.note)}</p>` : "";
  const logged = `<section class="card"><h2>Anotado hoy</h2>${loggedToday.length ? `<div class="stack">${sortedExpenses(loggedToday).map(expenseHTML).join("")}</div>` : `<p class="help">Hoy no hay gastos anotados.</p>`}</section>`;
  return `${hero}${quietHTML(summary)}${note}${dayChartHTML(summary.today)}${tripCard(summary, "Hoy", summary.todayBudgetCents)}${categoryCard(summary)}${meals}${logged}<a class="primary" href="#/add">Anotar un gasto</a>`;
}

function renderDays(summary) {
  const rows = DAYS.map((day) => {
    const spent = spentOn(state.expenses, day.date, true);
    const status = dayStatus(day, summary.today, state.expenses);
    let detail = "Falta";
    if (status === "today") detail = `${formatCents(spent)} anotado`;
    if (status === "under") detail = spent === 0 ? "Sin anotar" : `${formatCents(budgetCents(day) - spent)} de menos`;
    if (status === "over") detail = `${formatCents(spent - budgetCents(day))} de más`;
    if (status === "exact" && day.date < summary.today) detail = spent === 0 && budgetCents(day) === 0 ? "Sin sobre" : "En el plan";
    return `<a href="#/day/${day.date}"><span class="day-main"><i class="dot ${status}"></i><span class="who"><strong>${esc(formatDay(day.date))}${day.date === summary.today ? " · Hoy" : ""}</strong><small>${esc(day.city)}</small></span></span><span class="who" style="text-align:right"><strong class="amount">${formatCents(budgetCents(day))}</strong><small>${esc(detail)}</small></span></a>`;
  }).join("");
  return `<h1>Días</h1>${dayChartHTML(summary.today)}<section class="card stack">${rows}</section><section class="card"><p>Plan diario ${formatCents(PLAN_CENTS)} · Reserva ${formatCents(RESERVE_CENTS)} · Viaje ${formatCents(TOTAL_CENTS)}</p><p class="help">El supermercado cuenta el día en que pagas. Las comidas siguientes quedan cubiertas y no se cobran otra vez.</p></section>`;
}

function renderDay(date, summary) {
  const day = findDay(date);
  if (!day) return renderDays(summary);
  const spent = state.expenses.filter((expense) => expense.date === day.date);
  const spentCents = spentOn(state.expenses, day.date, true);
  const reserveCents = spent.filter((expense) => expense.category === "reserve").reduce((sum, expense) => sum + expense.amountCents, 0);
  const status = dayStatus(day, summary.today, state.expenses);
  let paceLine = "Este día todavía no empieza.";
  if (status === "today") paceLine = "Este es el día abierto. Su sobre ya está en el número de Hoy.";
  if (status === "under") paceLine = `${formatCents(budgetCents(day) - spentCents)} por debajo de este sobre. Ese sobrante entra al pozo.`;
  if (status === "over") paceLine = `${formatCents(spentCents - budgetCents(day))} por encima de este sobre. Ese faltante entra al pozo.`;
  if (status === "exact" && day.date < summary.today) paceLine = "Este sobre cerró parejo.";
  const reserveLine = reserveCents ? ` Reserva ${formatCents(reserveCents)}, fuera del sobre.` : "";
  return `<h1>${esc(formatDay(day.date))}</h1><p class="help">${esc(day.city)}</p>${day.note ? `<p class="callout">${esc(day.note)}</p>` : ""}<section class="card"><div class="stats"><div><span>Sobre</span><strong>${formatCents(budgetCents(day))}</strong></div><div><span>Comidas</span><strong>${formatCents(day.meals * 100)}</strong></div><div><span>Cafés</span><strong>${formatCents(day.cafes * 100)}</strong></div></div><p class="help">${esc(paceLine)} Anotado ${formatCents(spentCents)} contra el sobre.${esc(reserveLine)}</p></section>${day.items.length ? `<section class="card"><h2>Plan de comidas</h2><ul class="plan-list">${day.items.map((item) => planItemHTML(day, item)).join("")}</ul></section>` : ""}<section class="card"><h2>Anotado</h2>${spent.length ? `<div class="stack">${sortedExpenses(spent).map(expenseHTML).join("")}</div>` : `<p class="help">Este día no tiene gastos.</p>`}</section><a class="primary" href="#/add?date=${day.date}">Anotar en este día</a>`;
}

function renderForm(id, query) {
  const existing = id ? state.expenses.find((expense) => expense.id === id) : null;
  if (id && !existing) return `<h1>Gasto</h1><p class="help">Ese gasto ya no está en este teléfono.</p><a class="secondary" href="#/">Volver a hoy</a>`;
  const date = existing?.date || (findDay(query.get("date")) ? query.get("date") : currentToday());
  const safeDate = findDay(date) ? date : "2026-11-21";
  const category = existing?.category || (CATEGORIES.some((item) => item.id === query.get("category")) ? query.get("category") : "meals");
  const note = existing?.note ?? query.get("note") ?? "";
  const amount = existing ? centsToInput(existing.amountCents) : (query.get("amount") || "");
  const segments = CATEGORIES.map((item) => `<label class="segment"><input type="radio" name="category" value="${item.id}" ${item.id === category ? "checked" : ""}><span>${esc(item.label)}</span></label>`).join("");
  const dates = DAYS.map((day) => `<option value="${day.date}" ${day.date === safeDate ? "selected" : ""}>${esc(formatDay(day.date))} · ${esc(day.city)}</option>`).join("");
  return `<h1>${existing ? "Editar gasto" : "Anotar gasto"}</h1><form class="form" id="expense-form"><input type="hidden" name="expenseId" value="${esc(existing?.id || "")}"><label class="field amount-box"><span>Monto en euros</span><input class="amount-input" name="amount" inputmode="decimal" autocomplete="off" enterkeyhint="done" data-autofocus value="${esc(amount)}" aria-describedby="amount-help"></label><p id="amount-help" class="help">Usa 28,50 o 165. Cada gasto puede ser de hasta €1.500.</p><fieldset class="segments"><legend>Categoría</legend>${segments}</fieldset><label class="field"><span>Día</span><select name="date">${dates}</select></label><label class="field"><span>Nota</span><input class="text" name="note" maxlength="140" autocomplete="off" value="${esc(note)}" placeholder="Almuerzo, supermercado, café…"></label><p class="form-error" id="form-error" hidden></p><button class="primary" type="submit">${existing ? "Actualizar" : "Guardar"}</button>${existing ? `<button class="ghost" type="button" data-action="delete" data-id="${esc(existing.id)}">Borrar gasto</button>` : `<a class="secondary" href="#/day/${safeDate}">Cancelar</a>`}</form>`;
}

function renderMore(summary) {
  const rate = state.eurToCop ?? "";
  const sample = state.eurToCop ? `<p class="help">€10 son unos ${esc(formatCopFromCents(1000))}.</p>` : `<p class="help">Déjalo vacío si solo quieres euros.</p>`;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const install = standalone
    ? ""
    : `<section class="card"><h2>En el iPhone</h2><p>Abre esta página en Safari, toca Compartir y luego Añadir a pantalla de inicio. Después también funciona sin señal.</p></section>`;
  return `<h1>Más</h1>${install}<section class="card"><h2>Pesos colombianos</h2><form id="rate-form" class="form"><label class="field"><span>Pesos por un euro</span><input class="text" name="rate" inputmode="decimal" value="${esc(rate)}" placeholder="Ejemplo: 4500"></label><button class="primary" type="submit">Guardar tasa</button></form>${sample}</section><section class="card"><h2>Cómo se leen los números</h2><p>El número grande es lo que todavía puedes gastar hoy: el sobre del día, más lo ahorrado en días ya cerrados, menos lo que ya anotaste hoy.</p><p class="help" style="margin-top:8px">El pozo es ese ahorro o ese faltante. No cuenta el sobre de hoy que todavía no gastas, para que en el desayuno no parezca que vas ganando. Verde es por debajo del plan. Déficit es por encima.</p><p class="help" style="margin-top:8px">La reserva de €100 está dentro de los €1.500 y por fuera de los sobres diarios. El supermercado cuenta una sola vez, el día de la compra.</p></section><section class="card"><h2>Ensayar un día</h2><form id="rehearse-form" class="form"><label class="field"><span>Hacer de cuenta que hoy es</span><input type="date" name="rehearse" min="2026-11-20" max="2026-11-30" value="${esc(rehearsingDate() || "2026-11-21")}"></label><button class="secondary" type="submit">Ver ese día</button></form><p class="help" style="margin-top:8px">Durante el ensayo queda un aviso arriba para no confundirlo con la fecha del teléfono.</p></section><section class="card"><h2>Copia</h2><p class="help">Los gastos se quedan en este teléfono. Exporta un archivo por si Safari borra los datos.</p><div class="form" style="margin-top:12px"><button class="secondary" type="button" data-action="export">Exportar copia</button><label class="secondary file-btn">Importar copia<input id="import-file" type="file" accept="application/json" hidden></label><button class="ghost" type="button" data-action="reset">Borrar gastos</button></div></section><section class="card"><h2>El plan</h2><p>7 personas, incluido un niño de 12 años. Los montos son de toda la familia.</p><p class="help" style="margin-top:8px">${DAYS.length} días, del ${esc(formatDay(DAYS[0].date))} al ${esc(formatDay(DAYS[DAYS.length - 1].date))}. ${formatCents(summary.spentCents)} anotados.</p></section>`;
}

function parseRoute() {
  const raw = (location.hash || "#/").slice(1);
  const [path, queryString] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  return { parts, query: new URLSearchParams(queryString || "") };
}

function setTab(name) {
  document.querySelectorAll(".tabbar a").forEach((link) => {
    if (link.dataset.tab === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

let toastTimer = 0;
function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2400);
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function render({ keepScroll = false } = {}) {
  const route = parseRoute();
  const summary = buildSummary(state.expenses, currentToday());
  const screen = route.parts[0] || "today";
  let tab = "today";
  let html = "";
  if (screen === "days") {
    tab = "days";
    html = renderDays(summary);
  } else if (screen === "day") {
    tab = "days";
    html = renderDay(route.parts[1], summary);
  } else if (screen === "add") {
    tab = "add";
    html = renderForm(null, route.query);
  } else if (screen === "edit") {
    tab = "add";
    html = renderForm(decodeURIComponent(route.parts[1] || ""), route.query);
  } else if (screen === "more") {
    tab = "more";
    html = renderMore(summary);
  } else {
    html = renderToday(summary);
  }
  const main = document.getElementById("main");
  const y = window.scrollY;
  main.innerHTML = bannerHTML() + html;
  setTab(tab);
  if (keepScroll) window.scrollTo(0, y);
  else window.scrollTo(0, 0);
  if (!keepScroll) main.querySelector("[data-autofocus]")?.focus({ preventScroll: true });
}

function showFormError(message) {
  const error = document.getElementById("form-error");
  if (!error) return;
  error.hidden = false;
  error.textContent = message;
}

function saveExpense(form) {
  const data = new FormData(form);
  const cents = parseEurosToCents(data.get("amount"));
  if (!cents) {
    showFormError("Escribe un monto desde €0,01 hasta €1.500.");
    return;
  }
  const date = String(data.get("date") || "");
  if (!findDay(date)) {
    showFormError("Elige un día del viaje.");
    return;
  }
  const category = CATEGORIES.some((item) => item.id === data.get("category")) ? String(data.get("category")) : "meals";
  const note = String(data.get("note") || "").trim().slice(0, 140);
  const id = String(data.get("expenseId") || "");
  if (id) {
    const existing = state.expenses.find((expense) => expense.id === id);
    if (!existing) {
      showFormError("Ese gasto ya no está en este teléfono.");
      return;
    }
    existing.date = date;
    existing.amountCents = cents;
    existing.category = category;
    existing.note = note;
  } else {
    state.expenses.push({
      id: uid(),
      date,
      amountCents: cents,
      category,
      note,
      createdAt: new Date().toISOString(),
    });
  }
  persist();
  toast(id ? `Actualizado ${formatCents(cents)}` : `Guardado ${formatCents(cents)}`);
  go(`#/day/${date}`);
}

function formId(form) {
  return form.getAttribute("id");
}

function onSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (formId(form) === "expense-form") {
    event.preventDefault();
    saveExpense(form);
  } else if (formId(form) === "rate-form") {
    event.preventDefault();
    const raw = String(new FormData(form).get("rate") || "").trim().replace(/\s/g, "").replace(",", ".");
    if (!raw) {
      state.eurToCop = null;
      persist();
      toast("Tasa borrada");
      render({ keepScroll: true });
      return;
    }
    const rate = sanitizeRate(raw);
    if (!rate) {
      toast("Escribe cuántos pesos vale un euro");
      return;
    }
    state.eurToCop = rate;
    persist();
    toast("Tasa guardada");
    render({ keepScroll: true });
  } else if (formId(form) === "rehearse-form") {
    event.preventDefault();
    const value = String(new FormData(form).get("rehearse") || "");
    if (!findDay(value)) {
      toast("Elige un día del viaje para ensayar");
      return;
    }
    sessionStorage.setItem(REHEARSE_KEY, value);
    toast(`Ensayando ${formatDay(value)}`);
    go("#/");
  }
}

function onClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "delete") {
    if (!confirm("¿Borrar este gasto?")) return;
    const id = button.dataset.id;
    const existing = state.expenses.find((expense) => expense.id === id);
    state.expenses = state.expenses.filter((expense) => expense.id !== id);
    persist();
    toast("Gasto borrado");
    go(existing ? `#/day/${existing.date}` : "#/");
  } else if (action === "reset") {
    if (!state.expenses.length) {
      toast("No hay gastos para borrar");
      return;
    }
    if (!confirm("¿Borrar todos los gastos de este teléfono?")) return;
    state.expenses = [];
    persist();
    toast("Gastos borrados");
    go("#/");
  } else if (action === "export") {
    const blob = new Blob([JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      eurToCop: state.eurToCop,
      expenses: state.expenses,
    }, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "europe-2026-expenses.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1500);
    toast("Copia descargada");
  } else if (action === "stop-rehearse") {
    sessionStorage.removeItem(REHEARSE_KEY);
    toast("Usando la fecha del teléfono");
    render();
  }
}

function onImport(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!data || !Array.isArray(data.expenses)) throw new Error("invalid");
      const expenses = data.expenses.map(sanitizeExpense).filter(Boolean);
      if (state.expenses.length && !confirm("¿Reemplazar los gastos de este teléfono con la copia?")) return;
      state.expenses = expenses;
      if (Object.prototype.hasOwnProperty.call(data, "eurToCop")) state.eurToCop = sanitizeRate(data.eurToCop);
      persist();
      toast(`Importados ${expenses.length} gastos`);
      render({ keepScroll: true });
    } catch {
      toast("Ese archivo no es una copia");
    }
  };
  reader.readAsText(file);
}

function onChange(event) {
  if (event.target?.id === "import-file" && event.target.files?.[0]) {
    onImport(event.target.files[0]);
    event.target.value = "";
  }
}

function start() {
  const problems = auditPlan();
  if (problems.length) {
    document.getElementById("main").innerHTML = `<p class="form-error">El plan de comidas no cuadra: ${esc(problems.join(", "))}.</p>`;
    return;
  }
  const main = document.getElementById("main");
  main.addEventListener("submit", onSubmit);
  main.addEventListener("click", onClick);
  main.addEventListener("change", onChange);
  window.addEventListener("hashchange", () => render());
  if (!location.hash) location.replace("#/");
  else render();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
}

if (typeof document !== "undefined") start();
