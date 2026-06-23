import requests
import time

def monitorear_precio():
    precio_anterior = 0
    while True:
        try:
            # 1. Obtener precio actual
            res = requests.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT").json()
            precio_actual = float(res['price'])
            
            # 2. Comparar
            if precio_actual != precio_anterior:
                print(f"Agatha: El precio ha cambiado a {precio_actual} USDT, papá.")
                # Aquí puedes añadir una notificación visual o sonora
                precio_anterior = precio_actual
                
            # 3. Esperar 60 segundos antes de volver a preguntar
            time.sleep(60)
            
        except Exception as e:
            print(f"Agatha: Perdí conexión, papá. Error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    monitorear_precio()
