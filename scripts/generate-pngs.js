const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");

const brandAssetsDir = path.join(__dirname, "..", "brand-assets");
const publicAssetsDir = path.join(__dirname, "..", "public", "brand-assets");

const sharpConversions = [
  {
    input: "aurafresh-facebook-avatar.svg",
    output: "aurafresh-facebook-avatar.png",
    width: 800,
    height: 800,
  },
  {
    input: "aurafresh-symbol-mark.svg",
    output: "aurafresh-symbol-mark.png",
    width: 1000,
    height: 1000,
  },
  {
    input: "aurafresh-logo-primary.svg",
    output: "aurafresh-logo-primary.png",
    width: 1380, // 3x sharp
    height: 300,
  },
  {
    input: "aurafresh-logo-dark.svg",
    output: "aurafresh-logo-dark.png",
    width: 1380, // 3x sharp
    height: 300,
  },
  {
    input: "aurafresh-product-seal.svg",
    output: "aurafresh-product-seal.png",
    width: 1000, // 2x sharp
    height: 1000,
  },
];

async function renderCoverWithPuppeteer() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1640, height: 624, deviceScaleFactor: 1 });

  const html = `
  <!DOCTYPE html>
  <html lang="bn">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.maateen.me/solaiman-lipi/font.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&display=swap">
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        width: 1640px;
        height: 624px;
        overflow: hidden;
        background: radial-gradient(circle at 50% 45%, #064e3b 0%, #022c22 65%, #011b15 100%);
        font-family: 'SolaimanLipi', sans-serif;
        color: #ffffff;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .bg-ring {
        position: absolute;
        border-radius: 50%;
        border: 1.5px solid rgba(52, 211, 153, 0.12);
        pointer-events: none;
      }
      .ring-1 { width: 500px; height: 500px; }
      .ring-2 { width: 750px; height: 750px; border-style: dashed; }
      .ring-3 { width: 1050px; height: 1050px; border-color: rgba(52, 211, 153, 0.07); }
      .glow-spot {
        position: absolute;
        width: 600px;
        height: 350px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(2, 44, 34, 0) 70%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .safe-container {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 1000px;
        padding: 0 20px;
      }
      .top-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(4, 47, 46, 0.9);
        border: 1.5px solid #10b981;
        color: #34d399;
        font-size: 17px;
        font-weight: 700;
        padding: 7px 24px;
        border-radius: 9999px;
        margin-bottom: 22px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
      .logo-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 14px;
      }
      .logo-row svg {
        width: 68px;
        height: 68px;
        filter: drop-shadow(0 0 16px rgba(52, 211, 153, 0.4));
      }
      .logo-text {
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        font-weight: 900;
        font-size: 72px;
        color: #ffffff;
        letter-spacing: -1.5px;
        line-height: 1;
      }
      .logo-text span {
        color: #34d399;
      }
      .tagline {
        font-size: 27px;
        font-weight: 700;
        color: #f1f5f9;
        letter-spacing: 0.5px;
        margin-bottom: 26px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      }
      .badges-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        flex-wrap: nowrap;
      }
      .badge-item {
        background: rgba(6, 78, 59, 0.85);
        border: 1.2px solid #059669;
        color: #a7f3d0;
        font-size: 16px;
        font-weight: 700;
        padding: 9px 22px;
        border-radius: 12px;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.3px;
      }
    </style>
  </head>
  <body>
    <div class="glow-spot"></div>
    <div class="bg-ring ring-1"></div>
    <div class="bg-ring ring-2"></div>
    <div class="bg-ring ring-3"></div>

    <div class="safe-container">
      <div class="top-pill">
        🌿 প্রাকৃতিক সুরক্ষা ও সতেজতা
      </div>

      <div class="logo-row">
        <svg viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="42" cy="42" r="38" stroke="url(#shieldGrad)" stroke-width="4.5" stroke-dasharray="190 35" stroke-linecap="round"/>
          <circle cx="42" cy="42" r="28" stroke="#34d399" stroke-width="1.8" opacity="0.4" stroke-dasharray="8 6"/>
          <path d="M 42 16 C 56 28, 58 48, 42 62 C 26 48, 28 28, 42 16 Z" fill="url(#shieldGrad)"/>
          <path d="M 42 24 L 42 56" stroke="#022c22" stroke-width="3" stroke-linecap="round"/>
          <path d="M 42 36 L 49 31" stroke="#022c22" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M 42 43 L 35 38" stroke="#022c22" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="70" cy="14" r="3.5" fill="#34d399" />
          <circle cx="14" cy="66" r="2.5" fill="#6ee7b7" />
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="84" y2="84" gradientUnits="userSpaceOnUse">
              <stop stop-color="#34d399" />
              <stop offset="0.5" stop-color="#10b981" />
              <stop offset="1" stop-color="#059669" />
            </linearGradient>
          </defs>
        </svg>

        <h1 class="logo-text">Aura<span>Fresh</span></h1>
      </div>

      <p class="tagline">আপনার ঘরের বিশুদ্ধ ও সুরক্ষিত আবাসন</p>

      <div class="badges-row">
        <div class="badge-item">✔ ১০০% বায়ো-সেফ</div>
        <div class="badge-item">✔ কেমিক্যালমুক্ত সুরক্ষা</div>
        <div class="badge-item">✔ দীর্ঘস্থায়ী সতেজতা</div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });

  const coverOutPath = path.join(brandAssetsDir, "aurafresh-facebook-cover.png");
  await page.screenshot({ path: coverOutPath, type: "png" });

  const publicCoverOutPath = path.join(publicAssetsDir, "aurafresh-facebook-cover.png");
  fs.copyFileSync(coverOutPath, publicCoverOutPath);

  console.log(`✓ Created: ${coverOutPath} (1640x624 with authentic SolaimanLipi)`);
  await browser.close();
}

async function convertAll() {
  // 1. Sharp conversions for vector marks
  for (const item of sharpConversions) {
    const srcPath = path.join(brandAssetsDir, item.input);
    if (!fs.existsSync(srcPath)) {
      console.warn("File not found:", srcPath);
      continue;
    }

    const svgBuffer = fs.readFileSync(srcPath);

    const targetPath1 = path.join(brandAssetsDir, item.output);
    await sharp(svgBuffer, { density: 300 })
      .resize(item.width, item.height)
      .png({ quality: 100 })
      .toFile(targetPath1);

    console.log(`✓ Created: ${targetPath1} (${item.width}x${item.height})`);

    const targetPath2 = path.join(publicAssetsDir, item.output);
    fs.copyFileSync(targetPath1, targetPath2);
  }

  // 2. Puppeteer conversion for Facebook Cover (Authentic SolaimanLipi Font)
  await renderCoverWithPuppeteer();

  // 3. Make sure public/logo.png exists
  const logoPrimaryPng = path.join(publicAssetsDir, "aurafresh-logo-primary.png");
  if (fs.existsSync(logoPrimaryPng)) {
    fs.copyFileSync(logoPrimaryPng, path.join(__dirname, "..", "public", "logo.png"));
    console.log("✓ Updated: public/logo.png");
  }
}

convertAll()
  .then(() => console.log("All brand assets regenerated successfully!"))
  .catch((err) => console.error("Error during conversion:", err));
