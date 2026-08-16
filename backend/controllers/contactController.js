export const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Log the message to the server console so you can still see them in Render logs
    console.log("--- NEW CONTACT MESSAGE ---");
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("---------------------------");

    // Return success immediately to the frontend
    res.status(200).json({ 
        success: true, 
        msg: "Thank you! Your message has been sent successfully." 
    });
};
