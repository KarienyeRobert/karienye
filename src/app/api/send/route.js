import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
    const { email, subject, message } = await req.json();

    try {
        // Send email to the admin
        const adminEmail = await resend.emails.send({
            from: fromEmail,
            to: [fromEmail], // Only send to the admin email
            subject: `New Message: ${subject} from ${email}`,
            react: (
                <div>
                    <h1>New message from {email}</h1>
                    <p>{message}</p>
                </div>
            ),
        });

        // Send confirmation email to the user
        const confirmationEmail = await resend.emails.send({
            from: fromEmail,
            to: [email], // Send to the user
            subject: `Thank you for contacting us!`,
            react: (
                <div>
                    <h1>Thank you for reaching out!</h1>
                    <p>We’ve received your message:</p>
                    <blockquote>{message}</blockquote>
                    <p>Our team will get back to you soon.</p>
                </div>
            ),
        });

        // Log and return success response
        console.log('Admin email sent:', adminEmail);
        console.log('Confirmation email sent:', confirmationEmail);
        return NextResponse.json({ adminEmail, confirmationEmail });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message });
    }
}
