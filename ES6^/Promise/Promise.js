function Promise1(executor) {
  this.state = "pending";
  this.value = undefined;
  this.reason = undefined;

  //立即执行
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }

  //状态凝固
  let _this = this;

  //保存成功回调
  let onResolvedCallbacks = [];

  //保存失败回调
  let onRejectedCallbacks = [];

  function resolve(value) {
    if (_this.state === "pending") {
      _this.value = value;
      _this.onResolvedCallbacks.forEach((cb) => cb(value));
      _this.state = "resolved";
    }
  }

  function reject(reason) {
    if (_this.state === "pending") {
      _this.reason = reason;
      _this.onRejectedCallbacks.forEach((cb) => cb(reason));
      _this.state = "rejected";
    }
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  //判断回调参数不为函数时变成回调函数返回普通值
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw err;
        };

  //回调执行
  let p2 = new Promise((resolve, reject) => {
    if (this.state === "pending") {
      this.onResolvedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }

    if (this.state === "resolved") {
      setTimeout(() => {
        try {
          //拿到返回值resolve出去
          let x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.state === "rejected") {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.reason);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
  });
  return p2;
};

function resolvePromise(p2, x, resolve, reject) {
  //避免循环引用
  if (p2 === x) {
    reject(new TypeError("请避免Promise循环引用"));
  }

  let called;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            //递归调用，传入y若是promise对象，继续循环
            resolvePromise(p2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
      //Promise对象使用Object.defineProperty()在取值时抛错，防止代码出现bug
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// promises-aplus-tests测试
Promise.defer = Promise.deferred = function () {
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};
try {
  module.exports = Promise;
} catch (e) {}
