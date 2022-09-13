import os
import re
from tkinter.tix import TCL_WINDOW_EVENTS
import flask
from app import app, library as lib
#SOME OF THESE MIGHT REQUIRE PIP INSTALLS
import docx2json
import json
import sys
import wget
import urllib.parse


import PyPDF2

from flask import request, url_for, redirect, jsonify, flash, send_from_directory
from flask_dropzone import Dropzone

dropzone = Dropzone(app)
basedir = os.path.abspath(os.path.dirname(__file__))
title = 'Mitre Code Document Extractor'

app.config.update(
    UPLOADED_PATH=os.path.join(basedir, 'mitre_uploads'),
    # Flask-Dropzone config:
    DROPZONE_ALLOWED_FILE_CUSTOM = True,
    DROPZONE_ALLOWED_FILE_TYPE= '.docx',
    DROPZONE_MAX_FILE_SIZE=3,
    DROPZONE_MAX_FILES=30,
)

@app.route("/mitre", methods=['POST', 'GET'])
def mitre_home():
    jsonedfile = dropzone_upload()
    
    return flask.render_template(
        "mitre.html",
        title=title,
        jsonedfile=jsonedfile
    )

@app.route("/mitre_upload", methods=['POST', 'GET'])
def dropzone_upload():
    #If a docx file has been uploaded
    if(request.method == 'POST'):
        f = request.files.get('file')
        if(f.filename.split('.')[1] != 'docx' and f.filename.split('.')[1] != 'txt'):
            flash('ERROR: Wrong filetype. DOCX or TXT only!')
            return 'DOCX, or TXT only!', 400 # return the error message, with a proper 4XX

        file_path = os.path.join(app.config['UPLOADED_PATH'], f.filename)
        f.save(file_path)
    return

@app.route("/test", methods=['POST'])
def test():
    #lib.dump(request)
    fname = request.form.get("param1")
    if fname.split('.')[1] != 'docx' and fname.split('.')[1] != 'txt':
                flash('ERROR: Wrong filetype. DOCX, or TXT only!')
                return 'ERROR: Wrong filetype. DOCX, or TXT only!', 400 # return the error message, with a proper 4XX


    print("extension")
    print(fname.split('.')[1])
    #pretty_json = []
    #raw_json = json.dumps(docx2json.convert(os.path.join(app.config['UPLOADED_PATH'], fname), sepBold=True, withSave=False, outputFile=None))
    if fname.split('.')[1] == 'docx':
        pretty_json = json.dumps(json.loads(docx2json.convert(os.path.join(app.config['UPLOADED_PATH'], fname), sepBold=True, withSave=False, outputFile=None)), indent = 2)
    elif fname.split('.')[1] == 'txt':
        print("in here")
        openedFile = open(os.path.join(app.config['UPLOADED_PATH'], fname), "r")
        pretty_json = openedFile.read()
        openedFile.close()

    print(pretty_json)
        
#    elif fname.split('.')[1] == 'pdf':
#        print("within pdf if statement")
#        pdf_file = open(os.path.join(app.config['UPLOADED_PATH'], fname), 'rb')
#        read_pdf = PyPDF2.PdfFileReader(pdf_file)
#        number_of_pages = read_pdf.getNumPages()
#        for i in range(0, number_of_pages):
#            page = read_pdf.getPage(i)
#            page_content = page.extractText()
#            print("page_content" + str(i))
#            print(page_content)
#            pretty_json.append(str(page_content))
#        pretty_json = ''.join(pretty_json)

#        _dict = {}
#        page_content_list = page_content.splitlines()
#        for line in page_content_list:
#            if ':' not in line:
#                continue
#            key, value = line.split(':')
#            _dict[key.strip()] = value.strip()
#        pretty_json = json.dumps(_dict, indent = 2)

        #pretty_json = json.dumps(json.loads(page_content))
        #pretty_json = page_content
        
        #match("spearphishing T1566.001, attachment: T1566. control lolol")
    return pretty_json

