# Pausing this project for good. (hopefully i will not regret it)

# Electron-vite | React Typescript | Vanilla CSS | Default Electron Backend

## Why?
- I started this project with the vibes and hopes of learning Electron.
- Thought i should just build an app that builds a static website.
- Now regretting it that its taking too long to fully complete and since I have very limited time due to college (diploma), I cant just run back and forth in this project. Read "My thoughts Dump" to fully understand.

### How it all works?

- First of all we have the basic react-ts setup inside the electron setup.

### Frontend 

- In the app.tsx you can see that the default root is Dashboard.tsx and Dashboard.tsx further has NavDashboard.tsx, SideDashboard.tsx, and Mainly, MainDashboard.tsx.
- I also have created Styles folder for all the CSS files.
- The CSS files name match with the .tsx files.
- I also have the interface folder where there are 3 folders.
- The first one is Default sections with a follow up folder "Navbar" that has default .ts Navbar Object. 
- This Navbar Object is the thing that is written in the kupo.config.json file when the user picks the Navbar component.
- Secondly, There is presets folder with presets like Background, Font family and styles. just read them again and you will understand.
- at Last there is Types, For interface types like navbar, Hero etc only for dev use.

- I also have created a seperate lib folder wehre there is ipc.ts which basically exports the window.electronAPI.x() function so that i can be used as x() anywhere in the project i want. 

- Assets folder inside the components contain the Pictures or logo i am using.

- The NavDashboard.tsx has a documentation and Github link that ofc dont properly work, Has a logo, A build Button that ofc also doesnt work, And finally have my own custom 3 buttons for window function.

- The SideDashboard.tsx allows user to basically add a project and rename it and delete it. On every change it sends a respective function to the backend, to do the same thing.
 
- The SideDashboard.tsx was heavily written by chatGPT so dont be surprised when you cant understand how it works.

- The MainDashboard.tsx has 3 conditions basically on what to dispaly
- first its a "No project selected". 
- secondaly its when the user dont have any components added to their project so it basically asks what component to add (only Navbar works).
- Thirdly, When the component is selected and it shows The component and yeah the Navbar works only.
- The showing component part is the most complex beacuse it includes RenderSection.tsx and StyleDialog.tsx 
- Basically the data of the components gets sent to the renderSection.tsx and based on the type it shows the UI, a lot of dropdowns , Loops and you will have to study it yourself, when you comeback later.

- styleDialog basically gets waht is being edited and on the based of whats being edited, it shows the right inputs.

- agian you will have to study all the if else statements, every thign is handled differently. 

- Then its all sent back to a function called updateData({pathParts: string[], newValue: string})
- This function basically uses pathParts array to get inside the big config file one by one and replaces the old value iwth the newValue, Might as well study it again, to understand properly.

- Other small things, like CustomTooltip.tsx , I also dont remember much, Was made through chatgpt, and it worked so i moved on.

## Backend

- Nothing much to see here, if you are getting back to electron, just revise the Preload thing and how the sending data to backend actually works.

- the backend isnt that complex but its surely dynamic.
- These small functions are used again and again in every use case so far, Would recommend revising them again.

### My thoughts Dump
- Man it fucking hurts to leave thsi but yeah man, i will tell you what happened. It all started with a reel where i saw a guy giving this prompt to chatgpt "Roast me on the basis of Previous interactions" and people were talking about how it really showed them the reality and i was like, yeah why not give it a try, I did it, At first it was fun, it was roasting me on my weaknesses i already knew. But then it said something like "You are always saying, 'Atleast i am not building a wether app, I am building soemthing more complex', Meanwhile that wehter app guy sits with his app being 5 star on play store while you struggle to introduce this app to someone under 90 seconds" and that man hit hard, It was right. I really thought about it and yeah, I cannot introduce it to anyone and plus its too much dev driven or may be just too much settings driven, Its not like those figma or those other services with drag and drop features and heck even with those live previews. It shi, I just something I started iwth the vibes of learing Electron and as you may have guessed it, i dont need to touch the backend anymore. Everything is dynamic and the only thing thats left is building the UI blocks to make it changable. Which is just basically writing tsx and vanilla css again and agian. While I struggle to put hours on the table because of my diploma study, considering i get home around 4:30pm fully exhasuted, While also trying to cope with the maths and physics and other homework that my teachers have given, i need to build something wtih clean UI/UX, something a person will use. You know what, May be my life gave me another sign becuase today when the Lecture of CFIT took place, The teahcer was absent and the substitute teacher came. He also teaches something related to CSE and he said the same thing, To start small but have a great idea, To build with purpose, To build something non tech people can use. and that hit me man, I know it hurts to leave it all after months of grind but i had to, If i see myself doing it , i just myself reapeating it again and again and not actually learning something new like nextjs or working with external APIs, FUCKING SUCKS MAN. Thought it would be banger of a project. Imagine me saying "I built an app that builds a static website" fuckkkkkkkkkkkkkkkkkk

# Down there is just the default readme file that electron-vite setup provided. I am leaving it cause may be it will also help me in future.

# backend

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
