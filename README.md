# ToDoListAngular - Introducción general

El proyecto consiste en una ToDo List en la que cualquiera de las tareas se puede encontrar en el estado "Pending", "In Process" o "Finished". Para crear una tarea, ir al apartado de "Create Task". Una vez allí, es obligatorio proporcionar un nombre a la tarea. La descripción no es obligatoria, la fecha se genera automáticamente y la tarea se crea en el estado "Pending". 

Para cambiar el estado de las tareas de forma rápida, se puede hacer click en el "Status" de la tarea en la que aparecerá un pequeño menú para cambiar el estado. Si se desea cambiar otros campos, se dispone de la opción de editar, además de la de ver detalles y eliminar la tabla. Finalmente, hay un historical en el que se muestra el listado de tareas que han sido terminadas. 

El proyecto está realizado con Angular CLI versión 11.2.11


# Visualizar aplicación - Servidor hosting

### [Enlace 1](https://daw2-todolist.web.app/)
### [Enlace 2](https://daw2-todolist.firebaseapp.com/)

Se utiliza Firebase para el hosting y para el almacenamiento de las tareas. 

# Visualizar aplicación - Local

1. Ejecutar el siguiente comando en la cmd en local: git clone https://github.com/JuanmaRuizF/ToDoList-Angular
2. Navegar hacia la carpeta creada (cd ToDoList-Angular)
3. Abrir el proyecto (Para Visual Studio Code ejecutar "code .")
4. Ejecutar el comando "ng serve" dentro del directorio del proyecto
5. Acceder en el navegador a http://localhost:4200/


# Aspectos técnicos de la aplicación


El contenido de la aplicación como tal se encuentra dentro de la carpeta /src/app/

Dentro de esta carpeta se encuentran los siguientes archivos de interés: 

- **app-routing.module.ts** : las rutas a los distintos componentes 
- **app.component.html** : carga el header y el router-outlet con las rutas definidas en app-routing.module.ts
- **app.module.ts**: importaciones de los módulos a utilizar en el componente, entre los que se encuentra el módulo para la configuración de la base de datos en Firebase.
- **pages.service.ts**: Creación del servicio utilizado en la aplicación. Se encuentran los métodos para borrar o guardar tareas y los métodos necesarios para traer los datos de la base de datos con la condición adecuada (para el histórico sólo los datos que tengan de status "Finished" y el resto para la lista normal).

### Archivos de interés dentro de /src/app/components:
 
 - **/header** : el módulo con la cabecera de la página web. Es un navbar que utiliza enrutamiento para comunicarse con el resto de componentes
 - **/models** : se encuentra definida la interfaz (list.interface.ts) con los campos utilizados para crear/editar una tarea
 
 
### Archivos de interés dentro de /src/app/pages/:

- **/list** : es el módulo en el que está definido el componente principal de la aplicación con la tabla para mostrar las tareas en proceso o pendientes y las distintas acciones que se pueden hacer Utiliza los Angular Material de "icon" para los iconos de las distintas acciones que se pueden realizar, "button toggle" dentro de cada fila de la columna de Status, "table" para mostrar las distintas tareas y poder ordenarlas y "radio button" para poder cambiar el estado de una tarea. 
- **/details** : módulo en el que se encuentra el componente para visualizar los distintos campos de la tarea seleccionada
- **/edit** : módulo para la página de editar los datos de una tarea. 
- **/new** : formulario para la creación de una tarea nueva
- **/historical** : visualización mediante una tabla de las tareas que se encuentran en estado "Finished". 


# Enlaces de ayuda utilizados

- [Documentación de Angular Material](https://material.angular.io/components/categories)
- [CRUD Angular 11 Firebase](https://www.youtube.com/watch?v=nEfemck6iNk&ab_channel=DominiCode)
- [Deploy Angular Firebase](https://codigofacilito.com/articulos/deploy-angular-firebase)



