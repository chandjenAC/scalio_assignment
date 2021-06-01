export const getErrorNode = (errorText) => {
  return [
    {
      id: "error",
      displayName: errorText,
      nodeType: "error",
      x: -30,
      y: 500,
    },
  ];
};
