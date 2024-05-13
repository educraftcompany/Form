// Global variable to store the selected product's image URL
let selectedProductImageUrl = "";

// Function to get the selected product image URL
const getProductImageUrl = () => {
    const productSelection = document.querySelector("#productSelection");
    const selectedOption = productSelection.options[productSelection.selectedIndex];
    const selectedProduct = selectedOption.value;

    // Set the selected product image URL based on the selected option
    switch (selectedProduct) {
        case "c++":
            selectedProductImageUrl = "Basic Programming with c++";
            break;
        case "python":
            selectedProductImageUrl = "Basic of Python";
            break;
        case "flutter":
        selectedProductImageUrl = "Flutter";
            break;
        case "ui-ux":
            selectedProductImageUrl = "UI UX";
            break;
        case "odoo-developer":
            selectedProductImageUrl = "Odoo Developer";
            break;
        case "odoo-functionl":
            selectedProductImageUrl = "Odoo Functional";
            break;
        default:
            selectedProductImageUrl = ""; // Default to empty if no match
            break;
    }
};

// Function to construct the email message
const getEmailMessage = ({ name, email, phone, academy_year, address, selectedProductImageUrl } = {}) => {
    return `
        <p>You Have Received A New Message From Bionimaroc Measuring Devices:</p>
        <div style="background-color: #101010; color: #fbfbfb; padding: 12px">
            <p style="margin: 0;">Name: ${name}</p>
            <p style="margin: 0;">Email: ${email}</p>
            <p style="margin: 12px 0;">Phone: ${phone}</p>
            <p style="margin: 12px 0;">Academy year: ${academy_year}</p>
            <p style="margin: 12px 0;">Address: ${address}</p>
            <p style="margin: 12px 0;">Selected Course : ${selectedProductImageUrl}</p>
        </div>
    `;
};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".php-email-form");
    const fullNameInput = document.querySelector("#fullname");
    const phoneInput = document.querySelector("#phone");
    const emailInput = document.querySelector("#email");
    const academyYear = document.querySelector("#academy_year");
    const addressInput = document.querySelector("#address");
    const formMessageDiv = document.querySelector("#formMessage");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the selected product image URL
        getProductImageUrl();

        // Construct the email message
        const emailMessage = getEmailMessage({
            name: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            phone: academyYear.value,
            address: addressInput.value,
            selectedProductImageUrl: selectedProductImageUrl
        });

        // Send the email
        fetch("https://sendmail-api-docs.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify({
                to: "solutioneducraft@gmail.com",
                subject: "EduCraft Courses",
                message: emailMessage,
            }),
        })
        .then(response => response.json())
        .then(data => {
            contactForm.reset();
            formMessageDiv.innerHTML = '<p style="color: green;">تم التسجيل بنجاح. سيتم التواصل معك الان</p>';
            setTimeout(() => {
                formMessageDiv.innerHTML = '';
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            formMessageDiv.innerHTML = '<p style="color: red;">عذرا حدث خطأ قم بالمحاوله مره اخرى بعد دقائق</p>';
            setTimeout(() => {
                formMessageDiv.innerHTML = '';
            }, 5000);
        });
    });
});
