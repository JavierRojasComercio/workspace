function infuno(){
    document.getElementById("uno").innerHTML = "Hola Mundo!";
}

function infdos()
{
    var fecha;
    fecha = new Date();
    var cadena = "La fecha actual es: " + fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear(); /*+ fecha.toLocaleDateString() - esto hace lo mismo que todas las lineas anteriores*/;
    document.getElementById("dos").innerHTML = cadena;
}

function inftres(){
    document.getElementById("tres").innerHTML = "Diego Martinez <br> 44";
}

function infcuatro(){
	var nombre='Andres';
    var edad=23;
    var altura=1.86;
    var casado=false;
    document.getElementById("cuatro").innerHTML = "<br>Nombre: " + nombre + "<br>Edad: " + edad + "<br>Altura: " + altura + "<br>Casado: " + casado;
}

function infcinco(){
    var nombre;
    var edad;
    nombre = prompt('Escriba su nombre:', '');
    edad = prompt('Escriba su edad:', '');
    document.getElementById("cinco").innerHTML = "Hola " + nombre + " así que tienes " + edad + " años";
}

function infseis(){
    var usuario;
    var mail;
    usuario=prompt('Escriba el nombre de usuario:','');
    mail=prompt('Escriba el mail:','');
    document.getElementById("seis").innerHTML = "Nombre de Usuario ingresado: " + usuario + "<br>Mail ingresado: " + mail;
}

function infsiete(){
    var valor1;
    var valor2;
    valor1=prompt('Escriba el primer número:','');
    valor2=prompt('Escriba el segundo número','');
    var suma=parseInt(valor1)+parseInt(valor2);
    var producto=parseInt(valor1)*parseInt(valor2);
    document.getElementById("siete").innerHTML = "La suma es: " + suma + "<br>El producto es: " + producto;
}

function infocho(){
  var lado;
  lado=prompt('Escriba medida del lado:','');
  var perimetro;
  perimetro=lado*4;
   document.getElementById("ocho").innerHTML = "El perimetro es de" + perimetro;
}

function infonueve(){
    var num1;
    var num2;
    var num3;
    var num4;
    num1=prompt('Escriba primer valor:','');
    num2=prompt('Escriba segundo valor:','');
    num3=prompt('Escriba tercer valor:','');
    num4=prompt('Escriba cuarto valor:','');
    var suma;
    suma=parseInt(num1)+parseInt(num2);
    var producto;
    producto=parseInt(num3)*parseInt(num4);
    document.getElementById("nueve").innerHTML = "La suma de los dos primeros valores es:" + suma +"<br>El producto del tercer y cuarto valor es:" + producto;

}

function infodiez (){
    var num1;
    var num2;
    var num3;
    var num4;
    num1=prompt('Escriba primer valor:','');
    num2=prompt('Escriba segundo valor:','');
    num3=prompt('Escriba tercer valor:','');
    num4=prompt('Escriba cuarto valor:','');
    var suma;
    suma=parseInt(num1)+parseInt(num2)+parseInt(num3)+parseInt(num4);
    var producto;
    producto=parseInt(num1)*parseInt(num2)*parseInt(num3)*parseInt(num4);
    document.getElementById("diez").innerHTML = "La suma de los cuatro valores es:"  + suma + "<br>'El producto de los cuatro valor es:" + producto;
}

function infonce () {
      var precio;
  var cantidad;
  precio=prompt('Escriba precio del artículo','');
  cantidad=prompt('Escriba la cantidad de artículos a llevar:','');
  var importe;
  importe=parseInt(precio)*parseInt(cantidad);
  document.getElementById("once").innerHTML ='Debe abonar:';
  document.getElementById("once").innerHTML =importe;
}

