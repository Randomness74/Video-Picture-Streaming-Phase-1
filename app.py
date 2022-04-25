import pymongo
import hashlib
import base64
from flask import Flask, render_template, request, flash, redirect, url_for, session
from datetime import timedelta, datetime
import certifi
ca = "./ca-certificate.crt"

# connect to database ( MongoDB )
client = pymongo.MongoClient("mongodb+srv://doadmin:35b68ZJNd1L4n07x@gridcluster-d2319a10.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=gridcluster&tls=true", tlsCAFile=ca)
db = client["GridCluster"]
col = db["credentials"]
boxData = db["boxdata"]
slideData = db["slidedata"]

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = "test_secret_key" # needed for flashes and other commodities in flask
app.permanent_session_lifetime = timedelta(hours=1)

# home page / register ( at the moment )
@app.route("/", methods=["GET", "POST"])
def index():
  # if statement runs if user hits the submit button
  if request.method == 'POST':
    # gets username/password from input boxes
    username = request.form.getlist("username")[0]
    password_hash = hashlib.sha256(request.form.getlist("password")[0].encode('utf-8')).hexdigest()

    # checks if a username is in the database
    if col.find_one({username: { "$exists": True } }):
      flash('Username/Account Already Exists')
    # if username isn't in database, creates a new account
    else:
      flash('Registered!')
      col.insert_one({username: password_hash, "privilege": "viewer"}) # changes this later

  return render_template("index.html")

# login page
@app.route("/login", methods=["GET", "POST"])
def register():
  # if statement runs if the user hits the submit button
  if request.method == "POST":
    # gets username/password from input boxes
    username = request.form.getlist("username")[0]
    password_hash = hashlib.sha256(request.form.getlist("password")[0].encode('utf-8')).hexdigest()
    # if they are in the database, logs in
    for data in list(col.find({})):
      print(data)
      try:
        if data[str(username)] == password_hash:
          print("logged in")
          # for vihaan
          session.permanent = True
          session["username"] = username
          if data["privilege"] == "user":
            session["privilege"] = "user"
            return redirect(url_for("user"))
          elif data["privilege"] == "admin":
            session["privilege"] = "admin"
            return redirect(url_for("admin"))
          elif data["privilege"] == "viewer":
            session["privilege"] = "viewer"
            return redirect(url_for("viewer"))
      except Exception:
        continue;
      # if request.form.getlist("user") == "admin"
      # return render_template("admin.html")
    else:
      flash("Incorrect username or password")
  return render_template("login.html") 

  #return render_template("login.html")  

@app.route("/admin", methods=["POST", "GET"])
def admin():
  try:
    session["privilege"]
  except KeyError:
    return '', 204
  if session["privilege"] == "admin":
    print("start admin")
    boxes = ""
    boxCollections = list(boxData.find({}))
    for box in boxCollections:
      boxes += box["image"] + "|" + box["title"] + "|"
    boxes = boxes[:-1]
    print(boxes)
    return render_template("admin.html", datad = boxes)
  return '', 204

@app.route("/user", methods=["POST", "GET"])
def user():
  try:
    session["privilege"]
  except KeyError:
    return '', 204
  if session["privilege"] == "user":
    print("start user")
    boxes = ""
    boxCollections = list(boxData.find({}))
    for box in boxCollections:
      boxes += box["image"] + "|" + box["title"] + "|"
    boxes = boxes[:-1]
    print(boxes)
    return render_template("user.html", datad = boxes)
  return '', 204


@app.route("/viewer", methods=["POST", "GET"])
def viewer():
  try:
    session["privilege"]
  except KeyError:
    return '', 204
  if session["privilege"] == "viewer":
    print("start viewer")
    boxes = ""
    boxCollections = list(boxData.find({}))
    for box in boxCollections:
      boxes += box["image"] + "|" + box["title"] + "|"
    boxes = boxes[:-1]
    print(boxes)
    return render_template("viewer.html", datad = boxes)
  return '', 204

@app.route("/save", methods=["POST"])
def saveSlideshowChanges():
  if session["privilege"] != "viewer":
    print("writing")
    img = request.form.get('image')
    p = request.form.get('pageTitle')
    print(img)
    print(p)
    print(datetime.now())
    print(session["username"])
    slideCollections = list(slideData.find({}))
    slideCollectionsLength = len([x for x in slideCollections if x["title"]==p])
    with app.app_context():
      slideData.insert_one({"image": img, "num": slideCollectionsLength, "title": p, "id": p[0:5] + img[0:5] + str(slideCollectionsLength), "username": session["username"], "date": str(datetime.now())}) #removed "date" field to allow ross to continue working on js 
      
  return '', 204

@app.route("/load", methods=["GET", "POST"])
def load():
  # test code
  print('here')
  slideshowName = request.args.get('pageName')
  slideCollections = list(slideData.find({}))
  slideList = []
  slideNum = []
  for slide in slideCollections:
    if slide["title"] == slideshowName:
     slideList.append(slide["image"]+"|"+slide["id"]+"|"+slide["username"]+"|"+slide["date"])
     slideNum.append(slide["num"]);
  finalSlidesList = [x for y, x in sorted(zip(slideNum, slideList))]
  finalSlides = ""
  for i in range(0, len(finalSlidesList)):
    finalSlides += slideList[i] + "|" + str(i) + "|" 
  finalSlides = finalSlides[:-1]
  print(finalSlides)
  #return render_template("index.html", slideData = finalSlides) 
  return render_template(slideshowName + ".html", slideData = finalSlides)

@app.route("/delete", methods=["GET", "POST"])
def delete():
  slideshowName = request.args.get('id')
  creator = ""
  for item in list(slideData.find({})):
    if item["id"] == slideshowName:
      creator = item["username"]
  if session["privilege"] == "admin" or (session["privilege"] == "user" and session["username"] == creator):
    print('here')
    print(list(slideData.find({})))
    slideData.delete_one({"id": slideshowName})
  return '', 204;

# deletes slideshow
@app.route("/deleteSlideshow", methods=["GET", "POST"])
def deleteSlideshow():
  if session["privilege"] == "admin":
    title = request.args.get('pageName')
    boxes = list(boxData.find({}))
    with app.app_context():
      print(title)
      print(boxes)
      for box in boxes:
        print(box["title"])
        if (box["title"] == title):
          boxData.delete_one({"title": title})
  return '', 204

# creates a new slideshow
@app.route("/create", methods=["POST"])
def createNewSlideshow():
  if session["privilege"] != "viewer":
    img = request.form.get('image')
    title = request.form.get('title')
    with app.app_context():
      if boxData.find_one({"title": title}):
        flash("Please rename the slideshow.") #don't we have ids to prevent this problem now? #The reason it appears on the Registry Page must be because it defaults to this.
      else:
        template = open('templates/slideshow-template.html', 'r')
        file = open("templates/" + title.replace(" ", "_") + '-slideshow.html', 'w')
        file.write(template.read())
        boxData.insert_one({"image": img, "title": title})
        
  return '', 204

# run on repl.it public ip address
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969, debug=True)
