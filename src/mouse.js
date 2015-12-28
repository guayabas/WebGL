/**
 * @fileoverview Mouse events handler
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
 var mouseDown = false;
 var lastPositionMouseX = null;
 var lastPositionMouseY = null;

 function handleMouseDown(event)
 {
 	mouseDown = true;
 	lastPositionMouseX = event.clientX;
 	lastPositionMouseY = event.clientY;
 }

 function handleMouseUp(event)
 {
 	mouseDown = false;
 }

 function handleMouseMove(event)
 {
 	if (!mouseDown) return;

 	var currentMousePositionX = event.clientX;
 	var currentMousePositionY = event.clientY;

 	var deltaX = (currentMousePositionX - lastPositionMouseX);
 	var deltaY = (currentMousePositionY - lastPositionMouseY);

 	/// The rotation matrix handles the degrees the current
 	/// object has been rotated in the X, Y direction.
 	/// Recall the Euler angles ... 
 	var rotationMatrix = mat4.create();
 	mat4.identity(rotationMatrix);
 	mat4.rotate(rotationMatrix, degreeToRadians(deltaX), [0.0, 1.0, 0.0]);
 	mat4.rotate(rotationMatrix, degreeToRadians(deltaY), [1.0, 0.0, 0.0]);
 	mat4.multiply(rotationMatrix, modelMatrix, modelMatrix);

 	lastPositionMouseX = currentMousePositionX;
 	lastPositionMouseY = currentMousePositionY;
 }