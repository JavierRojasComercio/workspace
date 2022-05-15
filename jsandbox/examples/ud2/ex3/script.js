 function mostrarTipos(){
      let nombre = "Sergio";
      let tipo1 = typeof nombre;
    
      let paquetes = 3;
      let tipo2 = typeof paquetes; 
    
      let enviado = false;
      let tipo3 = typeof enviado;
  
      alert(tipo1 + ";\n"+
      tipo2 + ";\n"+
      tipo3 + ";");
    };


    function pasarAEnteros(){
        let pasar1 = parseInt("1Sergio");

        let pasar2 = parseInt("Ser1gio1");

        let pasar3 = parseInt("Sergio1");

        let pasar4 = parseInt("Sergio");

        alert(pasar1 + ";\n"+
        pasar2 + ";\n"+
        pasar3 + ";\n"+
        pasar4 + ";");
    };

    function tiposDinamicos(){
        let variableMareada = "Sergio";
        let tipo1 = typeof variableMareada;
    
        variableMareada = 3;
        let tipo2 = typeof variableMareada; 
    
        variableMareada = false;
        let tipo3 = typeof variableMareada;
  
        alert(tipo1 + ";\n"+
        tipo2 + ";\n"+
        tipo3 + ";");
    };

    function errorSobredeficion(){
        alert("Aunque puedes sobreescribir una variable las veces que quieras, solo la puedes declarar unaa vez");
    };

    function usoComillas(){
        let comillas1 = "\"He is called 'Johnny\"";
        let comillas2 = "'He is called 'Johnny'";
        alert(comillas1 + ";\n" + comillas2 + ";");
    };

    function usoDelMas(){
        let sumaa = 3 + 2;
        let sumab = 3 + "2";
        let sumac = 5 + 2 + "Sergio";
        let sumad = 5 + "Sergio" + 2;
        let sumae = 5 + 2 + "Sergio" + 2 + 4;
        let sumaf = 5 + 2 + "Sergio" + (2 + 4);

        alert("sumaa => " + sumaa + ";\n"
        + "sumab => " + sumab + ";\n" 
        + "sumac => " + sumac + ";\n" 
        + "sumad => " + sumad + ";\n" 
        + "sumae => " + sumae + ";\n"
        + "sumaf => " + sumaf + ";");
    };

    function forzarConcatenacion(){
        let conc1 = '19' + '67';
        let conc2 = 19 + '67';
        let conc3 = '19' + 67;
        let conc4 = 19 + 67;
        alert("conc1 => " + (typeof conc1) + ";\n" 
        + "conc2 => " + (typeof conc2) + ";\n" 
        + "conc3 => " + (typeof conc3) +  ";\n" 
        + "conc4 => " + (typeof conc4) + ";");
    };

    function posicionArray(){
        let colores = ["rojo", "azul ", " verde "] ; 
        alert(colores[1]);
    }

    function arrayCadena(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        let nombresC1 = nombres.toString();
        let nombresC2 = nombres.join(";");

        alert("nombresC1 => " + nombresC1 + ";\n"
        + "nombresC2 => " + nombresC2 + ";");
    }

    function nElementsArray(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        alert(nombres.length);
    }

    function agregarElemtArray1(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        alert("Ahora el tamaÃ±o de 'nombres[]' es de " + nombres.push("Juan"));
    }

    function agregarElemtArray2(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        alert("Ahora el tamaÃ±o de 'nombres[]' es de " + nombres.unshift("Juan") + 
        " y su primer elemento es " + nombres[0]);
    }

    function eliminarElemtArray1(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        nombres.pop();
        alert("Ahora el tamaÃ±o de 'nombres[]' es de " + nombres.length
        + " y su Ãºltimo elemento es " + nombres[nombres.length-1]);
    }

    function eliminarElemtArray2(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        nombres.shift();
        alert("Ahora el tamaÃ±o de 'nombres[]' es de " + nombres.length
        + " y su primer elemento es " + nombres[0]);
    }

    function eliminarElemtArray3(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        delete nombres[0];
        alert("Ahora el tamaÃ±o de 'nombres[]' es de " + nombres.length
        + " y su posiciÃ³n cero es " + nombres[0]);
    }

    function unionArrays(){
        let chicas = ["Ana", "Bea"];
        let chicos = ["Pedro", "Luis"];
        let todos = chicas.concat(chicos); 
        let ctodos = "";
        for (let index = 0; index < todos.length; index++) {
            ctodos += todos[index] + ", "; 
        }
        alert("Miembros de todos: " + ctodos.substring(0, (ctodos.length-2)));
    }
  
    function ordenarArray(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        nombresAux = nombres.sort();
        let ctodos = "";
        for (let index = 0; index < nombresAux.length; index++) {
            ctodos += nombresAux[index] + ", "; 
        }
        alert("Miembros de nombres ordenados: " + ctodos.substring(0, (ctodos.length-2)));
    }

    function invertirArray(){
        let nombres = ["Pedro", "Pablo", "Luis", "Sergio"];
        let nombresAux = nombres.reverse();
        let ctodos = nombresAux.join(", ");;
        alert("Miembros de nombres con array invertido: " + ctodos);
    }
    
    function mayorMenor(){
        let numeros = [2,3,8,5,1];
        let mayor = Math.max.apply(null,numeros);
        let menor = Math.min.apply(null,numeros);
        alert(""
        + "El nÃºmeor mayor es => " + mayor + ";\n" 
        + "El nÃºmero menor es => " + menor
        + "");
    }

    function  funcionDoble(n){       
        let numero = 5;
        funcionDobleI(numero);
        function  funcionDobleI(n){       
          alert (2 * n);
        } 
    } 

    function porReferencia(){
        let a = 'hola';
        let b = a; // asignamos valor de `a` a `b`.
        a += '!'; // cambiamos valor de `a` aÃ±adiendo ! al final
        alert(""
            + "Valor de a => " + a + ";\n" 
            + "Valor de b => " + b
            + "");
    }

    function porReferenciaF(){
        function cfoo(str){
            str = 'otra cosa';
        };
          
          let l = 1;
          cfoo(l);
          alert(l);
          // Â¿CuÃ¡nto valdrÃ¡ l?
    }
   