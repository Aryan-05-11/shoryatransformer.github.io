const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const forms = document.querySelectorAll(".contact-form");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeNav = () => {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("is-locked", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const formNote = form.querySelector("[data-form-note]");
    const formType = form.dataset.formType;
    const name = data.get("name") || "Not provided";
    const phone = data.get("phone") || "Not provided";
    const message = data.get("message") || "Not provided";

    let whatsappMessage;

    if (formType === "job") {
      const age = data.get("age") || "Not provided";
      const location = data.get("location") || "Not provided";
      const experience = data.get("experience") || "Not provided";
      const work = data.get("work") || "Any suitable worker role";

      whatsappMessage = [
        "Hello Shorya Transformer,",
        "",
        "I want to apply for worker job.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Age: ${age}`,
        `Current Location: ${location}`,
        `Experience: ${experience}`,
        `Interested Work: ${work}`,
        `Message: ${message}`,
      ].join("\n");

      formNote.textContent = "Opening WhatsApp with the worker application...";
    } else {
      const requirement = data.get("requirement") || "Transformer requirement";
      const quantity = data.get("quantity") || "Not provided";

      whatsappMessage = [
        "Hello Shorya Transformer,",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Requirement: ${requirement}`,
        `Quantity: ${quantity}`,
        `Message: ${message}`,
      ].join("\n");

      formNote.textContent = "Opening WhatsApp with your enquiry...";
    }

    window.open(`https://wa.me/919136740508?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  });
});
