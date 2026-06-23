import os
import requests
from dotenv import load_dotenv

# 1. Cargamos el token desde el archivo .env
load_dotenv()
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")

# Configuración de tu cuenta
ACCOUNT_ID = "7a61ea34a6cb2f1775b7bbd5671a6cc3"
KV_NAMESPACE_ID = "db2296fcbd6d48b2a34bce310e0626b2"

def actualizar_memoria_agatha():
    # A. Obtener precio de Binance con User-Agent para evitar bloqueo 4xx
    try:
        url_binance = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        headers_binance = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response_binance = requests.get(url_binance, headers=headers_binance)
        response_binance.raise_for_status() # Lanza error si no es 200
        data = response_binance.json()
        precio_btc = data['price']
        print(f"Precio actual de BTC: {precio_btc}")
    except Exception as e:
        print(f"Error al conectar con Binance: {e}")
        return

    # B. Enviar a Cloudflare (KV)
    url_cf = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{KV_NAMESPACE_ID}/values/precio_btcusdt"
    
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "text/plain"
    }

    try:
        response_cf = requests.put(url_cf, data=precio_btc, headers=headers)
        if response_cf.status_code == 200:
            print("Éxito: Memoria de Agatha actualizada correctamente.")
        else:
            print(f"Error en Cloudflare ({response_cf.status_code}): {response_cf.text}")
    except Exception as e:
        print(f"Error al enviar datos a Cloudflare: {e}")

if __name__ == "__main__":
    actualizar_memoria_agatha()
