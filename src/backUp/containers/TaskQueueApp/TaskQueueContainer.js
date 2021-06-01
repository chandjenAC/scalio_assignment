import React, { useContext, useEffect } from "react";
import WorkInProgress from "../../components/WorkInProgress";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const TaskQueueContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "TASK-QUEUE", "Task-Queue"),
        path: "/yogi-webb/task-queue",
      },
    ]);
  }, []);
  return <WorkInProgress />;
};

export default TaskQueueContainer;
