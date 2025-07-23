import Jimp from 'jimp';

export const generateCertificate = async (userName, courseName, profilePicUrl) => {
  try {
    const templatePath = '/images/sertifikat.png';
    const template = await Jimp.read(templatePath);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const fontItalic = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const fontDate = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    template.print(font, 0, 420, {
      text: userName,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, template.bitmap.width, 0);

    template.print(fontItalic, 0, 530, {
      text: courseName,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, template.bitmap.width, 0);

    template.print(fontDate, 0, 630, {
        text: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, template.bitmap.width, 0);


    if (profilePicUrl) {
      try {
        const profilePic = await Jimp.read(profilePicUrl);
        profilePic.resize(160, 160);
        profilePic.circle();
        template.composite(profilePic, 70, 70);
      } catch (err) {
        console.error("Profile picture could not be loaded for jimp.", err);
      }
    }

    return await template.getBase64Async(Jimp.MIME_PNG);
  } catch (err) {
    console.error("Certificate generation failed:", err);
    throw err;
  }
};