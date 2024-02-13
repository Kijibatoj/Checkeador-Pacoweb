const contenedorQR = document.getElementById("contenedorQR");
const formulario = document.getElementById("formulario");
//new QRCode(contenedorQR , 'Consultores Grebca C.A');
const QR = new QRCode(contenedorQR);

formulario.addEventListener('submit', (e) =>{
	e.preventDefault();
	QR.makeCode(formulario.link.value);
});