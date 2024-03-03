


results = [
    {
        "lines": 2.5,
        "time": 8.7
    },    {
        "lines": 2.5,
        "time": 4.9
    },    {
        "lines": 2.5,
        "time": 5.6
    },    {
        "lines": 2.5,
        "time": 5.2
    },    {
        "lines": 2.5,
        "time": 4.3
    },    {
        "lines": 2.5,
        "time": 5.0
    },    {
        "lines": 2.5,
        "time": 4.8
    },    {
        "lines": 2.5,
        "time": 4.4
    },    {
        "lines": 2.5,
        "time": 7.7
    },    {
        "lines": 2.5,
        "time": 5.3
    },  {
        "lines": 7,
        "time": 13.9
    },  {
        "lines": 30,
        "time": 54.5
    },  {
        "lines": 34,
        "time": 60.0
    },  {
        "lines": 16,
        "time": 28.3
    },  {
        "lines": 20,
        "time": 33.9
    },  {
        "lines": 21,
        "time": 37
    }
]

suma = 0
for obj in results:
    print(obj["time"] / obj["lines"])
    suma += obj["time"] / obj["lines"]
print("El promedio de segundos por línea es: ", suma/len(results))