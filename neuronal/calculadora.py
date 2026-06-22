import sys

# Recibe la operacion como argumento, ej: "5+5"
operacion = "".join(sys.argv[1:]) 

try:
    resultado = eval(operacion)
    print(f"RESULTADO_CALCULO: {resultado}")
except:
    print("RESULTADO_CALCULO: Error en la operacion")
