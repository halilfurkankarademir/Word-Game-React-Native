import string
import json

filepath = "C:/Users/hfk/Desktop/words.txt"

with open(filepath,'r', encoding='utf-8') as file:
    content = file.read()

wordList = content.splitlines()

_5LetterWords = []

for word in wordList:
    if(len(word)==5):
        _5LetterWords.append(word)
    else:
        continue
    

with open('wordsTr.json','w',encoding='utf-8') as wordJson:
    json.dump(_5LetterWords,wordJson,ensure_ascii=False,indent=4)