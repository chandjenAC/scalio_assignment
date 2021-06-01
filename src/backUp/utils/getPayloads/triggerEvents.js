export const getTriggerEventsPayload = ({
  eventDate,
  eventCodes,
  buyers,
  suppliers,
  tokis,
}) => {
  return {
    eventDate: eventDate,
    eventCodes: eventCodes,
    buyers: buyers,
    suppliers: suppliers,
    tokis: tokis,
  };
};
