export const getInitiateCINonboardingBody = (country, regNo) => {
  let body = {
    starfleetId: "Tallyx",
    starbaseId: "T-MR",
    businessDetails: {
      country: country,
      registrationNumber: regNo,
    },
    ownerTopId: "b7a1f89d-37f5-4b04-bc74-21fbe29b42f1",
    txnId: "KYB_TEST_13",
    policyId: "FUNDER_DRIVEN_AVATAR_ONBOARDING_POLICY",
  };
  return body;
};

export const getInitiateCNameOnboardingBody = (cName, name, email) => {
  let body = {
    starfleetId: "Tallyx",
    starbaseId: "T-MR",
    businessDetails: {
      country: "IN",
      name: cName,
      primaryContact: {
        name: name,
        emailId: email,
      },
    },
    ownerTopId: "TALLYX_NETWORK_OPERATOR_ID",
    policyId: "TALLYX_AVATAR_ONBOARDING_POLICY",
  };
  return body;
};

export const getOnboardBody = (regNo, CIN) => {
  let body = {
    context: {
      sponsorId: "CTP",
      starfleetId: "CTPDemo",
      starbaseId: "T-MR",
      avatarId: "CTP",
      deviceID: "",
    },
    payload: {
      id: "95bfbda8-0883-4e72-93b8-ab3d3c1fe32d",
      type: "avatar",
      policyId: "policy1",
      policyName: "Policy 1",
      country: "IN",
      registrationNumber: regNo,
      CIN: CIN,
      avataarReference_dateOfSetup: "05-03-2020",
      postalAddress_streetName:
        "Prahlad Bhavan, Narada Street, Bhuloka - 577401",
    },
  };
  return body;
};
