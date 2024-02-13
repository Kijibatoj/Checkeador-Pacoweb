function vaciar_campo(input) {
	input.value = "";
}

$(document).ready(function() {



	$("#LisProduc").click(function() {
		$("#searchFilter").val("");

	})

	if ($("#Nfactura").val() > 0) {

		var nfacList = $("#Nfactura").val();
		var cedcliList = $("#cedcli").val();
		var co_venID = $("#co_venID").val();

		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/ajaxfunctionUpdateRegisDataInfocoVenHizoFact/nfacList=' + nfacList + '&cedcliList=' + cedcliList + '&co_venID=' + co_venID + '  ',
		});
	}


	ActuLoadData();

	$('#alertcheck').hide();
	history.forward();



	$('#closeSesionfact').click(function() {

		ActuLoadData();
		if ($("#saldoBS").val() == 0) {
			src = "oldfile.js?version = 0.1";
			history.forward();
			//window.location.href = '/GrebcaCCS';
		}


	})

	$('#closePrin').click(function(event) {
		ActuLoadData();
		if ($("#saldoBS").val() == 0) {
			src = "oldfile.js?version = 0.1";
			history.forward();
			return true;
		}

	})

	var cob_num = $('#idCob_numRengTip').val();
	var moneda = $('#tbMonedaid').val();
	var monedaus = $('#idMoneUSD').val();
	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/sumAllBSD/&cob_num=' + cob_num + '&moneda=' + moneda + '  ',
		dataType: 'json',
		contentType: 'application/json',
		success: function(sum) {

			for (var suBSD = 0; suBSD < sum.length; suBSD++) {

				sumBS = sum[suBSD].sumMont_docBSD;
				sumBS = sumBS.toFixed(2);
				$('#pagadoBSD').val(sumBS);
			}

		}

	});
	$("#UpdateRegistroCob").click(function() {

		ActuLoadData();

	});



	$('#printerFact').click(function() {
		
		
				
		
		console.assert("line");
		$("#printerFact").hide();

		setTimeout(function() {
			$("#printerFact").show();
		}, 5000)


		if ($("#saldoBS").val() < -0.01) {

			var sound = new Audio("js/infrac.mp3");
			sound.play();

			alert("!SALDO NEGATIVO");
			return false;
		}
		if ($("#saldoUSD").val() < $("#CobPaALLusd").val() && $("#saldoUSD").val() > 0) {

			var sound = new Audio("js/infrac.mp3");
			sound.play();
			alert("!Advertencia :  SALDO PENDIENTE " + $("#saldoBS").val() + "  BS");

			return false;

		}


		if ($("#saldoBS").val() == 0) {


	
			var ced = $("#ced").val();
			var desc = $("#desc").val();
			var telef = $("#telef").val();
			var direc = $("#direc").val();
			var nfac = $("#Nfactura").val();

			//	-----------------------------------------------------------------------	
			var datacoart = [];
			var datadescRow1 = [];
			var datacantNarcRow1 = [];
			var dataprecioBruRow1 = [];
			var dataivaRow1 = [];
			var datatotalRow1 = [];
			var dataArray = [];
			var datacoart = [];
			const table = document.getElementById('NewEvidencia');


			for (let i = 0; i < table.rows.length; i++) {

				datacoart = datacoart + [table.rows[i].cells[1].innerHTML] + '-';

				let descRow = table.rows[i].cells[2].innerHTML.trim();
				datadescRow1 = datadescRow1 + [table.rows[i].cells[2].innerHTML] + ' \n';

				dataArray = [table.rows.length];

				let cantNarcRow = table.rows[i].cells[3].innerHTML;
				datacantNarcRow1 = datacantNarcRow1 + [table.rows[i].cells[3].innerHTML] + " \n";

				let precioBruRow = table.rows[i].cells[5].innerHTML;
				dataprecioBruRow1 = dataprecioBruRow1 + [table.rows[i].cells[5].innerHTML] + " \n";

				let ivaRow = table.rows[i].cells[6].innerHTML;
				dataivaRow1 = dataivaRow1 + [table.rows[i].cells[6].innerHTML] + " \n";

				let totalRow = table.rows[i].cells[7].innerHTML;
				datatotalRow1 = datatotalRow1 + [table.rows[i].cells[7].innerHTML] + " \n";



			}
			console.log(dataArray);
			console.log(datadescRow1, datacantNarcRow1, dataprecioBruRow1, dataivaRow1, datatotalRow1);


			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/verificArtalmastockproduc/coartdata=' + datacoart + '&cantargdata=' + datacantNarcRow1 + ' ',
				dataType: 'json',
				contentType: 'application/json',
				success: function(resulalma) {

				}
			})
				alert("Imprimiendo");
			$.ajax({
				type: 'GET',
				url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconex/data=' + ced + '&data1=' + desc + '&data2=' + telef + '&data3=' + direc + '&data4=' + nfac + '&descRow=' + datadescRow1 + '&cantNarcRow=' + datacantNarcRow1 + '&precioBruRow=' + dataprecioBruRow1 + '&ivaRow=' + dataivaRow1 + '&totalRow=' + datatotalRow1 + ' ',
				dataType: 'json',
				contentType: 'application/json',
				success: function(result) {

					for (var i = 0; i < result.length; i++) {
						var dataS = result[i].data;
																			
						if (dataS == "sw1n86v1@.GREB") {


							$.ajax({

								type: 'POST',
								url: '/api/ajaxrest/UpdatePrintFiscalInSytemPacoWebCreditOnloadDatacamImpresa/systemFactNum=' + nfac + '&co_cli=' + ced + ' ',
								dataType: 'json',
								contentType: 'application/json',

								success: function(resultsetdata) {


								}
							})

							alert("La Factura se imprime correctamente: ..." + "\nCliente : " + ced + " " + desc + "\nNro factura : " + nfac);

							document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
								e.preventDefault(e);
							})
							document.querySelector('button[name=closePrin]').click();

						}

					}
				}

			})

		}


		if ($("#saldoUSD").val() >= $("#CobPaALLusd").val()) {


			var sound = new Audio("js/infrac.mp3");
			sound.play();
			var campoAnufacxx = "";
			Quagga.stop();
			alert("!Advertencia :  SALDO PENDIENTE " + $("#saldoBS").val() + "  BS");



			if ($("#saldoUSD").val() < $("#CobPaALLusd").val()) {
				var sound = new Audio("js/infrac.mp3");
				sound.play();
				return false;
			}


			document.querySelector("button[name=condifacAcredit]").addEventListener("click", function(e) {
				e.preventDefault(e);
			})
			document.querySelector("button[name=condifacAcredit]").click();


			//campoAnufacxx += '<div class="modal fade bd-example-modal-xl" id="FprinterFact" tabindex="-1" role="dialog" aria-labelledby="FprinterFactTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="FprinterFactTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeFprinterFact" name="closeFprinterFact" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de Directivo : </p></div><div><input type="password" class="form-control" name="idsuperxx" id="idsuperxx"><input class="btn btn-danger" type="button"  value="Confirmar" id="btnanufacxx" name="btnanufacxx" ><div class="" style="width:80%;margin-left:10%;"><div class="card"><video id="preview" onclick="scanner.start();"></video></div></div></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div>';

			//$('#credencialesSup').html(campoAnufacxx);


			var sound = new Audio("js/sounds.wav");
			let scanner = new Instascan.Scanner({
				video: document.getElementById("preview"), mirror: false
			});
			scanner.addListener("scan", function(content) {
				sound.play();

				$(".site-backdrop").html(content);
				$("#idsuperxx").val(content);

				if ($('#idsuperxx').val() != "") {

					document.querySelector("button[name=btnanufacxx]").addEventListener("click", function(e) {
						e.preventDefault(e);
					})
					document.querySelector("button[name=btnanufacxx]").click();

				}

			});
			Instascan.Camera.getCameras().then(function(cameras) {
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
			}).catch(function(e) {
				console.error(e);
			});

			$("#btnanufacxx").click(function() {

				if ($("#saldoBS").val() < $("#CobPaALLbs").val()) {
					$("#idsuperxx").val("");
					alert("!NO ES POSIBLE CON COBROS PARCIALES");
					var sound = new Audio("js/infrac.mp3");
					sound.play();

					return false;
				}
				var ced = $("#ced").val();
				var agregar = "";
				$.ajax({
					type: 'POST',
					url: '/api/ajaxrest/datainfodaycredit/credenc=' + ced + ' ',
					dataType: 'json',
					contentType: 'application/json',
					success: function(resuldataexec) {

						for (var c = 0; c < resuldataexec.length; c++) {

							agregar += ' <option value="' + resuldataexec[c].co_cond + '">' + resuldataexec[c].cond_des + ' ' + resuldataexec[c].dias_cred + '</option>';

							console.log(resuldataexec[c].co_cond + " " + resuldataexec[c].cond_des + " " + resuldataexec[c].dias_cred);


						}
						$("#agregrarSelectCred").html(agregar);
					}
				})


				if ($("#idsuperxx").val() == "") {
					return false;
				}
				if ($("#idsuperxx").val() != "") {

					document.querySelector("button[name=closeFprinterFact]").addEventListener("click", function(e) {
						e.preventDefault(e);
					})
					document.querySelector("button[name=closeFprinterFact]").click();


					var pARAM_VALUEc = $("#idsuperxx").val();
					var nfactuc = "0";
					var co_venc = "x";
					$("#idsuperxx").val("");
					$.ajax({
						type: 'POST',
						url: '/api/ajaxrest/RestrinFacAnuProcessXinnerHttpsProgreResultInterCor/&pARAM_VALUE=' + pARAM_VALUEc + '&nfactu=' + nfactuc + '&co_ven=' + co_venc + '  ',
						dataType: 'json',
						ContentType: 'application/json',
						success: function(expIds) {

							for (var i = 0; i < expIds.length; i++) {

								pARAM_VALUESS = expIds[i].pARAM_VALUE;
								nfactuc = expIds[i].nfactu;
								co_vensc = expIds[i].co_ven;


								if (co_vensc == '0') {
									$("#idsuperxx").val("");
									alert(pARAM_VALUESS + " " + nfactuc);

									return false;
								}
								if (co_vensc == '2') {
									$("#idsuperxx").val("");
									alert(pARAM_VALUESS + " " + nfactuc);

									return false;
								}
								if (pARAM_VALUESS == pARAM_VALUEc) {



									document.querySelector("button[name=btncrediAll]").addEventListener("click", function(e) {
										e.preventDefault(e);
									})
									document.querySelector("button[name=btncrediAll]").click();

									$("#dataEnvio").click(function() {
										var fechcredit = $("#agregrarSelectCred").val();

										$("#dataEnvio").hide();
										setTimeout(function() {
											$("#dataEnvio").show();
										}, 15000)

										if (fechcredit == null) {
											return false;
										} else {
											var ced = $("#ced").val();
											var desc = $("#desc").val();
											var telef = $("#telef").val();
											var direc = $("#direc").val();
											var nfac = $("#Nfactura").val();

											//	-----------------------------------------------------------------------	

											var datadescRow1 = [];
											var datacantNarcRow1 = [];
											var dataprecioBruRow1 = [];
											var dataivaRow1 = [];
											var datatotalRow1 = [];
											var dataArray = [];
											const table = document.getElementById('NewEvidencia');

											for (let i = 0; i < table.rows.length; i++) {

												let descRow = table.rows[i].cells[2].innerHTML.trim();
												datadescRow1 = datadescRow1 + [table.rows[i].cells[2].innerHTML] + ' \n';

												dataArray = [table.rows.length];

												let cantNarcRow = table.rows[i].cells[3].innerHTML;
												datacantNarcRow1 = datacantNarcRow1 + [table.rows[i].cells[3].innerHTML] + " \n";

												let precioBruRow = table.rows[i].cells[5].innerHTML;
												dataprecioBruRow1 = dataprecioBruRow1 + [table.rows[i].cells[5].innerHTML] + " \n";

												let ivaRow = table.rows[i].cells[6].innerHTML;
												dataivaRow1 = dataivaRow1 + [table.rows[i].cells[6].innerHTML] + " \n";

												let totalRow = table.rows[i].cells[7].innerHTML;
												datatotalRow1 = datatotalRow1 + [table.rows[i].cells[7].innerHTML] + " \n";

											}
											console.log(dataArray);
											console.log(datadescRow1, datacantNarcRow1, dataprecioBruRow1, dataivaRow1, datatotalRow1);


											$.ajax({
												type: 'GET',
												url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconex/data=' + ced + '&data1=' + desc + '&data2=' + telef + '&data3=' + direc + '&data4=' + nfac + '&descRow=' + datadescRow1 + '&cantNarcRow=' + datacantNarcRow1 + '&precioBruRow=' + dataprecioBruRow1 + '&ivaRow=' + dataivaRow1 + '&totalRow=' + datatotalRow1 + ' ',
												dataType: 'json',
												contentType: 'application/json',
												success: function(result) {

													for (var i = 0; i < result.length; i++) {
														var dataS = result[i].data;

														if (dataS == "sw1n86v1@.GREB") {


															$.ajax({
																type: 'POST',
																url: '/api/ajaxrest/UpdatePrintFiscalInSytemPacoWebCreditOnloadDatacamImpresacredit/systemFactNum=' + nfac + '&co_cli=' + ced + '&fecvencfact=' + fechcredit + ' ',
																dataType: 'json',
																contentType: 'application/json',
																success: function(resultsetdata) {
																	for (var dat = 0; dat < resultsetdata.length; dat++) {

																		//alert("!LA FECHA DE VENCIMIENTO DE LA FACTURA ES EL "+ resultsetdata[dat].diasFact );
																	}

																}
															})

															alert("La Factura se imprime correctamente: ..." + "\nCliente : " + ced + " " + desc + "\nNro factura : " + nfac);

															document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
																e.preventDefault(e);
															})
															document.querySelector('button[name=closePrin]').click();

														}

													}
												}

											})
										}




									})


								}

							}
						}

					});


				}

			});

		}

	})




	$("#NfacturaCob").val($("#Nfactura").val());
	$("#NfacturaCobespera").val($("#Nfactura").val());

	$(document).click(function() {

		ActuLoadData();

		/*window.addEventListener("beforeunload", (evento) => {
			if (true) {
				evento.preventDefault();
				evento.returnValue = "";
				return "";
			}
		});*/
		ActuLoadData();
		
		var nfacList = $("#Nfactura").val();
		var cedcliList = $("#cedcli").val();
		var co_venID = $("#co_venID").val();
		
		$.ajax({
			type : 'POST',
			url : '/api/ajaxrest/verificarImpresion/dataFact='+nfacList+'&dataVend='+co_venID+' ',
			dataType : 'json',
			contentType  : 'application/json',
			success : function(rsultAjax){
				var infodataA = "";
				var infodataB = "";
				var infodataD = "";
				for(var i = 0 ; i < rsultAjax.length ; i ++){
						
						infodataA = rsultAjax[i].dateinfoC;
						infodataB = rsultAjax[i].dateinfoB;
						infodataD = rsultAjax[i].dateinfoD;
						
						var des = parseInt($("#CobPaALLbs").val() - infodataB)
						var das = parseInt($("#saldoBS").val() - infodataD  );
						
						if(infodataA == "1"){
							
							alert("!! LA FACTURA YA FUE IMPRESA");
							
							document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
								e.preventDefault(e);
							})
							document.querySelector('button[name=closePrin]').click();
							return false;

							
						}if(des > 1 ){
							
							alert("!LOS REISTROS ESTAN SIENDO MODIFICADOS POR OTRO USUARIO");
						
							document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
								e.preventDefault(e);
							})
							document.querySelector('button[name=closePrin]').click();
							return false;
						}
						
						if( das > 1){
							alert("!LOS REISTROS ESTAN SIENDO MODIFICADOS POR OTRO USUARIO");
						
							document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
								e.preventDefault(e);
							})
							document.querySelector('button[name=closePrin]').click();
							return false;
						}
					
				}
			}
			
		})
		
		

	});


	$('#buttonPAMO').click(function() {
		var saldoAllBS = $('#valMAXbsPM').val();
		$('#MontoCobbsPM').val(saldoAllBS);
		$('#MontClibsPM').val(saldoAllBS)
		ActuLoadData();
		return true;
	})

	$('#buttonPV').click(function() {
		var saldoAllBS = $('#valMAXbsPV').val();
		$('#MontoCobbsPV').val(saldoAllBS);
		$('#MontClibsPV').val(saldoAllBS)
		ActuLoadData();
		cobPuntoVentaBS();
		return true;

	})

	$('#buttonTF').click(function() {
		var saldoAllBS = $('#valMAXbsTF').val();
		$('#MontoCobbsTF').val(saldoAllBS);
		$('#MontClibsTF').val(saldoAllBS)
		ActuLoadData();
		return true;
	})
	$('#buttonBP').click(function() {
		var saldoAllBS = $('#valMAXbsBP').val();
		$('#MontoCobbsBP').val(saldoAllBS);
		$('#MontClibsBP').val(saldoAllBS)
		ActuLoadData();
		return true;
	})
	$('#buttonMERC01').click(function() {
		$('#datoCod').val($('#cod_ctaME').val());
		$('#datoBanc').val($('#co_bancME').val());
		$('#datoNum').val($('#num_ctaME').val());
		ActuLoadData();

	})
	$('#buttonBANE01').click(function() {
		$('#datoCod').val($('#cod_ctaBN').val());
		$('#datoBanc').val($('#co_bancBN').val());
		$('#datoNum').val($('#num_ctaBN').val());
	})

	$('#buttonMERC01p').click(function() {
		$('#datoCodPM').val($('#cod_ctaME').val());
		$('#datoBancPM').val($('#co_bancME').val());
		$('#datoNumPM').val($('#num_ctaME').val());
		ActuLoadData();

	})
	$('#buttonBANE01p').click(function() {
		$('#datoCodPM').val($('#cod_ctaBN').val());
		$('#datoBancPM').val($('#co_bancBN').val());
		$('#datoNumPM').val($('#num_ctaBN').val());
		ActuLoadData();
	})

	$("#cobAP").click(function() {
		ActuLoadData();

		if ($("#MontoALLBS").val() == 0) {
			return false;
		}

	})

	$("#btnUSD").click(function() {
		$("#MontoCobUSusd").val(parseFloat($('#valMAXUSusd').val()));
		document.getElementById('cobEntvubs').value = "";
		document.getElementById('cobEntvuusd').value = "";
		document.getElementById('cobEntvueur').value = "";
		cobEfecUSD()


	})

	$("#buttonBSef").click(function() {
		$("#MontoCobbs").val($('#valMAXbs').val());
		$("#MontClibs").val($('#valMAXbs').val());
		cobEfecBS();
	})

	$("#btn-vuel-bs").click(function() {
		$("#cobEntcliBS").val($("#resuBS").val());
		cobEfecBS();
	})
	$("#btn-vuel-usd").click(function() {
		$("#cobEntvubs").val(document.getElementById("cobresvubs").value);

		cobEfecUSD();
	})

	$("#btn-client-bs").click(function() {
		$("#MontoCobbs").val(document.getElementById("MontClibs").value);
		cobEfecBS();

	})
	$("#btn-client-usd").click(function() {
		$("#MontoCobUSusd").val(document.getElementById("MontoCliUSusd").value);
		cobEfecUSD();

	})


	$("#btn-client-pv").click(function() {
		$("#MontoCobbsPV").val(document.getElementById("MontClibsPV").value);
		cobPuntoVentaBS();

	})
	$("#cobAPPuntoVenta").click(function() {
		var fechahora = new Date();
		var hora = fechahora.getHours();
		var minuto = fechahora.getMinutes();
		var segundo = fechahora.getSeconds();

		if (hora == 0) { hora = 12; }
		if (hora > 12) { hora = hora - 12; }

		hora = (hora < 10) ? "0" + hora : hora;
		minuto = (minuto < 10) ? "0" + minuto : minuto;
		segundo = (segundo < 10) ? "0" + segundo : segundo;

		var datatimepv = (hora + minuto + segundo);
		$("#nroDocumPV").val(datatimepv);
	})


	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/tarjCrePuntVe/',
		dataType: 'json',
		contentType: 'application/json',
		success: function(tarj_cre) {
			for (var tj = 0; tj < tarj_cre.length; tj++) {
				co_tar = tarj_cre[tj].co_tar;
				des_tar = tarj_cre[tj].des_tar;
				comision = tarj_cre[tj].comision;

				var tarjPV = [{
					co_tar: co_tar,
					des_tar: des_tar,
					comision: comision,
				},]

				function filtertarje_cre(array, searchString) {
					const result = array.filter(x => {
						const values = Object.values(x);
						if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
							return x;
						}
					})
					return result;
				}
				var filterTarj = filtertarje_cre(tarjPV, 'Punto de Venta ');
				for (var td = 0; td < filterTarj.length; td++) {
					$('#co_tar').val(tarjPV[td].co_tar);
					$('#des_tar').val(tarjPV[td].des_tar);
					console.log(tarjPV[td].co_tar + " / " + tarjPV[td].des_tar);
				}
			}
		}
	});

	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/infoCaja/',
		dataType: 'json',
		contentType: 'application/json',
		success: function(infocaja) {
			for (var c = 0; c < infocaja.length; c++) {
				cod_caja = infocaja[c].cod_caja;
				descrip = infocaja[c].descrip;
				moneda = infocaja[c].moneda;

				var caja = [{
					cod_caja: cod_caja,
					descrip: descrip,
					moneda: moneda,
				},]

				function filtercaja(array, searchString) {
					const resultx = array.filter(x => {
						const values = Object.values(x);
						if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
							return x;
						}
					})
					return resultx;
				}

				var filtercajaBS = filtercaja(caja, 'BOLIVARES');
				for (var cBS = 0; cBS < filtercajaBS.length; cBS++) {
					$('#CajaEfecBSD').val(caja[cBS].cod_caja);
					$('#DescripBSD').val(caja[cBS].descrip);
					$('#MonedaBSD').val(caja[cBS].moneda);
					console.log(caja[cBS].descrip.trim() + " / " + caja[cBS].moneda);
				}

				var filtercajaUSD = filtercaja(caja, 'DIVISAS');
				for (var cUSD = 0; cUSD < filtercajaUSD.length; cUSD++) {
					$('#CajaEfecUSD').val(caja[cUSD].cod_caja);
					$('#DescripUSD').val(caja[cUSD].descrip);
					$('#MonedaUSD').val(caja[cUSD].moneda);


					console.log(caja[cUSD].descrip.trim() + " / " + caja[cUSD].moneda);
				}

				var filtercajaPV = filtercaja(caja, 'PUNTO DE VENTA');
				for (var cPV = 0; cPV < filtercajaPV.length; cPV++) {

					$('#CajaPuntoPV').val(caja[cPV].cod_caja);
					$('#DescripPuntoPV').val(caja[cPV].descrip);
					$('#MonedaPuntoPV').val(caja[cPV].moneda);


					$('#CajaBioPago').val(caja[cPV].cod_caja);
					$('#DescripBioPago').val(caja[cPV].descrip);
					$('#MonedaBioPago').val(caja[cPV].moneda);

					console.log(caja[cPV].descrip.trim() + " / " + caja[cPV].moneda);

				}

				var filtercajaTF = filtercaja(caja, 'TRANSFERENCIA');
				for (var cTF = 0; cTF < filtercajaTF.length; cTF++) {
					$('#CajaPaMo').val(caja[cTF].cod_caja);
					$('#DescripPaMo').val(caja[cTF].descrip);
					$('#MonedaPaMo').val(caja[cTF].moneda);

					$('#CajaTRANSF').val(caja[cTF].cod_caja);
					$('#DescripTRANSF').val(caja[cTF].descrip);
					$('#MonedaTRANSF').val(caja[cTF].moneda);

					console.log(caja[cTF].descrip.trim() + " / " + caja[cTF].moneda);
				}

				var filtercajaEUR = filtercaja(caja, 'EURO');
				for (var cEUR = 0; cEUR < filtercajaEUR.length; cEUR++) {
					$('#CajaEfecEUR').val(caja[cEUR].cod_caja);
					$('#DescripEUR').val(caja[cEUR].descrip);
					$('#MonedaEUR').val(caja[cEUR].moneda);

					console.log(caja[cEUR].descrip.trim() + " / " + caja[cEUR].moneda);
				}
			}
		}
	});

	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/infoCuentas/',
		dataType: 'json',
		contentType: 'application/json',
		success: function(rscuentas) {
			for (var ct = 0; ct < rscuentas.length; ct++) {
				cod_cta = rscuentas[ct].cod_cta;
				co_banc = rscuentas[ct].co_banc;
				num_cta = rscuentas[ct].num_cta;
				moneda = rscuentas[ct].moneda;

				var cuentas = [{
					cod_cta: cod_cta,
					co_banc: co_banc,
					num_cta: num_cta,
					moneda: moneda,
				},];

				function filtrarCuentas(array, searchString) {
					const resultc = array.filter(x => {
						const values = Object.values(x);
						if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
							return x;
						}
					})
					return resultc;
				}


				var filcuentaTW = filtrarCuentas(cuentas, "BANE");
				for (var bnCT = 0; bnCT < filcuentaTW.length; bnCT++) {
					$('#cod_ctaBN').val(cuentas[bnCT].cod_cta);
					$('#co_bancBN').val(cuentas[bnCT].co_banc);
					$('#num_ctaBN').val(cuentas[bnCT].num_cta);
					console.log(cuentas[bnCT].cod_cta + " / " + cuentas[bnCT].co_banc + " / " + cuentas[bnCT].num_cta + " / " + cuentas[bnCT].moneda);
				}


				var filcuentaUn = filtrarCuentas(cuentas, "MERC");
				for (var meCT = 0; meCT < filcuentaUn.length; meCT++) {
					$('#cod_ctaME').val(cuentas[meCT].cod_cta);
					$('#co_bancME').val(cuentas[meCT].co_banc);
					$('#num_ctaME').val(cuentas[meCT].num_cta);
					console.log(cuentas[meCT].cod_cta + " / " + cuentas[meCT].co_banc + " / " + cuentas[meCT].num_cta + " / " + cuentas[meCT].moneda);
				}

			}
		}
	});

	$.ajax({
		type: "POST",
		url: "/api/ajaxrest/InfoTasa",
		dataType: "json",
		contentType: "appliclation/json",
		success: function(tasa) {
			for (var t = 0; t < tasa.length; t++) {
				var mont_tasa = parseFloat(tasa[t].tasa_v);
				var tasa_v = (mont_tasa.toFixed(5));
				$('#TasaTODAY').val();
			}

		}
	});

	var contNarc = 1;

	$('#guardarCli').click(function() {

		var ced = $('#ced').val();
		var desc = $('#desc').val();

		if ($('#telef').val() == '') {
			$('#telef').val('________');
		}
		if ($('#direc').val() == '') {
			$('#direc').val('________');
		}

		var telef = $('#telef').val();
		var direc = $('#direc').val();

		if (desc == '') {
			alert("DEBE DE ASIGNAR UN NOMBRE AL CLIENTE " + ced);
		} else if (ced != null && desc != null && direc != null && telef != null) {

			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/upCaseCli/ced=' + ced + '&desc=' + desc + '&telef=' + telef + '&direc=' + direc + '   ',
				success: function(result) {

					document.querySelector('button[name=closeEdclib]').addEventListener('click', function(e) {
						e.preventDefault(e);
					})
					document.querySelector('button[name=closeEdclib]').click();

					$('#alertcheck').show();
					setTimeout(function() {
						$('#alertcheck').hide();
					}, 2000);
				}
			});
		}
	});

	$("#inicioScanner").click(function() {

		Instascan.Camera.getCameras().then(function(cameras) {
			if (cameras.length > 0) {
				scanner.stop();
			}

		}).catch(function(e) {
			console.error(e);
		});

		Quagga.init({
			inputStream: {
				constraints: {
					width: 1920,
					height: 1080,
					mirror: false
				},
				name: "Live",
				type: "LiveStream",
				mirror: false,
				target: document.querySelector('#contenedorScanner'), // Pasar el elemento del DOM
			},
			decoder: {
				readers: [{
					format: "ean_reader",
					config: {
						numOfWorkers: 1,
						locate: true,
						frequency: 1,
						debug: false,
					}
				}]
				/*
				readers: ["code_128_reader"],
				readers: ["code_39_reader"],
				readers: ["code_39_vin_reader"],
				readers: ["ean_extended_reader"],
				readers: ["ean_8_reader"],
				readers: ["upc_reader"],
				readers: ["upc_e_reader"],
				readers: ["codabar_reader"],
				readers: ["i2of5_reader"],
				readers: ["2of5_reader"],
				readers: ["code_93_reader"],
				readers: ["ean_reader"]*/
			}

		}, function(err) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Iniciado correctamente");

			Quagga.start();

		});

	})

	var campoAnufac = "";
	$("#anularFacR").click(function() {

		if (confirm("Desea Anular la factura actual Nro " + $("#Nfactura").val() + " ?") == true) {

			campoAnufac += '<div class="modal fade bd-example-modal-xl" id="AnufacMo" tabindex="-1" role="dialog" aria-labelledby="AnufacMoTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="AnufacMoTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeAnufacMo" name="closeAnufacMo" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper" id="idsuper"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

			$('#Anufac').html(campoAnufac);

			$("#AnufacMo").focus();

			$("#btn-anufac").click(function() {
				if ($("#idsuper").val() == "") {
					return false;
				}
				else {

					var pARAM_VALUE = $("#idsuper").val();
					var nfactu = $("#Nfactura").val();
					var co_ven = $("#co_venID").val();

					$.ajax({
						type: 'POST',
						url: '/api/ajaxrest/RestrinFacAnuProcessXinnerHttpsProgreResultInterCor/&pARAM_VALUE=' + pARAM_VALUE + '&nfactu=' + nfactu + '&co_ven=' + co_ven + '  ',
						dataType: 'json',
						ContentType: 'application/json',
						success: function(expId) {

							for (var i = 0; i < expId.length; i++) {

								pARAM_VALUES = expId[i].pARAM_VALUE;
								nfactu = expId[i].nfactu;
								co_vens = expId[i].co_ven;


								if (co_vens == '0') {
									$("#idsuper").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (co_vens == '2') {
									$("#idsuper").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (pARAM_VALUES == pARAM_VALUE) {
									$("#idsuper").val("");

									document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closePrin]').click();

								}

							}
						}

					});
				}
			})

		} else {
			return false;
		}

	});

	var campoAnufacx = "";
	$("#facesperadata").click(function() {

		campoAnufacx += '<div class="modal fade bd-example-modal-xl" id="Factsperadata" tabindex="-1" role="dialog" aria-labelledby="FactsperadataTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="FactsperadataTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeFactsperadata" name="closeFactsperadata" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper2" id="idsuper2"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac2"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

		$('#esperafact').html(campoAnufacx);


		$("#btn-anufac2").click(function() {
			if ($("#idsuper2").val() == "") {
				return false;
			}
			if ($("#saldoBS").val() < 0 || $("#saldoUSD").val() < 0) {
				var sound = new Audio("js/infrac.mp3");
				sound.play();
				alert("!Advertencia : CLIENTE CON SALDO NEGATIVO");

				return false;
			}
			if ($("#idsuper2").val() != "" || $("#idsuper2").val() > 0) {

				var pARAM_VALUE = $("#idsuper2").val();
				var nfactu = "0";
				var co_ven = "x";

				$.ajax({
					type: 'POST',
					url: '/api/ajaxrest/RestrinFacAnuProcessXinnerHttpsProgreResultInterCor/&pARAM_VALUE=' + pARAM_VALUE + '&nfactu=' + nfactu + '&co_ven=' + co_ven + '  ',
					dataType: 'json',
					ContentType: 'application/json',
					success: function(expId) {

						for (var i = 0; i < expId.length; i++) {

							pARAM_VALUES = expId[i].pARAM_VALUE;
							nfactu = expId[i].nfactu;
							co_vens = expId[i].co_ven;


							if (co_vens == '0') {
								$("#idsuper2").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (co_vens == '2') {
								$("#idsuper2").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (pARAM_VALUES == pARAM_VALUE) {
								$("#idsuper2").val("");

								if ($("saldoUSD").val() < 0) {
									var sound = new Audio("js/infrac.mp3");
									sound.play();
									alert("!Advertencia : CLIENTE CON SALDO NEGATIVO");
									return false;

								} if ($("#saldoUSD").val() >= 0) {
									document.querySelector('button[name=closePrin]').addEventListener('13', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closePrin]').click();
								}

							}

						}
					}

				});
			}

		})

	})

	var dataNfac = $("#Nfactura").val();
	var NewEvidenciar = $("#NewEvidencia");

	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/RetornaFactPend/nfacReturnfactpendiente=' + dataNfac + ' ',
		dataType: 'json',
		contentType: 'application/json',
		success: function(dataInfoResult) {
			var person = 0;
			/*<![CDATA[*/
			for (var d = 0; d < dataInfoResult.length; d++) {
				reng_num = dataInfoResult[d].reng_num;
				co_art = dataInfoResult[d].co_art;
				total_art = dataInfoResult[d].total_art;
				pendiente = dataInfoResult[d].pendiente;
				uni_venta = dataInfoResult[d].uni_venta;
				prec_vta = dataInfoResult[d].prec_vta;
				tipo_imp = dataInfoResult[d].tipo_imp;
				reng_neto = dataInfoResult[d].reng_neto;
				art_des = dataInfoResult[d].art_des;

				var tasa_v = $('#TasaTODAY').val();
				tasa_v = tasa_v.toString();
				tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
				tasa_v = Number(tasa_v);


				var precioAjuste = (parseFloat(dataInfoResult[d].prec_vta / tasa_v));

				var Precio = (parseFloat(precioAjuste * dataInfoResult[d].total_art));
				Precio = Precio.toString();
				Precio = Precio.slice(0, (Precio.indexOf(".")) + 6);
				Precio = Number(Precio);


				var PrecioUnid = (parseFloat(precioAjuste * dataInfoResult[d].total_art));
				PrecioUnid = PrecioUnid.toString();
				PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf(".")) + 6);
				PrecioUnid = Number(PrecioUnid);



				var Iva = 0;
				if (parseFloat(dataInfoResult[d].tipo_imp) == 1) {
					var Iva = (parseFloat(PrecioUnid) * 0.16);
				}
				else if (parseFloat(dataInfoResult[d].tipo_imp) == 3) {
					var Iva = (parseFloat(PrecioUnid) * 0.16);
				}
				else if (parseFloat(dataInfoResult[d].tipo_imp) == 6) {
					var Iva = (parseFloat(PrecioUnid) * 0);
				}


				Iva = Iva.toString();
				Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);
				Iva = Number(Iva);

				var Total = (parseFloat(Iva + Precio));
				var absTotal = (parseFloat(Iva + PrecioUnid));
				var cantUn = parseFloat(dataInfoResult[d].pendiente * person);

				var tasa_v = $('#TasaTODAY').val();
				tasa_v = tasa_v.toString();
				tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
				tasa_v = Number(tasa_v);

				var cos_pro_unjs = (parseFloat(precioAjuste * tasa_v));

				var IvaBS = parseFloat(Iva * tasa_v);

				var PrecioBS = parseFloat(Precio * tasa_v);

				var TotalBS = parseFloat(absTotal * tasa_v);


				Iva = Iva.toString();
				Iva = Iva.slice(0, (Iva.indexOf(".")) + 4);

				Total = Total.toString();
				Total = Total.slice(0, (Total.indexOf(".")) + 4);

				absTotal = absTotal.toString();
				absTotal = absTotal.slice(0, (absTotal.indexOf(".")) + 4);

				TotalBS = TotalBS.toString();
				TotalBS = TotalBS.slice(0, (TotalBS.indexOf(".")) + 4);

				PrecioBS = PrecioBS.toString();
				PrecioBS = PrecioBS.slice(0, (PrecioBS.indexOf(".")) + 4);

				IvaBS = IvaBS.toString();
				IvaBS = IvaBS.slice(0, (IvaBS.indexOf(".")) + 4);

				cos_pro_unjs = cos_pro_unjs.toString();
				cos_pro_unjs = cos_pro_unjs.slice(0, (cos_pro_unjs.indexOf(".")) + 3);

				dataInfoResult[d].total_art = dataInfoResult[d].total_art.toString();
				dataInfoResult[d].total_art = dataInfoResult[d].total_art.toString();
				dataInfoResult[d].total_art = dataInfoResult[d].total_art.slice(0, (dataInfoResult[d].total_art.indexOf(".")) + 4);

				dataInfoResult[d].prec_vta = dataInfoResult[d].prec_vta.toString();
				dataInfoResult[d].prec_vta = dataInfoResult[d].prec_vta.toString();
				dataInfoResult[d].prec_vta = dataInfoResult[d].prec_vta.slice(0, (dataInfoResult[d].prec_vta.indexOf(".")) + 4);


				Precio = Number(Precio);
				Iva = Number(Iva);
				Total = Number(Total);
				cantUn = cantUn;

				absTotal = Number(absTotal);

				TotalBS = Number(TotalBS);
				PrecioBS = Number(PrecioBS);
				IvaBS = Number(IvaBS);
				cos_pro_unjs = Number(cos_pro_unjs);



				var descripProrimsp1 = dataInfoResult[d].art_des.trim();
				var datasp1 = "/";
				var datapo1 = "%";
				var datapl1 = "&";

				var dataProDistsp1 = descripProrimsp1.split(datasp1, "20");
				var datanew2 = String(dataProDistsp1);

				var dataProDesc = datanew2.split(datapo1, "20");
				var datanew3 = String(dataProDesc);

				var dataProdesc2 = datanew3.split(datapl1, "20");
				var datanew4 = String(dataProdesc2);

				var descripPro = datanew4.split("  ", "10");
				descripPro = String(descripPro);




				var addNarc = ' <tr  class="" id="DeleteEvidNarc' + dataInfoResult[d].reng_num +
					'"<div class="" role="tr">' +
					''
				addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + dataInfoResult[d].reng_num + '</td>'
				addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + dataInfoResult[d].co_art + '</td>'
					+ '<input   id="co_art' + dataInfoResult[d].reng_num + '"  value="' + dataInfoResult[d].co_art + '"     type="hidden"  >'
				addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + descripPro.trim() + '</td>'
					+ '<input type="hidden" id="tipo_imp' + dataInfoResult[d].reng_num + '" value="' + dataInfoResult[d].tipo_imp + '" >'
					+ '<input type="hidden" name="desc_art" value="' + dataInfoResult[d].art_des + '" id="desc_art' + dataInfoResult[d].reng_num + '" >'
				addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;cursor:pointer;"  >' + dataInfoResult[d].total_art + '</td>'
				addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + dataInfoResult[d].uni_venta + '</td>'
					+ '<input type="hidden" id="uni_venta' + dataInfoResult[d].uni_venta + '" value="' + dataInfoResult[d].uni_venta + '">'
				addNarc += '<td scope="row" title="' + dataInfoResult[d].reng_neto + ' $" style="font-weight:bold;font-size:9pt;">' + dataInfoResult[d].prec_vta + '</td>'
					+ '<input type="hidden" name="preciobslis" id="preciobslis' + dataInfoResult[d].reng_num + '" value="' + dataInfoResult[d].prec_vta + '" >'
				addNarc += '<td id="Iva" scope="row" title="' + dataInfoResult[d].tipo_imp + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
					+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + dataInfoResult[d].reng_num + '" >'
				addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
					+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + dataInfoResult[d].reng_num + '" >'
				addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
					+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + dataInfoResult[d].reng_num + '">'
				addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + dataInfoResult[d].reng_num + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + dataInfoResult[d].reng_num + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

				console.log(dataInfoResult[d].reng_num + " " + dataInfoResult[d].co_art + " " + dataInfoResult[d].total_art + " " + dataInfoResult[d].pendiente + " " + dataInfoResult[d].uni_venta + " " + dataInfoResult[d].prec_vta + " " + dataInfoResult[d].tipo_imp + " " + dataInfoResult[d].reng_neto + " " + dataInfoResult[d].art_des + "\n");
				NewEvidenciar.append(addNarc);
			}
			/*]]>*/

			sumSueldo();

		}
	})


	$("#selectEvidencia").keydown(function(event) {
		if ((event.keyCode == 13)) {
			/*$("#addEvidencia").click(function() {
			*/

			var scannerVal2 = $("#selectEvidencia").val();
			var scannerVal3 = scannerVal2.substring(1);
			var ScannerVal = scannerVal2.substring(12, -1)
			var codPro = ScannerVal.substring(7, -1);
			var rest = 7;
			var srtced = ScannerVal.substring(rest);
			var enCan = srtced.substring(2, -1);
			var desCan = srtced.substring(2);
			var peso = enCan + "." + desCan;

			var co_artID = codPro;
			var pesocodPro = peso;

			var evidencia = $("#selectEvidencia").val();
			var NewEvidencia = $("#NewEvidencia");

			var contNarc = 0;


			const table = document.getElementById('NewEvidencia');

			for (let i = 0; i < table.rows.length; i++) {

				let rowValue = table.rows[i].cells[0].innerHTML;
				contNarc = Number(rowValue);
				if (contNarc == '') {
					contNarc = 0;
				}
			}
			var contNarc = contNarc + 1;


			if (evidencia == "") {
				$("#selectEvidencia").focus();
				alert("Debe de ingresar el codigo del producto");
				return false;
			}


			else if (evidencia != 0) {
				$("#selectEvidencia").val("");
				$("#selectEvidencia").focus();



				if (co_artID[0] == 0) {
					co_artID = scannerVal2;

				}
				if (co_artID[0] == 7) {
					co_artID = scannerVal2;

				}

				if (co_artID[0] == 0) {
					co_artID = scannerVal3;
				}
				if (co_artID[0] == 2) {
					co_artID = co_artID;
				}



				$.ajax({
					type: "POST",
					url: "/api/ajaxrest/demo/&co_art=" + co_artID + "&scannerVal2=" + scannerVal2 + "&scannerVal3=" + scannerVal3 + " ",
					dataType: "json",
					contentType: "application/json",
					success: function(result) {
						addNarc = "";

						for (var i = 0; i < result.length; i++) {

							co_art = result[i].co_art;
							art_des = result[i].art_des;
							uni_venta = result[i].uni_venta;
							can_arg = result[i].can_arg;
							cos_pro_om = result[i].cos_pro_om
							tipo = result[i].tipo;
							tipo_imp = result[i].tipo_imp;

							var productos = [
								{
									co_art: co_art,
									art_des: art_des,
									uni_venta: uni_venta,
									can_arg: can_arg,
									cos_pro_om: cos_pro_om,
									tipo: tipo,
									tipo_imp: tipo_imp,
								},
							]

							function filtrarProductos(array, searchString) {
								const resultd = array.filter(x => {
									const values = Object.values(x);
									if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
										return x;
									}
								})

								return resultd;
							}

							var filt = (filtrarProductos(productos, co_artID));
							for (var j = 0; j < filt.length; j++) {



								function filtrarProductosUND(array, searchString) {
									const resultd = array.filter(x => {
										const values = Object.values(x);
										if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
											return x;
										}
									})

									return resultd;
								}

								var filtUND = (filtrarProductosUND(productos, scannerVal2));
								for (var v = 0; v < filtUND.length; v++) {

									let person = "1";

									if (person > 0) {


										var Precio = (parseFloat(productos[j].cos_pro_om * person));
										Precio = Precio.toString();
										Precio = Precio.slice(0, (Precio.indexOf(".")) + 6);
										Precio = Number(Precio);


										var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
										PrecioUnid = PrecioUnid.toString();
										PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf(".")) + 6);
										PrecioUnid = Number(PrecioUnid);

										var Iva = 0;
										if (parseFloat(productos[j].tipo_imp) == 1) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 3) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 6) {
											var Iva = (parseFloat(PrecioUnid) * 0);
										}


										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);
										Iva = Number(Iva);

										var Total = (parseFloat(Iva + Precio));
										var absTotal = (parseFloat(Iva + PrecioUnid));
										var cantUn = parseFloat(productos[j].can_arg * person);

										var tasa_v = $('#TasaTODAY').val();
										tasa_v = tasa_v.toString();
										tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
										tasa_v = Number(tasa_v);

										var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

										var IvaBS = parseFloat(Iva * tasa_v);

										var PrecioBS = parseFloat(Precio * tasa_v);

										var TotalBS = parseFloat(absTotal * tasa_v);

										var co_artA = productos[j].co_art.trim();

										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);

										Total = Total.toString();
										Total = Total.slice(0, (Total.indexOf(".")) + 4);

										absTotal = absTotal.toString();
										absTotal = absTotal.slice(0, (absTotal.indexOf(".")) + 4);

										TotalBS = TotalBS.toString();
										TotalBS = TotalBS.slice(0, (TotalBS.indexOf(".")) + 4);

										PrecioBS = PrecioBS.toString();
										PrecioBS = PrecioBS.slice(0, (PrecioBS.indexOf(".")) + 4);

										IvaBS = IvaBS.toString();
										IvaBS = IvaBS.slice(0, (IvaBS.indexOf(".")) + 4);

										cos_pro_unjs = cos_pro_unjs.toString();
										cos_pro_unjs = cos_pro_unjs.slice(0, (cos_pro_unjs.indexOf(".")) + 4);

										Precio = Number(Precio);
										Iva = Number(Iva);
										Total = Number(Total);
										cantUn = cantUn.toFixed(5);

										absTotal = Number(absTotal);

										TotalBS = Number(TotalBS);
										PrecioBS = Number(PrecioBS);
										IvaBS = Number(IvaBS);
										cos_pro_unjs = Number(cos_pro_unjs);

										var id_row = "row" + contNarc;

										var descripProrimsp1 = productos[j].art_des.trim();
										var datasp1 = "/";
										var datapo1 = "%";
										var datapl1 = "&";

										var dataProDistsp1 = descripProrimsp1.split(datasp1, "20");
										var datanew2 = String(dataProDistsp1);

										var dataProDesc = datanew2.split(datapo1, "20");
										var datanew3 = String(dataProDesc);

										var dataProdesc2 = datanew3.split(datapl1, "20");
										var datanew4 = String(dataProdesc2);

										var descripPro = datanew4.split("  ", "10");
										descripPro = String(descripPro);



										var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
											'"<div class="" role="tr">' +
											''
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + productos[j].co_art + '</td>'
											+ '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + descripPro.trim() + '</td>'
											+ '<input type="hidden" id="tipo_imp' + contNarc + '" value="' + productos[j].tipo_imp + '" >'
											+ '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;cursor:pointer;" onclick="return DatoProArt(id=' + contNarc + ');" >' + cantUn + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
											+ '<input type="hidden" id="uni_venta' + contNarc + '" value="' + productos[j].uni_venta + '">'
										addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
											+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
										addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
											+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
										addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
											+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
										addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
											+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
										addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

										if (Precio < 1) {
											alert(" Error: " + productos[j].art_des + "<br> NO tiene precio");
											return;
										}
										NewEvidencia.append(addNarc);

										sumSueldo();

										var total_art = (parseFloat(productos[j].can_arg * person));
										total_art = total_art.toFixed(5);

										$("#selectEvidencia").focus();

										var nfac = $('#Nfactura').val();
										var tasa = $('#TasaTODAY').val();
										var co_cli = $('#cedcli').val();
										var co_art = co_artA;
										var cantidad = total_art;
										var uni_venta = productos[j].uni_venta.trim();
										var can_arg = productos[j].can_arg;
										var cos_pro_om = productos[j].cos_pro_om;
										var tipo = productos[j].tipo;
										var tipo_imp = productos[j].tipo_imp;
										var tot_bruto = $('#PrecioALL').val();
										var tot_neto = $('#MontoALL').val();
										var iva = $('#ivaALL').val();
										var reng_neto = $('#totalbs' + contNarc).val();
										var reng_num = contNarc;
										var cos_pro_un = cos_pro_unjs;
										var ivabs = $('#ivaALLBS').val();
										var monto_net = $('#MontoALLBS').val();
										var preciobru = $('#precioBru').val();


										if (uni_venta == '1/2') {
											uni_venta = 'medio';
										}
										$.ajax({
											type: 'POST',
											url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
											success: function() {

											}
										})
										ActuLoadData();
										contNarc++;
										return false;

									}

								}
								var filtKG = (filtrarProductosUND(productos, co_artID));
								for (var v = 0; v < filtKG.length; v++) {

									let person = pesocodPro;

									if (person > 0) {


										var Precio = (parseFloat(productos[j].cos_pro_om * person));
										Precio = Precio.toString();
										Precio = Precio.slice(0, (Precio.indexOf(".")) + 6);
										Precio = Number(Precio);


										var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
										PrecioUnid = PrecioUnid.toString();
										PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf(".")) + 6);
										PrecioUnid = Number(PrecioUnid);

										var Iva = 0;
										if (parseFloat(productos[j].tipo_imp) == 1) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 3) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 6) {
											var Iva = (parseFloat(PrecioUnid) * 0);
										}


										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);
										Iva = Number(Iva);

										var Total = (parseFloat(Iva + Precio));
										var absTotal = (parseFloat(Iva + PrecioUnid));
										var cantUn = parseFloat(productos[j].can_arg * person);

										var tasa_v = $('#TasaTODAY').val();
										tasa_v = tasa_v.toString();
										tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
										tasa_v = Number(tasa_v);

										var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

										var IvaBS = parseFloat(Iva * tasa_v);

										var PrecioBS = parseFloat(Precio * tasa_v);

										var TotalBS = parseFloat(absTotal * tasa_v);

										var co_artA = productos[j].co_art.trim();

										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);

										Total = Total.toString();
										Total = Total.slice(0, (Total.indexOf(".")) + 4);

										absTotal = absTotal.toString();
										absTotal = absTotal.slice(0, (absTotal.indexOf(".")) + 4);

										TotalBS = TotalBS.toString();
										TotalBS = TotalBS.slice(0, (TotalBS.indexOf(".")) + 4);

										PrecioBS = PrecioBS.toString();
										PrecioBS = PrecioBS.slice(0, (PrecioBS.indexOf(".")) + 4);

										IvaBS = IvaBS.toString();
										IvaBS = IvaBS.slice(0, (IvaBS.indexOf(".")) + 4);

										cos_pro_unjs = cos_pro_unjs.toString();
										cos_pro_unjs = cos_pro_unjs.slice(0, (cos_pro_unjs.indexOf(".")) + 4);

										Precio = Number(Precio);
										Iva = Number(Iva);
										Total = Number(Total);
										cantUn = cantUn.toFixed(3);

										absTotal = Number(absTotal);

										TotalBS = Number(TotalBS);
										PrecioBS = Number(PrecioBS);
										IvaBS = Number(IvaBS);
										cos_pro_unjs = Number(cos_pro_unjs);

										var id_row = "row" + contNarc;

										var descripProrimsp1 = productos[j].art_des.trim();
										var datasp1 = "/";
										var datapo1 = "%";
										var datapl1 = "&";

										var dataProDistsp1 = descripProrimsp1.split(datasp1, "20");
										var datanew2 = String(dataProDistsp1);

										var dataProDesc = datanew2.split(datapo1, "20");
										var datanew3 = String(dataProDesc);

										var dataProdesc2 = datanew3.split(datapl1, "20");
										var datanew4 = String(dataProdesc2);

										var descripPro = datanew4.split("  ", "10");
										descripPro = String(descripPro);

										var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
											'"<div class="" role="tr">' +
											''
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + productos[j].co_art + '</td>'
											+ '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + descripPro.trim() + '</td>'
											+ '<input type="hidden" id="tipo_imp' + contNarc + '" value="' + productos[j].tipo_imp + '" >'
											+ '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  >' + cantUn + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
											+ '<input type="hidden" id="uni_venta' + contNarc + '" value="' + productos[j].uni_venta + '">'
										addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
											+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
										addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
											+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
										addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
											+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
										addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
											+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
										addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

										if (Precio < 1) {
											return;
										}
										NewEvidencia.append(addNarc);

										sumSueldo();

										var total_art = (parseFloat(productos[j].can_arg * person));
										total_art = total_art.toFixed(5);

										$("#selectEvidencia").focus();

										var nfac = $('#Nfactura').val();
										var tasa = $('#TasaTODAY').val();
										var co_cli = $('#cedcli').val();
										var co_art = co_artA;
										var cantidad = total_art;
										var uni_venta = productos[j].uni_venta.trim();
										var can_arg = productos[j].can_arg;
										var cos_pro_om = productos[j].cos_pro_om;
										var tipo = productos[j].tipo;
										var tipo_imp = productos[j].tipo_imp;
										var tot_bruto = $('#PrecioALL').val();
										var tot_neto = $('#MontoALL').val();
										var iva = $('#ivaALL').val();
										var reng_neto = $('#totalbs' + contNarc).val();
										var reng_num = contNarc;
										var cos_pro_un = cos_pro_unjs;
										var ivabs = $('#ivaALLBS').val();
										var monto_net = $('#MontoALLBS').val();
										var preciobru = $('#precioBru').val();


										if (uni_venta == '1/2') {
											uni_venta = 'medio';
										}
										$.ajax({
											type: 'POST',
											url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
											success: function() {

											}
										})
										ActuLoadData();
										contNarc++;
										return false;

									}

								}
								var filt002 = (filtrarProductosUND(productos, "002"));
								for (var v = 0; v < filt002.length; v++) {

									let person = pesocodPro;

									if (person > 0) {


										var Precio = (parseFloat(productos[j].cos_pro_om * person));
										Precio = Precio.toString();
										Precio = Precio.slice(0, (Precio.indexOf(".")) + 6);
										Precio = Number(Precio);


										var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
										PrecioUnid = PrecioUnid.toString();
										PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf(".")) + 6);
										PrecioUnid = Number(PrecioUnid);

										var Iva = 0;
										if (parseFloat(productos[j].tipo_imp) == 1) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 3) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 6) {
											var Iva = (parseFloat(PrecioUnid) * 0);
										}


										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);
										Iva = Number(Iva);

										var Total = (parseFloat(Iva + Precio));
										var absTotal = (parseFloat(Iva + PrecioUnid));
										var cantUn = parseFloat(productos[j].can_arg * person);

										var tasa_v = $('#TasaTODAY').val();
										tasa_v = tasa_v.toString();
										tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
										tasa_v = Number(tasa_v);

										var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

										var IvaBS = parseFloat(Iva * tasa_v);

										var PrecioBS = parseFloat(Precio * tasa_v);

										var TotalBS = parseFloat(absTotal * tasa_v);

										var co_artA = productos[j].co_art.trim();

										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);

										Total = Total.toString();
										Total = Total.slice(0, (Total.indexOf(".")) + 4);

										absTotal = absTotal.toString();
										absTotal = absTotal.slice(0, (absTotal.indexOf(".")) + 4);

										TotalBS = TotalBS.toString();
										TotalBS = TotalBS.slice(0, (TotalBS.indexOf(".")) + 4);

										PrecioBS = PrecioBS.toString();
										PrecioBS = PrecioBS.slice(0, (PrecioBS.indexOf(".")) + 4);

										IvaBS = IvaBS.toString();
										IvaBS = IvaBS.slice(0, (IvaBS.indexOf(".")) + 4);

										cos_pro_unjs = cos_pro_unjs.toString();
										cos_pro_unjs = cos_pro_unjs.slice(0, (cos_pro_unjs.indexOf(".")) + 4);

										Precio = Number(Precio);
										Iva = Number(Iva);
										Total = Number(Total);
										cantUn = cantUn.toFixed(3);

										absTotal = Number(absTotal);

										TotalBS = Number(TotalBS);
										PrecioBS = Number(PrecioBS);
										IvaBS = Number(IvaBS);
										cos_pro_unjs = Number(cos_pro_unjs);

										var id_row = "row" + contNarc;

										var descripProrimsp1 = productos[j].art_des.trim();
										var datasp1 = "/";
										var datapo1 = "%";
										var datapl1 = "&";

										var dataProDistsp1 = descripProrimsp1.split(datasp1, "20");
										var datanew2 = String(dataProDistsp1);

										var dataProDesc = datanew2.split(datapo1, "20");
										var datanew3 = String(dataProDesc);

										var dataProdesc2 = datanew3.split(datapl1, "20");
										var datanew4 = String(dataProdesc2);

										var descripPro = datanew4.split("  ", "10");
										descripPro = String(descripPro);



										var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
											'"<div class="" role="tr">' +
											''
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + productos[j].co_art + '</td>'
											+ '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + descripPro.trim() + '</td>'
											+ '<input type="hidden" id="tipo_imp' + contNarc + '" value="' + productos[j].tipo_imp + '" >'
											+ '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  >' + cantUn + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
											+ '<input type="hidden" id="uni_venta' + contNarc + '" value="' + productos[j].uni_venta + '">'
										addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
											+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
										addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
											+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
										addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
											+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
										addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'

											+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
										addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

										if (Precio < 1) {
											return;
										}
										NewEvidencia.append(addNarc);

										sumSueldo();

										var total_art = (parseFloat(productos[j].can_arg * person));
										total_art = total_art.toFixed(5);

										$("#selectEvidencia").focus();

										var nfac = $('#Nfactura').val();
										var tasa = $('#TasaTODAY').val();
										var co_cli = $('#cedcli').val();
										var co_art = co_artA;
										var cantidad = total_art;
										var uni_venta = productos[j].uni_venta.trim();
										var can_arg = productos[j].can_arg;
										var cos_pro_om = productos[j].cos_pro_om;
										var tipo = productos[j].tipo;
										var tipo_imp = productos[j].tipo_imp;
										var tot_bruto = $('#PrecioALL').val();
										var tot_neto = $('#MontoALL').val();
										var iva = $('#ivaALL').val();
										var reng_neto = $('#totalbs' + contNarc).val();
										var reng_num = contNarc;
										var cos_pro_un = cos_pro_unjs;
										var ivabs = $('#ivaALLBS').val();
										var monto_net = $('#MontoALLBS').val();
										var preciobru = $('#precioBru').val();


										if (uni_venta == '1/2') {
											uni_venta = 'medio';
										}
										$.ajax({
											type: 'POST',
											url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
											success: function() {

											}
										})
										ActuLoadData();
										contNarc++;
										return false;

									}

								}
								var filtdtaund = (filtrarProductosUND(productos, scannerVal3));
								for (var v = 0; v < filtdtaund.length; v++) {

									let person = "1";

									if (person > 0) {


										var Precio = (parseFloat(productos[j].cos_pro_om * person));
										Precio = Precio.toString();
										Precio = Precio.slice(0, (Precio.indexOf(".")) + 6);
										Precio = Number(Precio);


										var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
										PrecioUnid = PrecioUnid.toString();
										PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf(".")) + 6);
										PrecioUnid = Number(PrecioUnid);

										var Iva = 0;
										if (parseFloat(productos[j].tipo_imp) == 1) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 3) {
											var Iva = (parseFloat(PrecioUnid) * 0.16);
										}
										else if (parseFloat(productos[j].tipo_imp) == 6) {
											var Iva = (parseFloat(PrecioUnid) * 0);
										}


										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);
										Iva = Number(Iva);

										var Total = (parseFloat(Iva + Precio));
										var absTotal = (parseFloat(Iva + PrecioUnid));
										var cantUn = parseFloat(productos[j].can_arg * person);

										var tasa_v = $('#TasaTODAY').val();
										tasa_v = tasa_v.toString();
										tasa_v = tasa_v.slice(0, (tasa_v.indexOf(".")) + 6);
										tasa_v = Number(tasa_v);

										var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

										var IvaBS = parseFloat(Iva * tasa_v);

										var PrecioBS = parseFloat(Precio * tasa_v);

										var TotalBS = parseFloat(absTotal * tasa_v);

										var co_artA = productos[j].co_art.trim();

										Iva = Iva.toString();
										Iva = Iva.slice(0, (Iva.indexOf(".")) + 6);

										Total = Total.toString();
										Total = Total.slice(0, (Total.indexOf(".")) + 4);

										absTotal = absTotal.toString();
										absTotal = absTotal.slice(0, (absTotal.indexOf(".")) + 4);

										TotalBS = TotalBS.toString();
										TotalBS = TotalBS.slice(0, (TotalBS.indexOf(".")) + 4);

										PrecioBS = PrecioBS.toString();
										PrecioBS = PrecioBS.slice(0, (PrecioBS.indexOf(".")) + 4);

										IvaBS = IvaBS.toString();
										IvaBS = IvaBS.slice(0, (IvaBS.indexOf(".")) + 4);

										cos_pro_unjs = cos_pro_unjs.toString();
										cos_pro_unjs = cos_pro_unjs.slice(0, (cos_pro_unjs.indexOf(".")) + 3);

										Precio = Number(Precio);
										Iva = Number(Iva);
										Total = Number(Total);
										cantUn = cantUn.toFixed(3);

										absTotal = Number(absTotal);

										TotalBS = Number(TotalBS);
										PrecioBS = Number(PrecioBS);
										IvaBS = Number(IvaBS);
										cos_pro_unjs = Number(cos_pro_unjs);

										var id_row = "row" + contNarc;

										var descripProrimsp1 = productos[j].art_des.trim();
										var datasp1 = "/";
										var datapo1 = "%";
										var datapl1 = "&";

										var dataProDistsp1 = descripProrimsp1.split(datasp1, "20");
										var datanew2 = String(dataProDistsp1);

										var dataProDesc = datanew2.split(datapo1, "20");
										var datanew3 = String(dataProDesc);

										var dataProdesc2 = datanew3.split(datapl1, "20");
										var datanew4 = String(dataProdesc2);

										var descripPro = datanew4.split("  ", "10");
										descripPro = String(descripPro);

										var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
											'"<div class="" role="tr">' +
											''
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + productos[j].co_art + '</td>'
											+ '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + descripPro.trim() + '</td>'
											+ '<input type="hidden" id="tipo_imp' + contNarc + '" value="' + productos[j].tipo_imp + '" >'
											+ '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  onclick="return DatoProArt(id=' + contNarc + ');" >' + cantUn + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
											+ '<input type="hidden" id="uni_venta' + contNarc + '" value="' + productos[j].uni_venta + '">'
										addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
											+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
										addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
											+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
										addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
											+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
										addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'

											+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
										addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

										if (Precio < 1) {
											return;
										}
										NewEvidencia.append(addNarc);

										sumSueldo();

										var total_art = (parseFloat(productos[j].can_arg * person));
										total_art = total_art.toFixed(5);

										$("#selectEvidencia").focus();

										var nfac = $('#Nfactura').val();
										var tasa = $('#TasaTODAY').val();
										var co_cli = $('#cedcli').val();
										var co_art = co_artA;
										var cantidad = total_art;
										var uni_venta = productos[j].uni_venta.trim();
										var can_arg = productos[j].can_arg;
										var cos_pro_om = productos[j].cos_pro_om;
										var tipo = productos[j].tipo;
										var tipo_imp = productos[j].tipo_imp;
										var tot_bruto = $('#PrecioALL').val();
										var tot_neto = $('#MontoALL').val();
										var iva = $('#ivaALL').val();
										var reng_neto = $('#totalbs' + contNarc).val();
										var reng_num = contNarc;
										var cos_pro_un = cos_pro_unjs;
										var ivabs = $('#ivaALLBS').val();
										var monto_net = $('#MontoALLBS').val();
										var preciobru = $('#precioBru').val();


										if (uni_venta == '1/2') {
											uni_venta = 'medio';
										}
										$.ajax({
											type: 'POST',
											url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
											success: function() {

											}
										})
										ActuLoadData();
										contNarc++;
										return false;

									}

								}
							}

						}
						alert("NO SE ENCONTRARON REGISTROS DE " + co_artID);
						sumSueldo();
					}
				});

			} else {
				$("#selectEvidencia").focus();
				alert("Codigo de producto No registrado");
				$("#selectEvidencia").val("");
				$("#selectEvidencia").focus();
				ActuLoadData();
				sumSueldo();
				return false;
			}

		}
	});
	$("#SaveCaso").click(function() {
		if (contNarc == 0) {
			alert("Debe agregar productos");
			$("#selectEvidencia").focus();
			return false;
		}
	});

})
var campo = '';

