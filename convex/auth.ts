import { Email } from "@convex-dev/auth/providers/Email";
import { Password } from "@convex-dev/auth/providers/Password";
import { Resend } from "resend";
import { convexAuth } from "@convex-dev/auth/server";

const ResendResetOTP = Email({
  id: "password-reset",
  maxAge: 15 * 60, // 15 minutes
  async generateVerificationToken() {
    const code = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");
    return code;
  },
  async sendVerificationRequest({
    identifier: email,
    token,
  }: {
    identifier: string;
    token: string;
  }) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const digits = token.split("");
    const digitBoxes = digits
      .map(
        (d) => `
      <td style="padding: 0 4px;">
        <div style="
          width: 48px;
          height: 56px;
          background: linear-gradient(180deg, #1a1a1a 0%, #111111 100%);
          border: 2px solid #cf5c36;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 56px;
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
          box-shadow: 0 0 12px rgba(207, 92, 54, 0.3), inset 0 1px 0 rgba(255,255,255,0.05);
        ">${d}</div>
      </td>`,
      )
      .join("");

    const { error } = await resend.emails.send({
      from: "FogReport <support@giotech.ai>",
      to: [email],
      subject: "Your FogReport verification code",
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="
          background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
          border: 1px solid #1f1f1f;
          border-radius: 16px;
          overflow: hidden;
          max-width: 520px;
          width: 100%;
        ">
          <!-- Top accent bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, transparent, #cf5c36, transparent);"></td>
          </tr>

          <!-- Logo & header -->
          <tr>
            <td style="padding: 40px 40px 0 40px; text-align: center;">
              <img
                src="${process.env.SITE_URL ?? "https://www.fogreport.io"}/fogreport.png"
                alt="FogReport"
                width="64"
                height="64"
                style="
                  display: inline-block;
                  width: 64px;
                  height: 64px;
                  border-radius: 14px;
                  object-fit: contain;
                  box-shadow: 0 4px 16px rgba(207, 92, 54, 0.3);
                "
              />
              <h1 style="
                color: #ffffff;
                font-size: 22px;
                font-weight: 700;
                margin: 20px 0 0 0;
                letter-spacing: -0.3px;
              ">Password Reset</h1>
              <p style="
                color: #6b7280;
                font-size: 15px;
                line-height: 1.5;
                margin: 8px 0 0 0;
              ">
                We received a request to reset the password for your FogReport account.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, #1f1f1f, transparent);"></div>
            </td>
          </tr>

          <!-- Code section -->
          <tr>
            <td style="padding: 0 40px; text-align: center;">
              <p style="
                color: #9ca3af;
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin: 0 0 16px 0;
              ">Verification Code</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  ${digitBoxes}
                </tr>
              </table>
              <p style="
                color: #6b7280;
                font-size: 13px;
                margin: 16px 0 0 0;
              ">
                Enter this code to set your new password
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, #1f1f1f, transparent);"></div>
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="padding: 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="
                background: rgba(207, 92, 54, 0.06);
                border: 1px solid rgba(207, 92, 54, 0.15);
                border-radius: 10px;
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 0;">
                      <span style="color: #cf5c36; font-weight: 600;">Expires in 15 minutes.</span>
                      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px 36px 40px; text-align: center;">
              <p style="color: #3b3b3b; font-size: 12px; margin: 0; line-height: 1.5;">
                FogReport &mdash; Clarity in real-time through the Fog of War
              </p>
              <p style="color: #2a2a2a; font-size: 11px; margin: 8px 0 0 0;">
                This is an automated message. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
    if (error) {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ reset: ResendResetOTP })],
});
