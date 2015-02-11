routes = []


def route( rule, *args, **kwargs ):

    def route_decorator( cls ):
        routes.append( ( cls, rule, args, kwargs ) )
        return cls

    return route_decorator


def apply_routes( app_instance ):

    for cls, rule, args, kwargs in routes:
        name = ".".join( [ cls.__module__, cls.__name__ ] )
        app_instance.add_url_rule(
            rule,
            view_func = cls.as_view(name),
            *args,
            **kwargs
        )
