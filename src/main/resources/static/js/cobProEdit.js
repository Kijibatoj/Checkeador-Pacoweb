
function isNumberKey(e, field) {
	
	key = e.keyCode ? e.keyCode : e.which
	// backspace


	if (key == 8) return true
	
	// 0-9
	if (key > 47 && key < 58 ) {
		if (field.value == "") return true
		if(field.value.length < 17 && field.value == parseInt(field.value) ) return true
			regexp = /[0-9]$/
		return !(regexp.test(parseInt(field.value)))

	}
	// .

	// other key
	return false
	
}

function NumCheck(e, field) {
	key = e.keyCode ? e.keyCode : e.which
	// backspace


	if (key == 8) return true
	
	// 0-9
	if (key > 47 && key < 58 ) {
		if (field.value == "") return true
		if(field.value.length < 17 && field.value == parseInt(field.value) ) return true
			regexp = /.[0-9]{2}$/
		return !(regexp.test(field.value))


	}
	// .
	if (key == 46) {

		if (field.value == "") return false
		regexp = /^[0-9]+$/
		return regexp.test(field.value) 
	}

	// other key
	return false
}