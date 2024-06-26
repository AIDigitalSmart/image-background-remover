document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'ASWhfGiqDVaymGYCWKBH25Yr'; // Replace with your Remove.bg API key
    const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');
    const imageUpload = document.getElementById('imageUpload');
    const outputImage = document.getElementById('outputImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const arrangeSelect = document.getElementById('arrangeSelect');
  
    removeBackgroundBtn.addEventListener('click', function() {
      const file = imageUpload.files[0];
      if (!file) return alert('Please select an image file.');
  
      const formData = new FormData();
      formData.append('image_file', file);
  
      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY
        },
        body: formData
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to remove background.');
  
        return response.blob();
      })
      .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        outputImage.src = imgUrl;
        downloadBtn.disabled = false;
        downloadBtn.addEventListener('click', function() {
          const a = document.createElement('a');
          a.href = imgUrl;
          a.download = 'background_removed_image.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
  
        // Handle arrangement options
        const arrangement = arrangeSelect.value;
        applyImageArrangement(arrangement);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while removing the background.');
      });
    });
  
    function applyImageArrangement(arrangement) {
      switch (arrangement) {
        case 'center':
          outputImage.style.objectPosition = 'center center';
          outputImage.style.objectFit = 'none';
          break;
        case 'cover':
          outputImage.style.objectPosition = 'center center';
          outputImage.style.objectFit = 'cover';
          break;
        default:
          outputImage.style.objectPosition = 'initial';
          outputImage.style.objectFit = 'initial';
          break;
      }
    }
  
    arrangeSelect.addEventListener('change', function() {
      const arrangement = arrangeSelect.value;
      applyImageArrangement(arrangement);
    });
  });
  