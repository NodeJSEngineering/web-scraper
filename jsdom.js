const e = require('express')
const { JSDOM } = require('jsdom')
const { document } = new JSDOM(
	'<h2 class="title">Hello world</h2>'
).window

const heading = document.querySelector('.title')
heading.textContent = 'Hello there!'
heading.classList.add('welcome')
console.log(heading.innerHTML);


// e.g 2
// const HTML = `
// 	<html>
// 		<body>
// 			<button onclick="const e = document.createElement('div'); e.id = 'myid'; this.parentNode.appendChild(e);">Click me</button>
// 		</body>
// 	</html>`;

// const dom = new JSDOM(HTML, {
// 	runScripts: "dangerously",
// 	resources: "usable"
// });

// const document = dom.window.document;

// const button = document.querySelector('button');

// console.log("Element before click: " + document.querySelector('div#myid'));
// button.click();
// console.log("Element after click: " + document.querySelector('div#myid'));