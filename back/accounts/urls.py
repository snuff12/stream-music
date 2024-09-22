from django.urls import path
from .views import AgencyUserListView, RegisterView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, UserStatusView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-status/', UserStatusView.as_view(), name='user_status'),
    path('agencies/', AgencyUserListView.as_view(), name='agency-user-list'),

]