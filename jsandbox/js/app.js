/*!
* jsandbox v0.0.1
* Autor: Javier Rojas
* Copyright: copia, estudia, evoluciona este código lo que quieras. 
* Lo he desarrollado como refuerzo para que compruebes de manera rápida los ejemplos de clase pero puedes usarlo como quieras.
* Si consigues crear algo digno de mención a partir de este código no ovides enviarme una copia.
* 
*
* Date: 2022-04-29
*/

// Antes que nada recogemos los parámetros GET y comprobamos que están enviados, si no, mostramos el tutorial.
// También estaría bien comrpobar que no se introduce un número de unidad o ejemplo inexistente o que el modo 
// es css o js, pero esto solo producirá errores 404 al no poder acceder al recurso, por lo que son asumibles.

// ¿Qué parámetros GET debemos recibir siempre?
//  QueryString.mode	mode determina qué paneles se muestran al cargar. Sus valores pueden ser "js" o "css".
// 						 	QueryString.modee = "js"; Muestra los paneles html y js.
//  						QueryString.mode = "css"; Muestra los paneles html y css.
//  QueryString.ud		ud almacena el número de la unidad.
//  QueryString.ex		ex almacena el número del ejemplo.

var mode;
var ud;
var ex;

if (QueryString.mode === undefined || QueryString.ud === undefined || QueryString.ex === undefined ||
	QueryString.mode == "" || QueryString.ud == "" || QueryString.ex == "") {
	mode = "css";
	ud = "0";
	ex = "1";
} else {
	mode = QueryString.mode;
	ud = QueryString.ud;
	ex = QueryString.ex;
}

// num_panels almacenana los paneles que se están mostrando en cada momento. Se usa para determinar el alto de todos ellos.
var num_panels = 0;

// Estas variables almacenan en todo momento lo que se ha escrito en cada panel.
// Al cargar la página se rellenan a partir de archivos de la ruta "examples/ud-/ex-", donde - es el número de ud y de ex, que se reciben como parámetos GET
//  editorHTML se rellena con "doc.html"
//  editorCSS se rellena con "style.css"
//  editorJS se rellena con "script.js"
//  editorDEV se rellena a partir de las salidas de consola capturadas por "js/tools/console.js"
var editorHTML;
var editorCSS;
var editorJS;
var editorDEV;
var textoConsola = "Mensajes de CONSOLA:\n>\n";

