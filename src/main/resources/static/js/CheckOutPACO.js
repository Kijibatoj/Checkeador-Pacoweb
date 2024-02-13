// token = resultSet[i].botToken;
// id_Chat = resultSet[i].botIDchat;
function scanner() {

	$("#idenScanner").focus();
	Swal.fire({
		icon: 'warning',
		title: 'Advertencia..',
		text: 'No se detecto un scanner, ingrese el numero manualmente.',
		footer: '<a>Check out </a>'
	})

}
$(document).ready(function () {
	$("#idenScanner").keydown(function (event) {

		if ((event.keyCode == 13)) {

			var nfacCheck = $("#idenScanner").val();
			var userCheck = $("#nfaccli").val();

			if (nfacCheck != "") {


				$.ajax({
					type: 'POST',
					url: '/api/ajaxrest/verificarFactCheckOut/nfacCheck=' + nfacCheck + '&userCheck=' + userCheck + ' ',
					dataType: 'json',
					contentType: 'application/json',
					success: function (resultSet) {
						var nfacturas = "";
						var co_vens = "";
						var fechas = "";
						var horas = "";
						var informacions = "";
						var infocob = "";
						var infocantidads = "";
						var infoarts = "";
						var ayoObser = "";
						var PesoTotal = "";
						var token = "";
						var id_Chat = "";
						var fec_emis = "";
						var fecha_Act = new Date();
						var fecha_Mes = fecha_Act.toLocaleString('default', {month: 'long'});
						var fecha_Dia = fecha_Act.getDate();
						var fecha_Ayo = fecha_Act.getFullYear();


						var FechaEmitida = "";

						if(fecha_Mes== 'enero'){
							fecha_Mes= "01";
						}
						if(fecha_Mes == 'febrero'){
							fecha_Mes = "02";
						}
						if(fecha_Mes == 'marzo'){
							fecha_Mes = "03";
						}
						if(fecha_Mes == 'abril'){
							fecha_Mes = "04";
						}
						if(fecha_Mes == 'mayo'){
							fecha_Mes = "05";
						}
						if(fecha_Mes == 'junio'){
							fecha_Mes= "06";
						}
						if(fecha_Mes == 'julio'){
							fecha_Mes = "07";
						}
						if(fecha_Mes == 'agosto'){
							fecha_Mes = "08";
						}
						if(fecha_Mes == 'septiembre'){
							fecha_Mes = "09";
						}
						if(fecha_Mes == 'octubre'){
							fecha_oct = "10";
						}
						if(fecha_Mes == 'noviembre'){
							fecha_Mes = "11";
						}
						if(fecha_Mes == 'diciembre'){
							fecha_Mes= "12";
						}
						var fechaComparativa = fecha_Ayo + '-' + fecha_Mes + '-' + fecha_Dia;
						
						
						for (var i = 0; i < resultSet.length; i++) {

							nfacturas = resultSet[i].nfactura;
							co_vens = resultSet[i].co_ven;
							fechas = resultSet[i].fecha;
							horas = resultSet[i].hora;
							informacions = resultSet[i].informacion;
							infocob = resultSet[i].infocobro;
							infocantidads = resultSet[i].infocantidad;
							infoarts = resultSet[i].infoart;
							caja = resultSet[i].caja;
							cantidadTem = resultSet[i].cantidadTem;
							peso = resultSet[i].peso;
							montousd = resultSet[i].montousd;
							montobs = resultSet[i].montobs;
							cedula = resultSet[i].cedula;
							nombrecli = resultSet[i].nombrecli;
							checkoutfech = resultSet[i].checkoutfech;
							fec_emis = resultSet[i].fec_emis;
							PesoTotal = resultSet[i].artXpeso;
							token = resultSet[i].botToken;
							id_Chat = resultSet[i].botIDchat;
							TotalDelpeso = parseInt(peso) + parseInt(PesoTotal);
							var MontoBSDeci = montobs;
							//usar tofixed
							var MontoBSfinal = parseFloat(MontoBSDeci);
							var VariableSin = cantidadTem;
	
							var SinEntero = parseInt(VariableSin, 10)
							const Botvari = {
								numefac: nfacturas,
								co_vens: co_vens,
								fechas: fechas,
								horas: horas,
								informacions: informacions,
								infocob: infocob,
								infoart: infoarts,
								caja: caja,
								cantidadItem: SinEntero,
								peso: Number(TotalDelpeso).toFixed(2),
								montousd: Number(montousd).toFixed(2),
								montobs: Number(MontoBSfinal).toFixed(2),
								cedula: cedula,
								fechaEmision:fec_emis.substring(0,10),
								ArticuloXpeso: TotalDelpeso,
								nombreCliente: nombrecli, 
								tokenW: token,
								chatAi: id_Chat

							}
							

							if (informacions == "DUPLIC") {
								var ayoObser = infoarts;

								var AyoOB = ayoObser.substring(0, 4);
	
								var mesObser = infoarts;
	
								var mesOB = mesObser.substring(5, 7);
	
								var diaObser = infoarts;
	
								var diaOB = diaObser.substring(8, 10);
	
								var veriF = AyoOB + mesOB + diaOB;
	
								//incidencia calcular
								var ayoIN = checkoutfech;
	
								var ayoINC = ayoIN.substring(0, 4);
	
								var mesIN = checkoutfech;
	
								var mesINC = mesIN.substring(5, 7);
	
								var diaIN = checkoutfech;
	
								var diaINC = diaIN.substring(8, 10);
	
								var Inci = ayoINC + mesINC + diaINC;
	
								var DiaObservado = Inci - veriF;
	
	
								//Horas A la que fue observada.
								var HoraOb = infoarts;
	
								var HoraOBS = HoraOb.substring(11, 13);
	
								var MinutosOb = infoarts;
	
								var Minutosob = MinutosOb.substring(14, 16);
	
								var SegundOb = infoarts;
	
								var SegundoINC = SegundOb.substring(17, 19);
	
								//Hora Incidencia.
	
								var HoraIN = checkoutfech;
	
								var HoraINC = HoraIN.substring(11, 13);
	
								var MinutosOb = checkoutfech;
	
								var MinutosOBS = MinutosOb.substring(14, 16);
	
								var SegundOb = checkoutfech;
	
								var SegundoOBS = SegundOb.substring(17, 19);
	
								var HoraPasas = HoraINC - HoraOBS;
								var MinutoPasas = MinutosOBS - Minutosob;
								var SegundosPasas = SegundoINC - SegundoOBS;
								var alas = HoraPasas + ":" + MinutoPasas + ":" + SegundosPasas;
	
								var VariableSin = cantidadTem;
	
								var SinEntero = parseInt(VariableSin, 10)
	
								var MontoBSDeci = montobs;
								//usar tofixed
								var MontoBSfinal = parseFloat(MontoBSDeci);
								
	
								const Botvari = {
									numefac: nfacturas,
									co_vens: co_vens,
									fechas: fechas,
									horas: horas,
									informacions: informacions,
									infocob: infocob,
									infocantidads: infocantidads,
									infoart: infoarts,
									caja: caja,
									cantidadItem: SinEntero,
									peso: Number(peso).toFixed(2),
									montousd: Number(montousd).toFixed(2),
									montobs: Number(MontoBSfinal).toFixed(2),
									cedula: cedula,
									nombreCliente: nombrecli,
									checkoutfech: checkoutfech,
									fechaEmision: fec_emis,
									DiaObservado: DiaObservado,
									HoraObservao: alas,
									ArticuloXpeso: TotalDelpeso,
									tokenW: token,
									chatAi: id_Chat
	
								}

	
								Swal.fire({

									icon: 'error',
									title: 'DUPLICADA... N°' + infocob + ' CREADA : ' + infocantidads,
									html:
										'<strong style="color:rgb(150,50,50);text-aling:left;">► FECHA : ' + fechas + ' ' + horas + '</strong>' +
										'</br><strong style="color:rgb(150,50,50);text-aling:left;">► CREADA : ' + infocantidads + '</strong>' +
										'</br><strong style="color:rgb(150,50,50);text-aling:left;">► VERIFICADA : ' + infoarts + '</strong>' +
										'</br><strong >*NO SALIR*</strong>',
									footer: '<strong>VERIFICADA POR : ' + co_vens + ' </strong>',
									timer: 7000,
									timerProgressBar: true
								})
								var sound = new Audio("js/infrac.mp3");
								sound.play();
								$("#co_key").val("");

								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();


								EnviarNoti(Botvari);

								return false;
							}
							//aqui
							var FechaEmitida = fec_emis;
							var FechaEmitidaFinal= FechaEmitida.substring(0,10);
							if (informacions == "VERIFIC" && FechaEmitidaFinal == fechaComparativa) {
								Number(infocantidads).toFixed(2);
								Swal.fire({
									icon: 'success',
									title: 'TOTAL: ' + montobs + ' BS / ' + ' N° !TEM : ' + infocob + '  / ' + ' PESO ALL : ' + infoarts + ' KG',
									text: 'Factura Procesada! N° : ' + nfacturas + ' : ' + co_vens
										+ ' ' + fechas + ' ' + horas,
									footer: '<a >Check out </a>',
									timer: 7000,
									timerProgressBar: true
								})
								var sound = new Audio("js/sounds.wav");
								sound.play();
								$("#co_key").val("");

								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();
								return false;
								
							
						}


						if (informacions == "VERIFIC" && FechaEmitidaFinal != fechaComparativa) {
								Number(infocantidads).toFixed(2);
								Swal.fire({
									icon: 'success',
									title: 'TOTAL: ' + infocantidads + ' BS / ' + ' N° !TEM : ' + infocob + '  / ' + ' PESO ALL : ' + infoarts + ' KG',
									text: 'Factura Procesada! N° : ' + nfacturas + ' : ' + co_vens
										+ ' ' + fechas + ' ' + horas,
									footer: '<a >Check out </a>',
									timer: 7000,
									timerProgressBar: true
								})
								var sound = new Audio("js/sounds.wav");
								sound.play();
								$("#co_key").val("");

								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();
								FacRetraso(Botvari);
								return false;
						}
							if (informacions == "0") {
								Swal.fire({
									icon: 'warning',
									title: 'Advertencia..',
									text: 'Factura incorrecta!',
									footer: '<a>Check out </a>'
								})
								$("#co_key").val("");
								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();
								return false;

							}

						}
						document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
							e.preventDefault(e);
						})
						document.querySelector("button[name=closeKey]").click();
						return false;
					}
				})

				$("#idenScanner").val("");
			}
		}
	});


	$("#btnloginuser").click(function () {
		var passuser = $("#desc").val();


		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/verificUserCheckpassword/passUser=' + passuser + ' ',
			dataType: 'json',
			contentType: 'application/json',
			success: function (infouser) {
				var co_cobs = "";
				var co_name = "";
				for (var i = 0; i < infouser.length; i++) {

					co_cobs = infouser[i].co_cob;

					if (co_cobs != 0) {
						$("#nfaccli").val(co_cobs);

						document.getElementById('bgventana').style.visibility = ('hidden');

						let scanner = new Instascan.Scanner({
							video: document.getElementById("preview"), mirror: false
						});
						scanner.addListener("scan", function (content) {


							$('#co_key').val(content);
							$(".site-backdrop").html(content);
							$('#InputAccesskey').val(content);




							if ($('#co_key').val() != "") {


								document.querySelector("button[name=btnaccess]").addEventListener("13", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=btnaccess]").click();



							}

							document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
								e.preventDefault(e);
							})
							document.querySelector("button[name=closeKey]").click();


						});
						Instascan.Camera.getCameras().then(function (cameras) {
							if (cameras.length > 0) {
								scanner.start(cameras[1]);
							}
							else if (camaras.length > 1) {
								scanner.start(cameras[1]);
							}
							else if (camaras.length > 2) {
								scanner.start(cameras[2]);
							}
							else if (camaras.length > 3) {
								scanner.start(cameras[3]);
							}
							else if (camaras.length > 4) {
								scanner.start(cameras[4]);
							}
						}).catch(function (e) {
							console.error(e);
							scanner();
						});



					}
					if (co_cobs == 0) {
						$("#desc").val("");
						alert("ERROR");
						document.getElementById('bgventana').style.visibility = ('visible');

					}


				}
			}
		})
		$("#idenScanner").focus();
	});

	$("#closeuserchec").click(function () {

		document.getElementById('bgventana').style.visibility = ('visible');
		$("#nfaccli").val("0");
		$("#desc").val("");

		document.querySelector('button[name=closeseci]').addEventListener('13', function (e) {
			e.preventDefault(e);
		})
		document.querySelector('button[name=closeseci]').click();


	})

	$("#btnaccess").click(function () {
		var nfacCheck = $("#co_key").val();
		var userCheck = $("#nfaccli").val();

		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/verificarFactCheckOut/nfacCheck=' + nfacCheck + '&userCheck=' + userCheck + ' ',
			dataType: 'json',
			contentType: 'application/json',
			success: function (resultSet) {
				var nfacturas = "";
				var co_vens = "";
				var fechas = "";
				var horas = "";
				var informacions = "";
				var infocob = "";
				var infocantidads = "";
				var infoarts = "";
				var PesoTotal = "";
				var token = "";
				var id_Chat = "";
				var fecha_Act = new Date();
				var fecha_Mes = fecha_Act.toLocaleString('default', {month: 'long'});
				var fecha_Dia = fecha_Act.getDate();
				var fecha_Ayo = fecha_Act.getFullYear();


				var FechaEmitida = "";

				if(fecha_Mes== 'enero'){
					fecha_Mes= "01";
				}
				if(fecha_Mes == 'febrero'){
					fecha_Mes = "02";
				}
				if(fecha_Mes == 'marzo'){
					fecha_Mes = "03";
				}
				if(fecha_Mes == 'abril'){
					fecha_Mes = "04";
				}
				if(fecha_Mes == 'mayo'){
					fecha_Mes = "05";
				}
				if(fecha_Mes == 'junio'){
					fecha_Mes= "06";
				}
				if(fecha_Mes == 'julio'){
					fecha_Mes = "07";
				}
				if(fecha_Mes == 'agosto'){
					fecha_Mes = "08";
				}
				if(fecha_Mes == 'septiembre'){
					fecha_Mes = "09";
				}
				if(fecha_Mes == 'octubre'){
					fecha_oct = "10";
				}
				if(fecha_Mes == 'noviembre'){
					fecha_Mes = "11";
				}
				if(fecha_Mes == 'diciembre'){
					fecha_Mes= "12";
				}
				var fechaComparativa = fecha_Ayo + '-' + fecha_Mes + '-' + fecha_Dia;

				for (var i = 0; i < resultSet.length; i++) {

					nfacturas = resultSet[i].nfactura;
					co_vens = resultSet[i].co_ven;
					fechas = resultSet[i].fecha;
					horas = resultSet[i].hora;
					informacions = resultSet[i].informacion;
					infocob = resultSet[i].infocobro;
					infocantidads = resultSet[i].infocantidad;
					infoarts = resultSet[i].infoart;
					caja = resultSet[i].caja;
					cantidadTem = resultSet[i].cantidadTem;
					peso = resultSet[i].peso;
					montousd = resultSet[i].montousd;
					montobs = resultSet[i].montobs;
					cedula = resultSet[i].cedula;
					nombrecli = resultSet[i].nombrecli;
					checkoutfech = resultSet[i].checkoutfech;
					fec_emis = resultSet[i].fec_emis;
					PesoTotal = resultSet[i].artXpeso;
					token = resultSet[i].botToken;
					id_Chat = resultSet[i].botIDchat;
					TotalDelpeso = parseInt(peso) + parseInt(PesoTotal);
					var MontoBSDeci = montobs;
					//usar tofixed
					var MontoBSfinal = parseFloat(MontoBSDeci);
					var VariableSin = cantidadTem;

					var SinEntero = parseInt(VariableSin, 10)
					const Botvari = {
						numefac: nfacturas,
						co_vens: co_vens,
						fechas: fechas,
						horas: horas,
						informacions: informacions,
						infocob: infocob,
						infoart: infoarts,
						caja: caja,
						cantidadItem: SinEntero,
						peso: Number(TotalDelpeso).toFixed(2),
						montousd: Number(montousd).toFixed(2),
						montobs: Number(MontoBSfinal).toFixed(2),
						cedula: cedula,
						fechaEmision:fec_emis.substring(0,10),
						ArticuloXpeso: TotalDelpeso,
						nombreCliente: nombrecli, 
						tokenW: token,
						chatAi: id_Chat

					}



					

					if (informacions == "DUPLIC") {
						//VARIABLES PARA EL BOT	
					var ayoObser = infoarts;

					var AyoOB = ayoObser.substring(0, 4);

					var mesObser = infoarts;

					var mesOB = mesObser.substring(5, 7);

					var diaObser = infoarts;

					var diaOB = diaObser.substring(8, 10);

					var veriF = AyoOB + mesOB + diaOB;

					//incidencia calcular
					var ayoIN = checkoutfech;

					var ayoINC = ayoIN.substring(0, 4);

					var mesIN = checkoutfech;

					var mesINC = mesIN.substring(5, 7);

					var diaIN = checkoutfech;

					var diaINC = diaIN.substring(8, 10);

					var Inci = ayoINC + mesINC + diaINC;

					var DiaObservado = Inci - veriF;


					//Horas A la que fue observada.
					var HoraOb = infoarts;

					var HoraOBS = HoraOb.substring(11, 13);

					var MinutosOb = infoarts;

					var Minutosob = MinutosOb.substring(14, 16);

					var SegundOb = infoarts;

					var SegundoINC = SegundOb.substring(17, 19);

					//Hora Incidencia.

					var HoraIN = checkoutfech;

					var HoraINC = HoraIN.substring(11, 13);

					var MinutosOb = checkoutfech;

					var MinutosOBS = MinutosOb.substring(14, 16);

					var SegundOb = checkoutfech;

					var SegundoOBS = SegundOb.substring(17, 19);

					var HoraPasas = HoraINC - HoraOBS;
					var MinutoPasas = MinutosOBS - Minutosob;
					var SegundosPasas = SegundoINC - SegundoOBS;
					var alas = HoraPasas + ":" + MinutoPasas + ":" + SegundosPasas;

					var VariableSin = cantidadTem;

					var SinEntero = parseInt(VariableSin, 10)

					var MontoBSDeci = montobs;
					//usar tofixed
					var MontoBSfinal = parseFloat(MontoBSDeci)
					const Botvari = {
						numefac: nfacturas,
						co_vens: co_vens,
						fechas: fechas,
						horas: horas,
						informacions: informacions,
						infocob: infocob,
						infocantidads: infocantidads,
						infoart: infoarts,
						caja: caja,
						cantidadItem: SinEntero,
						peso: Number(peso).toFixed(2),
						montousd: Number(montousd).toFixed(2),
						montobs: Number(MontoBSfinal).toFixed(2),
						cedula: cedula,
						nombreCliente: nombrecli,
						checkoutfech: checkoutfech,
						fechaEmision: fec_emis,
						DiaObservado: DiaObservado,
						HoraObservao: alas,
						tokenW: token,
						chatAi: id_Chat

					}
						Swal.fire({

							icon: 'error',
							title: 'DUPLICADA... N°' + infocob + ' CREADA : ' + infocantidads,
							html:
								'<strong style="color:rgb(150,50,50);text-aling:left;">► FECHA : ' + fechas + ' ' + horas + '</strong>' +
								'</br><strong style="color:rgb(150,50,50);text-aling:left;">► CREADA : ' + infocantidads + '</strong>' +
								'</br><strong style="color:rgb(150,50,50);text-aling:left;">► VERIFICADA : ' + infoarts + '</strong>' +
								'</br><strong >*NO SALIR*</strong>',
							footer: '<strong>VERIFICADA POR : ' + co_vens + ' </strong>',
							timer: 7000,
							timerProgressBar: true
						})

						var sound = new Audio("js/infrac.mp3");
						sound.play();
						$("#co_key").val("");

						document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
							e.preventDefault(e);
						})
						document.querySelector("button[name=closeKey]").click();
						EnviarNoti(Botvari);
						return false;
					}

					var FechaEmitida = fec_emis;
							var FechaEmitidaFinal= FechaEmitida.substring(0,10);
							if (informacions == "VERIFIC" && FechaEmitidaFinal == fechaComparativa) {
								Number(infocantidads).toFixed(2);
								Swal.fire({
									icon: 'success',
									title: 'TOTAL: ' + montobs + ' BS / ' + ' N° !TEM : ' + infocob + '  / ' + ' PESO ALL : ' + infoarts + ' KG',
									text: 'Factura Procesada! N° : ' + nfacturas + ' : ' + co_vens
										+ ' ' + fechas + ' ' + horas,
									footer: '<a >Check out </a>',
									timer: 7000,
									timerProgressBar: true
								})
								var sound = new Audio("js/sounds.wav");
								sound.play();
								$("#co_key").val("");

								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();
								return false;
								
							
						}


						if (informacions == "VERIFIC" && FechaEmitidaFinal != fechaComparativa) {
								Number(infocantidads).toFixed(2);
								Swal.fire({
									icon: 'success',
									title: 'TOTAL: ' + infocantidads + ' BS / ' + ' N° !TEM : ' + infocob + '  / ' + ' PESO ALL : ' + infoarts + ' KG',
									text: 'Factura Procesada! N° : ' + nfacturas + ' : ' + co_vens
										+ ' ' + fechas + ' ' + horas,
									footer: '<a >Check out </a>',
									timer: 7000,
									timerProgressBar: true
								})
								var sound = new Audio("js/sounds.wav");
								sound.play();
								$("#co_key").val("");

								document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
									e.preventDefault(e);
								})
								document.querySelector("button[name=closeKey]").click();
								FacRetraso(Botvari);
								return false;
						}

					if (informacions == "0") {
						Swal.fire({
							icon: 'warning',
							title: 'Advertencia..',
							text: 'Factura incorrecta!',
							footer: '<a>Check out </a>'
						})
						$("#co_key").val("");
						document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
							e.preventDefault(e);
						})
						document.querySelector("button[name=closeKey]").click();
						return false;

					}

				}
				document.querySelector("button[name=closeKey]").addEventListener("click", function (e) {
					e.preventDefault(e);
				})
				document.querySelector("button[name=closeKey]").click();
				return false;
			}
		})



	});

	$(document).click(function () {

		if ($('#nfaccli').val() == 0) {

			document.getElementById('bgventana').style.visibility = ('visible');


		}
	})

});


function SetFullScreen(elto) {

	//Si no se soporta la API, ya ni lo intentamos

	if (!FullScreenSupportEnabled()) return;

	//Se prueba la variante apropiada según el navegador

	try {

		if (elto.requestFullscreen) {    //Empezando por la estándar

			elto.requestFullscreen();

		} else if (elto.webkitRequestFullscreen) {    //Webkit (Safari, Chrome y Opera 15+)

			elto.webkitRequestFullscreen();

		} else if (elto.mozRequestFullScreen) {    //Firefox

			elto.mozRequestFullScreen();

		} else if (elto.msRequestFullscreen) {    //Internet Explorer 11+

			elto.msRequestFullscreen();

		}

	}

	catch (ex) {

		return false;

	}

	return true;

}