function infodoce () {
  var total1=0;
  var x=0;
  var nro;
  while(x<3)
  {
    nro=prompt('Escriba valor de la primer lista:','');
    nro=parseInt(nro);
    total1=total1+nro;
    x=x+1;
  }
  var total2=0;
  x=0;
  while(x<3)
  {
    nro=prompt('Escriba valor de la segunda lista:','');
    nro=parseInt(nro);
    total2=total2+nro;
    x=x+1;
  }
  if (total1>total1)
  {
    document.getElementById("doce").innerHTML ='Tiene mayor valor la lista1';
  }
  else
  {
    if (total1<total2)
    {
      document.getElementById("doce").innerHTML ='Tiene mayor valor la lista2';
    }
    else
    {
      document.getElementById("doce").innerHTML ='Tienen el mismo valor acumuado las dos listas';
    }
  }

}


function infotrece () {
    var nombre;
  var nota;
  nombre=prompt('Escriba nombre:','');
  nota=prompt('Escriba su nota:','');
  if (nota>=7)
  {
    document.getElementById("trece").innerHTML = nombre+' esta aprobado con un '+nota;
  }
}


function infocatorce () {
    var nombre;
  var nota;
  nombre=prompt('Escriba nombre:','');
  nota=prompt('Escriba su nota:','');
  if (nota>=4)
  {
    document.getElementById("catorce").innerHTML = nombre+' esta aprobado con un '+nota;
  }
}


function infoquince () {
    var nota1;
  var nota2;
  var nota3;
  nota1=prompt('Escriba primer nota','');
  nota1=parseInt(nota1);
  nota2=prompt('Escriba segunda nota','');
  nota2=parseInt(nota2);
  nota3=prompt('Escriba tercer nota','');
  nota3=parseInt(nota3);
  var suma;
  suma=nota1+nota2+nota3; 
  var promedio;
  promedio=suma/3;
  if (promedio>=7)
  {
    document.getElementById("quince").innerHTML = 'Promocionado';
  }

}

function infodieciseis () {
      var clave1;
  var clave2;
  clave1=prompt('Escriba una clave:','');
  clave2=prompt('Repita el ingreso de la clave:','');
 
 if (clave1==clave2)
  {
   document.getElementById("dieciseis").innerHTML = 'Ingreso las dos claves iguales';
  } 
}


function infdiecisiete () {
      var num1,num2;
  num1=prompt('Escriba el primer número:','');
  num2=prompt('Escriba el segundo número:','');
  num1=parseInt(num1);
  num2=parseInt(num2);
  if (num1>num2)
  {
   document.getElementById("diecisiete").innerHTML =  'el mayor es '+num1;
  }
  else
  {
    document.getElementById("diecisiete").innerHTML =  'el mayor es '+num2;
  }

}

function infodieciocho () {
    var num1,num2;
  num1=prompt('Escriba el primer número:','');
  num2=prompt('Escriba el segundo número:','');
  num1=parseInt(num1);
  num2=parseInt(num2);
  if (num1>num2)
  {
     document.getElementById("dieciocho").innerHTML = 'el mayor es '+num1;
  }
  else
  {
     document.getElementById("dieciocho").innerHTML = 'el mayor es '+num2;
  }

}

function infodiecinueve () {
     var num1,num2;
  num1=prompt('Escriba el primer número:','');
  num2=prompt('Escriba el segundo número:','');
  num1=parseInt(num1);
  num2=parseInt(num2);
  if (num1>num2)
  {
    var suma,diferencia;
    suma=num1+num2;
    diferencia=num1-num2;
    document.getElementById("diecinueve").innerHTML = 'La suma es:'+suma;
    document.getElementById("diecinueve").innerHTML = '<br>';
    document.getElementById("diecinueve").innerHTML = 'La diferencia es:'+diferencia;
  }
  else
  {
    var producto,division;
    producto=num1*num2;
    division=num1/num2;
    document.getElementById("diecinueve").innerHTML = 'El producto es '+producto;
    document.getElementById("diecinueve").innerHTML = '<br>';
    document.getElementById("diecinueve").innerHTML = 'La división del primero respecto al segundo es:'+division;
  }

}

