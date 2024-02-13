         
function Procesar (){
            var nfacCheck = $("#Num_Fac").val();
			$.ajax({
				type: 'POST',
				url: '/api/ajaxrest/VerificarFacturaImpresa/nfacCheck=' + nfacCheck + ' ',
				dataType: 'json',
				contentType: 'application/json',
				success: function(resultSet) {
					var nfacturas = "";
					var NumeroFactura = "";
					var infocob = "";
					var CedulaCli = "";
				
					for (var i = 0; i < resultSet.length; i++) {
	
						nfacturas = resultSet[i].nfactura;
						ASomentario = resultSet[i].comentario;
						CedulaCli = resultSet[i].informacion;
						infocob = resultSet[i].infocobro;
						Comentario = resultSet[i].infocantidad;
						Caja= resultSet[i].infoart;

						console.log (NumeroFactura)
// Vuelvo las variables const ya que su valor no debe cambiar y creo un array.
				const BotFactura= {
					NumeroFactura: nfacturas,
					CodigoCli: CedulaCli,
					Comentario: Comentario,
					Fecha: infocob,
					Caja: Caja,
					Cedula: CedulaCli
				}
				Swal.fire({
					icon: 'warning',
					title: 'Error',
					text: 'No puedes imprimir la factura sin realizar un cobro primero.',
					confirmButtonText: '¡Entendido!'
				});
			NotiFactOnchekcout(BotFactura)

            }
                    
            }
        
            })
		}