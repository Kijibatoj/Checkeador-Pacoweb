

function onlyK(inputVal) {



	$(document).ready(function() {

		var patG = /^[cCEeJjGgVvNn0-9]+$/;


		if (patG.test(inputVal)) {

			if (inputVal[0] == "C"
				|| inputVal[0] == "E"
				|| inputVal[0] == "V"
				|| inputVal[0] == "G"
				|| inputVal[0] == "J"
				|| inputVal[0] == "N"
				|| inputVal[0] == "n"
				|| inputVal[0] == "c"
				|| inputVal[0] == "e"
				|| inputVal[0] == "g"
				|| inputVal[0] == "j"
				|| inputVal[0] == "v"
				|| inputVal[0] == "1"
				|| inputVal[0] == "2"
				|| inputVal[0] == "3"
				|| inputVal[0] == "4"
				|| inputVal[0] == "5"
				|| inputVal[0] == "6"
				|| inputVal[0] == "7"
				|| inputVal[0] == "8"
				|| inputVal[0] == "9"
				) {
				$('#txtK').append(inputVal[0]);

				$(function() {
					$("#txtK").keydown(function(event) {
						if (event.keyCode == 13 && $('#txtK').val().length < 0) {
							return false;
						} else {
							return true;
						}


					});
				});
				$('#subButton').click(function() {
					if ($('#txtK').val().length > 0) {
						return true;
					} else {
						return false;

					}
				});

			}

			else {
				$("#txtK").val("");
			}
		}
		else {
			$("#txtK").val("");
		}


	});


	if (inputVal[1] <= "9") {
		$(function() {
			$("#txtK").keydown(function(event) {
				//alert(event.keyCode);
				if ((event.keyCode < 48 || event.keyCode > 57)
					&& (event.keyCode < 96 || event.keyCode > 105)
					&& event.keyCode !== 190 && event.keyCode !== 110
					&& event.keyCode !== 8 && event.keyCode !== 9) {

					if ($('#txtK').val() == 0) {
						location.reload();

					}
					if ($('#txtK').val().length > 0) {
						
						return true;

					} else {
						return false;
					}
				}

			});
		});
	} else {
		$('#txtK').val(inputVal[0]);
	}

	$("#txtK").keydown(function(event) {
		$("#parrafo").text("El código de la tecla " + String.fromCharCode(event.which) + " es: " + event.which);

	});

}