function DeleteROW(id) {

	var filaid = document.getElementById("DeleteEvidNarc" + id);
	celda = filaid.getElementsByTagName("td");

	campo += '<div class="modal fade bd-example-modal-xl" id="DelRengFact' + id + '" tabindex="-1" role="dialog" aria-labelledby="DelRengFactTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="DelRengFactTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="btnDelRengFacClose' + id + '" name="btnDelRengFacClose' + id + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Se eliminara ' + celda[2].innerHTML + '</p></div><div><input class="btn btn-danger" type="button"  value="Eliminiar" id="DelRengFactCo' + id + '"></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div>';

	$('#DeleReng').html(campo);

	$("#DelRengFactCo" + id).focus();
	$("#DelRengFactCo" + id).click(function(event) {

		var person = $('#DelRengFactCo' + id).val();

		if (person && $("saldoBS").val() != 0) {

			$("#DeleteEvidNarc" + id).remove();
			$("#selectEvidencia").focus();


			sumSueldo();

			var nfac = $('#Nfactura').val();
			var reng_num = id;
			var tot_bruto = $('#PrecioALL').val();
			var tot_neto = $('#MontoALL').val();
			var iva = $('#ivaALL').val();
			var monto_bru = $('#precioBru').val();
			var monto_net = $('#MontoALLBS').val();
			var monto_imp = $('#ivaALLBS').val();
			var co_art = $('').val();
			var cantidad = $('').val();
			$("#DelRengFactCo" + id).val('');

			ActuLoadData();

			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/restappDele/nfac=' + nfac + '&reng_num=' + reng_num + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&monto_bru=' + monto_bru + '&monto_net=' + monto_net + '&monto_imp=' + monto_imp + '  ',
			})

			document.querySelector('button[name=btnDelRengFacClose' + id + ']').addEventListener('click', function(e) {
				e.preventDefault(e);
			})
			document.querySelector('button[name=btnDelRengFacClose' + id + ']').click();



		} else {

			return false;

		}

	});

}

