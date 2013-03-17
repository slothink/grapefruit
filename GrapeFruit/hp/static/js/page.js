/*
 *  require sm-common.js
 *  must be set encoding as 'UTF-8'
 */

SM.ns('page.global');
SM.page.global = (function() {
	var init = function() {
		console.log('page global called');
		SM.util.bootstrap.dropdown();
		$('.btn-cancel').click(function() {
			history.back();
		});
		$('.btn-back').click(function() {
			history.back();
		});


		var rolloverArea = {tab:{current:'tab-01', target:'tab-container-01'}};
		var rolloutFunc = function(event) {
			var $t = $(event.target);
			$t.attr("src", $t.data("out"));
		};
		var rolloverFunc = function(event) {
			var $t = $(event.target);			
			var id = $t.attr("id");
			var dataArea = $t.data("area");
			console.log('over', event);

			if(dataArea) {
				if(typeof rolloverArea[dataArea] == "undefined") {
					rolloverArea[dataArea] = {};
				}
				if(rolloverArea[dataArea] .current != id) {
					$('#'+rolloverArea[dataArea] .target).hide();
					$('#'+rolloverArea[dataArea] .current).attr("src", $('#'+rolloverArea[dataArea] .current).data("out"));
					rolloverArea[dataArea] .target = $t.data("target");
					rolloverArea[dataArea] .current = id;
					console.log($t.data("over"), $t.data("out"), $t.attr("id"), $t.data("target"));
					$t.attr("src", $t.data("over"));
					$('#'+rolloverArea[dataArea] .target).show();
				}
			}else {
				$t.attr("src", $t.data("over"));
			}			
		}
		$('.rollover-img-temporary').mouseout(rolloutFunc);
		$('.rollover-img-temporary').mouseover(rolloverFunc);
		$('.rollover-img-keep').mouseover(rolloverFunc);
		$('.rollover-img-click').click(rolloverFunc);
	};
	return {
		init:init
	};
}());

SM.ns('eh.page.index');
SM.eh.page.index= (function() {	
	var init = function() {
		console.log('eh.page.index');
		SM.util.flash.loadTo('main-flash', "/static/img/main.swf?link=./",366, 490,"#ffffff","index");
	};
	return {
		init:init
	};
	
}());


SM.ns('page.cm.contents.list');
SM.page.cm.contents.list = (function() {
	var init = function() {
		var selectChseckboxEnable = function(){
			$('input[name="selectCheck"]').each(function(i,selectCk){
			
				if(selectCk.checked == true){
					$('#allDelete').hide();
					$('#selectDelete').show();
				}
				
			});
			if(!$(".selectCheck").is(":checked")){
				$('#allDelete').hide(); 
				$('#selectDelete').hide();
			 } 
		 };
		alert('load');
		
		$( 'textarea.editor' ).ckeditor();
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.mailbox.sendbox.list');
SM.page.portal.mailbox.sendbox.list= (function() {
		var init= function(){
			$(document).ready(function() {
				
				$('input[name="totChk"]').change(function(){
					if($('input[name="totChk"]').attr('checked') == 'checked'){
						$('input[name="chk"]').attr('checked','checked');
					}else {
						  $('input[name="chk"]').removeAttr('checked');
					}
				});
			
	            $('input[name="chk"]').change(function(){
	            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
	            	 var allCnt =$('input[name="chk"]').length;
	            	 if( allCnt==checkedCnt ){
	            		 $('input[name="totChk"]').attr('checked','checked');
		                }
		                else{
		                	 $('input[name="totChk"]').removeAttr('checked');
		                }
	            });
	            
				$('a[href="#add-trash-mails"]').click(function(event) {

					event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("삭제할 게시물을 선택하세요");
						return false;
					}
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/add-trash-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				});
				
				$('a[href="#spam-mails"]').click(function(event) {

					event.preventDefault();
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("스팸 등록할 게시물을 선택하세요");
						return false;
					}
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/add-spam-sendMails.do", data,    function(result) {
						document.location.reload();
					});
					return false;
				
				});
			});
			
		};
				
		return {
			init:init
			
		};
	
}());
			
SM.ns('page.portal.mailbox.sendbox.tempList');
SM.page.portal.mailbox.sendbox.tempList= (function() {
		var init= function(){
			$(document).ready(function() {
				$('a[href="#delete-mails"]').click(function(event) {

					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("삭제할 게시물을 선택하세요");
						return false;
					}
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/delete-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				});
				
			});
			
		};
				
		return {
			init:init
			
		};
	
}());

SM.ns('page.portal.mailbox.sendbox.send');
SM.page.portal.mailbox.sendbox.send= (function() {
	var init= function(){
		$(document).ready(function() {
				    
			$('#btn-save-temporary').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				
				//파일 있는지 체크
				if ($('input[type=file]').val()!= ""){
					alert("파일은 임시저장 대상에서 제외되니다. ");
				}
				
				var data = $('textarea.editor').val();
				$('textarea.editor').text(data);
				
				 $('#form-send')[0].action = CONTEXT+"/mailbox/sendbox/tmpSave.do"; // 폼 전송 url 바꿈
				 $('#form-send')[0].target = "hidden-frame";
				 $('#form-send')[0].submit(); // 폼 강제 전송
			});
			
		
			$('#btn-save').click(function(event) {
				event.preventDefault();
				var data = $('textarea.editor').val();
				$('textarea.editor').text(data);
				
				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid")
				})
				
				$('#fileIds').val(fids);
				$('#form-send')[0].action = CONTEXT+"/mail/send.do"; 
				$('#form-send')[0].submit();
			});
			
			$( 'textarea.editor' ).ckeditor();
			$('#addFile').click(function(event) {

				var sFile = document.createElement("input");
				sFile.setAttribute("type", "file");
				sFile.setAttribute("name", "files");
				var a = document.getElementById("fileForm");
				a.appendChild(sFile);
								
			});
			
			$('#sign-list').change(function(){
				var signId = $('#sign-list').val();
				
				if(signId == "" || signId == undefined){
					
					$('#f-name').val("");
					$('#f-default')[0].checked = false;
					$('#f-message').val("");
					
					return false;
				}
				
				var data = JSON.stringify(signId);
				
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/config/get-sign.do", data, function(result) {

//					$('#f-name').val(result.name);
//					$('#f-default')[0].checked = result.defaultSign;
					$('#f-sign').val(result.message);
					
				});
				
			});
			
			
			// display content at first
			var functions = {};
			// on click 'select address book'
			$('#modal-select-mailAddr').on('show',function(){
				
				
				/**
				 * @param searchCondition {name:'keyword', groupId:4}
				 */
				
				var displayAddresBookPopupContent = function(searchCondition) {console.log('11',searchCondition);
					var data = JSON.stringify(searchCondition);
					console.log(data);
					$('#addAddress').load(CONTEXT+"/addressbook/mail/getAddrList.do", searchCondition ? searchCondition : {}, function(){
						console.log('get address cb func called');
						$('input[name="totChk"]').change(function(){
							if($('input[name="totChk"]').attr('checked') == 'checked'){
								$('input[name="chk"]').attr('checked','checked');
							}else {
								  $('input[name="chk"]').removeAttr('checked');
							}
						});
					
			            $('input[name="chk"]').change(function(){
			            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
			            	 var allCnt =$('input[name="chk"]').length;
			            	 if( allCnt==checkedCnt ){
			            		 $('input[name="totChk"]').attr('checked','checked');
			                }
			                else{
			                	 $('input[name="totChk"]').removeAttr('checked');
			                }
			            });
						
						// on searched
						$('#form-add-address').submit(function(event){
							
							var req = {"name":$('#name').val(), "groupId":$('#groupId').val()};
							var data = JSON.stringify(req);
							console.log(data);
							
							functions["displayAddresBookPopupContent"](req);
						});
					});
				};
				functions["displayAddresBookPopupContent"] = displayAddresBookPopupContent;
				displayAddresBookPopupContent();
			});
			
			/**
			 * @param mailInfos [{name:'userName1', mail:'user1#test.com'}, {name:'userName2', mail:'user2#comas.co.kr'}]
			 */
			var callbackSelectedMailFromAddresBook = function(mailInfos) {
				//alert('test');
				var old = $('#f-receiverMail').val() || '';
				var newValue = old;
				$.each(mailInfos, function(i, mailInfo) {
					if (newValue !=''){
						newValue +=  ";"
					}
					newValue += mailInfo.name + "<" + mailInfo.mail + ">";
					console.log(newValue);
				});
				$('#f-receiverMail').val(newValue);
			};
			
			$('#btn-add-Address').click(function(event) {
				event.preventDefault();
				
				var checked = $('input[name="chk"]:checked').length;
				console.log(checked);
				
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				
				var sutil = SM.util.string;
				var req = [];
				$.each($('input[name="chk"]:checked'), function(i, item) {
					req[req.length] = item.value;
				});
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				
				SM.ajax.call(CONTEXT+"/ajax/address/getAddressDetails.do", data, 
						/**
						 * @result [{id:1, name:'user1', mail:'user1#test.com', ownerId:'user1'} ,{id:2, name:'user2', mail:'user2#test.com', ownerId:'user2'} ]
						 */
						function(result) {
							//console.log(result);
							callbackSelectedMailFromAddresBook(result);
							$('#modal-select-mailAddr').modal('hide');
						}
					);
			});
			
			
		});
		
	};
	
	var cbkTempSend=function(mail){
		alert(mail.id + mail.title + "이 임시저장되었습니다.");
		//document.location.reload();
		
	};
	
	return {
		init:init,
		cbkTempSend:cbkTempSend
	};
}());




