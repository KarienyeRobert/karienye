import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const fromEmail = process.env.FROM_EMAIL; // Your verified email address
const smtpHost = process.env.SMTP_HOST; // SMTP host (e.g., smtp.gmail.com)
const smtpPort = process.env.SMTP_PORT; // SMTP port (e.g., 587)
const smtpUser = process.env.SMTP_USER; // SMTP user (email for login)
const smtpPass = process.env.SMTP_PASS; // SMTP password or app-specific password

export async function POST(req, res) {
    const { email, subject, message } = await req.json();

    try {
        // Create a transporter for Nodemailer
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const adminEmail = await transporter.sendMail({
            from: `"Karienye" <${fromEmail}>`,
            to: fromEmail,
            subject: `New Message: ${subject}`,
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f4f4f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #444; font-size: 24px; margin-bottom: 10px;">You've received a new message!</h1>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 10px 0;" />
            <p style="margin: 10px 0; font-size: 16px;"><strong>From:</strong> <a href="mailto:${email}" style="color: #1e90ff;">${email}</a></p>
            <p style="margin: 10px 0; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 20px 0; font-size: 16px; color: #555; background: #fafafa; padding: 15px; border-left: 4px solid #1e90ff; border-radius: 5px;">
                ${message}
            </p>
        </div>
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #888;">
            <p>Sent via Karienye Portfolio Website</p>
        </footer>
    </div>
`,

        });

        const confirmationEmail = await transporter.sendMail({
            from: `"Karienye Robert" <${fromEmail}>`,
            to: email,
            subject: `Thank you for contacting us!`,
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f9f9fc; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #444; font-size: 24px; margin-bottom: 10px;">Thank you for reaching out!</h1>
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
                We’ve received your message, and our team will review it shortly and get back to you.
            </p>
            <div style="background: #fefefe; padding: 15px; border-left: 4px solid #4caf50; margin-bottom: 20px; border-radius: 5px;">
                <blockquote style="margin: 0; font-size: 16px; color: #666;">
                    <em>${message}</em>
                </blockquote>
            </div>
            <p style="font-size: 16px; margin-bottom: 20px;">
                If you need to follow up, please don’t hesitate to reply to this email.
            </p>
            <p style="font-size: 16px;">Best regards,</p>
            <br>
            <p style="font-size: 16px; font-weight: bold; color: #333;">Karienye Robert</p>
        </div>
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #888;">
            <p>Karienye Contact Team</p>
        </footer>
    </div>
`,

        });

        // Return a success response
        return NextResponse.json({ adminEmail, confirmationEmail });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: error.message });
    }
}
