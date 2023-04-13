let pollingTime, currentHash, location;
function checkUpdate() {
  fetch(location + '?time=' + new Date().getTime(), {
    method: 'GET',
  })
    .then((response) => response.text())
    .then((result) => {
      const hash = getCurrentHash(htmlTransform(result));
      if (hash !== currentHash) {
        postMessage('update');
      }
    })
    .catch((error) => console.log('error', error));
}

// 监听消息\n' +
onmessage = function (e) {
  pollingTime = e.data.pollingTime;
  location = e.data.location;
  currentHash = e.data.currentHash;
  setInterval(() => {
    checkUpdate();
  }, pollingTime * 1000);
};

function getCurrentHash(htmlObj) {
  for (const child of htmlObj.children) {
    // 如果当前子节点的 src 属性等于 'script'，返回该节点
    if (child?.nodeName === 'script' && child?.src) {
      return child.src;
    }
    // 递归查找子节点
    const result = getCurrentHash(child);
    if (result !== null) {
      return result;
    }
  }
  return null;
}

let sign_enum = {
  SIGN_END: 'SIGN_END',
  SIGN_END_OK: 'SIGN_EN_OK',
  SIGN_START: 'SIGN_START',
  SIGN_START_OK: 'SIGN_START_OK',
};
function htmlTransform(htmlStr) {
  const str = htmlStr.replace(/\n/g, '');
  let result = { nodeName: 'root', children: [] };
  let use_line = [0];
  let current_index = 0; // 记录当前插入children的下标
  let node = result; // 当前操作的节点
  let sign = ''; // 标记标签字符串（可能包含属性字符）、文本信息
  let status = ''; // 当前状态，为空的时候我们认为是在读取当前节点（node）的文本信息
  for (var i = 0; i < str.length; i++) {
    var current = str.charAt(i);
    var next = str.charAt(i + 1);
    if (current === '<') {
      // 在开始标签完成后记录文本信息到当前节点
      if (sign && status === sign_enum.SIGN_START_OK) {
        node.text = sign;
        sign = '';
      }
      // 根据“</”来区分是 结束标签的（</xxx>）读取中  还是开始的标签(<xxx>) 读取中
      if (next === '/') {
        status = sign_enum.SIGN_END;
      } else {
        status = sign_enum.SIGN_START;
      }
    } else if (current === '>') {
      // (<xxx>) 读取中，遇到“>”， (<xxx>) 读取中完成
      if (status === sign_enum.SIGN_START) {
        // 记录当前node所在的位置，并更改node
        node = result;
        use_line.map((_, index) => {
          if (!node.children) node.children = [];
          if (index === use_line.length - 1) {
            sign = sign.replace(/^\s*/g, '').replace(/\"/g, '');
            let mark = sign.match(/^[a-zA-Z0-9]*\s*/)[0].replace(/\s/g, ''); // 记录标签
            // 标签上定义的属性获取
            let attributeStr = sign.replace(mark, '').replace(/\s+/g, ',').split(',');
            let attrbuteObj = {};
            let style = {};
            attributeStr.map((attr) => {
              if (attr) {
                let value = attr.split('=')[1];
                let key = attr.split('=')[0];
                if (key === 'style') {
                  value.split(';').map((s) => {
                    if (s) {
                      style[s.split(':')[0]] = s.split(':')[1];
                    }
                  });
                  return (attrbuteObj[key] = style);
                }
                attrbuteObj[key] = value;
              }
            });
            node.children.push({ nodeName: mark, children: [], ...attrbuteObj });
          }
          current_index = node.children.length - 1;
          node = node.children[current_index];
        });
        use_line.push(current_index);
        sign = '';
        status = sign_enum.SIGN_START_OK;
      }
      // (</xxx>) 读取中，遇到“>”， (</xxx>) 读取中完成
      if (status === sign_enum.SIGN_END) {
        use_line.pop();
        node = result;
        // 重新寻找操作的node
        use_line.map((i) => {
          node = node?.children?.[i];
        });
        sign = '';
        status = sign_enum.SIGN_END_OK;
      }
    } else {
      sign = sign + current;
    }
  }
  return result;
}
