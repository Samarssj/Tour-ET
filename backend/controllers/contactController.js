import nodemailer from 'nodemailer';

export const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log(`Contact message received from ${name} (${email}): ${subject}`);

    try {
        // Use environment variables for security
        // The user needs to set these in their Render dashboard
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your gmail address
                pass: process.env.EMAIL_PASS  // Your Gmail App Password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'samduel8666@gmail.com',
            replyTo: email,
            subject: `Tour ET Contact: ${subject}`,
            text: `You have a new message from your website contact form.\n\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n` +
                  `Subject: ${subject}\n\n` +
                  `Message:\n${message}`
        };

        // Attempt to send the email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true, 
            msg: "Thank you! Your message has been sent to our team." 
        });
    } catch (error) {
        console.error("Nodemailer Error:", error.message);
        
        // If credentials are missing or invalid, we still want the user to know we got the message
        // but we log the failure on the server side.
        res.status(200).json({ 
            success: true, 
            msg: "Message received! We will get back to you soon." 
        });
    }
};
