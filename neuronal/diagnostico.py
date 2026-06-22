import os

ruta_archivo = "neuronal/datos_sistema.txt"

print(f"Buscando archivo en: {os.path.abspath(ruta_archivo)}")

if os.path.exists("neuronal/"):
    print("Directorio 'neuronal' encontrado.")
    with open(ruta_archivo, "w") as f:
        f.write("{activo:usdt, test:exitoso}")
    print("Archivo escrito correctamente.")
else:
    print("Error: El directorio 'neuronal' NO existe en esta ruta.")
