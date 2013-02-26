# coding=UTF-8

from django.db import models

# Create your models here.
FileRepositoryType = (
	('VFS', 'Vine File Storage'),
)

class FileRepository(models.Model) :
	id = models.CharField(primary_key=True, max_length=255);
	type = models.CharField(max_length=32, choices=FileRepositoryType)
	property = models.CharField(max_length=4000)
	name = models.CharField(max_length=255)
	active = models.BooleanField()
	maxSize = models.BigIntegerField()
	nextRepository = models.ForeignKey('FileRepository')
	regDate = models.DateTimeField()

class GFile(models.Model) :
	id = models.CharField(primary_key=True, max_length=255)
	name = models.CharField(max_length=255)
	repository = models.ForeignKey(FileRepository)
	size = models.BigIntegerField()
	contentType = models.CharField(max_length=255)
	regDate = models.DateTimeField(auto_now_add=True)
	path = models.FilePathField()
	md5 = models.CharField(max_length=255)

class ArticleFile(models.Model) :
	id = models.AutoField(primary_key=True,db_column="ARTICLE_FILE_ID")
	article = models.ForeignKey('Article')
	file = models.ForeignKey('GFile')
	download = models.IntegerField()

class Board(models.Model) :
	id = models.CharField(primary_key=True, max_length=255)
	name = models.CharField(max_length=255)

class BoardCategory(models.Model) :
	id = models.AutoField(primary_key=True);
	name = models.CharField(max_length=255)
	board = models.ForeignKey(Board, db_column="BOARD_ID");
	repArticle = models.ForeignKey('Article', db_column="REP_ARTICLE_ID")
	regDate = models.DateTimeField(auto_now_add=True)

class Article(models.Model) :
	board = models.ForeignKey(Board)
	title = models.CharField(max_length=255)
	# 정렬번호
	orderNo = models.IntegerField(db_column="orderNo")
	#정렬 패스
	orderPath = models.CharField(max_length=255)
	#게시물 깊이. 최상위는 0
	depth = models.IntegerField()
	#내용
	content = models.TextField()
	#작성자 id
	writerId = models.CharField(max_length=255)
	#작성자 이름
	writerName = models.CharField(max_length=255);
	#패스워드
	password = models.CharField(max_length=255);
	#등록일
	regDate = models.DateTimeField(auto_now_add=True)
	#수정일
	modDate = models.DateTimeField(auto_now=True)
	attachedFiles = models.ManyToManyField(GFile, through='ArticleFile')
	#카테고리
	category = models.ForeignKey(BoardCategory)
	# 조회 수
	visit = models.IntegerField()
	#공지 여부. true 면 공지, false 면 공지 아님
	notice = models.BooleanField()
	#코멘트 수
	numberOfComments = models.IntegerField()

