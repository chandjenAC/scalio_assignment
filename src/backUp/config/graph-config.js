import * as React from "react";
import {
  nodeShapes,
  getNetworkShape,
  getStarfleetShape,
  getStarbaseShape,
  getTokiShape,
  getFINsubTokiShape,
  getAPDsubTokiShape,
  getPODsubTokiShape,
  getAvatarShape,
  getAvatarComplianceInfoMetShape,
  getPolicyCriteriaDetailShape,
  SpecialChildShape,
  NodeWithCount,
  EmptyEdgeShape,
  SpecialEdgeShape,
  SpecialShape,
  SkinnyShape,
  PolyShape,
} from "./nodeShapes";

export const NODE_KEY = "id"; // Key used to identify nodes
export const NODE_WITH_COUNT = "nodeWithCount"; // Empty node type
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

// export const CUSTOM_EMPTY_TYPE = "customEmpty"; // Empty node type
export const POLY_TYPE = "poly";
export const SPECIAL_TYPE = "special";
export const SKINNY_TYPE = "skinny";
export const SPECIAL_CHILD_SUBTYPE = "specialChild";
export const nodeTypes = [
  NODE_WITH_COUNT,
  // CUSTOM_EMPTY_TYPE,
  POLY_TYPE,
  SPECIAL_TYPE,
  SKINNY_TYPE,
];

export const nodeSubTypes = [SPECIAL_CHILD_SUBTYPE];

