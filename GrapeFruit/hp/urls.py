from django.conf.urls import patterns, url

from hp import views

urlpatterns = patterns('',
    # url(r'^$', views.home, name='home'),
    url(r'board/side', views.side_design, name='side_design'),
    url(r'board/notice', views.article_list, name='article_list'),
)