SM.ns('page.portal.mailbox.sendbox.addAddress');
SM.page.portal.mailbox.sendbox.addAddress= (function() {
	var init= function(){
		$(document).ready(function() {
		
			$('#btn-search').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				 $('#form-')[0].action = CONTEXT+"/mailbox/sendbox/tmpSave.do"; // 폼 전송 url 바꿈
				 $('#form-addAddress')[0].target = "hidden-frame";
				 $('#form-addAddress')[0].submit(); // 폼 강제 전송
			});
		});
	};
	return {
		init:init,
	};	
}());


SM.ns('page.portal.mailbox.sendbox.read');
SM.page.portal.mailbox.sendbox.read= (function() {

    	var init= function(initdata){
		$(document).ready(function() {
			
			$('#modal-cerpPopup').on('show',function(event){
				event.preventDefault();
				alert("팝업");
			});
			
			$('a[href="#add-trash-mail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/add-trash-mails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/sendbox/read.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
				});
				return false;
				
			});
			
			$('a[href="#spam-mail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/add-spam-sendMails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/sendbox/read.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
				});
				return false;
			});
			
			$('a[href="#print-mail"]').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				//window.print();
				url=CONTEXT+"/mailbox/printPopup.do?id=" + initdata.id + "&mailBoxType=MAIL";
				//url=CONTEXT+"/mailbox/sendbox/printPopup.do?id=" + initdata.id;
				
				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");
			
			});
			
			$('#modal-certPopup').on('show',function(event){
				
				console.log("popup call:", $('#certPopup'), $('#certPopup').length);
				console.log("initdata.id : " + initdata.id);
				
				$('#btn-reqSentCert').click(function(event) {
					
					event.preventDefault();
					
					var certifyModel = new Object();
					certifyModel.mailId=initdata.id;
					//certifyModel.type="SEND";
					certifyModel.certType="SEND";
					var data = JSON.stringify(certifyModel);
					
					SM.ajax.call(CONTEXT+"/ajax/mailbox/sendbox/requestCertify.do", data, function(result) {
						console.log('data : ' + data);
						$('#certPopup').load(CONTEXT+"/mail/certifyManage.do",{"id":initdata.id});
					});
				});
				
				$('#btn-reqRecvCert').click(function(event) {
					event.preventDefault();
					
					var certifyModel = new Object();
					certifyModel.mailId=initdata.id;
					//certifyModel.type="SEND";
					certifyModel.certType="RECEIVE";
					var data = JSON.stringify(certifyModel);
					
					SM.ajax.call(CONTEXT+"/ajax/mailbox/sendbox/requestCertify.do", data, function(result) {
						$('#certPopup').load(CONTEXT+"/mail/certifyManage.do",{"id":initdata.id});
					});
				});

				$('#certPopup').load(CONTEXT+"/mail/certifyManage.do",{"id":initdata.id}, function(){
					console.log('displayCertPopup load');
				});
			});
			
		});
		
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.mailbox.printPopup');
SM.page.portal.mailbox.printPopup= (function() {

    	var init= function(){
		$(document).ready(function() {
	
			$('#btn-print').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				window.print();
			});
			
			$('#btn-close').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				window.open("about:blank","_self").close();
				//window.close();
			});
			
		});
		
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.mailbox.recvbox.receiveList');
SM.page.portal.mailbox.recvbox.receiveList= (function() {
		var init= function(){
			$(document).ready(function() {
				
				$('input[name="totChk"]').change(function(){
					if($('input[name="totChk"]').attr('checked') == 'checked'){
						$('input[name="chk"]').attr('checked','checked');
					}else {
						  $('input[name="chk"]').removeAttr('checked');
					}
				});
			
	            $('input[name="chk"]').change(function(){
	            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
	            	 var allCnt =$('input[name="chk"]').length;
	            	 if( allCnt==checkedCnt ){
	            		 $('input[name="totChk"]').attr('checked','checked');
		                }
		                else{
		                	 $('input[name="totChk"]').removeAttr('checked');
		                }
	            });
	            
				$('a[href="#delete-mails"]').click(function(event) {

					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("삭제할 게시물을 선택하세요");
						return false;
					}
	
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/delete-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				});
				

				$('a[href="#spam-mails"]').click(function(event) {

					
					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("스팸 등록할 게시물을 선택하세요");
						return false;
					}
	
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/add-spam-recvMails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				
				});
				
				$('a[href="#trash-mails"]').click(function(event) {

					
					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("휴지통으로 이동할 게시물을 선택하세요");
						return false;
					}
	
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/add-trash-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				
				});

			});
			
		};
				
		return {
			init:init
			
		};
	
}());


SM.ns('page.portal.mailbox.recvbox.recvRead');
SM.page.portal.mailbox.recvbox.recvRead= (function() {

    	var init= function(initdata){
		$(document).ready(function() {
	
			$('#modal-cerpPopup').on('show',function(event){
				event.preventDefault();
				alert("팝업");
			});
			
			$('a[href="#spam-mail"]').click(function(event) {
				
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/add-spam-recvMails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/recvbox/recvRead.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
				});
				return false;
			});
			
			$('a[href="#print-mail"]').click(function(event) {
			
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				//window.print();
				url=CONTEXT+"/mailbox/printPopup.do?id=" + initdata.id + "&mailBoxType=MAIL";
				//url=CONTEXT+"/mailbox/sendbox/printPopup.do?id=" + initdata.id;
				
				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");
			
			});
			
		});
		
	};
	return {
		init:init
	};
}());




SM.ns('page.portal.mailbox.trashbox.spamList');
SM.page.portal.mailbox.trashbox.spamList= (function() {
		var init= function(){
			$(document).ready(function() {

				$('input[name="totChk"]').change(function(){
					if($('input[name="totChk"]').attr('checked') == 'checked'){
						$('input[name="chk"]').attr('checked','checked');
					}else {
						  $('input[name="chk"]').removeAttr('checked');
					}
				});
			
	            $('input[name="chk"]').change(function(){
	            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
	            	 var allCnt =$('input[name="chk"]').length;
	            	 if( allCnt==checkedCnt ){
	            		 $('input[name="totChk"]').attr('checked','checked');
		                }
		                else{
		                	 $('input[name="totChk"]').removeAttr('checked');
		                }
	            });
				
				$('a[href="#delete-spamMails"]').click(function(event) {

					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("삭제할 게시물을 선택하세요");
						return false;
					}
						
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/delete-spamMails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				});
				

				$('a[href="#add-recv-mails"]').click(function(event) {

					
					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("받은 문서할으로 복원할 게시물을 선택하세요");
						return false;
					}
	
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/add-recv-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				
				});
			

			});
			
			
		};
				
		return {
			init:init
			
		};
	
}());

SM.ns('page.portal.mailbox.trashbox.spamRead');
SM.page.portal.mailbox.trashbox.spamRead= (function() {

    	var init= function(initdata){
		$(document).ready(function() {
	
			$('a[href="#print-mails"]').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				//window.print();

				url=CONTEXT+"/mailbox/printPopup.do?id=" + initdata.id+ "&mailBoxType=SPAMMAIL";
				//url=CONTEXT+"/mailbox/sendbox/printPopup.do?id=" + initdata.id;
				
				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");
			
			});
			
			$('a[href="#delete-spamMail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/delete-spamMails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/trashbox/spamList.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
					
				});
				return false;
				
			});
	
		});
		
	};
	return {
		init:init
	};
}());


