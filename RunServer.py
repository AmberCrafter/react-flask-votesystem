from flask import Flask, Response,jsonify,request, send_file, send_from_directory,stream_with_context
# from flask_cors import CORS
from numpy import isin
from sql import manager
from scripts import uploadfile
import os, pathlib
import pandas as pd

import io, csv

app = Flask(__name__)
app.template_folder = 'frontend/build'
app.static_folder = 'frontend/build/static'
app.static_url_path = ''
# CORS(app)

# app.config['JSON_AS_ASCII'] = False
# app.config['JSONIFY_MIMETYPE'] = "application/json;charset=utf-8"

DB_LOCATION = './sql/data.db'
UPLOAD_FOLDER = './upload_tmp/'
BASEDIR = os.path.abspath(os.path.dirname(__name__))
ALLOWED_EXTENSIONS = set(['xlsx', 'xls'])

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/api/echo")
def echo():
    return "echo"

@app.route("/", defaults={'path': ''})
def server(path):
    return send_from_directory(app.template_folder, 'index.html')

@app.route("/api/get_all_member", methods=["GET"])
def get_all_member():
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    data = sql.select_all_member()
    return jsonify(dict(results=data))

@app.route("/api/get_all_data", methods=["GET"])
def get_all_data():
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    # data = sql.select_all('data')
    data = sql.select_all_data_withname()
    return jsonify(dict(results=data))

@app.route("/api/get_id_data", methods=["GET"])
def get_id_data():
    selected_id = request.values.get('id')

    sql = manager.SQL(DB_LOCATION)
    sql.open()
    # data = sql.select_all('data')
    data = sql.select_id_data_withname(selected_id)
    return jsonify(dict(results=data))

@app.route("/api/get_vote_results", methods=["GET"])
def get_vote_results():
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    # data = sql.select_all('data')
    data = sql.select_vote_results()
    return jsonify(dict(results=data))

@app.route("/api/get_meta", methods=["GET"])
def get_meta():
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    data = sql.select_meta_asjson()
    return jsonify(dict(results=data))

@app.route("/api/new_member", methods=["GET", "POST"])
def new_member():
    name = request.values.get("name")
    contribution = request.values.get("contribution")
    if len(name)==0: return jsonify(success=False), 500
    if (float(contribution)<0): return jsonify(success=False), 500

    sql = manager.SQL(DB_LOCATION)
    sql.open()
    sql.new_member(name,contribution)
    return jsonify(success=True)

@app.route("/api/update_data_vote", methods=["GET", "POST"])
def update_data_vote():
    voter = request.values.get("name")
    n_round = request.values.get("vote_round")
    target_id = request.values.get("value")
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    sql.update_data_vote(voter,n_round,target_id)
    return jsonify(success=True)

@app.route("/api/update_member", methods=["GET", "POST"])
def update_member():
    name = request.values.get("name")
    contribution = request.values.get("contribution")
    comment = request.values.get("comment")
    if len(name)==0: return jsonify(success=False), 500

    sql = manager.SQL(DB_LOCATION)
    sql.open()
    
    sql.update_member_contribution(name,contribution)
    sql.update_member_comment(name,comment)
    return jsonify(success=True)

@app.route("/api/update_meta", methods=["GET", "POST"])
def update_meta():
    key = request.values.get("key")
    value = request.values.get("value")

    if isinstance(value, type(None)): return jsonify(success=False), 400
    if value=='': return jsonify(success=False), 400

    sql = manager.SQL(DB_LOCATION)
    sql.open()
    try:
        sql.update_meta(key, value)
        return jsonify(success=True)
    except:
        return jsonify(success=False), 500

# @app.route("/api/frash_table", methods=['GET'])
# def frash_table():
#     tablename = request.values.get("tablename")
#     sql = manager.SQL(DB_LOCATION)
#     sql.open()
#     try:
#         sql.frash_table(tablename)
#         return jsonify(success=True)
#     except:
#         return jsonify(success=False), 500

@app.route("/api/upload_member", methods=['POST'])
def upload_member():
    def allowed_file(filename):
        return pathlib.Path(filename).suffix[1:] in ALLOWED_EXTENSIONS
    file_dir = pathlib.Path(BASEDIR, app.config["UPLOAD_FOLDER"])
    if not os.path.exists(file_dir): os.mkdir(file_dir)

    f = request.files['File']
    if f and allowed_file(f.filename):
        fname = f.filename
        # suffix = pathlib.Path(fname).suffix
        filepath = pathlib.Path(file_dir, fname)
        f.save(filepath)

        # openfile and upload member
        sql = manager.SQL(DB_LOCATION)
        sql.open()

        uploader = uploadfile.uplaoder()
        uploader.readfile_excel(filepath)
        for (name,contribution,comment) in uploader.data['data']:
            sql.new_member(name,contribution,comment)
        sql.close()
        os.remove(filepath)
        return jsonify(success=True)
    else:
        return jsonify(success=False), 500