function sumSueldo() {

	let total = 0;
	let ivaALL = 0;
	let precio = 0;
	let totalBS = 0;
	let conID = 0;
	const table = document.getElementById('NewEvidencia');

	for (let i = 0; i < table.rows.length; i++) {

		let rowValue = table.rows[i].cells[8].innerHTML;
		total = total + Number(rowValue);

		let rowValuetotalPreBS = table.rows[i].cells[7].innerHTML;
		totalBS = totalBS + Number(rowValuetotalPreBS);


		let rowValueIva = table.rows[i].cells[6].innerHTML;
		ivaALL = ivaALL + Number(rowValueIva);

		let rowValuePrecio = table.rows[i].cells[5].innerHTML;
		precio = precio + Number(rowValuePrecio);

	}

	var tdTotal = $('#MontoALL').val();
	tdTotal.textContent = total;

	total = total.toString();
	total = total.slice(0, (total.indexOf(".")) + 4);
	total = Number(total);

	var tdIva = $('#ivaALLBS').val();
	tdIva.textContent = ivaALL;

	ivaALL = ivaALL.toString();
	ivaALL = ivaALL.slice(0, (ivaALL.indexOf(".")) + 4);
	ivaALL = Number(ivaALL);

	var tdPrecio = $("#precioBru").val();
	tdPrecio.textContent = precio;

	precio = precio.toString();
	precio = precio.slice(0, (precio.indexOf(".")) + 4);
	precio = Number(precio);

	var tdTotalBS = $("#MontoALLBS").val();
	tdTotalBS.textContent = precio;

	totalBS = totalBS.toString();
	totalBS = totalBS.slice(0, (totalBS.indexOf(".")) + 3);
	totalBS = Number(totalBS);

	var precioBrureal = parseFloat(Number(totalBS) - Number(ivaALL));
	precioBrureal = precioBrureal.toString();
	precioBrureal = precioBrureal.slice(0, (precioBrureal.indexOf(".")) + 4)

	$("#MontoALL").val(total);
	$('#ivaALLBS').val(ivaALL);
	$("#precioBru").val(precioBrureal);
	$("#MontoALLBS").val(totalBS);
	$("#contadoID").val(conID);


	$('#cobMontDolPri').val(total);
	$('#MontdolCob').val(total);

	var tasa = $('#TasaTODAY').val();
	$('#tasaCob').val(tasa);

	var iva$ = parseFloat(ivaALL / tasa);

	iva$ = iva$.toString();
	iva$ = iva$.slice(0, (iva$.indexOf(".")) + 3);
	iva$ = Number(iva$);
	$('#ivaALL').val(iva$);

	tasa = tasa.toString();
	tasa = tasa.slice(0, (tasa.indexOf(".")) + 3);
	tasa = Number(tasa);

	var precioALL$ = parseFloat(precioBrureal / tasa);

	precioALL$ = precioALL$.toString();
	precioALL$ = precioALL$.slice(0, (precioALL$.indexOf(".")) + 4);
	precioALL$ = Number(precioALL$);
	$('#PrecioALL').val(precioALL$);

	var totalALL$ = parseFloat(Number(precioALL$) + Number(iva$));

	totalALL$ = totalALL$.toString();
	totalALL$ = totalALL$.slice(0, (totalALL$.indexOf(".")) + 4);
	totalALL$ = Number(totalALL$);

	$("#MontoALL").val(totalALL$);

	$('#CobPaALLbs').val(totalBS);
	$('#CobPaALLusd').val(total);


	ActuLoadData();
}


