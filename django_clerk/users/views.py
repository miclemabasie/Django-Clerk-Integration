import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.utils import login_user
from djoser.conf import settings as djoser_settings

User = get_user_model()


class ClerkLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response(
                {"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Decode the Clerk JWT token
            decoded = jwt.decode(
                token,
                settings.CLERK_PUBLISHABLE_KEY,  # Use Clerk's public key
                algorithms=["RS256"],
                options={"verify_aud": False},
            )

            # Extract user information
            clerk_user_id = decoded["sub"]
            email = decoded.get("email")
            first_name = decoded.get("given_name", "")
            last_name = decoded.get("family_name", "")

            # Find or create the user in Django
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email,
                    "first_name": first_name,
                    "last_name": last_name,
                },
            )

            # Log in the user and issue Django's JWT token
            login_user(request, user)
            token = djoser_settings.TOKEN_MODEL.objects.create(user=user)

            return Response({"token": token.key}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED
            )
        except jwt.InvalidTokenError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED
            )
