const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup();

tabGroup.addTab({
    title: "Slack",
    src: "https://dafiti-ar.slack.com/",
	icon: 'fa fa-slack',
	visible: true,
    active: true,
	closable: true
});

tabGroup.addTab({
    title: "Whatsapp",
    src: "https://web.whatsapp.com/",
	icon: 'fa fa-whatsapp',
	closable: true
});

tabGroup.addTab({
    title: "Skype",
    src: "https://web.skype.com/",
	icon: 'fa fa-skype',
	closable: true
});

const remote = require('electron').remote;
const Menu = remote.Menu;

const InputMenu = Menu.buildFromTemplate([{
   label: 'Undo',
   role: 'undo',
  }, {
   label: 'Redo',
   role: 'redo',
  }, {
   type: 'separator',
  }, {
   label: 'Cut',
   role: 'cut',
  }, {
   label: 'Copy',
   role: 'copy',
  }, {
   label: 'Paste',
   role: 'paste',
  }, {
   type: 'separator',
  }, {
   label: 'Select all',
   role: 'selectall',
  }
]);

window.addEventListener('contextmenu', function (e) {
InputMenu.popup(remote.getCurrentWindow());
}, false);

// Events
document.getElementById("refresh").addEventListener("click", function(){
	var webView = document.getElementsByClassName("etabs-view visible")[0];
	webView.src = webView.src;
});

document.getElementById("back").addEventListener("click", function(){
	document.getElementsByClassName("etabs-view visible")[0].goBack();
});

document.getElementById("forward").addEventListener("click", function(){
	document.getElementsByClassName("etabs-view visible")[0].goForward();
});

document.getElementById('add').addEventListener('click', function(){
	document.getElementById('add-input').style.display = "inline";
	document.getElementById('add-input-label').style.display = "inline";
	document.getElementById('add-input-name').style.display = "inline";
	document.getElementById('close-add').style.display = "inline";
});

document.getElementById('add-input').addEventListener('keypress', function(e){
	addTab(e);
});

document.getElementById('add-input-name').addEventListener('keypress', function(e){
	addTab(e);
});

document.getElementById('close-add').addEventListener('click', function(e){
	hideAddControls();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Handlers methods
function addTab(e){
	if(e.keyCode == 13){
		var urlToAdd = document.getElementById('add-input').value;
		var patt = new RegExp(/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
		if(!patt.test(urlToAdd)){
			viewAddControls();
			return false;
		}
		var normalizedUrl = urlToAdd.replace("www.", "");
		fetch(normalizedUrl).then(function(response) {
			if(response.status ==  200){
				var nameTab = document.getElementById('add-input-name').value.toLowerCase().trim().replace(" ", "");
				var iconName = getIcon(nameTab);
				tabGroup.addTab({
					title: nameTab ? nameTab.capitalize() : normalizedUrl,
					src: normalizedUrl,
					closable: true,
					visible: true,
					active: true,
					icon: iconName ? iconName : 'fa fa-globe'
				});
				hideAddControls();
			} else {
				viewAddControls();
			}
		}).catch(function(error){
			viewAddControls();
		});
	}
}

function hideAddControls(){
	document.getElementById('add-status').style.display = "none";
	document.getElementById('add-input').style.display = "none";
	document.getElementById('add-input-label').style.display = "none";
	document.getElementById('add-input-name').style.display = "none";
	document.getElementById('close-add').style.display = "none";
	document.getElementById('add-input').value= "http://";
	document.getElementById('add-input-name').value= "";
}

function viewAddControls(){
	document.getElementById('add-status').style.display = "inline";
	document.getElementById('close-add').style.display = "inline";
}

function getIcon(name){
	if(name.indexOf("slack") != -1)
		return "fa fa-slack";
	if(name.indexOf("whatsapp") != -1)
		return "fa fa-whatsapp";
	if(name.indexOf("skype") != -1)
		return "fa fa-skype";
	if(name.indexOf("facebook") != -1)
		return "fa fa-facebook";
	if(name.indexOf("youtube") != -1)
		return "fa fa-youtube-play";
	if(name.indexOf("twitter") != -1)
		return "fa fa-twitter";
	if(name.indexOf("google") != -1)
		return "fa fa-google";
	if(name.indexOf("instagram") != -1)
		return "fa fa-instagram";
	if(name.indexOf("wikipedia") != -1)
		return "fa fa-wikipedia-w";
	if(name.indexOf("gitlab") != -1)
		return "fa fa-gitlab";
	if(name.indexOf("github") != -1)
		return "fa fa-github";
	if(name.indexOf("trello") != -1)
		return "fa fa-trello";
	if(name.indexOf("pinterest") != -1)
		return "fa fa-pinterest";
	if(name.indexOf("stackoverflow") != -1)
		return "fa fa-stack-overflow";
	return null;
}