function DatoProArt(id) {

	var tasa = $('#TasaTODAY').val();
	var filaid = document.getElementById("DeleteEvidNarc" + id);
	celda = filaid.getElementsByTagName("td");

	$('#ivabs' + id).val();
	$('#totalbs' + id).val();
	$('#abstotal' + id).val();
	$('#preciobslis' + id).val();

	var personPres = parseFloat(prompt("Cantidad de " + $('#desc_art' + id).val()));

	if (personPres > 0) {

		personPres = personPres.toFixed(3);
		celda[3].innerHTML = personPres;

		var precio_in = $('#preciobslis' + id).val();
		precio_in = precio_in.toString();
		precio_in = precio_in.slice(0, (precio_in.indexOf(".")) + 4)

		var presAll = parseFloat($('#preciobslis' + id).val() * personPres);
		presAll = presAll.toFixed(2);

		var ivaAll = parseFloat($('#ivabs' + id).val() * personPres);
		ivaAll = ivaAll.toFixed(3);

		var presTotNet = (parseFloat($('#totalbs' + id).val() * personPres));
		presTotNet = presTotNet.toFixed(3);

		var presTotNetUSD = parseFloat($('#abstotal' + id).val() * personPres);
		presTotNetUSD = presTotNetUSD.toFixed(3);

		celda[5].innerHTML = precio_in;
		celda[6].innerHTML = ivaAll;
		celda[7].innerHTML = presTotNet;
		celda[8].innerHTML = presTotNetUSD;
		$("#selectEvidencia").focus();

		sumSueldo();
		ActuLoadData();

		var nfac = $('#Nfactura').val();
		var reng_num = id;
		var total_art = personPres;
		var tot_brutobs = $('#precioBru').val();
		var tot_netobs = $('#MontoALLBS').val();
		var ivabs = $('#ivaALLBS').val();
		var tot_brutousd = $('#PrecioALL').val();
		var tot_netousd = $('#MontoALL').val();
		var ivausd = $('#ivaALL').val();
		var presart = parseFloat($('#totalbs' + id).val() * personPres);

		presart = presart.toString();
		presart = presart.slice(0, (presart.indexOf(".")) + 3);

		presart = Number(presart);

		$.ajax({
			type: 'POST',
			url: 'api/ajaxrest/updaterengfac/nfac=' + nfac + '&reng_num=' + reng_num + '&total_art=' + total_art + '&tot_brutobs=' + tot_brutobs + '&tot_netobs=' + tot_netobs + '&ivabs=' + ivabs + '&tot_brutousd=' + tot_brutousd + '&tot_netousd=' + tot_netousd + '&ivausd=' + ivausd + '&presart=' + presart + '    ',
			success: function() { }
		});


	} else {
		return false;
	}


}

