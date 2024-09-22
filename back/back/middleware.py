from django.utils.deprecation import MiddlewareMixin
from django.conf import settings

class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(request.COOKIES)
        auth_cookie = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        print(auth_cookie)
        if auth_cookie:
            request.META['HTTP_AUTHORIZATION'] = f"Bearer {auth_cookie}"