import pandas as pd # type: ignore

df = pd.read_csv("seatPlan.csv")

nameList = list(df.iloc[:,0])
idList = list(df.iloc[:,1])
examHallList = list(df.iloc[:,2])
seatList = list(df.iloc[:,3])

keepLoop = True

while(keepLoop):
        
    userName = input("Enter your name [type EXIT to exit]: ").replace(" ","").lower()
    foundName = False
    if userName == "exit":
        break
    c = 0
    for nextName in nameList:
        if userName == (nextName.replace(" ","").lower()):
            print(f"Name: {nameList[c]} | Exam Hall: {examHallList[c]}  | Seat: {seatList[c]}")
            foundName = True
            break
        c += 1
    if foundName != True:
        print("The name you have given does not exist in our records.")