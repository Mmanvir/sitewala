// Website enquiries are saved as responses to the owner's Google Form (which fills a Google Sheet).
// Form: https://docs.google.com/forms/d/e/1FAIpQLSexA0-Y_5fg8G-UaUy9I6hltrTCTy1uk9IK4kidj4oIfh8yow/viewform
// If you add, remove or recreate questions in the form, the entry codes below change.
// Find the new ones by opening the form > ⋮ > "Get pre-filled link", filling every box, and copying the link.

export const leadForm = {
  submitUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSexA0-Y_5fg8G-UaUy9I6hltrTCTy1uk9IK4kidj4oIfh8yow/formResponse",
  fields: {
    name: "entry.901770882",
    phone: "entry.887236625",
    businessType: "entry.766130652",
    need: "entry.1877405977", // also carries the sample liked and the message
    budget: "entry.1718710675",
  },
};