function cobEfecBS() {
	try {
		var tasa = $('#TasaTODAY').val();
		var a = parseFloat(document.getElementById("MontoCobbs").value) || 0,
			b = parseFloat(document.getElementById("MontClibs").value) || 0,
			c = parseFloat(document.getElementById("resulcobBS").value) || 0,
			d = parseFloat(document.getElementById("resulcobBSus").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXbs').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXusd').value) || 0,
			entrecli = parseFloat(document.getElementById('cobEntcliBS').value) || 0,
			cobEntcliBS = parseFloat(document.getElementById('cobEntcliBS').value) || 0,
			conEntcliUSD = parseFloat(document.getElementById('cobEntcliUSD').value) || 0;

		if (a > b) {
			$('#MontoCobbs').val(saldoBS);
		}

		var resulefecbs = document.getElementById("resulcobBS").value = parseFloat(saldoBS - a);

		resulefecbs = resulefecbs.toFixed(2);
		document.getElementById("resulcobBS").value = resulefecbs;

		var resulUSDefec = parseFloat(resulefecbs / tasa);
		var resulefecbsus = document.getElementById("resulcobBSus").value = parseFloat(resulUSDefec);

		resulefecbsus = resulefecbsus.toFixed(2);
		document.getElementById("resulcobBSus").value = resulefecbsus;

		var resEntUS = parseFloat(conEntcliUSD * tasa);

		document.getElementById('resuBS').value = (b - a - cobEntcliBS - resEntUS).toFixed(2);
		var resuDol = parseFloat(b - a);
		var resuDol2 = parseFloat(resuDol / tasa);
		resuDol = resuDol.toFixed(2);

		var resEnt = parseFloat(cobEntcliBS / tasa);
		document.getElementById('resuUSD').value = (resuDol2 - resEnt - conEntcliUSD).toFixed(2);

		ActuLoadData();


	} catch (e) {
		alert(e);
	}

}