SM.ns('page.portal.mailbox.trashbox.trashList');
SM.page.portal.mailbox.trashbox.trashList= (function() {
		var init= function(){
			$(document).ready(function() {
				
				$('input[name="totChk"]').change(function(){
					if($('input[name="totChk"]').attr('checked') == 'checked'){
						$('input[name="chk"]').attr('checked','checked');
					}else {
						  $('input[name="chk"]').removeAttr('checked');
					}
				});
			
	            $('input[name="chk"]').change(function(){
	            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
	            	 var allCnt =$('input[name="chk"]').length;
	            	 if( allCnt==checkedCnt ){
	            		 $('input[name="totChk"]').attr('checked','checked');
		                }
		                else{
		                	 $('input[name="totChk"]').removeAttr('checked');
		                }
	            });
	            
				$('a[href="#delete-trashmails"]').click(function(event) {
					event.preventDefault();					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("삭제할 게시물을 선택하세요");
						return false;
					}
	
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/delete-trashmails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				});
				

				$('a[href="#restore-mails"]').click(function(event) {

					
					event.preventDefault();
					
					var checked = $('input[name="chk"]:checked').length;
					console.log(checked);
					
					if(checked == 0) {
						alert("복원할 게시물을 선택하세요");
						return false;
					}
	
					
					var sutil = SM.util.string;
					var req = [];
					$.each($('input[name="chk"]:checked'), function(i, item) {
						req[req.length] = item.value;
					});
					console.log(req);
					
					var data = JSON.stringify(req);
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/mail/restore-mails.do", data, function(result) {
						document.location.reload();
					});
					return false;
				
				});
				
			});
			
			
		};
				
		return {
			init:init
			
		};
	
}());


SM.ns('page.portal.mailbox.trashbox.trashRead');
SM.page.portal.mailbox.trashbox.trashRead= (function() {

    	var init= function(initdata){
		$(document).ready(function() {
	
			$('a[href="#print-mails"]').click(function(event) {
				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
				//window.print();

				url=CONTEXT+"/mailbox/printPopup.do?id=" + initdata.id+ "&mailBoxType=TRASHMAIL";

				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");
			
			});
			
			$('a[href="#delete-trashmail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/delete-trashmails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/trashbox/trashList.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
				});
				return false;
			});
			
			
			$('a[href="#restore-mail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/restore-mails.do", data, function(result) {
					document.location.href=CONTEXT+ '/mailbox/trashbox/trashList.do?id=' + initdata.id +'&key='+initdata.key+ '&keyword=' + initdata.keyword + '&nowPage=' + initdata.nowPage + '&accountId=' + initdata.accountId;
				});
				return false;
			});
		});
		
	};
	return {
		init:init
	};
}());



SM.ns('page.portal.mailbox.certPopup');
SM.page.portal.mailbox.certPopup= (function() {
	var init= function(){
		$(document).ready(function() {
		
			$('#modal-cerpPopup').on('show',function(event){
				alert('팝업');
//				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴
//				//window.print();
//				url=CONTEXT+"/mailbox/certPopup.do?id=" + initdata.id + "&mailBoxType=MAIL";
//				//url=CONTEXT+"/mailbox/sendbox/printPopup.do?id=" + initdata.id;
//				
//				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");

			});
			
		});
	};
	return {
		init:init
	};	
}());

SM.ns('page.portal.mail.calendar');
SM.page.portal.mail.calendar= (function() {
	var init= function(){
		$(document).ready(function() {
		
			
			$('#event').tooltip('show');
			$('#event').tooltip('hide');
			$('#event').tooltip('togle');
			$('#event').tooltip('destroy');
			
		});
	};
	return {
		init:init
	};	
}());
	
SM.ns('page.portal.mail.reservation.read');
SM.page.portal.mail.reservation.read= (function() {
	var init= function(initdata){
		$(document).ready(function() {
			
			$('a[href="#add-trash-mail"]').click(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = [];
				req[0] = initdata.id;
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/mail/add-trash-mails.do", data, function(result) {
					//document.location.href=CONTEXT+ '/mail/reservation.read.do?id=' + initdata.id ;
					document.location.href=CONTEXT+ '/mail/calendar.do?';
				});
				return false;
				
			});
			
			$('a[href="#print-mail"]').click(function(event) {

				event.preventDefault(); // 이벤트의 기본 기능을 해제한다. 이 경우에는 페이지가 바뀌면서 폼 전송을 무력화시킴

				//window.print();
				url=CONTEXT+"/mailbox/printPopup.do?id=" + initdata.id + "&mailBoxType=MAIL";
				//url=CONTEXT+"/mailbox/sendbox/printPopup.do?id=" + initdata.id;
				alert(url);
				window.open(url,"인쇄 팝업","width=1000,height=600,history=no,resizable=no,status=no,scrollbars=yes,menubar=no");
			
			});
			
		});
	};
	return {
		init:init
	};	
}());


SM.ns('page.portal.mypage.smail.registerCoporation');
SM.page.portal.mypage.smail.registerCoporation = (function() {
	var init= function(){
		$(document).ready(function() {
			console.log('load register coporation');
			$('.bt-select-coporation').click(function(event) {
				var id = $(event.target).data("business-license-no");
				$('#display-selected-coporation').text($('#name-'+id).text() + "("+id+")");
				$('#selected-coporation-id').val(id);
			});
			
			$('#form-add-coporation').submit(function(event) {
				var req = {"businessLicenseNo":$('#selected-coporation-id').val()};
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/register/add-coporation-register.do", data, function(result) {
					document.location.href = CONTEXT+"/mypage/smail/index.do";
				});
				return false;
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.board._edit');
SM.page.portal.customer.board._edit = function() {
	$( 'textarea.editor' ).ckeditor();
	$('#bt-add-attachment').click(function(event) {
		$('<li><input type="file" name="newAttachments" /></li>').appendTo($('#new-attachments-list'));
	});
};

SM.ns('page.portal.customer.notice.write');
SM.page.portal.customer.notice.write = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-write')[0].action = CONTEXT+"/customer/notice/write.do"; 
				$('#form-write')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.notice.modify');
SM.page.portal.customer.notice.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			
			var fileids = [];			
			$.each($(initData.fileMetas), function(i, file){
				var tr = '<tr class="template-download fade in">' +
				'<td class="preview">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="gallery"  download="'+file.name+'"><img src="'+file.thumbnail+'"></a>'+
	            '</td>'+
	            '<td class="name">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="'+file.thumbnail+'" download="'+file.name+'" >'+file.name+'</a>'+
	            '</td>'+
	            '<td class="size"><span>'+file.size+'</span></td>'+
	            '<td colspan="2"></td>'+
	            '<td class="delete">'+
		            '<button class="btn btn-danger" data-type="'+file.delete_type+'" data-url="'+file.delete_url+'" data-file-id="'+file.articleFileId+'" >'+
		                '<i class="icon-trash icon-white"></i>'+
		                '<span>Delete</span>'+
		            '</button>'+
		            '<input type="checkbox" name="delete" value="1" />'+
		            //'<input type="checkbox" name="deleteFiles" value="${file.articleFileId }" />'+
	            '</td>'+
		        '</tr>';
				$(tr).appendTo($('.files'));
			});
			
//			initData.fileMetas
//			console.log(initData.fileMetas);
			
//			var req = [] ;
//			$.each($(initData.fileMetas), function(i, item){
//				req[req.length] = item.id;
//			});
//			
//			var data = JSON.stringify(req);
//			SM.ajax.call(CONTEXT+"/ajax/upload.do", data, function(result) {
//				
//			});

			$('.btn-danger').click(function(event) {
				event.preventDefault();
				var fid = $(event.target).data("file-id");
				$('.files').find($('tr td button[data-file-id="'+fid+'"]')).parents('tr').remove();
				
				fileids[fileids.length] = fid;
				$('#deleteFileIds').val(fileids);
			});
			
			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})
				
				$('#fileIds').val(fids);
				$('#form-modify')[0].action = CONTEXT+"/customer/notice/modify.do"; 
				$('#form-modify')[0].submit();
			});
			
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.notice.reply');
SM.page.portal.customer.notice.reply = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-reply')[0].action = CONTEXT+"/customer/notice/reply.do"; 
				$('#form-reply')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.qna.write');
SM.page.portal.customer.qna.write = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-write')[0].action = CONTEXT+"/customer/qna/write.do"; 
				$('#form-write')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.qna.modify');
SM.page.portal.customer.qna.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});
			
			var fileids = [];			
			$.each($(initData.fileMetas), function(i, file){
				var tr = '<tr class="template-download fade in">' +
				'<td class="preview">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="gallery"  download="'+file.name+'"><img src="'+file.thumbnail+'"></a>'+
	            '</td>'+
	            '<td class="name">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="'+file.thumbnail+'" download="'+file.name+'" >'+file.name+'</a>'+
	            '</td>'+
	            '<td class="size"><span>'+file.size+'</span></td>'+
	            '<td colspan="2"></td>'+
	            '<td class="delete">'+
		            '<button class="btn btn-danger" data-type="'+file.delete_type+'" data-url="'+file.delete_url+'" data-file-id="'+file.articleFileId+'" >'+
		                '<i class="icon-trash icon-white"></i>'+
		                '<span>Delete</span>'+
		            '</button>'+
		            '<input type="checkbox" name="delete" value="1" />'+
		            //'<input type="checkbox" name="deleteFiles" value="${file.articleFileId }" />'+
	            '</td>'+
		        '</tr>';
				$(tr).appendTo($('.files'));
			});
			
			$('.btn-danger').click(function(event) {
				event.preventDefault();
				var fid = $(event.target).data("file-id");
				$('.files').find($('tr td button[data-file-id="'+fid+'"]')).parents('tr').remove();
				
				fileids[fileids.length] = fid;
				$('#deleteFileIds').val(fileids);
			});
			
			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-modify')[0].action = CONTEXT+"/customer/qna/modify.do"; 
				$('#form-modify')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.qna.reply');
