// Initialize EmailJS
emailjs.init("FKrbfTPBBUEExgQh9"); // Replace with your EmailJS User ID

const form = document.getElementById("rsvpForm");
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const link = document.getElementById("downloadLink");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  const img = new Image();
  img.src = "invitation.jpeg"; // Change to your image name (jpeg or png)

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Embed guest name
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "gold";
    ctx.textAlign = "center";
    ctx.fillText(`${data.title} ${data.firstName} ${data.lastName}`, canvas.width / 2, 80);

    // Show preview
    canvas.style.display = "block";

    // Create downloadable link
    const url = canvas.toDataURL("image/jpeg");
    link.href = url;
    link.download = `Invitation-${data.firstName}.jpeg`;
    link.style.display = "block";

    // Send email to guest
    emailjs.send("service_tl35985", "template_nxltgkv", {
      name: `${data.title} ${data.firstName} ${data.lastName}`,
      email: data.email,
      contact: data.contact,
      invitation_url: url
    }).then(() => {
      alert("RSVP submitted! Guest email sent.");
    }).catch((err) => {
      console.error(err);
      alert("RSVP saved but email failed to send.");
    });
  };

  img.onerror = () => {
    alert("Cannot load invitation image. Check file name.");
  };
});