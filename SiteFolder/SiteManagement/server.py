# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:12:02 2019

@author: Luis Cristóvão
"""

import flask as fl
from importlib.machinery import SourceFileLoader
import json
#import module aed.py from folder modules
aed = SourceFileLoader("aed.py", "modules/aed.py").load_module()
#aed.get_all_posts()
index=SourceFileLoader("index.py", "modules/index.py").load_module()

json_files=SourceFileLoader("json_files.py", "modules/json_files.py").load_module()
#print(json.dumps(index.Menu()))
#Start server-----------------------------
app = fl.Flask(__name__)



@app.route('/')
def index_route():
    global index
    return fl.render_template('index.html',menu=index.menu)

@app.route('/add')
def add():
    global aed
    form_inputs=aed.send_all_posts_form()
    return fl.render_template('add.html',menu=form_inputs)
    #return 'get add'

@app.route('/add_db',methods=["POST"])
def add_db():
    global aed
    received_values={}
    for key in fl.request.form:
        received_values[key]=fl.request.form[key]
    if aed.add_posts_row(received_values):
        return 'Added:<br><br>'+json.dumps(received_values)
    else:
        return 'Error occured in inserting data on db all_posts'

@app.route('/edit')
def edit():
    global aed
    form_inputs=aed.send_all_posts_form()
    return fl.render_template('edit.html',menu=form_inputs)
    #return 'get edit'

    
@app.route('/edit_db',methods=["POST"])
def edit_db():
    global aed
    received_values={}
    for key in fl.request.form:
        received_values[key]=fl.request.form[key]
    if aed.edit_posts_row(received_values):
        return 'Edit:<br><br>'+json.dumps(received_values)
    else:
        return 'Error occured while edit data on db all_posts'

@app.route('/getDbIds')
def get_db_ids():
    global aed
#    print("helloooo")
    return str(aed.select_all_ids())

@app.route('/select_row',methods=['POST'])
def select_row():
    global aed
    id_=int(fl.request.data.decode("ascii").split("=")[1])
    return json.dumps(aed.select_post(id_))
    
    
    
@app.route('/delete')
def delete():
    global aed
    form_inputs=aed.send_all_posts_form()
    return fl.render_template('delete.html',menu=form_inputs)
#    return 'get delete'
    
@app.route('/delete_db',methods=["POST"])
def delete_db():
    global aed
    id_=int(fl.request.data.decode("ascii").split("=")[1])
    if aed.delete_posts_row(id_):
        return 'Deleted with Success!'
    else:
        return 'Error deleting!'

@app.route('/search')
def search():
    #return fl.render_template('search.html')
    return 'get search WIP'

@app.route('/migrate')
def migrate():
    #return fl.render_template('gen_tags.html')
    return 'migration WIP'

@app.route('/generate_tags_page')
def gen_tags_page():
    #return fl.render_template('gen_tags.html')
    return 'gen tags WIP'


#@app.route('/generate_tags',methods=["POST"])
#def gen_tags():
    #WIP
    #text=fl.request.data.decode("ascii").split('=')[1]


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)