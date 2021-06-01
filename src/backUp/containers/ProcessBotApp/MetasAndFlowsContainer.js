import React, { useContext, useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import MetasAndFlows from "../../components/processBotApp/MetasAndFlows";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const MetasAndFlowsContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "PROCESS-BOT", "Process-Bot"),
        path: "/yogi-webb/process-bot",
      },
    ]);
  }, []);

  const processMetaColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "processName",
      title: getResourceValueByKey(resource, "PROCESS_NAME", "Process Name"),
      dontTruncate: true,
    },

    {
      field: "category",
      title: getResourceValueByKey(resource, "CATEGORY", "Category"),
    },
    {
      field: "updateInfo.updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      type: "datetime",
    },
    {
      field: "updateInfo.updatedBy",
      title: getResourceValueByKey(resource, "UPDATED_BY", "Updated By"),
    },
  ];

  const getProcessMeta = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [];
      let sort = [];
      let paging = { pageSize: query.pageSize, currentPage: query.page };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.PROCESS_META_SEARCH, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  let orderedFlow = [];

  const orderFlow = (flowData) => {
    if (orderedFlow.length === 0) {
      flowData.map((flow) => {
        if (flow.fromStep.stepName === "start") {
          orderedFlow.push(flow);
          orderFlow(flowData);
        }
      });
    } else {
      flowData.map((flow) => {
        if (
          flow.fromStep.stepName ===
          orderedFlow[orderedFlow.length - 1].toStep[0].stepName
        ) {
          orderedFlow.push(flow);
        }
      });
    }
    if (flowData.length === orderedFlow.length) {
      return orderedFlow;
    } else {
      orderFlow(flowData);
    }
  };

  //   const updateEndpointsRow = async (newData) => {
  //     await post(env.SAVE_TOP_FOLDER_REGISTRY, newData);
  //   };

  //   const addEndpointsRow = async (newData) => {
  //     await post(env.SAVE_TOP_FOLDER_REGISTRY, newData);
  //   };

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(
          resource,
          "PROCESS_DETAILS",
          "Process Details"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <MetasAndFlows
        resource={resource}
        processMetaColumns={processMetaColumns}
        getProcessMeta={getProcessMeta}
        //   updateEndpointsRow={updateEndpointsRow}
        //   addEndpointsRow={addEndpointsRow}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default MetasAndFlowsContainer;
