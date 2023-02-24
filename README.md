# Ecommerce fast buy
Esta prueba, hecha de forma de ecommerce, está desarrollada sobre Next js, con ssr, el backend está conectado a MongoDb atlas, en donde se guardan los datos de los productos y de las ordenes realizadas. No integra pagos, se solicitan datos como el nombre, correo, celular y dirección al cliente para crear la orden con el detalle de los productos y su cantidad para posteriormente ser atendidas. Aún no implementa un panel administrativo pero sus bases están consolidadas para poder seguir con el desarrollo. La página se adapta a todos los dispositivos.

### Home

![Banner home](public/banner1.png)

### Carrito

![Carrito de compras](public/banner2.png)

## Pasos para hacer deploy:
1. Subir a un repositorio en github todos los archivos del proyecto (excluyendo dependencias y variables de entorno)
2. Crear una cuenta de vercel, y conectarla con la cuenta que alberga el repositorio de Github.
3. Importar el repositorio en Vercel
4. Una vez con el proyecto publicado, configurar las variables de entorno desde la vista del proyecto, configuración y variables de entorno (se pueden añadir manualmente o importar archivo .env)
5. Cambiar rutas de peticiones a la api, por el dominio dado por vercel.