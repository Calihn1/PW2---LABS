// 1) Cargamos Google Charts
google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
  fetch('data.json')
    .then(r=>r.json())
    .then(data => drawCombined(data, ['Arequipa','Lima','Cusco']))
    .catch(console.error);
}

function drawCombined(data, regiones) {
  //Tomamos las fechas de la primera región y las usaremos como el eje x
  const primera = data.find(d => d.region === regiones[0]);
  //Conseguimos los datos de confirmed
  const fechas = primera.confirmed
    .map(item => {
      const [dd,mm,yyyy] = item.date.split('-');
      return new Date(+yyyy, +mm-1, +dd);
    });
  
  //Preparamos un map por región: fecha(ms) → valor
  const regionMaps = {};
  regiones.forEach(rg => {
    //Consegue las tres regiones
    const entry = data.find(d=>d.region===rg);
    //Generamos el mapa
    const m = new Map();
    //La clave seran los milisegundos generado por fecha y cuerpo sera el valor de cada caso
    entry.confirmed.forEach(item => {
      const [dd,mm,yyyy] = item.date.split('-');
      const ms = new Date(+yyyy, +mm-1, +dd).valueOf();
      m.set(ms, Number(item.value));
    });
    //Lo guarda en un arrys cada caso de las tres regiones
    regionMaps[rg] = m;
  });

  //Montamos la DataTable
  const dt = new google.visualization.DataTable();
  dt.addColumn('date','Fecha');
  //Recorremos las tres regiones para generar cada caso
  regiones.forEach(rg => dt.addColumn('number', rg));

  //Extraemos la fecha y el valor del cada region por el mapeo"
  const rows = fechas.map(fecha => {
    const ms = fecha.valueOf();
    return [
      fecha,
      ...regiones.map(rg => regionMaps[rg].get(ms) || 0)
    ];
  });
  dt.addRows(rows);

  //Dibujamos el gráfico
  const chart = new google.visualization.LineChart(
    document.getElementById('chart_compare')
  );
  chart.draw(dt, {
    title: 'Comparativo de casos',
    hAxis: { title: 'Fecha', format: 'dd-MM-yyyy' },
    vAxis: { title: 'Confirmados', minValue: 0 },
    curveType: 'function',
    width: 800,
    height: 400
  });
}
