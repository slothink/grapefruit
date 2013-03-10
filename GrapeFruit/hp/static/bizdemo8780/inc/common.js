function bluring() {
try{
    if(event.srcElement.tagName=='A'||event.srcElement.tagName=='IMG') {
        document.body.focus();
    }
}catch( e ) { }
}
try{
document.onfocusin=bluring;
}catch( e ) { }

var rurl = location.href;
var purl = getUrl(rurl);

function getUrl(url_str)
{
    var real_url;
    if (url_str.indexOf('/') > 0)
    {
        real_url = url_str.split('/');
        real_url = real_url[0]+'//'+real_url[2]+'/'+real_url[3]+'/';
    }
    return real_url;
}

function goLocate(go_url)
{
  document.location = purl + go_url;
}

if(!document.__define_CObjectLoader__)
{
 document.__define_CObjectLoader__ = true
 
CObjectLoader();
function CObjectLoader()
{
  CObjectLoader.load = function(loadStr)
  {
    document.write(loadStr);
  }
}

}
/********************************************************************************
*******                     Download시 저장여부를 확인하기위한 스크립트              *******
********************************************************************************/
function Download_Confirm(fileDir,fileName)
{
 
      document.frmDown.action = "/FileDownloadConfirm.do";
      document.frmDown.hidFolderName.value = fileDir;
      document.frmDown.hidFileName.value = fileName;
      document.frmDown.submit();
}


/*
IE Flash ActiveContent Activation Script
Author: Faisal Iqbal (chall3ng3r)
Blog: http://www.orison.biz/blog/chall3ng3r/
Feel free to modify or distribute.
*/
 
/*
Method: FlashObject
 Param1: SWF path
 Param2: Movie width
 Param3: Movie height
 Param4: BGColor
 Param5: Flashvars (Optional)
*/
function FlashObject(swf, width, height, bgcolor, id, flashvars)
{
    var strFlashTag = new String();
    
    if (navigator.appName.indexOf("Microsoft") != -1)
    {
        strFlashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        strFlashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=version=8,0,0,0" ';
        strFlashTag += 'id="' + id + '" width="' + width + '" height="' + height + '">';
        strFlashTag += '<param name="movie" value="' + swf + '"/>';
        
        if(flashvars != null) {strFlashTag += '<param name="flashvars" value="' + flashvars + '"/>'};
        strFlashTag += '<param name="quality" value="best"/>';
        strFlashTag += '<param name="bgcolor" value="' + bgcolor + '"/>';
        strFlashTag += '<param name="menu" value="false"/>';
        strFlashTag += '<param name="salign" value="LT"/>';
        strFlashTag += '<param name="scale" value="noscale"/>';
        // strFlashTag += '<param name="wmode" value="transparent"/>';
        strFlashTag += '<param name="allowScriptAccess" value="sameDomain"/>';
        strFlashTag += '</object>';
    }
    else
    {
        strFlashTag += '<embed src="' + swf + '" ';
        strFlashTag += 'quality="best" ';
        strFlashTag += 'bgcolor="' + bgcolor + '" ';
        strFlashTag += 'width="' + width + '" ';
        strFlashTag += 'height="' + height + '" ';
        strFlashTag += 'menu="false" ';
        strFlashTag += 'scale="noscale" ';
         strFlashTag += 'id="' + id + '" ';
        strFlashTag += 'salign="LT" ';
       //  strFlashTag += 'wmode="transparent" ';
        strFlashTag += 'allowScriptAccess="sameDomain" ';
        if(flashvars != null) {strFlashTag += 'flashvars="' + flashvars + '" '};
        strFlashTag += 'type="application/x-shockwave-flash" ';
        strFlashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
        strFlashTag += '</embed>';
    }
 document.write(strFlashTag);
}
 
  