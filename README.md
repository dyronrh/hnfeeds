# hnfeeds

Este proyecto consta de dos piezas backend y front-end
Requisitos
Mongodb instalado y corriendo en la maquina

Una vez clonado el proyecto instalar las dependencias de node tanto para el cliente como para el server
1-para el cliente front-end se encuentra en la carpeta hnclient
  para probar el mismo puede hacer un ng serve(para prueba) como requerimiento previamente este corriendo el backend(Node)
2-para el server instalar las dependencias de node en la raíz del proyecto
  puede ejecutar este servicio con el comando:
  Node app.js 
Dockerizado:
 para desplegar este proyecto dockerizado puede hacer mediante el siguiente comando:
 se desplegara 3 contenedores corriendo con las piezas del backend, front-end(nginx) y mongodb
 docker-compose up --build -d
