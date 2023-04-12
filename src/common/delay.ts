/**
 *
 * @param time 时间
 * @returns
 */
export function delay(time = 1000): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
