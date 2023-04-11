export default function delay(time = 1000): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
