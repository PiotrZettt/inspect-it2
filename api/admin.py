from django.contrib import admin
from .models import *

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_name']


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['customer', 'fg_code', 'description', 'img_reference']


class PartAdmin(admin.ModelAdmin):
    list_display = ['project', 'serial_number', 'stage', 'passed', 'inspection_date']
    
    
class DefectNameAdmin(admin.ModelAdmin):
    list_display = ["name"]
    
    
class AclassOperatorAdmin(admin.ModelAdmin):
    list_display = ["name"]


class DefectReportAdmin(admin.ModelAdmin):
    list_display = ['part', 'status', 'defect_name', 'defect_location', 'operator']


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Part, PartAdmin)
admin.site.register(DefectName, DefectNameAdmin)
admin.site.register(AclassOperator, AclassOperatorAdmin)
admin.site.register(DefectReport, DefectReportAdmin)




