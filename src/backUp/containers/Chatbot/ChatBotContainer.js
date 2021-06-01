import React from "react";
import ChatBot from "react-simple-chatbot";
import UploadDocument from "../../components/chatbot/UploadDocument";
import tallyxAvatar from "../../images/Yogi_bot_inverted.png";
import ChatbotHeader from "../../components/chatbot/ChatbotHeader";
import AuthoriseCIN from "../../components/chatbot/AuthoriseCIN";
import AuthoriseCorporateName from "../../components/chatbot/AuthoriseCorporateName";
import SearchCorporateName from "../../components/chatbot/SearchCorporateName";
import SearchCIN from "../../components/chatbot/SearchCIN";
import InitiateOnBoarding from "../../components/chatbot/InitiateOnBoarding";
import OnBoard from "../../components/chatbot/OnBoard";
import { ReactComponent as Logo } from "../../images/Yogi_bot.svg";
import { ThemeProvider } from "styled-components";
import GetTOPMetrics from "../../components/chatbot/GetTOPMetrics";
import SearchAvatar from "../../components/chatbot/SearchAvatar";
import SelectAvatarFromGraph from "../../components/chatbot/SelectAvatarFromGraph";
import resource from "../../resources/chatbot.json";

const theme = {
  background: "#ffffff",
  fontFamily: "Lato",
  headerBgColor: "#ffffff",
  headerFontColor: "#fff",
  headerFontSize: "14px",
  botBubbleColor: "#f8f8f8",
  botFontColor: "#000000",
  userBubbleColor: "#d0e1ff",
  userFontColor: "#00000",
};

