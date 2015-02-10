import os
from flask import Flask
from flask import render_template

here = os.path.dirname( os.path.realpath( __file__ ) )
root = os.path.dirname( here )

app = Flask(__name__)

client_dir = "%s/client/" % root
app.static_folder = client_dir
app.template_folder = root


@app.route('/')
def hello_world():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)
