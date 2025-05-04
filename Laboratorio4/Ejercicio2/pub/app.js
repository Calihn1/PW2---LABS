//Espera hasta que el DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('miBoton').addEventListener('click', recitar);
});
  
function recitar() {
    
  const url = 'http://localhost:3000/recitar'

  fetch(url)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#poema').innerHTML = data.text;
    })
    .catch(err => console.error('Error al recitar:', err));
}