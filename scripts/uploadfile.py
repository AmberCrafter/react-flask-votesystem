import numpy as np
import pandas as pd
class uplaoder:
    def __init__(self) -> None:
        pass

    def readfile_excel(self,filename):
        book = pd.read_excel(filename)
        header = list(book.columns)
        data = book.to_numpy()
        mask = pd.isna(book).to_numpy()
        data[mask] = None
        data.tolist()
        self.data = dict(header=header, data=data)

    def readfile_csv(self,filename):
        f = open(filename, encoding='big5')
        header = f.readline().strip().split(',')

        data = []
        readin = f.readline()
        while readin:
            readin = readin.strip().split(',')
            data.append(readin)
            readin = f.readline()

        f.close()
        self.data = dict(header=header, data=data)