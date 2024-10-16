document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        uploadImage(file);
    }
});

async function uploadImage(file) {
    const status = document.getElementById('status');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const compressedImageSection = document.getElementById('compressedImageSection');
    const compressedImageContainer = document.getElementById('compressedImageContainer');
    const downloadLink = document.getElementById('downloadLink');

    status.textContent = "Uploading...";
    status.classList.remove('success', 'error');
    progressBarContainer.style.display = "block";
    progressBar.style.width = "0";
    compressedImageSection.style.display = "none";  // Hide the compressed image section until upload is complete

    const formData = new FormData();
    formData.append('file', file);

   
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
            onprogress: updateProgress
        });

        const data = await response.json();
        if (response.ok) {
            status.textContent = "Image uploaded successfully! Fetching compressed image...";
            status.classList.add('success');

            // Use the exact file name with the timestamp returned by the backend
            const fileName = data.fileName;  // This will be something like "1729057179759_srk-min.jpg"

            // Fetch the compressed image using the correct file name
            await displayCompressedImage(fileName);  // Pass the renamed file name to fetch the compressed image
        } else {
            status.textContent = "Upload failed: " + data.message;
            status.classList.add('error');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        status.textContent = "Error uploading image.";
        status.classList.add('error');
    }

}

function updateProgress(event) {
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = percentComplete + "%";
    }
}

// Image Preview Function
function previewFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');

    const reader = new FileReader();
    reader.onload = function (e) {
        previewContainer.style.display = 'block';
        previewImage.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewContainer.style.display = 'none';
    }
}




async function displayCompressedImage(imageKey) {
    const status = document.getElementById('status');
    
    console.log('Fetching compressed image with key:', imageKey);  // Debugging

    try {
        const response = await fetch(`/get-compressed-image/${imageKey}`);
        if (response.ok) {
            const imageUrl = URL.createObjectURL(await response.blob());
            const compressedImage = document.getElementById('compressedImage');
            compressedImage.src = imageUrl;
            compressedImage.style.display = 'block';  // Make sure the image is visible
            status.textContent = "Compressed image fetched successfully!";
        } else {
            status.textContent = "Failed to fetch compressed image";
        }
    } catch (error) {
        console.error('Error fetching compressed image:', error);
        status.textContent = "Error fetching compressed image.";
    }
}