function infoveinte () {
    var nota1,nota2,nota3;
  nota1=prompt('Escriba primer nota:','');
  nota1=parseInt(nota1);
  nota2=prompt('Escriba segunda nota:','');
  nota2=parseInt(nota2);
  nota3=prompt('Escriba tercer nota:','');
  nota3=parseInt(nota3);
  var suma;
  suma=nota1+nota2+nota3;
  var promedio;
  promedio=suma/3;
  if (promedio>=4)
  {
    document.getElementById("veinte").innerHTML = 'Regular';
  }
  else
  {
     document.getElementById("veinte").innerHTML = 'Reprobado';
  }

}

function infoveintiuno () {
      var num;
  num=prompt('Escriba un valor comprendido entre 1 y 99:','');
  num=parseInt(num);
  if (num<10)
  {
    document.getElementById("veintiuno").innerHTML = 'El valor ingresado tiene un dígito';
  }
  else
  {
    document.getElementById("veintiuno").innerHTML = 'El valor ingresado tiene dos dígitos';
  }

}

function infoveintidos () {
      var nota1,nota2,nota3;
  nota1=prompt('Escriba 1ra. nota:','');
  nota2=prompt('Escriba 2da. nota:','');
  nota3=prompt('Escriba 3ra. nota:','');
  //Convertimos los 3 string en enteros
  nota1=parseInt(nota1);
  nota2=parseInt(nota2);
  nota3=parseInt(nota3);
  var pro;
  pro=(nota1+nota2+nota3)/3;
  if (pro>=7)
  {
    document.getElementById("veintidos").innerHTML = 'promocionado';
  }
  else
  {
    if (pro>=4)
    {
      document.getElementById("veintidos").innerHTML = 'regular';
    }
    else
    {
       document.getElementById("veintidos").innerHTML = 'reprobado';
    }
  }

}

function infonveintitres () {
      var nota1,nota2,nota3;
  nota1=prompt('Escriba 1ra. nota:','');
  nota2=prompt('Escriba 2da. nota:','');
  nota3=prompt('Escriba 3ra. nota:','');
  //Convertimos los 3 string en enteros
  nota1=parseInt(nota1);
  nota2=parseInt(nota2);
  nota3=parseInt(nota3);
  var pro;
  pro=(nota1+nota2+nota3)/3;
  if (pro>=7)
  {
    document.getElementById("veintitres").innerHTML = 'promocionado';
  }
  else
  {
    if (pro>=4)
    {
      document.getElementById("veintitres").innerHTML = 'regular';
    }
    else
    {
      document.getElementById("veintitres").innerHTML = 'reprobado';
    }
  }

}

function infoveinticuatro () {
      var num1,num2,num3;
  num1=prompt('Escriba primer valor:','');
  num1=parseInt(num1);
  num2=prompt('Escriba segundo valor:','');
  num2=parseInt(num2);
  num3=prompt('Escriba tercer valor:','');
  num3=parseInt(num3);
  if (num1>num2)
  {
    if (num1>num3)
    {
      document.getElementById("veinticuatro").innerHTML = 'El mayor de los tres es:'+num1; 
    }
    else
    {
       document.getElementById("veinticuatro").innerHTML = 'El mayor de los tres es:'+num3; 
    }
  }
  else
  {
    if (num2>num3)
    {
       document.getElementById("veinticuatro").innerHTML = 'El mayor de los tres es:'+num2;   
    }
    else
    {
      document.getElementById("veinticuatro").innerHTML = 'El mayor de los tres es:'+num3;   
    }
  }

}

function infoveinticinco () {
    var num;
  num=prompt('Escriba un valor entero','');
  num=parseInt(num);
  if (num==0)
  {
    document.getElementById("veinticinco").innerHTML = 'El número ingresado es cero';
  }
  else
  {
    if (num>0)
    {
      document.getElementById("veinticinco").innerHTML = 'El número ingresado es positivo';
    }
    else
    {
      document.getElementById("veinticinco").innerHTML = 'El número ingresado es negativo';
    }
  }

}

