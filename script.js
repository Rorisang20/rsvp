// Initialize EmailJS (create a free account at https://www.emailjs.com)
emailjs.init("FKrbfTPBBUEExgQh9");

const form = document.getElementById("rsvpForm");
const canvas = document.getElementById("cardCanvas");
const link = document.getElementById("downloadLink");
const ctx = canvas.getContext("2d");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  const img = new Image();
  img.src = "invitation.png";

  img.onload = () => {
    // Draw invitation template
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Add guest name
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${data.title} ${data.firstName} ${data.lastName}`, canvas.width / 2, 520);

    // Show the preview
    canvas.style.display = "block";
    link.style.display = "block";

    // Create downloadable card
    const url = canvas.toDataURL("image/png");
    link.href = url;
    link.download = `Invitation-${data.firstName}.png`;
    link.textContent = "Download Your Invitation";

    // Send confirmation email (optional)
    emailjs.send("service_tl35985", "template_fsauzla", {
      name: `${data.title} ${data.firstName} ${data.lastName}`,
      email: data.email,
      contact: data.contact,
    }).then(() => {
      alert("RSVP received! Confirmation email sent.");
    }).catch(() => {
      alert("RSVP saved, but email failed to send.");
    });
  };
});