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
