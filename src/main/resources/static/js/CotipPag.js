$(document).ready(function() {


	function readyGT() {

		var nfac = $('#Nfactura').val();
		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/ActuDataPagos/&nfac=' + nfac + ' ',
			dataType: 'json',
			contentType: 'application/json',

			success: function(dataPag) {
				var pag = '';
				var cob_num = '';
				/*<![CDATA[*/
				for (var p = 0; p < dataPag.length; p++) {


					pag += "<tr style='background-color:rgb(20,20,20);color:green;' id='trCob" + dataPag[p].reng_num + "'>"
					pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].reng_num + "</td>";
					pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].cob_num + "</td>";
					pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;' >" + dataPag[p].mont_doc.toFixed(2) + "</td>";
					pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].des_caja + "</td>";
					pag += "<td><button id='btn-delecPag" + dataPag[p].reng_num + "' onclick='return DeleteRowPag(id=" + dataPag[p].reng_num + ");' class=' ' style='width:15px;height:15px;background-color:rgb(255,0,0);cursor:pinter;' ></button></td>";
					pag += "</tr>";


					cob_num = dataPag[p].cob_num;

				}
				/*]]>*/
				$("#tbPagosRengTip").html(pag);
				$("#idCob_numRengTip").val(cob_num);

			}
		});

	}

	contNarc = 1;

	$('#btncobBS').click(function() {
		ActuLoadData();

		

		if ($("#MontoCobbs").val() < 0 || $("#MontClibs").val() < 0 || $("#cobEntcliBS").val() < 0 || $("#cobEntcliUSD").val() < 0) {
			alert("!ADVERTERCIA: No se permite campos con valores negativo");
			return false;
		}
		if ($("#resuBS").val() > 0 || $("#resuUSD").val() > 0) {
			alert("!Monto pendiente por entregar al cliente");
			return false;
		}
		if($("#resulcobBS").val() < 0 || $("#resulcobBSus").val() < 0 ){
			alert("!SALDO NEGATIVO");
			return false;
		}

		if (confirm("Desea realizar el cobro de " + $('#MontoCobbs').val() + " " + $('#MonedaBSD').val() + "?") == true) {

			contNarc = 1;

			var iDcaja = $('#CajaEfecBSD').val();
			var descriptBSD = $('#DescripBSD').val();
			var monedaBSD = $('#MonedaBSD').val();

			if ($('#MontoCobbs').val() == '') {
				$('#MontoCobbs').val('0');
			}
			if ($('#MontClibs').val() == '') {
				$('#MontClibs').val('0');
			}


			var montoaCob = $('#MontoCobbs').val();
			var montoEntxCli = $('#MontClibs').val();



			var newSaldoBS = $('#resulcobBS').val();
			var newSaldoUSD = $('#resulcobBSus').val();

			var rsVueltoBS = $('#resuBS').val();
			var rsVueltoUSD = $('#resuUSD').val();


			if ($('#cobEntcliBS').val() == '') {
				$('#cobEntcliBS').val('0');
			}
			if ($('#cobEntcliUSD').val() == '') {
				$('#cobEntcliUSD').val('0');
			}

			var vueltoEntCliBS = $('#cobEntcliBS').val();
			var vueltoEntCliUSD = $('#cobEntcliUSD').val();

			var co_cli = $('#cedcli').val();
			var cli_desc = $('#OnDOC').val();
			var fact_num = $('#Nfactura').val();
			var mont_brutBS = $('#precioBru').val();
			var mont_netBS = $('#MontoALLBS').val();
			var ivaBS = $('#ivaALLBS').val();
			var mont_brutUSD = $('#PrecioALL').val();
			var mont_netUSD = $('#MontoALL').val();
			var ivaUSD = $('#ivaALL').val();
			var tasa = $('#TasaTODAY').val();

			var tbMonedaid = $('#tbMonedaid').val();
			var tbMonedacambio = $('#tbMonedacambio').val();

			var idMoneUSD = $('#idMoneUSD').val();

			var co_venIden = $("#co_venID").val();


			if (montoaCob != null, montoEntxCli != null) {
				ActuLoadData();
				console.log(
					iDcaja.trim()
					+ " / " + descriptBSD.trim()
					+ " / " + monedaBSD.trim()

					+ " / " + montoaCob
					+ " / " + montoEntxCli

					+ " / " + newSaldoBS
					+ " / " + newSaldoUSD

					+ " / " + rsVueltoBS
					+ " / " + rsVueltoUSD

					+ " / " + vueltoEntCliBS
					+ " / " + vueltoEntCliUSD + " / " + contNarc
					+ " / " + co_cli
					+ " / " + cli_desc
					+ " / " + fact_num
					+ " / " + mont_brutBS
					+ " / " + mont_netBS
					+ " / " + ivaBS
					+ " / " + mont_brutUSD
					+ " / " + mont_netUSD
					+ " / " + ivaUSD
					+ " / " + tasa
					+ " / " + tbMonedaid
					+ " / " + tbMonedacambio
					+ " / " + idMoneUSD);

				iDcaja = iDcaja.trim()
				descriptBSD = descriptBSD.trim()
				monedaBSD = monedaBSD.trim()
				tbMonedaid = tbMonedaid.trim()
				tbMonedacambio = tbMonedacambio.trim()
				idMoneUSD = idMoneUSD.trim()
				montoaCob = Number(montoaCob);

				var cob_num = $('#idCob_numRengTip').val();
				var moneda = $('#tbMonedaid').val();
				var monedaus = $('#idMoneUSD').val();

		
				$.ajax({
					type: 'POST',
					url: '/api/ajaxrest/CobEfectBS/iDcaja=' + iDcaja + '&descriptBSD=' + descriptBSD + '&monedaBSD=' + monedaBSD + '&montoaCob=' + montoaCob + '&montoEntxCli=' + montoEntxCli + '&newSaldoBS=' + newSaldoBS + '&newSaldoUSD=' + newSaldoUSD + '&rsVueltoBS=' + rsVueltoBS + '&rsVueltoUSD=' + rsVueltoUSD + '&vueltoEntCliBS=' + vueltoEntCliBS + '&vueltoEntCliUSD=' + vueltoEntCliUSD + '&contNarc=' + contNarc + '&co_cli=' + co_cli + '&cli_desc=' + cli_desc + '&fact_num=' + fact_num + '&mont_brutBS=' + mont_brutBS + '&mont_netBS=' + mont_netBS + '&ivaBS=' + ivaBS + '&mont_brutUSD=' + mont_brutUSD + '&mont_netUSD=' + mont_netUSD + '&ivaUSD=' + ivaUSD + '&tasa=' + tasa + '&tbMonedaid=' + tbMonedaid + '&tbMonedacambio=' + tbMonedacambio + '&idMoneUSD=' + idMoneUSD + '&co_venIden=' + co_venIden + ' ',
					dataType: 'json',
					contentType: 'application/json',
					success: function(resultcobBS) {
						for (var i = 0; i < resultcobBS.length; i++) {
							
							document.getElementById("pagadoBSD").value = resultcobBS[i].montoEntxCli;

							var pag = '';
							var cob_num = '';
							var montoEntxClis = '';

							console.log(montoEntxClis);
							$('#pagadoBSD').val(resultcobBS[i].montoEntxCli);
							/*<![CDATA[*/
							for (var p = 0; p < resultcobBS.length; p++) {


								pag += "<tr style='background-color:rgb(20,20,20);color:green;' id='trCob" + resultcobBS[i].iDcaja + "'>"
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultcobBS[i].iDcaja + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultcobBS[i].descriptBSD + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;' >" + resultcobBS[i].monedaBSD.toFixed(2) + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultcobBS[i].montoaCob + "</td>";
								pag += "<td><button id='btn-delecPag" + resultcobBS[i].iDcaja + "' onclick='return DeleteRowPag(id=" + resultcobBS[i].iDcaja + ");' class=' ' style='width:15px;height:15px;background-color:rgb(255,0,0);cursor:pinter;' ></button></td>";
								pag += "<input type ='hidden' id='sumsBS' name='sumsBS' " + resultcobBS[i].montoEntxCli + ">";
								pag += "</tr>";


								cob_num = resultcobBS[i].descriptBSD;
								montoEntxClis = resultcobBS[i].montoEntxCli;


							}

							/*]]>*/
							$("#tbPagosRengTip").html(pag);
							$("#idCob_numRengTip").val(cob_num);

							var nfac = $('#Nfactura').val();
							var tasas = $('#TasaTODAY').val();
							var tasaEU = $('#todayEUR').val();

							$.ajax({

								type: 'POST',
								url: '/api/ajaxrest/InfoFacEntyModel/nfac=' + nfac + ' ',
								dataType: 'json',
								contentType: 'application/json',
								success: function(result) {

									for (var f = 0; f < result.length; f++) {
										var saldo = result[f].saldo;
										var saldous = parseFloat(result[f].saldo / tasas);

										saldous = saldous.toString();
										saldous = saldous.slice(0, (saldous.indexOf(".")) + 5);
										saldous = Number(saldous);

										$('#saldoBS').val(saldo);
										$("#saldoUSD").val(saldous);

										$('#valMAXbs').val(saldo);
										$('#valMAXusd').val(saldous);

										$('#valMAXUSbs').val(saldo);
										$('#valMAXUSusd').val(saldous);

										var saldoeu = parseFloat(result[f].saldo / tasaEU);

										saldoeu = saldoeu.toString();
										saldoeu = saldoeu.slice(0, (saldoeu.indexOf(".")) + 5);
										saldoeu = Number(saldoeu);

										$('#valMAXUSbse').val(saldo);
										$('#valMAXUSusde').val(saldoeu);

										$('#valMAXbsPM').val(saldo);
										$('#valMAXusdPM').val(saldous);

										$('#valMAXbsPV').val(saldo);
										$('#valMAXusdPV').val(saldous);

										$('#valMAXbsTF').val(saldo);
										$('#valMAXusdTF').val(saldous);

										$('#valMAXbsBP').val(saldo);
										$('#valMAXusdBP').val(saldous);

									}
								}

							});
							var cob_num = $('#idCob_numRengTip').val();
							var moneda = $('#tbMonedaid').val();


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


						}

					}
				})

				ActuLoadData();


				$('#MontoCobbs').val('');
				$('#MontClibs').val('');

				$('#resulcobBS').val('0.00');
				$('#resulcobBSus').val('0.00');

				$('#resuBS').val('0.00');
				$('#resuUSD').val('0.00');

				$('#cobEntcliBS').val('0');
				$('#cobEntcliUSD').val('0');



				document.querySelector('button[name=btnCloseCobNameEfecBS]').addEventListener('click', function(e) {
					e.preventDefault(e);
				})
				document.querySelector('button[name=btnCloseCobNameEfecBS]').click();


				$("#btnCloseCobNameEfecBS").click(function() {

					document.querySelector('button[name=UpdateRegistroCob]').addEventListener('click', function(e) {
						e.preventDefault(e);
					})
					document.querySelector('button[name=UpdateRegistroCob]').click();
				})





				contNarc++;

			}
		} else {
			return false;
		}
	});





	$('#btncobBSPV').click(function() {
		ActuLoadData();
		contNarc = 1;


		if ($("#MontoCobbsPV").val() < 0 || $("#MontClibsPV").val() < 0 || $("#resuBSPV").val() < 0 || $("#resuUSDPV").val() < 0) {
			alert("!ADVERTERCIA: No se permite campos con valores negativo");
			return false;
		}
		if($("#nroDocumPV").val() == "" ){
			return false
		}

		if($("#resulcobBSPV").val() < 0 || $("#resulcobBSusPV").val() < 0 ){
			alert("!SALDO NEGATIVO");
			return false;
		}

		if (confirm("Desea realizar el cobro de " + $('#MontoCobbsPV').val() + " " + $('#MonedaPuntoPV').val() + "?") == true) {

			var iDCajaPV = $('#CajaPuntoPV').val();
			var descripPuntoPV = $('#DescripPuntoPV').val();
			var monedaPuntoPV = $('#MonedaPuntoPV').val();

			var nroDocumPV = $('#nroDocumPV').val();

			var co_tar = $('#co_tar').val();
			var des_tar = $('#des_tar').val();

			if ($('#MontoCobbsPV').val() == '') {
				$('#MontoCobbsPV').val('0')
			}
			if ($('#MontClibsPV').val() == '') {
				$('#MontClibsPV').val('0')
			}
			var montoCobbsPV = $('#MontoCobbsPV').val();
			var montClibsPV = $('#MontClibsPV').val();

			var resulcobBSPV = $('#resulcobBSPV').val();
			var resulcobBSUSPV = $('#resulcobBSusPV').val();

			var resuBSPV = $('#resuBSPV').val();
			var resuUSDPV = $('#resuUSDPV').val();

			var co_cli = $('#cedcli').val();
			var cli_desc = $('#OnDOC').val();
			var fact_num = $('#Nfactura').val();
			var mont_brutBS = $('#precioBru').val();
			var mont_netBS = $('#MontoALLBS').val();
			var ivaBS = $('#ivaALLBS').val();
			var mont_brutUSD = $('#PrecioALL').val();
			var mont_netUSD = $('#MontoALL').val();
			var ivaUSD = $('#ivaALL').val();
			var tasa = $('#TasaTODAY').val();

			var tbMonedaid = $('#tbMonedaid').val();
			var tbMonedacambio = $('#tbMonedacambio').val();

			var idMoneUSD = $('#idMoneUSD').val();

			var co_venIden = $("#co_venID").val();

			if (montoCobbsPV != null && montClibsPV != null) {
				console.log(
					iDCajaPV.trim()
					+ " / " + descripPuntoPV.trim()
					+ " / " + monedaPuntoPV
					+ " / " + nroDocumPV
					+ " / " + co_tar.trim()
					+ " / " + des_tar.trim()
					+ " / " + montoCobbsPV
					+ " / " + montClibsPV
					+ " / " + resulcobBSPV
					+ " / " + resulcobBSUSPV
					+ " / " + resuBSPV
					+ " / " + resuUSDPV
					+ " / " + co_cli
					+ " / " + cli_desc
					+ " / " + fact_num
					+ " / " + mont_brutBS
					+ " / " + mont_netBS
					+ " / " + ivaBS
					+ " / " + mont_brutUSD
					+ " / " + mont_netUSD
					+ " / " + ivaUSD
					+ " / " + tasa
					+ " / " + tbMonedaid.trim()
					+ " / " + tbMonedacambio
					+ " / " + idMoneUSD
				);

				iDCajaPV = iDCajaPV.trim()
				descripPuntoPV = descripPuntoPV.trim()
				co_tar = co_tar.trim()
				des_tar = des_tar.trim()
				tbMonedaid = tbMonedaid.trim()

				$.ajax({
					type: 'POST',
					url: '/api/ajaxrest/cobPuntVenBSD/&contNarc=' + contNarc + '&iDCajaPV=' + iDCajaPV + '&descripPuntoPV=' + descripPuntoPV + '&monedaPuntoPV=' + monedaPuntoPV + '&nroDocumPV=' + nroDocumPV + '&co_tar=' + co_tar + '&des_tar=' + des_tar + '&montoCobbsPV=' + montoCobbsPV + '&montClibsPV=' + montClibsPV + '&resulcobBSPV=' + resulcobBSPV + '&resulcobBSUSPV=' + resulcobBSUSPV + '&resuBSPV=' + resuBSPV + '&resuUSDPV=' + resuUSDPV + '&co_cli=' + co_cli + '&cli_desc=' + cli_desc + '&fact_num=' + fact_num + '&mont_brutBS=' + mont_brutBS + '&mont_netBS=' + mont_netBS + '&ivaBS=' + ivaBS + '&mont_brutUSD=' + mont_brutUSD + '&mont_netUSD=' + mont_netUSD + '&ivaUSD=' + ivaUSD + '&tasa=' + tasa + '&tbMonedaid=' + tbMonedaid + '&tbMonedacambio=' + tbMonedacambio + '&idMoneUSD=' + idMoneUSD + '&co_venIden=' + co_venIden + '   ',
					dateType: 'json',
					contentType: 'application/json',
					success: function(resultspv) {
						SumCobAdd();
						for (var i = 0; i < resultspv.length; i++) {
							
							var pag = '';
							var cob_num = '';
							/*<![CDATA[*/
							for (var p = 0; p < resultspv.length; p++) {


								pag += "<tr style='background-color:rgb(20,20,20);color:green;' id='trCob" + resultspv[i].contNarc + "'>"
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultspv[i].contNarc + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultspv[i].iDCajaPV + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;' >" + resultspv[i].descripPuntoPV.toFixed(2) + "</td>";
								pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + resultspv[i].monedaPuntoPV + "</td>";
								pag += "<td><button id='btn-delecPag" + resultspv[i].contNarc + "' onclick='return DeleteRowPag(id=" + resultspv[i].contNarc + ");' class=' ' style='width:15px;height:15px;background-color:rgb(255,0,0);cursor:pinter;' ></button></td>";
								pag += "</tr>";

								cob_num = resultcobBS[i].iDCajaPV;

							}
							/*]]>*/
							$("#tbPagosRengTip").html(pag);
							$("#idCob_numRengTip").val(cob_num);

							$('#pagadoBSD').val(resultcobBS[i].nroDocumPV);


							var nfac = $('#Nfactura').val();
							var tasas = $('#TasaTODAY').val();
							var tasaEU = $('#todayEUR').val();

							$.ajax({

								type: 'POST',
								url: '/api/ajaxrest/InfoFacEntyModel/nfac=' + nfac + ' ',
								dataType: 'json',
								contentType: 'application/json',
								success: function(result) {

									for (var f = 0; f < result.length; f++) {
										var saldo = result[f].saldo;
										var saldous = parseFloat(result[f].saldo / tasas);

										saldous = saldous.toString();
										saldous = saldous.slice(0, (saldous.indexOf(".")) + 5);
										saldous = Number(saldous);

										$('#saldoBS').val(saldo);
										$("#saldoUSD").val(saldous);

										$('#valMAXbs').val(saldo);
										$('#valMAXusd').val(saldous);

										$('#valMAXUSbs').val(saldo);
										$('#valMAXUSusd').val(saldous);

										var saldoeu = parseFloat(result[f].saldo / tasaEU);

										saldoeu = saldoeu.toString();
										saldoeu = saldoeu.slice(0, (saldoeu.indexOf(".")) + 5);
										saldoeu = Number(saldoeu);

										$('#valMAXUSbse').val(saldo);
										$('#valMAXUSusde').val(saldoeu);

										$('#valMAXbsPM').val(saldo);
										$('#valMAXusdPM').val(saldous);

										$('#valMAXbsPV').val(saldo);
										$('#valMAXusdPV').val(saldous);

										$('#valMAXbsTF').val(saldo);
										$('#valMAXusdTF').val(saldous);

										$('#valMAXbsBP').val(saldo);
										$('#valMAXusdBP').val(saldous);
									}
								}
							});

						}

						ActuLoadData();
					}
				})
				ActuLoadData();

				$("#MontoCobbsPV").val('');
				$("#MontClibsPV").val('');

				$("#resulcobBSPV").val('0.00');
				$("#resulcobBSusPV").val('0.00');

				$("#nroDocumPV").val("");

				document.querySelector('button[name=btnCloseCobNamePV]').addEventListener('click', function(e) {
					e.preventDefault(e);
				})
				document.querySelector('button[name=btnCloseCobNamePV]').click();



				contNarc++;
			}
		} else {
			return false;
		}
	})

	$("#btncobUSD").click(function() {
		ActuLoadData();
		contNarc = 1;

		if ($("#cobresvubs").val() < 0 || $("#cobresvuusd").val() < 0 || $("#cobEntvubs").val() < 0 || $("#cobEntvuusd").val() < 0) {
			alert("!ADVERTERCIA: No se permite campos con valores negativo");
			return false;
		}
		if ($("#cobresvubs").val() > 0 || $("#cobresvuusd").val() > 0) {
			alert("!Monto pendiente por entregar al cliente");
			return false;
		}

		if (confirm("Desea realizar el cobro de " + $("#MontoCobUSusd").val() + " " + $("#MonedaUSD").val() + " ?") == true) {


			var cajaEfecUSD = $("#CajaEfecUSD").val();
			var descripUSD = $("#DescripUSD").val();
			var monedaUSD = $("#MonedaUSD").val();
			if ($("#MontoCobUSusd").val() == '') {
				$("#MontoCobUSusd").val('0');
			}
			if ($("#MontoCliUSusd").val() == '') {
				$("#MontoCliUSusd").val('0');
			}

			var montoCobUSusd = $("#MontoCobUSusd").val();
			var montoCliUSusd = $("#MontoCliUSusd").val();

			var resulcobUSbs = $("#resulcobUSbs").val();
			var resulcobUSusd = $("#resulcobUSusd").val();

			if ($('#cobEntvubs').val() == '') {
				$('#cobEntvubs').val('0');
			}
			if ($('#cobEntvuusd').val() == '') {
				$('#cobEntvuusd').val('0');
			}
			if ($('#cobEntvueur').val() == '') {
				$('#cobEntvueur').val('0');
			}
			var cobEntvubs = $("#cobEntvubs").val();
			var cobEntvuusd = $("#cobEntvuusd").val();
			var cobEntvueur = $("#cobEntvueur").val();

			var co_cli = $('#cedcli').val();
			var cli_desc = $('#OnDOC').val();
			var fact_num = $('#Nfactura').val();
			var mont_brutBS = $('#precioBru').val();
			var mont_netBS = $('#MontoALLBS').val();
			var ivaBS = $('#ivaALLBS').val();
			var mont_brutUSD = $('#PrecioALL').val();
			var mont_netUSD = $('#MontoALL').val();
			var ivaUSD = $('#ivaALL').val();
			var tasa = $('#TasaTODAY').val();
			var co_mone = $('#idMoneUSD').val();

			var co_venIden = $("#co_venID").val();

			console.log(
				CajaEfecUSD
				+ " / " + DescripUSD
				+ " / " + MonedaUSD

				+ " / " + MontoCobUSusd
				+ " / " + MontoCliUSusd

				+ " / " + resulcobUSbs
				+ " / " + resulcobUSusd

				+ " / " + cobEntvubs
				+ " / " + cobEntvuusd
				+ " / " + cobEntvueur

				+ " / " + co_cli
				+ " / " + cli_desc
				+ " / " + fact_num
				+ " / " + mont_brutBS
				+ " / " + mont_netBS
				+ " / " + ivaBS
				+ " / " + mont_brutUSD
				+ " / " + mont_netUSD
				+ " / " + ivaUSD
				+ " / " + tasa
				+ " / " + co_mone);

			cajaEfecUSD = cajaEfecUSD.trim();
			descripUSD = descripUSD.trim();
			monedaUSD = monedaUSD.trim();
			montoCobUSusd = Number(montoCobUSusd);


			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/CobEfecUSD/&contNarc=' + contNarc + '&cajaEfecUSD=' + cajaEfecUSD + '&descripUSD=' + descripUSD + '&monedaUSD=' + monedaUSD + '&montoCobUSusd=' + montoCobUSusd + '&montoCliUSusd=' + montoCliUSusd + '&resulcobUSbs=' + resulcobUSbs + '&resulcobUSusd=' + resulcobUSusd + '&cobEntvubs=' + cobEntvubs + '&cobEntvuusd=' + cobEntvuusd + '&cobEntvueur=' + cobEntvueur + '&co_cli=' + co_cli + '&cli_desc=' + cli_desc + '&fact_num=' + fact_num + '&mont_brutBS=' + mont_brutBS + '&mont_netBS=' + mont_netBS + '&ivaBS=' + ivaBS + '&mont_brutUSD=' + mont_brutUSD + '&mont_netUSD=' + mont_netUSD + '&ivaUSD=' + ivaUSD + '&tasa=' + tasa + '&co_mone=' + co_mone + '&co_venIden=' + co_venIden + '   ',
				dataType: 'json',
				contentType: 'application/json',
				success: function(result) {
					for (var f = 0; f < result.length; f++) {

						var pag = '';
						var cob_num = '';
						/*<![CDATA[*/
						for (var p = 0; p < result.length; p++) {


							pag += "<tr style='background-color:rgb(20,20,20);color:green;' id='trCob" + result[i].contNarc + "'>"
							pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + result[i].contNarc + "</td>";
							pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + result[i].cajaEfecUSD + "</td>";
							pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;' >" + (result[i].descripUSD).toFixed(2)+ "</td>";
							pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + result[i].monedaUSD + "</td>";
							pag += "<td><button id='btn-delecPag" + result[i].contNarc + "' onclick='return DeleteRowPag(id=" + result[i].contNarc + ");' class=' ' style='width:15px;height:15px;background-color:rgb(255,0,0);cursor:pinter;' ></button></td>";
							pag += "</tr>";

							cob_num = result[i].cajaEfecUSD;

						}
						/*]]>*/
						$("#tbPagosRengTip").html(pag);
						$("#idCob_numRengTip").val(cob_num);

						$('#pagadoBSD').val(result[i].montoCobUSusd);


						var nfac = $('#Nfactura').val();
						var tasas = $('#TasaTODAY').val();
						var tasaEU = $('#todayEUR').val();

						$.ajax({

							type: 'POST',
							url: '/api/ajaxrest/InfoFacEntyModel/nfac=' + nfac + ' ',
							dataType: 'json',
							contentType: 'application/json',
							success: function(result) {

								for (var f = 0; f < result.length; f++) {
									var saldo = result[f].saldo;
									var saldous = parseFloat(result[f].saldo / tasas);

									saldous = saldous.toString();
									saldous = saldous.slice(0, (saldous.indexOf(".")) + 5);
									saldous = Number(saldous);

									$('#saldoBS').val(saldo);
									$("#saldoUSD").val(saldous);

									$('#valMAXbs').val(saldo);
									$('#valMAXusd').val(saldous);

									$('#valMAXUSbs').val(saldo);
									$('#valMAXUSusd').val(saldous);

									var saldoeu = parseFloat(result[f].saldo / tasaEU);

									saldoeu = saldoeu.toString();
									saldoeu = saldoeu.slice(0, (saldoeu.indexOf(".")) + 5);
									saldoeu = Number(saldoeu);

									$('#valMAXUSbse').val(saldo);
									$('#valMAXUSusde').val(saldoeu);

									$('#valMAXbsPM').val(saldo);
									$('#valMAXusdPM').val(saldous);

									$('#valMAXbsPV').val(saldo);
									$('#valMAXusdPV').val(saldous);

									$('#valMAXbsTF').val(saldo);
									$('#valMAXusdTF').val(saldous);

									$('#valMAXbsBP').val(saldo);
									$('#valMAXusdBP').val(saldous);
								}
							}
						});
					}

				}

			})
			ActuLoadData();

			$('#MontoCobUSusd').val('');
			$('#MontoCliUSusd').val('');

			$('#resulcobUSbs').val('0.00');
			$('#resulcobUSusd').val('0.00');

			$('#cobEntvubs').val('');
			$('#cobEntvuusd').val('');
			$('#cobEntvueur').val('');


			document.querySelector('button[name=btnCloseCobEfecUSD]').addEventListener('click', function(e) {
				e.preventDefault(e);
			})
			document.querySelector('button[name=btnCloseCobEfecUSD]').click();



			if ($('#idCob_numRengTip').val() == '') {
				$('#idCob_numRengTip').val('0');
			}
			if ($('#tbMonedaid').val() == '') {
				$('#tbMonedaid').val('0');
			}
			if ($('#idMoneUSD').val() == '') {
				$('#idMoneUSD').val('0');
			}


			var cob_num = $('#idCob_numRengTip').val();
			var monedaus = $('#idMoneUSD').val();

			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/sumAllUSD/&cob_num=' + cob_num + '&monedaus=' + monedaus + '  ',
				dataType: 'json',
				contentType: 'application/json',
				success: function(sum) {

					for (var suUSD = 0; suUSD < sum.length; suUSD++) {
						sumUSD = sum[suUSD].cob_num;
						sumUSD = sumUSD.toFixed(2);
						$('#pagadoUSD').val(sumUSD);
					}

				}

			});
			document.querySelector('button[name=UpdateRegistroCob]').addEventListener('click', function(e) {
				e.preventDefault(e);
			})
			document.querySelector('button[name=UpdateRegistroCob]').click();


		} else {
			return false;
		}

	})



});