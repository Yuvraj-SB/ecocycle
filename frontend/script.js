const state = {
  token: sessionStorage.getItem("ecocycleToken") || "",
  email: sessionStorage.getItem("ecocycleEmail") || "",
  mode: "login",
  theme: localStorage.getItem("ecocycleTheme") || "sunrise",
  loading: false,
  selectedListing: null
};

const refs = {
  userIdInput: document.getElementById("userIdInput"),
  usernameInput: document.getElementById("usernameInput"),
  usernameField: document.getElementById("usernameField"),
  loginBtn: document.getElementById("loginBtn"),
  registerBtn: document.getElementById("registerBtn"),
  toggleBtn: document.getElementById("toggleBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  clearBtn: document.getElementById("clearBtn"),
  buyBtn: document.getElementById("buyBtn"),
  sellBtn: document.getElementById("sellBtn"),
  buyPanel: document.getElementById("buyPanel"),
  sellPanel: document.getElementById("sellPanel"),
  listingButtons: document.getElementById("listingButtons"),
  listingMeta: document.getElementById("listingMeta"),
  sellMeta: document.getElementById("sellMeta"),
  marketplacePrompt: document.getElementById("marketplacePrompt"),
  marketplaceHint: document.getElementById("marketplaceHint"),
  sellerNameInput: document.getElementById("sellerNameInput"),
  listingTitleInput: document.getElementById("listingTitleInput"),
  listingTypeInput: document.getElementById("listingTypeInput"),
  listingPriceInput: document.getElementById("listingPriceInput"),
  listingDescriptionInput: document.getElementById("listingDescriptionInput"),
  listingConditionInput: document.getElementById("listingConditionInput"),
  listingLocationInput: document.getElementById("listingLocationInput"),
  submitListingBtn: document.getElementById("submitListingBtn"),
  resetListingBtn: document.getElementById("resetListingBtn"),
  result: document.getElementById("result"),
  responseActions: document.getElementById("responseActions"),
  buySelectedBtn: document.getElementById("buySelectedBtn"),
  viewTransactionsBtn: document.getElementById("viewTransactionsBtn"),
  paymentNote: document.getElementById("paymentNote"),
  statusBanner: document.getElementById("statusBanner"),
  responseMeta: document.getElementById("responseMeta"),
  sessionState: document.getElementById("sessionState"),
  sessionHint: document.getElementById("sessionHint"),
  authStatePill: document.getElementById("authStatePill"),
  modeBadge: document.getElementById("modeBadge"),
  themeToggle: document.getElementById("themeToggle")
};

function applyTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "sunrise";
  document.body.classList.toggle("theme-dark", state.theme === "dark");
  localStorage.setItem("ecocycleTheme", state.theme);

  refs.themeToggle.textContent = state.theme === "dark" ? "Switch To Sunrise" : "Switch To Dark";
  refs.themeToggle.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
}

function toggleTheme() {
  applyTheme(state.theme === "dark" ? "sunrise" : "dark");
}

function setMode(mode) {
  state.mode = mode;
  const registerMode = mode === "register";

  refs.usernameField.hidden = !registerMode;
  refs.registerBtn.hidden = !registerMode;
  refs.loginBtn.hidden = registerMode;
  refs.toggleBtn.textContent = registerMode ? "Back To Login" : "Switch To Register";
  refs.modeBadge.textContent = registerMode ? "Register" : "Login";

  if (!registerMode) {
    refs.usernameInput.value = "";
  }
}

function setLoading(isLoading, label) {
  state.loading = isLoading;
  const buttons = [
    refs.loginBtn,
    refs.registerBtn,
    refs.toggleBtn,
    refs.logoutBtn,
    refs.clearBtn,
    refs.buyBtn,
    refs.sellBtn,
    refs.submitListingBtn,
    refs.resetListingBtn,
    refs.buySelectedBtn,
    refs.viewTransactionsBtn,
    refs.themeToggle,
  ];

  buttons.forEach((button) => {
    button.disabled = isLoading;
  });

  if (isLoading && label) {
    setStatus(label, "info");
  }
}

function maskToken(token) {
  if (!token) {
    return "No token";
  }

  if (token.length <= 18) {
    return token;
  }

  return token.slice(0, 10) + "..." + token.slice(-6);
}

