// Initialize EmailJS (create a free account at https://www.emailjs.com)
emailjs.init("FKrbfTPBBUEExgQh9");

const form = document.getElementById("rsvpForm");
const canvas = document.getElementById("cardCanvas");
const link = document.getElementById("downloadLink");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "invitation.jpeg";

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`${data.title} ${data.firstName} ${data.lastName}`, 200, 500);

    // Create downloadable card
    const url = canvas.toDataURL("image/png");
    link.href = url;
    link.download = `Invitation-${data.firstName}.png`;
    link.textContent = "Download Your Invitation";
    link.style.display = "block";
    canvas.style.display = "none";

    // Send confirmation email via EmailJS
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