const getNodeTypes = () => {
  let types = {};
  nodeShapes.map((nodeShape) => {
    types[nodeShape.id] = {
      shape: (
        <symbol
          viewBox="0 0 475 475"
          id={nodeShape.id}
          width="100%"
          height="40px"
        >
          <svg width="100%" height="100%">
            <path
              d={nodeShape.svgPath}
              fill={nodeShape.color}
              data-intersect-ignore="true"
            ></path>
          </svg>
        </symbol>
      ),
      shapeId: `#${nodeShape.id}`,
    };
  });
  types["networks"] = {
    shape: getNetworkShape(false),
    shapeId: "#networks",
  };
  types["networks-selected"] = {
    shape: getNetworkShape(true),
    shapeId: "#networks-selected",
  };
  types["starfleets"] = {
    shape: getStarfleetShape(false),
    shapeId: "#starfleets",
  };
  types["starfleets-selected"] = {
    shape: getStarfleetShape(true),
    shapeId: "#starfleets-selected",
  };
  types["starbases"] = {
    shape: getStarbaseShape(false),
    shapeId: "#starbases",
  };
  types["starbases-selected"] = {
    shape: getStarbaseShape(true),
    shapeId: "#starbases-selected",
  };
  types["avatar"] = {
    shape: getAvatarShape(false),
    shapeId: "#avatar",
  };
  types["avatar-selected"] = {
    shape: getAvatarShape(true),
    shapeId: "#avatar-selected",
  };
  types["toki"] = {
    shape: getTokiShape(false),
    shapeId: "#toki",
  };
  types["toki-selected"] = {
    shape: getTokiShape(true),
    shapeId: "#toki-selected",
  };
  types["policy-criteria-detail"] = {
    shape: getPolicyCriteriaDetailShape(false),
    shapeId: "#policy-criteria-detail",
  };
  types["policy-criteria-detail-selected"] = {
    shape: getPolicyCriteriaDetailShape(true),
    shapeId: "#policy-criteria-detail-selected",
  };
  types["early-payment-seda-sub-toki"] = {
    shape: getFINsubTokiShape(false, "early-payment-seda-sub-toki"),
    shapeId: "#early-payment-seda-sub-toki",
  };
  types["early-payment-seda-sub-toki-selected"] = {
    shape: getFINsubTokiShape(true, "early-payment-seda-sub-toki"),
    shapeId: "#early-payment-seda-sub-toki-selected",
  };
  types["early-payment-sub-toki"] = {
    shape: getFINsubTokiShape(false, "early-payment-sub-toki"),
    shapeId: "#early-payment-sub-toki",
  };
  types["early-payment-sub-toki-selected"] = {
    shape: getFINsubTokiShape(true, "early-payment-sub-toki"),
    shapeId: "#early-payment-sub-toki-selected",
  };
  types["digital-draft-sub-toki"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki"),
    shapeId: "#digital-draft-sub-toki",
  };
  types["digital-draft-sub-toki-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki"),
    shapeId: "#digital-draft-sub-toki-selected",
  };
  types["digital-draft-sub-toki-cancelled"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki", {
      cancelled: true,
    }),
    shapeId: "#digital-draft-sub-toki-cancelled",
  };
  types["digital-draft-sub-toki-cancelled-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki", {
      cancelled: true,
    }),
    shapeId: "#digital-draft-sub-toki-cancelled-selected",
  };
  types["digital-draft-sub-toki-discounted"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki", {
      discounted: true,
    }),
    shapeId: "#digital-draft-sub-toki-discounted",
  };
  types["digital-draft-sub-toki-discounted-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki", {
      discounted: true,
    }),
    shapeId: "#digital-draft-sub-toki-discounted-selected",
  };

  types["digital-draft-sub-toki-discountInProgress"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki", {
      discountInProgress: true,
    }),
    shapeId: "#digital-draft-sub-toki-discountInProgress",
  };
  types["digital-draft-sub-toki-discountInProgress-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki", {
      discountInProgress: true,
    }),
    shapeId: "#digital-draft-sub-toki-discountInProgress-selected",
  };

  types["digital-draft-sub-toki-transferred"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki", {
      transferred: true,
    }),
    shapeId: "#digital-draft-sub-toki-transferred",
  };
  types["digital-draft-sub-toki-transferred-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki", {
      transferred: true,
    }),
    shapeId: "#digital-draft-sub-toki-transferred-selected",
  };

  types["digital-draft-sub-toki-transferInProgress"] = {
    shape: getAPDsubTokiShape(false, "digital-draft-sub-toki", {
      transferInProgress: true,
    }),
    shapeId: "#digital-draft-sub-toki-transferInProgress",
  };
  types["digital-draft-sub-toki-transferInProgress-selected"] = {
    shape: getAPDsubTokiShape(true, "digital-draft-sub-toki", {
      transferInProgress: true,
    }),
    shapeId: "#digital-draft-sub-toki-transferInProgress-selected",
  };

  types["reserve-draft-sub-toki"] = {
    shape: getAPDsubTokiShape(false, "reserve-draft-sub-toki"),
    shapeId: "#reserve-draft-sub-toki",
  };
  types["reserve-draft-sub-toki-selected"] = {
    shape: getAPDsubTokiShape(true, "reserve-draft-sub-toki"),
    shapeId: "#reserve-draft-sub-toki-selected",
  };
  types["pod-sub-toki"] = {
    shape: getPODsubTokiShape(false, "pod-sub-toki"),
    shapeId: "#pod-sub-toki",
  };
  types["pod-sub-toki-selected"] = {
    shape: getPODsubTokiShape(true, "pod-sub-toki"),
    shapeId: "#pod-sub-toki-selected",
  };
  types["avatar-compliance-info-met"] = {
    shape: getAvatarComplianceInfoMetShape(false),
    shapeId: "#avatar-compliance-info-met",
  };
  types["avatar-compliance-info-met-selected"] = {
    shape: getAvatarComplianceInfoMetShape(true),
    shapeId: "#avatar-compliance-info-met-selected",
  };

  return types;
};

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge",
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: "#specialEdge",
    },
  },
  NodeSubtypes: {
    specialChild: {
      shape: SpecialChildShape,
      shapeId: "#specialChild",
    },
  },
  NodeTypes: {
    nodeWithCount: {
      shape: NodeWithCount,
      shapeId: "#nodeWithCount",
      typeText: "None",
    },
    // customEmpty: {
    //   shape: CustomEmptyShape,
    //   shapeId: "#customEmpty",
    //   typeText: "None",
    // },
    special: {
      shape: SpecialShape,
      shapeId: "#special",
      typeText: "Special",
    },
    skinny: {
      shape: SkinnyShape,
      shapeId: "#skinny",
      typeText: "Skinny",
    },
    poly: {
      shape: PolyShape,
      shapeId: "#poly",
      typeText: "Poly",
    },
    ...getNodeTypes(),
  },
};
