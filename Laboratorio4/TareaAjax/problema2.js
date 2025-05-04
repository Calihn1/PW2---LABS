document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => showTotals(data))
      .catch(err => console.error('Error cargando data.json:', err));
  });