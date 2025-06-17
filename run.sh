#!/bin/bash

GOOGLE_URL="https://docs.google.com/spreadsheets/d/15LnQY1SpHplWb-EyYFAOWNgtPOBZ8-CjARjQlt18qXI/edit#gid=0"

# อ่านชื่อชีตจากไฟล์ sheets.csv
while IFS= read -r SHEET_NAME || [[ -n "$SHEET_NAME" ]]; do
    # ตัดช่องว่างด้านหน้า-หลังออก (trim)
    SHEET_NAME=$(echo "$SHEET_NAME" | xargs)

    # ถ้า SHEET_NAME เป็นค่าว่างข้ามไปเลย
    if [[ -z "$SHEET_NAME" ]]; then
        continue
    fi

    REPORT_NAME="$SHEET_NAME"
    CY_FILE="cypress/e2e/${SHEET_NAME}.cy.js"

    if [[ ! -f "$CY_FILE" ]]; then
        echo "❌ File not found: $CY_FILE"
        continue
    fi

    rm -f "reports/${REPORT_NAME}.json"

    # รัน Cypress โดย redirect stdin เป็น /dev/null เพื่อป้องกัน stdin ถูกกิน
    echo "⭐ Running: ${REPORT_NAME}"
    npx cypress run \
        --spec "$CY_FILE" \
        --reporter mochawesome \
        --reporter-options "reportDir=reports,reportFilename=${REPORT_NAME},overwrite=true,html=false,json=true" < /dev/null

    echo "----------------------------------------------------------------------------------------------------"
    echo "⭐ Upload To Google Sheet: ${SHEET_NAME}"
    node Upload/UploadSheet.js "$GOOGLE_URL" "$SHEET_NAME"
    echo "✅ Done: ${SHEET_NAME}"
    echo "----------------------------------------------------------------------------------------------------"
    echo ""

done <GoogleSheet/sheets.csv
