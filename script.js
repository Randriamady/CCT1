// ---------- Changement de section ----------
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------- Création d'un formulaire POST caché ----------
function postForm(action, data) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'https://script.google.com/macros/s/AKfycbx4uMoYxxA0BS9qUoBASX0vXrMZ5wc2vkD39QpgwBJyIpZWmcb4MNaRJBZbq9hn8ejtmw/exec'; // Web App URL si déployé
  for (let key in data) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

// ---------- Modifier Caisse ----------
function editCaisse(row) {
  showSection('caisse');
  const form = document.querySelector('#caisse form');
  Object.keys(row).forEach(key => {
    if(form.elements[key]) form.elements[key].value = row[key];
  });
  form.querySelector('input[name="action"]').value = 'updateCaisse';
  form.onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    postForm('updateCaisse', data);
  };
}

// ---------- Supprimer Caisse ----------
function deleteCaisse(_row) {
  if(confirm("Confirmer la suppression ?")) {
    postForm('deleteCaisse', {action:'deleteCaisse', _row:_row});
  }
}

// ---------- Modifier CCT1 ----------
function editCCT1(row) {
  showSection('cct1');
  const form = document.querySelector('#cct1 form');
  Object.keys(row).forEach(key => {
    if(form.elements[key]) form.elements[key].value = row[key];
  });
  form.querySelector('input[name="action"]').value = 'updateCCT1';
  form.onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    postForm('updateCCT1', data);
  };
}

// ---------- Supprimer CCT1 ----------
function deleteCCT1(_row) {
  if(confirm("Confirmer la suppression ?")) {
    postForm('deleteCCT1', {action:'deleteCCT1', _row:_row});
  }
}

// ---------- Rendu des tableaux ----------
function renderTable(data, containerId, type) {
  let html = '<table><tr>';
  if(data.length > 0){
    Object.keys(data[0]).filter(k=>k!="_row").forEach(key => html += `<th>${key}</th>`);
    html += '<th>Actions</th></tr>';
    data.forEach(row => {
      html += '<tr>';
      Object.keys(row).filter(k=>k!="_row").forEach(key => html += `<td>${row[key]}</td>`);
      html += `<td>
        <button onclick='edit${type}(${JSON.stringify(row)})'>Modifier</button>
        <button onclick='delete${type}(${row._row})'>Supprimer</button>
      </td>`;
      html += '</tr>';
    });
    html += '</table>';
  } else {
    html = "<p>Aucune donnée.</p>";
  }
  document.getElementById(containerId).innerHTML = html;
}

// ---------- Chargement via GET (filtres) ----------
function filterCaisse() {
  const date = document.getElementById('filter-date-caisse').value;
  const societe = document.getElementById('filter-societe-caisse').value;
  const mode = document.getElementById('filter-mode-caisse').value;
  const params = new URLSearchParams({DATE:date, SOCIETE:societe, "MODE DE PAIEMENT":mode});
  window.location.search = params.toString(); // GET
}

function filterCCT1() {
  const date = document.getElementById('filter-date-cct1').value;
  const societe = document.getElementById('filter-societe-cct1').value;
  const params = new URLSearchParams({DATE:date, SOCIETES:societe});
  window.location.search = params.toString(); // GET
}

// ---------- Initialisation ----------
document.addEventListener('DOMContentLoaded', function(){
  showSection('caisse'); // section par défaut
});