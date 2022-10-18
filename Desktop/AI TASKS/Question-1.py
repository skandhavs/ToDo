import re
import pandas as pd
with open('onlinefile.txt','r') as f:
   str=f.read()
   split_str=re.split("([0-9])+([a-zA-Z]+)([+-]?[0-9]+\.[0-9]+)",str)
   integer_part=split_str[1: :4]
   threeLetterPart=split_str[2: :4]
   FloatPart=split_str[3: : 4]
   Subject=split_str[4: :4]
   dict={ "Integer":integer_part,"Three Letters":threeLetterPart,"Floating Point Numbers":FloatPart,"Subject":Subject}
   df=pd.DataFrame(dict)
   df.to_csv('Filename2.csv',index=False)
   

   

 