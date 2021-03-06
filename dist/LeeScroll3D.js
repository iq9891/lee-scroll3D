﻿/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 15-10-16
 * Time: 9:21AM
 * 滚动对象
 */
function LeeScroll(json){

	var _s = this,
		json = json || {},
		sObj = $(json.obj||'#scroll3D'),
		sAddUl = sObj.find(json.addObj||'#lsUl1,#lsUl2'),
		lsHand = sObj.find(json.scrollBox||'.lsHand');

	_s.$ul = $(sAddUl);
	_s.$div = $(lsHand);
	
	//滑动结束之后触发
	_s.endFn = null;
	//滑动进行中触发
	_s.ingFn = null;

	_s.iLeft = json.iLeft || 0;
	

	//生成个数
	_s.createNum = json.createNum||12;
	

	_s.iStartDeg = json.iStartDeg||120;
	_s.iDeg = _s.iStartDeg; //旋转起始角度

	//创建的内容
	_s.createHtml = json.createHtml||[];

	//滑动中不断动态创建
	_s.bCreateAdd = (_s.createNum>12?json.bCreateAdd:false)||false;

	_s.bIndex = json.bIndex||false;
	
	//超过12个的时候滚动的内容
	_s.iIndexIngUp = 1;
	_s.iIndexIngDown = 1;
	_s.iAddNumMid = 6;
	
	//初始化
	_s._init();

		
};

