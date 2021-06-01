import React, { useState, useEffect, useContext } from "react";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { post, del } from "../../utils/callApi";
import { env } from "../../ENV";
import DocDefParent from "../../components/endpointsApp/DocDefParent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const DocDefContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const folderName = location.state?.folderName;
  const endPoint = params.endPoint;
  const folderId = params.folderId;

  const [docDef, setDocDef] = useState([]);
  const [loading, setLoading] = useState(true);

  let def = cloneDeep(docDef[0]);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
      {
        title: getResourceValueByKey(resource, "DEFINITIONS", "Definitions"),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/dayt/${folderId}`,
      },
    ]);
    const getDocDefinitions = async () => {
      let sort = [];
      let paging = {};
      let filters = [
        {
          fieldName: "sourceFolderId",
          operator: "eq",
          values: [folderId],
        },
      ];
      setLoading(true);
      let body = getFilterSortPaginate(filters, sort, paging);
      let docDef = await post(env.DOCUMENT_DEFINITIONS, body);
      setDocDef(docDef?.data);
      setLoading(false);
    };
    getDocDefinitions();
  }, [folderId]);

  const handleRemoteSegmentsData = (query) => {
    return new Promise((resolve, reject) => {
      let filter = [
        {
          fieldName: "document.id",
          operator: "eq",
          values: [docDef[0].id],
        },
      ];
      let sort = [];
      let paging = {};
      let body = getFilterSortPaginate(filter, sort, paging);
      post(env.DOCUMENT_SEGMENTS, body).then((result) => {
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

  const handleRemoteFieldsData = (query, rowData) => {
    return new Promise((resolve, reject) => {
      let filter = [
        {
          fieldName: "document.id",
          operator: "eq",
          values: [docDef[0].id],
        },
        {
          fieldName: "segmentId",
          operator: "eq",
          values: rowData.id,
        },
      ];
      let sort = [];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filter, sort, paging);
      post(env.DOCUMENT_FIELDS, body).then((result) => {
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

  const handleViewGraphClick = () => {
    const formatId = docDef[0].id;
    const formatName = docDef[0].name;
    navigate(`${formatId}`, {
      state: { goBack: true, formatName: formatName },
    });
  };

  const handleViewEntityDefsClick = () => {
    navigate(`entity-defs`, {
      state: { goBack: true, folderName: folderName },
    });
  };

  const updateDocDef = async () => {
    await post(env.SAVE_DOCUMENT_DEFINITIONS, def);
    setDocDef([def]);
  };

  const updateDocSegsRow = async (newData) => {
    await post(env.SAVE_DOCUMENT_SEGMENTS, newData);
  };

  const addDocFieldsRow = async (newData, segmentRowData) => {
    newData.document = docDef[0];
    newData.segmentId = segmentRowData.id;
    await post(env.SAVE_DOCUMENT_FIELDS, newData);
  };

  const updateDocFieldsRow = async (newData) => {
    await post(env.SAVE_DOCUMENT_FIELDS, newData);
  };

  const deleteDocFieldsRow = async (oldData) => {
    await del(`${env.SAVE_DOCUMENT_FIELDS}/${oldData.id}`);
  };

  const getHeader = () => {
    return (
      <AppHeader title={getResourceValueByKey(resource, "DAYT", "DAYT")} />
    );
  };

  const getMainSection = () => {
    return (
      <DocDefParent
        resource={resource}
        loading={loading}
        docDef={docDef}
        docDefRef={def}
        handleRemoteSegmentsData={handleRemoteSegmentsData}
        handleRemoteFieldsData={handleRemoteFieldsData}
        updateDocDef={updateDocDef}
        updateDocSegsRow={updateDocSegsRow}
        addDocFieldsRow={addDocFieldsRow}
        updateDocFieldsRow={updateDocFieldsRow}
        deleteDocFieldsRow={deleteDocFieldsRow}
        handleViewGraphClick={handleViewGraphClick}
        handleViewEntityDefsClick={handleViewEntityDefsClick}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default DocDefContainer;
