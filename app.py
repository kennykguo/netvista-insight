import os
import locale
locale.setlocale(locale.LC_ALL, '')
from flask import Flask, flash, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash


app = Flask(__name__) #create a Flask instance

@app.route('/', methods=['GET'])
def input():
    if request.method == 'GET':
        return render_template('index.html')