var p = {
	iOldY: 0,
	iNewY: 0,
	oSpeedY: 0,
	iAddNumMid: 11,	//当bCreateAdd=true时，不断改变里面内容的起始数
	r: 80, //半径
	iDegPer: 30,	//每个li的倾斜的度数
	iIndex: 1, //滚动停止的索引，就能知道是谁选中了
	iOldIndex: 1, //滚动停止的索引，就能知道是谁选中了（上一个）
	oTim: null,
	bTop: true,
	_init: function(){
		var _s = this;

		_s._createLiFn(_s.$ul.eq(0), _s.createNum);
		_s._createLiFn(_s.$ul.eq(1), _s.createNum);

		_s.$li = _s.$ul.eq(0).find('li');
		_s.$li2 = _s.$ul.eq(1).find('li');
		
		_s._setLiFn();
		
		_s.$div.on({
			'touchstart': function(e){
				_s._moveStart(e);
			} 
		});

	},
	_setLiFn: function(){//li布局
		var _s = this;
		
		_s.$li.each(function(i,e){

			var y = _s.r*Math.cos(i*_s.iDegPer*Math.PI/180)+_s.$div.height()-112,
				z = _s.r*Math.sin(i*_s.iDegPer*Math.PI/180);

			y = y.toFixed(2);
			z = z.toFixed(2);

			$(e).css({
				'-webkit-transform': 'translate3d('+_s.iLeft+'px, '+ y +'px, '+ z +'px) rotateX('+(-90+i*_s.iDegPer)+'deg)'
			});
			_s.$li2.eq(i).css({
				'-webkit-transform': 'translate3d('+_s.iLeft+'px, '+ y +'px, '+ z +'px) rotateX('+(-90+i*_s.iDegPer)+'deg)'
			});

		});
	},
	/*
	 * 创建li
	 * obj object 添加的父级
	 * num number 创建li的个数
	*/
	_createLiFn: function(obj, num){
		var _s = this,
			sHtml = '',
			i = 0,
			iStart = num||12,
			iLen = /*num>12?iStart:*/12,
			iMid = Math.ceil(iStart/2);
		
		if(_s.bCreateAdd){
			for (i=iStart; i>0; i--) {
				if(i<iStart-5&&i>6){
				}else{
					if(i==iStart){
						sHtml += '<li>00</li>';
					}else{
						sHtml += '<li>'+ (i<10?'0'+i:i) +'</li>';
					}
				}
			}
		}else{
			for (i=iLen; i>0; i--) {
				if(i>iStart){
					sHtml += '<li></li>';
				}else{
					if(_s.createHtml.length){
						sHtml += '<li>'+ _s.createHtml[i-1] +'</li>';
					}else{
						sHtml += '<li>'+ (i) +'</li>';
					}
				}
			}
		}
		obj.append(sHtml);
	},
	_moveStart: function (e){
		var _s = this;
		_s.oSpeedY = 0;
		clearInterval(_s.oTim);
		_s.iOldY = e.targetTouches[0].clientY;
		_s.iIndexIngDown = _s.$li2.eq(_s.iAddNumMid-1).html();
		_s.iIndexIngUp = _s.$li2.eq(_s.iAddNumMid).html();
		$(document).on({
			'touchmove': function(e){
				_s._moveIng(e);
			},
			'touchend': function(){
				_s._moveEnd();
			}
		});
	},
	_moveIng: function (e){
		var oMy = e.targetTouches[0],
			_s = this;

		_s.iIndex = Math.round(_s.iDeg/_s.iDegPer-3); //滚动的索引
		
		if(oMy.clientY>_s.iOldY){//下
			_s._downAddFn();
			if(_s.createNum<12){
				if(_s.iIndex>1){
					_s.$ul.css({
						'-webkit-transform': 'rotateX('+(--_s.iDeg)+'deg)'
					});
					return;
				}
			}
			_s.$ul.css({
				'-webkit-transform': 'rotateX('+(--_s.iDeg)+'deg)'
			});
			_s.bTop = false;
		}else{//上
			_s._upAddFn();
			if(_s.createNum<12){
				if(_s.iIndex<_s.createNum){
					_s.$ul.css({
						'-webkit-transform': 'rotateX('+(++_s.iDeg)+'deg)'
					});
					return;
				}
			}
			_s.$ul.css({
				'-webkit-transform': 'rotateX('+(++_s.iDeg)+'deg)'
			});
			_s.bTop = true;
		}
		
		if(_s.ingFn){
			_s.ingFn(_s.iIndex%_s.createNum,_s.iIndex);
		} 
		_s.oSpeedY = Math.abs(oMy.clientY - _s.iOldY)/10;
		
		_s.iOldY = oMy.clientY;
	},
	_moveEnd: function(){
		$(document).off();
		var _s = this;
		if(_s.createNum<12){
			_s.iIndex = Math.round(_s.iDeg/_s.iDegPer-3);
			
			if(_s.iIndex>_s.createNum){
				_s.iIndex = _s.createNum;
			}else if(_s.iIndex<1){
				_s.iIndex = 1;
			}
			
			_s._gotoEndFn();

		}else{
			_s._bufferFn();
		}
	},
	_bufferFn: function (){//移动完的滚动缓停
		
		var _s = this;
		
		clearInterval(_s.oTim);
		
		_s.oTim = setInterval(function(){
			_s.oSpeedY *= 0.98;
			
			_s.iDeg = _s.iDeg+(_s.bTop?1:-1)*_s.oSpeedY;
			_s.$ul.css({
				'-webkit-transform': 'rotateX('+_s.iDeg+'deg)'
			});
			_s.iIndex = Math.round(_s.iDeg/_s.iDegPer-3);
			
			if(!_s.bTop){//下
				_s._downAddFn();
			}else{//上
				_s._upAddFn();
			}
			if(_s.ingFn){
				_s.ingFn(_s.iIndex%_s.createNum,_s.iIndex);
			} 
			if(_s.oSpeedY<1){
				clearInterval(_s.oTim);
				
				_s._gotoEndFn();

				_s.iOldY = 0;
				_s.oSpeedY = 0;
			}

		}, 30);

	},
	_downAddFn: function(){//向下改变内容
		var _s = this;
		if(_s.bCreateAdd&& _s.iOldIndex != _s.iIndex){
			if(_s.iIndexIngDown == 0){
				_s.iIndexIngDown = _s.createNum-1;
			}else{
				_s.iIndexIngDown--;
			}
			_s.iIndexIngDown = _s.iIndexIngDown<10?'0'+_s.iIndexIngDown:_s.iIndexIngDown;
			_s.$li.eq(_s.iAddNumMid).html(_s.iIndexIngDown);
			_s.$li2.eq(_s.iAddNumMid).html(_s.iIndexIngDown);
			_s.iOldIndex = _s.iIndex;
			if(_s.iAddNumMid==12 - 1){
				_s.iAddNumMid = 0;
			}else{
				_s.iAddNumMid++;
			}
		}
	},
	_upAddFn:function(){//向上改变内容
		var _s = this;

		if(_s.bCreateAdd&& _s.iOldIndex != _s.iIndex){
			if(_s.iIndexIngUp == _s.createNum-1){
				_s.iIndexIngUp = 0;
			}else{
				_s.iIndexIngUp++;
			}
			_s.iIndexIngUp = _s.iIndexIngUp<10?'0'+_s.iIndexIngUp:_s.iIndexIngUp;
			_s.$li.eq(_s.iAddNumMid-1).html(_s.iIndexIngUp);
			_s.$li2.eq(_s.iAddNumMid-1).html(_s.iIndexIngUp);
			_s.iOldIndex = _s.iIndex;
			if(_s.iAddNumMid==0){
				_s.iAddNumMid = 12 - 1;
			}else{
				_s.iAddNumMid--;
			}
		}
	},
	_gotoEndFn: function (){//结束时候统一调用
		var _s = this;
		_s.iDeg = (_s.iIndex-1)*_s.iDegPer+_s.iStartDeg;
		_s.$ul.css({
			'-webkit-transform': 'rotateX('+_s.iDeg+'deg)'
		}).addClass('anim').on('webkitTransitionEnd', function(){
			_s.$ul.off().removeClass('anim');
			if(_s.endFn){
				_s.endFn(_s.iIndex>0?_s.iIndex%12:_s.iIndex%12+12);
			} 
		});
	},
	scrollEndFn: function(fn){
		var _s = this;
		_s.endFn = fn;
	},
	scrollIngFn: function(fn){
		var _s = this;
		_s.ingFn = fn;
	},
	scrollToEleFn: function(num){
		var _s = this,
			num = num || 0;
		_s.iIndex = num;
		_s._gotoEndFn();
	}
};
for(var k in p)LeeScroll.prototype[k] = p[k];