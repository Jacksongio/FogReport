import type { BriefingData } from "@/components/political-advisor/types";

export function printBriefing(briefingData: BriefingData) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Intelligence Briefing</title>
        <style>
          body { font-family: 'Courier New', monospace; margin: 2cm; line-height: 1.8; font-size: 12px; }
          .classification { float: left; font-weight: bold; font-size: 10px; }
          .date { float: right; font-size: 10px; }
          .title { font-weight: bold; margin: 2em 0 1em 0; font-size: 14px; }
          .section { margin: 1em 0; text-align: justify; }
          .point { font-weight: bold; display: inline-block; width: 30px; vertical-align: top; }
          .conclusion { margin: 2em 0; text-align: justify; }
          .recommendations { margin: 1em 0; }
          .signature { text-align: right; margin-top: 3em; font-size: 10px; }
        </style>
      </head>
      <body>
        <div class="classification">${briefingData.classification}</div>
        <div class="date">${briefingData.date}<br/>${briefingData.author}</div>
        <div style="clear: both;"></div>
        <div class="title">${briefingData.title}</div>
        ${briefingData.sections
          .map(
            (s) => `
          <div class="section">
            <span class="point">${s.point}</span>${s.content}
          </div>
        `,
          )
          .join("")}
        <div class="conclusion">${briefingData.conclusion}</div>
        <p><strong>Therefore it seems to me a more aggressive action is indicated than any heretofore considered, and should be patterned along the following lines:</strong></p>
        <div class="recommendations">
          ${briefingData.recommendations
            .map(
              (r, i) => `
            <div class="section">
              <span class="point">(${i + 1})</span>${r}
            </div>
          `,
            )
            .join("")}
        </div>
        <div style="margin-top: 2em; padding: 1em; border: 1px solid #999; background-color: #f5f5f5;">
          <p style="font-size: 10px; line-height: 1.4; margin: 0;"><strong>DISCLAIMER:</strong> This briefing is AI-generated content created for educational and simulation purposes only. This analysis should NOT be used as the basis for any real-world military, diplomatic, or policy decisions. Any actual strategic planning or crisis response should involve consultation with qualified professionals, subject matter experts, and appropriate government authorities. The scenarios, recommendations, and assessments presented herein are hypothetical and do not reflect official government positions or classified intelligence.</p>
        </div>
        <div class="signature">
          <p>${briefingData.author}</p>
          <p>Generated: ${new Date().toLocaleString()}</p>
        </div>
        ${
          briefingData.disclaimer
            ? `
          <div style="margin-top: 2em; padding: 1em; border: 1px solid #999; background-color: #f5f5f5;">
            <p style="font-size: 10px; line-height: 1.4; margin: 0;"><strong>DISCLAIMER:</strong> ${briefingData.disclaimer}</p>
          </div>
        `
            : ""
        }
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

export function buildBriefingText(briefingData: BriefingData): string {
  const sections = briefingData.sections
    .map((s) => `${s.point} ${s.content}`)
    .join("\n\n");
  const recommendations = briefingData.recommendations
    .map((r, i) => `(${i + 1}) ${r}`)
    .join("\n\n");

  const disclaimerBlock = briefingData.disclaimer
    ? `\n\n---\nDISCLAIMER: ${briefingData.disclaimer}\n`
    : "";

  return `${briefingData.classification}
${briefingData.date}

${briefingData.title}

${sections}

${briefingData.conclusion}

Therefore it seems to me a more aggressive action is indicated than any heretofore considered, and should be patterned along the following lines:

${recommendations}

${briefingData.finalRecommendation ?? ""}

---
DISCLAIMER: This briefing is AI-generated content created for educational and simulation purposes only. This analysis should NOT be used as the basis for any real-world military, diplomatic, or policy decisions. Any actual strategic planning or crisis response should involve consultation with qualified professionals, subject matter experts, and appropriate government authorities. The scenarios, recommendations, and assessments presented herein are hypothetical and do not reflect official government positions or classified intelligence.

${briefingData.author}
Generated: ${new Date().toLocaleString()}${disclaimerBlock}`.trim();
}
