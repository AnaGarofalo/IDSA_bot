import csv

file = open('./lala.csv')
csvreader = list(csv.reader(file))

print("HORARIOS")
print()
for i in range(1,len(csvreader)):
    print(csvreader[i][0] + ": " + csvreader[i][1] + " (duración aproximada " + csvreader[i][2]+")")

print()
print("LINKS A LAS CLASES EN VIVO")
print()
for i in range(1,len(csvreader)):
    print(csvreader[i][0] + ": " + csvreader[i][3] )
print()

print("LINKS A LAS CLASES GRABADAS")
print()
for i in range(1,len(csvreader)):
    print(csvreader[i][0] + ": " + csvreader[i][4] )
print()