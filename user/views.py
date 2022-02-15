from rest_framework.response import Response
from common.views import LoggerAPIView
from .serializers import (
    LoginSerializer,
    UserAccountSerializer,
)
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token


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

            token, _ = Token.objects.get_or_create(user=user)
            response_data = UserAccountSerializer(user).data
            response_data["key"] = token.key

            return Response(response_data, status=200)

        return Response(serializer_obj.errors, status=400)
