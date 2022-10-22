from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from .models import *

class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'customer_name']


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'customer', 'fg_code', 'description', 'img_reference']


class PartSerializer(ModelSerializer):
    class Meta:
        model = Part
        fields = ['id', 'project', 'serial_number', 'stage', 'passed', 'inspection_date']


class DefectNameSerializer(ModelSerializer):
    class Meta:
        model = DefectName
        fields = ['id', "name"]
        
        
class AclassOperatorSerializer(ModelSerializer):
    class Meta:
        model= AclassOperator
        fields = ['id', "name"]


class DefectReportSerializer(ModelSerializer):
    class Meta:
        model= DefectReport
        fields = ['part', 'status', 'defect_name', 'defect_location', 'operator']
