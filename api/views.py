from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class PartViewSet(ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer
    
    
class DefectNameViewSet(ModelViewSet):
    queryset = DefectName.objects.all()
    serializer_class = DefectNameSerializer
    
    
class AclassOperatorViewSet(ModelViewSet):
    queryset = AclassOperator.objects.all()
    serializer_class = AclassOperatorSerializer
    

class DefectReportViewSet(ModelViewSet):
    queryset = DefectReport.objects.all()
    serializer_class = DefectReportSerializer


