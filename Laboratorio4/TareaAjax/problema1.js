
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => listRegions(data))
      .catch(err => console.error('Error cargando data.json:', err));
  });
  
  
  