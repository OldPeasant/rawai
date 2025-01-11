import sys
import urllib.request

from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS, cross_origin

import json
import glob

import os
from os import mkdir, chdir
from os.path import isdir, isfile, expanduser
from shutil import copyfile

from config import Config


if len(sys.argv) != 3:
    print("Please provide config folder and dummy mode as arguments")
    exit(1)
config_path = sys.argv[1]

if sys.argv[2] == 'dummyyes':
    from jiralibdummy import JiraLib
else:
    from jiralib import JiraLib

config = Config(config_path)
jira_lib = JiraLib()

def init_lib(jira_lib):
    cfg_server = config.get_server_info()
    cfg_token = config.get_token()
    if cfg_server and cfg_token:
        jira_lib.initialize(cfg_server, cfg_token['token'])

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def default_index():
    return redirect("/index.html")

@app.route("/read-statuses")
@cross_origin()
def read_statuses():
    return jira_lib.get_all_statuses()

@app.route('/read-active-sprints')
@cross_origin()
def read_active_sprints():
    return jira_lib.get_active_sprints()

@app.route('/read-jiras/<string:sprint_id>')
@cross_origin()
def read_jiras(sprint_id):
    return jira_lib.get_jiras_in_sprint(int(sprint_id))


@app.route('/settings/get-server-info')
@cross_origin()
def get_server_info():
    si = config.get_server_info()
    if si:
        return si
    else:
        return {}

@app.route('/settings/set-server-info', methods=['POST'])
@cross_origin()
def set_server_info():
    config.set_server_info(request.json)
    init_lib(jira_lib)
    return {"status": "ok"}

@app.route('/settings/get-token')
@cross_origin()
def get_token():
    token = config.get_token()
    if token:
        return token
    else:
        return {}

@app.route('/settings/set-token', methods=['POST'])
@cross_origin()
def set_token():
    token = request.json
    
    config.set_token(token)
    init_lib(jira_lib)
    return {"status": "ok"}

@app.route('/settings/get-classification')
@cross_origin()
def get_classification():
    c = config.get_classification()
    if c:
        return c
    else:
        return {}

@app.route('/settings/set-classification', methods=['POST'])
@cross_origin()
def set_classification():
    config.set_classification(request.json)
    return {"status": "ok"}

@app.route('/img/<string:filename>')
@cross_origin()
def serve_angular_image(filename):
    return send_from_directory("static/img", filename)

@app.route('/<string:filename>')
@cross_origin()
def serve_angular(filename):
    return send_from_directory("static", filename)

if __name__ == '__main__':
    if not isdir(expanduser(config_path)):
        rawai_dir = expanduser(config_path)
        mkdir(rawai_dir, mode=0o777)
    init_lib(jira_lib)
    app.run(host='0.0.0.0', port='4201')