function cobEfecUSD() {
	try {
		var tasa = $('#TasaTODAY').val();
		var tasaeur = $('#todayEUR').val();
		var a = parseInt(document.getElementById("MontoCobUSusd").value) || 0,
			b = parseFloat(document.getElementById("MontoCliUSusd").value) || 0,
			c = parseFloat(document.getElementById("resulcobUSbs").value) || 0,
			d = parseFloat(document.getElementById("resulcobUSusd").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXUSbs').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXUSusd').value) || 0,
			coresvuBS = parseFloat(document.getElementById('cobresvubs').value) || 0,
			cobresvuUSD = parseFloat(document.getElementById('cobresvuusd').value) || 0,
			cobresvuEUR = parseFloat(document.getElementById('cobresvueur').value) || 0,
			cobEntvubs = parseFloat(document.getElementById('cobEntvubs').value) || 0,
			cobEntvuusd = parseInt(document.getElementById('cobEntvuusd').value) || 0,
			cobEntvueur = parseInt(document.getElementById('cobEntvueur').value) || 0;


		if ((Number(document.getElementById("MontoCobUSusd").value) > Number(document.getElementById("MontoCliUSusd").value) || Number(document.getElementById("MontoCobUSusd").value) > Number(saldoUSD))) {

			document.getElementById("MontoCobUSusd").value = (parseFloat(saldoUSD * 1));
		}

		if (document.getElementById("MontoCobUSusd").value < document.getElementById("valMAXUSusd").value) {
			document.getElementById("MontoCobUSusd").value = parseInt(Number(document.getElementById("MontoCobUSusd").value) * 1)
		}




		var resulefecbs = document.getElementById("resulcobUSusd").value = parseFloat(document.getElementById("valMAXUSusd").value - document.getElementById("MontoCobUSusd").value);

		document.getElementById("resulcobUSusd").value = (resulefecbs);
		var resulbs = parseFloat(document.getElementById("MontoCobUSusd").value * tasa);


		document.getElementById("resulcobUSbs").value = (document.getElementById("resulcobUSusd").value * tasa);

		var restDebs = parseFloat(saldoBS - resulbs);
		var restDeusd = (resulefecbs);

		var vuresusd = parseFloat(document.getElementById("MontoCliUSusd").value - document.getElementById("MontoCobUSusd").value);

		document.getElementById("resulcobUSbs").value = document.getElementById("resulcobUSbs").value.toString();
		document.getElementById("resulcobUSbs").value = document.getElementById("resulcobUSbs").value.slice(0, (document.getElementById("resulcobUSbs").value.indexOf(".")) + 3);
		document.getElementById("resulcobUSbs").value = Number(document.getElementById("resulcobUSbs").value);

		document.getElementById("resulcobUSusd").value = document.getElementById("resulcobUSusd").value.toString();
		document.getElementById("resulcobUSusd").value = document.getElementById("resulcobUSusd").value.slice(0, (document.getElementById("resulcobUSusd").value.indexOf(".")) + 3);
		document.getElementById("resulcobUSusd").value = Number(document.getElementById("resulcobUSusd").value);


		var uscoverus = parseFloat(Number(document.getElementById("cobEntvuusd").value) * tasa);

		var uscoveeurp = parseFloat(Number(document.getElementById("cobEntvuusd").value) * tasa);
		var uscoveeur = parseFloat(uscoveeurp / tasaeur);

		var eurcovebs = parseFloat(Number(document.getElementById("cobEntvueur").value) * tasaeur);

		var eurcoveusp = parseFloat(Number(document.getElementById("cobEntvueur").value) * tasaeur);
		var eurcoveus = parseFloat(eurcoveusp / tasa);

		var bsconverus = parseFloat(vuresusd - document.getElementById("cobEntvubs").value / tasa);
		var bscovereur = parseFloat(document.getElementById("cobEntvubs").value / tasaeur);

		var vuresbs = parseFloat(vuresusd * tasa);
		document.getElementById("cobresvubs").value = (vuresbs - cobEntvubs - uscoverus - eurcovebs);

		document.getElementById("cobresvubs").value = document.getElementById("cobresvubs").value.toString();
		document.getElementById("cobresvubs").value = document.getElementById("cobresvubs").value.slice(0, (document.getElementById("cobresvubs").value.indexOf(".")) + 3);
		document.getElementById("cobresvubs").value = Number(document.getElementById("cobresvubs").value);

		document.getElementById("cobresvuusd").value = (bsconverus - Number(document.getElementById("cobEntvuusd").value) - eurcoveus);

		document.getElementById("cobresvuusd").value = document.getElementById("cobresvuusd").value.toString();
		document.getElementById("cobresvuusd").value = document.getElementById("cobresvuusd").value.slice(0, (document.getElementById("cobresvuusd").value.indexOf(".")) + 3);
		document.getElementById("cobresvuusd").value = Number(document.getElementById("cobresvuusd").value);

		var vureseur = parseFloat(vuresbs / tasaeur);
		document.getElementById("cobresvueur").value = (vureseur - bscovereur - uscoveeur - cobEntvueur);

		document.getElementById("cobresvueur").value = document.getElementById("cobresvueur").value.toString();
		document.getElementById("cobresvueur").value = document.getElementById("cobresvueur").value.slice(0, (document.getElementById("cobresvueur").value.indexOf(".")) + 3);
		document.getElementById("cobresvueur").value = Number(document.getElementById("cobresvueur").value);



		ActuLoadData();

	} catch (e) {
		console.log(e);

	}

}

