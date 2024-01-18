// ==UserScript==
// @name         NWR_eRev2
// @version      1.1.0
// @description  Automated energy refill Automated fight. Collect pirates. This is AFK script. Use it at your own risk.
// @include      http://*.erev2.com*
// @include      https://*.erev2.com*
// @copyright    WhIsKyMaN idea, maintained by eradev
// @downloadURL  https://github.com/edradev/script/blob/main/NWR_eRev2.js
// @updateURL    https://github.com/edradev/script/blob/main/NWR_eRev2.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValue
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @run-at       document-end
// ==/UserScript==

//If you don't understand JS better not touch nothing under this line
if ( GM_getValue("kills") == null || GM_getValue("kills") == undefined ) { GM_setValue("kills", "3"); }
if ( GM_getValue("wtf") == null || GM_getValue("wtf") == undefined ) { GM_setValue("wtf", "200"); }
if ( GM_getValue("wte") == null || GM_getValue("wte") == undefined ) { GM_setValue("wte", "150"); }
if ( GM_getValue("wep") == null || GM_getValue("wep") == undefined ) { GM_setValue("wep", "no"); }
if ( GM_getValue("rpg") == null || GM_getValue("rpg") == undefined ) { GM_setValue("rpg", "no"); }
if ( GM_getValue("side") == null || GM_getValue("side") == undefined ) { GM_setValue("side", "3"); }
if ( GM_getValue("battle") == null || GM_getValue("battle") == undefined ) { GM_setValue("battle", "0"); }
if ( GM_getValue("MUlink") == null || GM_getValue("MUlink") == undefined ) { GM_setValue("MUlink", "https://www.erev2.com/en/military-unit"); }
if ( GM_getValue("htm") == null || GM_getValue("htm") == undefined ) { GM_setValue("htm", "20"); }
if ( GM_getValue("allin") == null || GM_getValue("allin") == undefined ) { GM_setValue("allin", "ff"); }
if ( GM_getValue("link1") == null || GM_getValue("link1") == undefined ) { GM_setValue("link1", "https://www.erev2.com/en/country/region/11/Bulgaria/58/Vidin"); }
if ( GM_getValue("link2") == null || GM_getValue("link2") == undefined ) { GM_setValue("link2", "https://www.erev2.com/en/country/region/11/Bulgaria/56/Sofia"); }
if ( GM_getValue("link3") == null || GM_getValue("link3") == undefined ) { GM_setValue("link3", "https://www.erev2.com/en/country/region/11/Bulgaria/53/Burgas"); }
if ( GM_getValue("link1name") == null || GM_getValue("link1name") == undefined ) { GM_setValue("link1name", "Vidin"); }
if ( GM_getValue("link2name") == null || GM_getValue("link2name") == undefined ) { GM_setValue("link2name", "Sofia"); }
if ( GM_getValue("link3name") == null || GM_getValue("link3name") == undefined ) { GM_setValue("link3name", "Burgas"); }

var $$$ = document.querySelector.bind(document);
var affin;
var i = 1;
var cd = 0;
var hd = 0;
var rk;
var rkm;
var logvalue;
var btn = '<div id=\'conteinerset\'><header class=\'vs169\'>AutoRefresh in ' + GM_getValue("RandomReload") + ' minutes counted from ' + $$$('#game-time').innerText + '<a id=\'set\' class=\'btn btn-default btn-xs\' style=\'float:right; margin-right: 10px\'>Settings</a></header></div>';
var battle = 'https:\/\/erev2.com\/en\/battlefield\/' + GM_getValue("battle");

