import os

here = os.path.dirname( os.path.realpath( '%s/../../' % __file__ )  )
root = os.path.dirname( here )

client_dir = "%s/client/" % root
STATIC_FOLDER = client_dir
TEMPLATE_FOLDER = root

DEBUG = True
SECRET_KEY = 'qVYjsJ8051e9X6h42hdC1S2LLSMGI6'
BASE_DIR = root
SQLALCHEMY_DATABASE_URI = 'mysql://root@127.0.0.1/test'