function infoveintiseis () {
    var num;
  num=prompt('Escriba un número de 1,2 o 3 dígitos','');
  num=parseInt(num);
  if (num<10)
  {
    document.getElementById("veintiseis").innerHTML = 'Tiene un dígito';
  }
  else
  {
    if (num<100)
    {
      document.getElementById("veintiseis").innerHTML = 'Tiene dos dígitos';
    }
    else
    {
      document.getElementById("veintiseis").innerHTML = 'Tiene tres dígitos';
    }
  }

}

function infoveintisiete () {
      var nombre;
  nombre=prompt('Escriba el nombre del postulante','');
  var cantpreguntas;
  cantpreguntas=prompt('Cantidad de preguntas del test','');
  cantpreguntas=parseInt(cantpreguntas);
  var cantcorrectas;
  cantcorrectas=prompt('Cantidad de preguntas correctas','');
  cantcorrectas=parseInt(cantcorrectas);
  var porcentaje;
  porcentaje=cantcorrectas/cantpreguntas*100;
  if (porcentaje>=90)
  {
    document.getElementById("veintisiete").innerHTML = 'Nivel superior';
  }
  else
  {
    if (porcentaje>=75)
    {
      document.getElementById("veintisiete").innerHTML = 'Nivel medio';
    }
    else
    {
      if (porcentaje>=50)
      {
        document.getElementById("veintisiete").innerHTML = 'Nivel regular';
      }
      else
      {
        document.getElementById("veintisiete").innerHTML = 'Fuera de nivel';
      }
    }
  }

}

function infoveintiocho () {
      var num1,num2,num3;
  num1=prompt('Escriba primer número:','');
  num2=prompt('Escriba segundo número:','');
  num3=prompt('Escriba tercer número:','');
  num1=parseInt(num1);
  num2=parseInt(num2);
  num3=parseInt(num3);
  if (num1>num2 && num1>num3)
  {
    document.getElementById("veintiocho").innerHTML = 'el mayor es el '+num1;
  }
  else
  {
    if (num2>num3)
    {
      document.getElementById("veintiocho").innerHTML = 'el mayor es el '+num2; 
    }
    else
    {
      document.getElementById("veintiocho").innerHTML = 'el mayor es el '+num3;
    }
  }

}

function infoveintinueve () {
var num1,num2,num3;
  num1=prompt('Escriba primer número:','');
  num2=prompt('Escriba segundo número:','');
  num3=prompt('Escriba tercer número:','');
  num1=parseInt(num1);
  num2=parseInt(num2);
  num3=parseInt(num3);
  if (num1>num2 && num1>num3)
  {
    document.getElementById("veintinueve").innerHTML = 'el mayor es el '+num1;
  }
  else
  {
    if (num2>num3)
    {
      document.getElementById("veintinueve").innerHTML = 'el mayor es el '+num2;
    }
    else
    {
      document.getElementById("veintinueve").innerHTML = 'el mayor es el '+num3;
    }
  }

}

function infotreinta () {
var dia,mes,año;
  dia=prompt('Escriba día','');
  dia=parseInt(dia);
  mes=prompt('Escriba mes','');
  mes=parseInt(mes);
  año=prompt('Escriba año','');
  año=parseInt(año);
  if (dia==25 && mes==12)
  {
    document.getElementById("treinta").innerHTML = 'La fecha ingresada corresponde a navidad';
  }
  else
  {
    document.getElementById("treinta").innerHTML = 'La fecha ingresada no corresponde a navidad';
  }

}

function infotreintaiuno () {
var num1,num2,num3;
  num1=prompt('Escriba primer valor','');
  num1=parseInt(num1);
  num2=prompt('Escriba segundo valor','');
  num2=parseInt(num2);
  num3=prompt('Escriba tercer valor','');
  num3=parseInt(num3);
  if (num1==num2 && num1==num3)
  {
    var resu=(num1+num2)*num3;
    document.getElementById("treintaiuno").innerHTML = 'La suma de los dos primeros valores y multiplicado dicha suma por el tercero es:'+resu;
  }

}

