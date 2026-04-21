import { Resend } from "resend";
import { formatPercent } from "@/lib/mockAnalysis";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, report } = await request.json();

    if (!email || !report) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { id, images, severity, affectedArea, recommendation, date } = report;

    // Resend dev testing allows sending from onboarding@resend.dev
    const result = await resend.emails.send({
      from: "FieldSight AI <onboarding@resend.dev>",
      to: [email],
      subject: `FieldSight AI Report Analysis - ${id}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <h2 style="color: #10b981; margin-bottom: 24px;">FieldSight AI Analysis Complete</h2>
          <p>Hello ${name || 'User'},</p>
          <p>Your requested field analysis data scan has successfully concluded. Below is a brief summary of our AI heuristics:</p>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Report ID:</strong> ${id}</p>
            <p style="margin: 0 0 8px 0;"><strong>Generated:</strong> ${date}</p>
            <p style="margin: 0 0 8px 0;"><strong>Photos Processed:</strong> ${images}</p>
            <p style="margin: 0 0 8px 0;"><strong>Risk Level:</strong> ${severity}</p>
            <p style="margin: 0 0 0 0;"><strong>Affected Pooling Area:</strong> ${formatPercent(affectedArea)}</p>
          </div>

          <p><strong>Recommendation:</strong><br />${recommendation || "No immediate action required."}</p>

          <a href="http://localhost:3000/reports/${id}" style="display: inline-block; background-color: #10b981; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin-top: 24px; font-weight: bold;">
            View the Mapped Report
          </a>

          <p style="color: #6b7280; font-size: 12px; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
            This is an automated notification from FieldSight AI. Designed to help field operators make analytically-driven drainage planning choices.
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
