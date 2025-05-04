//Cargamos los paquetes de googlecharts
google.charts.load('current', { packages: ['corechart'] });

//Cuando se termine de descargar se ejecuta la siguiente función
google.charts.setOnLoadCallback(loadAndDraw);

function loadAndDraw() {
  //Trae los datos JSON( promesas )
  fetch('data.json')
    .then(res => res.json())
    .then(data => drawChart(data))//Función para dibujar los datos
    .catch(err => console.error('Error cargando data.json:', err));
}

function drawChart(data) {
  // Busca el objeto de Arequipa
  const entry = data.find(d => d.region === 'Arequipa');
  if (!entry) {
    console.warn('No se encontró Arequipa en data.json');
    return;
  }

  // Prepara las filas [Date(x), Number(y)]
  const rows = entry.confirmed
    .map(item => {
      //Las fechas vienen en "DD-MM-YYYY", por eso se divide en tres partes 
      const [dd, mm, yyyy] = item.date.split('-');
      // Date(year, monthIndex, day) -> constructor
      return [ new Date(+yyyy, +mm - 1, +dd),
               Number(item.value) ];
    })
    //ordenar cronológicamente, diferencia en milisegundos
    .sort((a, b) => a[0] - b[0]);
}
