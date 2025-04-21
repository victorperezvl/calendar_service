# calendar_service
API REST que conecta Synthflow (plataforma para llamadas telefónicas con IA), con la API de Google Calendar y se encarga de gestionar la autenticación de los usuarios en Google, para así, mediante un agente de llamadas telefónicas con IA de Synthflow, poder agendar una cita en el Google Calendar del usuario, con hora y día concretadas en la llamada.

Funcionalidades:

  - Autenticación OAuth2 con Google
  - Almacenamiento seguro del token de actualización cifrado
  - Creación de eventos personalizados en Google Calendar
  - Enlace directo al evento creado
  - Acceso a información del perfil de Google (opcional)

Tecnologías utilizadas:

  - Node.js
  - Express
  - Google APIs (`googleapis`)
  - MySql 
  - Crypto (para encriptar/decriptar tokens)
  - Dotenv (para gestión de variables de entorno)

Variables de entorno:

  Crea un archivo `.env` con el siguiente contenido:
  
    GOOGLE_CLIENT_ID=TU_CLIENT_ID
    GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET
    GOOGLE_REDIRECT_URI=
    CRYPTO_KEY=TU_LLAVE_AES_256_EN_HEX
    DB_HOST
    DB_USER=
    DB_PASSWORD=
