import * as PIXI from 'pixi.js'; 
import hatchImageUrl from './hatch.png';

export async function setupDemo(debug:boolean) {

	console.log("Setting up demo");
	
	var relX;
	var relY;
	const demoContainer = document.querySelector<HTMLDivElement>("#demo");
	const demo = new PIXI.Application();
	var demoContainerPos = demoContainer.getBoundingClientRect();

	await demo.init({ backgroundAlpha: 0, resizeTo: demoContainer });

	demoContainer.appendChild(demo.canvas);

	demoContainer.onmousemove = (event) => {
		demoContainerPos = demoContainer.getBoundingClientRect();
		relX = event.clientX - demoContainerPos.left;
		relY = event.clientY - demoContainerPos.top;
	}
	
	demoContainer.onclick = (event) => {
		const diffX = relX - event.screenX;
		const diffY = relY - event.screenY;
		const distance = Math.sqrt(diffX*diffX - diffY*diffY);
		if (distance > 50) { // about the radius of hatch
			return;
		}
		// angles are in radians because i want my code to be as illegible as possible
		const angle = Math.atan2(diffY, diffX);
		const momentum = [velocity, angle];
		
		
	}

	const hatchTexture = await PIXI.Assets.load(hatchImageUrl);
	const hatchSprite = new PIXI.Sprite(hatchTexture);

	hatchSprite.anchor.set(0.5);
	hatchSprite.x = demo.screen.width / 2;
	hatchSprite.y = demo.screen.height / 2;

	demo.stage.addChild(hatchSprite);

	if (debug) {
		setupDebug();
	}

	demo.animationUpdate = function(delta) {
		hatchSprite.rotation += 0.01;
	}

	demo.ticker.add(demo.animationUpdate);

	function setupDebug() {
		console.log("Setting up debug menu");
		const debugContainer = document.querySelector<HTMLDivElement>('#debug');
		debugContainer.innerHTML = 
		`
		<p id="screenPosX"></p>
		<p id="screenPosY"></p>
		<p id="hatchPosX"></p>
		<p id="hatchPosY"></p>
		<p id="canvasPosX"></p>
		<p id="canvasPosY"></p>
		<p id="relPosX"></p>
		<p id="relPosY"></p>
		`;
		
		var dbgScreenPosX =	document.querySelector<HTMLParagraphElement>('#screenPosX');
		var dbgScreenPosY =	document.querySelector<HTMLParagraphElement>('#screenPosY');
		var dbgHatchPosX =	document.querySelector<HTMLParagraphElement>('#hatchPosX');
		var dbgHatchPosY =	document.querySelector<HTMLParagraphElement>('#hatchPosY');
		var dbgCanvasPosX =	document.querySelector<HTMLParagraphElement>('#canvasPosX');
		var dbgCanvasPosY =	document.querySelector<HTMLParagraphElement>('#canvasPosY');
		var dbgRelPosX =	document.querySelector<HTMLParagraphElement>('#relPosX');
		var dbgRelPosY =	document.querySelector<HTMLParagraphElement>('#relPosY');

		demoContainer.onmousemove = (event) => {
			demoContainerPos = demoContainer.getBoundingClientRect();
			dbgScreenPosX.innerText = `Screen X: ${event.screenX}`;
			dbgScreenPosY.innerText = `Screen Y: ${event.screenY}`;
			dbgHatchPosX.innerText = `Hatch X: ${hatchSprite.x}`;
			dbgHatchPosY.innerText = `Hatch Y: ${hatchSprite.y}`;
			dbgCanvasPosX.innerText = `Canvas X: ${event.clientX - demoContainerPos.x}`;
			dbgCanvasPosY.innerText = `Canvas Y: ${event.clientY - demoContainerPos.y}`;
			dbgRelPosX.innerText = `Relative X: ${event.clientX - demoContainerPos.x - hatchSprite.x}`;
			dbgRelPosY.innerText = `Relative Y: ${event.clientY - demoContainerPos.y - hatchSprite.y}`;
		}
	}
}


