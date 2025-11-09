// Initialize EmailJS
emailjs.init("FKrbfTPBBUEExgQh9"); // Replace with your EmailJS User ID

const form = document.getElementById('rsvpForm');
const card = document.getElementById('card');
const guestName = document.getElementById('guestName');
const downloadBtn = document.getElementById('downloadBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('guestEmail').value.trim();

  if (!name || !email) return alert("Please enter both name and email.");

  // Show name on card
  guestName.textContent = `Dear ${name}`;
  card.style.display = 'block';
  form.style.display = 'none';
  downloadBtn.style.display = 'inline-block';

  // Convert card to image and send email
  html2canvas(card).then(canvas => {
    const imageData = canvas.toDataURL('image/jpeg');

    // 1️⃣ Send email to guest
    emailjs.send("service_tl35985", "template_ycw6zbp", {
      name: name,
      email: guestEmail,
      invitation_url: imageData
    }).then(() => {
      console.log("Invitation sent to your email");
    }).catch(err => {
      console.error("Failed to send guest email:", err);
    });

    // 2️⃣ Send confirmation to yourself
    emailjs.send("service_tl35985", "template_1m704a7", {
      name: name,
      email: guestEmail,
      invitation_url: imageData
    }).then(() => {
      alert("✅ RSVP submitted! Guest and confirmation emails sent.");
    }).catch(err => {
      console.error("Failed to send confirmation email:", err);
      alert("⚠️ Guest email sent but confirmation email failed.");
    });
  });
});

// Download button functionality
downloadBtn.addEventListener('click', () => {
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'invitation_' + Date.now() + '.jpeg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
});