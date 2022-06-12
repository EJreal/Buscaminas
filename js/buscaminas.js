
var tam = prompt("Digite el numero de filas y columnas");

var dimen = tam * 52;


var buscamina = Matriz();

function Matriz() {
    var tabla = [];
    for (var i = 0; i < tam; i++) {
        tabla[i] = new Array(tam);
    }
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            tabla[i][j] = 0;
        }
    }
    return tabla;
}

function cargarJuego() {
    document.getElementById("buscaminas").style.height = dimen + "px";
    document.getElementById("buscaminas").style.width = dimen + "px";
    crearTablero();
    colocarBombas(buscamina);
    bombasAdyacentes(buscamina);
}

function crearTablero() {
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            var div = document.createElement("div");
            div.id = i + "," + j;
            div.addEventListener("click", mostrarCasilla, true);
            buscaminas.appendChild(div);
        }
    }

}

// la siguiente funcion coloca las minas aleatoriamente

function colocarBombas(tablero) {
    var fil = 0;
    var col = 0;

    fil = Math.floor(Math.random() * tam);
    col = Math.floor(Math.random() * tam);

    for (var i = 0; i < tam * 3; i++) {
        while (tablero[fil][col] == "bomba") {
            fil = Math.floor(Math.random() * tam);
            col = Math.floor(Math.random() * tam);
        }
        tablero[fil][col] = "bomba";
    }
}


//En la siguiente funcion se buscan las bombas

function bombasAdyacentes(tablero) {
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            if (tablero[i][j] == "bomba") {
                //en la esquina superior izquierda
                if (i == 0 && j == 0) {
                    colocarNumero(i, i + 1, j, j + 1, tablero);
                }
                //en la esquina superior derecha
                else if (i == 0 && j == (tam - 1)) {
                    colocarNumero(i, i + 1, j - 1, j, tablero);
                }
                //en la esquina inferior izquierda
                else if (i == (tam - 1) && j == 0) {
                    colocarNumero(i - 1, i, j, j + 1, tablero);
                }
                //en la esquina inferior derecha
                else if (i == (tam - 1) && j == (tam - 1)) {
                    colocarNumero(i - 1, i, j - 1, j, tablero);
                }
                //en la fila 1 sin bordes
                else if (i == 0 && (j > 0 && j < (tam - 1))) {
                    colocarNumero(i, i + 1, j - 1, j + 1, tablero);
                }
                //en la columna 1 sin bordes
                else if (j == 0 && (i > 0 && i < (tam - 1))) {
                    colocarNumero(i - 1, i + 1, j, j + 1, tablero);
                }
                //en la columna final sin bordes
                else if (j == (tam - 1) && (i > 0 && i < (tam - 1))) {
                    colocarNumero(i - 1, i + 1, j - 1, j, tablero);
                }
                //en la fila final sin bordes
                else if (i == (tam - 1) && (j > 0 && j < (tam - 1))) {
                    colocarNumero(i - 1, i, j - 1, j + 1, tablero);
                }
                //en el centro
                else {
                    colocarNumero(i - 1, i + 1, j - 1, j + 1, tablero);
                }
            }
        }
    }
}

//en la siguiente funcion se colocan el numero de bombas adyacentes 

function colocarNumero(filaInicial, filaFinal, columnaInicial, columnaFinal, tablero) {
    for (var i = filaInicial; i <= filaFinal; i++) {
        for (var j = columnaInicial; j <= columnaFinal; j++) {
            if (tablero[i][j] != "bomba") {
                tablero[i][j] = parseInt(tablero[i][j] + 1);
            }
        }
    }
}

