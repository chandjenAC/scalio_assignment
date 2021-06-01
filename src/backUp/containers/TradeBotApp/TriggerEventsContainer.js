import React, { useState } from "react";
import TriggerEvents from "../../components/tradebotApp/TriggerEvents";
import { post } from "../../utils/callApi";
import { getTriggerEventsPayload } from "../../utils/getPayloads/triggerEvents";
import { env } from "../../ENV";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import format from "date-fns/format";
import eventCodeOptions from "../../meta/eventCodeOptions.json";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const TriggerEventsContainer = (props) => {
  const { resource, lastSelectedNode, tokenType } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [eventDate, setEventDate] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [open, setOpen] = useState(false);

  const getPayload = () => {
    let flags = lastSelectedNode?.flags;
    let tokis;
    let date = format(eventDate, "yyyyMMdd");
    if (
      tokenType === "toki" &&
      (lastSelectedNode?.token || lastSelectedNode?.subtoken)
    ) {
      tokis = [lastSelectedNode.id];
    }
    let body = getTriggerEventsPayload({
      eventDate: date,
      eventCodes: [eventCode],
      tokis: tokis,
    });
    if (flags?.anchor) {
      body = getTriggerEventsPayload({
        eventDate: date,
        eventCodes: [eventCode],
        buyers: [lastSelectedNode?.id],
      });
    }
    return body;
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const trigger = async () => {
    let body = getPayload();
    let response = await post(env.TRIGGER_TOKI_EVENTS, body);
    renderSnackbar(enqueueSnackbar, response);
  };

  const handleChangeDate = (date) => {
    setEventDate(date);
  };

  const handleChangeEventCode = (code) => {
    setEventCode(code);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleDialogOK = (e) => {
    if (eventDate !== "") {
      trigger();
    }
    handleClose(e);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "CANCEL", "Cancel"),
      handler: handleClose,
    },
    {
      text: getResourceValueByKey(resource, "TRIGGER", "Trigger"),
      handler: handleDialogOK,
      disable: eventDate === "" ? true : false,
    },
  ];

  return (
    <TriggerEvents
      resource={resource}
      open={open}
      eventDate={eventDate}
      handleButtonClick={handleButtonClick}
      handleChangeDate={handleChangeDate}
      handleChangeEventCode={handleChangeEventCode}
      eventCodeOptions={eventCodeOptions}
      handleClose={handleClose}
      dialogActions={dialogActions}
    />
  );
};

export default TriggerEventsContainer;
