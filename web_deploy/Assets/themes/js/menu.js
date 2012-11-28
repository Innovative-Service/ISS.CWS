function hmenuhover()
{
	if(!document.getElementById("hmenu"))
		return;
	var lis = document.getElementById("hmenu").getElementsByTagName("LI");
	for (var i=0;i<lis.length;i++)
	{
		lis[i].onmouseover=function(){this.className+=" iehover";}
		lis[i].onmouseout=function() {this.className=this.className.replace(new RegExp(" iehover\\b"), "");}
	}
}
if (window.attachEvent)
	window.attachEvent("onload", hmenuhover);
function ShowPopUp(id, flag)
	{
		var obj = document.getElementById(id);
		if (flag)
				obj.style.visibility = 'visible';
			else
				obj.style.visibility = 'hidden';

	}
function RemoveEmptyLinks()
{
	if(window.location.href.search("management") == -1)
	{
	var array = document.getElementsByTagName('a');
	for(i = 0; i < array.length; i++)
	{
		if(array[i].href.search('#') != -1)
		{
			array[i].removeAttribute('href');
			array[i].style.textDecoration = "none";
		}
	}
	}
}

var langs=['popup','valid'];
langs['popup']=['en','de'];
langs['valid']=['en','de'];

langs['popup']['en']=new Array('Subject:','Name:','Email:','Message:','Message Form:','Enter your request here');
langs['valid']['en']=new Array('<center>Error ocurred!<br> Check input and try again.</center>','The message has been sent.<br /><center>Thanks!</center>');
langs['popup']['fr']=new Array('Sujet:','Nom:','Email:','Message:','Message:','Votre question ou message');
langs['valid']['fr']=new Array('Erreur! <br/> Vérifiez les données et essayez à nouveau.','Le message est envoyé.<br /><center>Merci!</center>');
langs['popup']['de']=new Array('Betreff:','Name:','E-Mail:','Mitteilung:','Mitteilungsformular:','Bitte geben Sie hier Ihre Anfrage ein');
langs['valid']['de']=new Array('<center>Ein Fehler ist aufgetreten!<br> Eingabe prüfen und erneut versuchen.</center>','Mitteilung versendet. Vielen Dank!');