SM.page.portal.customer.qna.reply = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();
				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})
				$('#fileIds').val(fids);
				$('#form-reply')[0].action = CONTEXT+"/customer/qna/reply.do"; 
				$('#form-reply')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.faq.write');
SM.page.portal.customer.faq.write = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-write')[0].action = CONTEXT+"/customer/faq/write.do"; 
				$('#form-write')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.faq.modify');
SM.page.portal.customer.faq.modify = (function() {
	var init = function(initData) {
		$(document).ready(function() {

			var fileids = [];			
			$.each($(initData.fileMetas), function(i, file){
				var tr = '<tr class="template-download fade in">' +
				'<td class="preview">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="gallery"  download="'+file.name+'"><img src="'+file.thumbnail+'"></a>'+
	            '</td>'+
	            '<td class="name">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="'+file.thumbnail+'" download="'+file.name+'" >'+file.name+'</a>'+
	            '</td>'+
	            '<td class="size"><span>'+file.size+'</span></td>'+
	            '<td colspan="2"></td>'+
	            '<td class="delete">'+
		            '<button class="btn btn-danger" data-type="'+file.delete_type+'" data-url="'+file.delete_url+'" data-file-id="'+file.articleFileId+'" >'+
		                '<i class="icon-trash icon-white"></i>'+
		                '<span>Delete</span>'+
		            '</button>'+
		            '<input type="checkbox" name="delete" value="1" />'+
		            //'<input type="checkbox" name="deleteFiles" value="${file.articleFileId }" />'+
	            '</td>'+
		        '</tr>';
				$(tr).appendTo($('.files'));
			});
			
			$('.btn-danger').click(function(event) {
				event.preventDefault();
				var fid = $(event.target).data("file-id");
				$('.files').find($('tr td button[data-file-id="'+fid+'"]')).parents('tr').remove();
				
				fileids[fileids.length] = fid;
				$('#deleteFileIds').val(fileids);
			});
			
			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-modify')[0].action = CONTEXT+"/customer/faq/modify.do"; 
				$('#form-modify')[0].submit();
			});
			
			
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.faq.reply');
SM.page.portal.customer.faq.reply = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();
				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})
				$('#fileIds').val(fids);
				$('#form-reply')[0].action = CONTEXT+"/customer/faq/reply.do"; 
				$('#form-reply')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.pds.write');
SM.page.portal.customer.pds.write = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-write')[0].action = CONTEXT+"/customer/pds/write.do"; 
				$('#form-write')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.pds.modify');
SM.page.portal.customer.pds.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			
			var fileids = [];			
			$.each($(initData.fileMetas), function(i, file){
				var tr = '<tr class="template-download fade in">' +
				'<td class="preview">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="gallery"  download="'+file.name+'"><img src="'+file.thumbnail+'"></a>'+
	            '</td>'+
	            '<td class="name">'+
	                '<a href="'+file.download+'" title="'+file.name+'" data-gallery="'+file.thumbnail+'" download="'+file.name+'" >'+file.name+'</a>'+
	            '</td>'+
	            '<td class="size"><span>'+file.size+'</span></td>'+
	            '<td colspan="2"></td>'+
	            '<td class="delete">'+
		            '<button class="btn btn-danger" data-type="'+file.delete_type+'" data-url="'+file.delete_url+'" data-file-id="'+file.articleFileId+'" >'+
		                '<i class="icon-trash icon-white"></i>'+
		                '<span>Delete</span>'+
		            '</button>'+
		            '<input type="checkbox" name="delete" value="1" />'+
		            //'<input type="checkbox" name="deleteFiles" value="${file.articleFileId }" />'+
	            '</td>'+
		        '</tr>';
				$(tr).appendTo($('.files'));
			});
			
			$('.btn-danger').click(function(event) {
				event.preventDefault();
				var fid = $(event.target).data("file-id");
				$('.files').find($('tr td button[data-file-id="'+fid+'"]')).parents('tr').remove();
				
				fileids[fileids.length] = fid;
				$('#deleteFileIds').val(fileids);
			});
			
			$('#btn-save').click(function(event) {
				event.preventDefault();

				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})

				$('#fileIds').val(fids);
				$('#form-modify')[0].action = CONTEXT+"/customer/pds/modify.do"; 
				$('#form-modify')[0].submit();
			});
			
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.customer.pds.reply');
SM.page.portal.customer.pds.reply = (function() {
	var init = function() {
		$(document).ready(function() {
			SM.page.portal.customer.board._edit();
			$('.btn-cancel').click(function() {
				history.back();
			});

			$('#btn-save').click(function(event) {
				event.preventDefault();
				var fids = [];
				$('.dndFiles').each(function(i, a) {
					fids[fids.length] = $(a).data("fid");
				})
				$('#fileIds').val(fids);
				$('#form-reply')[0].action = CONTEXT+"/customer/pds/reply.do"; 
				$('#form-reply')[0].submit();
			});
		});
	};
	return {
		init:init
	};
}());

