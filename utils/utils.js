// color
export const getColor = () => {
  const colors = ["#ff3838", "#fff200", "#7158e2", "#0652DD", "#3ae374"];

  return colors[Math.floor(Math.random() * colors.length)];
};

// uuid
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};
