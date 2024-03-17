import './style.css';
import { setupDemo } from './pixi-app.ts';

var debug = true;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
	<h1>Ball cat</h1>
	<p>This cat do kinda be balling doe.</p>
	<div id="demo"></div>
</div>
`;
setupDemo(debug);
