/**
 * HTML хүснэгтийг CSV болгон хувиргах
 * @param {string} tableId - Хүснэгтийн id
 * @param {string} filename - Файлын нэр
 */
export function exportTableToCSV(tableId, filename = 'food-composition.csv') {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error('Хүснэгт олдсонгүй');
        return false;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    for (let i = 0; i < rows.length; i++) {
        let row = [];
        const cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            // Зургийн хэсгийг орхих, зөвхөн текст авна
            let text = cols[j].innerText.trim();
            
            // Хэрэв дотор comma байгаа бол хашилтанд ороно
            if (text.includes(',')) {
                text = '"' + text.replace(/"/g, '""') + '"';
            }
            
            row.push(text);
        }
        
        csv.push(row.join(','));
    }

    const csvContent = '\uFEFF' + csv.join('\n');
    
    // Файл татах линк үүсгэх
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
}

/**
 * Одоо харагдаж байгаа хайлтын үр дүнг CSV болгон экспортлох
 */
export function exportCurrentSearchResultsCSV() {
    const date = new Date().toISOString().slice(0,10);
    return exportTableToCSV('resultTbl', `mongolian-food-composition-${date}.csv`);
}

/**
 * Хүснэгтийг Excel форматтай экспортлох
 * @param {string} tableId - Хүснэгтийн DOM id
 * @param {string} filename - Файлын нэр
 */
export function exportTableToExcel(tableId, filename = 'food-composition.xls') {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error('Хүснэгт олдсонгүй');
        return false;
    }

    // Зургийг устгаж хувиргах
    const tableClone = table.cloneNode(true);
    
    // Бүх thumbnail зургийг устгах
    tableClone.querySelectorAll('.food-thumbnail').forEach(img => {
        img.remove();
    });

    // Excel таних HTML template
    const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
            <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                        <x:Name>Хүнсний мэдээлэл</x:Name>
                        <x:WorksheetOptions>
                            <x:DisplayGridlines/>
                        </x:WorksheetOptions>
                    </x:ExcelWorksheet>
                </x:ExcelWorksheets>
            </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
            .food-thumbnail { display: none !important; }
        </style>
    </head>
    <body>
        ${tableClone.outerHTML}
    </body>
    </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
}

/**
 * Одоо харагдаж байгаа хайлтын үр дүнг Excel болгон экспортлох
 */
export function exportCurrentSearchResultsExcel() {
    const date = new Date().toISOString().slice(0,10);
    return exportTableToExcel('resultTbl', `mongolian-food-composition-${date}.xls`);
}