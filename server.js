const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const app = express();
const upload = multer({ dest: 'uploads/' });

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

app.post('/send-photo', upload.single('photo'), (req, res) => {
    const photoPath = req.file.path;

    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('photo', fs.createReadStream(photoPath));

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
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