var UserEditManager = {
		_ranks : [],
		_positions : [],
		addDepartment:function() {
			var url = CONTEXT+'/member/popup.department_tree.do?selectTarget=DEPARTMENT&showUsers=false&multiple=true';
			var items = showModalDialog(url,"", "dialogHeight:400px; dialogWidth:240px; help:no");
			if(items) {
				$.each(items, function(i, item) {
					if($('#userInDepartment-'+item.id).length == 0) {
						var offset = $('#departmentTable tbody tr').length;
						var row = '<tr id="userInDepartment-'+item.id+'" class="userInDepartmentRow"><td>'+item.id+'<input type="hidden" name="departments['+offset+'].departmentId" value="'+item.id+'" class="ud_id" /></td>'+
						'<td>'+item.name+'<input type="hidden" name="departments['+offset+'].departmentName" value="'+item.name+'" class="ud_name" /></td>'+
						'<td><select name="departments['+offset+'].rank" class="ud_rank">'+
						'<option value="">선택안함</option>';
						for(var i = 0; i < UserEditManager._ranks.length; i++) {
							var rank = UserEditManager._ranks[i];
							row += "<option value="+rank.id+">"+rank.name+"</option>";
						}
						row = row +
						'</select>'+
						'</td>'+
						'<td><select name="departments['+offset+'].position" class="ud_position">'+
						'<option value="">선택안함</option>';
						
						for(var i = 0; i < UserEditManager._positions.length; i++) {
							var position = UserEditManager._positions[i];
							row += "<option value="+position.id+">"+position.name+"</option>";
						}
						row = row +
						'</select>'+
						'</td>'+
						'<td><input type="button" value="위로" class="btUp" dept_id="'+item.id+'" /> <input type="button" value="�꾨옒濡� class="btDown" dept_id="'+item.id+'" /> <input type="button" value="�쒓굅" class="btRemove" dept_id="'+item.id+'" /></td>'+
						'</tr>';
						$(row).appendTo($('#departmentTable tbody')[0]);
					}
				});
			}
			UserEditManager.resetUserDepartmentButtons();
		},resetUserDepartmentButtons:function() {
			$('.btUp').click(UserEditManager.up);
			$('.btDown').click(UserEditManager.down);
			$('.btRemove').click(UserEditManager.remove);
		},up:function(event) {
			var deptId = $(event.target).attr('dept_id');
			var lineId = 'userInDepartment-'+deptId;
			var beforeId = null;
			$('tr.userInDepartmentRow').each(function(i, item) {
				if(item.id == lineId) {
					return false;
				}else {
					beforeId = item.id;
				}
			});
			if(beforeId) {
				$('#'+lineId).insertBefore('#'+beforeId);
			}
			UserEditManager._resetUserDepartmentElementOffset();
		},down:function(event) {
			var deptId = $(event.target).attr('dept_id');
			var lineId = 'userInDepartment-'+deptId;
			var passed = false;
			var afterId = null;
			$('tr.userInDepartmentRow').each(function(i, item) {
				if(item.id == lineId) {
					passed = true;
				}else {
					if(passed) {
						if(afterId) {
							return false;
						}else {
							afterId = item.id;
						}
					}
				}
			});
			if(afterId) {
				$('#'+lineId).insertAfter('#'+afterId);
			}
			UserEditManager._resetUserDepartmentElementOffset();
		},remove:function(event) {
			var deptId = $(event.target).attr('dept_id');
			var lineId = 'userInDepartment-'+deptId;
			$('#'+lineId).remove();
			UserEditManager._resetUserDepartmentElementOffset();
		},_resetUserDepartmentElementOffset:function() {
			$('tr.userInDepartmentRow').each(function(i, item) {
				var old = $(item).find('.ud_id')[0];
				if(old) {
					old.name="departments["+(i)+"].departmentId";
				}
			});
			
			$('tr.userInDepartmentRow').each(function(i, item) {
				var old = $(item).find('.ud_name')[0];
				if(old) {
					old.name="departments["+(i)+"].departmentName";
				}
			});
			
			$('tr.userInDepartmentRow').each(function(i, item) {
				var old = $(item).find('.ud_rank')[0];
				if(old) {
					old.name="departments["+(i)+"].rank";
				}
			});
			
			$('tr.userInDepartmentRow').each(function(i, item) {
				var old = $(item).find('.ud_position')[0];
				if(old) {
					old.name = "departments["+(i)+"].position";
				}
			});
		}
	};
SM.ns('page.admin.member.user.edit');
SM.page.admin.member.user.edit = (function() {
	var init = function() {
		
	};
	return {
		init:init
	};
}());
SM.ns('page.admin.member.user.list');
SM.page.admin.member.user.list = (function() {
	var init = function() {
		
	};
	return {
		init:init
	};
}());

