$(document).ready(function() {


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
	 
	$("#btnScannerSub").click(function() {

		
		var ScannerVal2 = $("#selectEvidencia").val();
		
		var scannerVal3 = ScannerVal2.substring(1);

		var ScannerVal = ScannerVal2.substring(12,-1)
		
		var codPro = ScannerVal.substring(7, -1);
		var rest = 7;
		var srtced = ScannerVal.substring(rest);
		var enCan = srtced.substring(2, -1);
		var desCan = srtced.substring(2);
		var peso = enCan + "." + desCan;
		
		var co_artID = codPro;
		var pesocodPro = peso;
		
		if(pesocodPro.length < 5 ){
			alert("ERROR : La lectura del codigo no coinciden con el estandar");
			$("#selectEvidencia").val("");
			$("#selectEvidencia").focus();
			return false;
		}
		
		var evidencia = $("#selectEvidencia").val();
		var NewEvidencia = $("#NewEvidencia");

		if (evidencia == "") {
			$("#selectEvidencia").focus();
			alert("Debe de ingresar el codigo del producto");
			return false;
		}
		else if (evidencia != 0) {
			
			$("#selectEvidencia").val("");
			$("#selectEvidencia").focus();
			
			if (co_artID[0] == 0) {
				co_artID = ScannerVal2;
			}
				
			if(co_artID[0] == 0 ){
			   co_artID = scannerVal3;
			}
			if(co_artID[0] == 7){
					co_artID = ScannerVal2;
			}
			if(co_artID[0] == 2){
					co_artID = co_artID  ;
			}
			
				
				
			$.ajax({
				type: "POST",
				url: "/api/ajaxrest/demo/&co_art="+co_artID+"&scannerVal2="+ScannerVal2+"&scannerVal3="+scannerVal3+" ",
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

						var filt = (filtrarProductos(productos,co_artID));
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
							var filtUND = (filtrarProductosUND(productos, ScannerVal2));
							for (var v = 0; v < filtUND.length; v++) {


								let person = "1";
								if (person > 0) {
									
									var Precio = (parseFloat(productos[j].cos_pro_om * person));
									Precio = Precio.toString(); 
								    Precio = Precio.slice(0, (Precio.indexOf("."))+3);
								    Precio = Number(Precio);
								    
									var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
									PrecioUnid = PrecioUnid.toString(); 
								    PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf("."))+3);
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
								    Iva = Iva.slice(0, (Iva.indexOf("."))+6);
								    Iva = Number(Iva);

									var Total = (parseFloat(Iva + Precio));
									var absTotal = (parseFloat(Iva + PrecioUnid));
									var cantUn = parseFloat(productos[j].can_arg * person);

									var tasa_v = $('#TasaTODAY').val();
									tasa_v = tasa_v.toString(); 
								    tasa_v = tasa_v.slice(0, (tasa_v.indexOf("."))+6);
								    tasa_v = Number(tasa_v);

									var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

									var IvaBS = parseFloat(Iva * tasa_v);

									var PrecioBS = parseFloat(Precio * tasa_v);

									var TotalBS = parseFloat(absTotal * tasa_v);

									var co_artA = productos[j].co_art.trim();

									alert(Number(Precio)+ ' $');
									
									Iva = Iva.toString();
									Iva = Iva.slice(0 , (Iva.indexOf("."))+4);
									
									Total = Total.toString();
									Total = Total.slice(0 , (Total.indexOf("."))+4);
									
									absTotal = absTotal.toString();
									absTotal = absTotal.slice(0 , (absTotal.indexOf("."))+4);
									
									TotalBS = TotalBS.toString();
									TotalBS = TotalBS.slice(0 , (TotalBS.indexOf("."))+4);
									
									PrecioBS = PrecioBS.toString();
									PrecioBS = PrecioBS.slice(0 , (PrecioBS.indexOf("."))+4);
									
									IvaBS  = IvaBS.toString();
									IvaBS  = IvaBS.slice(0 , (IvaBS .indexOf("."))+4);
									
									cos_pro_unjs  = cos_pro_unjs.toString();
									cos_pro_unjs  = cos_pro_unjs.slice(0 , (cos_pro_unjs.indexOf("."))+4);

									Precio = Number(Precio);
									Iva = Number(Iva);
									Total = Number(Total);
									cantUn = cantUn;
									
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
										
										var dataProDistsp1 = descripProrimsp1.split(datasp1,"20");
										var datanew2 = String(dataProDistsp1);
										
										var dataProDesc = datanew2.split(datapo1 , "20");
										var datanew3 = String(dataProDesc);
										
										var dataProdesc2 = datanew3.split(datapl1 , "20");
										var datanew4 = String(dataProdesc2);
										
									 	var descripPro = datanew4.split("  " , "10");
										descripPro = String(descripPro);
										


									var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
										'"<div class="" role="tr">' +
										''
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+productos[j].co_art+ '</td>'
										 + '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+descripPro.trim()+ '</td>'
										 + '<input type="hidden" id="tipo_imp'+contNarc+'" value="'+productos[j].tipo_imp+'" >'
										 + '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;" onclick="return DatoProArt(id=' + contNarc + ');" >' + cantUn + '</td>'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
									addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
										+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
									addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
										+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
									addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
										+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
									addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
										+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
									addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

									NewEvidencia.append(addNarc);
								
									sumSueldo();

									var total_art = (parseFloat(productos[j].can_arg * person));
									total_art = total_art;

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

									console.log(nfac + " / " + tasa + " / " + co_cli + " /" +
										co_art + " / " + cantidad + " / " + uni_venta + " / " +
										can_arg + " / " + cos_pro_om + " / " + tipo + " /  " +
										tipo_imp + " / " + tot_bruto + " / " + tot_neto + " / " + iva + " / " + cos_pro_un)

									$.ajax({
										type: 'POST',
										url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
										success: function() {

										}
									})
									contNarc++;
									return false;
								}

							}

							var filtKG = (filtrarProductosUND(productos,co_artID));
							for (var v = 0; v < filtKG.length; v++) {


								let person = pesocodPro;
								if (person > 0) {

									var Precio = (parseFloat(productos[j].cos_pro_om * person));
									Precio = Precio.toString(); 
								    Precio = Precio.slice(0, (Precio.indexOf("."))+6);
								    Precio = Number(Precio);
								    
									var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
									PrecioUnid = PrecioUnid.toString(); 
								    PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf("."))+6);
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
								    Iva = Iva.slice(0, (Iva.indexOf("."))+4);
								    Iva = Number(Iva);

									var Total = (parseFloat(Iva + Precio));
									var absTotal = (parseFloat(Iva + PrecioUnid));
									var cantUn = parseFloat(productos[j].can_arg * person);

									var tasa_v = $('#TasaTODAY').val();
									tasa_v = tasa_v.toString(); 
								    tasa_v = tasa_v.slice(0, (tasa_v.indexOf("."))+4);
								    tasa_v = Number(tasa_v);

									var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

									var IvaBS = parseFloat(Iva * tasa_v);

									var PrecioBS = parseFloat(Precio * tasa_v);

									var TotalBS = parseFloat(absTotal * tasa_v);

									var co_artA = productos[j].co_art.trim();

									alert(Number(Precio)+ ' $');
									
									Iva = Iva.toString();
									Iva = Iva.slice(0 , (Iva.indexOf("."))+4);
									
									Total = Total.toString();
									Total = Total.slice(0 , (Total.indexOf("."))+4);
									
									absTotal = absTotal.toString();
									absTotal = absTotal.slice(0 , (absTotal.indexOf("."))+4);
									
									TotalBS = TotalBS.toString();
									TotalBS = TotalBS.slice(0 , (TotalBS.indexOf("."))+4);
									
									PrecioBS = PrecioBS.toString();
									PrecioBS = PrecioBS.slice(0 , (PrecioBS.indexOf("."))+4);
									
									IvaBS  = IvaBS.toString();
									IvaBS  = IvaBS.slice(0 , (IvaBS .indexOf("."))+4);
									
									cos_pro_unjs  = cos_pro_unjs.toString();
									cos_pro_unjs  = cos_pro_unjs.slice(0 , (cos_pro_unjs.indexOf("."))+4);

									Precio = Number(Precio);
									Iva = Number(Iva);
									Total = Number(Total);
									cantUn = cantUn;
									
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
										
										var dataProDistsp1 = descripProrimsp1.split(datasp1,"20");
										var datanew2 = String(dataProDistsp1);
										
										var dataProDesc = datanew2.split(datapo1 , "20");
										var datanew3 = String(dataProDesc);
										
										var dataProdesc2 = datanew3.split(datapl1 , "20");
										var datanew4 = String(dataProdesc2);
	
										var descripPro = datanew4.split("  " , "10");
										descripPro = String(descripPro);


									var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
										'"<div class="" role="tr">' +
										''
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+productos[j].co_art+ '</td>'
										 + '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+descripPro.trim()+ '</td>'
										 + '<input type="hidden" id="tipo_imp'+contNarc+'" value="'+productos[j].tipo_imp+'" >'
										 + '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  >' + cantUn + '</td>'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
									addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
										+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
									addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
										+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
									addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
										+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
									addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
										+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
									addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

									NewEvidencia.append(addNarc);
								
									sumSueldo();

									var total_art = (parseFloat(productos[j].can_arg * person));
									total_art = total_art;

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

									console.log(nfac + " / " + tasa + " / " + co_cli + " /" +
										co_art + " / " + cantidad + " / " + uni_venta + " / " +
										can_arg + " / " + cos_pro_om + " / " + tipo + " /  " +
										tipo_imp + " / " + tot_bruto + " / " + tot_neto + " / " + iva + " / " + cos_pro_un)

									$.ajax({
										type: 'POST',
										url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
										success: function() {

										}
									})
									contNarc++;
									return false;
								}

							}
							
							
							var filtUND = (filtrarProductosUND(productos, "002"));
							for (var v = 0; v < filtUND.length; v++) {


								let person = pesocodPro;
								if (person > 0) {

									var Precio = (parseFloat(productos[j].cos_pro_om * person));
									Precio = Precio.toString(); 
								    Precio = Precio.slice(0, (Precio.indexOf("."))+6);
								    Precio = Number(Precio);
								    
									var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
									PrecioUnid = PrecioUnid.toString(); 
								    PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf("."))+6);
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
								    Iva = Iva.slice(0, (Iva.indexOf("."))+6);
								    Iva = Number(Iva);

									var Total = (parseFloat(Iva + Precio));
									var absTotal = (parseFloat(Iva + PrecioUnid));
									var cantUn = parseFloat(productos[j].can_arg * person);

									var tasa_v = $('#TasaTODAY').val();
									tasa_v = tasa_v.toString(); 
								    tasa_v = tasa_v.slice(0, (tasa_v.indexOf("."))+6);
								    tasa_v = Number(tasa_v);

									var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

									var IvaBS = parseFloat(Iva * tasa_v);

									var PrecioBS = parseFloat(Precio * tasa_v);

									var TotalBS = parseFloat(absTotal * tasa_v);

									var co_artA = productos[j].co_art.trim();

									alert(Number(Precio)+ ' $');
									
									Iva = Iva.toString();
									Iva = Iva.slice(0 , (Iva.indexOf("."))+6);
									
									Total = Total.toString();
									Total = Total.slice(0 , (Total.indexOf("."))+4);
									
									absTotal = absTotal.toString();
									absTotal = absTotal.slice(0 , (absTotal.indexOf("."))+4);
									
									TotalBS = TotalBS.toString();
									TotalBS = TotalBS.slice(0 , (TotalBS.indexOf("."))+4);
									
									PrecioBS = PrecioBS.toString();
									PrecioBS = PrecioBS.slice(0 , (PrecioBS.indexOf("."))+4);
									
									IvaBS  = IvaBS.toString();
									IvaBS  = IvaBS.slice(0 , (IvaBS .indexOf("."))+4);
									
									cos_pro_unjs  = cos_pro_unjs.toString();
									cos_pro_unjs  = cos_pro_unjs.slice(0 , (cos_pro_unjs.indexOf("."))+4);

									Precio = Number(Precio);
									Iva = Number(Iva);
									Total = Number(Total);
									cantUn = cantUn;
									
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
										
										var dataProDistsp1 = descripProrimsp1.split(datasp1,"20");
										var datanew2 = String(dataProDistsp1);
										
										var dataProDesc = datanew2.split(datapo1 , "20");
										var datanew3 = String(dataProDesc);
										
										var dataProdesc2 = datanew3.split(datapl1 , "20");
										var datanew4 = String(dataProdesc2);
	
										var descripPro = datanew4.split("  " , "10");
										descripPro = String(descripPro);


									var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
										'"<div class="" role="tr">' +
										''
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										 addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+productos[j].co_art+ '</td>'
										 + '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+descripPro.trim()+ '</td>'
										 + '<input type="hidden" id="tipo_imp'+contNarc+'" value="'+productos[j].tipo_imp+'" >'
										 + '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"  >' + cantUn + '</td>'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
									addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
										+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
									addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
										+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
									addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
										+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
									addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
										+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
									addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

									NewEvidencia.append(addNarc);
								
									sumSueldo();

									var total_art = (parseFloat(productos[j].can_arg * person));
									total_art = total_art;

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

									console.log(nfac + " / " + tasa + " / " + co_cli + " /" +
										co_art + " / " + cantidad + " / " + uni_venta + " / " +
										can_arg + " / " + cos_pro_om + " / " + tipo + " /  " +
										tipo_imp + " / " + tot_bruto + " / " + tot_neto + " / " + iva + " / " + cos_pro_un)

									$.ajax({
										type: 'POST',
										url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
										success: function() {

										}
									})
									contNarc++;
									return false;
								}

							}
							
							var filtUND2 = (filtrarProductosUND(productos, scannerVal3));
							for (var v = 0; v < filtUND2.length; v++) {


								let person = "1";
								if (person > 0) {
									
									var Precio = (parseFloat(productos[j].cos_pro_om * person));
									Precio = Precio.toString(); 
								    Precio = Precio.slice(0, (Precio.indexOf("."))+6);
								    Precio = Number(Precio);
								    
									var PrecioUnid = (parseFloat(productos[j].cos_pro_om * person));
									PrecioUnid = PrecioUnid.toString(); 
								    PrecioUnid = PrecioUnid.slice(0, (PrecioUnid.indexOf("."))+6);
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
								    Iva = Iva.slice(0, (Iva.indexOf("."))+6);
								    Iva = Number(Iva);

									var Total = (parseFloat(Iva + Precio));
									var absTotal = (parseFloat(Iva + PrecioUnid));
									var cantUn = parseFloat(productos[j].can_arg * person);

									var tasa_v = $('#TasaTODAY').val();
									tasa_v = tasa_v.toString(); 
								    tasa_v = tasa_v.slice(0, (tasa_v.indexOf("."))+6);
								    tasa_v = Number(tasa_v);

									var cos_pro_unjs = (parseFloat(productos[j].cos_pro_om * tasa_v));

									var IvaBS = parseFloat(Iva * tasa_v);

									var PrecioBS = parseFloat(Precio * tasa_v);

									var TotalBS = parseFloat(absTotal * tasa_v);

									var co_artA = productos[j].co_art.trim();

									alert(Number(Precio)+ ' $');
									
									Iva = Iva.toString();
									Iva = Iva.slice(0 , (Iva.indexOf("."))+6);
									
									Total = Total.toString();
									Total = Total.slice(0 , (Total.indexOf("."))+4);
									
									absTotal = absTotal.toString();
									absTotal = absTotal.slice(0 , (absTotal.indexOf("."))+4);
									
									TotalBS = TotalBS.toString();
									TotalBS = TotalBS.slice(0 , (TotalBS.indexOf("."))+4);
									
									PrecioBS = PrecioBS.toString();
									PrecioBS = PrecioBS.slice(0 , (PrecioBS.indexOf("."))+4);
									
									IvaBS  = IvaBS.toString();
									IvaBS  = IvaBS.slice(0 , (IvaBS .indexOf("."))+4);
									
									cos_pro_unjs  = cos_pro_unjs.toString();
									cos_pro_unjs  = cos_pro_unjs.slice(0 , (cos_pro_unjs.indexOf("."))+4);

									Precio = Number(Precio);
									Iva = Number(Iva);
									Total = Number(Total);
									cantUn = cantUn;
									
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
										
										var dataProDistsp1 = descripProrimsp1.split(datasp1,"20");
										var datanew2 = String(dataProDistsp1);
										
										var dataProDesc = datanew2.split(datapo1 , "20");
										var datanew3 = String(dataProDesc);
										
										var dataProdesc2 = datanew3.split(datapl1 , "20");
										var datanew4 = String(dataProdesc2);
										
										
										var descripPro = datanew4.split("  " , "10");
										descripPro = String(descripPro);
										


									var addNarc = ' <tr  class="" id="DeleteEvidNarc' + contNarc +
										'"<div class="" role="tr">' +
										''
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + contNarc + '</td>'
										 addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+productos[j].co_art+ '</td>'
										 + '<input   id="co_art' + contNarc + '"  value="' + productos[j].co_art + '"     type="hidden"  >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;"> '+descripPro.trim()+ '</td>'
										 + '<input type="hidden" id="tipo_imp'+contNarc+'" value="'+productos[j].tipo_imp+'" >'
										 + '<input type="hidden" name="desc_art" value="' + productos[j].art_des + '" id="desc_art' + contNarc + '" >'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;" onclick="return DatoProArt(id=' + contNarc + ');" >' + cantUn + '</td>'
									addNarc += '<td scope="row" style="font-weight:bold;font-size:9pt;">' + productos[j].uni_venta + '</td>'
									addNarc += '<td scope="row" title="' + Precio + ' $" style="font-weight:bold;font-size:9pt;">' + cos_pro_unjs + '</td>'
										+ '<input type="hidden" name="preciobslis" id="preciobslis' + contNarc + '" value="' + PrecioBS + '" >'
									addNarc += '<td id="Iva" scope="row" title="' + Iva + ' $" style="font-weight:bold;font-size:9pt;">' + IvaBS + '</td>'
										+ '<input type="hidden" value="' + IvaBS + '" id="ivabs' + contNarc + '" >'
									addNarc += '<td id="totalX" scope="row" style="color:blue;font-size:9pt;font-weight:bold;" >' + TotalBS + '</td>'
										+ '<input type="hidden" value="' + TotalBS + '" id="totalbs' + contNarc + '" >'
									addNarc += '<td id="totalZ" scope="row" style="color:green;font-size:9pt;font-weight:bold;" > ' + absTotal + '</td>'
										+ '<input type="hidden" value="' + absTotal + '" id="abstotal' + contNarc + '">'
									addNarc += '<td><a class="deleteEvidancia btn btn-danger" onclick="return DeleteROW(id=' + contNarc + ');" style="cursor: pointer;color:whiter;"data-toggle="modal" data-target="#DelRengFact' + contNarc + '"><img src="../images/eliminar.png" height="20px" width="25px" /></a></td></div></tr>  ';

									NewEvidencia.append(addNarc);
								
									sumSueldo();

									var total_art = (parseFloat(productos[j].can_arg * person));
									total_art = total_art;

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

									console.log(nfac + " / " + tasa + " / " + co_cli + " /" +
										co_art + " / " + cantidad + " / " + uni_venta + " / " +
										can_arg + " / " + cos_pro_om + " / " + tipo + " /  " +
										tipo_imp + " / " + tot_bruto + " / " + tot_neto + " / " + iva + " / " + cos_pro_un)

									$.ajax({
										type: 'POST',
										url: '/api/ajaxrest/regisRengfac/nfac=' + nfac + '&tasa=' + tasa + '&co_cli=' + co_cli + '&co_art=' + co_art + '&cantidad=' + cantidad + '&uni_venta=' + uni_venta + '&can_arg=' + can_arg + '&cos_pro_om=' + cos_pro_om + '&tipo=' + tipo + '&tipo_imp=' + tipo_imp + '&tot_bruto=' + tot_bruto + '&tot_neto=' + tot_neto + '&iva=' + iva + '&cos_pro_un=' + cos_pro_un + '&reng_neto=' + reng_neto + '&reng_num=' + reng_num + '&ivabs=' + ivabs + '&monto_net=' + monto_net + '&preciobru=' + preciobru + '  ',
										success: function() {

										}
									})
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

			sumSueldo();
			return false;
		}

	});

});