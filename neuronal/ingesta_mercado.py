import requests
import json

# Ejemplo para obtener precio de Binance
def actualizar_datos():
    url = "https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDC"
    response = requests.get(url)
    data = response.json()
    precio = data['price']
    
    # Preparamos el formato que Agatha ya reconoce
    nuevo_estado = f"{{activo:usdt, precio_actual:{precio}, meta:0.02, riesgo:0.15}}"
    
    # Escribimos esto en el archivo que Agatha lee en /neuronal/
    with open('neuronal/datos_sistema.txt', 'w') as f:
        f.write(nuevo_estado)
    print(f"Datos actualizados en el núcleo: {precio}")

actualizar_datos()
