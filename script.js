function sayHello() {
    alert("Welcome to the Plastic Shredder Project!");
}

function showTab(tabId) {
  // hide all sections
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach(section => section.style.display = "none");

  // remove active class from all buttons
  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => btn.classList.remove("active"));

  // show selected section
  document.getElementById(tabId).style.display = "block";

  // highlight clicked button
  event.target.classList.add("active");
}
