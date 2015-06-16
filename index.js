#!/usr/bin/env node
var fs = require('fs');
var mkdirp = require('mkdirp');
var writefile = require('writefile');
var cpr = require('cpr');
var ncp = require('ncp');
var p = require("path");
var argv = require('yargs').usage('Usage: --name "Icecream" --path "~/Documents/myWebApp" --os: (ios, android, win) --lib (jquery, chocolatechip) --type (plain, navigation, tab, slideout').argv;
//var path = process.env.HOME + '/Desktop/';
var name = argv.name || argv.n;
var path = argv.path || argv.p || process.env.HOME + '/Desktop/';
var os = 'ios';
var lib = "jquery";
var whichLib = "http://code.jquery.com/jquery-2.1.4.min.js";
if (argv.os) os = argv.os;
if (argv.lib || argv.l) lib = argv.lib || argv.l;
if (lib === 'chocolatechip') whichLib = "./chui/chocolatechip-3.8.11.js";
var chuiVersion = "3.8.9";

var pkg = require('./package.json');

var noop = function() {};

if (!name) {
  console.log('Please provide a name for the project using "--name" or "--n": chui --name Fruits.');
  return;
}

var template = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="utf-8">\n\
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\
  <meta name="apple-mobile-web-app-capable" content="yes">\n\
  <meta name="mobile-web-app-capable" content="yes">\n\
  <meta name="msapplication-tap-highlight" content="no">\n\
  <title>' + name + '</title>\n\
  <link rel="stylesheet" href="./chui/chui-' + os + '-' + chuiVersion + '.css">\n\
  <script src="' + whichLib + '"></script>\n\
  <script src="./chui/chui-' + chuiVersion + '.js"></script>\n\
  <script>\n\
    $(function() {\n\
\n\
    });\n\
  </script>\n\
</head>\n\
<body>\n\
<nav class="current">\n\
  <h1>' + name + '</h1>\n\
</nav>\n\
<article class="current" id="main">\n\
  <section>\n\
    \n\
  </section>\n\
</article>\n\
</body>\n\
</html>';

var navigationTemplate = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="utf-8">\n\
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\
  <meta name="apple-mobile-web-app-capable" content="yes">\n\
  <meta name="mobile-web-app-capable" content="yes">\n\
  <meta name="msapplication-tap-highlight" content="no">\n\
  <title>' + name + '</title>\n\
  <link rel="stylesheet" href="./chui/chui-' + os + '-' + chuiVersion + '.css">\n\
  <script src="' + whichLib + '"></script>\n\
  <script src="./chui/chui-' + chuiVersion + '.js"></script>\n\
    <script>\n\
    $(function() {\n\
      var items = [\n\
        {\n\
          title: "Item One",\n\
          subtitle: "A very important item",\n\
          detail: "This is item one, so, whatever."\n\
        },\n\
        {\n\
          title: "Item Two",\n\
          subtitle: "Being number two is not that bad",\n\
          detail: "Well, item two is not item one. But that should be too discouraging."\n\
        },\n\
        {\n\
          title: "Item Three",\n\
          subtitle: "Better than nothing",\n\
          detail: "And this is the very last one. Guess that means boring."\n\
        }\n\
      ];\n\
      $.template.data["items"] = items;\n\
      $.template.repeater();\n\
      var detailTemplate = "<li><h3>[[= data.title]]</h3><h4>[[= data.subtitle]]</h4><p>[[= data.detail]]</p></li>";\n\
      var parsedDetail = $.template(detailTemplate);\n\
      $("#item-list").on("singletap", "li", function() {\n\
        var itemID = $(this).attr("data-id");\n\
        $("#detail-list").html(parsedDetail(items[itemID]));\n\
      });\n\
    });\n\
  </script>\n\
