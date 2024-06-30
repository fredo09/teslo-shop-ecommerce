# Título del Proyecto

Teslo Shop Ecommercer

Aplicacion web para hacer ecommerce app.

## Descripción

Aqui encontraremos una web app "Teslo shop" un ecommerce dende se encontrar la venta de ropa. Haciendo envios de estos
productos.

## Empezando 🚀

Para poder levantar el proyecto y empezar con la ambientación del proyecto.

### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

- Sistema Operativo que sea de tu preferencia
- Lenguaje de programación (JavaSscript)
- Framework (React, Next.js)
- Base de datos (PostgreSQL 15.3)

### Instalación Dev🔧

Una guía paso a paso sobre cómo configurar el entorno de desarrollo. ⚙ 

### 1.- Clona repositorio

Clonar el repositorio con el siguiente comando:

```bash
https://github.com/fredo09/teslo-shop-ecommerce.git
```
>[!NOTE]
>
> Recuerda que necesitas apuntar a la rama **develop** y crear tu rama para agregar nuevas funcionalidades.

### 2.- Reemplaza archivo .env_template.

Agrega tus variables de entorno, puedes usar el template ```.env_template``` y crear tu ```.env``` para agregar tus configuraciones.

### 3.- Instala dependencias Npm.

Usa el siguiente comando para instalar dependencias de node.

```bash
npm i
```

## Levanta base de datos en Docker.

Necesitaras levantar la base de datos de postgres que esta montado en docker

### 4.- Crea contenedor de Postgres.

Para generar la base de datos en docker ejecuta el siguiente comando ya que la instrucciones de construccion ya esta en el ```docker-compose.yml```

```bash
docker-compose -d up
```

## Configurarion de Prisma.

### 5.- Migracion de modelos para Prisma.

Ya habra una configuración de **prisma** de la base de datos para poder hacer tu migracion usa el siguiente comando: 

```bash
npx prisma migrate dev --name "name_migrate"
```

>[!NOTE]
>
> Recuerda que puedes poner el nombre de tu migracion, sustituyendo ```name_migrate``` por el que creas conveniente.

### 6.- Ejecutar Seed de base de datos.

Para llenar la base de datos con datos de prueba esto de **ambiente de desarrollo** puedes usar el siguiente comando:

```bash
npm run dev:seed
```

### 7.- Levantar el proyecto.

Y finalmente para levantar el proyecto usa el siguiente comando usando **turbo-webpack**:

```bash
npm run dev:turbo
```

## Ejecutando las Pruebas ⚙️

Instrucciones y ejemplos para ejecutar el conjunto de pruebas.

```bash
# proporciona un ejemplo
```

### Pruebas de Principio a Fin 🔩

Explica qué cubren estas pruebas, por qué son importantes y cómo interpretar sus resultados.

### Pruebas de Estilo de Código ⌨️

Descripción y ejemplos de las pruebas de estilo que estás utilizando.

```bash
# proporciona un ejemplo
```

## Despliegue 📦

Instrucciones sobre cómo desplegar esto en un sistema en vivo o ambiente de producción.

## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [Ruby](https://www.ruby-lang.org/es/) - El lenguaje utilizado
- [Ruby on Rails](https://rubyonrails.org) - El framework web utilizado
- [Ruby gems](https://rubygems.org) - Gestión de dependencias
- [Postgresql](https://www.postgresql.org) - Sistema de base de datos
- [Bulma IO](https://bulma.io) - Framework de CSS

## Contribuyendo 🖇️

Las contribuciones son lo que hacen a la comunidad de código abierto un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas es muy apreciada. Por favor, lee el [CONTRIBUTING.md](https://gist.github.com/brayandiazc/xxxxxx) para detalles sobre nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más sobre cómo usar este proyecto en nuestra [Wiki](https://github.com/your/project/wiki)

## Soporte

Si tienes algún problema o sugerencia, por favor abre un problema [aquí](https://github.com/your/project/issues).

## Roadmap

Ideas, mejoras planificadas y actualizaciones futuras

para el proyecto actual.

## Versionado 📌

Usamos [Git](https://git-scm.com) para el versionado. Para las versiones disponibles, ve las [etiquetas en este repositorio](https://github.com/your/project/tags).

## Autores ✒️

- **Brayan Diaz C** - _Trabajo inicial_ - [Brayan Diaz C](https://github.com/brayandiazc)

Mira también la lista de [contribuidores](https://github.com/your/project/contributors) que han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia XYZ - ve el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

Estamos agradecidos por las contribuciones de la comunidad a este proyecto. Si encontraste cualquier valor en este proyecto o quieres contribuir, aquí está lo que puedes hacer:

- Comparte este proyecto con otros
- Invítanos un café ☕
- Inicia un nuevo problema o contribuye con un PR
- Muestra tu agradecimiento diciendo gracias en un nuevo problema.

---

## Consejos Adicionales 📝

Aquí hay algunos consejos extra para aprovechar al máximo tu README:

- Mantén cada sección lo más concisa posible. Evita la pelusa innecesaria, ya que puede ser abrumadora para el lector.
- Asegúrate de que tus instrucciones de instalación, pruebas y despliegue sean detalladas y precisas. Si hay pasos adicionales que el lector necesita tomar (como instalar dependencias extra), asegúrate de incluirlos.
- Los visuales (imágenes, GIFs) son muy útiles para transmitir rápidamente lo que hace tu proyecto y cómo usarlo. Si puedes, incluye capturas de pantalla de tu aplicación en acción o GIFs que demuestren su uso.
- El tono amigable y acogedor que usas en tu README es excelente. Ayuda a hacer tu proyecto más acogedor para los colaboradores.

Recuerda, un buen README es crucial para hacer que tu proyecto sea atractivo y accesible para otros desarrolladores. ¡Buena suerte con tu proyecto!

---

⌨️ con ❤️ por [Brayan Diaz C](https://github.com/brayandiazc) 😊