SM.ns('page.admin.member.user.create');
SM.page.admin.member.user.create = (function() {
	var init = function(initData) {
		$(document).ready(function() {
			$('#regDate').datepicker({dateFormat:'yy-mm-dd'});
			$('#birthDay').datepicker({dateFormat:'yy-mm-dd'});
			$('#findDepartment').click(UserEditManager.addDepartment);
			UserEditManager._ranks = initData.ranks;
			UserEditManager._positions = initData.positions;
			UserEditManager.resetUserDepartmentButtons();
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.admin.member.user.modify');
SM.page.admin.member.user.modify = (function() {
	var init = function(initData) {
		$(document).ready(function() {
			$('#regDate').datepicker({dateFormat:'yy-mm-dd'});
			$('#birthDay').datepicker({dateFormat:'yy-mm-dd'});
			$('#findDepartment').click(UserEditManager.addDepartment);
			UserEditManager._ranks = initData.ranks;
			UserEditManager._positions = initData.positions;
			UserEditManager.resetUserDepartmentButtons();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.admin.create');
SM.admin.page.admin.create = (function() {
	var init = function() {
		$('#btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.admin.modify');
SM.admin.page.admin.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());


SM.ns('admin.page.category');
SM.admin.page.category = (function() {
	var init = function() {
		$(document).ready(function() {
			$('#form-create').submit(function(event) {
				event.preventDefault();
				if($('#f-name').val() == "") {
					alert("이름을 입력하세요");
					return false;
				}
				var sutil = SM.util.string;
				var req = {"id":sutil.trim($('#f-id').val()), "name":sutil.trim($('#f-name').val()), "parent":sutil.trim($('#f-parent').val())};
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/admin/category/create.do", data, function(result) {
					document.location.reload();
				});
				return false;
			});
			$('#form-modify').submit(function(event) {
				event.preventDefault();
				if($('#f-modify-name').val() == "") {
					alert("이름을 입력하세요");
					return false;
				}
				var sutil = SM.util.string;
				var req = {"id":sutil.trim($('#f-modify-id').val()), "name":sutil.trim($('#f-modify-name').val()), "parent":sutil.trim($('#f-parent').val())};
				var data = JSON.stringify(req);//$('#form-create').serializeArray();
				console.log(data);
				SM.ajax.call(CONTEXT+"/admin/category/modify.do", data, function(result) {
					document.location.reload();
				});
				return false;
			});
			$('#form-delete').submit(function(event) {
				event.preventDefault();
				var sutil = SM.util.string;
				var req = {"id":sutil.trim($('#f-delete-id').val())};
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/admin/category/delete.do", data, function(result) {
					document.location.reload();
				});
				return false;
			});
			$('.add-button').click(function(event) {
				var parentId = $(event.target).data('parent');
				$('#f-parent').val(parentId);
				$('#f-name').val("");
				$('#myModal').show();
			});
			$('.modify-button').click(function(event) {
				var parentId = $(event.target).data('parent');
				$('#f-parent').val(parentId);
				
				var value = $('input[name="category-'+parentId+'"]:checked').val();
				if(value != undefined && value != "") {
					var id = value;
					var req = {"id":id};
					var data = JSON.stringify(req);
					SM.ajax.call(CONTEXT+"/admin/category/get.do", data, function(category) {
						$('#f-modify-id').val(category.id);
						$('#f-modify-name').val(category.name);
						if(category.parent) {
							$('#f-modify-parent').val(category.parent);
						}else {
							$('#f-modify-parent').val("");
						}
						$('#modify-modal').show();
					});
				}else {
					alert("수정할 분류를 선택하세요.");
					return false;
				}
			});
			$('.delete-button').click(function(event) {
				var parentId = $(event.target).data('parent');
				var value = $('input[name="category-'+parentId+'"]:checked').val();
				if(value != undefined && value != "") {
					$('#f-delete-id').val(value);
					$('#delete-modal').show();
				}else {
					alert("삭제할 분류를 선택하세요.");
					return false;
				}
			});
			$('.delete-big-category-button').click(function(event) {
				var parentId = $(event.target).data('parent');
				$('#f-delete-id').val(parentId);
				$('#delete-modal').show();
			});
			$('#bt-create-big-category').click(function(event) {
				event.preventDefault();
				$('#f-parent').val("");
				$('#f-name').val("");
				$('#myModal').show();
			});
		});
	};
	return {
		init:init
	};
}());
SM.ns('admin.page.community.talk.list');
SM.admin.page.community.talk.list = (function() {
	var init = function() {
		$(document).ready(function() {
			$('a[href="#modal-delete"]').click(function(event) {
				event.preventDefault();
				var checked = $('input[name="articleIds"]:checked').length;
				if(checked == 0) {
					alert("삭제할 게시물을 선택하세요");
					return false;
				}
				$('#modal-delete').show();
			});
			$('#form-delete-items').submit(function(event) {
				event.preventDefault();
				var sutil = SM.util.string;
				var req = [];
				$.each($('input[name="articleIds"]:checked'), function(i, item) {
					req[req.length] = parseInt(item.value*1*10) ;
				});
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/article/delete-items.do", data, function(result) {
					document.location.reload();
				});
				return false;
				
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.product.list');
SM.admin.page.product.list = (function() {
	var treeTargetId = null;
	/**
	 * initData.treeData (string)
	 * initData.openIds (string array)
	 * initData.currentCategoryId (long) current category id 
	 */
	var init = function(initData) {
		$(document).ready(function() {
			console.log(initData.treeData);
			console.log(initData.openIds);
			var tree = new JSTree();
			tree.load('category-tree-container', function(item) {
				var id = item.id;
				console.log(id);
				document.location.href=CONTEXT+"/admin/product/list.do?category="+id;
			}, initData.openIds, initData.treeData, ['vt-']);
			
			$('a[href="#modal-up-category"]').click(function(event) {
				event.preventDefault();
				var data = JSON.stringify({id:initData.currentCategoryId});
				SM.ajax.call(CONTEXT+"/ajax/product/category/up.do", data, function(result) {
					document.location.reload();
				});
			});
			
			$('a[href="#modal-down-category"]').click(function(event) {
				event.preventDefault();
				var data = JSON.stringify({id:initData.currentCategoryId});
				SM.ajax.call(CONTEXT+"/ajax/product/category/down.do", data, function(result) {
					document.location.reload();
				});
			});
			
			$('a[href="#modal-move-category"]').click(function(event) {
				event.preventDefault();
				treeTargetId = null;
				console.log($('#move-category-tree-container').text());
				if($('#move-category-tree-container').text() == '') {
					var tree2 = new JSTree();
					tree2.load('move-category-tree-container', function(item) {
						var id = item.id;
						treeTargetId = id;
					}, [], initData.treeData, ['vt-']);
				}
				$('#modal-move-category').show();
			});
			
			$('a[href="#modal-delete"]').click(function(event) {
				event.preventDefault();
				var checked = $('input[name="productIds"]:checked').length;
				if(checked == 0) {
					alert("삭제할 상품을 선택하세요");
					return false;
				}
				$('#modal-delete').show();
			});
			
			$('a[href="#add-new-items"]').click(function(event) {
				console.log("add bestsellers clicked");
				event.preventDefault();
				var checked = $('input[name="productIds"]:checked').length;
				if(checked == 0) {
					alert("신상품으로 선정할 상품을 선택하세요");
					return false;
				}
				var req = [];
				$.each($('input[name="productIds"]:checked'), function(i, item) {
					req[req.length] = item.value ;
				});
				
				var data = JSON.stringify(req);
				SM.ajax.call(CONTEXT+"/ajax/product/new/set.do", data, function(result) {
					document.location.reload();
				});
			});
			
			$('a[href="#remove-new-items"]').click(function(event) {
				console.log("remove bestsellers clicked");
				event.preventDefault();
				var checked = $('input[name="productIds"]:checked').length;
				if(checked == 0) {
					alert("신상품에서 제거할 상품을 선택하세요");
					return false;
				}
				var req = [];
				$.each($('input[name="productIds"]:checked'), function(i, item) {
					req[req.length] = item.value ;
				});
				
				var data = JSON.stringify(req);
				SM.ajax.call(CONTEXT+"/ajax/product/new/unset.do", data, function(result) {
					document.location.reload();
				});
			});
			
			
			$('#form-add-category').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					name : sutil.trim($('#form-add-category input[name="name"]').val()),
					parent : sutil.trim($('#form-add-category input[name="parent"]').val())
				};
				if(req.name == null) {
					alert("카테고리명을 입력하세요.");
					return false;
				}
				$('#form-add-category')[0].submit();
				
			});
			$('#form-modify-category').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					name : sutil.trim($('#form-modify-category input[name="name"]').val()),
					parent : sutil.trim($('#form-modify-category input[name="parent"]').val())
				};
				if(req.name == null) {
					alert("카테고리명을 입력하세요.");
					return false;
				}
				$('#form-modify-category')[0].submit();
				
			});
			
			$('#form-move-category').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					id : $('#f-move-category-source').val(),
					parent : treeTargetId
				};
				if(req.parent == null) {
					alert("대상 카테고리를 선택하세요");
					return false;
				}
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/admin/product/category/move.do", data, function(result) {
					document.location.href = CONTEXT+"/admin/product/list.do?category="+req.id;
				});
			});
			
			$('#form-remove-category').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					id : initData.currentCategoryId
				};
				console.log(req);
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/admin/product/category/delete.do", data, function(result) {
					document.location.href = CONTEXT+"/admin/product/list.do";
				});
				return false;
			});
			$('#form-delete-items').submit(function(event) {
				event.preventDefault();
				var sutil = SM.util.string;
				var req = [];
				$.each($('input[name="productIds"]:checked'), function(i, item) {
					req[req.length] = item.value ;
				});
				console.log(req);
				
				var data = JSON.stringify(req);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/product/delete-items.do", data, function(result) {
					document.location.reload();
				});
				return false;
				
			});
		});
	};
	return {
		init:init
	};
}());
SM.ns('admin.page.product.create');
SM.admin.page.product.create = (function() {
	var categoryItemNextId = $('#category-items').length;
	var synergeItemNextId = $('#synerge-items').length;
	var deselectCategory = function(categoryId) {
		$('#category-item-'+categoryId).remove();
	};
	var deselectSynergeProduct = function(productId) {
		$('#synerge-item-'+productId).remove();
	};
	var init = function(initData) {
		$(document).ready(function() {
			$('textarea.editor' ).ckeditor();
			$('.btn-cancel').click(function() {
				history.back();
			});
			
			$('#bt-add-category').click(function(event) {
				console.log("clickd add category");
				event.preventDefault();
				treeTargetId = null;
				console.log($('#category-tree-container').text());
				if($('#category-tree-container').text() == '') {
					var tree2 = new JSTree();
					tree2.load('category-tree-container', function(item) {
						var id = item.id;
						treeTargetId = id;
					}, [], initData.treeData, ['vt-']);
				}
				console.log('show');
				$('#modal-select-category').show();
			});
			
			$('#form-select-category').submit(function(event) {
				event.preventDefault();
				console.log("submit");
				
				var sutil = SM.util.string;
				if(treeTargetId == null) {
					alert("카테고리를 선택하세요");
					return false;
				}
				
				if($('#category-item-'+treeTargetId).length == 0) {
					var data = JSON.stringify({id:treeTargetId});
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/product/category/get.do", data, function(result) {
						console.log(result);
						if(result.type.code != "PRODUCT") {
							alert("제품 카테고리에만 선택 할 수 있습니다.");
							return;
						}else {
							var li = '<li id="category-item-'+treeTargetId+'">'+
								'<input type="hidden" name="categories['+categoryItemNextId+']" value="'+result.id+'" />'+
								result.fullName + ' / '+result.name +
								' '+
								'<button type="button" class="btn btn-mini" onclick="SM.admin.page.product.create.deselectCategory('+result.id+');">삭제</button>'+
								'</li>';
							categoryItemNextId++;
							$(li).appendTo($('#category-items'));
							$('#modal-select-category').modal('hide');
						}
					});
				}else {
					alert("이미 등록된 카테고리 입니다.");
					return false;
				}
			});
			
			$('#bt-add-product').click(function(event) {
				event.preventDefault();
				treeTargetId = null;
				console.log($('#product-category-tree-container').text());
				if($('#product-category-tree-container').text() == '') {
					var tree2 = new JSTree();
					tree2.load('product-category-tree-container', function(item) {
						var id = item.id;
						$('#product-container').load(CONTEXT+'/admin/product/frag.products.do', {category:id}, function() {
							
						});
					}, [], initData.treeData, ['vt-']);
				}else {
					$('#product-container').text('');
				}
				console.log('show');
				$('#modal-select-product').show();
			});
			
			
			$('#form-select-product').submit(function(event) {
				event.preventDefault();
				console.log("submit");
				
				var checked = $('input[name="productIds"]:checked').length;
				if(checked == 0) {
					alert("상품을 선택하세요");
					return false;
				}
				
				$.each($('input[name="productIds"]:checked'), function(i, item) {
					var productId = item.value;
					
					var data = JSON.stringify({id:productId});
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/product/get.do", data, function(result) {
						console.log(result);
						if($('#synerge-item-'+productId).length == 0) {
							var li = '<li id="synerge-item-'+result.id+'">'+
								'<input type="hidden" name="synergeProducts['+synergeItemNextId+']" value="'+result.id+'" />'+
								result.name +
								' '+
								'<button type="button" class="btn btn-mini" onclick="SM.admin.page.product.create.deselectSynergeProduct(\''+result.id+'\');">삭제</button>'+
								'</li>';
							synergeItemNextId++;
							$(li).appendTo($('#synerge-items'));
							$('#modal-select-product').modal('hide');
						}else {
							alert(result.name+" 제품은 이미 시너지 제품으로 추가한 상품 입니다.");
							return false;
						}
					});
					
				});
			});
		});
	};
	return {
		init:init,
		deselectCategory:deselectCategory,
		deselectSynergeProduct:deselectSynergeProduct
	};
}());

