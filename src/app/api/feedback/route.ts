import { currentUser } from '@clerk/nextjs';
import nodemailer from 'nodemailer';

export async function POST(req: Request, res: Response) {
    try {

        const user = await currentUser();

        if (!user) {
            return Response.json({ error: "You must be logged in to submit feedback" }, { status: 401 });
        }

        const email = user?.emailAddresses[0].emailAddress;

        const body = await req.json();

        const { text } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sihasaneshreyas@gmail.com", // Enter here email address from which you want to send emails
                pass: process.env.NODEMAILER_PASSWORD, // Enter here password for email account from which you want to send emails
            },
        });

        const mailOptions = {
            from: email,
            to: "sihasaneshreyas@gmail.com", // Enter here email address on which you want to send emails
            subject: `Feedback from ${email} by ${user?.firstName}`,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);

        return Response.json({ message: "Feedback sent successfully", info }, { status: 200 });
    } catch (error) {
        console.log("Failed to send feedback: ", error);
        return Response.json({ error }, { status: 500 });
    }
};
