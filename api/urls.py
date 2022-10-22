import imp
from django.urls import path
from django.urls import include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'customers', CustomerViewSet, 'customers')
router.register(r'projects', ProjectViewSet, 'projects')
router.register(r'parts', PartViewSet, 'parts')
router.register(r'defects', DefectNameViewSet, 'defect_names')
router.register(r'operators', AclassOperatorViewSet, 'operators')
router.register(r'reports', DefectReportViewSet, 'defect_reports')


urlpatterns = [
    path('', include(router.urls))
]