function infotreintaidos () {
  var num1,num2,num3;
  num1=prompt('Escriba primer valor','');
  num1=parseInt(num1);
  num2=prompt('Escriba segundo valor','');
  num2=parseInt(num2);
  num3=prompt('Escriba tercer valor','');
  num3=parseInt(num3);
  if (num1<10 && num2<10 && num3<10)
  {
    document.getElementById("treintaidos").innerHTML = 'Todos los números ingresados son menores a 10.';
  }

}

function infotreintaitres () {
var x,y;
  x=prompt('Escriba coordenada x','');
  x=parseInt(x);
  y=prompt('Escriba coordenada y','');
  y=parseInt(y);
  if (x>0 && y>0)
  {
    document.getElementById("treintaitres").innerHTML = 'Se encuentra en el primer cuadrante';
  }
  else
  {
    if (x<0 && y>0)
    {
      document.getElementById("treintaitres").innerHTML = 'Se encuentra en el segundo cuadrante';
    }
    else
    {
      if (x<0 && y<0)
      {
        document.getElementById("treintaitres").innerHTML = 'Se encuentra en el tercer cuadrante';        
      }
      else
      {
        if (x>0 && y<0)
        {
          document.getElementById("treintaitres").innerHTML = 'Se encuentra en el cuarto cuadrante';
        }
        else
        {
          document.getElementById("treintaitres").innerHTML = 'Se encuentra sobre un eje';
        }
      }
    }
  }

}

function infotreintaicuatro () {
var sueldo,antiguedad;
  sueldo=prompt('Escriba el sueldo del empleado','');
  sueldo=parseInt(sueldo);
  antiguedad=prompt('Escriba la antigüedad del empleado','');
  antiguedad=parseInt(antiguedad);
  if (sueldo<500 && antiguedad>=10)
  {
    document.getElementById("treintaicuatro").innerHTML = 'Se le otorga un aumento del 20%';
    document.getElementById("treintaicuatro").innerHTML = '<br>';
    var sueldototal=sueldo+sueldo*0.20; 
    document.getElementById("treintaicuatro").innerHTML = 'El sueldo total es:'+sueldototal;
  }
  else
  {
    if (sueldo<500 && antiguedad<10)
    {
     document.getElementById("treintaicuatro").innerHTML = 'Se le otorga un aumento del 5%';
      document.getElementById("treintaicuatro").innerHTML = '<br>';
      var sueldototal=sueldo+sueldo*0.05; 
      document.getElementById("treintaicuatro").innerHTML = 'El sueldo total es:'+sueldototal;
    }
    else 
    {
      document.getElementById("treintaicuatro").innerHTML = 'El sueldo queda sin cambios:'+sueldo;      
    }
  }

}

function infotreintaicinco () {
var dia,mes,año;
  dia=prompt('Escriba día en numeros:','');
  mes=prompt('Escriba mes en numeros:','');
  año=prompt('Escriba año en numeros:','');
  dia=parseInt(dia);
  mes=parseInt(mes);
  año=parseInt(año);
  if (mes==1 || mes==2 || mes==3)
  {
    document.getElementById("treintaicinco").innerHTML = 'corresponde al primer trimestre del año.';
  }

}

function infotreintaiseis () {
var dia,mes,año;
  dia=prompt('Escriba día:','');
  mes=prompt('Escriba mes:','');
  año=prompt('Escriba año:','');
  dia=parseInt(dia);
  mes=parseInt(mes);
  año=parseInt(año);
  if (mes==1 || mes==2 || mes==3)
  {
    document.getElementById("treintaiseis").innerHTML = 'corresponde al primer trimestre del año.';
  }

}

function infotreintaisiete () {
  var num1,num2,num3;
  num1=prompt('Escriba primer valor','');
  num1=parseInt(num1);
  num2=prompt('Escriba segundo valor','');
  num2=parseInt(num2);
  num3=prompt('Escriba tercer valor','');
  num3=parseInt(num3);
  if (num1<10 || num2<10 || num3<10)
  {
    document.getElementById("treintaisiete").innerHTML = 'Alguno de los números son menores a diez';
  }

}

