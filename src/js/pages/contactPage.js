import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderContactPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "contact",
    title: "Холбоо барих",
    content: `
      <div class="columns is-centered">
        <div class="column is-8">
          
          <div class="box">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img src="./img/icon/student.jpg" alt="Profile" class="is-rounded" style="object-fit: cover;">
                </figure>
              </div>
              <div class="media-content">
                <h3 class="title is-4">Хөдөө Аж Ахуйн Их Сургууль</h3>
                <p class="subtitle is-6">Мэдээллийн систем</p>
                
                <div class="content mt-4">
                  <p><i class="fas fa-phone fa-fw" style="margin-right: 8px; color: var(--green);"></i> Утас: <strong>(+976)-80204826</strong></p>
                  <p><i class="fas fa-envelope fa-fw" style="margin-right: 8px; color: var(--green);"></i> И-мэйл: <a href="mailto:isa2571022@muls.edu.mn" class="custom-link">isa2571022@muls.edu.mn</a></p>
                  <p><i class="fas fa-envelope fa-fw" style="margin-right: 8px; color: var(--green);"></i> И-мэйл: <a href="mailto:niconiconiimgl@gmail.com" class="custom-link">niconiconiimgl@gmail.com</a></p>
                </div>
              </div>
            </div>
          </div>

          <div class="box mt-5">
            <h4 class="title is-5 mb-4"> Сайтанд нэмэгдсэн шинэчлэлт</h4>
            
            <div class="content">
              <div class="mb-4">
                <p class="is-size-5"><strong>1. PDF экспорт</strong></p>
                <p class="has-text-grey">Хайлтын үр дүнг PDF файл болгон татах боломжтой</p>
              </div>
              
              <div class="mb-4">
                <p class="is-size-5"><strong>2. Excel / CSV экспорт</strong></p>
                <p class="has-text-grey">Өгөгдлийг Excel болон CSV форматтай татах боломжтой</p>
              </div>
              
              <div class="mb-4">
                <p class="is-size-5"><strong>3. Хоолны зургийн thumbnail</strong></p>
                <p class="has-text-grey">Бүх хоолны нэрний хажууд зураг харагдах болсон</p>
              </div>
              
              <div class="mb-4">
                <p class="is-size-5"><strong>4. Баганаар эрэмбэлэх</strong></p>
                <p class="has-text-grey">Аль ч багананы толгой дээр дарж хамгийн их / бага утгаар эрэмбэлэх боломжтой</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,
  });
}