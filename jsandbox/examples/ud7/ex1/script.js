$( "#pulsa" ).click(function () {
	$(() => {
		$.ajax({
			url: 'examples/ud7/ex1/ex/doc.html',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el div html con el contenido del archivo doc.html.
				$("#html").text(respuesta);
			}
		});
	});
});