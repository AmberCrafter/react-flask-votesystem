def wrapper_as_dict(datalist,header):
    res = []
    for value in datalist:
        dummy = {}
        for key,val in zip(header,value):
            dummy[key] = val
        res.append(dummy)
    return res