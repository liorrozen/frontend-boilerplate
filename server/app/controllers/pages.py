from flask.views import View
from flask import render_template
from flask.ext.security import login_required

from app import router


@router.route('/')
class HomeView(View):

    @login_required
    def dispatch_request(self, *args, **kwargs):
        return render_template("index.html")
