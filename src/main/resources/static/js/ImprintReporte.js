$(document).ready(function() {




	$("#ReimpfacUlt").click(function() {
		var campoAnufac = "";
		var accessIde = "sw1n86v1@.GREB";

		campoAnufac += '<div class="modal fade bd-example-modal-xl" id="ReimpfacUlti" tabindex="-1" role="dialog" aria-labelledby="ReimpfacUltiTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="ReimpfacUltiTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeReimpfacUlti" name="closeReimpfacUlti" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper1" id="idsuper1"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

		$('#reimpulti').html(campoAnufac);

		$("#btn-anufac").click(function() {
			if ($("#idsuper1").val() == "") {
				return false;
			}
			else {

				var pARAM_VALUE = $("#idsuper1").val();
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
								$("#idsuper1").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (co_vens == '2') {
								$("#idsuper1").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (pARAM_VALUES == pARAM_VALUE) {
								$("#idsuper1").val("");

								$.ajax({
									type: 'GET',
									url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrint/dataprint=' + accessIde + ' ',
									dataType: 'json',
									contentType: 'application/json',
									success: function(resultdata) {
										for (var i = 0; i < resultdata.length; i++) {
											if (resultdata[i].dataResult == 'sw1n86v1@.GREB') {
												alert("La Factura se imprime correctamente");
												document.querySelector('button[name=closeReimprimirFact]').addEventListener('click', function(e) {
													e.preventDefault(e);
												})
												document.querySelector('button[name=closeReimprimirFact]').click();
											}
										}
									}
								})

								document.querySelector('button[name=closeReimpfacUlti]').addEventListener('click', function(e) {
									e.preventDefault(e);
								})
								document.querySelector('button[name=closeReimpfacUlti]').click();

							}

						}
					}

				});
			}
		});

		$("#idsuper1").keydown(function(event) {
			if ((event.keyCode == 13)) {
				if ($("#idsuper1").val() == "") {
					return false;
				}
				else {

					var pARAM_VALUE = $("#idsuper1").val();
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
									$("#idsuper1").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (co_vens == '2') {
									$("#idsuper1").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (pARAM_VALUES == pARAM_VALUE) {
									$("#idsuper1").val("");

									$.ajax({
										type: 'GET',
										url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrint/dataprint=' + accessIde + ' ',
										dataType: 'json',
										contentType: 'application/json',
										success: function(resultdata) {
											for (var i = 0; i < resultdata.length; i++) {
												if (resultdata[i].dataResult == 'sw1n86v1@.GREB') {
													alert("La Factura se imprime correctamente");
													document.querySelector('button[name=closeReimprimirFact]').addEventListener('click', function(e) {
														e.preventDefault(e);
													})
													document.querySelector('button[name=closeReimprimirFact]').click();
												}
											}
										}
									})

									document.querySelector('button[name=closeReimpfacUlti]').addEventListener('click', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closeReimpfacUlti]').click();

								}

							}
						}

					});
				}

			}
		});

	})

	$("#ReimpriXnum").click(function() {
		var campoAnufac = "";
		var accessIdrang = $("#numfact").val();

		if ($("#numfact").val() != "" || $("#numfact").val() > 0) {
			$("#numfact").val("");

			campoAnufac += '<div class="modal fade bd-example-modal-xl" id="ReimpriXnumi" tabindex="-1" role="dialog" aria-labelledby="ReimpriXnumiTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="ReimpriXnumiTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeReimpriXnumi" name="closeReimpriXnumi" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper2" id="idsuper2"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

			$('#reimpulti').html(campoAnufac);

			$("#btn-anufac").click(function() {
				if ($("#idsuper2").val() == "") {
					return false;
				}
				else {

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

									$.ajax({
										type: 'GET',
										url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintRang/dataprintRang=' + accessIdrang + ' ',
										dateType: 'json',
										contentype: 'application/json',
										success: function(resultdata) {
											for (var i = 0; i < resultdata.length; i++) {
												if (resultdata[i].dataResultRan == 'sw1n86v1@.GREB') {
													alert("La Factura se imprime correctamente");

													document.querySelector('button[name=closeReimprimirFact]').addEventListener('click', function(e) {
														e.preventDefault(e);
													})
													document.querySelector('button[name=closeReimprimirFact]').click();
												}
											}
										}
									})

									document.querySelector('button[name=closeReimpriXnumi]').addEventListener('click', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closeReimpriXnumi]').click();

								}

							}
						}

					});
				}
			});

			$("#idsuper2").keydown(function(event) {
				if ((event.keyCode == 13)) {
					if ($("#idsuper2").val() == "") {
						return false;
					}
					else {

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

										$.ajax({
											type: 'GET',
											url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintRang/dataprintRang=' + accessIdrang + ' ',
											dateType: 'json',
											contentype: 'application/json',
											success: function(resultdata) {
												for (var i = 0; i < resultdata.length; i++) {
													if (resultdata[i].dataResultRan == 'sw1n86v1@.GREB') {
														alert("La Factura se imprime correctamente");

														document.querySelector('button[name=closeReimprimirFact]').addEventListener('click', function(e) {
															e.preventDefault(e);
														})
														document.querySelector('button[name=closeReimprimirFact]').click();
													}
												}
											}
										})

										document.querySelector('button[name=closeReimpriXnumi]').addEventListener('click', function(e) {
											e.preventDefault(e);
										})
										document.querySelector('button[name=closeReimpriXnumi]').click();

									}

								}
							}

						});
					}

				}
			});


		} else {
			return false;
		}
	})

	$("#ReporteXx").click(function() {
		var campoAnufac = "";
		var accessIdreportx = "sw1n86v1@.GREB";

		campoAnufac += '<div class="modal fade bd-example-modal-xl" id="ReporteXxi" tabindex="-1" role="dialog" aria-labelledby="ReporteXxiTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="ReporteXxiTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeReporteXxi" name="closeReporteXxi" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper3" id="idsuper3"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

		$('#reporteXxi').html(campoAnufac);

		$("#btn-anufac").click(function() {
			if ($("#idsuper3").val() == "") {
				return false;
			}
			else {

				var pARAM_VALUE = $("#idsuper3").val();
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
								$("#idsuper3").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (co_vens == '2') {
								$("#idsuper3").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (pARAM_VALUES == pARAM_VALUE) {
								$("#idsuper3").val("");

								$.ajax({
									data: 'GET',
									url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteX/dataprintReporteX=' + accessIdreportx + ' ',
									dataType: 'json',
									contentType: 'apllication/json',
									success: function(resultdata) {
										for (var i = 0; i < resultdata.length; i++) {
											if (resultdata[i].dataResultReportX == 'sw1n86v1@.GREB') {
												alert("El reporte X se imprime correctamente");

												document.querySelector('button[name=closeReportex]').addEventListener('click', function(e) {
													e.preventDefault(e);
												})
												document.querySelector('button[name=closeReportex]').click();
											}
										}
									}
								})

								document.querySelector('button[name=closeReporteXxi]').addEventListener('click', function(e) {
									e.preventDefault(e);
								})
								document.querySelector('button[name=closeReporteXxi]').click();

							}

						}
					}

				});
			}
		});

		$("#idsuper3").keydown(function(event) {
			if ((event.keyCode == 13)) {
				if ($("#idsuper3").val() == "") {
					return false;
				}
				else {

					var pARAM_VALUE = $("#idsuper3").val();
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
									$("#idsuper3").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (co_vens == '2') {
									$("#idsuper3").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (pARAM_VALUES == pARAM_VALUE) {
									$("#idsuper3").val("");

									$.ajax({
										data: 'GET',
										url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteX/dataprintReporteX=' + accessIdreportx + ' ',
										dataType: 'json',
										contentType: 'apllication/json',
										success: function(resultdata) {
											for (var i = 0; i < resultdata.length; i++) {
												if (resultdata[i].dataResultReportX == 'sw1n86v1@.GREB') {
													alert("El reporte X se imprime correctamente");

													document.querySelector('button[name=closeReportex]').addEventListener('click', function(e) {
														e.preventDefault(e);
													})
													document.querySelector('button[name=closeReportex]').click();
												}
											}
										}
									})

									document.querySelector('button[name=closeReporteXxi]').addEventListener('click', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closeReporteXxi]').click();

								}

							}
						}

					});
				}

			}
		});


	})

	$("#btn-ReportZ").click(function() {
		var campoAnufac = "";
		var accessIdreportz = "sw1n86v1@.GREB";

		campoAnufac += '<div class="modal fade bd-example-modal-xl" id="btn-ReportZi" tabindex="-1" role="dialog" aria-labelledby="btn-ReportZiTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="btn-ReportZiTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closebtn-ReportZi" name="closebtn-ReportZi" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper4" id="idsuper4"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

		$('#btn-reportZi').html(campoAnufac);

		$("#btn-anufac").click(function() {
			if ($("#idsuper4").val() == "") {
				return false;
			}
			else {

				var pARAM_VALUE = $("#idsuper4").val();
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
								$("#idsuper4").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (co_vens == '2') {
								$("#idsuper4").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (pARAM_VALUES == pARAM_VALUE) {
								$("#idsuper4").val("");

								$.ajax({
									type: 'GET',
									url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteZ/dataprintReporteZ=' + accessIdreportz + ' ',
									dataType: 'json',
									contentType: 'application/json',
									success: function(resultdata) {
										for (var i = 0; i < resultdata.length; i++) {
											if (resultdata[i].dataResultReportZ == 'sw1n86v1@.GREB') {
												alert("El reporte Z se imprime correctamente");

												document.querySelector('button[name=closeReportez]').addEventListener('click', function(e) {
													e.preventDefault(e);
												})
												document.querySelector('button[name=closeReportez]').click();
											}
										}
									}
								})

								document.querySelector('button[name=closebtn-ReportZi]').addEventListener('click', function(e) {
									e.preventDefault(e);
								})
								document.querySelector('button[name=closebtn-ReportZi]').click();

							}

						}
					}

				});
			}
		});

		$("#idsuper4").keydown(function(event) {
			if ((event.keyCode == 13)) {
				if ($("#idsuper4").val() == "") {
					return false;
				}
				else {

					var pARAM_VALUE = $("#idsuper4").val();
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
									$("#idsuper4").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (co_vens == '2') {
									$("#idsuper4").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (pARAM_VALUES == pARAM_VALUE) {
									$("#idsuper4").val("");

									$.ajax({
										type: 'GET',
										url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteZ/dataprintReporteZ=' + accessIdreportz + ' ',
										dataType: 'json',
										contentType: 'application/json',
										success: function(resultdata) {
											for (var i = 0; i < resultdata.length; i++) {
												if (resultdata[i].dataResultReportZ == 'sw1n86v1@.GREB') {
													alert("El reporte Z se imprime correctamente");

													document.querySelector('button[name=closeReportez]').addEventListener('click', function(e) {
														e.preventDefault(e);
													})
													document.querySelector('button[name=closeReportez]').click();
												}
											}
										}
									})

									document.querySelector('button[name=closebtn-ReportZi]').addEventListener('click', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closebtn-ReportZi]').click();

								}

							}
						}

					});
				}

			}
		});


	})


	$("#Cajaclose").click(function() {

		var campoAnufac = "";

		var idco_vendata = $("#co_venID").val();

		campoAnufac += '<div class="modal fade bd-example-modal-xl" id="Cajaclosei" tabindex="-1" role="dialog" aria-labelledby="CajacloseiTitle" aria-hidden="true">	<div class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="CajacloseiTitle"><img src="/images/bloqueardo.png" height="25px"width="25px" /> Llave Asignada</h5><button type="button" class="close" id="closeCajaclosei" name="closeCajaclosei" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class=""><div class="col-12 mt-5"><h5>Grebca ©</h5><br><p>!Clave de supervisor : </p></div><div><input type="password" class="form-control" name="idsuper5" id="idsuper5"><input class="btn btn-danger" type="button"  value="Confirmar" id="btn-anufac"></div></div></div></br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><form action="/GrebcaCCS" method="POST" ><input type="hidden" name="co_venCO"  value="' + $("#co_venID").val() + '"id="co_venIDs" ><button type="submit" class="btn btn-danger " id="closePrin" name="closePrin" style="background-color:transparent;border-style:none;"></button></form></div>';

		$('#cajaclosei').html(campoAnufac);

		$("#btn-anufac").click(function() {
			if ($("#idsuper5").val() == "") {
				return false;
			}
			else {

				var pARAM_VALUE = $("#idsuper5").val();
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
								$("#idsuper5").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (co_vens == '2') {
								$("#idsuper5").val("");
								alert(pARAM_VALUES + " " + nfactu);
							}
							else if (pARAM_VALUES == pARAM_VALUE) {
								$("#idsuper5").val("");

								$.ajax({
									type: 'POST',
									url: '/api/ajaxrest/infobackupcobroscierrecaja/infocajadata=' + idco_vendata + ' ',
									dataType: 'json',
									contentType: 'application/json',
									success: function(resultdata) {
										for (var i = 0; i < resultdata.length; i++) {
											console.log(resultdata[i].caja1 + " : " + resultdata[i].monto1 + "\n" + resultdata[i].caja2 + " : " + resultdata[i].monto2 +
												"\n" + resultdata[i].caja3 + " : " + resultdata[i].monto3 + "\n" + resultdata[i].cantFact + " " + resultdata[i].factAnulada + " " + resultdata[i].factOpen + " " + resultdata[i].co_ven);

											$.ajax({
												data: 'GET',
												url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteC/monto1=' + resultdata[i].monto1 + '&monto2=' + resultdata[i].monto2 + '&monto3=' + resultdata[i].monto3 + '&caj1=' + resultdata[i].caja1 + '&caj2=' + resultdata[i].caja2 + '&caj3=' + resultdata[i].caja3 + '&cantImpre=' + resultdata[i].cantFact + '&factNull=' + resultdata[i].factAnulada + '&factOpen=' + resultdata[i].factOpen + '&idcovend=' + resultdata[i].co_ven + ' ',
												dataType: 'json',
												contentType: 'application/json',
												success: function(resultAjax) {
													for (var i = 0; i < resultAjax.length; i++) {
														if (resultAjax[i].dataResultReportC == 'sw1n86v1@.GREB') {
															alert("El reporte de cierre de caja se imprime correctamente");

															document.querySelector('button[name=closeCierrecaja]').addEventListener('click', function(e) {
																e.preventDefault(e);
															})
															document.querySelector('button[name=closeCierrecaja]').click();
														}
													}
												}
											})
										}

									}

								})

								document.querySelector('button[name=closeCajaclosei]').addEventListener('click', function(e) {
									e.preventDefault(e);
								})
								document.querySelector('button[name=closeCajaclosei]').click();

							}

						}
					}

				});
			}
		});

		$("#idsuper5").keydown(function(event) {
			if ((event.keyCode == 13)) {
				if ($("#idsuper5").val() == "") {
					return false;
				}
				else {

					var pARAM_VALUE = $("#idsuper5").val();
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
									$("#idsuper5").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (co_vens == '2') {
									$("#idsuper5").val("");
									alert(pARAM_VALUES + " " + nfactu);
								}
								else if (pARAM_VALUES == pARAM_VALUE) {
									$("#idsuper5").val("");

									$.ajax({
										type: 'POST',
										url: '/api/ajaxrest/infobackupcobroscierrecaja/infocajadata=' + idco_vendata + ' ',
										dataType: 'json',
										contentType: 'application/json',
										success: function(resultdata) {
											for (var i = 0; i < resultdata.length; i++) {
												console.log(resultdata[i].caja1 + " : " + resultdata[i].monto1 + "\n" + resultdata[i].caja2 + " : " + resultdata[i].monto2 +
													"\n" + resultdata[i].caja3 + " : " + resultdata[i].monto3 + "\n" + resultdata[i].cantFact + " " + resultdata[i].factAnulada + " " + resultdata[i].factOpen + " " + resultdata[i].co_ven);

												$.ajax({
													data: 'GET',
													url: 'https://192.168.10.147:2599/PrinterFiscalPACO/accessURLconexPrintReporteC/monto1=' + resultdata[i].monto1 + '&monto2=' + resultdata[i].monto2 + '&monto3=' + resultdata[i].monto3 + '&caj1=' + resultdata[i].caja1 + '&caj2=' + resultdata[i].caja2 + '&caj3=' + resultdata[i].caja3 + '&cantImpre=' + resultdata[i].cantFact + '&factNull=' + resultdata[i].factAnulada + '&factOpen=' + resultdata[i].factOpen + '&idcovend=' + resultdata[i].co_ven + ' ',
													dataType: 'json',
													contentType: 'application/json',
													success: function(resultAjax) {
														for (var i = 0; i < resultAjax.length; i++) {
															if (resultAjax[i].dataResultReportC == 'sw1n86v1@.GREB') {
																alert("El reporte de cierre de caja se imprime correctamente");

																document.querySelector('button[name=closeCierrecaja]').addEventListener('click', function(e) {
																	e.preventDefault(e);
																})
																document.querySelector('button[name=closeCierrecaja]').click();
															}
														}
													}
												})
											}

										}

									})

									document.querySelector('button[name=closeCajaclosei]').addEventListener('click', function(e) {
										e.preventDefault(e);
									})
									document.querySelector('button[name=closeCajaclosei]').click();

								}

							}
						}

					});
				}

			}
		});



	})


})