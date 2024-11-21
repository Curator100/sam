const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const app = express();
const upload = multer({ dest: 'uploads/' });

const botToken = '7447671480:AAFtEWOh_y3k5UpIeUnV-5fJdV3L-RlqC6M'; // Your Bot Token
const chatId = '906269717'; // Your Chat ID

app.post('/send-photo', upload.single('photo'), (req, res) => {
    const photoPath = req.file.path;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', fs.createReadStream(photoPath));

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        res.json({ status: 'success', data });
    })
    .catch(error => {
        res.status(500).json({ status: 'error', error });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
