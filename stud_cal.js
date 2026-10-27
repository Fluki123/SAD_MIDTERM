
document.addEventListener("DOMContentLoaded", function () {

    // Get the form and buttons
    const gradeForm = document.getElementById("gradeForm");
    const clearBtn = document.getElementById("clearBtn");
    const results = document.getElementById("results");
    const errorMessage = document.getElementById("errorMessage");

    // Get the input fields
    const studentName = document.getElementById("studentName");
    const prelimInput = document.getElementById("prelim");
    const midtermInput = document.getElementById("midterm");
    const finalInput = document.getElementById("finalGrade");

    // Calculate button
    gradeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Hide previous results and errors
        results.hidden = true;
        errorMessage.hidden = true;
        errorMessage.textContent = "";

        // Read input values
        const name = studentName.value.trim();
        const prelimText = prelimInput.value.trim();
        const midtermText = midtermInput.value.trim();
        const finalText = finalInput.value.trim();

        // Check empty fields
        if (
            name === "" ||
            prelimText === "" ||
            midtermText === "" ||
            finalText === ""
        ) {
            showError("Please fill in all fields.");
            return;
        }

        // Convert input values to numbers
        const prelim = Number(prelimText);
        const midterm = Number(midtermText);
        const finalGrade = Number(finalText);

        // Validate grades
        const grades = [prelim, midterm, finalGrade];

        for (const grade of grades) {
            if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
                showError("Grades must be between 0 and 100.");
                return;
            }
        }

        // Calculate average
        const average = (prelim + midterm + finalGrade) / 3;

        // Determine remarks
        const remarks = average >= 75 ? "Passed" : "Failed";

        // Display student details
        document.getElementById("resultName").textContent = name;
        document.getElementById("resultPrelim").textContent = prelim;
        document.getElementById("resultMidterm").textContent = midterm;
        document.getElementById("resultFinal").textContent = finalGrade;
        document.getElementById("resultAverage").textContent =
            average.toFixed(2);

        // Display remarks and set the appropriate color
        const resultRemarks = document.getElementById("resultRemarks");
        resultRemarks.textContent = remarks;
        resultRemarks.style.color =
            remarks === "Passed" ? "#4ade80" : "#f87171";

        // SHOW the results
        results.hidden = false;
    });

    // Show an error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
        results.hidden = true;
    }

    // Clear button
    clearBtn.addEventListener("click", function () {

        // Reset all input fields
        gradeForm.reset();

        // Hide results and errors
        results.hidden = true;
        errorMessage.hidden = true;
        errorMessage.textContent = "";

        // Remove all old result values
        document.getElementById("resultName").textContent = "";
        document.getElementById("resultPrelim").textContent = "";
        document.getElementById("resultMidterm").textContent = "";
        document.getElementById("resultFinal").textContent = "";
        document.getElementById("resultAverage").textContent = "";

        const resultRemarks = document.getElementById("resultRemarks");
        resultRemarks.textContent = "";
        resultRemarks.style.color = "";
    });

});
