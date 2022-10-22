from email.policy import default
from django.db import models
from django.shortcuts import reverse

# Create your models here.

class Customer(models.Model):
    customer_name = models.CharField(max_length=20)

    def __str__(self):
        return self.customer_name


class Project(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer')
    fg_code = models.CharField(max_length=10)
    description = models.CharField(max_length=200)
    img_reference = models.ImageField(null=True, blank=True, upload_to='images/')

    class Meta:
        ordering = ['fg_code']

    def get_absolute_url(self):
        """Returns the url to access a particular instance of the model."""
        return reverse('part-detail', args=[str(self.id)])

    def __str__(self):
        return self.description


class Part(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')
    serial_number = models.CharField(max_length=11)
    stage = models.CharField(max_length=200)
    passed = models.BooleanField(default=True)
    inspection_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.serial_number
    
    
class DefectName(models.Model):
    name = models.CharField(max_length=200)
    
    
class AclassOperator(models.Model):
    name = models.CharField(max_length=200)


class DefectReport(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE, related_name='part')
    status = models.CharField(max_length=200, default="OK")
    defect_name = models.ForeignKey(DefectName, on_delete=models.CASCADE, related_name="defect", default="name")
    defect_location = models.JSONField(max_length=10, null=True)
    operator = models.ForeignKey(AclassOperator, on_delete=models.CASCADE, related_name='operators', null=True)

    def __repr__(self):
        return self.defect_name
