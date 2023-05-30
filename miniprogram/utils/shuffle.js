export default function shuffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let idx = Math.floor(Math.random() * (len - i));
    let temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}
