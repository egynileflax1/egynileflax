import { COMPANY } from "@/data/initialData";

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export interface BuildB2BEmailInput {
  toName?: string;
  subject: string;
  message: string;
  includeSignature?: boolean;
}

export function buildB2BEmailContent({
  toName,
  subject,
  message,
  includeSignature = true,
}: BuildB2BEmailInput): { html: string; text: string } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://egynileflax.com";
  const cleanMessage = message.trim();

  const signatureText = includeSignature
    ? [
        "",
        "---",
        `${COMPANY.brandName}`,
        "Tanta, Gharbia, Egypt • ISO 9001:2015 Certified",
        `Email: ${COMPANY.primaryEmail}`,
        `Tel / WhatsApp: ${COMPANY.egyptPhone1} | ${COMPANY.egyptPhone2}`,
        `Web: ${siteUrl}`,
      ].join("\n")
    : "";

  const text = `${cleanMessage}${signatureText}`;

  const paragraphsHtml = cleanMessage
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px 0;line-height:1.65;color:#1c1917;font-size:15px;">${escapeHtml(block).replace(/\n/g, "<br />")}</p>`
    )
    .join("");

  const signatureHtml = includeSignature
    ? `
      <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e7e5e4;">
        <div style="font-weight:700;font-size:14px;color:#3F166B;">${escapeHtml(COMPANY.brandName)}</div>
        <div style="font-size:12px;color:#57534e;margin-top:2px;">
          Tanta, Gharbia, Egypt &bull; ISO 9001:2015 Certified &bull; Textile Export Council (TEC)
        </div>
        <div style="font-size:12px;color:#44403c;margin-top:8px;line-height:1.6;">
          Email: <a href="mailto:${escapeHtml(COMPANY.primaryEmail)}" style="color:#3F166B;text-decoration:none;font-weight:600;">${escapeHtml(COMPANY.primaryEmail)}</a><br />
          Tel / WhatsApp: ${escapeHtml(COMPANY.egyptPhone1)} &bull; ${escapeHtml(COMPANY.egyptPhone2)}<br />
          Website: <a href="${escapeHtml(siteUrl)}" style="color:#3F166B;text-decoration:none;font-weight:600;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
        </div>
      </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:24px 12px;background-color:#FAF8F5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1c1917;">
    <div style="max-width:620px;margin:0 auto;background-color:#ffffff;border:1px solid #e7e5e4;border-radius:16px;overflow:hidden;">
      <div style="background-color:#3F166B;padding:18px 24px;border-bottom:3px solid #EDC271;">
        <div style="font-size:16px;font-weight:800;letter-spacing:0.02em;color:#EDC271;">
          ${escapeHtml(COMPANY.brandName.toUpperCase())}
        </div>
        <div style="font-size:11px;color:#f5f5f4;opacity:0.9;margin-top:2px;">
          Egyptian Flax Fibre Processing &amp; Global Export &bull; Since 2008
        </div>
      </div>
      <div style="padding:26px 24px;">
        ${toName ? `<div style="font-size:12px;color:#78716c;margin-bottom:14px;">To: <strong style="color:#1c1917;">${escapeHtml(toName)}</strong></div>` : ""}
        ${paragraphsHtml}
        ${signatureHtml}
      </div>
    </div>
  </body>
</html>`;

  return { html, text };
}