function infotreintaiocho () {
// Array que almacena los 12 meses del año
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
 
// Se muestra el nombre de cada mes
alert(meses[0]);
alert(meses[1]);
alert(meses[2]);
alert(meses[3]);
alert(meses[4]);
alert(meses[5]);
alert(meses[6]);
alert(meses[7]);
alert(meses[8]);
alert(meses[9]);
alert(meses[10]);
alert(meses[11]);

}

function infotreintainueve () {
var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
 
var numero = prompt("Introduce tu número de DNI (sin la letra)");
var letra = prompt("Introduce la letra de tu DNI (en mayúsculas)");
letra = letra.toUpperCase();
 
if(numero < 0 || numero > 99999999) {
  alert("El número proporcionado no es válido");
}
else {
  var letraCalculada = letras[numero % 23];
  if(letraCalculada != letra) {
    alert("La letra o el número proporcionados no son correctos");
  }
  else {
    alert("El número de DNI y su letra son correctos");
  }
}
}


function infocuarenta () {
 var numero = prompt("Introduce un numero y se mostrará su factorial");
     var resultado = 1;
     
     for(var i=1; i<=numero; i++){
       resultado = i;
     }
     alert(resultado);
}

function infocuarentaiuno () {

var numero1 = 5;
var numero2 = 8;

if(numero1 <= numero2) {alert("numero1 no es mayor que numero2");}

if(numero2 >= 0) {  alert("numero2 es positivo");}

if(numero1 < 0 || numero1 != 0) {  alert("numero1 es negativo o distinto de cero");}

if(++numero1 < numero2) { alert("Incrementar en 1 unidad el valor de numero1 no lo hace mayor o igual que numero2");}
}

function infocuarentaidos () {

    function info(cadena){
        var resultado = "La cadena \"" + cadena + "\"";
        
        //Comprobar mayusculas y minusculas
        if(cadena == cadena.toUpperCase()){
            resultado += "está formada sólo por mayúsculas";
        }
        else if(cadena == cadena.toLowerCase()){
            resultado += "está formada sólo por minúsculas";
        }
        else{
            resultado += "está formada por mayúsculas y minúsculas";
        }
        
        return resultado;
    }
    
    alert(info("OVNI = OBJETO VOLADOR NO IDENTIFICADO"));
    alert(info("En un lugar de la mancha..."));

}

function infocuarentaitres () {
var meses=["enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//se muestra el nombre de cada mes.

alert(meses[0]);
alert(meses[1]);
alert(meses[2]);
alert(meses[3]);
alert(meses[4]);
alert(meses[5]);
alert(meses[6]);
alert(meses[7]);
alert(meses[8]);
alert(meses[9]);
alert(meses[10]);
alert(meses[11]);



}

function infocuarentaicuatro () {
var valores = [true,5,false,"Hola","Adios",2];
    
    
    //ELEMENTO MAYOR
    
    var resultado = valores[3].length < valores[4].length;
    alert (resultado);
    
    
    //COMBINAR VALORES!!
    
    var valor1 = valores[0];
    var valor2 = valores[2];
    
    var resultado = valor1 || valor2;
    alert (resultado);
    
    resultado = valor1 && valor2;
    alert (resultado); 
    
    
    //OPERADORES MATEMATICOS
    
    var num1 = valores[1];
    var num2 = valores[5];
    
    var suma = num1 + num2;
    alert (suma);
    
    var resta = num1 - num2;
    alert (resta);
    
    var multip = num1 * num2;
    alert (multip);
    
    var div = num1 / num2;
    alert (div);
    
    var modulo = num1 % num2;
    alert (modulo);
}

function infocuarentaicinco () {
var numero = prompt("Introduce un número entero");

var resultado = parImpar(numero);
alert("El número "+numero+" es "+resultado);

function parImpar(numero) {
   if(numero % 2 == 0) {
   return "par";
 }
 else {
   return "impar";
 }
}
}
