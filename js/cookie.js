var policyurl = "http://pajlot.pl/privacypolicy.html",
  okcolor = "#373a3c";

document.write(`
<div id='cookie-bar' class='cookie-bar'>
    <div style='display:inline-block;width:78%;margin:0; font-family: Arial;'>
        Ta strona używa plików cookie. Wyczyść dane przeglądarki po skończonej pracy - <a href=`+policyurl+` class="alet-link">więcej</a>
    </div>
    <div style='width:20%;'></div>
    <span id='agree' style='position:absolute;bottom:5px;right:1%;color: #FFFFFF;background: `+okcolor+`;border-radius: 15px; line-height: 30px; padding: 0 10px;margin: 0;font-weight: 600;'>&times;</span>
</div>
`);

document.getElementById("agree").addEventListener("click", hideCookiebar);

function hideCookiebar() {
    document.getElementById("agree").innerHTML = "cookies accepted";
    document.getElementById("cookie-bar").style.display = 'none';
} 
