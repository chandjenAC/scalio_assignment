//checks if any of the keyword ="" and if so, then empty it's corresponding value
export const isKeywordDeleted = (editedKeyList) => {
  editedKeyList.map((keyList) => {
    if (keyList.keyword === "") {
      return keyList.values === [""];
    }
    keyList.subList.length > 0 &&
      keyList.subList.map((sublist) => {
        if (sublist.keyword === "") {
          return (sublist.values = [""]);
        }
      });
  });

  return editedKeyList;
};
