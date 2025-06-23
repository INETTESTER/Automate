#!/bin/bash

CSV_FILE="GoogleSheet/sheets.csv"

# อ่าน GOOGLE_URL จากบรรทัดแรก
GOOGLE_URL=$(head -n 1 "$CSV_FILE")

# อ่านบรรทัดที่ 2 เป็นต้นไป
tail -n +2 "$CSV_FILE" | while IFS= read -r SHEET_NAME || [[ -n "$SHEET_NAME" ]]; do
    # ตัดช่องว่างหน้า-หลังออก (trim)
    SHEET_NAME=$(echo "$SHEET_NAME" | xargs)

    # ถ้า SHEET_NAME ว่าง ให้ข้าม
    if [[ -z "$SHEET_NAME" ]]; then
        continue
    fi

    REPORT_NAME="$SHEET_NAME"
    CY_FILE="cypress/e2e/${SHEET_NAME}.cy.js"

    if [[ ! -f "$CY_FILE" ]]; then
        echo "❌ File not found: $CY_FILE"
        continue
    fi

    rm -f "xreports/${REPORT_NAME}.json"

    echo "⚡ Running: ${REPORT_NAME}"
    npx cypress run \
        --spec "$CY_FILE" \
        --reporter mochawesome \
        --reporter-options "reportDir=xreports,reportFilename=${REPORT_NAME},overwrite=true,html=false,json=true" < /dev/null

    echo "===================================================================================================="
    echo " ⏳ Upload To Google Sheet: ${SHEET_NAME}"
    node Upload/UploadSheet.js "$GOOGLE_URL" "$SHEET_NAME"
    echo " ✔️  Done: ${SHEET_NAME}"
    echo "===================================================================================================="
    echo ""
    echo ""
done