function cobEfecEUR() {

	try {
		var tasa = $('#todayEUR').val();
		var tasad = $('#TasaTODAY').val();
		var tasaeur = $('#todayEUR').val();

		var a = parseFloat(document.getElementById("MontoCobUSusdeur").value) || 0,
			b = parseFloat(document.getElementById("MontoCliUSusdeur").value) || 0,
			c = parseFloat(document.getElementById("resulcobUSbseur").value) || 0,
			d = parseFloat(document.getElementById("resulcobUSusdeur").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXUSbse').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXUSusde').value) || 0,

			coresvuBS = parseFloat(document.getElementById('cobresvubseur').value) || 0,
			cobresvuUSD = parseFloat(document.getElementById('cobresvuusdeur').value) || 0,
			cobresvuEUR = parseFloat(document.getElementById('cobresvueureur').value) || 0,
			cobEntvubs = parseFloat(document.getElementById('cobEntvubseur').value) || 0,
			cobEntvuusd = parseInt(document.getElementById('cobEntvuusdeur').value) || 0,
			cobEntvueur = parseInt(document.getElementById('cobEntvueureur').value) || 0;

		if (a > b) {
			return document.getElementById("MontoCobUSusdeur").value = "";
		}
		var resulefecbs = document.getElementById("resulcobUSusdeur").value = parseFloat(saldoUSD - a);
		document.getElementById("resulcobUSusdeur").value = (resulefecbs).toFixed(2);

		var resulefecbs2 = document.getElementById("resulcobUSusdeur").value;
		var resulUSDefec = parseFloat(resulefecbs2 * tasa);

		var resulbs = parseFloat(a * tasa);
		document.getElementById("resulcobUSbseur").value = (saldoBS - resulbs).toFixed(2);


		var vuresusd = parseFloat(b - a);

		var bsconverus = parseFloat(cobEntvubs / tasad);
		var bscovereur = parseFloat(cobEntvubs / tasaeur);

		var uscoverus = parseFloat(cobEntvuusd * tasad);

		var uscoveeurp = parseFloat(cobEntvuusd * tasad);
		var uscoveeur = parseFloat(uscoveeurp / tasaeur);

		var eurcovebs = parseFloat(cobEntvueur * tasaeur);

		var eurcoveusp = parseFloat(cobEntvueur * tasaeur);
		var eurcoveus = parseFloat(eurcoveusp / tasad);

		var vuresbs = parseFloat(vuresusd * tasa);
		var vureseur = parseFloat(vuresbs / tasaeur);

		var vuresbs2 = parseFloat(vuresusd * tasaeur);
		var vureseur2 = parseFloat(vuresbs2 / tasad);

		document.getElementById('cobresvuusdeur').value = (vureseur2 - bsconverus - cobEntvuusd - eurcoveus).toFixed(2);
		document.getElementById('cobresvubseur').value = (vuresbs - cobEntvubs - uscoverus - eurcovebs).toFixed(2);
		document.getElementById('cobresvueureur').value = (vureseur - bscovereur - uscoveeur - cobEntvueur).toFixed(2);


		ActuLoadData();
	} catch (e) {
		console.log(e);
	}

}

