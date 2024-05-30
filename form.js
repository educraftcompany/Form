// Global variable to store the selected product's image URL
let selectedProductImageUrl = "";

// Function to get the selected product image URL
const getProductImageUrl = () => {
    const productSelection = document.querySelector("#productSelection");
    const selectedOption = productSelection.options[productSelection.selectedIndex];
    const selectedProduct = selectedOption.value;

    // Set the selected product image URL based on the selected option
    switch (selectedProduct) {
        case "scratch":
            selectedProductImageUrl = "Scratch Programming for Kids Course";
            break;
        case "python":
            selectedProductImageUrl = "Basic programming with Python";
            break;
        case "django":
            selectedProductImageUrl = "Full Stack Web Development with Django Diploma";
            break;
        case "flutter":
        selectedProductImageUrl = "Flutter Mobile App Development Diploma";
            break;
        case "wordpress":
            selectedProductImageUrl = "WordPress Website Development Diploma";
                break;
        case "ui-ux":
            selectedProductImageUrl = "UI/UX Design Fundamentals Course";
            break;
        case "odoo-developer":
            selectedProductImageUrl = "Technical Odoo Development Diploma";
            break;
        default:
            selectedProductImageUrl = ""; // Default to empty if no match
            break;
    }
};

// Function to construct the email message
const getEmailMessage = ({ name, email, phone, whatsapp, address, selectedProductImageUrl } = {}) => {
    return `
        <p>You Have Received A New Message From EduCraft Academy:</p>
        <div style="background-color: #101010; color: #fbfbfb; padding: 12px">
            <p style="margin: 0;">Name: ${name}</p>
            <p style="margin: 0;">Email: ${email}</p>
            <p style="margin: 12px 0;">Phone number: ${phone}</p>
            <p style="margin: 12px 0;">Whatsapp number: ${whatsapp}</p>
            <p style="margin: 12px 0;">Address: ${address}</p>
            <p style="margin: 12px 0;">Selected : ${selectedProductImageUrl}</p>
        </div>
    `;
};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".php-email-form");
    const fullNameInput = document.querySelector("#fullname");
    const phoneInput = document.querySelector("#phone");
    const emailInput = document.querySelector("#email");
    const whatsapp = document.querySelector("#whatsapp");
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
            whatsapp: whatsapp.value,
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
