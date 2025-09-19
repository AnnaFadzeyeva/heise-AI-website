function getLanguage() {
  return localStorage.getItem("lang") || "de";
}

export function renderSubnav() {
  fetch("data/subnav.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];

      // Subnav Liste rendern
      const list = document.getElementById("subnav-list");
      if (list) {
        list.innerHTML = "";
        content.subnav.forEach((item, index) => {
          const li = document.createElement("li");
          li.className = `subnav-item${index === 0 ? " active" : ""}`;
          li.innerHTML = `
            <a class="subnav-link" href="#${item.id}">
              <img src="${item.icon}" alt="${item.label}" />
              ${item.label}
            </a>
          `;
          list.appendChild(li);
        });
      }

      // Download Section
      document.getElementById("download-title").textContent =
        content.download.title;
      document.getElementById("download-subtitle").textContent =
        content.download.subtitle;

      const appstoreBtn = document.getElementById("download-appstore");
      if (appstoreBtn) {
        appstoreBtn.href = content.download.buttons.appstore.link;
        appstoreBtn.querySelector("img").src =
          content.download.buttons.appstore.image;
      }

      const googleBtn = document.getElementById("download-googleplay");
      if (googleBtn) {
        googleBtn.href = content.download.buttons.googleplay.link;
        googleBtn.querySelector("img").src =
          content.download.buttons.googleplay.image;
      }
    })
    .catch((err) =>
      console.error("Fehler beim Laden der Subnav-Daten:", err)
    );
}

document.addEventListener("DOMContentLoaded", renderSubnav);