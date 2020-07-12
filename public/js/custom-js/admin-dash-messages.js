function toggleBack() {
  var x = document.getElementsByClassName("main-section");
  var messageToggle = document.getElementById("inbox-top");
  var messages = document.getElementById("right-side");

  if (window.screen.width > 768) {
    return;
  }
  for (var i = 0; i < x.length; i++) {
    if (x[i].style.display === "none") {
      x[i].style.display = "block";
      messageToggle.style.display = "none";
      messages.style.display = "none";
    } else {
      x[i].style.display = "none";
      messageToggle.style.display = "block";
      messages.style.display = "block";
    }
  }
}