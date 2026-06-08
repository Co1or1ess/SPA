import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderContactPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "contact",
    title: t("footer.contactInformation"),
    content: `
      <div class="content">
        <ul>
          <li><i class="fas fa-university fa-fw" style="margin-right: 6px;"></i> ${t("footer.university")}</li>
          <li><i class="fas fa-map-marker-alt fa-fw" style="margin-right: 6px;"></i> ${t("footer.address")}</li>
          <li><i class="fas fa-phone fa-fw" style="margin-right: 6px;"></i> ${t("footer.phone")}: (+976)-89075531</li>
          <li><i class="fas fa-envelope fa-fw" style="margin-right: 6px;"></i> ${t("footer.email")}: <a class="custom-link" href="mailto:orgilid@muls.edu.mn">orgilid@muls.edu.mn</a></li>
        </ul>
      </div>
    `,
  });
}
