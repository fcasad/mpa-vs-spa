function renderHomePage() {
  document.title = 'Home';
  document.body.innerHTML = `
    <h1>Welcome to this example site</h1>
    <p>We'd love to hear from you. Please <a onclick="onContactLinkClick(event);">contact us</a>.</p>
  `;
}

function onContactLinkClick(event) {
  event.preventDefault();
  routeTo('/contact');
}

function renderContactPage() {
  document.title = 'Contact';
  document.body.innerHTML = `
    <h1>Contact Us</h1>
    <form onsubmit="onContactFormSubmit(event);">
      <div>
        <label for="contact-name">name</label>
        <input id="contact-name" name="name" type="text" required />
      </div>
      <div>
        <label for="contact-email">email</label>
        <input id="contact-email" name="email" type="email" required />
      </div>
      <div>
        <label for="contact-message">message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="10"
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  `;
}

async function onContactFormSubmit(event) {
  event.preventDefault();
  await fetch('/contact', {
    method: 'POST',
    body: new URLSearchParams(new FormData(event.target)),
  });
  routeTo('/contact-received');
}

function renderContactReceivedPage() {
  document.title = 'Contact Received';
  document.body.innerHTML = "<p>We've received your message, thanks!</p>";
}

function renderNotFoundPage() {
  document.title = '';
  document.body.innerHTML = `
    <h1>404</h1>
    <p>
      The page you were looking for could not be found. Go <a onclick="onHomeLinkClick(event);">home</a>
    </p>
  `;
}

function onHomeLinkClick(event) {
  event.preventDefault();
  routeTo('/');
}

function routeTo(path) {
  if (path !== window.location.pathname) {
    window.history.pushState(null, null, path);
  }
  if (path === '/') {
    renderHomePage();
  } else if (path === '/contact') {
    renderContactPage();
  } else if (path === '/contact-received') {
    renderContactReceivedPage();
  } else {
    renderNotFoundPage();
  }
}

window.addEventListener('popstate', function (event) {
  routeTo(event.target.location.pathname);
});

routeTo(window.location.pathname);