$(document).ready(function () {

	// Ocultamos el panel JS o CSS en función del valor de la variable mode (puede ser css o js)
	// La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.
	if (mode == 'css') {
		$("#switch-js").prop("checked", false);
		$(".title-js").removeClass("title-enable");
		$(".title-js").addClass("title-disable");
		$("#jsPanel").toggle();
	}

	if (mode == 'js') {
		$("#switch-css").prop("checked", false);
		$(".title-css").removeClass("title-enable");
		$(".title-css").addClass("title-disable");
		$("#cssPanel").toggle();
	}

	// El panel dev (Consola) siempre estará oculto por defecto.
	$("#devPanel").toggle();



	// Contamos cuantos paneles hay activos al cargar el documento.
	// num_panels almacena el número de paneles. Se usa para determinar el alto en función de si son uno dos, tres o cuatro
	//  -Si hay un panel activo, se le da la clase panelL y se ocultan dos otros tres.
	//  -Si hay dos paneles activos, se les da la clase panelM y se ocultan los otros dos.
	//  -Si hay tres paneles están activos, se les da la clase panelS  y se oculta el otro. 
	//  -Si los cuatro paneles están activos, se les da la clase panelXS para que quepan todos.
	if ($('#switch-html').is(':checked')) num_panels++;
	if ($('#switch-css').is(':checked')) num_panels++;
	if ($('#switch-js').is(':checked')) num_panels++;
	if ($('#switch-dev').is(':checked')) num_panels++;


	// Inicializamos las variables globales del iframe con el resultado el código.
	$('.grid').height($(window).height());
	const contents = $('iframe').contents();
	const body = contents.find('body');
	const styleTag = $('<style></style>').appendTo(contents.find('head'));

	// Cargamos los archivos desde la ruta indicada por los parámetros GET.
	// La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.

	// Pedimos el archivo 'examples/menu.json' que almacena el número y la descripción de cada ejemplo.
	$(() => {
		$.ajax({
			url: 'examples/menu.json',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el menú 
				respuesta['menu'].ud.forEach(unidad => {
					let unidadTxt = "UD " + unidad.numero + ". " + unidad.titulo;
					$("#menu").append("<li><h4>" + unidadTxt + "</h4></li>");

					unidad.ejemplos.ej.forEach(ejemplo => {
						let enlaceEjemplo = "<li><a href='index.html?mode=" + mode
							+ "&ud=" + unidad.numero
							+ "&ex=" + ejemplo.numero + "'><i class='fa fa-chevron-right' aria-hidden='true'></i>" + ejemplo.info + "</a></li>";
						$("#menu").append(enlaceEjemplo);
					});
				});
				// Rellemanos el infoPanel
				// Recogemos el info del ejemplo concreto
				let infoTxt;
				let info;
				//Si es el tutorial se muesta el título literal
				if (ud == "0") {
					info = "<p id='info'>TUTORIAL <a class='destacar' href='examples/ud0/ex1/download.zip'>\
							 (Descargar <i class='fa fa-cloud-download' aria-hidden='true'>)</i></a></p>";
					//Si es cualquier otro ejemplo se muestran sus datos obtenidos del archivo 'examples/menu.json'.
				} else {
					infoTxt = "UD" + ud + "EJ" + ex + ": ";
					infoTxt += respuesta['menu'].ud[parseInt(ud) - 1].ejemplos.ej[parseInt(ex) - 1].info;
					info =
						"<p id ='info'>" + infoTxt + "<a class = 'destacar' href='examples/ud"
						+ ud + '/ex' + ex +
						"/download.zip'> (Descargar <i class='fa fa-cloud-download' aria-hidden='true'>)</i></a></p>";
				}

				$(".infoPanel").append(info);
			}
		});
	});


	// Rellenamos los paneles a partir de archivos de la ruta "examples/ud-/ex-", donde - es el número de ud y de ex
	//
	//  editorHTML se rellena con "doc.html"
	//  editorCSS se rellena con "style.css"
	//  editorJS se rellena con "script.js"
	$(() => {
		$.ajax({
			url: 'examples/ud' + ud + '/ex' + ex + '/doc.html',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor html de ACE.
				$("#html").text(respuesta);
				// Inicializamos el editor html de ACE.
				editorHTML = ace.edit("html");
				editorHTML.setTheme("ace/theme/chaos");
				editorHTML.getSession().setMode("ace/mode/html");
				editorHTML.setShowFoldWidgets(false);
				editorHTML.container.style.height
			}
		});
	});

	$(() => {
		$.ajax({
			url: 'examples/ud' + ud + '/ex' + ex + '/style.css',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor css de ACE.
				$("#css").text(respuesta);
				// Inicializamos el editor css de ACE.
				editorCSS = ace.edit("css");
				editorCSS.setTheme("ace/theme/chaos");
				editorCSS.getSession().setMode("ace/mode/css");
				editorCSS.setShowFoldWidgets(false);
			}
		});
	});

	$(() => {
		$.ajax({
			url: 'examples/ud' + ud + '/ex' + ex + '/script.js',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor js de ACE.
				$("#js").text(respuesta);
				// Inicializamos el editor js de ACE.
				editorJS = ace.edit("js");
				editorJS.setTheme("ace/theme/chaos");
				editorJS.getSession().setMode("ace/mode/javascript");
				editorJS.setShowFoldWidgets(false);

			}
		});
	});

	// Rellemanos el editor dev de ACE. Representa la consola, no es editable ni muestra números de línea.
	//  No se inicializa cargando un archivo, como los anteriores, sino que lo hace
	//  a partir de las salidas de consola capturadas por "js/tools/console.js".
	// Inicializamos el editor js de ACE.
	editorDEV = ace.edit("dev");
	editorDEV.setTheme("ace/theme/chaos");
	editorDEV.getSession().setMode("ace/mode/text");
	editorDEV.setShowFoldWidgets(false);
	editorDEV.setReadOnly(true);
	editorDEV.renderer.setOption('showLineNumbers', false);
	editorDEV.$blockScrolling = Infinity;
	editorDEV.setValue(textoConsola);

	// Visualización dinámica de cambios. Aplicamos el HTML, el CSS cuando pulsamos una tecla en el div html y css.
	$('#html, #css, #js').keyup(function () {
		var $this = $(this);

		if ($this.attr('id') === 'html') {
			body.html(editorHTML.getValue());
			let scriptTagBody = $('<script>').appendTo(body);
			scriptTagBody.text(editorJS.getValue());
		}
		if ($this.attr('id') === 'css') {
			styleTag.text(editorCSS.getValue());
		}
		// con js no lo hacemos porque se inudaría la consola de mensajes de error con cada keyup, 
		// con js el usuario debe pulsar RUN.
	});

	// También aplicamos el HTML, el CSS y el JS al iframe cuando el usuario pulsa RUN.
	$("#run").click(function () {
		body.html(editorHTML.getValue());
		styleTag.text(editorCSS.getValue());
		// Se incluye jquery también para que funcionen los ejemplos que lo usan.
		let scriptjQueryTagBody = $('<script src="js/tools/jquery-3.6.0.min.js">').appendTo(body);
		let scriptTagBody = $('<script>').appendTo(body);
		// si hay un error lo capturamos para mostrarlo también en la consola.
		// * BUG REPORTADO: solo muestra console.log al cargar el documento. No se actualiza con RUN.
		// * No muestra los errores. Por ahora con eso es suficiente para el usuario objetivo.
		// * Si estás leyendo esto puedes empezar por intentar arreglarlo, a mi no me apetece ahora mismo. 
		scriptTagBody.text("try {\n" + editorJS.getValue() + " \n} catch(err) { \n console.error(err);\n}");
	});




	//Función que cambia el alto de los paneles en función de cuantos hay visibles.
	//-Si hay un panel activo, se le da la clase panelL y se ocultan los otros tres.
	//-Si hay dos paneles activos, se les da la clase panelM y se ocultan los otros dos.
	//-Si hay tres paneles activos, se les da la clase panelS y se oculta el otro.
	//-Si los cuatro paneles están activos, se les da la clase panelXS para que quepan todos.
	function setHeightPanels() {
		switch (num_panels) {

			case 1:
				$("#htmlPanel").removeClass("panelXS");
				$("#htmlPanel").removeClass("panelS");
				$("#htmlPanel").removeClass("panelM")
				$("#cssPanel").removeClass("panelXS");
				$("#cssPanel").removeClass("panelS");
				$("#cssPanel").removeClass("panelM");
				$("#jsPanel").removeClass("paneXS");
				$("#jsPanel").removeClass("panelS");
				$("#jsPanel").removeClass("panelM");
				$("#devPanel").removeClass("panelXS");
				$("#devPanel").removeClass("panelS");
				$("#devPanel").removeClass("panelM");
				$("#htmlPanel").addClass("panelL");
				$("#cssPanel").addClass("panelL");
				$("#jsPanel").addClass("panelL");
				$("#devPanel").addClass("panelL");
				break;

			case 2:
				$("#htmlPanel").removeClass("panelXS");
				$("#htmlPanel").removeClass("panelS");
				$("#htmlPanel").removeClass("panelL");
				$("#cssPanel").removeClass("panelXS");
				$("#cssPanel").removeClass("panelS");
				$("#cssPanel").removeClass("panelL");
				$("#jsPanel").removeClass("panelXS");
				$("#jsPanel").removeClass("panelS");
				$("#jsPanel").removeClass("panelL");
				$("#devPanel").removeClass("panelXS");
				$("#devPanel").removeClass("panelS");
				$("#devPanel").removeClass("panelL");
				$("#htmlPanel").addClass("panelM");
				$("#cssPanel").addClass("panelM");
				$("#jsPanel").addClass("panelM");
				$("#devPanel").addClass("panelM");
				break;

			case 3:
				$("#htmlPanel").removeClass("panelXS");
				$("#htmlPanel").removeClass("panelL");
				$("#htmlPanel").removeClass("panelM");
				$("#cssPanel").removeClass("panelXS");
				$("#cssPanel").removeClass("panelL");
				$("#cssPanel").removeClass("panelM");
				$("#jsPanel").removeClass("panelXS");
				$("#jsPanel").removeClass("panelL");
				$("#jsPanel").removeClass("panelM");
				$("#devPanel").removeClass("panelL");
				$("#devPanel").removeClass("panelXS");
				$("#devPanel").removeClass("panelM");
				$("#htmlPanel").addClass("panelS");
				$("#cssPanel").addClass("panelS");
				$("#jsPanel").addClass("panelS");
				$("#devPanel").addClass("panelS");
				break;

			case 4:
				$("#htmlPanel").removeClass("panelL");
				$("#htmlPanel").removeClass("panelM");
				$("#htmlPanel").removeClass("panelS");
				$("#cssPanel").removeClass("panelL");
				$("#cssPanel").removeClass("panelM");
				$("#cssPanel").removeClass("panelS");
				$("#jsPanel").removeClass("panelL");
				$("#jsPanel").removeClass("panelM");
				$("#jsPanel").removeClass("panelS");
				$("#devPanel").removeClass("panelL");
				$("#devPanel").removeClass("panelM");
				$("#devPanel").removeClass("panelS");
				$("#htmlPanel").addClass("panelXS");
				$("#cssPanel").addClass("panelXS");
				$("#jsPanel").addClass("panelXS");
				$("#devPanel").addClass("panelXS");
				break;
		}
		// En Ace Editor es nesario reescalar los editores para que se adapten al nuevo tamaño de su div.
		// Si no se hace cambia su tamaño pero no el tamaño de lo que muestra, por lo que corta líneas de código.
		editorHTML.resize();
		editorCSS.resize();
		editorJS.resize();
		editorDEV.resize();
	};

	// Mostrar y ocultar los paneles en función de los toggler.
	$("#switch-html").click(function () {
		$("#htmlPanel").toggle();
		if ($('#switch-html').is(':checked')) {
			$(".title-html").removeClass("title-disable");
			$(".title-html").addClass("title-enable");
			num_panels++;
		} else {
			$(".title-html").removeClass("title-enable");
			$(".title-html").addClass("title-disable");
			num_panels--;
		}
		setHeightPanels();
	});

	$("#switch-css").click(function () {
		$("#cssPanel").toggle();
		if ($('#switch-css').is(':checked')) {
			$(".title-css").removeClass("title-disable");
			$(".title-css").addClass("title-enable");
			num_panels++;
		} else {
			$(".title-css").removeClass("title-enable");
			$(".title-css").addClass("title-disable");
			num_panels--;
		}
		setHeightPanels();
	});

	$("#switch-js").click(function () {
		$("#jsPanel").toggle();
		if ($('#switch-js').is(':checked')) {
			$(".title-js").removeClass("title-disable");
			$(".title-js").addClass("title-enable");
			num_panels++;
		} else {
			$(".title-js").removeClass("title-enable");
			$(".title-js").addClass("title-disable");
			num_panels--;
		}
		setHeightPanels();
	});

	$("#switch-dev").click(function () {
		$("#devPanel").toggle();
		if ($('#switch-dev').is(':checked')) {
			$(".title-dev").removeClass("title-disable");
			$(".title-dev").addClass("title-enable");
			num_panels++;
		} else {
			$(".title-dev").removeClass("title-enable");
			$(".title-dev").addClass("title-disable");
			num_panels--;
		}
		setHeightPanels();
	});



});

// Si estamos algún ejemplo de tutorial (estamos en la ud == '0') ejecutamos clic en run pasdos un par de segundos.
if (ud == '0') {
	setTimeout(function () {
		$("#run").trigger("click");
		alert("¡Hola!, este es el tutorial de JSandBox.");
		alert("En este ejemplo hemos pulsado el botón RUN por tí.");
		alert("Pasa el ratón por cada uno de los vídeos para tener una explicación de lo que puedes hacer.");
	}, 1000);

}