
$(document).ready(function() {


	
	$("#buttonreport").click(function() {
		
		var hoy = new Date();

		var Fecha = hoy.toDateString();
		var userCheck = $("#Numero_Factura").val();
		var nfacCheck = "0";
		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/verificarFactCheckOutPruebajava/nfacCheck=' + nfacCheck + '&userCheck=' + userCheck + '  ',
			dataType: 'json',
			contentType: 'application/json',
			success: function(resultSet) {
				var nfacturas = "";
				var co_vens = "";
				var informacions = "";
				var chekeador = "";
				var fech_reg = "";
				const datos = [
					['NUM Fact', 'Caja', 'Chequeador', 'Co_User', 'Fecha Registro'],
				];
					const opcionesTabla = {
					startY: 50,
					margin: { top: 20 },
					styles: { fillColor: [247, 247, 247], textColor: [0, 0, 0] },
					theme: 'striped'
				};
				const pdf = new jsPDF();
				const encabezado = {
					Titulo: 'Facturas Verificadas.',
					Programa: 'PACOWeb',
					Fecha: Fecha
				}
				const tableData = [];
				pdf.text(`${encabezado.Titulo}`, 105, 30, null, null, "center");
				pdf.text(`${encabezado.Programa}`, 5, 15);
				pdf.text(`Fecha:${encabezado.Fecha}`, 200, 15, null, null, "right");

				for (var i = 0; i < resultSet.length; i++) {

					nfacturas = resultSet[i].nfactura2;
					co_vens = resultSet[i].caja2;
					informacions = resultSet[i].co_ven2;
					chekeador = resultSet[i].fec_emis2;
					fech_reg = resultSet[i].checkoutfech2;

					const datosBas = [
					 [`${nfacturas}`], //NUMERO FACTURA
					 [` ${co_vens}`], //NUMERO DE CAJA
					 [`${chekeador}`],// CHEQUEADOR
					 [` ${informacions}`], //001
					  [ `${fech_reg}`],// FECHA
						
					];
					tableData.push(datosBas);
				}
				 pdf.autoTable({ head: datos, body: tableData, ...opcionesTabla });
				pdf.save(rutaArchivo + nombreArchivo);
			}
			
		});
	});
});

