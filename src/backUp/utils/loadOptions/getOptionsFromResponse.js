export const getTokenOptionsFromResponse = (response) => {
  let options = response.map((item) => ({
    label: item.name || "",
    value: item.id,
  }));
  return options;
};

export const getBillingClientOptionsFromResponse = (response) => {
  let options = response.map((item) => ({
    label: item.customerName || "No Name",
    value: item.customerTopId,
  }));
  return options;
};

export const getBillingStatementOptionsFromResponse = (response) => {
  let options = response.map((item) => ({
    label: item.id,
    value: item.id,
    statementId: item.id,
    customerName:
      item.customerName || item.billingDetails.contactDetails.emailId || "",
    customerTopId: item.customerTopId,
    invoiceNumber: item.invoiceNumber || "",
    statementAmount: Number(item.invoiceAmount_value).toFixed(2),
    statementDueDate: item.dueDate,
    statementCcy: item.invoiceAmount_ccy,
  }));
  return options;
};

export const getCountryCodeOptionsFromResponse = (response) => {
  let options = response.map((item) => ({
    label: item.countryCode || "",
    value: item.countryCode,
  }));
  return options;
};

export const getIndustryTypeOptionsFromResponse = (response) => {
  let options = response.map((item) => ({
    label: item.name || "No Name",
    value: item.name,
  }));
  return options;
};
