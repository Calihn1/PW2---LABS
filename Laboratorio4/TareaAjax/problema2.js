// 2.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => showTotals(data))
      .catch(err => console.error('Error cargando data.json:', err));
  });
  
  function showTotals(data) {
    const totales = {};
  
    data.forEach(entry => {
      const region = entry.region;
  
    
      const sumaConfirmados = entry.confirmed
        .map(obj => Number(obj.value))     
        .reduce((acc, curr) => acc + curr, 0); 

      totales[region] = sumaConfirmados;
    });
  
   
    let html = '<table>';
    html += '<tr><th>Región</th><th>Total Confirmados</th></tr>';
    for (const region in totales) {
      html += `<tr>
                 <td>${region}</td>
                 <td>${totales[region]}</td>
               </tr>`;
    }
    html += '</table>';
  
    document.getElementById('totals-region').innerHTML = html;
  }