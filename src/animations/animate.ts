function animate(from: number, to: number): void;
function animate(from: number, to: number, callBack?: (val: number) => void): void;
function animate(from: number, to: number, callBack?: (val: number) => void, duration?: number): void;

/**
 *
 * @param from 开始的值
 * @param to 结束的值
 * @param duration 动画执行时间
 * @param callBack 回调函数
 */
function animate(from: number, to: number, callBack?: (val: number) => void, duration?: number) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    callBack(from + (to - from) * timeFraction);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export { animate };