SM.ns('admin.page.product.modify');
SM.admin.page.product.modify = (function() {
	var categoryItemNextId = $('#category-items > li').length;
	var synergeItemNextId = $('#synerge-items > li').length;
	var deselectCategory = function(categoryId) {
		$('#category-item-'+categoryId).remove();
	};
	var deselectSynergeProduct = function(productId) {
		$('#synerge-item-'+productId).remove();
	};
	var init = function(initData) {
		$(document).ready(function() {
			$('textarea.editor' ).ckeditor();
			$('.btn-cancel').click(function() {
				history.back();
			});
			
			$('#bt-add-category').click(function(event) {
				console.log("clickd add category");
				event.preventDefault();
				treeTargetId = null;
				console.log($('#category-tree-container').text());
				if($('#category-tree-container').text() == '') {
					var tree2 = new JSTree();
					tree2.load('category-tree-container', function(item) {
						var id = item.id;
						treeTargetId = id;
					}, [], initData.treeData, ['vt-']);
				}
				console.log('show');
				$('#modal-select-category').show();
			});
			
			$('#form-select-category').submit(function(event) {
				event.preventDefault();
				console.log("submit");
				
				var sutil = SM.util.string;
				if(treeTargetId == null) {
					alert("카테고리를 선택하세요");
					return false;
				}
				
				if($('#category-item-'+treeTargetId).length == 0) {
					var data = JSON.stringify({id:treeTargetId});
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/product/category/get.do", data, function(result) {
						console.log(result);
						if(result.type.code != "PRODUCT") {
							alert("제품 카테고리에만 선택 할 수 있습니다.");
							return;
						}else {
							var li = '<li id="category-item-'+treeTargetId+'">'+
								'<input type="hidden" name="categories['+categoryItemNextId+']" value="'+result.id+'" />'+
								result.fullName + ' / '+result.name +
								' '+
								'<button type="button" class="btn btn-mini" onclick="SM.admin.page.product.create.deselectCategory('+result.id+');">삭제</button>'+
								'</li>';
							categoryItemNextId++;
							$(li).appendTo($('#category-items'));
							$('#modal-select-category').modal('hide');
						}
					});
				}else {
					alert("이미 등록된 카테고리 입니다.");
					return false;
				}
			});
			
			$('#bt-add-product').click(function(event) {
				event.preventDefault();
				treeTargetId = null;
				console.log($('#product-category-tree-container').text());
				if($('#product-category-tree-container').text() == '') {
					var tree2 = new JSTree();
					tree2.load('product-category-tree-container', function(item) {
						var id = item.id;
						$('#product-container').load(CONTEXT+'/admin/product/frag.products.do', {category:id}, function() {
							
						});
					}, [], initData.treeData, ['vt-']);
				}else {
					$('#product-container').text('');
				}
				console.log('show');
				$('#modal-select-product').show();
			});
			
			
			$('#form-select-product').submit(function(event) {
				event.preventDefault();
				console.log("submit");
				
				var checked = $('input[name="productIds"]:checked').length;
				if(checked == 0) {
					alert("상품을 선택하세요");
					return false;
				}
				
				$.each($('input[name="productIds"]:checked'), function(i, item) {
					var productId = item.value;
					
					var data = JSON.stringify({id:productId});
					console.log(data);
					SM.ajax.call(CONTEXT+"/ajax/product/get.do", data, function(result) {
						console.log(result);
						if($('#synerge-item-'+productId).length == 0) {
							var li = '<li id="synerge-item-'+result.id+'">'+
								'<input type="hidden" name="synergeProducts['+synergeItemNextId+']" value="'+result.id+'" />'+
								result.name +
								' '+
								'<button type="button" class="btn btn-mini" onclick="SM.admin.page.product.create.deselectSynergeProduct(\''+result.id+'\');">삭제</button>'+
								'</li>';
							synergeItemNextId++;
							$(li).appendTo($('#synerge-items'));
							$('#modal-select-product').modal('hide');
						}else {
							alert(result.name+" 제품은 이미 시너지 제품으로 추가한 상품 입니다.");
							return false;
						}
					});
					
				});
			});
		});
	};
	return {
		init:init,
		deselectCategory:deselectCategory,
		deselectSynergeProduct:deselectSynergeProduct
	};
}());

