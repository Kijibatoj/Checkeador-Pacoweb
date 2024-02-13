$(document).ready(function() {
	contNarc = 0;
	$("#LisProduc").click(function() {
		contNarc = 1;
		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/ListproducArtfromproF1t/',
			dataType: 'json',
			contentType: 'application/json',
			success: function(rsPro) {

				reng = '';
				/*<![CDATA[*/
				for (var p = 0; p < rsPro.length; p++) {
					var tasa = $('#TasaTODAY').val();

					preciobs = parseFloat(rsPro[p].prec_vta1 * Number(tasa));
					preciobs = preciobs.toString();
					preciobs = preciobs.slice(0, (preciobs.indexOf(".")) + 4);
					preciobs = Number(preciobs);

					var Iva = 0;

					if (parseFloat(rsPro[p].tipo_imp) == 1) {
						var Iva = (parseFloat(preciobs) * 0.16);
					}
					else if (parseFloat(rsPro[p].tipo_imp) == 3) {
						var Iva = (parseFloat(preciobs) * 0.16);
					}
					else if (parseFloat(rsPro[p].tipo_imp) == 6) {
						var Iva = (parseFloat(preciobs) * 0);
					}

					Iva = Iva.toString();
					Iva = Iva.slice(0, (Iva.indexOf(".")) + 4);
					Iva = Number(Iva);

					var totalPrePro = parseFloat(Iva + preciobs);
					totalPrePro = totalPrePro.toString();
					totalPrePro = totalPrePro.slice(0, (totalPrePro.indexOf(".")) + 4);
					totalPrePro = Number(totalPrePro);

					var totalD = parseFloat(totalPrePro / tasa);
					totalD = totalD.toString();
					totalD = totalD.slice(0, (totalD.indexOf(".")) + 4);
					totalD = Number(totalD);

					var descripProrimsp1 = rsPro[p].art_des.trim();


		var dataProDistsp1 = descripProrimsp1.split("/","10");
		var datanew2 = String(dataProDistsp1);

		var dataProDesc = datanew2.split("%","10");
		var datanew3 = String(dataProDesc);

		var dataProdesc2 = datanew3.split("&","10");
		var datanew4 = String(dataProdesc2);

		var descripPro = datanew4.split("  " , "10");
		descripPro = String(descripPro);

		reng += "<tr id='selectProTr" + contNarc + "' >"
		reng += "<td>" + contNarc + "</td>"
		
		reng += "<input type='hidden' value='" + rsPro[p].co_art + "' id='co_artId" + contNarc + "' >"
		
		reng += "<input type='hidden' value='" + rsPro[p].tipo_imp + "' id='tipo_impId" + contNarc + "' >"
		reng += "<input type='hidden' value='" + rsPro[p].tipo + "' id='tipo_Id" + contNarc + "' >"
		reng += "<td style='color:black;font-weight:bold;'>" + rsPro[p].co_art+ "</td>"
		reng += "<td style='color:black;font-weight:bold;'>" +descripPro.trim()+ "</td>"
		reng += "<input type='hidden' value='" + rsPro[p].art_des + "' id='art_desList" + contNarc + "' >"
		reng += "<td style='color:black;font-weight:bold;'>" + rsPro[p].uni_venta + "</td>"
		reng += "<input type='hidden' id='tipImpPro" + contNarc + "' >"
		reng += "<td style='color:blue;font-weight:bold;' title='" + rsPro[p].prec_vta1 + "'>" + preciobs + "</td>"
		reng += "<input type='hidden' value='" + preciobs + "' id='precioVent" + contNarc + "' >"

		reng += "<td style='color:black;font-weight:bold;cursor:pointer;' id='cantProLis" + contNarc + "' onclick='return ListProConOn(id=" + contNarc + ");'  >1.000</td>"
		reng += "<td style='color:black;font-weight:bold;'  >" + Iva + "</td>"
		reng += "<input type='hidden' value='" + Iva + "' id='ivaProLis" + contNarc + "'>"
		reng += "<td id='totalPrePro" + contNarc + "' style='color:blue;font-weight:bold;'>" + totalPrePro + "</td>"
		reng += "<td id='totalPreProUSD" + contNarc + "' style='color:green;font-weight:bold;'>" + totalD + "</td>"
		reng += "<input type='hidden' id='totalProUSD" + contNarc + "' value='" + totalD + "'>"
		reng += "<td>" + "<a class='btn btn-primary' onclick='return SelectPro(id=" + contNarc + ");' style='color:white;font-weight:bold;cursor:pointer;' >Select</a>" + "</td>"
		reng += "</tr>";

		contNarc++;
	}
				/*]]>*/
				$("#ListArtProfit").html(reng);

}
		});
	});


});