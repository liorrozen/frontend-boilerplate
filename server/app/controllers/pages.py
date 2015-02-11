from flask.views import View
from flask.ext.security import login_required

from app import router


@router.route('/')
@login_required
class HomeView(View):

    def dispatch_request(self, *args, **kwargs):
        return 'Helolo world'
        pass
