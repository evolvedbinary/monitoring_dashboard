export function DUMMY_SERVER(callback: (callbackIndex: number, v: number[]) => void, interval = 1, min = [0], max = [100], delta = [5]) {
  let lastValues = min.map((value, index) => Math.random() * (max[index] - min[index]) + min[index]);
  let counter = 0;
  const intervalId = setInterval(() => {
    lastValues = lastValues.map((value, index) => {
      value = value + (Math.random() * 2 - 1) * delta[index];
      if (value < min[index]) {
        value = min[index];
      }
      if (value > max[index]) {
        value = max[index];
      }
      return value;
    });
    callback(++counter, [...lastValues]);
  }, interval * 1000);
  return () => clearInterval(intervalId);
}