# Create your views here.

from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from board.models import Board

def home(request):
    template = loader.get_template('index.html')
    context = Context({})
    return HttpResponse(template.render(context))
    #return HttpResponse("Hello, world. You're at the poll index.")

def article_list(request, board_id = 'notice'):
    # latest_poll_list = Poll.objects.all().order_by('-pub_date')[:5]
    #context = {'latest_poll_list': latest_poll_list}
    board = Board(id="notice")
    context = Context({'board':board})
    return render(request, 'board/list.html', context)