function updateSessionView() {
  const signedIn = Boolean(state.token);

  refs.authStatePill.textContent = signedIn ? "Signed in" : "Signed out";
  refs.authStatePill.classList.toggle("active", signedIn);

  if (signedIn && state.email) {
    refs.userIdInput.value = state.email;
  } else if (!signedIn) {
    refs.userIdInput.value = "";
  }

  if (signedIn) {
    refs.sessionState.textContent = state.email || "Authenticated session";
    refs.sessionHint.textContent = "Token ready: " + maskToken(state.token);
    refs.marketplacePrompt.hidden = false;
    refs.marketplaceHint.textContent = "Choose Buy to load marketplace items or Sell for the next step.";
    refs.sellerNameInput.value = refs.sellerNameInput.value || (state.email ? state.email.split("@")[0] : "");
  } else {
    refs.sessionState.textContent = "No active session";
    refs.sessionHint.textContent = "Log in or register to unlock service calls.";
    refs.marketplacePrompt.hidden = false;
    refs.marketplaceHint.textContent = "After login, choose Buy to load the available items from the marketplace service.";
    showMarketplacePanel(null);
    refs.listingButtons.innerHTML = "";
    refs.listingMeta.textContent = "No items loaded yet";
    refs.sellMeta.textContent = "Id and ownerId are created automatically";
  }

  refs.viewTransactionsBtn.hidden = !signedIn;
  refs.responseActions.hidden = !signedIn;
  if (!signedIn) {
    hideListingActions();
  }
}

function resetAuthInputs() {
  refs.userIdInput.value = "";
  refs.userIdInput.defaultValue = "";
  refs.userIdInput.setAttribute("value", "");
  refs.usernameInput.value = "";
}

function setStatus(message, tone) {
  refs.statusBanner.textContent = message;
  refs.statusBanner.className = "status-banner " + tone;
}

function setResponse(label, payload) {
  refs.responseMeta.textContent = label + " | " + new Date().toLocaleTimeString();

  if (typeof payload === "string") {
    refs.result.textContent = payload;
    return;
  }

  refs.result.textContent = JSON.stringify(payload, null, 2);
}

function formatListingDetails(listing) {
  return {
    id: listing.id,
    title: listing.title,
    type: listing.type,
    price: listing.price,
    ownerId: listing.ownerId,
    description: listing.description || "",
    condition: listing.condition || "",
    location: listing.location || ""
  };
}

function hideListingActions() {
  state.selectedListing = null;
  refs.buySelectedBtn.hidden = true;
  refs.paymentNote.hidden = true;
}

function saveSession(token, email) {
  state.token = token;
  state.email = email;
  sessionStorage.setItem("ecocycleToken", token);
  sessionStorage.setItem("ecocycleEmail", email);
  updateSessionView();
}

function resetListingForm() {
  refs.sellerNameInput.value = state.email ? state.email.split("@")[0] : "";
  refs.listingTitleInput.value = "";
  refs.listingTypeInput.value = "SALE";
  refs.listingPriceInput.value = "";
  refs.listingDescriptionInput.value = "";
  refs.listingConditionInput.value = "";
  refs.listingLocationInput.value = "";
}

function showMarketplacePanel(panel) {
  refs.buyPanel.hidden = panel !== "buy";
  refs.sellPanel.hidden = panel !== "sell";
}

function clearSession() {
  state.token = "";
  state.email = "";
  resetAuthInputs();
  sessionStorage.removeItem("ecocycleToken");
  sessionStorage.removeItem("ecocycleEmail");
  showMarketplacePanel(null);
  refs.listingButtons.innerHTML = "";
  refs.listingMeta.textContent = "No items loaded yet";
  refs.sellMeta.textContent = "Id and ownerId are created automatically";
  resetListingForm();
  hideListingActions();
  updateSessionView();
}

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorText = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(errorText || "HTTP " + response.status);
  }

  return body;
}

async function performAuth(type) {
  const email = refs.userIdInput.value.trim();
  const username = refs.usernameInput.value.trim();

  if (!email) {
    setStatus("Enter an email address to continue.", "error");
    refs.userIdInput.focus();
    return;
  }

  if (type === "register" && !username) {
    setStatus("Choose a username before creating an account.", "error");
    refs.usernameInput.focus();
    return;
  }

  const endpoint = type === "register"
    ? "/auth/register?email=" + encodeURIComponent(email) + "&username=" + encodeURIComponent(username)
    : "/auth/login?email=" + encodeURIComponent(email);

  const actionLabel = type === "register" ? "Creating your account..." : "Signing you in...";
  setLoading(true, actionLabel);

  try {
    const token = await fetch(endpoint, { method: "POST" }).then(handleResponse);
    saveSession(token, email);
    setStatus(type === "register" ? "Account created and signed in successfully." : "Login successful.", "success");
    setResponse(
      type === "register" ? "Register Response" : "Login Response",
      "Session started for " + email + ". You can now call EcoCycle services."
    );

    if (type === "register") {
      setMode("login");
    }
  } catch (error) {
    setStatus((type === "register" ? "Registration failed: " : "Login failed: ") + error.message, "error");
    setResponse(type === "register" ? "Register Error" : "Login Error", String(error.message || error));
  } finally {
    setLoading(false);
  }
}

