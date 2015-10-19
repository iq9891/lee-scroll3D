# LeeScroll3D.js #

## 配置参数 ##
1. obj: object 空间的div，默认'#scroll3D'
2. addObj: object 创建li的父级，默认'#lsUl1,#lsUl2'
3. scrollBox: object 手碰到的对象才能滚动
4. createNum: number 生成内容的个数，默认是12
5. iStartDeg: number 起始角度，默认是120
6. iLeft: number 距离左边的距离，默认是0
7. createHtml: array 内容改变，默认是数字
8. bCreateAdd: Boolean 默认是false。如果是true那么不断会添加新的元素，前提是必须9. createNum大于12

## 对外方法 ##
1. 滑动中触发事件，scrollIngFn(回调方法)
2. 滑动结束触发事件，scrollEndFn(回调方法)
3. 滚动到第num个元素处，scrollToEleFn(num)

## 配置参数实例 ##
<pre>no1 = new LeeScroll({addObj:'#ul,#ul2',scrollBox:'.div'});
no1.scrollEndFn(function(iNow){console.log(iNow);});
no1.scrollIngFn(function(iNow){console.log(iNow);})
no1.scrollToEleFn(1);</pre>

## 使用方法 ##

1. 引用zepto和LeeScroll3D(路径需自行修改)
<pre><code>&lt;script src="zepto.min.js"&gt;&lt;/script&gt;
&lt;script src="touch.js"&gt;&lt;/script&gt;
&lt;script src="fx.js"&gt;&lt;/script&gt;
&lt;script src="LeeScroll3D.min.js"&gt;&lt;/script&gt;</code></pre>
2. 在body中写入
<pre><code>&lt;div id="scroll3D" class="scroll3D"&gt;
		&lt;div class="div lsHand"&gt;
			&lt;div class="divScroll"&gt;
				&lt;ul id="lsUl1" class="ul"&gt;&lt;/ul&gt;
			&lt;/div&gt;
		&lt;/div&gt;
		&lt;div class="div div2 lsHand"&gt;
			&lt;div class="divScroll"&gt;
				&lt;ul id="lsUl2" class="ul ul2"&gt;&lt;/ul&gt;
			&lt;/div&gt;
		&lt;/div&gt;
&lt;/div&gt;</code></pre>
3. css代码
<pre>.scroll3D {width:300px;margin:100px auto 0;position:relative;}
.div {width:100%;height:200px;
perspective: 1000px;border:1px solid red;position:relative;
overflow:hidden;
}
.div .divScroll {width:100%;height:200px;
-webkit-transform:rotateY(0deg) rotateX(0deg) rotateZ(0deg);
transform-style:preserve-3d; -webkit-transform-style:preserve-3d;
background:#fff;}
.ul {width:100%;height:100%;
transform-style:preserve-3d; -webkit-transform-style:preserve-3d;
-webkit-transform-origin:center center;transform-origin:center center;
background:-rgba(255,0,0,0.1);-webkit-transform: rotateX(120deg);}
.ul li {font-size:20px;position:absolute;
width:54px;height:22px;text-align:center;color:#aaa;}
.anim {-webkit-transition: transform 0.5s;}</pre>
4. js 
<pre>new LeeScroll();</pre>

## demo预览 ##

pc预览直接点击，然后谷歌模拟手机预览。手机预览直接扫二维码即可预览。

1. [demo1]( http://iq9891.github.io/lee-scroll3D/demo1.html )
[![demo1](codeDemo1.png)]( http://iq9891.github.io/lee-scroll3D/demo1.html )

2. [demo2]( http://iq9891.github.io/lee-scroll3D/demo2.html )
[![demo2](codeDemo2.png)]( http://iq9891.github.io/lee-scroll3D/demo2.html )

3. [demo3]( http://iq9891.github.io/lee-scroll3D/demo3.html )
[![demo3](codeDemo3.png)]( http://iq9891.github.io/lee-scroll3D/demo3.html )

4. [demo4]( http://iq9891.github.io/lee-scroll3D/demo4.html )
[![demo4](codeDemo4.png)]( http://iq9891.github.io/lee-scroll3D/demo4.html )
