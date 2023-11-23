# Sample from previous years
# Original: @andrewhoyer

inputdata = "(((()))))(("
floor,firstime = 0,0
for x in range(0,len(inputdata)):
    floor = (floor + 1) if inputdata[x]=='(' else (floor - 1) 
    if floor == -1 and firstime == 0: firstime = x+1

print(f"Ending floor {floor}, first time in basement {firstime}")