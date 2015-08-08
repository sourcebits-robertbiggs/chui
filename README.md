# chui

##NPM module to generate ChocolateChip-UI apps.

[TypeScript definitions on DefinitelyTyped](http://definitelytyped.org)

This module enables you to create a shell for several types of ChocolateChip-UI apps. Depending on the arguments you provide, you can customize the output to suit your needs.

###Install

To install on Mac OS X, run, you'll need to provide your password to complete the installation:


```
sudo npm install chui -g
```

For Windows run:


```
npm install chui -g
```

###Parameters

Usage:

- **name** The name for your app. This is required. This will create a folder with this name, and, depending on the type of app, may also update app info to display it.
- **path** The path where you want your project to be. If none is provided, it will be output to your desktop in a folder with your project's name.
- **os** The operating system you wish to target. If none is provided it defaults to iOS. The expected values are: "ios", "android", "win".
- **lib** The library that ChocolateChip-UI will run on. The default is jQuery, but if you want to use ChocolateChipJS, you can pass in the value "chocolatechip" for lib.
- **type** The type of app that will be created. The default is an empty shell with no specific functionality. You can choose any of the following types: "navigation": a dynamic navigation list, "tabbar": a tabbar interface, "slideout": a dynamic slideout menu system.

When using names or paths that have spaces, you will need to quote those to get the correct result.

###Usage


```
// Create a plain file in a folder named Fruits in ~/Documents/Dev 
// with the Android theme, default libarary will be jQuery:
chui --name Fruits --path ~/Documents/Dev/ --os android 

// or create a tabbar interface in a folder Fruits on the desktop 
// for iOS using the library ChocolateChipJS:
chui --name Fruits --lib chocolatechip --os ios --type tabbar

// or create a slide out menu for Windows Phone in Fruits on the desktop, 
// default libarary will be jQuery:
chui --name Fruits --os win --type slideout
```

You can also use shortened versions of the command flags: <code>n</code> for <code>name</code>, <code>p</code></code> for <code>path</code>, <code>l</code> for <code>lib</code>, and <code>t</code> for <code>type</code>:


```
// Create a plain file in a folder named Fruits in ~/Documents/Dev 
// with the Android theme, default libarary will be jQuery:
chui --n Fruits --p ~/Documents/Dev/ --os android 

// or create a tabbar interface in a folder Fruits on the desktop 
// for iOS using the library ChocolateChipJS:
chui --n Fruits --l chocolatechip --os ios --t tabbar

// or create a slide out menu for Windows Phone in Fruits on the desktop, 
// default libarary will be jQuery:
chui --n Fruits --os win --t slideout
```

When using the shortened forms, you can put a single hyphen:


```
// or create a tabbar interface in a folder Fruits on the desktop 
// for iOS using the library ChocolateChipJS:
// (Notice that os needs two hyphens)
chui -n Fruits -p ~/Desktop/Dev -l chocolatechip --os android -t tabbar
```

###Troubleshooting

If for some reason your path isn't working, check that you are using the correct path delimiters for your platform (Mac or Windows). Check to see if a name in the path has a space. If it has any spaces, enclose the path in quotes, single or double.

If you are trying to create an app for Android or Windows and you keep getting iOS, check the os flag. It needs two hyphens: ```chui --os android```, or ```chui --os win```.

If after running a command you get this error:

```
throw new TypeError('Arguments to path.join must be strings');
```
Check your hyphens. You're missing a double hyphen for an argument somewhere. Only single letter flags can use one hyphen. Two hyphens are required in all other cases.

