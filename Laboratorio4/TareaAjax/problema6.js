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

  const regionDaily = {};//"Diccionario"
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

  //Generamos filas acumulativas
  const runningTotals = {};  // llevaremos un acumulado por región
  //Comienza asiganando a todas las regiones 0 casos
  regiones.forEach(rg => runningTotals[rg] = 0);

  //Extremos cada fecha
  const rows = fechas.map(fecha => {
    const ms = fecha.valueOf();
    // para cada región, sumamos el valor diario al acumulado 
    const fila = [fecha]; //Va anotando por fechas 
    //Por cada fecha extraemos sus milisegundos que son las keys de los valores
    regiones.forEach(rg => {
      const daily = regionDaily[rg].get(ms) || 0;
      //De cada region de va cargandon por fecha
      runningTotals[rg] += daily;
      fila.push(runningTotals[rg]);
    });
    return fila;
  });

  dt.addRows(rows);

  // 6) Dibujamos el LineChart acumulativo
  const chart = new google.visualization.LineChart(
    document.getElementById('chart_compare')
  );
  chart.draw(dt, {
    title: 'Crecimiento acumulado (excluyendo Lima y Callao)',
    hAxis: { title: 'Fecha', format: 'dd-MM-yyyy' },
    vAxis: { title: 'Total Confirmados', minValue: 0 },
    curveType: 'function',
    width: 800,
    height: 400
  });
}
