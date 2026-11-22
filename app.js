(function () {
  "use strict";
  var TERMS = window.TERMS, MEMBERS = window.MEMBERS;
  var MAXQ = 16;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // mobile menu
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });

  // horizontal bars
  function hbars(id, rows, max, unit) {
    var box = document.getElementById(id);
    rows.forEach(function (r) {
      var pct = (r[1] / max) * 100;
      var row = el("div", "hbar");
      row.innerHTML = '<span>' + esc(r[0]) + '</span><div class="track"><div class="fill" style="width:' + pct + '%"></div>' +
        '<span class="val' + (pct < 18 ? ' out' : '') + '" style="' + (pct < 18 ? 'left:calc(' + pct + '% + 8px)' : '') + '">' + r[1] + unit + '</span></div>';
      box.appendChild(row);
    });
  }
  hbars("seats", [["2005年", 46], ["2006年", 26], ["2010年", 20], ["2014年〜", 18]], 46, "人");
  hbars("newcomers", [["2010年", 2], ["2014年", 2], ["2018年", 5], ["2022年", 4]], 6, "人");

  // members
  MEMBERS.forEach(function (m) {
    m.recent = m.q[4];
    m.total = m.q.reduce(function (a, b) { return a + (b || 0); }, 0);
    m.est = m.age06 ? (m.age06 + 20) : null;
  });

  var state = { q: "", since: "all", sort: "recent", view: "card" };
  var cards = document.getElementById("cards"), tablewrap = document.getElementById("tablewrap"), count = document.getElementById("count");

  function filtered() {
    var list = MEMBERS.filter(function (m) {
      if (state.q && m.name.replace(/\s/g, "").indexOf(state.q.replace(/\s/g, "")) < 0 && m.kana.indexOf(state.q) < 0) return false;
      if (state.since === "2006" && m.sinceY > 2006) return false;
      if (state.since === "2010" && (m.sinceY <= 2006 || m.sinceY >= 2018)) return false;
      if (state.since === "2018" && m.sinceY < 2018) return false;
      return true;
    });
    var by = {
      recent: function (a, b) { return b.recent - a.recent || b.total - a.total; },
      total: function (a, b) { return b.total - a.total; },
      since: function (a, b) { return b.sinceY - a.sinceY || a.kana.localeCompare(b.kana, "ja"); },
      kana: function (a, b) { return a.kana.localeCompare(b.kana, "ja"); }
    }[state.sort];
    return list.sort(by);
  }

  function card(m) {
    var c = el("article", "card");
    var tag = m.role ? '<span class="tag">' + esc(m.role) + '（2022〜26年）</span>' : "";
    var bars = m.q.map(function (v) {
      if (v == null) return '<div class="term"><div class="b off"></div></div>';
      if (v === 0) return '<div class="term"><div class="b zero"></div></div>';
      return '<div class="term"><div class="b" style="height:' + Math.max(8, (v / MAXQ) * 100) + '%"></div></div>';
    }).join("");
    var labels = TERMS.map(function (t, i) { return '<span' + (i === 4 ? ' class="cur"' : '') + '>' + t.replace("-", "–") + '</span>'; }).join("");
    var termsAria = TERMS.map(function (t, i) { return t + "年: " + (m.q[i] == null ? "在籍なし" : m.q[i] + "回"); }).join("、");
    c.innerHTML =
      '<div class="card-head"><h3>' + esc(m.name) + '</h3>' + tag + '</div>' +
      '<div class="meta"><span>初当選：' + esc(m.since) + '</span>' + (m.est ? '<span>2026年の推定年齢：' + m.est + '歳前後</span>' : '') + '</div>' +
      '<div class="big' + (m.recent === 0 ? ' z' : '') + '"><b>' + m.recent + '</b><span>回　直近4年（2022〜26年）の一般質問</span></div>' +
      '<div><div class="terms" role="img" aria-label="' + esc(termsAria) + '">' + bars + '</div><div class="term-labels">' + labels + '</div></div>' +
      '<div class="meta"><span>20年の合計：' + m.total + '回</span></div>' +
      (m.note ? '<p class="note">' + esc(m.note) + '</p>' : '');
    return c;
  }

  function table(list) {
    var head = '<tr><th>議員</th><th>初当選</th><th>推定年齢(2026)</th>' + TERMS.map(function (t) { return '<th>' + t + '</th>'; }).join("") + '<th>合計</th></tr>';
    var rows = list.map(function (m) {
      return '<tr><td>' + esc(m.name) + (m.role ? '（' + esc(m.role) + '）' : '') + '</td><td>' + esc(m.since) + '</td><td' + (m.est ? '' : ' class="na"') + '>' + (m.est ? m.est + '歳前後' : '—') + '</td>' +
        m.q.map(function (v, i) { return v == null ? '<td class="na">—</td>' : '<td' + (i === 4 ? ' class="cur"' : '') + '>' + v + '</td>'; }).join("") +
        '<td>' + m.total + '</td></tr>';
    }).join("");
    return '<table><caption class="skip">議員別・任期別の一般質問回数</caption><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>';
  }

  function render() {
    var list = filtered();
    cards.innerHTML = "";
    list.forEach(function (m) { cards.appendChild(card(m)); });
    tablewrap.innerHTML = table(list);
    cards.hidden = state.view !== "card";
    tablewrap.hidden = state.view !== "table";
    count.textContent = list.length + "人を表示中（2022〜26年任期の18人のうち）";
  }

  document.getElementById("q").addEventListener("input", function (e) { state.q = e.target.value.trim(); render(); });
  document.getElementById("since").addEventListener("change", function (e) { state.since = e.target.value; render(); });
  document.getElementById("sort").addEventListener("change", function (e) { state.sort = e.target.value; render(); });
  ["card", "table"].forEach(function (v) {
    document.getElementById("v-" + v).addEventListener("click", function () {
      state.view = v;
      document.getElementById("v-card").setAttribute("aria-pressed", v === "card");
      document.getElementById("v-table").setAttribute("aria-pressed", v === "table");
      render();
    });
  });
  render();
})();
