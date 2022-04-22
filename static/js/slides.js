/*
// Old code
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

function hide(div) {
  document.getElementById(div).style.display = "none";
}

function unhide(div) {
  document.getElementById(div).style.display = "block";
}

function myFunction() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

function addImage(image, num) {
  let element = document.getElementById("slideshow2");
  let imgDiv = document.createElement("div");
  let cl = "mySlides"
  if (num == 0) {
    cl = "firstSlides"
  }
  const markup = `
<div class="${cl} fade">
  <div class="numbertext">${num}</div>
  <img src="${image}" style="width:100%">
</div>
`;
  imgDiv.innerHTML = markup
  element.appendChild(imgDiv);
}

function loadSlides(dict) {
  if (dict != '') {
    json_dict = dict.split(",")
    for (var i = 0; i < json_dict.length; i+=3) {
      addImage(json_dict[i], json_dict[i+2])
    }
  }
}

// delete function included there
/*
markup is: 
<a href="/delete?id=${id}">
    <button onclick="hide('${id}')">Delete</button>
</a>

function addDropDownImage(image, id, num) {
  let element = document.getElementById("myDropdown");
  let imgDiv = document.createElement("div");
  let num2 = parseInt(num) + 1;
 add the button hover formatting 
  const markup = `
<li>
<div id="${id}" class="dragging">
<button class="invisible" onclick='currentSlide(${num2})'>
  <img src="${image}" class="side-by-side">
</button>
<a href="/delete?id=${id}">
<button onclick=delete("${id}")>Delete</button>
</a>
</div>
</li>
`;
  imgDiv.innerHTML = markup
  element.appendChild(imgDiv);
}
function loadDropDown(dict) {
  if (dict != '') {
    json_dict = dict.split(",")
    for (var i = 0; i < json_dict.length; i+=3) {
      addDropDownImage(json_dict[i], json_dict[i+1], json_dict[i+2])
    }
  }
}
function getTitle() {
  document.getElementById('pTitle1').value = location.href.split("=").slice(-1);
}*/

// https://jqueryui.com/sortable/
// make divs a list


function dateTime2() {
  
  var today = new Date();

  var date = (today.getMonth()+1) + '-' + today.getDate()+ '-' + today.getFullYear();

  var time = today.getHours() + ":" + today.getMinutes()

  var dateTime3 = date+' '+time;

  return dateTime3

}


var slideIndex = 1;
showSlides(slideIndex);

function run2() {
  var image = document.getElementById("img1").value;
  var n = document.getElementsByClassName("fade").length;
  addImage(image, n)
  addDropDownImage(image, "not loaded", n, "not loaded", "not loaded")
  hide();
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("fade");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
} 

function addImage(image, num) {
  let element = document.getElementById("slideshow2");
  let imgDiv = document.createElement("div");
  let cl = "mySlides"
  if (num == 0) {
    cl = "firstSlides"
  }
  const markup = `
<div class="${cl} fade">
  <div class="numbertext">${num}</div> 
  <img src="${image}" style="width:100%">
</div>
`;
  //Put METADATA HERE, next to ${num} div
  imgDiv.innerHTML = markup
  element.appendChild(imgDiv);
}
/*
function deleteSlide(num) {  
  var toRemove = document.getElementsByClassName("fade")[num-1];
  document.getElementById("test").innerHTML = toRemove;
  toRemove.remove();
}
*/
function loadSlides(dict) {
  json_dict = dict.split("|")
  for (var i = 0; i < json_dict.length; i+=5) {
    addImage(json_dict[i], json_dict[i+2])
  }  
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown2").classList.toggle("show");
}


function addDropDownImage(image, id, num, username, date) {
    //Input.files?
  let element = document.getElementById("myDropdown");
  let imgDiv = document.createElement("div");
  let num2 = parseInt(num) + 1;
  const markup = `
<li ondblclick="unhide('${id} + 1');unhide('${id} + 2')" onclick="hide('${id} + 1');hide('${id} + 2')" style="margin-bottom: 3%;">
<div id="${id}" class="dragging">
<button class="invisible" onclick='currentSlide(${num2})'>
  <img src="${image}" class="side-by-side">
</button> 
<a href="/delete?id=${id}" style="display: none" id="${id} + 1">
<button class="deletebtn" onclick=delete("${id}")>Delete</button>
</a>
<button id="${id} + 2" style="display: none;max-width: 242px;text-align:center;">

File Id:
${id}
Uploaded By:
${username}
Date & Time Uploaded: 
${date}
</button>
</div>
</li>
`;
  
  imgDiv.innerHTML = markup
  element.appendChild(imgDiv);
}

function loadDropDown(dict) {
  if (dict != '') {
    json_dict = dict.split("|")
    for (var i = 0; i < json_dict.length; i+=5) {
      addDropDownImage(json_dict[i], json_dict[i+1], json_dict[i+2], json_dict[i+3], json_dict[i+4])
    }
  }
}

function hide(div) {
  document.getElementById(div).style.display = "none";
}

function getTitle() {
  document.getElementById('pTitle1').value = location.href.split("=").slice(-1);
}

function unhide(div) {
  document.getElementById(div).style.display = "block";
}

function timeOutandHide() {
  var i = null;
  $("html").mousemove(function() {
      clearTimeout(i);
      $(".open-DropDown-Menu").fadeIn(100);
      $(".prev").fadeIn(100);
      $(".next").fadeIn(100);
      $(".numbertext").fadeIn(100);
      i = setTimeout(function () {
          $(".open-DropDown-Menu").fadeOut(1000);
          $(".prev").fadeOut(1000);
          $(".next").fadeOut(1000);
          $(".numbertext").fadeOut(1000);
        
      }, /*seconds til timeout*/3000);
  }).mouseleave(function() {
      clearTimeout(i);
      $(".open-DropDown-Menu").fadeOut(1000); 
      $(".prev").fadeOut(1000);
      $(".next").fadeOut(1000);
      $(".numbertext").fadeOut(1000);
  });
}

function validateForm() {
  var x = document.getElementById('img1').value;
  var y = document.getElementById('img2').value
  if (x == "" && y == "") {
    alert("Invalid Input, Please Check You've Completed All Fields Correctly");
    return false;
  }
}

function invis(div) {
  document.getElementById(div).style.visibility = "hidden";
}

function invisOff(div) {
  document.getElementById(div).style.visibility = "visible";
}
