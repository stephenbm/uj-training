from time import sleep
import datetime
import mimetypes
from random import randint

from flask import Flask, render_template, jsonify, send_from_directory

app = Flask(__name__)
mimetypes.add_type('image/svg+xml', '.svg')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/time')
def time():
    sleep(0.02)
    timestamp = datetime.datetime.now()
    return jsonify({'timestamp': timestamp.strftime('%H:%M:%S')})

@app.route('/devops/<string:reaction_id>')
def devops(reaction_id):
    sleep(0.01)
    return send_from_directory(
        'static',
        'reactions/%s.json' % reaction_id,
        mimetype='application/json')

@app.after_request
def add_header(r):
    r.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    r.headers['Pragma'] = 'no-cache'
    r.headers['Expires'] = '0'
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