</head>\n\
<body>\n\
  <nav class="current">\n\
    <h1>' + name + '</h1>\n\
  </nav>\n\
  <article class="current" id="main">\n\
    <section>\n\
      <h2>Items</h2>\n\
      <ul class="list" id="item-list" data-repeater="items" class="cloak">\n\
        <li class="comp" data-goto="detail" data-id="[[= $.template.index]]"">\n\
          <div>\n\
            <h3>[[= data.title]]</h3>\n\
          </div>\n\
          <aside><span class="nav"></span></aside>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
  <nav class="next">\n\
    <button class="back">Back</button>\n\
    <h1>Detail</h1>\n\
  </nav>\n\
  <article id="detail" class="next">\n\
    <section>\n\
      <h2>Item</h2>\n\
      <ul class="list" id="detail-list">\n\
        <li>\n\
          <h3></h3>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
</body>\n\
</html>';

var tabbarTemplate = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="utf-8">\n\
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\
  <meta name="apple-mobile-web-app-capable" content="yes">\n\
  <meta name="mobile-web-app-capable" content="yes">\n\
  <meta name="msapplication-tap-highlight" content="no">\n\
  <title>' + name + '</title>\n\
  <link rel="stylesheet" href="./chui/chui-' + os + '-' + chuiVersion + '.css">\n\
  <script src="' + whichLib + '"></script>\n\
  <script src="./chui/chui-' + chuiVersion + '.js"></script>\n\
  <script type="text/javascript">\n\
    $(function() {\n\
      var opts = {\n\
         tabs : 5,\n\
         imagePath : "../icons-ios/",\n\
         icons : ["apple", "orange", "banana", "mango", "avocado"],\n\
         labels : ["Apple", "Orange", "Banana", "Mango", "Avocado"],\n\
         selected : 1\n\
      };\n\
      $.UITabbar(opts);\n\
    });\n\
  </script>\n\
  <style>\n\
    /*\n\
      Styles for iOS tab bar.\n\
      By using the .isiOS and .isDesktopSafari classes,\n\
      we can style the tab bar icons just for Safari\n\
      without affecting the look of Android and Windows Phone 8.\n\
    */\n\
    .isiOS .tabbar > button > .icon,\n\
    .isSafari .tabbar > button > .icon {\n\
      background-color: #929292;\n\
      -webkit-mask-position: center center;\n\
      -webkit-mask-size: 100%;\n\
      -webkit-mask-repeat: no-repeat;\n\
    }\n\
    .isiOS .tabbar > button.selected > .icon,\n\
    .isiOS .tabbar > button:hover > .icon {\n\
      background-color: #007aff;\n\
    }\n\
    .tabbar > button.apple > .icon  {\n\
      -webkit-mask-image: url(\'data:image/svg+xml;utf8,<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Artboard-1" stroke="#000000"><path d="M12.7832251,28.0544501 C13.1640044,28.0544501 9.95252242,28.0544501 16.0187817,28.0544501 C22.0850409,28.0544501 26.9535377,22.3433257 27.2734107,16.0000001 C27.6643752,8.2468749 20.9825164,3.5015617 18.7409115,4.60755853 C15.6786316,6.11847239 13.6578113,4.60911335 13.0010975,4.22518447 C9.26435977,2.04060772 1.71377842,7.69406959 2,16 C2.14555945,20.2240234 5.60352296,28.0544501 12.7832251,28.0544501 Z" id="Oval-1" stroke-width="2"></path><path d="M15.4458452,4.55486506 C15.4458452,4.55486506 15.137429,3.28125003 15.6081321,2.85795455 C16.0788352,2.43465906 17.0559304,1.28551136 17.0559304,1.28551136 L18.6067116,2.04314631 C18.6067116,2.04314631 17.4909446,2.09854412 16.8680753,3.12322443 C16.245206,4.14790474 16.0138494,4.65216619 16.0138494,4.65216619 L15.4458452,4.55486506 Z" id="Path-1"></path></g></g></svg>\');\n\
    }\n\
    .tabbar > button.orange > .icon  {\n\
      -webkit-mask-image: url(\'data:image/svg+xml;utf8,<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Artboard-1" stroke="#000000"><circle id="Oval-1" stroke-width="2" cx="15" cy="15" r="12"></circle><path d="M14.2589989,7.73032575 L12.438701,9.13132818 L15.3099792,9.11506083 L16,10.760439 L16.8901052,8.43713285 L20.3395139,8.40441537 L17.1322876,6.76123053 L18.2563796,5.63933191 L16,6.15842478 L12.5693881,5.36644259 L14.2589989,7.73032575 Z" id="Path-1"></path><circle id="Oval-2" fill="#D8D8D8" cx="6.5" cy="13.5" r="0.5"></circle><circle id="Oval-2-copy" fill="#D8D8D8" cx="6.5" cy="18.5" r="0.5"></circle><circle id="Oval-2-copy-2" fill="#D8D8D8" cx="13.5" cy="19.5" r="0.5"></circle><circle id="Oval-2-copy-3" fill="#D8D8D8" cx="8.5" cy="22.5" r="0.5"></circle><circle id="Oval-2-copy-3" fill="#D8D8D8" cx="17.5" cy="24.5" r="0.5"></circle></g></g></svg>\');\n\
    }\n\
    .tabbar > button.banana > .icon {\n\
      -webkit-mask-image: url(\'data:image/svg+xml;utf8,<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Artboard-1" stroke="#000000" stroke-width="2"><path d="M3.19554265,24.0322177 L2.96962758,24.677611 L4.158789,24.9590918 C4.158789,24.9590918 6.77907745,26.2137903 7.69172784,26.211312 C16.5228865,26.1873309 19.9213425,23.7827918 22.4403631,20.5159117 C24.9593837,17.2490317 24.8651964,12.1457634 24.4253454,10.394698 C23.9854943,8.64363254 22.991806,7.6571938 22.9918069,7.12276775 C22.9918078,6.5883417 24.9956159,3.59257061 24.9956159,3.59257061 L22.6843728,3.20507875 L20.3091579,6.37227637 C20.3091579,6.37227637 19.5309409,10.4358236 19.3632755,11.3928553 C19.19561,12.349887 18.249236,15.52403 16.0217065,18.0935395 C13.794177,20.663049 7.69113728,21.6791936 6.98492067,21.9428698 C6.27870406,22.206546 3.45417522,22.8308112 3.45417522,22.8308112 L3.19554265,24.0322177 Z" id="Path-1"></path><path d="M4.13332454,19.3744407 L3.97929153,19.9075917 L4.79008341,20.1401193 C4.79008341,20.1401193 6.57664371,21.1766094 7.19890534,21.1745621 C13.2201499,21.1547516 15.537279,19.1683932 17.254793,16.4696662 C18.9723071,13.7709392 18.9080884,9.55519585 18.60819,8.10866354 C18.3082916,6.66213123 17.6307768,5.84724705 17.6307774,5.40576466 C17.630778,4.96428227 18.9970108,2.48951485 18.9970108,2.48951485 L17.4211633,2.16941288 L15.8016986,4.78579352 C15.8016986,4.78579352 15.2710961,8.14263688 15.1567787,8.93322831 C15.0424613,9.72381973 14.3972064,12.3459379 12.8784363,14.4685761 C11.3596661,16.5912144 7.19850269,17.4306382 6.71699137,17.6484577 C6.23548004,17.8662772 4.30966493,18.3819744 4.30966493,18.3819744 L4.13332454,19.3744407 Z" id="Path-2" transform="translate(11.500000, 11.500000) rotate(14.000000) translate(-11.500000, -11.500000) "></path></g></g></svg>\');\n\
    }\n\
    .tabbar > button.mango > .icon  {\n\
      -webkit-mask-image: url(\'data:image/svg+xml;utf8,<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Artboard-1" stroke="#000000" stroke-width="2"><path d="M15,27 C21.6274173,27 26.0895505,19.7045547 26.7082564,12.758215 C27.2628011,6.5322272 21.2077007,1.18207877 16.1141983,3.05104111 C14.8595216,3.51142048 15,3.38712682 14.1197062,3.05104111 C7.92937375,0.687645905 2.50207845,5.984785 3.08678905,12.7582154 C3.67149965,19.5316457 8.37258267,27 15,27 Z" id="Oval-1"></path><path d="M18.0127349,6.01048574 C18.0127349,6.01048574 20.3654535,6.49821127 21.5016088,9.39160585 C22.6377642,12.2850004 22.632894,13.8590882 21.5016088,16.6592713 C20.3703237,19.4594545 17.4949638,22.5018951 16.7184604,22.8171016" id="Path"></path></g></g></svg>\');\n\
    }\n\
    .tabbar > button.avocado > .icon {\n\
      -webkit-mask-image: url(\'data:image/svg+xml;utf8,<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Artboard-1" stroke="#000000"><path d="M14,27 C18.5060694,27.0000008 24.1330805,20.1170882 25.0879192,12.27312 C25.8167241,6.28601196 19.0459709,0.855269586 15.7497311,3.37195614 C15.0607444,3.89799902 14.5220184,4.35695364 13.5220184,3.37195614 C10.1617969,0.0621463502 3.05666119,6.14152614 3.73711743,12.7313473 C4.34814825,18.6488237 9.4939306,26.9999992 14,27 Z" id="Oval-1" stroke-width="2"></path><path d="M14.5,18 C16.5964077,18 18.8546011,15.4209428 19.213031,12.3423929 C19.5714609,9.26384306 16.9852814,8 14.5,8 C12.0147186,8 9.65057227,9.24958634 9.99474546,12.3423929 C10.3389187,15.4351995 12.4035923,18 14.5,18 Z" id="Oval-2" fill-opacity="0.130463089" fill="#000000"></path></g></g></svg>\');\n\
    }\n\
  </style>\n\
</head>\n\
<body>\n\
  <nav class="current">\n\
    <h1>Apple</h1>\n\
  </nav>\n\
  <article id="music" class="current">\n\
    <section>\n\
      <h2>Uses</h2>\n\
      <ul class="list">\n\
        <li>\n\
          <h3>Fruit Salad</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Juice</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Pastries</h3>\n\
        </li>\n\
      </ul>  \n\
    </section>\n\
  </article>\n\
  <nav class="next">\n\
    <h1>Orange</h1>\n\
  </nav>\n\
  <article id="pictures" class="next">\n\
    <section>\n\
      <h2>Uses</h2>\n\
      <ul class="list">\n\
        <li>\n\
          <h3>Juice</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Fruit Salad</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Smoothies</h3>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
  <nav class="next">\n\
    <h1>Banana</h1>\n\
  </nav>\n\
  <article id="documents" class="next">\n\
    <section>\n\
      <h2>Uses</h2>\n\
      <ul class="list">\n\
        <li>\n\
          <h3>Fruit Salad</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Smoothies</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Pastries</h3>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
  <nav class="next">\n\
    <h1>Mango</h1>\n\
  </nav>\n\
  <article id="recipes" class="next">\n\
    <section>\n\
      <h2>Uses</h2>\n\
      <ul class="list">\n\
        <li>\n\
          <h3>Pastires</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Fruit Salad</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Smoothies</h3>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
  <nav class="next">\n\
    <h1>Avocado</h1>\n\
  </nav>\n\
  <article id="favorites" class="next">\n\
    <section>\n\
      <h2>Uses</h2>\n\
      <ul class="list">\n\
        <li>\n\
           <h3>Salad</h3>\n\
        </li>\n\
        <li>\n\
           <h3>Guacamole</h3>\n\
        </li>\n\
        <li>\n\
           <h3>Smoothies</h3>\n\
        </li>\n\
       </ul>\n\
    </section>\n\
  </article>\n\
</body>\n\
</html>';

var slideoutTemplate = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="utf-8">\n\
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\
  <meta name="apple-mobile-web-app-capable" content="yes">\n\
  <meta name="mobile-web-app-capable" content="yes">\n\
  <meta name="msapplication-tap-highlight" content="no">\n\
  <title>' + name + '</title>\n\
  <link rel="stylesheet" href="./chui/chui-' + os + '-' + chuiVersion + '.css">\n\
  <script src="' + whichLib + '"></script>\n\
  <script src="./chui/chui-' + chuiVersion + '.js"></script>\n\
  <script>\n\
    $(function() {\n\
      var fruitsData = [\n\
        {\n\
          name: "Apples",\n\
          data: ["Apple Juice", "Apple Pie"]\n\
        },\n\
        {\n\
          name: "Oranges",\n\
          data: ["Oranges Juice","Oranges Sherbet"]\n\
        },\n\
        {\n\
          name: "Bananas",\n\
          data: ["Banana Pudding","Banana Bread"]\n\
        },\n\
        {\n\
          name: "Mangos",\n\
          data: ["Mango Smoothie","Mango Ice Cream"]\n\
        }\n\
      ];\n\
      $.UISlideout({\n\
        dynamic: true, \n\
        callback: function(li) {\n\
          var fruit = $(li).index();\n\
          renderChosenFruit(fruit);\n\
        }\n\
      });\n\
      var renderChosenFruit = function(fruit) {\n\
         $("h1").text(fruitsData[fruit].name);\n\
         $("#uses").empty();\n\
         fruitsData[fruit].data.forEach(function(use) {\n\
           $("#uses").append("<li><h3>" + use + "</h3></li>");\n\
         });\n\
      };\n\
      $.UISlideout.populate([\n\
        {apples:"Apples"},\n\
        {oranges:"Oranges"},\n\
        {bananas:"Bananas"},\n\
        {mangos:"Mangos"}\n\
      ]);\n\
    });\n\
  </script>\n\
</head>\n\
<body>\n\
  <nav>\n\
    <h1>Apples</h1>\n\
  </nav>\n\
  <article id="chosenFruit">\n\
    <section>\n\
      <ul class="list" id="uses">\n\
        <li>\n\
          <h3>Apple Juice</h3>\n\
        </li>\n\
        <li>\n\
          <h3>Apple Pie</h3>\n\
        </li>\n\
      </ul>\n\
    </section>\n\
  </article>\n\
</body>\n\
</html>';

/////////////////////////////////////////////////////////
// Define function to create directories and write files:
/////////////////////////////////////////////////////////
var createProject = function() {
  // console.log(name);
  // if (path) {
  //   console.log(path);
  // }
  // console.log(os);
  if (name) {
    ncp.limit = 16;
    mkdirp(p.join(path, name), noop);
    if ((argv.type && argv.type === 'navigation') || (argv.t && argv.t === 'navigation')) {
      writefile(p.join(path, name, 'index.html'), navigationTemplate, noop);
    } else if ((argv.type && argv.type === 'tabbar') || (argv.t && argv.t === 'tabbar')) {
      writefile(p.join(path, name, 'index.html'), tabbarTemplate, noop);
    } else if ((argv.type && argv.type === 'slideout') || (argv.t && argv.t === 'slideout')) {
      writefile(p.join(path, name, 'index.html'), slideoutTemplate, noop);
    } else {
      writefile(p.join(path, name, 'index.html'), template, noop);
    }
    
    switch(os) {
      case 'android':
        mkdirp(p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'chui'), p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'themes', 'android'), p.join(path, name, 'chui'), noop);
        break;
      case 'ios':
        mkdirp(p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'chui'), p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'themes', 'ios'), p.join(path, name, 'chui'), noop);
        break;
      case 'win':
        mkdirp(p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'chui'), p.join(path, name, 'chui'), noop);
        ncp(p.join('dist', 'themes', 'windows'), p.join(path, name, 'chui'), noop);
        break;
    }
    if (lib === 'chocolatechip') {
      ncp(p.join('dist', 'chocolatechip'), p.join(path, name, 'chui'), noop);
      cpr(p.join('dist', 'typings', 'chocolatechip'), p.join(path, name, 'typings', 'chocolatechip'), noop);
      cpr(p.join('dist', 'typings', 'chui'), p.join(path, name, 'typings', 'chui'), noop);
      writefile(p.join(path, name, 'typings', 'tsd.d.ts'), '/// <reference path="chocolatechip/chocolatechip.d.ts" />\n/// <reference path="chui/chui.d.ts" />', noop);
    } else {
      cpr(p.join('dist', 'typings', 'jquery'), p.join(path, name, 'typings', 'jquery'), noop);
      cpr(p.join('dist', 'typings', 'chui'), p.join(path, name, 'typings', 'chui'), noop);
      writefile(p.join(path, name, 'typings', 'tsd.d.ts'), '/// <reference path="jquery/jquery.d.ts" />\n/// <reference path="chui/chui.d.ts" />', noop);
    }
  }

}

createProject();