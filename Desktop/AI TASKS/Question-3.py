sixLetterWords=[]
WordsList=[]
theMostFrequentWord=""
presentHighestCount=0
with open('about.txt','r') as f:
    for line in f:
        lineUniform=line.replace(',' ,'').split(" ")
        for word in lineUniform:
            if len(word) == 6:
                sixLetterWords.append(word)
        lineUniform=line.lower().replace('.' ,'').split(" ")
        for word in lineUniform:
            WordsList.append(word)
    for i in range(0,len(WordsList)):
        counter=1
        j=1+1
        for j in range(0,len(WordsList)):
            if(WordsList[i]==WordsList[j]):
                counter=counter+1
        if(counter > presentHighestCount):
            presentHighestCount = counter
            theMostFrequentWord = WordsList[i]
print("\n")
sixLetterWords=list(set(sixLetterWords))
print("The Six letter words in the list are",end=" ")
for i in range(0,len(sixLetterWords)):
    if(i==(len(sixLetterWords)-2)): 
        print(sixLetterWords[i],end=" and ")    
    elif(i==(len(sixLetterWords)-1)):
        print(sixLetterWords[i],end=".")
    else:
        print(sixLetterWords[i],end=",")        
print("\n")   
print("The most frequent word is",theMostFrequentWord)
print("\n") 

            


               
