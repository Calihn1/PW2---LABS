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

