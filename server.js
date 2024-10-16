const express = require('express');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Initialize express
const app = express();
app.use(express.static('public'));

// Multer setup to handle file uploads
const upload = multer({ dest: 'uploads/' });

app.get('/get-compressed-image/:key', async (req, res) => {
    const key = req.params.key;
    console.log("Fetching compressed image with key:", key);  // Log for debugging

    const params = {
        Bucket: 'studio-destination-bkt2',  // Destination bucket
        Key: key  // Ensure this is the correct file name (with timestamp)
    };

    try {
        const command = new GetObjectCommand(params);
        const response = await s3.send(command);

        if (response.Body) {
            response.Body.pipe(res);  // Send the image as the response
        } else {
            console.error('Image not found in bucket:', key);
            res.status(404).json({ message: 'Image not found in bucket.' });
        }
    } catch (error) {
        console.error('Error fetching compressed image:', error.message);
        res.status(500).json({ message: 'Error fetching compressed image', error: error.message });
    }
});


app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    try {
        const fileContent = fs.readFileSync(file.path);
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;  // This is the renamed file

        const params = {
            Bucket: 'studio-source-bkt1',  // Source bucket
            Key: fileName,                 // Key for the uploaded file
            Body: fileContent,
            ContentType: file.mimetype,
        };

        // Upload to S3
        const command = new PutObjectCommand(params);
        await s3.send(command);

        // Respond with the renamed file name (the key)
        res.json({ message: 'File uploaded successfully', fileName: fileName });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'Error uploading file', error: err });
    }
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
