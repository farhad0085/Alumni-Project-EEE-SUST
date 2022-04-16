from rest_framework.response import Response
from common.views import LoggerAPIView
from .serializers import (
    LoginSerializer,
    RegistrationSerializer,
    UserAccountSerializer,
)
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login as django_login, logout as logout_user


class LoginView(LoggerAPIView):
    """Class based view loggin in user and returning Auth Token."""

    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer_obj = LoginSerializer(data=data)

        if serializer_obj.is_valid():
            username = serializer_obj.data['username']
            password = serializer_obj.data['password']

            user = authenticate(username=username, password=password)
            if not user:
                return Response({'error': 'Invalid Credentials'}, status=401)
            
            django_login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            response_data = UserAccountSerializer(user).data
            response_data["key"] = token.key

            return Response(response_data, status=200)

        return Response(serializer_obj.errors, status=400)


class RegisterAPIView(LoggerAPIView):

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user, alumni = serializer.save()

            token, _ = Token.objects.get_or_create(user=user)

            response_data = UserAccountSerializer(user).data
            response_data["key"] = token.key
            return self.send_200({
                "message": "User registered successfully",
                "key": token.key
            })


class UserInfoAPIView(LoggerAPIView):
    """Check the userinfo of a user"""

    def get(self, request):
        user = request.user
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)


class LogoutAPIView(LoggerAPIView):

    permission_classes = [AllowAny]

    def post(self, request):
        try:
            logout_user(request)
            return self.send_200('Logged out successfully.')
        except Exception as e:
            self.log_error('Error in logout process', str(e))
            return self.send_500()
