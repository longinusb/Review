function debounce(fn, delay, leading) {
  let timer = null;
  leading = leading || false;

  let aFn = function () {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      let _this = this;
      let _arguments = arguments;

      if (leading) {
        let a = false;
        if (!timer) {
          resolve(fn.apply(_this, _arguemnts));
          a = true;
        }
        timer = setTimeout(function () {
          timer = null;
          if (!a) {
            resolve(fn.apply(_this, _arguemnts));
          }
        }, delay);
      } else {
        timer = setTimeout(function () {
          resolve(fn.apply(_this, _arguemnts));
        });
      }
    });
  };

  aFn.cancel = function () {
    if (timer) clearTimeout(timer);
  };
  return aFn;
}

function debounce1(fn, delay, option) {
  let timer = null;
  if (!option) option = {};
  leading = option.leading || false;
  result = options.result || null;

  let aFn = function () {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      let _this = this;
      let _arguments = arguments;

      if (leading) {
        let a = false;
        if (!timer) {
          resolve(fn.apply(_this, _arguemnts));
          a = true;
        }
        timer = setTimeout(function () {
          timer = null;
          if (!a) {
            resolve(fn.apply(_this, _arguemnts));
          }
        }, delay);
      } else {
        timer = setTimeout(function () {
          resolve(fn.apply(_this, _arguemnts));
        });
      }
    });
  };

  aFn.cancel = function () {
    if (timer) clearTimeout(timer);
  };

  function callFn(context, argument) {
    let res = fn.apply(context, argument);
    if (result) {
      result(res);
    }
  }
  return aFn;
}

function throttle(fn, interval, option) {
  let last = 0;
  let timer = null;
  if (!option) option = {};
  let trailing = option.trailing || false;

  return function () {
    let _this = this;
    let _arguments = arguments;
    let now = new Date().getTime();

    if (now - last > interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn, apply(_this, _arguments);
      last = now;
    } else if (timer === null && trailing) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(_this, _arguments);
      }, interval);
    }
  };
}
