export function welcomeEmail(name) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f8f2; padding: 30px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #d1d5db;">
        <div style="background-color: #1b5e20; color: white; padding: 25px; text-align: center;">
          <h1 style="margin: 0;">FieldSight AI</h1>
          <p style="margin: 8px 0 0;">Smarter farming through AI-powered field insights</p>
        </div>

        <div style="padding: 30px;">
          <h2 style="color: #1b5e20;">Welcome, ${name}!</h2>
          <p>Thank you for joining FieldSight AI.</p>
          <p>Our platform helps farmers and agricultural users monitor field conditions, detect drainage problems, identify crop stress, and gain better insights through AI-powered analysis.</p>
          <p>You can now start exploring features like:</p>
          <ul>
            <li>Drainage issue detection</li>
            <li>Crop health monitoring</li>
            <li>AI-generated field reports</li>
            <li>Smarter field decision-making</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000"
               style="background-color: #2e7d32; color: white; text-decoration: none; padding: 14px 24px; border-radius: 6px; display: inline-block; font-weight: bold;">
              View Your Dashboard
            </a>
          </div>
        </div>

        <div style="background-color: #f3f4f6; padding: 18px; text-align: center; font-size: 14px; color: #6b7280;">
          FieldSight AI © 2026<br/>
          Helping farmers make smarter decisions with AI
        </div>
      </div>
    </div>
  `;
}