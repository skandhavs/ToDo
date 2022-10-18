import encodings
import numpy as np
import pandas as pd
from io import StringIO
url="https://raw.githubusercontent.com/cognizance-amrita/AI-Tasks/main/Q4-Dataset.csv"
df=pd.read_csv(url)
df.to_csv("test.csv",index=False)
struct_arr = pd.read_csv('test.csv').to_records(index=False)
struct_arr=struct_arr.view(np.recarray)
ordered_struct_arr=np.sort(struct_arr,order="rating")
print(ordered_struct_arr)


