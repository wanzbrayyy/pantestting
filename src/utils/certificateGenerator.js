export const generateCertificate = async (canvas, userName, courseName, profilePicUrl) => {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    const template = new Image();
    template.crossOrigin = "Anonymous";
    template.src = '/images/sertifikat.png';

    template.onload = () => {
      canvas.width = template.width;
      canvas.height = template.height;
      ctx.drawImage(template, 0, 0);

      // Draw User Name
      ctx.font = 'bold 60px "Times New Roman"';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(userName, canvas.width / 2, 450);

      // Draw Course Name
      ctx.font = 'italic 40px "Times New Roman"';
      ctx.fillStyle = '#555';
      ctx.fillText(courseName, canvas.width / 2, 550);
      
      // Draw Date
      ctx.font = '20px "Times New Roman"';
      ctx.fillStyle = '#555';
      ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), canvas.width / 2, 650);

      // Draw Profile Picture
      if (profilePicUrl) {
        const profilePic = new Image();
        profilePic.crossOrigin = "Anonymous";
        profilePic.src = profilePicUrl;
        profilePic.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(150, 150, 80, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(profilePic, 70, 70, 160, 160);
          ctx.restore();
          resolve(canvas.toDataURL('image/png'));
        };
        profilePic.onerror = (err) => {
            console.error("Profile picture could not be loaded for canvas.", err);
            resolve(canvas.toDataURL('image/png'));
        };
      } else {
        resolve(canvas.toDataURL('image/png'));
      }
    };
    template.onerror = (err) => {
        console.error("Certificate template could not be loaded.", err);
        reject(err);
    };
  });
};