<?php

$names = [
    "Anna", "Brittany", "Cinderella", "Diana", "Eva",
    "Fiona", "Gunda", "Hege", "Inga", "Johanna",
    "Kitty", "Linda", "Nino", "Ophelia", "Petunia",
    "Amanda", "Raquel", "Susan", "Tina", "Uma",
    "Vera", "Wendy", "Xena", "Yvonne", "Zelda"
];

//Obtener el parámetro 'q' de la URL
$q = "";
if (isset($_GET["q"])) {
    $q = strtolower(trim($_GET["q"]));
}

//Si no hay nada escrito, no sugerimos nada
if ($q === "") {
    echo "";
    exit;
}

//Buscar coincidencias
$suggestions = [];
foreach ($names as $name) {
    if (stripos($name, $q) === 0) {
        $suggestions[] = $name;
    }
}

//Devolver resultado
if (count($suggestions) > 0) {
    // Une las sugerencias con comas
    echo implode(", ", $suggestions);
} else {
    echo "No suggestions";
}