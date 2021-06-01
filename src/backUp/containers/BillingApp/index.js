import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import BillingAppContextProvider from "../../contextProviders/BillingAppContextProvider";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/billingApp.json";
import PageNotFoundContainer from "../PageNotFoundContainer";

const BillingHomeContainer = lazy(() => import("./BillingHomeContainer"));
const ViewProfileContainer = lazy(() => import("./ViewProfileContainer"));
const BillingProjectsContainer = lazy(() =>
  import("./BillingProjectsContainer")
);
const PricingModelContainer = lazy(() => import("./PricingModelContainer"));
const ActivityParentContainer = lazy(() => import("./ActivityParentContainer"));
const StatementsParentContainer = lazy(() =>
  import("./StatementsParentContainer")
);
const StatementsPendingApprovalContainer = lazy(() =>
  import("./StatementsPendingApprovalContainer")
);
const StatementsPastDueContainer = lazy(() =>
  import("./StatementsPastDueContainer")
);
const RetrieveInvoiceContainer = lazy(() =>
  import("./RetrieveInvoiceContainer")
);
const ActivityByClientContainer = lazy(() =>
  import("./ActivityByClientContainer")
);
const StatementsByClientContainer = lazy(() =>
  import("./StatementsByClientContainer")
);
const BillingSettingsContainer = lazy(() =>
  import("./BillingSettingsContainer")
);
const LogPaymentContainer = lazy(() => import("./LogPaymentContainer"));

const BillingApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <BillingAppContextProvider>
          <Routes>
            <Route
              path="/"
              element={<BillingHomeContainer resource={resource} />}
            />
            <Route
              path="/project/:projectId"
              element={<ViewProfileContainer resource={resource} />}
            />
            <Route
              path="/project/:projectId/contractDetails"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="/project/:projectId/contractDetails/billingStructure/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="/project/:projectId/billingStructure/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="/project/:projectId/statement/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="/notifications/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="/admin"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="/admin/:projectId"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="/admin/:pricingBookId/pricingModel"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="activity"
              element={<ActivityParentContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId"
              element={<ActivityByClientContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId/profile/:projectId"
              element={<ViewProfileContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId/profile/:projectId/contractDetails"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId/profile/:projectId/contractDetails/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId/profile/:projectId/billingStructure/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="activity/:clientTopId/profile/:projectId/statement/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="statements"
              element={<StatementsParentContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId"
              element={<StatementsByClientContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/profile/:projectId"
              element={<ViewProfileContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/profile/:projectId/contractDetails"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/profile/:projectId/contractDetails/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/profile/:projectId/billingStructure/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="statements/:clientTopId/profile/:projectId/statement/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="statements/pendingApproval"
              element={
                <StatementsPendingApprovalContainer resource={resource} />
              }
            />
            <Route
              path="statements/pendingApproval/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="statements/pastDue"
              element={<StatementsPastDueContainer resource={resource} />}
            />
            <Route
              path="statements/pastDue/:statementId"
              element={<RetrieveInvoiceContainer resource={resource} />}
            />
            <Route
              path="statements/contractsExpiringSoon"
              element={<BillingProjectsContainer resource={resource} />}
            />
            <Route
              path="statements/contractsExpiringSoon/:pricingBookId"
              element={<PricingModelContainer resource={resource} />}
            />
            <Route
              path="statements/logPayment"
              element={<LogPaymentContainer resource={resource} />}
            />
            <Route
              path="/settings"
              element={<BillingSettingsContainer resource={resource} />}
            />
            <Route path="*" element={<PageNotFoundContainer />} />
          </Routes>
        </BillingAppContextProvider>
      </Suspense>
    </AppLayout>
  );
};

export default BillingApp;
