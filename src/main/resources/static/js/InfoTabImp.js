$(document).ready(function(){
	$.ajax({
		type : 'POST',
		url : '/api/ajaxrest/ImpTabuladoImpuesList/',
		dataType : 'json',
		contentType : 'application/json',
		success : function(rstTab){
			
			for (var t = 0; t < rstTab.length ; t++){
					
					tipo = rstTab[t].tipo;
					descripcio = rstTab[t].descripcio;
					porc_vent = rstTab[t].porc_vent;
					
					var tab = [{
						tipo : tipo,
						descripcio : descripcio,
						porc_vent : porc_vent,
					},]
					
					function filtrarTab(array , searchString){
						const resultd = array.filter(x =>{
							const values = Object.values(x);
							if(values.some(y => y.toString().toLowerCase().includes(searchString.toLowerCase()))){
								return x
							}
						})
						return resultd;
					}
					
					var filtExento = (filtrarTab(tab , "TASA GENERAL "));
					for(var e = 0 ; e < filtExento.length ; e++){
						 var tipoE = tab[e].tipo;
						 var descripcioE = tab[e].descripcio;
						 var porc_ventE = tab[e].porc_vent;
						 
						 $("#tipoExento").val(tipoE);
						 $("#porcExento").val("0."+porc_ventE);
					}
					
					var filtGeneral = (filtrarTab(tab , "EXENTOS "));
					for(var g = 0 ; g < filtGeneral.length ; g++){
						 var tipoG = tab[g].tipo;
						 var descripcioG = tab[g].descripcio;
						 var porc_ventG = tab[g].porc_vent;
						 
						 $("#tipoGeneral").val(tipoG);
						 $("#porcGeneral").val(porc_ventG);
					}
					
			}
		}
	})
	
});