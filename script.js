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

    // EmailJS sending
    emailjs.send("service_tl35985", "template_nxltgkv", {
      name: name,
      email: email,
      invitation_url: imageData
    }).then(() => {
      alert("RSVP submitted! Invitation emailed to guest.");
    }).catch(err => {
      console.error(err);
      alert("RSVP saved but email failed to send.");
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