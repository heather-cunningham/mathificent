const getRandomInteger = (low, high)=>{
  return Math.floor(Math.random() * (high - low + 1) + low);
};

export { getRandomInteger };