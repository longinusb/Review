<template>
  <div class="content">
    <div class="view">
      <p>
        本文介绍了四种清除浮动的方法，并尝试解释其原理。在理解了各种清除浮动的原理之后，你会发现，很多清除浮动的方法本质上其实是一样的。掌握这些原理，相信你可以根据场景和需求，灵活运用原则发展出不同的清除浮动的方法，而不再死记或拘泥于文中提到的方法。
        一、为什么要清除浮动
        在讲清除浮动的方法之前，我们先来了解一下为什么要清除浮动，清除浮动的目的是什么，即，要解决什么样的问题。来看一个浮动的例子(略去了文字内容)：
        复制代码其样式为： .topDiv { width: 500px; border: 2px solid black; }
        .floatDiv { width: 100px; height: 100px; border: 2px dotted red; color:
        red; margin: 4px; float: left; } .bottomDiv { width: 500px; height:
        100px; margin: 5px 0; border: 2px dotted black; } .textDiv { color:
        blue; border: 2px solid blue; }复制代码在chrome中渲染的效果如下图所示：
        浮动效果 这肯定不是我们想要的渲染效果，它可能存在如下问题：
        文字围绕浮动元素排版，但我们可能希望文字（.textDiv）排列在浮动元素下方，或者，我们并不希望.textDiv两边有浮动元素存在。
        浮动元素排版超出了其父级元素（.topDiv），父元素的高度出现了塌缩，若没有文字高度的支撑，不考虑边框，父级元素高度会塌缩成零。
        浮动元素甚至影响到了其父元素的兄弟元素（.bottomDiv）排版。因为浮动元素脱离了文档流，.bottomDiv在计算元素位置的时候会忽略其影响，紧接着上一个元素的位置继续排列。
        解决第一个问题，需要清除.textDiv周围的浮动，而解决第二个问题，因为父元素的兄弟元素位置只受父元素位置的影响，就需要一种方法将父级元素的高度撑起来，将浮动元素包裹在其中，避免浮动元素影响父元素外部的元素排列。
        接下来开始介绍清除浮动的方法。 二、清除浮动的方法 1. 利用clear样式
        还是开篇的例子，我们给需要清除浮动的元素添加如下样式： .textDiv { color:
        blue; border: 2px solid blue; clear: left;
        }复制代码清除浮动后的渲染效果如下： 解释一下：
        通过上面的样式，.textDiv告诉浏览器，我的左边不允许有浮动的元素存在，请清除掉我左边的浮动元素。然而，因为浮动元素（.floatDiv）位置已经确定，浏览器在计算.textDiv的位置时，为满足其需求，将.textDiv渲染在浮动元素下方，保证了.textDiv左边没有浮动元素。同时可以看出，父元素的高度也被撑起来了，其兄弟元素的渲染也不再受到浮动的影响，这是因为.textDiv仍然在文档流中，它必须在父元素的边界内，父元素只有增加其高度才能达到此目的，可以说是一个意外收获。(clear的值为both也有相同的效果，通俗理解就是，哪边不允许有浮动元素，clear就是对应方向的值，两边都不允许就是both)
        但是，如果我们把HTML中的.floatDiv和.textDiv交换一下位置呢？
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content {
  /* flex: 1 1 auto; */
  width: 100%;
  position: relative;
  overflow: scroll;
  height: 590px;
  background-color: #f5f5f5;
}
.content .view {
  position: relative;
}
.content .view p {
  margin: 2px;
}
</style>
