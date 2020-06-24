

function myFunction() {

    console.log("myFunction() gerufen");


    let kodierteText = document.getElementById("eingabeFeld").value
    
    let outputText = kodierenOderDekodieren(kodierteText);

    document.getElementById("output").innerHTML = outputText;
 
}

function test(){

    let wichtigeBotschaft = "Ein ganz wichtige Botschaft!";

    console.log("Geheime Botschaft (original):" + wichtigeBotschaft);


    let kodierterString = kodierenOderDekodieren(wichtigeBotschaft);

    console.log("Geheime Botschaft (verschlüsselt):" + kodierterString);

    let dekodierterString = kodierenOderDekodieren(kodierterString);

    console.log("Geheime Botschaft (entschlüsselt):" + dekodierterString);


}


function kodierenOderDekodieren(str) {
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