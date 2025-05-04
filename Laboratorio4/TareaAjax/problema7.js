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

function drawTotalsBar(data, regiones) {
  //Inicializa acumulados a cero
  const totals = {};
  regiones.forEach(rg => totals[rg] = 0);

  //Para cada región seleccionada, suma todos sus valores diarios
  regiones.forEach(rg => {
    const entry = data.find(d => d.region === rg);
    entry.confirmed.forEach(item => {
      totals[rg] += Number(item.value);
    });
  });

  //Averigua la última fecha    
  const sample = data.find(d => d.region === regiones[0]);
  const lastDate = sample.confirmed[sample.confirmed.length - 1].date;

  //Construye la DataTable para barras
  const dt = new google.visualization.DataTable();
  dt.addColumn('string', 'Región');
  dt.addColumn('number',  'Total Confirmados');

  const rows = regiones.map(rg => [rg, totals[rg]]);
  dt.addRows(rows);

  //Dibuja el BarChart
  const chart = new google.visualization.BarChart(
    document.getElementById('chart_compare')
  );
  chart.draw(dt, {
    title: `Total acumulado al ${lastDate}`,
    hAxis: { title: 'Total Confirmados', minValue: 0 },
    vAxis: { title: 'Región' },
    width: 800,
    height: regiones.length * 30 + 100,
    legend: { position: 'none' }
  });
}
