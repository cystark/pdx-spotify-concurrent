const delay = (time) => (promiseResult) =>
  new Promise<any>((resolve) => setTimeout(() => resolve(promiseResult), time));

export default delay;
