function ActuLoadData() {


	$.ajax({
		type: 'POST',
		url: '/api/ajaxrest/InfoMoneda',
		dataType: 'json',
		contentType: 'application/json',
		success: function(mone) {
			for (var m = 0; m < mone.length; m++) {
				co_mone = mone[m].co_mone;
				mone_des = mone[m].mone_des;
				cambio = mone[m].cambio;

				var moneda = [{
					co_mone: co_mone,
					mone_des: mone_des,
					cambio: cambio,
				},]

				function filtermoneda(array, searchString) {
					const resultx = array.filter(x => {
						const values = Object.values(x);
						if (values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))) {
							return x;
						}
					})
					return resultx;
				}

				var filterUS = filtermoneda(moneda, 'US$');
				for (var mUS = 0; mUS < filterUS.length; mUS++) {
					$('#TasaTODAY').val(moneda[mUS].cambio);
					$('#idMoneUSD').val(moneda[mUS].co_mone);

				}

				var filterEU = filtermoneda(moneda, 'US$');
				for (var mEU = 0; mEU < filterEU.length; mEU++) {
					$('#todayEUR').val(moneda[mEU].cambio.trim());
					$('#idMoneEUR').val(moneda[mEU].co_mone.trim());

				}

				var filterBS = filtermoneda(moneda, 'BS  ');
				for (var mBS = 0; mBS < filterBS.length; mBS++) {

				}

				var filterBSD = filtermoneda(moneda, 'BS  ');
				for (var mBSD = 0; mBSD < filterBSD.length; mBSD++) {
					$('#tbMonedaid').val(moneda[mBSD].co_mone);
					$('#tbMonedacambio').val(moneda[mBSD].cambio);

				}
			}
		}
	});

	if($('#Nfactura').val() == ''){
		$('#Nfactura').val('0');
	}	
	if($('#TasaTODAY').val() == ''){
		$('#TasaTODAY').val('0');
	}	
	if($('#todayEUR').val() == ''){
		$('#todayEUR').val('0');
	}	

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
				
				saldous  = saldous.toString();
				saldous  = saldous.slice(0 , (saldous.indexOf("."))+5);
				saldous = Number(saldous);

				$('#saldoBS').val(saldo);
				$("#saldoUSD").val(saldous);
				
				$('#valMAXbs').val(saldo);
				$('#valMAXusd').val(saldous);

				$('#valMAXUSbs').val(saldo);
				$('#valMAXUSusd').val(saldous);

				var saldoeu = parseFloat(result[f].saldo / tasaEU);
				
				saldoeu  = saldoeu.toString();
				saldoeu  = saldoeu.slice(0 , (saldoeu.indexOf("."))+5);
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


				pag += "<tr style='background-color:rgb(20,20,20);color:green;' id='trCob"+dataPag[p].reng_num+"'>"
				pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].reng_num + "</td>";
				pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].cob_num + "</td>";
				pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;' >" + dataPag[p].mont_doc.toFixed(2) + "</td>";
				pag += "<td style='color:rgb(0,255,0);font-weight:bold;font-size:9pt;'>" + dataPag[p].des_caja + "</td>";
				pag += "<td><button id='btn-delecPag"+dataPag[p].reng_num+"' onclick='return DeleteRowPag(id=" + dataPag[p].reng_num + ");' class=' ' style='width:15px;height:15px;background-color:rgb(255,0,0);cursor:pinter;' ></button></td>";
				pag += "</tr>";
			
	
				cob_num = dataPag[p].cob_num;

			}
			/*]]>*/
			$("#tbPagosRengTip").html(pag);
			$("#idCob_numRengTip").val(cob_num);


		}
	});
	
	if($('#idCob_numRengTip').val() == ''){
		$('#idCob_numRengTip').val('0');
	}
	if($('#tbMonedaid').val() == ''){
		$('#tbMonedaid').val('0');
	}
	if($('#idMoneUSD').val() == ''){
		$('#idMoneUSD').val('0');
	}

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
	
	var cob_num = $('#idCob_numRengTip').val();
	
	var moneda = $('#tbMonedaid').val();
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


}