@app.route("/api/download_upload_member_template", methods=['GET',"POST"])
def download_upload_member_template():
    def generator(): 
        buffer = io.BytesIO()

        # # csv output
        # book = csv.writer(buffer)

        # # write out meta data
        # # header
        # book.writerow([codecs.BOM_UTF8.decode("utf8")+codecs.BOM_UTF8.decode()+'Name','Contribution','Comment'])
        # yield buffer.getvalue()

        # # header = []
        # # book.writerow(header)
        # # yield buffer.getvalue()
        # # buffer.seek(0); buffer.truncate(0)

        # excel output 
        writer = pd.ExcelWriter(buffer, engine='openpyxl') #xlsx
        book = pd.DataFrame([],columns=['姓名', '投資額', '備註'])
        book.to_excel(writer, index=False)
        writer.save()
        yield buffer.getvalue()


    response = Response(stream_with_context(generator()), mimetype='application/vnd.ms-excel')
    response.headers.set("Content-Disposition","attachment",filename=f"template.xlsx")
    return response

@app.route("/api/export_data", methods=['GET',"POST"])
def export_results():
    file_dir = pathlib.Path(BASEDIR, app.config["UPLOAD_FOLDER"])
    if not os.path.exists(file_dir): os.mkdir(file_dir)
    filepath = pathlib.Path(file_dir, 'data.csv')

    sql = manager.SQL(DB_LOCATION)
    sql.open()
    meta = sql.select_meta_asjson()
    data = sql.select_all_data_withname()

    keys = ['id','name','contribution','number_vote','comment','vote_1_name','vote_2_name','vote_3_name',
    'vote_4_name','vote_5_name','vote_6_name','vote_7_name']
    data = [[str(value[key]) for key in keys] for value in data]
    data = [[value if not value in ['null', 'None'] else '' for value in values] for values in data]

    # reset the data index
    for i in range(len(data)):
        data[i][0]=i+1

    # # csv output
    # # create a export file
    # f = open(filepath, 'w', encoding='utf8')
    # # header
    # header = [
    #     codecs.BOM_UTF8.decode("utf8")+codecs.BOM_UTF8.decode()+"Index",
    #     'Name','Contribution','Comment',"Vote_1_index","Vote_1_name",
    #     "Vote_2_index","Vote_2_name","Vote_3_index","Vote_3_name","Vote_4_index","Vote_4_name",
    #     "Vote_5_index","Vote_5_name","Vote_6_index","Vote_6_name","Vote_7_index","Vote_7_name"
    # ]
    # f.write(','.join(header)+'\n')

    # for val in data:
    #     f.write(','.join(val)+'\n')
    # f.close()
    # return send_file(filepath, as_attachment=True)

    # excel output
    def generator(meta, data): 
        buffer = io.BytesIO()
        # excel output 
        writer = pd.ExcelWriter(buffer, engine='openpyxl') #xlsx
        book = pd.DataFrame(data,columns=['編號','姓名', '投資額', f'投票權數(基數: {meta["converter"]})', '備註', '1號票_姓名',
            '2號票_姓名', '3號票_姓名', '4號票_姓名', '5號票_姓名', '6號票_姓名', '7號票_姓名'
        ])
        book.to_excel(writer, index=False)
        writer.save()
        yield buffer.getvalue()

    sql.close()
    response = Response(stream_with_context(generator(meta, data)), mimetype='application/vnd.ms-excel')
    response.headers.set("Content-Disposition","attachment",filename=f"template.xlsx")
    return response

@app.route("/api/delete_member", methods=["GET"])
def delete_member():
    name = request.values.get('name')
    if isinstance(name, type(None)): return jsonify(success=False), 400
    sql = manager.SQL(DB_LOCATION)
    sql.open()
    try:
        sql.delect_member(name)
        sql.close()
        return jsonify(success=True)
    except:
        sql.close()
        return jsonify(success=False), 500

@app.route("/api/clear_database", methods=['GET','POST'])
def clear_database():
    try:
        os.remove(DB_LOCATION)
        return jsonify(success=True)
    except:
        return jsonify(success=False), 500

if __name__ == "__main__":
    app.run()