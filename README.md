# Checkeador de Facturas PACOWeb

Este proyecto es un sistema de verificación de facturas que automatiza la tarea de comprobación y validación de facturas comerciales. Si la factura fue verificada dos veces esta manda una notifacion a un bot de telegram. El proyecto usa una 
base de datos de una empresa, asi que por ende no puedo publicar y/o clonar la misma. 



## Instalación

1. Clona este repositorio en tu máquina local
2. Añade el proyecto a SpringBoot
3. Crea un bot de telegram y añade al mismo a un Chat grupal al que quieras que lleguen las notificaciones.


##USO:
1.-Puedes crear la base de datos de la siguiente manera:
Usa como ejemplo los valores que estan en CheckoutPacoModel para poder crear las tablas de la base de datos con los mismos nombres para poder hacer que el proyecto funcione correctamente, la base de datos se puede llamar PACO_A 
o el nombre que desees. La misma tiene que estar en un servidor SQL.
(te recomiendo utilizar ManagentSQL o XAMPP).
la tabla mas importante que debes crear para que funcione todo el proyecto correctamente y no esta mencionada en el Model es la tabla donde guardaras el token del bot y el ID del chatgrupal. Guardala como Bot

2.- Luego de crear la base de datos cambia la IP de la siguiente ruta: src>main>java>com>CheckOutPACO>SQL>Paco_A.java en la linea de codigo 21 colocas la IP de tu dispositivo y el usuario que estes utilizando en el administrador de base de datos

con eso el proyecto debe funcionar correctamente.


## Créditos

Este proyecto fue creado por Abisai Teran (https://github.com/Kijibatoj)https://github.com/Kijibatoj).
