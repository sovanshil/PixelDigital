from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = "pixel-digital-change-this-secret-key"

@app.route("/")
def home():

    # AI files
    ai_folder = os.path.join(
        app.static_folder,
        "images",
        "AI"
    )
    ai_files = os.listdir(ai_folder)

    # Client logos
    clients_folder = os.path.join(
        app.static_folder,
        "images",
        "clients-logo"
    )
    client_logos = os.listdir(clients_folder)

    # Graphic Design files
    graphic_folder = os.path.join(
        app.static_folder,
        "images",
        "graphic design"
    )
    graphic_files = sorted(os.listdir(graphic_folder))

        # Client Feedback images
    feedback_folder = os.path.join(
        app.static_folder,
        "images",
        "feedback"
    )

    feedback_images = sorted(
        os.listdir(feedback_folder)
    )

    return render_template(
        "index.html",
        ai_files=ai_files,
        client_logos=client_logos,
        graphic_files=graphic_files,
        feedback_images=feedback_images
    )

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    # For now, show a success message. You can connect this to email later.
    if name and email and message:
        flash("Thanks! Your message has been received. We will contact you shortly.", "success")
    else:
        flash("Please fill in all required fields.", "error")

    return redirect(url_for("home") + "#contact")

if __name__ == "__main__":
    app.run(debug=True)
