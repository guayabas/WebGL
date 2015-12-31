/**
 * @fileoverview Keyboard events handler
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
 /// Very interesting js can create dictionary on the fly
 var currentlyPressedKey = {};

 function handleKeyDown(event)
 {
 	currentlyPressedKey[event.keyCode] = true;
 }

 function handleKeyUp(event)
 {
 	currentlyPressedKey[event.keyCode] = false;
 }

 function handleKeys()
 {
 	/// Beautiful ASCII, how can I survive without you ... 
 	/// http://www.asciitable.com/
 	if (currentlyPressedKey[82])
 	{
 		setModelMatrix();
 	}

 	if (currentlyPressedKey[87])
 	{
 		wireframe = !wireframe;
 	}

 	shiftModifier = currentlyPressedKey[16];
 	altModifier = currentlyPressedKey[18];
 }