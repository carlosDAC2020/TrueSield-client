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


# Protección contra Ataques Comunes

## 1. Ataques de Interceptación (Man-in-the-Middle - MITM)
**Protección**:
- **Uso de HTTPS**: Asegura que toda la comunicación entre el cliente (Angular) y el servidor (Django) esté cifrada. Esto dificulta que un atacante intercepte y lea los datos que se transmiten.

## 2. Ataques de Cross-Site Scripting (XSS)
**Protección**:
- **Almacenamiento Seguro del Token**: Al almacenar el token de autenticación en `HttpOnly cookies` o asegurarte de que no se almacene en `localStorage` o `sessionStorage`, reduces el riesgo de que un script malicioso pueda acceder a tu token.

## 3. Cross-Site Request Forgery (CSRF)
**Protección**:
- **Autorización de Solicitudes**: Usar un token en las cabeceras de las solicitudes HTTP asegura que cada solicitud está autenticada. Aunque no se menciona explícitamente, Django por defecto tiene protección CSRF para formularios. Si decides no usar cookies HttpOnly, asegurarte de implementar CSRF correctamente es esencial.

## 4. Ataques de Fuerza Bruta
**Protección**:
- **Rotación de Tokens**: Aunque no se detalló en los pasos, implementar la rotación de tokens y establecer una política de caducidad para los tokens puede ayudar a mitigar ataques de fuerza bruta al limitar el tiempo en que un token es válido.
- **Bloqueo de Cuentas**: Aunque no se mencionó, podrías implementar un mecanismo de bloqueo de cuentas después de varios intentos fallidos de inicio de sesión para mitigar este riesgo.

## 5. Ataques de Enumeración de Usuarios
**Protección**:
- **Respuestas de Error Genéricas**: Al no dar detalles específicos sobre si un nombre de usuario o contraseña es incorrecto, se dificulta que un atacante pueda determinar qué nombres de usuario son válidos en tu sistema.

## 6. Acceso No Autorizado a Rutas Protegidas
**Protección**:
- **Guard de Autenticación**: Asegura que solo los usuarios autenticados puedan acceder a ciertas rutas. Redirige a los usuarios no autenticados a la página de inicio de sesión, protegiendo así las rutas sensibles.

## 7. Ataques de Interceptación de Sesiones
**Protección**:
- **Interceptor de Solicitudes HTTP**: Asegura que todas las solicitudes enviadas al servidor incluyen el token de autenticación. Esto previene que se realicen solicitudes no autenticadas a rutas protegidas.
- **Revocación de Tokens**: Implementar la posibilidad de revocar tokens comprometidos ayuda a mitigar el riesgo si un token es robado.

## 8. Seguridad en la Configuración de CORS
**Protección**:
- **CORS (Cross-Origin Resource Sharing)**: Configurar correctamente los CORS en Django permite que solo solicitudes desde dominios específicos (como tu aplicación Angular) sean aceptadas, protegiendo contra solicitudes no autorizadas desde otros dominios.

## Consideraciones Adicionales
- **Validación y Sanitización de Datos**: Asegúrate de validar y sanear todos los datos de entrada en el servidor para prevenir inyecciones de código.
- **Autenticación de Dos Factores (2FA)**: Considera implementar 2FA para una capa adicional de seguridad.
