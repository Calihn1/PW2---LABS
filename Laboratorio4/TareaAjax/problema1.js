
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => listRegions(data))
      .catch(err => console.error('Error cargando data.json:', err));
});
  
 
function listRegions(data) {
    const regiones = data.map(item => item.region);
  
    const únicas = [...new Set(regiones)];
  
    únicas.sort();
  
    const ul = document.createElement('ul');
    únicas.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r;
      ul.appendChild(li);
    });
  
    const cont = document.getElementById('list-regions');
    cont.appendChild(ul);
}
  