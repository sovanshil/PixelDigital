# Pixel Digital Website

## Run locally

1. Open this folder in VS Code.
2. Open Terminal.
3. Run:
   pip install -r requirements.txt
4. Run:
   python app.py
5. Open:
   http://127.0.0.1:5000

## Before publishing

Open `templates/index.html` and replace:
- `+91 98765 43210`
- `hello@pixeldigital.in`
- WhatsApp number in the `wa.me` links
- Instagram/Facebook/LinkedIn links
- Portfolio sample items/images if desired.

The website is responsive and works on desktop/mobile.

## Publishing

For a Flask deployment, services such as Render/Railway can run the app.
Start command:
gunicorn app:app

Add `gunicorn` to requirements.txt if your hosting provider requires it.
# PixelDigital