function login() {
    console.log('Login/Maintenace check');
    var main_type = location.href.split('/')[4];
    if ( main_type == 'login' ) { /*setTimeout(function() { logvalue = $("#login-box-inner > form > div:nth-child(1) > input").val(); $("#login-box-inner > form > div:nth-child(1) > input").val(''); $("#login-box-inner > form > div:nth-child(1) > input").val(logvalue);*/ setTimeout(function() { $$$("#login-box-inner > form > div:nth-child(4) > div > button").click(); }, 500); /*}, 1500);*/ }
    else if ( $$$("#errorContent") ) { setTimeout(function() { location.href = 'https://erev2.com/en'; }, 300000); }
    else if ( $$$("body > center:nth-child(1) > h1")) { setTimeout(function() { location.href = 'https://erev2.com/en'; }, 120000); console.log('Bad Gateway timer'); }
    else if ( $$$('#theme-wrapper > div:nth-child(2) > div.col-md-9.col-lg-9 > div.vs596-16.vs596-28 > a.vs596-17') ) { setTimeout(function() { location.href = 'https://erev2.com/en/login';}, 2000); }
    else { setTimeout(main, 1500); console.log('Here comes main'); }
}

function main() {
    var main_type = location.href.split('/')[4];
    var energy = $$$('#energyBarT').innerText.split(' / ')[0];
    var maxenergy = $$$('#energyBarT').innerText.split(' / ')[1];
    var regen = $$$('#energyButtonT').innerText;
    var letsfight = maxenergy - regen;
    move();
    if ( !$$$('#shorties') ) {
        $('#content-wrapper > div > div').prepend('<div id=\'shorties\'></div>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px; margin-left: 5px\' href=\'https://www.erev2.com/en/companies\' id=\'Companies\'>Companies</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'https://www.erev2.com/en/training-grounds\' id=\'train\'>Workout area</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'https://www.erev2.com/en/inventory\' id=\'inventory\'>Storage</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'https://www.erev2.com/en/strategic-buildings\' id=\'strategic-buildings\'>SBuildings</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'https://www.erev2.com/en/market\' id=\'market\'>Marketplace</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'https://www.erev2.com/en/monetary-market\' id=\'monetary-market\'>Monetary market</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' href=\'' + GM_getValue("MUlink") + '\'>MU</a>');
        $('#shorties').append('<a class=\'vs171-16\' style=\'margin-right: 15px\' id=\'auto-refresh\'>| AutoRefresh in ' + GM_getValue("RandomReload") + ' minutes counted from ' + $$$('#game-time').innerText + '</a>');}
    else { }
    //главната страница
    if ( main_type == 'index' || main_type == null ) {
        chest();
        RandomReload();
        GM_setValue("autofight", 0);
        if ( !$$$('#conteinerset') ) {
            $('#content-wrapper > div > div > div > div.vs323-1').after(btn);
            $$$('#set').addEventListener('click', setmenu);}
        if ( letsfight <= GM_getValue("wtf") ) {
            if ( GM_getValue("battle") != 0 ) { location.href = battle; GM_setValue('sta', '1'); }
            else if ( !$$$('#content-wrapper > div > div > div > div.vs323-1 > div.vs170-10 > a > span') ) { location.href = 'https://erev2.com/en/wars'; GM_setValue('sta', '1'); }
            else { $$$('#content-wrapper > div > div > div > div.vs323-1 > div.vs170-10 > a').click(); GM_setValue('sta', '1'); }}
        else {
            if ( energy != maxenergy && regen >= Number(GM_getValue("wte")) ) { $$$('#energyButton').click(); setTimeout(function() { location.href = 'https://erev2.com/en'; }, GM_getValue("RandomReload") * 60000); }
            else { setTimeout(function() { location.href = 'https://erev2.com/en'; }, GM_getValue("RandomReload") * 60000); }}}
    //избор на страна за бой във въстание
    else if ( main_type == 'war' ) {
        if ( GM_getValue('sta') == 1 ) { $$$('#content-wrapper > div > div > div > div > div.row.vs150 > div:nth-child(' + GM_getValue("side") + ') > a').click(); }
        else {
            setTimeout(function() { location.href = 'https://erev2.com/en'; }, 600000); }}
    //избор на битка
    else if ( main_type == 'wars' ) {
        if ( GM_getValue('sta') == 1 ) { $$$('#content-wrapper > div > div > div.main-box.clearfix > div > div:nth-child(2) > div:nth-child(1) > a.btn.btn-default.vs609.vs609-1').click(); }
        else {
            setTimeout(function() { location.href = 'https://erev2.com/en'; }, 600000); }}
    //на бойното поле
    else if ( main_type == 'battlefield' ) {
        if ( GM_getValue('sta') == 1 ) {
            $('#content-wrapper > div > div > div > header > h2').append('<strong> - NWR - Fight to keep the timer running</strong>');
            if ( !$$$('#battleFight') ) { location.href = 'https://erev2.com/en/wars'; GM_setValue("battle", "0"); }
            else if ( GM_getValue("wep") != 'no' ) {
                if ( GM_getValue("wep") == 'auto' ) { autoweaponchoose(); GM_setValue('sta', '0'); }
                else { weaponchoosed(); GM_setValue('sta', '0'); }}
            else { fight(); GM_setValue('sta', '0'); }}
        else { $('#content-wrapper > div > div > div > header > h2').append('<strong> - Auto Fight - </strong>'); $('#content-wrapper > div > div > div > header > h2').append('<strong id=\'count\'>Ready</strong>'); afmenu();  GM_setValue("weapsel", '#battleWeapons_0_0'); /*$$$('#battleFight').addEventListener('click', hitsmade);*/ affin = setTimeout(function() { location.href = 'https://erev2.com/en'; }, 900000); }}
    else { setTimeout(function() { location.href = 'https://erev2.com/en'; }, 600000); console.log('Running'); }
}

function chest() {
    if ( !$$$('body > div.swal2-container > div.swal2-modal.show-swal2.visible') ) {
        var pirate = document.getElementById("ePirates").innerText;
        document.querySelector("#sidebar-nav > ul > li:nth-child(9) > a:nth-child(4) > img").click();
        setTimeout(function() {
            if ( pirate == '00:00:00') {
                document.querySelector("#ePiratesB > div").click();
            } else {
                setTimeout(function() {
                    document.querySelector("#Pirates > div > div > div.modal-header.vs602 > button > span").click();
                }, 6000);
            }
        }, 2000);
    }
/*    else if ( $$$('body > div.swal2-container > div.swal2-modal.show-swal2.visible').style.display == 'block' ) {
        $$$('body > div.swal2-container > div.swal2-modal.show-swal2.visible > button.swal2-confirm.styled').click();
    }*/
    else { }
}

function fight() {
    if ( GM_getValue("autofight") == 1 ) { autofight(); }
    else {
        if ( i <= Number(GM_getValue("RandomKill")) ) {
            if ( $$$('#battleFight') ) {
                if ( $$$('#battleCaptcha').style.display == 'block' ) {
                    var battleID = location.href.split('/')[5];
                    var battleSide = location.href.split('/')[6];
                    setTimeout(function() {
                        var captchaurl = 'https://www.erev2.com/en/battlefield-update/10/' + battleID + '/' + battleSide + '/captchaInput/0';
                        $.getJSON(captchaurl, function(data) { var captcha = data.map(function (item) { return item.ode.replace(/ .*/, ''); }); $('#CaptchaInput').val($('#CaptchaInput').val()+ captcha); $("#CaptchaSend > div").click(); });
                    }, 2500);
                    setTimeout(fight, 6000); }
                else {
                    if ( $$$('#battleLog').style.display == 'block' || $$$('#battleBlack').style.display == 'block' ) { setTimeout(fight, 200); }
                    else { $$$('#battleFight').click(); i++; setTimeout(fight, 1600); }}}
            else { setTimeout(function() { location.href = 'https://erev2.com/en'; }, 10000); }}
        else {
            if ( $$$('#battleHospital') && GM_getValue("Randomkill") >= 5 ) { rkills(); setTimeout(function() { $$$('#battleHospital').click(); setTimeout(function() { location.href = 'https://erev2.com/en'; }, 2500); }, 2000); }
            else { rkills(); setTimeout(function() { $$$('#energyButton').click(); setTimeout(function() { location.href = 'https://erev2.com/en'; }, 2500); }, 2000); }}
    }
}

function rkills() {
    rkm = GM_getValue("kills");
    rk = Math.floor(Math.random() * rkm) + 1; GM_setValue("RandomKill", rk);
}

function RandomReload() {
    var rreload = Math.floor((Math.random() * 4) + 2);
    GM_setValue("RandomReload", rreload);
}

function move() {
    if ( $$$("#dest") || $$$("#dest1") || $$$("#dest2") ) {}
    else {
        $("#header-navbar > div > div > div.nav-no-collapse.navbar-left.pull-left.hidden-sm.hidden-xs > ul").append('<li><a id=\'dest\' style=\'float:left; margin-left: 10px\' href=\'' + GM_getValue("link1") + '\'>' + GM_getValue("link1name") + '</a></li>');
        $("#header-navbar > div > div > div.nav-no-collapse.navbar-left.pull-left.hidden-sm.hidden-xs > ul").append('<li><a id=\'dest1\' style=\'float:left; margin-left: 10px\' href=\'' + GM_getValue("link2") + '\'>' + GM_getValue("link2name") + '</a></li>');
        $("#header-navbar > div > div > div.nav-no-collapse.navbar-left.pull-left.hidden-sm.hidden-xs > ul").append('<li><a id=\'dest2\' style=\'float:left; margin-left: 10px\' href=\'' + GM_getValue("link3") + '\'>' + GM_getValue("link3name") + '</a></li>'); }
}

function autoweaponchoose() {
    if ( GM_getValue("rpg") == 'yes' && $$$('#battleWeapons_32_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_32_5').click(); GM_setValue("weapsel", '#battleWeapons_32_5'); fight(); } //Fighting with temp RPG if available and user want to.
    else if ( GM_getValue("rpg") == 'yes' && $$$('#battleWeapons_12_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_12_5').click(); GM_setValue("weapsel", '#battleWeapons_12_5'); fight(); } //Fighting with regular RPG if available and user want to.
    else {
        if ( $$$('#battleWeapons_32_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_32_5').click(); GM_setValue("weapsel", '#battleWeapons_32_5'); fight(); } //Looking for temp RPG
		else if ( $$$('#battleWeapons_5_8') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_8').click(); GM_setValue("weapsel", '#battleWeapons_5_8'); fight(); } //Looking for Q8 Weapons
		else if ( $$$('#battleWeapons_5_7') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_7').click(); GM_setValue("weapsel", '#battleWeapons_5_7'); fight(); } //Looking for Q7 Weapons
		else if ( $$$('#battleWeapons_5_6') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_6').click(); GM_setValue("weapsel", '#battleWeapons_5_6'); fight(); } //Looking for Q6 Weapons
        else if ( $$$('#battleWeapons_5_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_5').click(); GM_setValue("weapsel", '#battleWeapons_5_5'); fight(); } //Looking for Q5 Weapons
        else if ( $$$('#battleWeapons_5_4') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_4').click(); GM_setValue("weapsel", '#battleWeapons_5_4'); fight(); } //Looking for Q4 Weapons
        else if ( $$$('#battleWeapons_5_3') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_3').click(); GM_setValue("weapsel", '#battleWeapons_5_3'); fight(); } //Looking for Q3 Weapons
        else if ( $$$('#battleWeapons_5_2') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_2').click(); GM_setValue("weapsel", '#battleWeapons_5_2'); fight(); } //Looking for Q2 Weapons
        else if ( $$$('#battleWeapons_5_1') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_1').click(); GM_setValue("weapsel", '#battleWeapons_5_1'); fight(); } //Looking for Q1 Weapons
        else { GM_setValue("weapsel", '#battleWeapons_0_0'); fight(); console.log('No weapons. Fight with bare hands.'); }}
}

function weaponchoosed() {
    if ( GM_getValue("wep") == 'rpg' && $$$('#battleWeapons_32_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_32_5').click(); GM_setValue("weapsel", '#battleWeapons_32_5'); fight(); } //Fighting with  temp RPG. If no RPG available will fight with bare hands.
    else if ( GM_getValue("wep") == 'rpg' && $$$('#battleWeapons_12_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_12_5').click(); GM_setValue("weapsel", '#battleWeapons_12_5'); fight(); } //Fighting with regular RPG. If no RPG available will fight with bare hands.
    else if ( GM_getValue("wep") == 'weapon' ) {
		if ( $$$('#battleWeapons_5_8') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_8').click(); GM_setValue("weapsel", '#battleWeapons_5_8'); fight(); } //Looking for Q8 Weapons/Pistols
		else if ( $$$('#battleWeapons_5_7') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_7').click(); GM_setValue("weapsel", '#battleWeapons_5_7'); fight(); } //Looking for Q7 Weapons
		else if ( $$$('#battleWeapons_5_6') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_6').click(); GM_setValue("weapsel", '#battleWeapons_5_6'); fight(); } //Looking for Q6 Weapons
        else if ( $$$('#battleWeapons_5_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_5').click(); GM_setValue("weapsel", '#battleWeapons_5_5'); fight(); } //Looking for Q5 Weapons
        else if ( $$$('#battleWeapons_5_4') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_4').click(); GM_setValue("weapsel", '#battleWeapons_5_4'); fight(); } //Looking for Q4 Weapons
        else if ( $$$('#battleWeapons_5_3') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_3').click(); GM_setValue("weapsel", '#battleWeapons_5_3'); fight(); } //Looking for Q3 Weapons
        else if ( $$$('#battleWeapons_5_2') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_2').click(); GM_setValue("weapsel", '#battleWeapons_5_2'); fight(); } //Looking for Q2 Weapons
        else if ( $$$('#battleWeapons_5_1') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_5_1').click(); GM_setValue("weapsel", '#battleWeapons_5_1'); fight(); } //Looking for Q1 Weapons
        else { GM_setValue("weapsel", '#battleWeapons_0_0'); fight(); }} //Didn't find any weapons. Fight with bare hands.
    else { GM_setValue("weapsel", '#battleWeapons_0_0'); fight(); } //Fight with bare hands. Not defined what weapon to be used.
}

//Settings responsible functions begining
function setmenu() {
    if ( $$$('#sset') ) { $('#sset').remove(); main(); }
    else {
        $('#conteinerset').after('<div id=\'sset\' class=\'text\'></div>');
        $('#sset').append('<input id=\'htdm\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("kills") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Maximum hits to do (when maintaining)</label>');
        $$$('#htdm').addEventListener('input', fcdtm);
        $('#sset').append('<br><input id=\'wtf\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("wtf") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;When to fight \(change this if you want to make more hits\)</label>');
        $$$('#wtf').addEventListener('input', fwtf);
        $('#sset').append('<br><input id=\'wte\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("wte") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;When to eat</label>');
        $$$('#wte').addEventListener('input', fwte);
        $('#sset').append('<br><input id=\'wep\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("wep") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Weapon to use \(no \(fights without weapons\), <BR>&nbsp;auto \(selects available weapon starting from the strongest\) , rpg , weapon , tank , heli , sub , ship , air\)</label>');
        $$$('#wep').addEventListener('input', fwep);
        $('#sset').append('<br><input id=\'rpg\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("rpg") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Use RPG or not \(if you want auto selecting weapon to start from RPG\)</label>');
        $$$('#rpg').addEventListener('input', frpg);
        $('#sset').append('<br><input id=\'side\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("side") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Side to fight for. 3 - Defenders, 1 - Resistanse</label>');
        $$$('#side').addEventListener('input', fside);
        $('#sset').append('<br><input id=\'battle\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("battle") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Input battle number and side e.g. 46000/2 \(Don\'t use copy\/paste\)</label>');
        $$$('#battle').addEventListener('input', fbattle);
        $('#sset').append('<br><input id=\'link1\' class=\'text\' style= \'width: 580px; height: 20px;\' value=\'' + GM_getValue("link1") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Link 1</label>');
        $$$('#link1').addEventListener('input', flink1);
        $('#sset').append('<br><input id=\'link1name\' class=\'text\' style= \'width: 200px; height: 20px;\' value=\'' + GM_getValue("link1name") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Name for Link 1</label>');
        $$$('#link1name').addEventListener('input', flink1name);
        $('#sset').append('<br><input id=\'link2\' class=\'text\' style= \'width: 580px; height: 20px;\' value=\'' + GM_getValue("link2") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Link 2</label>');
        $$$('#link2').addEventListener('input', flink2);
        $('#sset').append('<br><input id=\'link2name\' class=\'text\' style= \'width: 200px; height: 20px;\' value=\'' + GM_getValue("link2name") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Name for Link 2</label>');
        $$$('#link2name').addEventListener('input', flink2name);
        $('#sset').append('<br><input id=\'link3\' class=\'text\' style= \'width: 580px; height: 20px;\' value=\'' + GM_getValue("link3") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Link 3</label>');
        $$$('#link3').addEventListener('input', flink3);
        $('#sset').append('<br><input id=\'link3name\' class=\'text\' style= \'width: 200px; height: 20px;\' value=\'' + GM_getValue("link3name") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Name for Link 3</label>');
        $$$('#link3name').addEventListener('input', flink3name);
    }
}

function fcdtm() { GM_setValue("kills", this.value); }
function fwtf() { GM_setValue("wtf", this.value); }
function fwte() { GM_setValue("wte", this.value); }
function fwep() { GM_setValue("wep", this.value); }
function frpg() { GM_setValue("rpg", this.value); }
function fside() { GM_setValue("side", this.value); }
function fbattle() { GM_setValue("battle", this.value); }
function flink1() { GM_setValue("link1", this.value); }
function flink1name() { GM_setValue("link1name", this.value); }
function flink2() { GM_setValue("link2", this.value); }
function flink2name() { GM_setValue("link2name", this.value); }
function flink3() { GM_setValue("link3", this.value); }
function flink3name() { GM_setValue("link3name", this.value); }
//Settings responsible functions End

//Auto Fight section starts here
function afmenu() {
    if ( $$$('#afset') ) { }
    else {
        $('#screenBattle > div.clearfix').after('<div id=\'afset\' class=\'text\'></div>');
        $('#afset').append('<br><input id=\'htm\' class=\'fa.fa-cog\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("htm") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;How many times script to trigger fight button. </label>');
        $$$('#htm').addEventListener('input', fhtm);
        $('#afset').append('<br><input id=\'allin\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("allin") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Options: bars , kits , autobars (uses bars first, but temp first) , autokits (uses hypers first, but temp first), ff (uses only food, but temp bars and hypers first)</label>');
        $$$('#allin').addEventListener('input', fallin);
        $('#afset').append('<br><input id=\'wep\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("wep") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Weapon to use \(no \(fights without weapons but uses temp rpg first\), <BR>&nbsp;auto \(selects available weapon starting from the strongest but uses temp rpg first\) , rpg , weapon\)</label>');
        $$$('#wep').addEventListener('input', fwep);
        $('#afset').append('<br><input id=\'rpg\' class=\'text\' style= \'width: 40px; height: 20px;\' value=\'' + GM_getValue("rpg") + '\'></input><label class=\'col-lg-2.control-label\'>&nbsp;Use RPG or not \(if you want auto selecting weapon to start from RPG but uses temp rpg first\)</label>');
        $$$('#rpg').addEventListener('input', frpg);
        $('#afset').append('<br><a id=\'fset\' class=\'btn btn-default vs609 vs609-1 vs151-17\'>Lets roll</a>');
        $$$('#fset').addEventListener('click', armory); }
}

function fhtm() { GM_setValue("htm", this.value); }
function fallin() { GM_setValue("allin", this.value); }

function autofight() {
    var energy = $$$('#energyBarT').innerText.split(' / ')[0];
    var maxenergy = $$$('#energyBarT').innerText.split(' / ')[1];
    var regen = $$$('#energyButtonT').innerText;
    cd++;
    if ( cd <= GM_getValue("htm") ) {
        if ( !$$$('' + GM_getValue("weapsel") + '') ) { armory(); }
        else {
            if ( $$$('#battleCaptcha').style.display == 'block' ) {
                var battleID = location.href.split('/')[5];
                var battleSide = location.href.split('/')[6];
                setTimeout(function() {
                    var captchaurl = 'https://www.erev2.com/en/battlefield-update/10/' + battleID + '/' + battleSide + '/captchaInput/0';
                    $.getJSON(captchaurl, function(data) { var captcha = data.map(function (item) { return item.ode.replace(/ .*/, ''); }); $('#CaptchaInput').val($('#CaptchaInput').val()+ captcha); $("#CaptchaSend > div").click(); });
                }, 2000);
                setTimeout(autofight, 5000);
                $('#count').text('It is captcha time');
                cd = 0;
                hd = 0; }
            else {
                if ( energy >= 1000) {
                    if ( $$$('#battleLog').style.display == 'block' || $$$('#battleBlack').style.display == 'block' ) { setTimeout(autofight, 200); cd--;}
                    else { $$$('#battleFight').click(); hitsmade(); setTimeout(autofight, 1600); }}
                else if ( regen >= 50 ) { cd--; $$$('#energyButton').click(); setTimeout(autofight, 3000); }
                else if ( regen < 50 && energy < 1000 ) {
                    if ( GM_getValue("allin") == 'kits' ) { cd--; setTimeout(fightkits, 1000); }
                    else if ( GM_getValue("allin") == 'bars' ) { cd--; setTimeout(fightbars, 1000); }
                    else if ( GM_getValue("allin") == 'autobars' ) { cd--; setTimeout(fightbars, 1000); }
                    else if ( GM_getValue("allin") == 'autokits' ) { cd--; setTimeout(fightkits, 1000); }
                    else { cd--; $('#count').text('Only ' + hd + ' hits can be done on FF'); cd = 0; affin = setTimeout(function() { location.href = 'https://erev2.com/en'; }, 150000); }}
                else { $('#count').text('No condition is met'); affin = setTimeout(function() { location.href = 'https://erev2.com/en'; }, 150000); }}}}
    else { cd--; $('#count').text(hd + ' hits - Target reached'); GM_setValue("autofight", 0); cd = 0; affin = setTimeout(function() { location.href = 'https://erev2.com/en'; }, 150000); }
}

function hitsmade() {
    var energy = $$$('#energyBarT').innerText.split(' / ')[0];
    if ( energy >= 1000 ) {
        if ( $$$('' + GM_getValue("weapsel") + '').innerText >= 100 ) { hd = hd + 100; $('#count').text(hd  + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 100 && $$$('' + GM_getValue("weapsel") + '').innerText >= 50) { hd = hd + 20; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 50 && $$$('' + GM_getValue("weapsel") + '').innerText >= 20) { hd = hd + 20; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 20 && $$$('' + GM_getValue("weapsel") + '').innerText >= 10) { hd = hd + 10; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 10 && $$$('' + GM_getValue("weapsel") + '').innerText >= 5) { hd = hd + 5; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 5 ) { hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
        else { hd = hd + 100; $('#count').text(hd  + ' weapons spent so far'); }}
    else if ( energy < 1000 && energy >= 500 ) {
        if ( $$$('' + GM_getValue("weapsel") + '').innerText >= 50) { hd = hd + 50; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 50 && $$$('' + GM_getValue("weapsel") + '').innerText >= 20) { hd = hd + 10; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 20 && $$$('' + GM_getValue("weapsel") + '').innerText >= 10) { hd = hd + 10; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 10 && $$$('' + GM_getValue("weapsel") + '').innerText >= 5) { hd = hd + 5; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 5 ) { hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
        else { hd = hd + 50; $('#count').text(hd  + ' weapons spent so far'); }}
    else if ( energy < 500 && energy >= 200 ) {
        if ( $$$('' + GM_getValue("weapsel") + '').innerText >= 20) { hd = hd + 20; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 20 && $$$('' + GM_getValue("weapsel") + '').innerText >= 10) { hd = hd + 10; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 10 && $$$('' + GM_getValue("weapsel") + '').innerText >= 5) { hd = hd + 5; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 5 ) { hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
        else { hd = hd + 20; $('#count').text(hd  + ' weapons spent so far'); }}
    else if ( energy < 200 && energy >= 100 ) {
        if ( $$$('' + GM_getValue("weapsel") + '').innerText >= 10) { hd = hd + 10; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 10 && $$$('' + GM_getValue("weapsel") + '').innerText >= 5) { hd = hd + 5;  $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 5 ) { hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
        else { hd = hd + 10; $('#count').text(hd  + ' weapons spent so far'); }}
    else if ( energy < 100 && energy >= 50 ) {
        if ( $$$('' + GM_getValue("weapsel") + '').innerText >= 5) { hd = hd + 5; $('#count').text(hd + ' weapons spent so far'); }
        else if ( $$$('' + GM_getValue("weapsel") + '').innerText < 5 ) { hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
        else { hd = hd + 5; $('#count').text(hd  + ' weapons spent so far'); }}
    else if ( energy < 50 && energy >= 10 ) {
        hd = hd + 1; $('#count').text(hd + ' weapons spent so far'); }
}

function armory() {
    GM_setValue("autofight", 1);
    clearTimeout(affin);
    if (GM_getValue("wep") == 'auto' ) { autoweaponchoose(); }
    else { weaponchoosed(); }
}

function hospital () { //Check for hospital and use it if available.
    if (GM_getValue("wep") != 'no' ) { setTimeout(function() { $$$('#battleHospital').click(); setTimeout(armory, 1000); }, 1000); }
    else { setTimeout(function() { $$$('#battleHospital').click(); setTimeout(autofight, 1000); }, 1000);}
}

function fightkits() {
    if (GM_getValue("wep") != 'no' ) { //Fight with weapon
        if ( $$$('#battleWeapons_37_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_37_5').click(); setTimeout(armory, 1000); } //Looking for temp hypers
        else if ( $$$('#battleWeapons_17_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_17_5').click(); setTimeout(armory, 1000); } //Looking for regular hypers
        else if ( GM_getValue("allin") == 'autokits' ) { fightbars(); }
        else { console.log('Something went wrong or work is done'); }}
    else { //Fight with bare hands
        if ( $$$('#battleWeapons_37_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_37_5').click(); setTimeout(fight, 1000); } //Looking for temp hypers
        else if ( $$$('#battleWeapons_17_5') ) { $$$('.vs912-7').click(); $$$('#battleWeapons_17_5').click(); setTimeout(fight, 1000); } //Looking for regular hypers
        else if ( GM_getValue("allin") == 'autokits' ) { fightbars(); }
        else { console.log('Something went wrong or work is done'); }}
}

function fightbars() {
    if ( GM_getValue("wep") != 'no' && $$$('#battleEnergy') ) { $$$('#battleEnergy').click(); setTimeout(armory, 2000); }
    else if ( $$$('#battleEnergy') ){ $$$('#battleEnergy').click(); setTimeout(fight, 2000); }
    else if ( GM_getValue("allin") == 'autobars' ) { fightkits(); }
    else { console.log('Something went wrong or work is done'); }
}
//Auto Fight section ends here

login();
