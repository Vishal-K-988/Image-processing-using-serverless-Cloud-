﻿# Image Upload and Compression Web App

This project is a cloud-based web application that allows users to upload images, which are then resized and compressed using AWS services. The application leverages AWS S3 for file storage and AWS Lambda for image processing, specifically resizing images to 200x200 pixels. The compressed images are stored in a destination S3 bucket and can be downloaded or viewed by the user.

## Features

- **Image Upload**: Users can upload images through the web interface.
- **Image Compression**: Uploaded images are resized and compressed using AWS Lambda with the Jimp library.
- **File Storage**: The images are stored in an S3 source bucket (`studio-source-bkt1`), and the compressed images are stored in a destination bucket (`studio-destination-bkt2`).
- **Download/Preview**: After compression, the user can view and download the compressed image.

## Technologies Used

- **AWS S3**: For file storage.
- **AWS Lambda**: For image resizing and compression using the Jimp library.
- **Express.js**: Backend web server to handle image uploads.
- **Multer**: Middleware for handling file uploads.
- **Jimp**: Image processing library used in the Lambda function for resizing images.
- **HTML/JavaScript**: Frontend for user interaction.

## Project Structure

├── public/ # Frontend files (HTML, CSS, JS) │
	── index.html # Main HTML file │ 
	── script.js # Client-side JavaScript to handle image uploads and display │ 
	── styles.css # Styling for the web app 
├── uploads/ # Temporary directory for uploads (before S3) 
├── server.js # Express.js server to handle image upload requests 
├── index.js # Lambda function for image processing (resizing) 
├── package.json # Project metadata and dependencies 
└── package-lock.json # Lock file for dependencies



## Installation

### Prerequisites

- **Node.js** (v16+)
- AWS Account with access to S3 and Lambda services
- AWS CLI configured with appropriate credentials

### Clone the repository

```bash```

git clone <repository-url>
cd project_sem8


### Install Dependencies
```npm install```

## AWS Setup
-   Create two S3 buckets:
    
    -   `studio-source-bkt1`: For uploading original images.
    -   `studio-destination-bkt2`: For storing compressed images.
-   Configure an AWS Lambda function to resize images using the `index.js` provided.
    
-   Set the following environment variables in your `.env` file:
    
    -   `AWS_ACCESS_KEY_ID`
    -   `AWS_SECRET_ACCESS_KEY`
    -   `AWS_REGION`
    -   `DEST_BKT_PATH`: The destination bucket name for compressed images (`studio-destination-bkt2`).
   
## Start the server
```node server.js```

## How It Works

1.  **Image Upload**: The user selects an image to upload, and it is sent to the Express.js backend.
2.  **S3 Storage**: The image is uploaded to the `studio-source-bkt1` S3 bucket with a timestamped file name.
3.  **Lambda Processing**: A Lambda function is triggered when a new image is uploaded to the source bucket. The function resizes the image to 200x200 pixels and stores it in the destination S3 bucket (`studio-destination-bkt2`).
4.  **Image Retrieval**: The frontend fetches the compressed image from the destination bucket and displays it to the user.
## API Endpoints

### Upload Image

```POST /upload```
-   Uploads an image to the source S3 bucket (`studio-source-bkt1`).
-   Returns the URL and file name of the uploaded image.


## Fetch Compressed Image
Retrieves the compressed image from the destination S3 bucket (`studio-destination-bkt2`) using the file name (`key`).


## Frontend Overview

The frontend (`public/index.html`) consists of:

-   **File Input**: For selecting images to upload.
-   **Progress Bar**: To show the upload progress.
-   **Image Preview**: Displays the uploaded and compressed images after processing.
-   **Download Link**: Allows the user to download the compressed image.

## Lambda Function

The `index.js` file contains the AWS Lambda function used to resize images. It uses the `Jimp` library for image processing. The function reads the uploaded image from the source S3 bucket, resizes it to 200x200 pixels, and stores it in the destination S3 bucket.

## Error Handling

-   If the image upload fails, the user is notified with an error message.
-   If the compressed image is not found or cannot be retrieved, an appropriate error message is shown.

## Future Improvements

-   Add support for multiple file uploads.
-   Implement additional image processing options like converting image formats or adding watermarks.
-   Improve the UI with more detailed feedback during upload and processing.

## License

This project is licensed under the ISC License.

csharp

Copy code

 ### Notes:
- Update the `<repository-url>` with your GitHub repository URL.
- Add additional sections as needed based on your project’s scope or custom features.






















































