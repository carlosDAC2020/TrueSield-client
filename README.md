# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.
# ciclo de desarroollo simpel-app
- generacion del proyecto con el comando `ng new name-app`
- instalacion de dependencias ejemplo bootstrap con `npm install bootstrap jquery popper.js` 
- si solo se usa css no hay nesecidad de instalae `jquery popper.js` al instalrlo pon `./node_modules/bootstrap/dist/css/bootstrap.min.css` en los styles del archivo angular.json
- añade los js de bootstrap tambien en los scripts de angular.json en el siguiente orden 
    `./node_modules/jquery/dist/jquery.min.js` 
    `node_modules/popper.js/dist/umd/popper.min.js`
    `./node_modules/bootstrap/dist/js/bootstrap.min.js` 
- agregamos `@import ../node_modules/bootstrap/dist/css/bootstrap.min.css` ; al style.css dd la caroeta src
- ya podriasmos correr nuestro proyecto con `ng serve`
- maquetamos los componetes 
- declarmos los modelos de datos como clases usando por ejemplo `ng g cl models/employee` para crear una clase empleado
- importa import { CommonModule } from '@angular/common'; para poder hacer uso de directvas en los componentes 







# AngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
