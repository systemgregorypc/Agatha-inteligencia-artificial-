import requests
import os
from dotenv import load_dotenv

# 1. Cargar configuración desde .env
load_dotenv()
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")

# 2. CONSTANTES DE TU INFRAESTRUCTURA
ACCOUNT_ID = "7a61ea34a6cb2f1775b7bbd5671a6cc3"
NAMESPACE_ID = "db2296fcbd6d48b2a34bce310e0626b2"

def actualizar_memoria(clave, valor):
    """Envía un dato a tu base de datos KV (Agatha-core)"""
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/values/{clave}"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "text/plain"
    }
    
    try:
        response = requests.put(url, data=str(valor), headers=headers)
        if response.status_code == 200:
            return True
        else:
            print(f"Error Cloudflare: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Error de conexión: {e}")
        return False

def obtener_precio_binance(simbolo):
    """Consulta el precio actual en Binance"""
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={simbolo}"
    try:
        response = requests.get(url)
        data = response.json()
        return data.get('price')
    except Exception as e:
        print(f"Error consultando Binance: {e}")
        return None

def main():
    print("--- Iniciando actualización de Agatha ---")
    simbolo = "BTCUSDT"
    precio = obtener_precio_binance(simbolo)
    
    if precio:
        print(f"Precio obtenido: {precio}")
        if actualizar_memoria(f"precio_{simbolo.lower()}", precio):
            print("Éxito: Memoria de Agatha actualizada correctamente.")
        else:
            print("Fallo: No se pudo escribir en la memoria.")
    else:
        print("Fallo: No se pudo obtener el precio.")

if __name__ == "__main__":
    main()