function renderListings(listings) {
  refs.listingButtons.innerHTML = "";
  hideListingActions();

  if (!Array.isArray(listings) || listings.length === 0) {
    refs.listingMeta.textContent = "No marketplace items available";
    refs.listingButtons.innerHTML = "<p class=\"empty-state\">No items are available right now.</p>";
    return;
  }

  refs.listingMeta.textContent = listings.length + " item" + (listings.length === 1 ? "" : "s") + " loaded";

  listings.forEach((listing) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "listing-button";
    button.textContent = listing.title || "Untitled Item";
    button.addEventListener("click", () => {
      state.selectedListing = listing;
      refs.buySelectedBtn.hidden = false;
      refs.paymentNote.hidden = false;
      setStatus("Showing details for " + (listing.title || "selected item") + ".", "success");
      setResponse("Marketplace Item Details", formatListingDetails(listing));
    });
    refs.listingButtons.appendChild(button);
  });
}

async function fetchListings() {
  return fetch("/listings", {
    headers: {
      Authorization: "Bearer " + state.token
    }
  }).then(handleResponse);
}

async function handleBuyFlow() {
  if (!state.token) {
    setStatus("Please log in before choosing Buy or Sell.", "error");
    setResponse("Access Required", "You need an active session before opening the marketplace flow.");
    return;
  }

  setLoading(true, "Loading marketplace items...");

  try {
    const data = await fetchListings();

    showMarketplacePanel("buy");
    renderListings(data);
    setStatus("Marketplace items loaded successfully.", "success");
    setResponse("Marketplace Service", data);
  } catch (error) {
    setStatus("Could not load marketplace items. " + error.message, "error");
    setResponse("Marketplace Service Error", String(error.message || error));
  } finally {
    setLoading(false);
  }
}

async function handleBuySelected() {
  if (!state.token || !state.selectedListing) {
    setStatus("Select an item before using Buy.", "error");
    setResponse("Buy Item", "Choose one marketplace item first, then use the Buy button under the listing output.");
    return;
  }

  const listing = state.selectedListing;
  const isDonation = listing.type === "DONATION";
  const endpoint = isDonation ? "/transactions/donate" : "/transactions/offer";
  const payload = isDonation
    ? { listingId: listing.id }
    : { listingId: listing.id, offerAmount: listing.price };

  setLoading(true, isDonation ? "Claiming donation..." : "Creating transaction...");

  try {
    const transaction = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + state.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(handleResponse);

    await fetch("/listings/" + encodeURIComponent(listing.id), {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + state.token
      }
    }).then(handleResponse);

    const listings = await fetchListings();
    showMarketplacePanel("buy");
    renderListings(listings);

    setStatus("Transaction created successfully.", "success");
    setResponse("Buy Flow", {
      listing,
      transaction,
      listingRemoved: true,
      payment: {
        status: "not_configured",
        note: "Stripe and PayPal both need real test credentials, so this build stops at transaction creation for safety."
      }
    });
  } catch (error) {
    setStatus("Could not create the transaction. " + error.message, "error");
    setResponse("Buy Flow Error", String(error.message || error));
  } finally {
    setLoading(false);
  }
}

async function handleViewTransactions() {
  if (!state.token) {
    setStatus("Please log in before loading transactions.", "error");
    setResponse("Transactions Service", "You need an active session before viewing transactions.");
    return;
  }

  setLoading(true, "Loading transactions...");

  try {
    const transactions = await fetch("/transactions", {
      headers: {
        Authorization: "Bearer " + state.token
      }
    }).then(handleResponse);

    setStatus("Transactions loaded successfully.", "success");
    setResponse("Transactions Service", transactions);
  } catch (error) {
    setStatus("Could not load transactions. " + error.message, "error");
    setResponse("Transactions Service Error", String(error.message || error));
  } finally {
    setLoading(false);
  }
}

