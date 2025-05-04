google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
  fetch('data.json')
    .then(r => r.json())
    .then(data => setupUI(data))
    .catch(console.error);
}

function setupUI(data) {
  const select = document.getElementById('regionSelect');
  // 2) Llenar el <select> con todas las regiones, sacamos cada región del json
  [...new Set(data.map(d => d.region))].sort().forEach(r => {
    //Creamos una opción en la lista
    const o = document.createElement('option');
    //Le damos el valor y texto de cada región
    o.value = r; o.textContent = r;
    select.appendChild(o);
  });

  //Al pulsar el botón, leer la selección y dibujar
  document.getElementById('btnCompare').onclick = () => {
    //Captura todas las opciones eleginas, sus valores
    const selected = Array.from(select.selectedOptions).map(o => o.value);
    if (selected.length === 0) {
      alert('Selecciona al menos una región.');
      return;
    }
    drawTotalsBar(data, selected);
  };
}
