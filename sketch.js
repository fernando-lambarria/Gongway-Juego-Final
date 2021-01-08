let tablero;
let columnas;
let renglones;
let celda_tamanio = 10; 
let contador = 0;


function setup() {
  createCanvas(600, 400);
  columnas = width / celda_tamanio;
  renglones = height / celda_tamanio;
  tablero = crearTablero(columnas, renglones);
  for(let x = 1; x < columnas-1; x += 1){
    for(let y = 1; y < renglones-1; y += 1){
      tablero[x][y] = floor(random(2));
      if(random() > 0.85)
        {
          tablero[x][y] = 10;
        }
    }
    
  }
}

function draw() {
  background(51);
   if (keyIsPressed){
     if (key=='h'){
       pintaTablero();
       siguienteGeneracion();
     }
   }
  fill('white');
  textSize(25);
  text(contador, 10, 30);
}



function siguienteGeneracion(){
  
  let tablero_siguiente = crearTablero(columnas, renglones);
  for(let x = 1; x < columnas-1; x += 1){
    for(let y = 1; y < renglones-1; y += 1){
      let celda = tablero[x][y];
      let vecinos = cuentaVecinos(x, y);
      let cancer = cuentaCancer(x, y);

      //si una celula muerta tiene tres vecinas vivas
      //nace una viva
      if(celda == 0 && vecinos == 3){
         tablero_siguiente[x][y] = 1;
      } 
      
      //si una celula muerta tiene tres vecinas cancerigenas
      //nace una cancerigena
      else if(celda == 0 && cancer == 3){
         tablero_siguiente[x][y] = 10;
      } 
      
      //si una celula viva tiene mas de 3 vecinos o menos de 2 muere
      else if(celda == 1 &&(vecinos > 3 || vecinos < 2)){
        tablero_siguiente[x][y] = 0;
      }
      
      //si una celula cancerigena tiene 
      //mas de 3 vecinos cancerigenos o menos de 2 muere 
      else if(celda == 10 &&(cancer > 3 || cancer < 2)){
        tablero_siguiente[x][y] = 0;
      }
      
      //si una celda viva tiene por lo menos a un vecino
      //cancerigeno se contagia
      else if(celda == 1 && cancer > 0  ){
        tablero_siguiente[x][y] = 10;
      }
      
      
      //Si una celula viva tiene entre 2 y 3 vecinos vivos se mantiene 
      else{
        tablero_siguiente[x][y] = celda;
      }
    }
   // print(contador += 1);
  }
  print(contador+=1);
  tablero = tablero_siguiente;
}


function cuentaCancer(x, y){
  
  let suma_cancer = 0;

  if(tablero[x-1][y-1] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x][y-1] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x+1][y-1] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x-1][y] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x+1][y] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x-1][y+1] == 10){
    suma_cancer += 1;
  }
  
  if(tablero[x][y+1] == 10){
    suma_cancer += 1;
  }
  if(tablero[x+1][y+1] == 10){
    suma_cancer += 1;
  }
  
  return suma_cancer;
}

function cuentaVecinos(x, y){
  let suma_vecinos = 0;
  suma_vecinos += tablero[x-1][y-1];
  suma_vecinos += tablero[x][y-1];
  suma_vecinos += tablero[x+1][y-1];
  suma_vecinos += tablero[x-1][y];
  suma_vecinos += tablero[x+1][y];
  suma_vecinos += tablero[x-1][y+1];
  suma_vecinos += tablero[x][y+1];
  suma_vecinos += tablero[x+1][y+1];
  return suma_vecinos;
}

function pintaTablero(){
  for(let x = 0; x < columnas; x += 1){
    for(let y = 0; y < renglones; y += 1){
      let posx = x * celda_tamanio;
      let posy = y * celda_tamanio;
      if(tablero[x][y] == 1){
        fill('blue');
        stroke(0);
        rect(posx, posy, celda_tamanio, celda_tamanio);
      }
      else if(tablero[x][y] > 1){
        fill('red');
        stroke(0);
        rect(posx, posy, celda_tamanio, celda_tamanio);
      }
    }
  }
}

function crearTablero(cols, ren) {
  let tab = new Array(cols);
  for(let i = 0; i < tab.length; i = i+1){
    tab[i] = new Array(ren);
  }
  return tab;
}