const ChatBotContainer = (props) => {
  const {
    renderNodesFromResponse,
    setParentNodeState,
    reloadGraphNodes,
    // mainSelect,
    verifyKYB,
    uploadKYB,
    confirmFileUploadAndTriggerNext,
    verifyDirectorId,
    getManualReview,
    getAvatar,
    findLastStep,
    onFileUpload,
    clearState,
    resetHooks,
    setOpenBot,
    opened,
    onSubmitSearch,
    getTopMetrics,
  } = props;

  // useEffect(() => {
  //   //once token reponse is received, storing the required meta data for doc upload in local storage
  //   if (props.data && props.data.data && props.data.data.faces) {
  //     let docMeta = {
  //       avatarId: props.data.data.id,
  //       docId: {
  //         corpLogo: "93e46376-0958-440f-a1ed-d6c0b0e9kdgd",
  //         agreement: "93e46376-0958-440f-a1ed-d6c0b0e9jtyu",
  //         userProfilePic: "93e46376-0958-440f-a1ed-d6c0b0effbnm",
  //       },
  //       docRef: {
  //         corpLogo: `${props.data.data.name}_LOGO`,
  //         agreement: `${props.data.data.dimensions["avatar-user"] &&
  //           props.data.data.dimensions["avatar-user"][0].fullname}_AGREEMENT`,
  //         userProfilePic: `${props.data.data.dimensions["avatar-user"] &&
  //           props.data.data.dimensions["avatar-user"][0]
  //             .fullname}_USER_PROFILE_PIC`,
  //       },
  //       category: {
  //         corpLogo: "AVATAR_IMAGES",
  //         agreement: "AVATAR_AGREEMENT_DOCS",
  //         userProfilePic: "USER_PROFILE_IMAGES",
  //       },
  //     };
  //     localStorage.setItem("docMeta", JSON.stringify(docMeta));
  //   }
  // }, [props.data]);

  // const docmeta = {
  //   docId:
  //     docRef === "corpLogo"
  //       ? docMeta.docId.corpLogo
  //       : docRef === "agreement"
  //       ? docMeta.docId.agreement
  //       : docMeta.docId.userProfilePic,
  //   docReference:
  //     docRef === "corpLogo"
  //       ? docMeta.docRef.corpLogo
  //       : docRef === "agreement"
  //       ? docMeta.docRef.agreement
  //       : docMeta.docRef.userProfilePic,
  //   docName: file.name,
  //   docType: file.type,
  //   docSize: file.size,
  //   starfleet:  "CTP-Demo",
  //   avatarid: docMeta.avatarId,
  //   userid: "email",
  //   linkedTxnId: docMeta.avatarId,
  //   linkedTxnType: "avatar",
  //   category:
  //     docRef === "corpLogo"
  //       ? docMeta.category.corpLogo
  //       : docRef === "agreement"
  //       ? docMeta.category.agreement
  //       : docMeta.category.userProfilePic,
  //   event: "DOCUMENT_MGMT_SERVICE.ATTACH_TOKEN_DOCUMENT",
  // };

  //fn to open and close chatBot
  const toggleFloating = () => {
    setOpenBot(!opened);
  };

  // functions related to manage policy from user main select starts from here
  const managePolicySelect = (value) => {
    // this if condition will be changed to switch case as the remaining option flow is created.
    if (value === "T-OB Supplier OnBoarding") {
      return "TOBmanagePolicy";
    }
    return "end";
  };

  const TOBmodifySelect = (value) => {
    // if condition will be changed to switch case as the remaining options flow is created
    if (value === "Add a New Gateway") {
      return "addGateway";
    }
    return "end";
  };

  const selectComplianceStep = (value) => {
    if (value === "a") {
      return "availableGateways";
    }
    return "end";
  };

  const gatewaySelect = (value) => {
    if (value === "a") {
      return "Brex";
    }
  };
  // end of functions related to manage policy from user main select starts from here

  const avatarRevelation = (value) => {
    if (value === "showAvatarDetails") {
      window.open("/avatarHome");
    } else {
      setParentNodeState("showComplianceSteps", { id: "avatar" });
    }
  };

  const handleEnd = () => {
    // props.history.push("/");
    setTimeout(() => {
      // setViewBotPage(false);
      clearState();
      resetHooks();
    }, 3000);
  };

  const steps = [
    {
      id: "greeting",
      message: "Welcome! Can you tell me exactly what you are looking for ?",
      trigger: "mainSelect",
    },
    {
      id: "mainSelect",
      placeholder: "Please select from the options",
      hideInput: true,
      options: [
        // {
        //   value: "View and Manage an OnBoarding Policy",
        //   label: "View and Manage an OnBoarding Policy",
        //   trigger: ({ value }) => {
        //     return mainSelect(value);
        //   },
        // },
        // {
        //   value: "OnBoard a Corporate",
        //   label: "OnBoard a Corporate",
        //   trigger: ({ value }) => {
        //     return mainSelect(value);
        //   },
        // },
        // {
        //   value: "Search for a Corporate",
        //   label: "Search for a Corporate",
        //   trigger: ({ value }) => {
        //     return mainSelect(value);
        //   },
        // },
        {
          value: "Show Top Metrics",
          label: "Show TOP Metrics",
          trigger: "TOPMetrics",
        },
        {
          value: "Manage Documents",
          label: "Manage Documents",
          trigger: "manageDocuments",
        },
        {
          value: "Attach Logo",
          label: "Attach Logo",
          trigger: "enterAvatarName",
        },
      ],
    },

    {
      id: "enterAvatarName",
      message: "Please enter Avatar name",
      placeholder: "Enter Avatar name",
      trigger: "enterAvatarNameResponse",
    },
    {
      id: "enterAvatarNameResponse",
      user: true,
      placeholder: "Enter Avatar name",
      trigger: "searchAvatarName",
    },
    {
      id: "searchAvatarName",
      placeholder: "Searching Avatar..",
      asMessage: true,
      component: (
        <SearchAvatar resource={resource} onSubmitSearch={onSubmitSearch} />
      ),
      waitAction: true,
    },
    {
      id: "selectAvatarFromGraph",
      placeholder: "Please select your Avatar from Graph",
      asMessage: true,
      component: <SelectAvatarFromGraph resource={resource} />,
      waitAction: true,
      replace: true,
      delay: 0,
    },

    {
      id: "attachLogo",
      message: "Please upload logo",
      placeholder: "Upload logo",
      trigger: "attachLogoResponse",
    },
    {
      id: "attachLogoResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          docRef={"logo"}
          onSuccessTrigger={"attachLogoSuccess"}
          onErrorTrigger={"attachLogoFailed"}
        />
      ),
      waitAction: true,
    },
    {
      id: "attachLogoSuccess",
      message: "Logo uploaded successfully!",
      placeholder: "Success!",
      trigger: "greeting2",
    },
    {
      id: "attachLogoFailed",
      message: "Something went wrong! Failed to upload logo.",
      placeholder: "Failed!",
      trigger: "greeting2",
    },
    {
      id: "manageDocuments",
      message: "Great! What would you like to do ?",
      placeholder: "Please select from the options",
      trigger: "manageDocumentsResponse",
    },
    {
      id: "manageDocumentsResponse",
      hideInput: true,
      options: [
        {
          value: "Upload Document",
          label: "Upload Document",
          trigger: "uploadDocument",
        },
        {
          value: "Search Document",
          label: "Search Document",
          trigger: "searchDocument",
        },
      ],
    },
    {
      id: "searchDocument",
      message: "Sorry! This feature will be enabled in the near future.",
      placeholder: "Upload file",
      trigger: "greeting2",
    },
    {
      id: "uploadDocument",
      message: "Please upload document",
      placeholder: "Upload file",
      trigger: "uploadDocumentResponse",
    },
    {
      id: "uploadDocumentResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          docRef={"agreement"}
          onSuccessTrigger={"uploadDocumentSuccess"}
          onErrorTrigger={"uploadDocumentFailed"}
        />
      ),
      waitAction: true,
    },
    {
      id: "uploadDocumentSuccess",
      message: "Document uploaded successfully!",
      placeholder: "Success!",
      trigger: "moreDocuments?",
    },
    {
      id: "uploadDocumentFailed",
      message: "Failed to upload document!",
      placeholder: "Failed!",
      trigger: "moreDocuments?",
    },
    {
      id: "moreDocuments?",
      message: "Have you got more documents to upload?",
      placeholder: "Please select from the options.",
      trigger: "moreDocumentsResponseFromAttachKYB",
    },
    {
      id: "moreDocumentsResponseFromAttachKYB",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "uploadDocument",
        },
        {
          value: "no",
          label: "No",
          trigger: "greeting2",
        },
      ],
    },

    {
      id: "haveCIN",
      message: "Great! Do you have Corporate Identification Number(CIN) ?",
      placeholder: "Please select from the options",
      trigger: "haveCINResponse",
    },
    {
      id: "haveCINResponse",
      hideInput: true,
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "enterCIN",
        },
        {
          value: "no",
          label: "No",
          trigger: "enterCorporateName",
        },
      ],
    },

    {
      id: "enterCorporateName",
      message: "No worries. Please enter your Corporate name",
      placeholder: "Enter Corporate name",
      trigger: "enterCorporateNameResponse",
    },
    {
      id: "enterCorporateNameResponse",
      user: true,
      placeholder: "Enter Corporate name",
      trigger: "authoriseCorporateName",
    },
    {
      id: "authoriseCorporateName",
      placeholder: "Verifying details..",
      asMessage: true,
      component: <AuthoriseCorporateName resource={resource} />,
      waitAction: true,
    },
    {
      id: "searchCorporateName",
      placeholder: "Searching if you are OnBoarded..",
      asMessage: true,
      component: (
        <SearchCorporateName
          resource={resource}
          renderNodesFromResponse={renderNodesFromResponse}
        />
      ),
      waitAction: true,
    },
    {
      id: "searchCorporateNameFailedinitiateOnBoarding",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "enterCorporateCountry",
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "enterCorporateCountry",
      message: "Please enter your Country",
      placeholder: "Enter your Country",
      trigger: "enterCorporateCountryResponse",
    },
    {
      id: "enterCorporateCountryResponse",
      user: true,
      placeholder: "Enter your Country",
      trigger: "enterPrimaryContactName",
    },
    {
      id: "enterPrimaryContactName",
      message: "Please enter Primary contact name",
      placeholder: "Enter Primary contact name",
      trigger: "enterPrimaryContactNameResponse",
    },
    {
      id: "enterPrimaryContactNameResponse",
      user: true,
      placeholder: "Enter Primary contact name",
      trigger: "enterCorporateEmail",
    },
    {
      id: "enterCorporateEmail",
      message: "Please enter your Corporate email",
      placeholder: "Enter Corporate email",
      trigger: "enterCorporateEmailResponse",
    },
    {
      id: "enterCorporateEmailResponse",
      user: true,
      placeholder: "Enter Corporate email",
      trigger: "initiatingOnBoarding",
    },
    {
      id: "searchCINFailedinitiateOnBoarding",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "initiatingOnBoarding",
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "initiatingOnBoarding",
      placeholder: "Initiating OnBoarding..",
      asMessage: true,
      component: <InitiateOnBoarding resource={resource} />,
      waitAction: true,
    },
    {
      id: "startDocumentAttach",
      message: "How would you prefer to proceed ? ",
      placeholder: "Please select from the options",
      trigger: "startDocumentAttachResponse",
    },
    {
      id: "startDocumentAttachResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "attachDocs",
          label: "Attach Documents",
          trigger: "attachAgreement",
        },
        {
          value: "startNewChat",
          label: "Start a new chat",
          trigger: "greeting2",
        },
        {
          value: "endSession",
          label: "End chat session",
          trigger: "end",
        },
      ],
    },
    {
      id: "attachAgreement",
      message: "Please upload Agreement document",
      placeholder: "Upload file",
      trigger: "attachAgreementResponse",
    },
    {
      id: "attachAgreementResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          docRef={"agreement"}
          onSuccessTrigger={"attachAgreementSuccess"}
          onErrorTrigger={"attachAgreementFailed"}
        />
      ),
      waitAction: true,
    },
    {
      id: "attachAgreementSuccess",
      message: "Agreement uploaded successfully!",
      placeholder: "Success!",
      trigger: "attachUserProfilePic",
    },
    {
      id: "attachAgreementFailed",
      message: "Failed to upload agreement!",
      placeholder: "Failed!",
      trigger: "attachUserProfilePic",
    },
    {
      id: "attachUserProfilePic",
      message: "Please upload User profile picture",
      placeholder: "Upload file",
      trigger: "attachUserProfilePicResponse",
    },
    {
      id: "attachUserProfilePicResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          docRef={"userProfilePic"}
          onSuccessTrigger={"attachUserProfilePicSuccess"}
          onErrorTrigger={"attachUserProfilePicFailed"}
        />
      ),
      waitAction: true,
    },
    {
      id: "attachUserProfilePicSuccess",
      message: "User profile picture uploaded successfully!",
      placeholder: "Success!",
      trigger: "attachCompanyLogo",
    },
    {
      id: "attachUserProfilePicFailed",
      message: "Failed to upload profile pic!",
      placeholder: "Failed!",
      trigger: "attachCompanyLogo",
    },
    {
      id: "attachCompanyLogo",
      message: "Please upload your Corporate logo",
      placeholder: "Upload file",
      trigger: "attachCompanyLogoResponse",
    },
    {
      id: "attachCompanyLogoResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          docRef={"corpLogo"}
          onSuccessTrigger={"attachCompanyLogoSuccess"}
          onErrorTrigger={"attachCompanyLogoFailed"}
        />
      ),
      waitAction: true,
    },
    {
      id: "attachCompanyLogoSuccess",
      message: "Corporate logo uploaded successfully!",
      placeholder: "Success!",
      trigger: "greeting3",
    },
    {
      id: "attachCompanyLogoFailed",
      message: "Failed to upload Corporate Logo!",
      placeholder: "Failed!",
      trigger: "greeting3",
    },
    // {
    //   id: "enterCorporateAddress",
    //   message: "Please enter Corporate address",
    //   placeholder: "Please enter Corporate address",
    //   trigger: "enterCorporateAddressResponse"
    // },
    // {
    //   id: "enterCorporateAddressResponse",
    //   user: true,
    //   placeholder: "Please enter Corporate address",
    //   trigger: "corporateAddressAuth"
    // },
    // {
    //   id: "corporateAddressAuth",
    //   placeholder: "Verifying details..",
    //   asMessage: true,
    //   component: (
    //     <AuthoriseCorporateAddress setParentNodeState={setParentNodeState} />
    //   ),
    //   waitAction: true
    // },
    // {
    //   id: "corporateAddressAuthResponse",
    //   options: [
    //     {
    //       value: "yes",
    //       label: "Yes",
    //       trigger: "enterCorporateUsername"
    //     },
    //     {
    //       value: "no",
    //       label: "No",
    //       trigger: "end"
    //     }
    //   ]
    // },
    {
      id: "enterCIN",
      message: "Please enter Corporate Identification Number",
      placeholder: "Enter CIN",
      trigger: "enterCINResponse",
    },
    {
      id: "enterCINResponse",
      user: true,
      placeholder: "Enter CIN",
      trigger: "userAuth",
    },
    {
      id: "userAuth",
      placeholder: "Verifying..",
      asMessage: true,
      component: <AuthoriseCIN resource={resource} />,
      waitAction: true,
    },
    {
      id: "searchCIN",
      placeholder: "Searching if you are OnBoarded..",
      asMessage: true,
      component: (
        <SearchCIN
          resource={resource}
          renderNodesFromResponse={renderNodesFromResponse}
        />
      ),
      waitAction: true,
    },
    {
      id: "invalidCompanyNameAndAddress",
      message: "You have entered an invalid Corporate name and address",
      trigger: "greeting2",
    },
    {
      id: "greeting2",
      message: "Is there anything else I can help you with today ?",
      trigger: ({ value }) => {
        reloadGraphNodes();
        return "mainSelect";
      },
    },
    {
      id: "greeting3",
      message: "How would you prefer to proceed ?",
      trigger: "greeting3Response",
    },
    {
      id: "greeting3Response",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Start a new chat",
          trigger: "greeting2",
        },
        {
          value: "no",
          label: "End chat session",
          trigger: "end",
        },
      ],
    },
    {
      id: "onBoard",
      placeholder: "OnBoarding..",
      asMessage: true,
      component: <OnBoard resource={resource} />,
      waitAction: true,
    },
    {
      id: "continueOnBoarding",
      message:
        "You have already initiated OnBoarding but not completed. Would you like to complete OnBoarding?",
      delay: 3500,
      placeholder: "verifying your ID..please wait",
      trigger: "continueOnBoardingResponse",
    },
    {
      id: "continueOnBoardingResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: ({ value }) => {
            return findLastStep(); // find last step completed and make the next step status waitingUser
          },
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "revelation",
      delay: 3000,
      placeholder: "Please select from the options",
      message: "What would you like to do?",
      trigger: "revelationResponse",
    },
    {
      id: "revelationResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "showAvatarDetails",
          label: "Show Avatar Details",
          trigger: ({ value }) => {
            return avatarRevelation(value);
          },
        },
        {
          value: "showComplianceSteps",
          label: "Show Compliance steps",
          trigger: ({ value }) => {
            return avatarRevelation(value);
          },
        },
      ],
    },
    {
      id: "verifyKYB",
      message: "Verifying your details. Please wait...",
      placeholder: "Verifying...",
      trigger: ({ value }) => {
        return verifyKYB(
          value,
          "onKYBverificationSuccess",
          "onKYBverificationFailure",
          {
            id: "KYB",
            type: "parent",
          }
        );
      },
    },
    {
      id: "onKYBverificationSuccess",
      delay: 4500,
      message: "Your KYB details has been successfully verified!",
      placeholder: "Verifying your details..Please wait...",
      trigger: "attachCertificateOfOrigin",
    },
    {
      id: "onKYBverificationFailure",
      delay: 4500,
      message: "Couldn't verify your ID.",
      placeholder: "Verification Failed!",
      trigger: "end",
    },
    {
      id: "attachCertificateOfOrigin", // part 1 of "attachKYB"
      message: "Enter the agreement documents",
      placeholder: "Upload file",
      trigger: "attachCertificateOfOriginResponse",
    },
    {
      id: "attachCertificateOfOriginResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "certificateOfOriginDetection",
            parent: "KYB",
            id: "attachKYB",
          }}
          callBack={uploadKYB}
        />
      ),
      waitAction: true,
    },
    {
      id: "certificateOfOriginDetection",
      delay: 1000,
      message: "You have uploaded Certificate of Origin. Is that right?",
      placeholder: "Please select from the options.",
      trigger: "certificateOfOriginDetectionResponse",
    },
    {
      id: "certificateOfOriginDetectionResponse",
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "moreDocuments?",
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    // {
    //   id: "moreDocuments?",
    //   message: "Have you got more documents to upload?",
    //   placeholder: "Please select from the options.",
    //   trigger: "moreDocumentsResponseFromAttachKYB",
    // },
    // {
    //   id: "moreDocumentsResponseFromAttachKYB",
    //   hideInput: true,
    //   placeholder: "Please select from the options.",
    //   options: [
    //     {
    //       value: "yes",
    //       label: "Yes",
    //       trigger: "attachBankStatement",
    //     },
    //     {
    //       value: "no",
    //       label: "No",
    //       trigger: ({ value }) => {
    //         return confirmFileUploadAndTriggerNext("directorVerify");
    //       },
    //     },
    //   ],
    // },
    {
      id: "attachBankStatement", // part 2 of "attachKYB"
      delay: 1000,
      message: "Enter the agreement documents",
      placeholder: "Upload file",
      trigger: "attachBankStatementResponse",
    },
    {
      id: "attachBankStatementResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "bankStatementDetection",
            parent: "KYB",
            id: "attachKYB",
          }}
          callBack={uploadKYB}
        />
      ),
      waitAction: true,
    },
    {
      id: "bankStatementDetection",
      delay: 1000,
      message: "You have uploaded Bank Account Statement. Is that right?",
      placeholder: "Please select from the options.",
      trigger: "bankStatementDetectionResponse",
    },
    {
      id: "bankStatementDetectionResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: ({ value }) => {
            return confirmFileUploadAndTriggerNext("directorVerify");
          },
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "directorVerify",
      message: "Verifying Director. Please wait..",
      placeholder: "Verifying...",
      trigger: ({ value }) => {
        return verifyDirectorId(
          value,
          "directorVerificationSuccess",
          "directorVerificationFailure",
          {
            id: "directorVerify",
            type: "parent",
          }
        );
      },
    },
    {
      id: "directorVerificationSuccess",
      delay: 4500,
      message: "Director verified successfully!",
      placeholder: "Verifying your ID..Please wait...",
      trigger: "directorKYCDL",
    },
    {
      id: "directorVerificationFailure",
      delay: 4500,
      message: "Couldn't verify your ID.",
      placeholder: "Verification Failed!",
      trigger: "end",
    },
    {
      id: "directorKYCDL", // part 1 of "directorKYC"
      message: "Please upload Director KYC documents",
      placeholder: "Upload file",
      trigger: "directorKYCDLResponse",
    },
    {
      id: "directorKYCDLResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "directorKYCDLDetection",
            id: "directorKYC",
            parent: "directorUserVerify",
          }}
          // callBack={uploadKYC}
        />
      ),
      waitAction: true,
    },
    {
      id: "directorKYCDLDetection",
      message: "You have uploaded Indian Driving License. Is that right?",
      placeholder: "Please select from the options.",
      trigger: "directorKYCDLDetectionResponse",
    },
    {
      id: "directorKYCDLDetectionResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "moreDocumentsForDirectorKYC?",
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "moreDocumentsForDirectorKYC?",
      message: "Have you got more documents to upload?",
      placeholder: "Please select from the options.",
      trigger: "moreDocumentsResponseFromAttachDirectorKYC",
    },
    {
      id: "moreDocumentsResponseFromAttachDirectorKYC",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: "directorKYCaadhar",
        },
        {
          value: "no",
          label: "No",
          trigger: ({ value }) => {
            return confirmFileUploadAndTriggerNext("sponserUser");
          },
        },
      ],
    },
    {
      id: "directorKYCaadhar", // part 2 of "directorKYC"
      message: "Please upload Director KYC documents.",
      placeholder: "Upload file",
      trigger: "directorKYCaadharResponse",
    },
    {
      id: "directorKYCaadharResponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          resource={resource}
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "directorKYCaadharDetection",
            id: "directorKYC",
            parent: "directorUserVerify",
          }}
          // callBack={uploadKYC}
        />
      ),
      waitAction: true,
    },
    {
      id: "directorKYCaadharDetection",
      message: "You have uploaded Indian Aadhar. Is that right?",
      placeholder: "Please select from the options.",
      trigger: "directorKYCaadharDetectionResponse",
    },
    {
      id: "directorKYCaadharDetectionResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: ({ value }) => {
            return confirmFileUploadAndTriggerNext("sponserUser");
          },
        },
        {
          value: "no",
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "sponserUser",
      message: "Please provide your signature for further review.",
      trigger: "sponserUserResponse",
    },
    {
      id: "sponserUserResponse",
      user: true,
      placeholder: "Provide your signature",
      trigger: ({ value }) => {
        return getManualReview(
          value,
          "userSponserSuccess",
          "userSponserFailure",
          {
            id: "sponserUser",
            type: "parent",
          }
        );
      },
    },
    {
      id: "userSponserSuccess",
      delay: 5000,
      message: "Your profile has been verified and approved!",
      placeholder: "Approving..",
      trigger: "createAvatar",
    },
    {
      id: "userSponserFailure",
      delay: 5000,
      message: "Couldn't verify your ID.",
      placeholder: "Verification Failed!",
      trigger: "end",
    },
    {
      id: "createAvatar",
      message: "Creating your Avatar..",
      trigger: ({ value }) => {
        return getAvatar(
          value,
          "avatarCreationSuccess",
          "avatarCreationFailure",
          {
            id: "createAvatar",
            type: "parent",
          }
        );
      },
    },
    {
      id: "avatarCreationSuccess",
      delay: 5000,
      message: "Avatar created successfully!",
      placeholder: "Creating Avatar...",
      trigger: "end",
    },
    {
      id: "avatarCreationFailure",
      delay: 5000,
      message: "Avatar could not be created!",
      placeholder: "Failed to create Avatar",
      trigger: "end",
    },
    // starting manage policy script from main select
    {
      id: "managePolicies",
      message: "Which policy you like to View or Manage?",
      placeholder: "Please select from the options",
      trigger: "managePoliciesResponse",
    },
    {
      id: "managePoliciesResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "T-OB Supplier OnBoarding",
          label: "T-OB-DeepTier - Touchless Deep Tier Supplier OnBoarding",
          trigger: ({ value }) => {
            return managePolicySelect(value);
          },
        },
        {
          value: "OB-Anchor Buyer OnBoarding",
          label: "OB-Anchor - Anchor Buyer OnBoarding",
          trigger: ({ value }) => {
            return managePolicySelect(value);
          },
        },
        {
          value: "Create a New OnBoarding Policy",
          label: "Create a New OnBoarding Policy",
          trigger: ({ value }) => {
            return managePolicySelect(value);
          },
        },
        {
          value: "d",
          label: "View other OnBoarding Policies",
          trigger: ({ value }) => {
            return managePolicySelect(value);
          },
        },
      ],
    },
    {
      id: "TOBmanagePolicy",
      message: "Do you want to do any of these modifications ?",
      placeholder: "Please select from the options",
      trigger: "TOBmanagePolicyResponse",
    },
    {
      id: "TOBmanagePolicyResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "Add a New Gateway",
          label: "Add a New Gateway",
          trigger: ({ value }) => {
            return TOBmodifySelect(value);
          },
        },
        {
          value: "Change Router Policy",
          label: "Change Router Policy",
          trigger: ({ value }) => {
            return TOBmodifySelect(value);
          },
        },
        {
          value: "Add more Compliance Steps",
          label: "Add more Compliance Steps",
          trigger: ({ value }) => {
            return TOBmodifySelect(value);
          },
        },
        {
          value: "Enable or Disable Steps",
          label: "Enable or Disable Steps",
          trigger: ({ value }) => {
            return TOBmodifySelect(value);
          },
        },
      ],
    },
    {
      id: "addGateway",
      message: "For Which Compliance Step you want to add Gateway ?",
      placeholder: "Please select from the options",
      trigger: "addGatewayResponse",
    },
    {
      id: "addGatewayResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "a",
          label: "KYB",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
        {
          value: "b",
          label: "Director Verify",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
        {
          value: "c",
          label: "Sanction Check",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
        {
          value: "d",
          label: "Director KYC",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
        {
          value: "e",
          label: "Credit Rating",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
        {
          value: "f",
          label: "Others",
          trigger: ({ value }) => {
            return selectComplianceStep(value);
          },
        },
      ],
    },
    {
      id: "availableGateways",
      message: "Available Gateways to enable for KYB",
      placeholder: "Please select from the options",
      trigger: "availableGatewaysResponse",
    },
    {
      id: "availableGatewaysResponse",
      hideInput: true,
      placeholder: "Please select from the options.",
      options: [
        {
          value: "a",
          label: "Brex",
          trigger: ({ value }) => {
            return gatewaySelect(value);
          },
        },
        {
          value: "b",
          label: "NorthRow",
          trigger: ({ value }) => {
            return gatewaySelect(value);
          },
        },
        {
          value: "c",
          label: "Others",
          trigger: ({ value }) => {
            return gatewaySelect(value);
          },
        },
      ],
    },
    {
      id: "Brex",
      message: "Change completed to policy. Please review and confirm",
      placeholder: "Success!",
      trigger: "greeting2",
    },
    {
      id: "TOPMetrics",
      placeholder: "Retrieving..",
      asMessage: true,
      component: <GetTOPMetrics getTopMetrics={getTopMetrics} />,
      waitAction: true,
      replace: true,
      delay: 0,
    },
    {
      id: "TOPMetricsRetrieved",
      message:
        "TOP Metrics retrieved successfully! You may click to navigate through data graph on the right to get more details.",
      delay: 1000,
      placeholder: "Retrieving Avatar Metrics..",
      trigger: "greeting3",
    },
    {
      id: "end",
      message: "Just know I am here if you need me. Thanks for your time!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme} style={{ textAlign: "center" }}>
      <ChatBot
        botAvatar={tallyxAvatar}
        botDelay={1000}
        // cache={true}
        headerComponent={
          <ChatbotHeader resource={resource} toggleFloating={toggleFloating} />
        }
        steps={steps}
        floating={true}
        opened={opened}
        toggleFloating={toggleFloating}
        floatingIcon={<Logo />}
        floatingStyle={{
          right: 16,
          bottom: 12,
          // right: "initial",
          // transformOrigin: "bottom right",
        }}
        width={"641px"}
        // contentStyle={{ height: "75vh" }}
        style={{ right: 12, bottom: 12 }}
        height={"83vh"}
        bubbleOptionStyle={{ background: "#d0e1ff", fontSize: "14px" }}
        bubbleStyle={{
          fontSize: "13px",
          textAlign: "left",
          lineHeight: 1.6,
        }}
        inputStyle={{ padding: "14px 12px 12px 18px" }}
        handleEnd={() => handleEnd()}
      />
    </ThemeProvider>
  );
};

export default ChatBotContainer;

// commented steps for future use
// {
//   id: "directorUserVerify",
//   delay: 1000,
//   message: "Please enter your email id or username",
//   trigger: "directorUserVerifyResponse"
// },
// {
//   id: "directorUserVerifyResponse",
//   user: true,
//   placeholder: "Please enter your email id or username",
//   trigger: ({ value }) => {
//     return verifyDirectorUsername(
//       value,
//       "directorUserVerificationSuccess",
//       "directorUserVerificationFailure",
//       {
//         id: "directorUserVerify",
//         type: "parent"
//       }
//     );
//   }
// },
// {
//   id: "directorUserVerificationSuccess",
//   delay: 5000,
//   message: "Verified successfully",
//   placeholder: "Verifying your ID..Please wait...",
//   trigger: "attachDirectorID"
// },
// {
//   id: "directorUserVerificationFailure",
//   delay: 5000,
//   message: "Couldn't verify your ID.",
//   placeholder: "Verification Failed!",
//   trigger: "end"
// },
// {
//   id: "attachDirectorID",
//   message: "Please upload your Director ID",
//   placeholder: "Upload File",
//   trigger: "attachDirectorIDResponse"
// },
// {
//   id: "attachDirectorIDResponse",
//   component: (
//     <UploadDocument
//       onFileUpload={onFileUpload}
//       targetNode={{
//         type: "child",
//         trigger: "directorKYC",
//         id: "attachDirectorID",
//         parent: "directorUserVerify"
//       }}
//       callBack={uploadDirectorID}
//     />
//   ),
//   waitAction: true
// },
// {
//   id: "sanction",
//   message: "Sanction Screening in progress",
//   trigger: "sanctionResponse"
// },
// {
//   id: "sanctionResponse",
//   user: true,
//   placeholder: "Screening...",
//   // validator: value => validate(value),
//   trigger: ({ value }) => {
//     return trigger(
//       value,
//       { id: "sanction", type: "parent" },
//       "creditRating",
//       "sanctionResponse",
//       sanctionScreen
//     );
//   }
// },
// {
//   id: "creditRating",
//   message: "Checking your credit rating...",
//   trigger: "creditRatingResponse"
// },
// {
//   id: "creditRatingResponse",
//   user: true,
//   placeholder: "retrieving credit score...",
//   // validator: value => validate(value),
// trigger: ({ value }) => {
//   return trigger(
//     value,
//     { id: "creditRating", type: "parent" },
//     "sponserUser",
//     "creditRatingResponse",
//     getCreditRating
//   );
// }
// },
