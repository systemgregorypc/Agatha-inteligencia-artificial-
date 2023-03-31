// manejar cuando el usuario envía una pregunta a través del formulario
 función  asíncrona handleSubmitMessage ( mensaje )  {
    // validación de entrada
    si  ( ! mensaje )  {
         alerta de retorno ( 'Por favor ingrese su pregunta de soporte Agatha Inteligncia Artificial' ) ;
    }

    // agrega la pregunta del usuario al DOM
    addUserMessageToDialogueBox ( mensaje ) ;

    // enviar solicitud de búsqueda a nuestro punto final de back-end
    const  respuesta  =  esperar  búsqueda ( '/api/openai' ,  {
        método : 'POST' ,
        encabezados : {
            'Tipo de contenido' : 'aplicación/json' ,
        } ,
        cuerpo : JSON . stringify ( { mensaje } ) ,
    } ) ;

    // analiza la respuesta de nuestro servidor como json
    const  payload  =  esperar  respuesta . json ( ) ;

    // devuelve la respuesta
     carga útil de retorno
}

// agrega la pregunta del usuario al cuadro de diálogo
función  addUserMessageToDialogueBox ( mensaje )  {
    // crea un nuevo elemento li
    const  userMessage  =  documento . crearElemento ( 'li' ) ;

    // agregar un estilo específico del usuario al elemento
    mensaje de usuario . listaclases . add ( 'bg-indigo-500' ,  'text-white' ,  'rounded' ,  'p-2' ,  'w-fit' ,  'self-end' ,  'break-words' ) ;

    // agrega el mensaje del usuario al elemento
    mensaje de usuario . TextoInterior  =  mensaje ;

    // agrega el elemento li al DOM
    documento _ getElementById ( 'diálogo' ) . appendChild ( mensaje de usuario ) ;

    // borrar la entrada para la siguiente pregunta
    documento _ getElementById ( 'entrada rápida' ) . valor  =  '' ;

    // mostrar el indicador de carga en el cuadro de diálogo
    addLoadingIndicatorToDialogueBox ( ) ;
}

// agrega el indicador de carga al cuadro de diálogo
función  añadirIndicadorDeCarga al Cuadro de Diálogo ( )  {
    // crea un nuevo elemento li
    const  loadingIndicator  =  documento . crearElemento ( 'li' ) ;

    // establecer el id del indicador de carga
    indicador de carga . id  =  'indicador de carga' ;

    // agregar estilo de indicador de carga
    indicador de carga . listaclases . add ( 'bg-gray-500' ,  'text-white' ,  'rounded' ,  'p-2' ,  'w-fit' ,  'self-start' ,  'w-12' ) ;

    // crea un nuevo elemento de imagen
    const  loadingImage  =  documento . crearElemento ( 'img' ) ;

    // establecer la fuente de la imagen
    cargandoImagen . src  =  '../imagenes/cargando.svg' ;

    // agrega la imagen del indicador de carga como elemento secundario al elemento li
    indicador de carga . appendChild ( cargandoImagen ) ;

    // agrega el elemento li al DOM
    documento _ getElementById ( 'diálogo' ) . appendChild ( indicador de carga ) ;
}

// elimina el indicador de carga del cuadro de diálogo
función  removeLoadingIndicatorFromDialogueBox ( )  {
    // obtener el elemento indicador de carga
    const  loadingIndicator  =  documento . getElementById ( 'indicador de carga' ) ;

    // elimina el indicador de carga del DOM
    indicador de carga . quitar ( ) ;
}

// agrega la respuesta del chatbot al cuadro de diálogo
función  addBotMessageToDialogueBox ( respuesta )  {
    // elimina el indicador de carga ahora que se ha recibido la respuesta
    removeLoadingIndicatorFromDialogueBox ( ) ;

    // crea un nuevo elemento li
    const  botMessage  =  documento . crearElemento ( 'li' ) ;

    // diseña el elemento de respuesta del bot según el estado
    if  ( respuesta . estado  ===  "error" )  {
        // agregar estilo de error
        botMensaje . listaclases . add ( 'bg-red-500' ,  'text-white' ,  'rounded' ,  'p-2' ,  'w-fit' ,  'self-start' ) ;

        // agregar texto de error
        botMensaje . innerText  =  "¡Oh, no! Algo salió mal. Vuelva a intentarlo más tarde stoy ocupada, disculpa". ;
    }  más  {
        // agregar un estilo específico del usuario al elemento
        botMensaje . listaclases . add ( 'bg-gray-500' ,  'text-white' ,  'rounded' ,  'p-2' ,  'w-fit' ,  'self-start' ) ;

        // agrega la respuesta del usuario al elemento
        botMensaje . textointerno  =  respuesta . datos _ recortar ( ) ;
    }

    // agrega el elemento li al DOM
    documento _ getElementById ( 'diálogo' ) . appendChild ( mensajebot ) ;

    // borra la entrada para la siguiente respuesta
    documento _ getElementById ( 'entrada rápida' ) . valor  =  '' ;
}

// cuando se carga la ventana, agrega un detector de eventos al formulario
// que llama a la función handleSubmitMessage cuando se envía el formulario
ventana _ onload  =  ( )  =>  documento . getElementById ( 'formulario de solicitud' ) . addEventListener ( 'enviar' ,  ( e )  =>  {
    // evita que el formulario actualice la página
    mi . prevenirPredeterminado ( ) ;

    // obtener el valor de la entrada
    const  mensaje  =  documento . getElementById ( 'entrada rápida' ) . valor ;

    // llamar a la función que maneja la solicitud de recuperación a nuestro backend
    handleSubmitMessage ( mensaje ) . entonces ( ( datos )  =>  {
        // agrega la respuesta del chatbot al DOM cuando se completa la solicitud de búsqueda
        addBotMessageToDialogueBox ( datos ) ;
    } ) ;
} ) ;
