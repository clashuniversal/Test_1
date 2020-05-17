from flask import Flask, render_template, request, redirect

app = Flask("__name__")

#Dictionary to store the task and date
calls = {}

#Default route
@app.route("/")
def index():
	#Return the file homepage to be rendered. Calls dict is passed to use the values
    return render_template("homepage.html", calls=calls)

#New page with provisions to add a new reminder
@app.route("/new", methods=["GET", "POST"])
def new():
    if request.method == "GET":
        return render_template("new.html")
    else:
    	# Gets the task and date from the user and stores it in dict calls
        task = request.form.get("task")
        calls[task] = request.form.get("date")
        # To redirect the user to the homepage
        return redirect("/")
