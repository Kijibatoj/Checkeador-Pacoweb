$(document).ready(function() {
	history.forward();
	var co_venIDs = $("#co_venID").val();
	if (co_venIDs != "") {
		$("#co_venIDss").val(co_venIDs);

		history.forward();
	} else {
		window.location.href = "/PACOweb#";
		history.forward();
	}

	$("#btnExit").click(function() {
		history.forward();
	});

	$("#subButton").click(function() {
		
		var ceds = $("#txtK").val();
		var co_venCOx = $("#co_venIDss").val();
	
		$.ajax({
			type: 'POST',
			url: '/api/ajaxrest/AjaxproDataInsoftGrebcca/ceds=' + ceds + '&co_venCOx=' + co_venCOx + ' ',
		});
		
		
		$("#subButton").hide();
		if(ceds == ""){
			$("#subButton").show();
		}
		return true;
	})
});
