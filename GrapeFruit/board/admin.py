from board.models import Board, FileRepository, GFile, ArticleFile, Article, BoardCategory
from django.contrib import admin

#class ArticleInline(admin.StackedInline):
class ArticleInline(admin.TabularInline):

    model = Article
    extra = 3

class BoardAdmin(admin.ModelAdmin):
	list_display = ('id', 'name')
	list_filter = ['id']
	search_fields = ['id']
	inlines = [ArticleInline]
    #fields = ['pub_date', 'question']
    # fieldsets = [
    #     (None,               {'fields': ['question']}),
    #     ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    # ]



admin.site.register(Board, BoardAdmin)
admin.site.register(FileRepository)
admin.site.register(GFile)
admin.site.register(ArticleFile)
admin.site.register(Article)
admin.site.register(BoardCategory)

