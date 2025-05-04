document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => showTop10(data))
      .catch(err => console.error('Error cargando data.json:', err));
});
  
function showTop10(data) {
    const totales = {};
  
    data.forEach(entry => {
      const region = entry.region;
  
    
      const sumaConfirmados = entry.confirmed
        .map(obj => Number(obj.value))     
        .reduce((acc, curr) => acc + curr, 0); 

      totales[region] = sumaConfirmados;
    });
  

    const sorted = Object
      .entries(totales)                   
      .sort((a, b) => b[1] - a[1])        
      .slice(0, 10);                      
  
    
    let html = '<table>';
    html += '<caption>Top 10 Regiones</caption>';
    html += '<tr><th>#</th><th>Región</th><th>Total Confirmados</th></tr>';
  
    sorted.forEach(([region, total], index) => {
      html += `<tr>
                 <td>${index + 1}</td>
                 <td>${region}</td>
                 <td>${total}</td>
               </tr>`;
    });
  
    html += '</table>';
  
   
    document.getElementById('top10-region').innerHTML = html;
}