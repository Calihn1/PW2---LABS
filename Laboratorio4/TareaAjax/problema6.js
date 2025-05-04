google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      //Extrae todas las regiones menos Lima y Callao a un arrreglo
      const regiones = data
        .map(d => d.region)
        .filter(r => r !== 'Lima' && r !== 'Callao');
      drawCombinedAccumulated(data, regiones);
    })
    .catch(console.error);
}

function drawCombinedAccumulated(data, regiones) {

  const primera = data.find(d => d.region === regiones[0]);
  const fechas = primera.confirmed.map(item => {
    const [dd, mm, yyyy] = item.date.split('-');
    return new Date(+yyyy, +mm - 1, +dd);
  });

  const regionDaily = {};
  regiones.forEach(rg => {
    const entry = data.find(d => d.region === rg);
    const m = new Map();
    entry.confirmed.forEach(item => {
      const [dd, mm, yyyy] = item.date.split('-');
      const ms = new Date(+yyyy, +mm - 1, +dd).valueOf();
      m.set(ms, Number(item.value));
    });
    regionDaily[rg] = m;
  });

  
  const dt = new google.visualization.DataTable();
  dt.addColumn('date', 'Fecha');
  regiones.forEach(rg => dt.addColumn('number', rg));
}
