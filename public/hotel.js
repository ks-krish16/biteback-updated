// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("uploadForm");
    
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Form submission started");

        const username = localStorage.getItem("username");
        if (!username) {
            alert("Please login first");
            return;
        }

        try {
            const formData = new FormData(form);
            formData.append("user", username); // Add username separately
            
            console.log("Form data:", [...formData.entries()]);

            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Success:", result);
            alert("Upload successful!");
            window.location.href = "/postDetailsPage";
            
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed: " + error.message);
        }
    });
});