function cobPagoMoBS() {
	try {
		var tasa = $('#TasaTODAY').val();
		var a = parseFloat(document.getElementById("MontoCobbsPM").value) || 0,
			b = parseFloat(document.getElementById("MontClibsPM").value) || 0,
			c = parseFloat(document.getElementById("resulcobBSPM").value) || 0,
			d = parseFloat(document.getElementById("resulcobBSusPM").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXbsPM').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXusdPM').value) || 0;


		var resulefecbs = document.getElementById("resulcobBSPM").value = parseFloat(saldoBS - a);

		resulefecbs = resulefecbs.toFixed(2);
		document.getElementById("resulcobBSPM").value = resulefecbs;

		var resulUSDefec = parseFloat(resulefecbs / tasa);
		var resulefecbsus = document.getElementById("resulcobBSusPM").value = parseFloat(resulUSDefec);

		resulefecbsus = resulefecbsus.toFixed(2);
		document.getElementById("resulcobBSusPM").value = resulefecbsus;

		document.getElementById('resuBSPM').value = (b - saldoBS).toFixed(2);
		var resuDol = parseFloat(b / tasa);
		resuDol = resuDol.toFixed(2);

		document.getElementById('resuUSDPM').value = (resuDol - saldoUSD).toFixed(2);
		ActuLoadData();

	} catch (e) {
		console.log(e);
	}

}

function cobPuntoVentaBS() {
	try {
		var tasa = $('#TasaTODAY').val();
		var a = parseFloat(document.getElementById("MontoCobbsPV").value) || 0,
			b = parseFloat(document.getElementById("MontClibsPV").value) || 0,
			c = parseFloat(document.getElementById("resulcobBSPV").value) || 0,
			d = parseFloat(document.getElementById("resulcobBSusPV").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXbsPV').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXusdPV').value) || 0;


		var resulefecbs = document.getElementById("resulcobBSPV").value = parseFloat(saldoBS - a);

		resulefecbs = resulefecbs.toFixed(2);
		document.getElementById("resulcobBSPV").value = resulefecbs;

		var resulUSDefec = parseFloat(resulefecbs / tasa);

		var resulefecbsus = document.getElementById("resulcobBSusPV").value = parseFloat(resulUSDefec);

		resulefecbsus = resulefecbsus.toFixed(2);
		document.getElementById("resulcobBSusPV").value = resulefecbsus;




		document.getElementById('resuBSPV').value = (b - a).toFixed(2);
		var resuDol1 = parseFloat(b - a);
		var resuDol = parseFloat(resuDol1 / tasa);



		document.getElementById('resuUSDPV').value = (resuDol).toFixed(2);
		ActuLoadData();

	} catch (e) {
		console.log(e);
	}

}

function cobTransferBS() {
	try {
		var tasa = $('#TasaTODAY').val();
		var a = parseFloat(document.getElementById("MontoCobbsTF").value) || 0,
			b = parseFloat(document.getElementById("MontClibsTF").value) || 0,
			c = parseFloat(document.getElementById("resulcobBSTF").value) || 0,
			d = parseFloat(document.getElementById("resulcobBSusTF").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXbsTF').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXusdTF').value) || 0;


		var resulefecbs = document.getElementById("resulcobBSTF").value = parseFloat(saldoBS - a);

		resulefecbs = resulefecbs.toFixed(2);
		document.getElementById("resulcobBSTF").value = resulefecbs;

		var resulUSDefec = parseFloat(resulefecbs / tasa);

		var resulefecbsus = document.getElementById("resulcobBSusTF").value = parseFloat(resulUSDefec);

		resulefecbsus = resulefecbsus.toFixed(2);
		document.getElementById("resulcobBSusTF").value = resulefecbsus;




		document.getElementById('resuBSTF').value = (b - saldoBS).toFixed(2);
		var resuDol = parseFloat(b / tasa);
		resuDol = resuDol.toFixed(2);




		document.getElementById('resuUSDTF').value = (resuDol - saldoUSD).toFixed(2);
		ActuLoadData();


	} catch (e) {
		console.log(e);
	}

}

function cobBiopagoBS() {
	try {
		var tasa = $('#TasaTODAY').val();
		var a = parseFloat(document.getElementById("MontoCobbsBP").value) || 0,
			b = parseFloat(document.getElementById("MontClibsBP").value) || 0,
			c = parseFloat(document.getElementById("resulcobBSBP").value) || 0,
			d = parseFloat(document.getElementById("resulcobBSusBP").value) || 0,
			saldoBS = parseFloat(document.getElementById('valMAXbsBP').value) || 0,
			saldoUSD = parseFloat(document.getElementById('valMAXusdBP').value) || 0;


		var resulefecbs = document.getElementById("resulcobBSBP").value = parseFloat(saldoBS - a);

		resulefecbs = resulefecbs.toFixed(2);
		document.getElementById("resulcobBSBP").value = resulefecbs;

		var resulUSDefec = parseFloat(resulefecbs / tasa);

		var resulefecbsus = document.getElementById("resulcobBSusBP").value = parseFloat(resulUSDefec);

		resulefecbsus = resulefecbsus.toFixed(2);
		document.getElementById("resulcobBSusBP").value = resulefecbsus;




		document.getElementById('resuBSBP').value = (b - saldoBS).toFixed(2);
		var resuDol = parseFloat(b / tasa);
		resuDol = resuDol.toFixed(2);



		document.getElementById('resuUSDBP').value = (resuDol - saldoUSD).toFixed(2);
		ActuLoadData();


	} catch (e) {
		console.log(e);
	}

}


function SelectPro(id) {
	var contNarc = 0;
	$("#searchFilter").val("");

	var filaid = document.getElementById("selectProTr" + id);
	celda = filaid.getElementsByTagName("td");

	const table = document.getElementById('NewEvidencia');
	var NewEvidencia = $("#NewEvidencia");
	for (let i = 0; i < table.rows.length; i++) {

		let rowValue = table.rows[i].cells[0].innerHTML;
		contNarc = Number(rowValue);
		if (contNarc == '') {
			contNarc = 0;
		}
	}
	var contNarc = contNarc + 1;

	var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
		'"<div class="" role="tr">' +
		''
	addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
	addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + celda[1].innerHTML + '</td>'
		+ '<input   id="co_art' + contNarc + '"  value="' + celda[5].innerHTML + '"     type="hidden"  >'
	addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> ' + celda[2].innerHTML + '</td>'
		+ '<input type="hidden" id="tipo_imp' + contNarc + '" value="' + $("#tipo_impId" + id).val() + '" >'
		+ '<input type="hidden" name="desc_art" value="' + celda[2].innerHTML + '" id="desc_art' + contNarc + '" >'
	addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  >' + celda[5].innerHTML + '</td>'
	addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + celda[3].innerHTML + '</td>'
	addNarc += '<td scope="row" title="' + celda[4].innerHTML + ' $" style="font-weight:bold;font-size:9pt;">' + celda[4].innerHTML + '</td>'
		+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + celda[4].innerHTML + '" >'
	addNarc += '<td id="Iva" scope="row" title="' + celda[6].innerHTML + ' $" style="font-weight:bold;font-size:9pt;">' + celda[6].innerHTML + '</td>'
		+ '<input type="hidden" value="' + celda[6].innerHTML + '" id="ivabs' + contNarc + '" >'
	addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + celda[7].innerHTML + '</td>'
		+ '<input type="hidden" value="' + celda[7].innerHTML + '" id="totalbs' + contNarc + '" >'
	addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + celda[8].innerHTML + '</td>'
		+ '<input type="hidden" value="' + celda[8].innerHTML + '" id="abstotal' + contNarc + '">'
	addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

	NewEvidencia.append(addNarc);


	sound.play();
	sumSueldo();

	var nfac = $('#Nfactura').val();
	var tasa = $('#TasaTODAY').val();
	var co_cli = $('#cedcli').val();
	var co_art = $("#co_artId" + id).val();
	var cantidad = celda[5].innerHTML;
	var uni_venta = celda[3].innerHTML.trim();
	var can_arg = 1;
	var cos_pro_om = celda[8].innerHTML;
	var tipo = $("#tipo_Id" + id).val();
	var tipo_imp = $("#tipo_impId" + id).val();
	var tot_bruto = $('#PrecioALL').val();
	var tot_neto = $('#MontoALL').val();
	var iva = $('#ivaALL').val();
	var reng_neto = $('#totalbs' + contNarc).val();
	var reng_num = contNarc;
	var cos_pro_un = celda[7].innerHTML;
	var ivabs = $('#ivaALLBS').val();
	var monto_net = $('#MontoALLBS').val();
	var preciobru = $('#precioBru').val();


	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
		success: function() {

		}
	})
	ActuLoadData();

}

function ListProConOn(id) {

	var tasa = $('#TasaTODAY').val();
	var filaid = document.getElementById("selectProTr" + id);
	celda = filaid.getElementsByTagName("td");

	var canti = 0;
	var iva = 0;
	var presUS$ = 0;
	var pres = $('#precioVent' + id).val();
	var presUsd = $('#totalProUSD' + id).val();
	var ivabsc = $("#ivaProLis" + id).val();

	var personPres = parseFloat(prompt("Cantidad de " + $('#art_desList' + id).val()));
	if (personPres > 0) {

		var ivaAll = parseFloat(personPres * ivabsc);
		var totbru = parseFloat(personPres * pres);
		var totaAl = parseFloat(totbru + Number(ivaAll));
		var totbrusd = parseFloat(personPres * presUsd);
		var totalusd = parseFloat(totaAl / tasa);

		totbru = totbru.toString();
		totbru = totbru.slice(0, (totbru.indexOf(".")) + 4);
		totbru = Number(totbru);

		personPres = personPres.toString();
		personPres = personPres.slice(0, (personPres.indexOf(".")) + 4);
		personPres = Number(personPres);

		ivaAll = ivaAll.toString();
		ivaAll = ivaAll.slice(0, (ivaAll.indexOf(".")) + 4);
		ivaAll = Number(ivaAll);

		totaAl = totaAl.toString();
		totaAl = totaAl.slice(0, (totaAl.indexOf(".")) + 4);
		totaAl = Number(totaAl);

		totalusd = totalusd.toString();
		totalusd = totalusd.slice(0, (totalusd.indexOf(".")) + 4);
		totalusd = Number(totalusd);


		celda[4].innerHTML = celda[4].innerHTML;
		celda[5].innerHTML = personPres.toFixed(3);
		celda[6].innerHTML = ivaAll;
		celda[7].innerHTML = totaAl;
		celda[8].innerHTML = totalusd;

		ActuLoadData();
	} else {
		return false;
	}

}

function DeleteRowPag(id) {

	var filaid = document.getElementById("trCob" + id);
	celda = filaid.getElementsByTagName("td");
	if (confirm("!Se eliminara el Cobro N° " + celda[0].innerHTML + " ?" + "\nCobro en : " + celda[3].innerHTML)) {
		var dataNumFact = $("#Nfactura").val();
		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/DeleteRowPag/dataNumFact=' + dataNumFact + '&reng_cobRow=' + id + '&cob_numRow=' + celda[1].innerHTML + ' ',
			dataType: 'json',
			contentType: 'application/json',
			success: function(resulData) {
				ActuLoadData();
			}
		})
		ActuLoadData();
	} else {
		return false;
	}
}

function registrodatacli(e) {
	var ceddataclie = $("#cedDatacli").val();
	var data = ceddataclie.substring(1, -1);

	var datarazoncli = $("#razonsodata").val();
	var dataclirazon = datarazoncli.substring(1, -1);


	if (data == "N" || data == "1" || data == "2" || data == "3" || data == "4" || data == "5" || data == "6"
		|| data == "7" || data == "8" || data == "9") {
		alert("!!!NUMERO DE DOCUMENTO NO ES VALIDO");
		event.preventDefault(e);
	}
	if (dataclirazon == ";" || dataclirazon == "" || dataclirazon == " " || dataclirazon == "@" || dataclirazon == "." || dataclirazon == "-"
		|| dataclirazon == "'" || dataclirazon == ":" || dataclirazon == ")" || dataclirazon == "(" || dataclirazon == "!"
		|| dataclirazon == "?" || dataclirazon == "%" || dataclirazon == "$" || dataclirazon == "#" || dataclirazon == "&" || dataclirazon == "/"
		|| dataclirazon == "¿" || dataclirazon == "}" || dataclirazon == "{" || dataclirazon == "´" || dataclirazon == "¨" || dataclirazon == "["
		|| dataclirazon == "]") {

		alert("!CARACTERES NO VALIDOS EN LA RAZON SOCIAL");
		event.preventDefault(e);

	}


}







