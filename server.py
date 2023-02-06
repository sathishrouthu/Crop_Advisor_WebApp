from pydoc import render_doc
from urllib import response
from flask import Flask,redirect,jsonify,request,render_template
import util

import os 

app = Flask(__name__)
app.config['UPLOAD_FOLDER']="./"

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict_crop',methods=["POST"])
def predict_crop():
    input_values = list(request.form.to_dict().values())
    input_values = list(map(float,input_values))
    X = [input_values]
    result = util.predict_crop(X)

    response = jsonify({
        'predicted_crop':result
    })
    response.headers.add("Access-Control-Allow-Origin",'*')
    return response

@app.route('/predict_fert',methods=["POST"])
def predict_fert():
    print("Request recieved Predicting Ferlizier..")
    input_values = list(request.form.to_dict().values())
    input_values = list(map(float,input_values))
    X = [input_values]
    result = util.predict_fert(X)
    response = jsonify({
            'predicted_fert' : result,
        })
    response.headers.add("Access-Control-Allow-Origin",'*')
    return response


@app.route("/predict_disease",methods=["GET","POST"])
def predict_disease():
    if request.method=='POST':
        img = request.files['input_image']
        img.save(os.path.join(app.config['UPLOAD_FOLDER'], "input_image.jpg"))
        output,confidence = util.predict_disease()
        print(output,confidence)
        response = jsonify({
            'output_disease':output,
            'confidence':confidence
        })
        response.headers.add("Access-Control-Allow-Origin",'*')
        return response
    else:
        return "GET"

if __name__=="__main__":
    util.load_saved_artifacts()
    print("Starting Flask server....")
    app.run()