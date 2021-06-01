import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import LabelAndValue from "../../components/common/LabelAndValue";
import LabelWithEditableValue from "../../components/common/molecules/LabelWithEditableValue";
// import { getSaveTokenPolicyBody } from "../../utils/getPayloads/tokenPayloads";
// import { getSaveTokenPolicyCriteriaBody } from "../../utils/getPayloads/tokenPayloads";
import policyUiMeta from "../../meta/policyUiMeta.json";
import policyCriteriaUiMeta from "../../meta/policyCriteriaUiMeta.json";
import faasLookUp from "../../meta/faasLookUp.json";
import cloneDeep from "lodash/cloneDeep";

const panelTitles = {
  policy: "Policy",
  policyCriteria: "Policy Criteria",
};

const PolicyInfoParentContainer = (props) => {
  const {
    policies,
    policyCriterias,
    nodeDescriptions,
    lastSelectedNode,
  } = props;
  const [edit, setEdit] = useState(false);

  let policiesRef = cloneDeep(policies);
  let policyCriteriasRef = cloneDeep(policyCriterias);
  let updateValueRef; //contains reference array[can be policies or policyCriterias], reference indices[to point to the location which is being edited] and a flag to determine whether the edited value is in a policy or policyCriteria
  let meta;

  const renderTitle = () => {
    if (lastSelectedNode.policy) {
      return panelTitles.policy;
    } else if (lastSelectedNode.criteria) {
      return panelTitles.policyCriteria;
    }
  };

  const renderAttributes = (node) => {
    if (lastSelectedNode.policy) {
      meta = policyUiMeta;
    } else if (lastSelectedNode.criteria) {
      meta = policyCriteriaUiMeta;
    }
    return meta.uiMeta.whitelistAttr.map((attrMeta, index) => {
      let key = attrMeta.name;
      return (
        !Array.isArray(node[key]) && (
          <LabelAndValue
            key={index}
            label={key}
            value={node[key]}
            padding="4px"
            labelPadding="2px 0px"
          />
        )
      );
    });
  };

  const renderNodeAttributes = () => {
    let node = !lastSelectedNode.root
      ? nodeDescriptions[lastSelectedNode.id]
      : null;
    return renderAttributes(node);
  };

  const getUpdateValueRef = (selectedNode) => {
    let refIndices = [];
    let flag = { policy: false, criteria: false, detail: false };

    let refObj;

    if (selectedNode.policy) {
      policiesRef.map((policy) => {
        if (policy.id === selectedNode.id) {
          refObj = policy;
          flag.policy = true;
        }
      });
    } else if (selectedNode.criteria) {
      policyCriteriasRef.length > 0 &&
        policyCriteriasRef.map((criteria) => {
          if (criteria.id === selectedNode.criteriaId) {
            refObj = criteria;
            flag.criteria = true;
          }
        });
    }
    return {
      refObj: refObj,
      refIndices: refIndices,
      flag: flag,
    };
  };

  const filterOptions = (inputValue) => {
    return faasLookUp.data.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  const editAttributes = (node, updateValueRef) => {
    if (updateValueRef.flag.policy) {
      meta = policyUiMeta;
    } else if (updateValueRef.flag.criteria) {
      meta = policyCriteriaUiMeta;
    }
    return meta.uiMeta.whitelistAttr.map((attrMeta, index) => {
      let key = attrMeta.name;
      return (
        !Array.isArray(node[key]) && (
          <LabelWithEditableValue
            key={index}
            label={key}
            value={node[key]}
            meta={attrMeta}
            updateValueRef={updateValueRef}
            loadOptions={loadOptions}
            padding="4px"
            labelPadding="2px 0px"
            inputWidth={"400px"}
          />
        )
      );
    });
  };

  const editNodeAttributes = () => {
    let node = !lastSelectedNode.root
      ? nodeDescriptions[lastSelectedNode.id]
      : null;
    updateValueRef = getUpdateValueRef(lastSelectedNode);

    return editAttributes(node, updateValueRef);
  };

  const updateAttributes = async () => {
    if (updateValueRef.flag.policy) {
      // let body = getSaveTokenPolicyBody(updateValueRef.refObj);
      //   await post(env.TOKEN_POLICY_SAVE, body);
    } else if (updateValueRef.flag.criteria) {
      // let body = getSaveTokenPolicyCriteriaBody(updateValueRef.refObj);
      //   await post(env.TOKEN_POLICY_CRITERIA_SAVE, body);
    }
  };

  return (
    !lastSelectedNode.root && (
      <div style={{ width: "100%", position: "relative", height: "100%" }}>
        <div style={{ position: "absolute", top: "6px", right: "10px" }}>
          <Button
            background={edit ? "#fc1428" : "#2574fb"}
            onClick={() => setEdit(!edit)}
          >
            {!edit ? "Edit" : "Undo"}
          </Button>
          {edit && (
            <Button background={"#09b300"} onClick={() => updateAttributes()}>
              Update
            </Button>
          )}
        </div>
        <Typography variant="subtitle1">{renderTitle()}</Typography>
        {edit ? editNodeAttributes() : renderNodeAttributes()}
      </div>
    )
  );
};

export default PolicyInfoParentContainer;
