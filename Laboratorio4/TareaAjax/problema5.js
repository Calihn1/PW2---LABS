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
}
