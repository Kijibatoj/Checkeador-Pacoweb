$(document).ready(function(){ 
	
	
})
function SumCobAdd(){
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