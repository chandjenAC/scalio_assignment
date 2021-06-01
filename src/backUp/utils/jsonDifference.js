import { JsonDiffer } from "json-difference";
import cloneDeep from "lodash/cloneDeep";

export const jsonDifference = (originalValues, newlyEditedCopy) => {
  let compareDimensionRes = cloneDeep(originalValues);
  const jsondifference = new JsonDiffer();

  let diff = jsondifference.getDiff(originalValues, newlyEditedCopy);

  let editedItems = diff.edited;
  let newItems = diff.new;
  let removedItems = diff.removed;

  // Object.keys(newItems).map((key) => {
  //   let res = key.split("/");

  //   //updating lineItems
  //   let fieldName = res.splice(res.length - 1, 1);
  //   let objField = compareDimensionRes;

  //   objField = res.reduce(
  //     (r, u) => (r && r[u] ? r[u] : ""),
  //     compareDimensionRes
  //   );
  //   if (res[res.length - 1] !== "columns" && res[0] !== "changeSummary") {
  //     if (objField !== "") {
  //       objField[fieldName] = {
  //         addedAttr: true,
  //         oldvalue: "",
  //         newvalue: newItems[key],
  //       };
  //     } else {
  //       objField = res.reduce(
  //         (r, u) => (r && r[u] ? r[u] : r),
  //         compareDimensionRes
  //       );
  //       let tempObj = {};
  //       tempObj[fieldName] = {
  //         addedAttr: true,
  //         oldvalue: "",
  //         newvalue: "New Row",
  //       };
  //       objField.push(tempObj);
  //     }
  //   }
  // });

  const function0 = (key) => {
    let res = key.split("/");

    //updating lineItems
    let fieldName = res.splice(res.length - 1, 1);
    let objField;

    objField = res.reduce(
      (r, u) => (r && r[u] ? r[u] : ""),
      compareDimensionRes
    );
    if (res[res.length - 1] !== "columns" && res[0] !== "uiMeta") {
      if (objField !== "") {
        objField[fieldName] = { oldvalue: removedItems[key], newvalue: "" };
      } else {
        objField = res.reduce(
          (r, u) => (r && r[u] ? r[u] : r),
          compareDimensionRes
        );
        let tempObj = {};
        tempObj[fieldName] = {
          addedAttr: true,
          oldvalue: "",
          newvalue: "Test Removed Value",
        };
        objField.push(tempObj);
      }
    }
  };

  Object.keys(removedItems).map((key) => {
    return function0(key);
  });

  const function1 = (item, key) => {
    let res = key.split("/");
    let objField;
    let fieldName = res.splice(res.length - 1, 1); // incase of columns fieldname is the columnIndex
    objField = res.reduce(
      (r, u) => (r && r[u] ? r[u] : ""),
      compareDimensionRes
    );
    if (res[res.length - 1] !== "columns") {
      objField[fieldName] = item[key];
    }
  };

  editedItems.map((item, index) => {
    Object.keys(item).map((key) => {
      return function1(item, key);
    });
  });

  const function2 = (key) => {
    let res = key.split("/");
    let fieldName = res.splice(res.length - 1, 1);
    let objField = compareDimensionRes;
    for (let i = 0; i < res.length; i++) {
      if (objField[res[i]]) {
        objField = objField[res[i]];
      } else {
        if (fieldName[0] === "keyword") {
          let temp = { addedAttr: true, oldvalue: "", newvalue: newItems[key] };
          objField.push({ keyword: temp });
        } else {
          let temp = [
            { addedAttr: true, oldvalue: "", newvalue: newItems[key] },
          ];
          objField[res[res.length - 1]] = temp;
        }
      }
    }
  };

  Object.keys(newItems).map((key) => {
    return function2(key);
  });

  return compareDimensionRes;
};
