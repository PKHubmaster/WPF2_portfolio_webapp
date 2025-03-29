import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { employerName, employerEmail } = await request.json();

    // Respond immediately while processing the email in the background
    setTimeout(async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: employerEmail,
          subject: '🚀 Exclusive Invitation: Try Our Talent Acquisition System for Free!',
          text: `Hello ${employerName},

We're excited to invite you to experience our cutting-edge Talent Acquisition System—designed to streamline hiring, connect you with top candidates, and boost your recruitment efficiency.

🚀 Why try it?
✔️ Find the right talent faster
✔️ Simplify your hiring process
✔️ Gain insights with smart analytics

Join industry leaders who are transforming their talent acquisition strategy!

👉 Click here to sign up and start for free: https://wpf-2-test02-pkvercelusers-projects.vercel.app/

We look forward to helping you build your dream team!

Best regards,  
The HR Talent Team`,
        };

        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }, 100);

    return NextResponse.json({ message: 'Processing request. Email will be sent shortly.' });
  } catch (error) {
    console.error('Error initiating email process:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
