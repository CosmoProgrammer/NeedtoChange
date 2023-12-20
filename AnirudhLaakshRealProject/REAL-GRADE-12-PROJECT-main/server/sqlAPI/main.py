# import mysql.connector
from random import randint

subColumnSaltKeys = {}
schema = {}

# cnx = mysql.connector.connect(
#     username='root', password='sql123', host='localhost', port='3306', database='project')
# cur = cnx.cursor()


def generateSaltKey():
    x = randint(0, 16)
    y = -10
    while y < x:
        y = randint(17, 26)
    return 'abcd'#'qwertyuiopasdfghjklzxcvbnm'[x:y]


def createTable(data):
    query = "create table inventory ("
    for dict in data:
        for element in dict:
            if element != 'subColumns' and dict['subColumns'] == []:
                query += str(dict[element]).replace('string',
                                                    'varchar(255)').replace('number', 'integer') + ' '

            elif element == 'subColumns' and dict['subColumns'] != []:
                subColumnSaltKeys[dict['name']] = generateSaltKey()
                print(subColumnSaltKeys)
                for subcolumn in dict[element]:
                    subcolumn['name'] = subcolumn['name'] + \
                        subColumnSaltKeys[dict['name']]
                    print(subcolumn)
                    for subcolumnHeader in subcolumn:
                        query += str(subcolumn[subcolumnHeader]).replace(
                            'string', 'varchar(255)').replace('number', 'integer') + ' '
                    query += ','
            print(query)
        query += ','
    k = 0
    for i in range(len(query) - 1, 0, -1):
        if query[i] == ',' or query[i] == ' ':
            k += 1
        else:
            break

    query = query[0:-k]
    query += ')'
    print(query)


def getRow(id):
    retDict = {}
    q = f'select * from inventory where ID={id};'
    # cur.execute(q)
    # data = cur.fetchone()
    headers = [i[0] for i in cur.description]
    for i in range(len(headers)):
        if str(headers[i]) not in subColumnSaltKeys:
            retDict += {str(headers[i]): data[i]}
        else:
            subColInds = []
            for j in range(len(headers)):
                if subColumnSaltKeys[str(headers[i])] in str(headers[j]):
                    subColInds += j
            retList = []
            for j in subColInds:
                retList += [data[j]]
            retList2 = []
            for j in subColInds:
                retList2 += [headers[j]]
            retDict += {str(headers(i)): [retList, retList2]}
    return retDict

def returnAll():
    #cur.execute('select * from inventory')
    #data = cur.fetchall()    
    #headers = [i[0] for i in cur.description]
    headers = ['ID', 'Public/NonPublic', 'Qty', 'Industry', 'Tasteabcd', 'Colourabcd', 'Smellabcd']
    data = ((1, 'Public', 10, 'cooking', 'mmm', 'blu-blu', 'ahhaaaa'),(2, 'Public', 3, 'cooking2', 'vack', 'brawn', 'cheee'))
    saltKeys = subColumnSaltKeys.values()
    print(saltKeys)
    subcolumnHeaderIndexes = []
    for i in saltKeys:
        t = []
        for j in range(len(headers)):
            print(i, headers[j])
            if i in headers[j]:
                t += [j]
        subcolumnHeaderIndexes += [t]
    returnList = []
    for row in data:
        rowList = []
        subColumnList = []        
        stopVal = -1
        for valueIndex in range(len(row)):            
            stopVal = max(checkSubColums(valueIndex, subcolumnHeaderIndexes))
            print(stopVal, row[valueIndex])            
            if valueIndex <= stopVal:
                subColumnList += [row[valueIndex]]
            else:
               rowList += [row[valueIndex]]
        if subColumnList != []:
            rowList += [subColumnList]
        returnList += [rowList]
    print(returnList)

def checkSubColums(index, subcolumnHeaderIndexes):
    print(subcolumnHeaderIndexes)
    for subColRoot in subcolumnHeaderIndexes:
        if index in subColRoot:
            return subColRoot
    return [-1]

def deleteRow(id): q = f'delete from inventory where id = {id};'

def addRow(rows):
    for i in rows:
        q = 'insert into inventory values('
        for j in range(len(i)):
            if type(i[j]) != list and len(i) - 1 != j:
                q += f'{i[j]},'
            elif type(i[j]) == list and len(i) - 1 != j:
                for k in i[j]:
                    q += f'{k},'
            elif type(i[j]) != list and len(i) - 1 == j:
                q += f'{i[j]});'
            elif type(i[j]) == list and len(i) - 1 == j:
                for k in len(i[j]):
                    if k != len(i[j]) - 1:
                        q += f'{i[j][k]},'
                    else:
                        q += f'{i[j][k]});'
        print(q)
def updateRow(row_data):
    query = 'update inventory set '
    cond = 0
    headerType = [i[1] for i in cur.description]
    headers = [i[0] for i in cur.description]
    c = 0
    for element in row_data:
        stg = ''
        if type(row_data[element]) != list:
            if element.lower == 'id':
                cond = row_data[element]
            elif element.lower != 'id':
                if headerType[c] == 253:
                    stg = str(element) + '=' + '"' + \
                        str(row_data[element]) + '"' + ','
                else:
                    stg = str(element) + '=' + str(row_data[element]) + ','
        else:
            saltKey = subColumnSaltKeys[element.lower()]
            changeInd = []
            for i in range(len(headers)):
                if saltKey in headers[i]:
                    changeInd += [i]
            c = 0
            for i in changeInd:
                print(c)
                if headerType[i] == 253:
                    stg += headers[i] + '=' + '"' + \
                        str(row_data[element][1][c]) + '"' + ','
                else:
                    stg += headers[i] + '=' + str(row_data[element][1][c])
                c += 1
        query += stg
        c += 1
        print(query)


# def createLoginTable(data):
#     query = "create table login (username varchar(255) primary key, password varchar(255), accessLevel varchar(255));"
#     cur.execute(query)
#     print(data)
#     for a in data:
#         q = f'insert into login values ("{a["username"]}", "{a["password"]}", "{a["accessLevel"]}");'
#         cur.execute(q)
#         cnx.commit()


# def login(user, password):
#     cur.execute('select * from login;')
#     data = cur.fetchall()
#     print(data)
#     for i in data:
#         if i[0:2] == (user, password):
#             return True
#         else:
#             return False


data = [
    {'name': "ID", 'type': "number", 'subColumns': []},
    {'name': "Public/NonPublic", 'type': "string", 'subColumns': []},
    {
        'name': "Qty",
        'type': "number",
        'subColumns' : []
    },
    {'name': "Industry", 'type': "string", 'subColumns': []},
    {
        'name': "'Type's",
        'type': "string",
        'subColumns': [
            {'name': "Taste", 'type': "string"},
            {'name': "Colour", 'type': "string"},
            {'name': "Smell", 'type': "string"},
        ],
    }
]

row_data = {"ID": 1, "Public/NonPublic": "Public", "Qty": [[
    ["Public"],
    ["Private"],
], [5, 10]], "Industry": "Cooking", "Types": [[
    ["Taste"],
    ["Colour"],
    ["Smell"],
], ["Sweet", "Green", "Pungent"]]}


addRow([[1, 'Public', 10, 'cooking', 'mmm', 'blu-blu', 'ahhaaaa'],[2, 'Public', 3, 'cooking2', 'vack', 'brawn', 'cheee']])