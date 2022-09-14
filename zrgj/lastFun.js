export function getTreeData(list) {
  const result = [];
  const remap = list.reduce((pre, cur) => {
    //###第一步：将数组转换成键值对的形式(键是id值，值是对象)
    pre[cur.id] = cur;
    return pre;
  }, {});
  //###第二步，循环遍历数组，判断是不是(树状结构最外层，祖宗层数据)第一层的数据(本处就是parent_id等不等于0)
  for (let item of list) {
    //用普通的for循环也行，但是用for in 不行,只能获取数组的元素下标,或者对象的键
    if (item.parentId === null) {
      result.push(item);
      continue;
    }
    // console.log(remap[item.parent_id]); //注意 obj[key] 就代表是对象的值value
    if (item.parentId in remap) {
      //换成else也可，目的将不是第一层的数据(parent_id不等于0)挑出来，并赋予一个children属性
      const parent = remap[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return result;
}

export function bfs(tree) {
  var queue = [],
    result = false;
  queue.unshift(tree);
  while (queue.length != 0) {
    var item = queue.shift();
    if (item.editable === true) {
      result = true;
      break;
    }
    var children = item.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }
  return result;
}

export function getTreedata1(arr) {
  const resultarr = [];
  const temp = arr.reduce((pre, cur) => {
    pre[cur.businessNo] = cur;
    return pre;
  }, {});
  console.log(temp);

  arr.forEach((item) => {
    let parent = temp[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      resultarr.push(item);
    }
  });

  return resultarr;
}
