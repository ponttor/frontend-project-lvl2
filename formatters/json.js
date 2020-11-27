/* eslint-disable no-console */

const jsonFormat = (data) => {
  const result = data.reduce((acc, obj) => ({
    ...acc,
    [obj.action]: {
      key: obj.key,
      oldValue: obj.value1,
      newValue: obj.value2,
      children: obj.children,
    },
  }), {});

  return JSON.stringify(result);
};

export default jsonFormat;
