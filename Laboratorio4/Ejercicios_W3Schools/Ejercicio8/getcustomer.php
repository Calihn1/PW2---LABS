<?php

header('Content-Type: text/html; charset=UTF-8');

//Credenciales de tu base de datos
$host     = 'localhost';
$dbname   = 'ajax_demo';
$username = 'root';
$password = ''; //Ingrese su contraseña

try {
    //Conexión con PDO
    $pdo = new PDO(
      "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
      $username,
      $password,
      [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

//Obtener parámetro q
$q = isset($_GET['q']) ? $_GET['q'] : '';
if ($q === '') {
    echo "No se recibió ningún ID de cliente.";
    exit;
}

//Preparar y ejecutar la consulta
$stmt = $pdo->prepare("SELECT * FROM customers WHERE CustomerID = ?");
$stmt->execute([$q]);
$customer = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$customer) {
    echo "Cliente no encontrado para ID: " . htmlspecialchars($q);
    exit;
}

//Devolver la info en HTML
echo "<table>";
echo "<tr><th>Campo</th><th>Valor</th></tr>";
foreach ($customer as $field => $value) {
    echo "<tr>
            <td>" . htmlspecialchars($field) . "</td>
            <td>" . htmlspecialchars($value) . "</td>
          </tr>";
}
echo "</table>";