SM.ns('admin.page.product.deleteProduct');
SM.admin.page.product.deleteProduct = (function() {
	var init = function(initData) {
		$(document).ready(function() {
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());

/*
 * Page : Admin/Mall
 */
SM.ns('admin.page.mall.modify');
SM.admin.page.mall.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			$('.btn-cancel').click(function() {
				history.back();
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.bestseller.list');
SM.admin.page.bestseller.list = (function() {
	var init = function() {
		$(document).ready(function() {
			$('#form-create-blank').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					name : sutil.trim($('#form-create-blank input[name="image"]').val())
				};
				
				if(req.name == null) {
					alert("이미지 파일을 선택하세요");
					return false;
				}
				$('#form-create-blank')[0].submit();
				
			});
			
			$('a[href="#modal-modify-blank"]').click(function(event) {
				event.preventDefault();
				var id = $(event.target).parent().data("id");
				var data = JSON.stringify({id:id});
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/bestseller/get.do", data, function(result) {
					console.log(result);
					$('#f-modify-id').val(result.id);
					$('#f-modify-url').val(result.url);
					if(result.image != null) {
						var $img = $('<img src="'+CONTEXT+'/download/file.do?fid='+result.image+'" />');
						$('#modify-image-panel > *').remove();
						$img.appendTo($('#modify-image-panel'));
					}
				});
			});
			
			$('#form-modify-blank').submit(function(event) {
				event.preventDefault();
				
				var sutil = SM.util.string;
				var req = {
					name : sutil.trim($('#form-create-blank input[name="image"]').val())
				};
				
				$('#form-modify-blank')[0].submit();
				
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.webpage.list');
SM.admin.page.webpage.list = (function() {
	var init = function() {
		$( 'textarea.editor' ).ckeditor();
		$( '.btn-reset' ).click(function() {
			document.location.reload();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.mainitem.create');
SM.admin.page.mainitem.create = (function() {
	var init = function() {
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.mainitem.modify');
SM.admin.page.mainitem.modify = (function() {
	var init = function() {
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.popup.create');
SM.admin.page.popup.create = (function() {
	var init = function() {
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.popup.modify');
SM.admin.page.popup.modify = (function() {
	var init = function() {
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('admin.page.member.modify');
SM.admin.page.member.modify = (function() {
	var init = function() {
		$('.btn-cancel').click(function() {
			history.back();
		});
	};
	return {
		init:init
	};
}());

SM.ns('config.page.sign.list');
SM.config.page.sign.list = (function() {
	var init = function() {
		$(document).ready(function() {
			
			
			$('#sign-list').change(function(){
				var signId = $('#sign-list').val();
				
				if(signId == "" || signId == undefined){
					
					$('#f-name').val("");
					$('#f-default')[0].checked = false;
					$('#f-message').val("");
					
					return false;
				}
				
				var data = JSON.stringify(signId);
				
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/config/get-sign.do", data, function(result) {
					
					$('#f-name').val(result.name);
					$('#f-default')[0].checked = result.defaultSign;
					$('#f-message').val(result.message);
					
				});
				
			});
		});
	};
	return {
		init:init
	};
}());


SM.ns('page.portal.addressbook.mailAddress.manage');
SM.page.portal.addressbook.mailAddress.manage = (function() {
	var init = function() {
		$(document).ready(function() {
			
			$('input[name="totChk"]').change(function(){
				if($('input[name="totChk"]').attr('checked') == 'checked'){
					$('input[name="chk"]').attr('checked','checked');
				}else {
					  $('input[name="chk"]').removeAttr('checked');
				}
			});
		
            $('input[name="chk"]').change(function(){
            	 var checkedCnt = $('input[name="chk"]').filter(":checked").length;
            	 var allCnt =$('input[name="chk"]').length;
            	 if( allCnt==checkedCnt ){
            		 $('input[name="totChk"]').attr('checked','checked');
	                }
	                else{
	                	 $('input[name="totChk"]').removeAttr('checked');
	                }
            });
			
			$('a[href="#create-mailAddress"]').click(function(event){
				event.preventDefault();
				$('#form-create')[0].submit();
			});
			
			$('a[href="#delete-mailAddress"]').click(function(event){
				event.preventDefault();
				var checked = $('input[name="chk"]:checked').length;
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				
				if(confirm("정말 삭제하시겠습니까?")){
					var addresstIds = [] ;
					$.each($('input[name="chk"]:checked'), function(i, item) {
						addresstIds[addresstIds.length] = item.value;
					});
					console.log(addresstIds);
					
					var data = JSON.stringify(addresstIds);
					console.log(data);
					
					SM.ajax.call(CONTEXT+"/ajax/addresbook/delete.do", data, function(result) {
						console.log(result);
						document.location.reload();
					});
				}
			});
			
			$('a[href="#add-bookmark"]').click(function(event){
				event.preventDefault();
				var checked = $('input[name="chk"]:checked').length;
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				var addresstIds = [] ;
				$.each($('input[name="chk"]:checked'), function(i, item) {
					addresstIds[addresstIds.length] = item.value;
				});
				console.log(addresstIds);
				
				var data = JSON.stringify(addresstIds);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/addresbook/add-bookmark.do", data, function(result) {
					console.log(result);
					document.location.reload();
				});
				
				//$('input[name="totChk"]').removeAttr('checked');
				//$('input[name="chk"]').removeAttr('checked');
			});
			
			$('a[href="#sub-bookmark"]').click(function(event){  
				event.preventDefault();
				var checked = $('input[name="chk"]:checked').length;
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				var addresstIds = [] ;
				$.each($('input[name="chk"]:checked'), function(i, item) {
					addresstIds[addresstIds.length] = item.value;
				});
				console.log(addresstIds);
				
				var data = JSON.stringify(addresstIds);
				console.log(data);
				SM.ajax.call(CONTEXT+"/ajax/addresbook/sub-bookmark.do", data, function(result) {
					console.log(result);
					document.location.reload();
					
				});
			});
			
			
			$('a[href="#add-addressGroup"]').click(function(event){  
				event.preventDefault();
				var checked = $('input[name="chk"]:checked').length;
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				$('#modal-select-addressGroup').modal('show');
			});
			
			$('a[href="#sub-addressGroup"]').click(function(event){  
				event.preventDefault();
				var checked = $('input[name="chk"]:checked').length;
				if(checked == 0) {
					alert("주소록을 선택하세요");
					return false;
				}
				
				$('#remove').val(true);
				$('#modal-select-addressGroup').modal('show');
				
			});
			
			$('.select-addressGroup').click(function(event){
				var groupId = $('#groupId').val();
				
				if(groupId == "" || groupId == undefined){
					alert("그룹을 선택하세요");
					return false;
				}
				var param = {
					addressIds : [],
					groupId : groupId
				};
				$.each($('input[name="chk"]:checked'), function(i, item) {
					param.addressIds[param.addressIds.length] = item.value;
				});
				console.log(param);
				var data = JSON.stringify(param);
				console.log(data);
				
				if($('#remove').val() == "true"){
					SM.ajax.call(CONTEXT+"/ajax/addresbook/sub-addressGroup.do", data, function(result) {
						console.log(result);
						document.location.reload();
						$('#remove').val("false");
					});
				}else{
					SM.ajax.call(CONTEXT+"/ajax/addresbook/add-addressGroup.do", data, function(result) {
						console.log(result);
						document.location.reload();
					});
				}
				
			});
			
			
			$('a[href="#output-address"]').click(function(event){  
				event.preventDefault();
				
				if(confirm("주소록을 내보내시겠습니까?")){
					document.location.href = CONTEXT+'/addressbook/mail/output.do';
				}
			});
			
			$('.inputAddress').click(function(event){
				var file = $('#file').val();
				if(file == "" || file == undefined){
					alert("파일을 선택하세요");
					return false;
				}
				$('#form-input')[0].submit();
			});
			
			
			$('#groupId').change(function(){
				if($('#groupId').val() == "new"){
					$('#modal-select-group').modal('show');
				}
			});
			
			$('.modal-create-group').click(function(evnet){
				
				var groupName = $('#groupName').val();
				if(groupName == "" || groupName == undefined){
					alert("그룹명을 입력하세요.");
					return false;
				}				
				
				var data = JSON.stringify(groupName);
				console.log(data);    
				SM.ajax.call(CONTEXT+"/ajax/addresbook/create-addressGroup.do", data, function(result) {
					var o = '<option value="'+ result.id + '" selected >' + result.name + '</option>' ;
					$('#groupId').append($(o));
					$('#modal-select-group').modal('hide');
				});	
			});
			
			$('.btn-modal-input-close').click(function(evnet){
				$('#modal-select-input').modal('hide');
			});
			
			$('.btn-modal-addressGroup-close').click(function(evnet){
				$('#modal-select-addressGroup').modal('hide');
			});
			
			$('.btn-modal-group-close').click(function(evnet){
				$('#modal-select-group').modal('hide');
				$('#groupId').val("");
			});
			
		});
	};
	return {
		init:init
	};
}());


SM.ns('page.portal.addressbook.mailAddress.create');
SM.page.portal.addressbook.mailAddress.create = (function() {
	var init = function() {
		$(document).ready(function() {
			
			$('#groupId').change(function(){
				if($('#groupId').val() == "new"){
					$('#modal-select-group').modal('show');
				}
			});
			
			$('.modal-create-group').click(function(evnet){
				
				var groupName = $('#groupName').val();
				if(groupName == "" || groupName == undefined){
					alert("그룹명을 입력하세요.");
					return false;
				}				
				
				var data = JSON.stringify(groupName);
				console.log(data);    
				SM.ajax.call(CONTEXT+"/ajax/addresbook/create-addressGroup.do", data, function(result) {
					var o = '<option value="'+ result.id + '" selected >' + result.name + '</option>' ;
					$('#groupId').append($(o));
					$('#modal-select-group').modal('hide');
				});	
			});
			
			$('.btn-modal-group-close').click(function(evnet){
				$('#modal-select-group').modal('hide');
				$('#groupId').val("");
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.addressbook.mailAddress.modify');
SM.page.portal.addressbook.mailAddress.modify = (function() {
	var init = function() {
		$(document).ready(function() {
			
			$('#groupId').change(function(){
				if($('#groupId').val() == "new"){
					$('#modal-select-group').modal('show');
				}
			});
			
			$('.modal-create-group').click(function(evnet){
				
				var groupName = $('#groupName').val();
				if(groupName == "" || groupName == undefined){
					alert("그룹명을 입력하세요.");
					return false;
				}				
				
				var data = JSON.stringify(groupName);
				console.log(data);    
				SM.ajax.call(CONTEXT+"/ajax/addresbook/create-addressGroup.do", data, function(result) {
					var o = '<option value="'+ result.id + '" selected >' + result.name + '</option>' ;
					$('#groupId').append($(o));
					$('#modal-select-group').modal('hide');
				});	
			});
			
			$('.btn-modal-group-close').click(function(evnet){
				$('#modal-select-group').modal('hide');
				$('#groupId').val("");
			});
		});
	};
	return {
		init:init
	};
}());

SM.ns('page.portal.config.general.config.set');
SM.page.portal.config.general.config.set= (function() {
	
	var cbkConfig=function(page){
		alert(page.perPage + "로  설정되었습니다.");
		//document.location.reload();
		
	};
	
	return {
		cbkConfig:cbkConfig
	};
	
}());

SM.ns('page.portal.addressbook.group.manage');
SM.page.portal.addressbook.group.manage = (function() {
	var init = function() {
		$(document).ready(function() {
			
			$('a[href="#create-group"]').click(function(event){
				event.preventDefault();
				$('#form-create')[0].submit();
				event.returnValue = false;
				window.close(); 
			});
		});	
	};
	return {
		init:init
	};
}());

SM.page.global.init();
if(typeof(LOAD_PAGE) != "undefined"){
	SM.ns(LOAD_PAGE);
	if(typeof SM.ns(LOAD_PAGE+".init") == "function") {
		if(typeof initData == "undefined") {
			initData = {};
		}
		SM.ns(LOAD_PAGE).init(initData);
	}
}