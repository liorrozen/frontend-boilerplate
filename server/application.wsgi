import sys
import os

here = os.path.dirname(os.path.realpath(__file__))
root = os.path.dirname(here)

server_path = "%s/server" % root

sys.path.insert(0, server_path )

activate_this = "%s/venv/bin/activate_this.py" % root
execfile(activate_this, dict(__file__=activate_this))

import main

main.app.config["DEBUG"] = True
main.app.config["root_path"] = "/var/www/html/boilerplate/"
application = main.app
