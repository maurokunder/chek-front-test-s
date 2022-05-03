# Desafío Chek
## _Enlaces_

- [Enlace Swagger API](http://34.201.64.141/api/docs/) 
- [Enlace API Creado por AWS](http://34.201.64.141) 
- [Enlace Github FrontEnd](https://github.com/maurokunder/chek-front-test-s) 
- [Enlace Github FrontEnd](https://github.com/maurokunder/chek_back_test) 
- [Enlace Frontend desplegado en Heroku](http://chek-app-heroku.herokuapp.com/) 
- [Imagen Docker de DockerHub](https://hub.docker.com/r/moyar7/nestjs-api) 


## _Tecnolgias utilizadas FrontEnd_
A continuación se dan a conocer las tecnologias utilizadas en el proyecto frontend:

| Tecnologías | 
| ------ | 
| Typescript | 
| Angular v11 | 
| Angular Material| 
| Flex Layout| 

### Consideraciones:
##### Nuevo Destinatario:
- Se consideró el campo número de cuenta como críterio de unicidad de un Nuevo destinatario.
- Se realizaron todas las validaciones de los campos del formulario, evitando agregar un Nuevo destinatario si no se llenan todos los campos.

<img width="600" alt="Captura de Pantalla 2022-05-02 a la(s) 23 54 00" src="https://user-images.githubusercontent.com/60144263/166339379-69f0775c-8d00-488d-9d05-3512c1d78326.png">

<img width="600" alt="Captura de Pantalla 2022-05-02 a la(s) 23 54 49" src="https://user-images.githubusercontent.com/60144263/166339434-b38eaab1-3c36-4999-a1ff-2cfa9d810968.png">


#### Realizar Transferencia Destinatario

- Se valido el monto cuando es es cero o menor que cero.
- Se agregaron dos valores que permitan simular una transferencia, que son cupo total y cupo disponible que se va descontando en función de las transferencias realizadas.
- No se puede realizar una transferencia si la transferencia super al cupo disponible.
- Se utilizo un componente reutilizable para realizar el autocomplete del formulario que extrae información del servicio creado en el backend, y los campos posteriores se rellenan mediante binding de angular.

<img width="600" alt="Captura de Pantalla 2022-05-03 a la(s) 00 06 51" src="https://user-images.githubusercontent.com/60144263/166340426-81f0afab-88d3-4a6e-93d7-2ca66d760f5c.png">

<img width="600" alt="Captura de Pantalla 2022-05-03 a la(s) 00 06 05" src="https://user-images.githubusercontent.com/60144263/166340352-111219c3-8d92-4128-af0b-79092959d54c.png">

#### Historial de Transferencias
- Se utilizo el servicio creado en el backend para llenar la tabla de la vista


<img width="600" alt="Captura de Pantalla 2022-05-03 a la(s) 00 14 33" src="https://user-images.githubusercontent.com/60144263/166341035-65175761-a262-4207-bc0f-07bc8cf0a58d.png">

<img width="600" alt="Captura de Pantalla 2022-05-03 a la(s) 00 19 42" src="https://user-images.githubusercontent.com/60144263/166341528-a1a97478-d7fc-4ea0-8dc6-7f6e467dafab.png">

## Tecnolgias utilizadas Backend
A continuación se dan a conocer las tecnologias utilizadas en el proyecto BackEnd:

| Tecnologías | 
| ------ | 
| Typescript | 
| Nest.js | 
| MongoDB| 

### Consideraciones

- Para el desarrollo del backend se utilizo mongoDB como base de datos alojada en MongoDB Atlas, la cual permite tener la base de datos en una nube.
- Para el caso de la vista de Nuevo destinatario, se realizo la validación para que la api responda cuando se esta ingresando un nuevo destinatario con una cuenta repetida, ademas de solicitar todos los campos del formulario.
- Para el caso del transferir se valido el ingreso del monto como requerido en formulario de transferencia.
-  la estructura de ingreso eran dos componentes uno para el ingreso de destintario y otro para transferencias.
-  Se utilizo Nest.js para el desarrollo de la Api.

## _Tecnolgias utilizadas Despliegue_

A continuacion se dan a conocer las tecnologias para el despliegue:

| Tecnologías | 
| ------ | 
| Docker | 
| AWS | 
| Heroku| 

### Consideraciones
- Se utilizo Docker para crear la imagen de la API y luego subirla dockerhub.
- Se utilizo AWS utilizando una instancia de una maquina ubunut para desplegar la imagem de dockerhub mediante el uso de docker-compose.
- Se utilizo Heroku para desplegar la aplicación desarrollada en Angular.
- Tener en consideración que la arquitectura en la que se genera la imagen de docker debe ser consecuente con el destino, en este caso una buena forma de resolverlo es usar docker compose v2, dado que permite agregrar la plataforma de destinto de la imagen  al docker-compose.yml 
- Con respecto a Heroku tener en consideración utilizar express para su despliegue creando un archivo del tipo `server.js`

## _Comandos de utilidad_

#### Frontend

En la consola para desplegar la aplicacion de forma local, se desplegara en `localhost:4200`  se realiza el build dado que se modifico el `package.json`  para deplegar la aplicación mediante express usando el `server.js` como base.

```sh
npm run build
npm run start
```

#### Backend

En la consola para desplegar la aplicacion existen dos forma una es de forma local usando:
```sh
npm run start:dev
```
se desplegara en `localhost:3000`.
Por otro lado tambien se puede desplegar mediante Docker usando el puerto 80, utilizara todo los especificado en el  `Dockerfile`  y `docker-compose.yml`:
```sh
docker-compose up --build -d 
```

