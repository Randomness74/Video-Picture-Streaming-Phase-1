/*function newBox(image, link, name) {
  //Creating item frame with user name and title, and its respective web address
  let element = document.getElementById("slideshow-grid");
  let child = document.getElementById("create-button");
  //Creating a div withing Slidshow grid for the new slideshow
  let imgDiv = document.createElement("div"); 
  //Formatting of the new slideshow div
  const markup = 
  `
      <a href='/load?pageName=${link.replace('.html', '').replace('/test/', '')}'>
        <img src = ${image}/> </a>
      <p>${name}</p>
      <a href='/edit?pageName=${link.replace('.html', '').replace('/test/', '')}'> </a>
  `;
  
  imgDiv.innerHTML = markup 
  //console error saying insertbefore isnt a function 
  element.insertBefore(imgDiv, child.nextSibling); 
}
/*  
  var newItem = 
`<div>
    <a href='/load?pageName=${link.replace('.html', '').replace('/test/', '')}'>
      <img src = ${image} /> </a>
      <p>${name}</p>
    <a href='/edit?pageName=${link.replace('.html', '').replace('/test/', '')}'>
            
    </a>
</div>
`;

  var element = document.getElementsByClassName('slideshow-grid');
  element.appendChild(newItem);

  
}
*/
/*
function newBoxold(image, link, name) {
  let element = document.getElementsByClassName("slideshow-grid");
  
  let item = document.getElementsByClassName("item")
  
  element.appendChild(item)
  
  let imgDiv = document.createElement("div");

  //Creating item frame with user name and title, and its respective web address
  const markup = `

<a href='/load?pageName=${link.replace('.html', '').replace('/test/', '')}'>
  <img src = ${image} </a>
  <p>${name}</p>
<a href='/edit?pageName=${link.replace('.html', '').replace('/test/', '')}'>
        
</a>
`;

/**     <div class="item">
        <a href='/load?pageName=slideshow-template'> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/1213px-Generic_Camera_Icon.svg.png" />
        </a>  
        <p>Slideshow Name</p>
       </div> 

  
  imgDiv.innerHTML = markup

  element.appendChild(imgDiv);
}
function hide(div) {
  document.getElementById(div).style.display = "none";
}

function unhide(div) {
  document.getElementById(div).style.display = "block";
}

function run2() {
  var title = document.getElementById("title1").value;
  title = title.replace(' ', '_')
  var image = document.getElementById("img1").value;
  var link= window.location.origin + 'templates/' + title + "-slideshow.html";
  newBox(image, link, title);
  hide();
}

function load2(dict) {
  json_dict = dict.split(",")
  for (var i = 0; i < json_dict.length; i+=2) {
    newBox(json_dict[i], 'templates/' + json_dict[i+1].replace(' ', '_') + '-slideshow.html', json_dict[i+1])
  }  
}*/

/*function newBox(image, link, name) {
  let element = document.getElementById("slideshow-grid");
  let imgDiv = document.createElement("div");
  const markup = `
<div class="item">
<a href='/load?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
  <img src = ${image} /></a>
<p>${name}</p>
<a href='/edit?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
</a>
</div>
`;

  imgDiv.innerHTML = markup

  element.prepend(imgDiv);
} */

function newBox(image, link, name) {
  let element = document.getElementById("slideshow-grid");
  let imgDiv = document.createElement("div");
  const markup = `
<div class="item" id = ${name}>
<a href='/load?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
  <img src = ${image} /></a>
<p>${name}</p>
<a href='/edit?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
</a>

</div>

<style>
  .item {  margin: auto; width: 100%; height: 100%;
           text-align: center; font-size: 30px;
           background-color: transparent; color: white;
           border: 6px solid rgba(255,255,255,0.3); padding: 5px; border-radius: 20px;
           transition-duration: 0.2s;
           }

  .item:hover {
    background-size: 100% 100%;
    background-align: center;
    padding: 10px;
    background-color: rgba(255,255,255,0.1);
    border: 9px solid rgba(255,255,255,0.5);
    padding: 2px;
  }
  
  .item:active {
    color: black;
    border: 9px solid rgba(0,0,0,0.7);
    padding: 10px;
    background-color: rgba(255,255,255,0.3);
    padding: 2px;
  } 
</style>
`;
  imgDiv.innerHTML = markup

  element.prepend(imgDiv);
}

function newBoxAdmin(image, link, name) {
  let element = document.getElementById("slideshow-grid");
  let imgDiv = document.createElement("div");
  const markup = `
<a href='/deleteSlideshow?pageName=${link.replace('.html', '').replace('/templates/', '').replace('-slideshow', '')}'>
<button>Delete Slideshow</button>
</a>
<div class="item" id = ${name}>
<a href='/load?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
  <img src = ${image} /></a>
<p>${name}</p>
<a href='/edit?pageName=${link.replace('.html', '').replace('/templates/', '')}'>
</a>

</div>

<style>
  .item {  margin: auto; width: 100%; height: 100%;
           text-align: center; font-size: 30px;
           background-color: transparent; color: white;
           border: 6px solid rgba(255,255,255,0.3); padding: 5px; border-radius: 20px;
           transition-duration: 0.2s;
           }

  .item:hover {
    background-size: 100% 100%;
    background-align: center;
    padding: 10px;
    background-color: rgba(255,255,255,0.1);
    border: 9px solid rgba(255,255,255,0.5);
    padding: 2px;
  }
  
  .item:active {
    color: black;
    border: 9px solid rgba(0,0,0,0.7);
    padding: 10px;
    background-color: rgba(255,255,255,0.3);
    padding: 2px;
  } 
</style>
`;
  imgDiv.innerHTML = markup
  element.prepend(imgDiv);
}

function hide(div) {
  document.getElementById(div).style.display = "none";
}

function unhide(div) {
  document.getElementById(div).style.display = "block";
}

function run2() {
  var title = document.getElementById("title1").value;
  //https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match
  title = title.replace(' ', '_')
  var image = document.getElementById("img1").value;
  var link= windows.location.origin + 'templates/' + title + "-slideshow";
  newBox(image, link, title);
  hide();
}


function load2(dict) {
  json_dict = dict.split("|")
  for (var i = 0; i < json_dict.length; i+=2) {
     //https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match
    newBox(json_dict[i], '/templates/' + json_dict[i+1].replace(' ', '_') + '-slideshow.html', json_dict[i+1])
  }  
}

function load2Admin(dict) {
  json_dict = dict.split("|")
  for (var i = 0; i < json_dict.length; i+=2) {
     //https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match
    newBoxAdmin(json_dict[i], '/templates/' + json_dict[i+1].replace(' ', '_') + '-slideshow.html', json_dict[i+1])
  }  
}

function validateForm() {
  var x = document.getElementById('img1').value;
  var y = document.getElementById('img2').value
  var z = document.getElementById('title1').value
  if (z == "" && x == "" && y == "" || x == "" && y == "") {
    alert("Invalid Input, Please Check You've Completed All Fields Correctly");
    return false;
  }
}
