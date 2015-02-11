routes = []


def route( rule, *route_args, **route_kwargs ):

    def route_decorator(original_class):

        routes.append( ( original_class, rule, route_args, route_kwargs ) )

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
