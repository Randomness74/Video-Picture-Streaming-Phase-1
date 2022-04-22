function addImage(image, id) {
  let element = document.getElementById("grid-2");
  let imgDiv = document.createElement("div");
  const markup = `
<div id="${id}">
  <img src="${image}" style="width:100%">
  <a href="/delete?id=${id}">
    <button onclick="hide('${id}')">Delete</button>
</a>
</div>
`;
  imgDiv.innerHTML = markup
  element.appendChild(imgDiv);
}

function hide(div) {
  document.getElementById(div).style.display = "none";
}

function unhide(div) {
  document.getElementById(div).style.display = "block";
}

function loadSlides(dict) {
  if (dict != '') {
    json_dict = dict.split(",")
    for (var i = 0; i < json_dict.length; i+=2) {
      addImage(json_dict[i], json_dict[i+1])
    }
  }
}

function run2() {
  var image = document.getElementById("img1").value;
  addImage(image, );
  hide();
}

function getTitle() {
  document.getElementById('pTitle1').value = location.href.split("=").slice(-1);
}
