// 🇲🇳 Сонгосон хоолнуудыг PDF болгон хэвлэх сервис
// 🇲🇳 Хэрэглэгч сонгосон багана болон хоолнуудыг хэвлэхэд бэлэн PDF үүсгэнэ

/**
 * Сонгосон хүснэгтийг PDF болгон хэвлэх
 * @param {string} tableId - Хүснэгтийн DOM id
 * @param {string} title - PDF гарчиг
 */
export function exportTableToPDF(tableId, title = '') {
    // 🇲🇳 Одоо дэлгэцэнд байгаа хүснэгтийг авна
    const table = document.getElementById(tableId);
    if (!table) {
        console.error('Хүснэгт олдсонгүй');
        return false;
    }

    // 🇲🇳 Хэвлэх зориулалттай шинэ document үүсгэнэ
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="mn">
    <head>
        <meta charset="UTF-8">
        <title>${title || 'Хүнсний найрлагын мэдээлэл'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
            }
            
            body {
                padding: 20px;
                font-size: 12px;
                line-height: 1.4;
            }
            
            h1 {
                text-align: center;
                margin-bottom: 20px;
                font-size: 18px;
                color: #333;
            }
            
            .print-date {
                text-align: right;
                color: #666;
                font-size: 10px;
                margin-bottom: 15px;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: auto;
            }
            
            th, td {
                border: 1px solid #ccc;
                padding: 6px 8px;
                text-align: left;
                vertical-align: top;
            }
            
            th {
                background-color: #f5f5f5;
                font-weight: bold;
                position: sticky;
                top: 0;
            }
            
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            
            tr:nth-child(even) {
                background-color: #fafafa;
            }
            
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 10px;
                color: #666;
            }
            
            @media print {
                body {
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                @page {
                    size: A4 landscape;
                    margin: 15mm;
                    
                    /* 🇲🇳 about:blank гарчиг хөлсийг устгах */
                    @top-left { content: ''; }
                    @top-right { content: ''; }
                    @bottom-left { content: ''; }
                    @bottom-right { content: ''; }
                }
                
                /* 🇲🇳 Браузер автоматаар нэмэх гарчиг хөлсийг бүрэн устгах */
                html, body {
                    width: 297mm;
                    height: 210mm;
                }
            }
        </style>
    </head>
    <body>
        <h1>${title || 'Монголын хүнсний найрлагын мэдээллийн сан'}</h1>
        <div class="print-date">Хэвлэсэн: ${new Date().toLocaleString('mn-MN')}</div>
        
        ${table.outerHTML}
        
        <div class="footer">
            Монголын хүнсний найрлагын мэдээллийн сан | © ${new Date().getFullYear()}
        </div>
    </body>
    </html>
    `);

    printWindow.document.close();
    
    // 🇲🇳 Бүх зүйл ачаалагдсаны дараа хэвлэх цонхыг нээнэ
    printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
    };

    return true;
}

/**
 * Одоо харагдаж байгаа бүх үр дүнг экспортлох
 */
export function exportCurrentSearchResults() {
    return exportTableToPDF('resultTbl', 'Хүнсний хайлтын үр дүн');
}

/**
 * Сонгосон хоолнуудыг зөвхөн экспортлох
 */
export function exportSelectedFoods() {
    // 🇲🇳 Сонгосон мөрүүдийг ялгаж авна
    const selectedRows = document.querySelectorAll('#resultTbl tr.selected');
    
    if (selectedRows.length === 0) {
        alert('Ядаж нэг хоол сонгоно уу');
        return false;
    }

    // 🇲🇳 Зөвхөн сонгосон мөрүүдтэй шинэ хүснэгт үүсгэнэ
    const table = document.getElementById('resultTbl').cloneNode(true);
    const tbody = table.querySelector('tbody');
    
    if (tbody) {
        tbody.innerHTML = '';
        selectedRows.forEach(row => {
            tbody.appendChild(row.cloneNode(true));
        });
    }

    // 🇲🇳 Энэ хүснэгтийг PDF болгон экспортлох
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="mn">
    <head>
        <meta charset="UTF-8">
        <title>Сонгосон хоолнууд</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
            body { padding: 20px; font-size: 12px; }
            h1 { text-align: center; margin-bottom: 20px; font-size: 18px; }
            .print-date { text-align: right; color: #666; font-size: 10px; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafafa; }
            .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #666; }
            @media print { @page { size: A4 landscape; margin: 15mm; } }
        </style>
    </head>
    <body>
        <h1>Сонгосон ${selectedRows.length} хоолны мэдээлэл</h1>
        <div class="print-date">Генерласан: ${new Date().toLocaleString('mn-MN')}</div>
        ${table.outerHTML}
        <div class="footer">Монголын хүнсний найрлагын мэдээллийн сан</div>
    </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
    };

    return true;
}