function mostrarCasilla() {
    var vectorID = this.id.split(",");
    var idCasilla = vectorID[0] + "," + vectorID[1];
    var casilla = document.getElementById(idCasilla);

    if (buscamina[parseInt(vectorID[0], 10)][parseInt(vectorID[1], 10)] == 0) {
        revelarZona(parseInt(vectorID[0], 10), parseInt(vectorID[1], 10), buscamina);
    } else {
        if (buscamina[parseInt(vectorID[0], 10)][parseInt(vectorID[1], 10)] != "bomba") {
            document.getElementById(idCasilla).innerHTML = "<p>" + buscamina[parseInt(vectorID[0], 10)][parseInt(vectorID[1], 10)] + "</p>";
            casilla.style.backgroundColor = "lightblue";
        } else {
            revelarBombas(buscamina);
        }
    }
}


function revelarZona(i, j, tablero) {
    //en la esquina superior izquierda
    if (i == 0 && j == 0) {
        revelarBucle(i, j, i + 1, j + 1, i, j, tablero);
    }
    //en la esquina superior derecha
    else if (i == 0 && j == (tam - 1)) {
        revelarBucle(i, j - 1, i + 1, j, i, j, tablero);
    }
    //en la esquina inferior izquierda
    else if (i == (tam - 1) && j == 0) {
        revelarBucle(i - 1, j, i, j + 1, i, j, tablero);
    }
    //en la esquina inferior derecha
    else if (i == (tam - 1) && j == (tam - 1)) {
        revelarBucle(i - 1, j - 1, i, j, i, j, tablero);
    }
    //en la fila 1 sin bordes
    else if (i == 0 && (j > 0 && j < (tam - 1))) {
        revelarBucle(i, j - 1, i + 1, j + 1, i, j, tablero);
    }
    //en la columna 1 sin bordes
    else if (j == 0 && (i > 0 && i < (tam - 1))) {
        revelarBucle(i - 1, j, i + 1, j + 1, i, j, tablero);
    }
    //en la columna final sin bordes
    else if (j == (tam - 1) && (i > 0 && i < (tam - 1))) {
        revelarBucle(i - 1, j - 1, i + 1, j, i, j, tablero);
    }
    //en la fila final sin bordes
    else if (i == (tam - 1) && (j > 0 && j < (tam - 1))) {
        revelarBucle(i - 1, j - 1, i, j + 1, i, j, tablero);
    }
    //en el centro
    else {
        revelarBucle(i - 1, j - 1, i + 1, j + 1, i, j, tablero);
    }
}

function revelarBucle(filaInicial, columnaInicial, filaFinal, columnaFinal, filaBase, columnaBase, tablero) {
    for (var i = filaInicial; i <= filaFinal; i++) {
        for (var j = columnaInicial; j <= columnaFinal; j++) {
            var idCasilla = i + "," + j;
            var casilla = document.getElementById(idCasilla)
            if (casilla.textContent == "") {
                if (tablero[i][j] == 0) {
                    if (i == filaBase && j == columnaBase) {
                        casilla.textContent = "";
                        casilla.style.backgroundColor = "lightblue";
                    } else {
                        if (casilla.style.backgroundColor != "lightblue") {
                            revelarZona(i, j, tablero);
                        }
                    }

                } else {
                    if (tablero[i][j] != "bomba") {
                        document.getElementById(idCasilla).innerHTML = "<p>" + tablero[i][j] + "</p>";
                        casilla.style.backgroundColor = "lightblue";
                    }
                }
            }
        }
    }
}

function revelarBombas(tablero) {
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            var idCasilla = i + "," + j;
            var casilla = document.getElementById(idCasilla);
            if (tablero[i][j] == "bomba") {
                casilla.style.backgroundColor = "lightblue";
                casilla.style.backgroundImage = "url(imagenes/electrode.gif)";
            }
        }
    }
}

function verificar_login($user, $password, $result) {
    $sql = "SELECT * FROM usuarios WHERE usuario='$user' and password='$password'";
    $rec = mysql_query($sql);
    $count = 0;
    while($row = mysql_fetch_object($rec))
    {
        $count++;
        $result = $row;
    }
    if($count == 1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
