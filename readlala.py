import csv

file = open('./lala.csv')
csvreader = list(csv.reader(file))

for i in range(1,len(csvreader)):
    print()
    for j in range(0,len(csvreader[i])):
        print(csvreader[0][j], csvreader[i][j])