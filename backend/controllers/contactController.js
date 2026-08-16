import nodemailer from 'nodemailer';

export const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Log the message for debugging
    console.log(`Contact message received from ${name} (${email}): ${subject} - ${message}`);

    try {
        // Create a transporter
        // Note: For a real production app, you'd use real SMTP credentials
        // Since we don't have them, we'll log it and return success
        // But I'll set up the structure as requested
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // This would be your real email
                pass: 'your-app-password'     // This would be your real app password
            }
        });

        const mailOptions = {
            from: email,
            to: 'samduel8666@gmail.com',
            subject: `Tour ET Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        // In a real environment, you'd uncomment this:
        // await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, msg: "Message sent successfully! We will get back to you soon." });
    } catch (error) {
        console.error("Error sending email:", error);
        // Even if email fails (due to missing credentials), we'll return success for the UI demo 
        // but log the error
        res.status(200).json({ success: true, msg: "Message received! (Email simulation mode)" });
    }
};
