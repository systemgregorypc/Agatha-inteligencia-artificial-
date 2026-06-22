import sys

try:
    import requests
    print("Libreria requests cargada correctamente.")
except ImportError:
    print("Error: Debes instalar requests con 'pip install requests'")
    sys.exit()

def actualizar_datos():
    try:
        # Probamos la conexion a Binance
        url = "https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDC"
        response = requests.get(url, timeout=5)
        response.raise_for_status() # Verifica si hay error de servidor
        precio = response.json()['price']
        
        datos = f"{{activo:usdt, precio_actual:{precio}, meta:0.02, riesgo:0.15}}"
        
        with open('neuronal/datos_sistema.txt', 'w') as f:
            f.write(datos)
        print("Exito: datos escritos.")
        
    except Exception as e:
        print(f"Error critico: {e}")

if __name__ == "__main__":
    actualizar_datos()
