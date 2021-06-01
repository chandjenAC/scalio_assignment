import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import InstancesAndFlowsTables from "../../components/processBotApp/InstancesAndFlowsTables";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { renderSnackbar } from "../../utils";
import { useSnackbar } from "notistack";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const InstancesAndFlowsContainer = (props) => {
  const { resource } = props;
  const params = useParams();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "PROCESS-BOT", "Process-Bot"),
        path: "/yogi-webb/process-bot",
      },
      {
        title: getResourceValueByKey(resource, "INSTANCES", "Instances"),
        path: `/yogi-webb/process-bot/${params.processId}/instances`,
      },
    ]);
  }, []);

  const getInstancesData = (query, rowData) => {
    return new Promise((resolve, reject) => {
      let filter = [
        {
          fieldName: "derivedFrom.id",
          operator: "eq",
          values: [params.processId],
        },
      ];
      let sort = [
        {
          fieldName: "updateInfo_updatedOn",
          sortOrder: "DESC",
        },
      ];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filter, sort, paging);
      post(env.PROCESS_INSTANCE_META_SEARCH, body).then((result) => {
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

  const getInstanceFlowsData = (query, rowData) => {
    return new Promise((resolve, reject) => {
      let filter = [
        {
          fieldName: "processInstance.id",
          operator: "eq",
          values: [rowData.id],
        },
      ];
      let sort = [
        {
          fieldName: "updateInfo_updatedOn",
          sortOrder: "ASC",
        },
      ];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filter, sort, paging);
      post(env.PROCESS_INSTANCE_FLOW_STATE_SEARCH, body).then((result) => {
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

  const recoverProcessInstance = async (processInstanceId) => {
    let response = await post(env.PROCESS_INSTANCE_RECOVER, {
      processInstanceId: processInstanceId,
    });
    renderSnackbar(enqueueSnackbar, response);
  };

  const getHeader = () => {
    return <AppHeader title={params.processId} />;
  };

  const getMainSection = () => {
    return (
      <InstancesAndFlowsTables
        resource={resource}
        getInstancesData={getInstancesData}
        getInstanceFlowsData={getInstanceFlowsData}
        recoverProcessInstance={recoverProcessInstance}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default InstancesAndFlowsContainer;
