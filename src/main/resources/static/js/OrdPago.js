function ExtraerVariablesFormulario(){
    var MontoBOT =  $("#Monto").val();
   
    var Cod_Benef = $("#cod_Beni").val();
   
    var Descrip = $("#Descrip").val();
   
    var FechaEmision = new Date();
   const [month, day, year] = [
   FechaEmision.getMonth(),
   FechaEmision.getDate(),
   FechaEmision.getFullYear(),
   ];
    var mes = month;
    var dia = day;
    var ayo = year;

    const BotOrden= {
           Monto: MontoBOT,
           Cod_Benef : Cod_Benef,
           Descrip : Descrip,
           mese: mes,
           dias: dia,
           avo: ayo
   
    }
    OrdpagoNoti(BotOrden);
}

