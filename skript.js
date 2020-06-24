

// Wird beim Drücken des Buttons aufgerufen
function fertig() {
	try {
		aktion();
	} catch (error) {
		let toStringResult = error.toString();
		if ((typeof toStringResult) === "string") {
			alert("FEHLER: " + toStringResult);
		} else {
			alert("Unbekannter FEHLER");
		}
		throw error;
	}
}

function aktion() {
	let inputSchwierig = getRadiobuttonValue("r1");
	let inputLayout = getRadiobuttonValue("r2");
	let inputUsability = getRadiobuttonValue("r3");
	let inputUnklar = getTextFieldValue("t1");
	let inputSonst = getTextFieldValue("t2");



    document.getElementById("frage1_warnung").style.display = ( inputSchwierig === null) ? "block" : "none";
    document.getElementById("frage2_warnung").style.display = ( inputLayout === null) ? "block" : "none";
    document.getElementById("frage3_warnung").style.display = ( inputUsability === null) ? "block" : "none";

    if (inputSchwierig === null) 
    {
        document.getElementById("label_33").scrollIntoView();
		return;
	} 
    if (inputLayout === null)
    {
        document.getElementById("label_27").scrollIntoView();
		return;
	} 
    if (inputUsability === null) {
        document.getElementById("label_28").scrollIntoView();
        return;
	} 

	let schwierig = janein(inputSchwierig);
	let layout = zahl(inputLayout);
	let usability = zahl(inputUsability);
	let unklar = inputUnklar;
	let sonst = inputSonst;

	let klartext = erzeugeAntwortString(schwierig, layout, usability, unklar, sonst);

	let krypto = kodiere(klartext);

	ausgeben(krypto);
}

//Gibt den verschlüsselten Text aus
  function ausgeben(text)  {

	  document.getElementById("output").innerHTML = text;              // Gebe den Antworttext aus
      document.getElementById("resultArea").style.display = "block";   // Zeige das Antwort-Area an
	  document.getElementById("questionArea").style.display = "none";  // verstecke das Frage-Area
	  
	  document.body.scrollTop = 0;  // für Safari
	  document.documentElement.scrollTop = 0; // Für andere Browser

	  copytext(text);
}

//kopiert den Text in Clipboard
function copytext(text) {
	var el = document.createElement('textarea');
  	el.value = text;
  	el.setAttribute('readonly', '');
  	el.style.position = 'absolute';
  	el.style.left = '-9999px';
  	document.body.appendChild(el);
  	el.select();
  	document.execCommand('copy');
  	document.body.removeChild(el);
}

// Holt den Value des ausgewählten Radiobuttons aus der Gruppe mit dem jeweiligen Namen
function getRadiobuttonValue(name) {
    let elements = document.getElementsByName(name);
	for (let i=0; i<elements.length; i++) {
		if (elements[i].checked) {
			return elements[i].value;
		}
	}
	return null;
}

// Holt den Wert des Textfeldes mit der jeweiligen ID
function getTextFieldValue(id) {
	return document.getElementById(id).value;
}

// entscheidet ob ein String "ja" dastellen soll
function janein(text) {
	let erster = text.charAt(0);
	if (erster === "j" || erster === "J" || erster === "y" || erster === "J") return true;
	else return false;
}

function zahl(text) {
	return parseInt(text);
}

let alphabetKlein = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let alphabetGross = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let zahlen = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let alphabet = alphabetKlein.concat(alphabetGross, zahlen);

  /*
     param schwierig: Antwort auf die Frage, ob die Umfrage schwierig war
     param layout: Punkte, die für Layout gegeben wurden
     param usability: Punkte, die für Usability gegeben wurden
     param unklar: Text, wenn etwas unklar war
     param sonst: Text zu sonstigen Hinweisen
  */
  function erzeugeAntwortString(schwierig, layout, usability, stringUnklar, stringSonst) {

	let finalString = schwierig + ";" + layout + ";" + usability + ";" + stringUnklar + ";" + stringSonst +";";

	return finalString;
}

function randomChar() {
    let index = Math.floor(Math.random()*alphabet.length);
    console.log("randomChar returns ", index, alphabet[index])
	return alphabet[index];
}

function kodiere(str) {
    var encoded = "";
    for (i=0; i<str.length;i++) {
		var a = str.charCodeAt(i);
    // 32 < a < 127
    // 0  < b < 95
        var b = a ^ 1;
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
}