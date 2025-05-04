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

}
