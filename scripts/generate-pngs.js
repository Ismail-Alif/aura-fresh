const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const brandAssetsDir = path.join(__dirname, "..", "brand-assets");
const publicAssetsDir = path.join(__dirname, "..", "public", "brand-assets");

const conversions = [
  {
    input: "aurafresh-facebook-avatar.svg",
    output: "aurafresh-facebook-avatar.png",
    width: 800,
    height: 800,
  },
  {
    input: "aurafresh-facebook-cover.svg",
    output: "aurafresh-facebook-cover.png",
    width: 1640,
    height: 624,
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

async function convertAll() {
  for (const item of conversions) {
    const srcPath = path.join(brandAssetsDir, item.input);
    if (!fs.existsSync(srcPath)) {
      console.warn("File not found:", srcPath);
      continue;
    }

    const svgBuffer = fs.readFileSync(srcPath);

    // Save to brand-assets/
    const targetPath1 = path.join(brandAssetsDir, item.output);
    await sharp(svgBuffer, { density: 300 })
      .resize(item.width, item.height)
      .png({ quality: 100 })
      .toFile(targetPath1);

    console.log(`✓ Created: ${targetPath1} (${item.width}x${item.height})`);

    // Save copy to public/brand-assets/
    const targetPath2 = path.join(publicAssetsDir, item.output);
    fs.copyFileSync(targetPath1, targetPath2);
  }

  // Also make sure public/logo.png exists
  const logoPrimaryPng = path.join(publicAssetsDir, "aurafresh-logo-primary.png");
  if (fs.existsSync(logoPrimaryPng)) {
    fs.copyFileSync(logoPrimaryPng, path.join(__dirname, "..", "public", "logo.png"));
    console.log("✓ Updated: public/logo.png");
  }
}

convertAll()
  .then(() => console.log("All PNG conversions completed successfully!"))
  .catch((err) => console.error("Error during conversion:", err));