function handleSellFlow() {
  if (!state.token) {
    setStatus("Please log in before choosing Buy or Sell.", "error");
    setResponse("Access Required", "You need an active session before opening the marketplace flow.");
    return;
  }

  showMarketplacePanel("sell");
  refs.sellMeta.textContent = "Id and ownerId will be created when you submit";
  setStatus("Sell form ready. Fill in the item details and submit.", "info");
  setResponse(
    "Sell Flow",
    "Enter the item details. The marketplace service will assign the listing id and ownerId automatically."
  );
}

async function handleListingSubmit() {
  if (!state.token) {
    setStatus("Please log in before submitting a listing.", "error");
    setResponse("Access Required", "You need an active session before creating a listing.");
    return;
  }

  const title = refs.listingTitleInput.value.trim();
  const type = refs.listingTypeInput.value;
  const priceValue = refs.listingPriceInput.value.trim();
  const description = refs.listingDescriptionInput.value.trim();
  const condition = refs.listingConditionInput.value.trim();
  const location = refs.listingLocationInput.value.trim();
  const sellerName = refs.sellerNameInput.value.trim();

  if (!title) {
    setStatus("Enter a title before submitting the listing.", "error");
    refs.listingTitleInput.focus();
    return;
  }

  if (!type) {
    setStatus("Choose a listing type before submitting.", "error");
    refs.listingTypeInput.focus();
    return;
  }

  if (!priceValue && type !== "DONATION") {
    setStatus("Enter a price for sale or rental listings.", "error");
    refs.listingPriceInput.focus();
    return;
  }

  const numericPrice = type === "DONATION" ? 0 : Number(priceValue);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    setStatus("Price must be a valid non-negative number.", "error");
    refs.listingPriceInput.focus();
    return;
  }

  const payload = {
    title,
    description,
    type,
    price: numericPrice,
    condition,
    location
  };

  setLoading(true, "Submitting your listing...");

  try {
    const createdListing = await fetch("/listings", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + state.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(handleResponse);

    const listings = await fetchListings();
    showMarketplacePanel("buy");
    renderListings(listings);
    refs.sellMeta.textContent = "Listing submitted successfully";
    setStatus("Listing created successfully. It is now visible in Buy.", "success");
    setResponse("Listing Created", {
      sellerName: sellerName || "",
      listing: createdListing
    });
    resetListingForm();
  } catch (error) {
    setStatus("Could not create the listing. " + error.message, "error");
    setResponse("Listing Create Error", String(error.message || error));
  } finally {
    setLoading(false);
  }
}

refs.loginBtn.addEventListener("click", () => performAuth("login"));
refs.registerBtn.addEventListener("click", () => performAuth("register"));
refs.toggleBtn.addEventListener("click", () => setMode(state.mode === "login" ? "register" : "login"));
refs.themeToggle.addEventListener("click", toggleTheme);
refs.logoutBtn.addEventListener("click", () => {
  clearSession();
  resetAuthInputs();
  setStatus("Session cleared. You are signed out.", "info");
  setResponse("Signed Out", "Your local session token has been removed.");
  refs.userIdInput.blur();
});
refs.clearBtn.addEventListener("click", () => {
  setStatus("Response console cleared.", "info");
  setResponse("Console Reset", "Choose Buy to load marketplace items, then select an item title to inspect it.");
  hideListingActions();
});
refs.buyBtn.addEventListener("click", handleBuyFlow);
refs.sellBtn.addEventListener("click", handleSellFlow);
refs.submitListingBtn.addEventListener("click", handleListingSubmit);
refs.buySelectedBtn.addEventListener("click", handleBuySelected);
refs.viewTransactionsBtn.addEventListener("click", handleViewTransactions);
refs.resetListingBtn.addEventListener("click", () => {
  resetListingForm();
  refs.sellMeta.textContent = "Form cleared";
  setStatus("Sell form cleared.", "info");
  setResponse("Sell Form Reset", "Enter the next item you want to list.");
});

refs.userIdInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performAuth(state.mode);
  }
});

refs.usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && state.mode === "register") {
    performAuth("register");
  }
});

refs.listingPriceInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleListingSubmit();
  }
});

applyTheme(state.theme);
setMode("login");
resetListingForm();
hideListingActions();
updateSessionView();

if (state.token) {
  setStatus("Session restored. Choose Buy or Sell to continue.", "success");
  setResponse("Session Restored", "Welcome back" + (state.email ? ", " + state.email : "") + ". Choose Buy to load marketplace items.");
} else {
  setStatus("Ready. Sign in to start calling services.", "info");
}
