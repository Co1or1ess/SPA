import { getNutritions } from "../services/nutritionService.js"; // Хоолны шим тэжээлийн өгөгдлийг авна.
import {
  buildFoodGroups,
  bindSearchEvents,
  renderDefaultTables,
  initNutritionData,
  applyPendingSelectedFoodsFromOverview,
} from "../fn/foodSearchEvents.js"; // food_group бүрээр багцалсан food_code, food_name-үүдийг авна. Жишээ нь: "Cereals and Cereal products" → [{ food_code: "01_0106", food_name: "Barley flour, whole grain" }, ...]

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js"; // Sidebar-тай хуудасны layout-г үүсгэх
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";

import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import { loadImages } from "../services/imageService.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";
import { exportCurrentSearchResults, exportSelectedFoods } from "../services/pdfExportService.js";
import { exportCurrentSearchResultsCSV, exportCurrentSearchResultsExcel } from "../services/csvExportService.js";

import { t } from "../i18n/i18n.js";

let imageModalBound = false;

export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification(t("notification.loadingData")),
  });

  try {
    const nutritionData = await getNutritions(); // Хүнсний найрлагын JSON өгөгдүүдлийг авна.
    await loadImages(); // Зургийн JSON өгөгдлийг ачаална.
    initNutritionData(nutritionData);
    const groupedFoods = buildFoodGroups(nutritionData); // food_group бүрээр багцалсан food_code, food_name-үүдийг авна. Жишээ нь: "Cereals and Cereal products" → [{ food_code: "01_0106", food_name: "Barley flour, whole grain" }, ...]

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `${renderSearchFoodName()} ${renderSearchSettings()} ${renderFoodGroupList(groupedFoods)}`,
        pageId: "search",
         pageTitle: t("search.title"),
        mainContent: `
      <div class="mb-4 is-flex is-justify-content-flex-end is-gap-2">
        <button id="exportAllPdf" class="button is-danger">
          <span class="icon"><i class="fas fa-file-pdf"></i></span>
          <span>PDF</span>
        </button>
        <button id="exportAllExcel" class="button is-success">
          <span class="icon"><i class="fas fa-file-excel"></i></span>
          <span>Excel</span>
        </button>
        <button id="exportAllCsv" class="button is-info">
          <span class="icon"><i class="fas fa-file-csv"></i></span>
          <span>CSV</span>
        </button>
      </div>
      
      <div id="resultTbl">
        ${renderDefaultTables(nutritionData)}
      </div>
    `,
      }) + renderImageModal();

    bindSidebar();
    bindMenuListToggle();
    bindSearchEvents();
    
    // Экспорт товчлуурын үйлдлүүдийг бэхлэх
    document.getElementById('exportAllPdf').addEventListener('click', exportCurrentSearchResults);
    document.getElementById('exportAllExcel').addEventListener('click', exportCurrentSearchResultsExcel);
    document.getElementById('exportAllCsv').addEventListener('click', exportCurrentSearchResultsCSV);

    if (!imageModalBound) {
      bindImageModalEvents();
      imageModalBound = true;
    }

    applyPendingSelectedFoodsFromOverview();
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification(t("notification.failedToLoadNutritionData"), "danger"),
    });
    console.error("Failed to load nutrition data:", error);
  }
}