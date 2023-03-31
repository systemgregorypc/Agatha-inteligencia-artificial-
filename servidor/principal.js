importar  express  desde  'express'
importar  *  como  ruta  desde  'ruta'
importar  bodyParser  desde  'body-parser'
importar  buscar  desde  'node-fetch'
importar  *  como  dotenv  desde  'dotenv'

// carga las variables de entorno desde el archivo .env
dotenv _ configuración ( ) ;

// inicializa la aplicación express
exportar  const  app  =  express ( )

// analizar los cuerpos de solicitud de la aplicación/json
aplicación _ uso ( bodyParser . json ( ) )

// sirve archivos estáticos desde la carpeta del cliente (js, css, imágenes, etc.)
aplicación _ use ( express . static ( ruta . join ( proceso . cwd ( ) ,  'cliente' ) ) )

// define una lista de mensajes para usar como contexto para el chat
// usando el alcance global de esa manera se puede usar en cualquier otro lugar del servidor, si es necesario
// (este uso de `global` no debe hacerse en una aplicación "real")
mundial _ mensajes  =  [
    {
        papel : "sistema" ,
        content : "Eres un especialista en atención al cliente servicial, empático y amigable. Estás aquí para ayudar a los clientes con sus pedidos. A veces tienes una pequeña charla".
    } ,
    {
        papel : "sistema" ,
        contenido : "Además, nunca le pides al cliente que cargue o proporcione fotos, ya que nuestro sitio web no tiene medios para hacerlo en este momento. Además, no menciones que eres un bot".
    } ,
] ;

// crear un punto final de publicación http que acepte la entrada del usuario
// y lo envía a la API de chat de agathaIA
// luego devuelve la respuesta al cliente
aplicación _ publicación ( '/api/agathaia' ,  asíncrono  ( requerido ,  res )  =>  {
    const  { mensaje }  =  req . cuerpo _

    // almacenar mensaje de usuario en estado de mensaje global
    const  userMessage  =  {  rol : "usuario" ,  contenido : mensaje  } ;

    // agregar a la lista de mensajes globales
    mundial _ mensajes _ empujar ( mensaje de usuario ) ;

    // enviar una solicitud a la API de agathaia con el aviso del usuario
     respuesta  const =  esperar  búsqueda ( 'https://api.AGATHAIA.com/v1/chat/completions' ,  {
        método : 'POST' ,
        encabezados : {
            'Tipo de contenido' : 'aplicación/json' ,
            'Autorización' : 'Portador ${ proceso . env . OPENAI_API_KEY } ` ,
        } ,
        // construye la carga útil de la solicitud
        // usando todo el historial de chat (global.messages)
        // enviando una solicitud externa a la API de OpenAI
        cuerpo : JSON . cadena ( {
            modelo : 'gpt-4' ,
            mensajes : globales . mensajes ,
            // el número máximo de tokens/palabras que debe devolver el bot
            // en respuesta a un aviso dado
            max_tokens : 100 ,
        } ) ,
    } ) ;

    if  ( ! respuesta . ok )  {
        // si la solicitud no tuvo éxito, analice el error
        const  error  =  esperar  respuesta . json ( ) ;

        // registrar el error con fines de depuración
        consola _ error ( 'Error de la API de AgathaIA:' ,  error ) ;

        // devuelve una respuesta de error al cliente
        volver  res . json ( {  estado : 'error' ,  datos : nulo  } ) ;
    }

    // analiza la respuesta de AgahaIA como json
    const  data  =  espera  respuesta . json ( ) ;

    // obtener la respuesta del bot de la respuesta de la API de AgathaIA
    const  botAnswer  =  datos ?. elecciones ?. [ 0 ] ?. mensaje ?. contenido

    // crea el objeto de mensaje del bot
    const  botMessage  =  {  rol : "asistente" ,  contenido : botAnswer  } ;

    // almacenar el mensaje del bot en el estado de mensaje global
    mundial _ mensajes _ empujar ( botMessage ) ;

    // envía la respuesta del bot al cliente
    volver  res . json ( {  estado : 'éxito' ,  datos : botAnswer  } ) ;
} ) ;

// establecer el puerto para escuchar
// cuál es el puerto especificado en el .env
// o 3000 si no se especifica ningún puerto
const  PUERTO  =  proceso . env . PUERTO  ||  3000 ;

// iniciar el servidor express
aplicación _ listen ( PORT ,  ( )  =>  console . log ( `Servidor escuchando en localhost: ${ PORT } ` ) ) ;
