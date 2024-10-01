export const inputSearch = (input) => {
  return {
    type: "INPUT_SEARCH",
    inputData: input,
  };
};

export const tagSearch = (language) => {
  return {
    type: "TAG_SEARCH",
    language: language,
  };
};
