		
  function EnviarNoti(Botvari){

            var tokenbot= `${Botvari.tokenW}`

            var apiUrl = 'https://api.telegram.org/bot'+tokenbot+'/sendMessage';

            var chatIA= `${Botvari.chatAi}`;
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id:chatIA,
                    text: `🗣️Detección factura duplicada🧏: \n \n 🧾 Nro: ${Botvari.numefac}\n 👥 Cliente: ${Botvari.nombreCliente} \n 💳 C.I: ${Botvari.cedula} \n 🏧 Caja :${Botvari.caja}\n 🛒 Cantidad item!: ${Botvari.cantidadItem} \n📈 Monto en BS: ${Botvari.montobs} \n 💵Monto en USD : ${Botvari.montousd}\n ⚖️Peso: ${Botvari.peso} KG\n ⚖️Peso total de venta: ${Botvari.ArticuloXpeso} KG\n 📅Fecha emisión: ${Botvari.fechaEmision}\n ✅Verificada : ${Botvari.infoart} \n🕒 Incidencia: ${Botvari.checkoutfech}\n👁‍🗨Observación: Hace ${Botvari.DiaObservado} día(S) y ${Botvari.HoraObservao} Hora(S), que la factura fue verificada \n👨‍✈️Chequeador : ${Botvari.co_vens} `,
                })
            };
    
            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Respuesta del bot de Telegram:', data);
                })
                .catch(error => {
                    console.error('Error al enviar datos al bot:', error);
                });
        }


function FacRetraso(Botvari){
    var tokenbot= `${Botvari.tokenW}`

    var apiUrl = 'https://api.telegram.org/bot'+tokenbot+'/sendMessage';

    var chatIA= `${Botvari.chatAi}`;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id:chatIA,
            text: `🗣️Factura verificada con retraso: \n \n 🧾 Nro: ${Botvari.numefac}\n 👥 Cliente: ${Botvari.nombreCliente} \n 💳 C.I: ${Botvari.cedula} \n 🏧 Caja :${Botvari.caja}\n 🛒 Cantidad item!: ${Botvari.infoart} \n📈 Monto en BS: ${Botvari.montobs} \n 💵Monto en USD : ${Botvari.montousd}\n ⚖️Peso: ${Botvari.peso} KG\n ⚖️Peso total de venta: ${Botvari.ArticuloXpeso} KG\n 📅Fecha emisión: ${Botvari.fechaEmision}  ${Botvari.horas}\n👨‍✈️Chequeador : ${Botvari.co_vens} `,
        })
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del bot de Telegram:', data);
        })
        .catch(error => {
            console.error('Error al enviar datos al bot:', error);
        });
}        



