from django.conf.urls import url, patterns
from django.contrib.auth import login

from pjs import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
)