@app.route("/match", methods=['POST', 'GET'])
def match():
    tCodes = {
        "links": "T1566.002", "malicious": "T1566.001",
        "spearphishing": "T1566.001", "attachment": "T1566.001",
        "email": "T1566.001", "file": "T1566.001",
        "files": "T1566.001", "services": "T1566.003",
        "spearphishing": "T1566.003", "social media": "T1566.003",
        "phishing": "T1566", "credentials": "T1212",
        "exploitation": "T1212", "command and control": "T1041",
        "control": "T1041", "channel": "T1041",
        "communications": "T1041", "command": "T1041",
        "traffic": "T1071.001", "protocols": "T1071.001",
        "communicate": "T1071.001", "web": "T1071.001",
        "network": "T1071.001", "commands": "T1071.001",
        "https": "T1071.001", "http" : "T1071.001"
    }

    #Gets document text
    jsonString = request.form.get("parameter1")

    #Stores relevant T-Codes in validTCodes with no duplicates
    validTCodes = []
    for key, value in tCodes.items():
        if(jsonString.find(key) != -1):
            if value not in validTCodes:
                validTCodes.append(value)

    #converts the list into a list of numbers to sort
#    numTCodes = []
#    for i in range(0, len(validTCodes)):
#        if('.' in validTCodes[i]):
#            numTCodes.append(float(validTCodes[i][1:]))
#        else:
#            numTCodes.append(int(validTCodes[i][1:]))

    #Sorts the T-Codes
#    numTCodes.sort()

    #Converts the sorted list back into a list of T-Code strings
#    for i in range(0, len(numTCodes)):
#        validTCodes[i] = str(numTCodes[i])
#       validTCodes[i] = "T" + validTCodes[i]
#    validTCodes = ", ".join(validTCodes)

    return str(validTCodes)

@app.route("/mitretest", methods=['POST', 'GET'])
def mitre_return():

    tCodes = {
        "links": "T1566.002", "malicious": "T1566.001",
        "spearphishing": "T1566.001", "attachment": "T1566.001",
        "email": "T1566.001", "file": "T1566.001",
        "files": "T1566.001", "services": "T1566.003",
        "spearphishing": "T1566.003", "social media": "T1566.003",
        "phishing": "T1566", "credentials": "T1212",
        "exploitation": "T1212", "command and control": "T1041",
        "control": "T1041", "channel": "T1041",
        "communications": "T1041", "command": "T1041",
        "traffic": "T1071.001", "protocols": "T1071.001",
        "communicate": "T1071.001", "web": "T1071.001",
        "network": "T1071.001", "commands": "T1071.001",
        "https": "T1071.001", "http" : "T1071.001"
    }

    if(request.method == 'POST'):
        new_content = json.loads(flask.request.data)
        print(new_content)
        the_file = new_content['file']
    
    elif(request.method == 'GET'):
        if "file" in request.args:
            the_file: str = request.args.get("file")

    clean_filename = the_file.rsplit('/', 1)[1]
    
    file_path = os.path.join(app.config['UPLOADED_PATH'], clean_filename)
    
    wget.download(the_file, file_path)

    if clean_filename.split('.')[1] == 'docx':
        jsonString = json.dumps(json.loads(docx2json.convert(os.path.join(app.config['UPLOADED_PATH'], file_path), sepBold=True, withSave=False, outputFile=None)), indent = 2)
    elif clean_filename.split('.')[1] == 'txt':
        openedFile = open(file_path, "r")
        jsonString = openedFile.read()
        openedFile.close()

    #To-Do: Consider deleting the file after returning the tags

    validTCodes = []
    for key, value in tCodes.items():
        if(jsonString.find(key) != -1):
            if value not in validTCodes:
                validTCodes.append(value)

    tCodesJSON = "{\"file\" : \"" + clean_filename + "\", \"T-Codes\" : " + str(validTCodes) + "}"

    return tCodesJSON

@app.route("/mitre_uploads/<name>")
def mitre_download_file(name):
    return send_from_directory(app.config['PATH'] + "\\mitre_uploads\\", name)
    