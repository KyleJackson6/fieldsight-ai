export function reportReadyEmail(name) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f8f2; padding: 30px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #d1d5db;">
        <div style="background-color: #1b5e20; color: white; padding: 25px; text-align: center;">
          <h1 style="margin: 0;">FieldSight AI</h1>
          <p style="margin: 8px 0 0;">Your latest field report is ready</p>
        </div>

        <div style="padding: 30px;">
          <h2 style="color: #1b5e20;">Hello ${name},</h2>
          <p>Your field analysis report is now ready to view.</p>
          <p>You can review updated AI insights related to drainage conditions, crop health, and field performance.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/reports"
               style="background-color: #2e7d32; color: white; text-decoration: none; padding: 14px 24px; border-radius: 6px; display: inline-block; font-weight: bold;">
              View Report
            </a>
          </div>
        </div>

        <div style="background-color: #f3f4f6; padding: 18px; text-align: center; font-size: 14px; color: #6b7280;">
          FieldSight AI © 2026<br/>
          Automated report notification
        </div>
      </div>
    </div>
  `;
}