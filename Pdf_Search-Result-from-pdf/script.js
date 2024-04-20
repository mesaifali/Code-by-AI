function searchResult() {
    const regNoInput = document.getElementById("regNoInput").value;
    const selectedSemester = document.getElementById("semesterSelect").value;
    const pdfPath = `results/${selectedSemester}.pdf`;

    loadPDFFromPath(pdfPath, regNoInput, selectedSemester);
}

function loadPDFFromPath(pdfPath, regNo, semester) {
    pdfjsLib.getDocument(pdfPath).promise.then(function(pdf) {
        let found = false;
        let currentPage = 1;

        function searchInPage() {
            pdf.getPage(currentPage).then(function(page) {
                page.getTextContent().then(function(textContent) {
                    textContent.items.forEach(function(textItem) {
                        const text = textItem.str;
                        if (text.includes(regNo)) {
                            found = true;
                            displayResult("Pass", regNo, semester);
                        }
                    });
                    if (!found && currentPage < pdf.numPages) {
                        currentPage++;
                        searchInPage();
                    } else if (!found) {
                        displayResult("Fail", regNo, semester);
                    }
                });
            });
        }

        searchInPage();
    }).catch(function(error) {
        displayResult("PDF Missing", regNo, semester);
    });
}

function displayResult(result, regNo, semester) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");
    const popupMessage = document.getElementById("popupMessage");

    let message = "";
    let className = "";

    if (result === "Pass") {
        message = `Congratulations! You're passed in ${semester}.`;
        className = "pass-card";
    } else if (result === "Fail") {
        message = `Sorry! You're failed in ${semester}.`;
        className = "fail-card";
    } else if (result === "PDF Missing") {
        message = `Sorry! PDF for ${semester} is missing. <br> Result may not published`;
        className = "fail-card";
    }

    popupContent.className = "popup-content " + className;
    popupMessage.innerHTML = `<p class="popup-message">${message}</p><p class="registration-no">Registration Number: ${regNo}</p>`;
    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
