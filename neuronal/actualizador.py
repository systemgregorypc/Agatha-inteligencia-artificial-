import os
import requests
from dotenv import load_dotenv

# 1. Cargamos el token desde el archivo .env
load_dotenv()
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")

# Configuración de tu cuenta
ACCOUNT_ID = "7a61ea34a6cb2f1775b7bbd5671a6cc3"
KV_NAMESPACE_ID = "db2296fcbd6d48b2a34bce310e0626b2"

def guardar_en_memoria(clave, valor):
    """Envía información al cerebro de Agatha en Cloudflare KV."""
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{KV_NAMESPACE_ID}/values/{clave}"
    
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "text/plain"
    }

    try:
        respuesta = requests.put(url, data=str(valor), headers=headers)
        if respuesta.status_code == 200:
            print(f"Éxito: Se ha guardado '{valor}' en la clave '{clave}'.")
        else:
            print(f"Error {respuesta.status_code}: {respuesta.text}")
    except Exception as e:
        print(f"Error de conexión: {e}")

# Ejemplo de uso:
if __name__ == "__main__":
    # Aquí puedes guardar cualquier dato de tus proyectos de investigación
    guardar_en_memoria("estado_sistema", "Operativo")
