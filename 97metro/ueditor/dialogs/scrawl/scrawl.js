function ue_callback(a,b){function c(a,b,c,d){var e,f=0,g=0,h=a.width||c,i=a.height||d;(h>b||i>b)&&(h>=i?(f=h-b)&&(e=(f/h).toFixed(2),a.height=i-i*e,a.width=b):(g=i-b)&&(e=(g/i).toFixed(2),a.width=h-h*e,a.height=b))}var d=document,e=$G("J_picBoard"),f=d.createElement("img");removeMaskLayer(),"SUCCESS"==b?(e.innerHTML="",f.onload=function(){c(this,300),e.appendChild(f);var a=new scrawl;a.btn2Highlight("J_removeImg"),a.btn2Highlight("J_sacleBoard")},f.src=a):alert(b)}function removeMaskLayer(){var a=$G("J_maskLayer");a.className="maskLayerNull",a.innerHTML="",dialog.buttons[0].setDisabled(!1)}function addMaskLayer(a){var b=$G("J_maskLayer");dialog.buttons[0].setDisabled(!0),b.className="maskLayer",b.innerHTML=a}function exec(scrawlObj){if(scrawlObj.isScrawl){addMaskLayer(lang.scrawlUpLoading);var base64=scrawlObj.getCanvasData();if(base64){var options={timeout:1e5,onsuccess:function(xhr){if(!scrawlObj.isCancelScrawl){var responseObj;if(responseObj=eval("("+xhr.responseText+")"),"SUCCESS"==responseObj.state){var imgObj={},url=editor.options.scrawlUrlPrefix+responseObj.url;imgObj.src=url,imgObj._src=url,imgObj.alt=responseObj.original||"",imgObj.title=responseObj.title||"",editor.execCommand("insertImage",imgObj),dialog.close()}else alert(responseObj.state)}},onerror:function(){alert(lang.imageError),dialog.close()}};options[editor.getOpt("scrawlFieldName")]=base64;var actionUrl=editor.getActionUrl(editor.getOpt("scrawlActionName")),params=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",url=utils.formatUrl(actionUrl+(-1==actionUrl.indexOf("?")?"?":"&")+params);ajax.request(url,options)}}else addMaskLayer(lang.noScarwl+"&nbsp;&nbsp;&nbsp;<input type='button' value='"+lang.continueBtn+"'  onclick='removeMaskLayer()'/>")}var scrawl=function(a){a&&this.initOptions(a)};!function(){var a=$G("J_brushBoard"),b=a.getContext("2d"),c=[],d=0;scrawl.prototype={isScrawl:!1,brushWidth:-1,brushColor:"",initOptions:function(a){var b=this;b.originalState(a),b._buildToolbarColor(a.colorList),b._addBoardListener(a.saveNum),b._addOPerateListener(a.saveNum),b._addColorBarListener(),b._addBrushBarListener(),b._addEraserBarListener(),b._addAddImgListener(),b._addRemoveImgListenter(),b._addScalePicListenter(),b._addClearSelectionListenter(),b._originalColorSelect(a.drawBrushColor),b._originalBrushSelect(a.drawBrushSize),b._clearSelection()},originalState:function(a){var c=this;c.brushWidth=a.drawBrushSize,c.brushColor=a.drawBrushColor,b.lineWidth=c.brushWidth,b.strokeStyle=c.brushColor,b.fillStyle="transparent",b.lineCap="round",b.fill()},_buildToolbarColor:function(a){var b=null,c=[];c.push("<table id='J_colorList'>");for(var d,e=0;d=a[e++];)(e-1)%5==0&&(1!=e&&c.push("</tr>"),c.push("<tr>")),b="#"+d,c.push("<td><a title='"+b+"' href='javascript:void(0)' style='background-color:"+b+"'></a></td>");c.push("</tr></table>"),$G("J_colorBar").innerHTML=c.join("")},_addBoardListener:function(e){var f,g=this,h=0,i=-1,j=-1,k=!1,l=!1,m=!1,n=0,o="";h=parseInt(domUtils.getComputedStyle($G("J_wrap"),"margin-left")),c.push(b.getImageData(0,0,b.canvas.width,b.canvas.height)),d+=1,domUtils.on(a,["mousedown","mousemove","mouseup","mouseout"],function(a){switch(f=browser.webkit?a.which:n,a.type){case"mousedown":n=1,o=1,k=!0,m=!1,l=!1,g.isScrawl=!0,i=a.clientX-h,j=a.clientY-h,b.beginPath();break;case"mousemove":if(!o&&0==f)return;if(!o&&f&&(i=a.clientX-h,j=a.clientY-h,b.beginPath(),o=1),m||!k)return;var c=a.clientX-h,d=a.clientY-h;b.moveTo(i,j),b.lineTo(c,d),b.stroke(),i=c,j=d,l=!0;break;case"mouseup":if(n=0,!k)return;l||(b.arc(i,j,b.lineWidth,0,2*Math.PI,!1),b.fillStyle=b.strokeStyle,b.fill()),b.closePath(),g._saveOPerate(e),k=!1,l=!1,m=!0,i=-1,j=-1;break;case"mouseout":if(o="",n=0,1==f)return;b.closePath()}})},_addOPerateListener:function(a){var e=this;domUtils.on($G("J_previousStep"),"click",function(){d>1&&(d-=1,b.clearRect(0,0,b.canvas.width,b.canvas.height),b.putImageData(c[d-1],0,0),e.btn2Highlight("J_nextStep"),1==d&&e.btn2disable("J_previousStep"))}),domUtils.on($G("J_nextStep"),"click",function(){d>0&&d<c.length&&(b.clearRect(0,0,b.canvas.width,b.canvas.height),b.putImageData(c[d],0,0),d+=1,e.btn2Highlight("J_previousStep"),d==c.length&&e.btn2disable("J_nextStep"))}),domUtils.on($G("J_clearBoard"),"click",function(){b.clearRect(0,0,b.canvas.width,b.canvas.height),c=[],e._saveOPerate(a),d=1,e.isScrawl=!1,e.btn2disable("J_previousStep"),e.btn2disable("J_nextStep"),e.btn2disable("J_clearBoard")})},_addColorBarListener:function(){var a=this;domUtils.on($G("J_colorBar"),"click",function(c){var d=a.getTarget(c),e=d.title;e&&(a._addColorSelect(d),a.brushColor=e,b.globalCompositeOperation="source-over",b.lineWidth=a.brushWidth,b.strokeStyle=e)})},_addBrushBarListener:function(){var a=this;domUtils.on($G("J_brushBar"),"click",function(c){var d=a.getTarget(c),e=browser.ie?d.innerText:d.text;e&&(a._addBESelect(d),b.globalCompositeOperation="source-over",b.lineWidth=parseInt(e),b.strokeStyle=a.brushColor,a.brushWidth=b.lineWidth)})},_addEraserBarListener:function(){var a=this;domUtils.on($G("J_eraserBar"),"click",function(c){var d=a.getTarget(c),e=browser.ie?d.innerText:d.text;e&&(a._addBESelect(d),b.lineWidth=parseInt(e),b.globalCompositeOperation="destination-out",b.strokeStyle="#FFF")})},_addAddImgListener:function(){var a=$G("J_imgTxt");window.FileReader||($G("J_addImg").style.display="none",$G("J_removeImg").style.display="none",$G("J_sacleBoard").style.display="none"),domUtils.on(a,"change",function(b){var c=a.parentNode;addMaskLayer(lang.backgroundUploading);var d=b.target||b.srcElement,e=new FileReader;e.onload=function(a){var b=a.target||a.srcElement;ue_callback(b.result,"SUCCESS")},e.readAsDataURL(d.files[0]),c.reset()})},_addRemoveImgListenter:function(){var a=this;domUtils.on($G("J_removeImg"),"click",function(){$G("J_picBoard").innerHTML="",a.btn2disable("J_removeImg"),a.btn2disable("J_sacleBoard")})},_addScalePicListenter:function(){domUtils.on($G("J_sacleBoard"),"click",function(){var b=$G("J_picBoard"),c=$G("J_scaleCon"),d=b.children[0];if(d)if(c)"visible"==c.style.visibility?(c.style.visibility="hidden",b.style.position="",b.style.zIndex=""):(c.style.visibility="visible",b.style.cssText+="position:relative;z-index:999");else{b.style.cssText="position:relative;z-index:999;"+b.style.cssText,d.style.cssText="position: absolute;top:"+(a.height-d.height)/2+"px;left:"+(a.width-d.width)/2+"px;";var e=new ScaleBoy;b.appendChild(e.init()),e.startScale(d)}})},_addClearSelectionListenter:function(){var a=document;domUtils.on(a,"mousemove",function(b){browser.ie&&browser.version<11?a.selection.clear():window.getSelection().removeAllRanges()})},_clearSelection:function(){for(var a,b=["J_operateBar","J_colorBar","J_brushBar","J_eraserBar","J_picBoard"],c=0;a=b[c++];)domUtils.unSelectable($G(a))},_saveOPerate:function(a){var e=this;c.length<=a?(d<c.length&&(e.btn2disable("J_nextStep"),c.splice(d)),c.push(b.getImageData(0,0,b.canvas.width,b.canvas.height)),d=c.length):(c.shift(),c.push(b.getImageData(0,0,b.canvas.width,b.canvas.height)),d=c.length),e.btn2Highlight("J_previousStep"),e.btn2Highlight("J_clearBoard")},_originalColorSelect:function(a){for(var b,c=$G("J_colorList").getElementsByTagName("td"),d=0;b=c[d++];)b.children[0].title.toLowerCase()==a&&(b.children[0].style.opacity=1)},_originalBrushSelect:function(a){for(var b,c=$G("J_brushBar").children,d=0;b=c[d++];)if("a"==b.tagName.toLowerCase()){var e=browser.ie?b.innerText:b.text;e.toLowerCase()==a&&(b.style.opacity=1)}},_addColorSelect:function(a){for(var b,c=$G("J_colorList").getElementsByTagName("td"),d=$G("J_eraserBar").children,e=$G("J_brushBar").children,f=0;b=c[f++];)b.children[0].style.opacity=.3;for(var g,h=0;g=e[h++];)if("a"==g.tagName.toLowerCase()){g.style.opacity=.3;var i=browser.ie?g.innerText:g.text;i.toLowerCase()==this.brushWidth&&(g.style.opacity=1)}for(var j,k=0;j=d[k++];)"a"==j.tagName.toLowerCase()&&(j.style.opacity=.3);a.style.opacity=1,a.blur()},_addBESelect:function(a){for(var b,c=$G("J_brushBar").children,d=$G("J_eraserBar").children,e=0;b=c[e++];)"a"==b.tagName.toLowerCase()&&(b.style.opacity=.3);for(var f,g=0;f=d[g++];)"a"==f.tagName.toLowerCase()&&(f.style.opacity=.3);a.style.opacity=1,a.blur()},getCanvasData:function(){var c=$G("J_picBoard"),d=c.children[0];if(d){var e,f;"absolute"==d.style.position?(e=parseInt(d.style.left),f=parseInt(d.style.top)):(e=(c.offsetWidth-d.width)/2,f=(c.offsetHeight-d.height)/2),b.globalCompositeOperation="destination-over",b.drawImage(d,e,f,d.width,d.height)}else b.globalCompositeOperation="destination-atop",b.fillStyle="#fff",b.fillRect(0,0,a.width,a.height);try{return a.toDataURL("image/png").substring(22)}catch(g){return""}},btn2Highlight:function(a){var b=$G(a);-1==b.className.indexOf("H")&&(b.className+="H")},btn2disable:function(a){var b=$G(a);-1!=b.className.indexOf("H")&&(b.className=b.className.replace("H",""))},getTarget:function(a){return a.target||a.srcElement}}}();var ScaleBoy=function(){this.dom=null,this.scalingElement=null};!function(){function a(){var a=document,b=a.getElementsByTagName("head")[0],c=a.createElement("style"),d=".scale{visibility:hidden;cursor:move;position:absolute;left:0;top:0;width:100px;height:50px;background-color:#fff;font-size:0;line-height:0;opacity:.4;filter:Alpha(opacity=40);}.scale span{position:absolute;left:0;top:0;width:6px;height:6px;background-color:#006DAE;}.scale .hand0, .scale .hand7{cursor:nw-resize;}.scale .hand1, .scale .hand6{left:50%;margin-left:-3px;cursor:n-resize;}.scale .hand2, .scale .hand4, .scale .hand7{left:100%;margin-left:-6px;}.scale .hand3, .scale .hand4{top:50%;margin-top:-3px;cursor:w-resize;}.scale .hand5, .scale .hand6, .scale .hand7{margin-top:-6px;top:100%;}.scale .hand2, .scale .hand5{cursor:ne-resize;}";c.type="text/css";try{c.appendChild(a.createTextNode(d))}catch(e){c.styleSheet.cssText=d}b.appendChild(c)}function b(){var a=document,b=[],c=a.createElement("div");c.id="J_scaleCon",c.className="scale";for(var d=0;8>d;d++)b.push("<span class='hand"+d+"'></span>");return c.innerHTML=b.join(""),c}var c=[[1,1,-1,-1],[0,1,0,-1],[0,1,1,-1],[1,0,-1,0],[0,0,1,0],[1,0,-1,1],[0,0,0,1],[0,0,1,1]];ScaleBoy.prototype={init:function(){a();var c=this,d=c.dom=b();return c.scaleMousemove.fp=c,domUtils.on(d,"mousedown",function(a){var b=a.target||a.srcElement;c.start={x:a.clientX,y:a.clientY},-1!=b.className.indexOf("hand")&&(c.dir=b.className.replace("hand","")),domUtils.on(document.body,"mousemove",c.scaleMousemove),a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}),domUtils.on(document.body,"mouseup",function(a){c.start&&(domUtils.un(document.body,"mousemove",c.scaleMousemove),c.moved&&c.updateScaledElement({position:{x:d.style.left,y:d.style.top},size:{w:d.style.width,h:d.style.height}}),delete c.start,delete c.moved,delete c.dir)}),d},startScale:function(a){var b=this,c=b.dom;c.style.cssText="visibility:visible;top:"+a.style.top+";left:"+a.style.left+";width:"+a.offsetWidth+"px;height:"+a.offsetHeight+"px;",b.scalingElement=a},updateScaledElement:function(a){var b=this.scalingElement,c=a.position,d=a.size;c&&("undefined"!=typeof c.x&&(b.style.left=c.x),"undefined"!=typeof c.y&&(b.style.top=c.y)),d&&(d.w&&(b.style.width=d.w),d.h&&(b.style.height=d.h))},updateStyleByDir:function(a,b){var d,e=this,f=e.dom;c.def=[1,1,0,0],0!=c[a][0]&&(d=parseInt(f.style.left)+b.x,f.style.left=e._validScaledProp("left",d)+"px"),0!=c[a][1]&&(d=parseInt(f.style.top)+b.y,f.style.top=e._validScaledProp("top",d)+"px"),0!=c[a][2]&&(d=f.clientWidth+c[a][2]*b.x,f.style.width=e._validScaledProp("width",d)+"px"),0!=c[a][3]&&(d=f.clientHeight+c[a][3]*b.y,f.style.height=e._validScaledProp("height",d)+"px"),"def"===a&&e.updateScaledElement({position:{x:f.style.left,y:f.style.top}})},scaleMousemove:function(a){var b=arguments.callee.fp,c=b.start,d=b.dir||"def",e={x:a.clientX-c.x,y:a.clientY-c.y};b.updateStyleByDir(d,e),arguments.callee.fp.start={x:a.clientX,y:a.clientY},arguments.callee.fp.moved=1},_validScaledProp:function(a,b){var c=this.dom,d=$G("J_picBoard");switch(b=isNaN(b)?0:b,a){case"left":return 0>b?0:b+c.clientWidth>d.clientWidth?d.clientWidth-c.clientWidth:b;case"top":return 0>b?0:b+c.clientHeight>d.clientHeight?d.clientHeight-c.clientHeight:b;case"width":return 0>=b?1:b+c.offsetLeft>d.clientWidth?d.clientWidth-c.offsetLeft:b;case"height":return 0>=b?1:b+c.offsetTop>d.clientHeight?d.clientHeight-c.offsetTop:b}}}}();