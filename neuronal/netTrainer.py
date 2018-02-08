from Neurona import Neurona
from Geneagatha import algoritmoGenetico
from Neuralagatha import Red_Neurona
from math import exp,sqrt
from random import random, randint
import numpy as np


class Trainer():
    def __init__(self):
        self.neuralagatha = Red_Neurona()
        self.algGen = algoritmoGenetico()

    def trainGenetic(self, individuos, propiedades):
        generation = self.algGen.generarIndividuos(individuos, propiedades)



    def TrainIt(self):
        pass

    def addNeurona(self):
        while True:
            neuralNumber = int(input("Ingrese Cuantas neuronas posee la red:\n"))
            weights = np.zeros(neuralNumber*neuralNumber)


entrena = Trainer()
sobrevivientes = entrena.trainGenetic(10, 6)
