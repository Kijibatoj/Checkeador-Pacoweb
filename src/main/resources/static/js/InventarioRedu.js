function ExtraerVariables(){

    var nfacCheck = $("#nfactura").val();
    var userCheck = $("#nfaccli").val();
    var Producto = $("#Producto").val();
    var PrecioPr = $("#PrecioPr").val();
    var PesoPr = $("#Peso").val();

    $.ajax({
        type: 'POST',
        url: '/api/ajaxrest/InventarioPro/nfacCheck=' + nfacCheck + '&Peso=' + PesoPr + '',
        dataType: 'json',
        contentType: 'application/json',
         success: function(Resultado) {
         

            var nfacturas = "";
            var Pesot = "";	
        
            for (var i = 0; i < Resultado.length; i++) {

                nfacturas = Resultado[i].nfacCheck;
                Pesot = Resultado[i].pendiente;
                PrecioE = Resultado[i].Precio;
                Fecha2 = Resultado[i].fecha;

                if(Pesot != PesoPr){
                  const BotsVariables = {
                    Usuario : userCheck,
                    NumeroFactura : nfacturas,
                    Producto : Producto,
                    Peso : Pesot,
                    Fecha : Fecha2
                  };

                  NotiPesoMenor(BotsVariables)
                }
       }
       
         }
  })



}