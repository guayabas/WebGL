/**
 * @fileoverview Mouse events handler
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
 var lastPositionMouseX = null;
 var lastPositionMouseY = null;
 var shiftModifier = false;
 var altModifier = false;
 var mouseDown = false;
 
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

	var translationSensitivity = 0.01;
	
 	if (!shiftModifier)
 	{
 		if (!altModifier)
 		{
 			/// The rotation matrix handles the degrees the current
		 	/// object has been rotated in the X, Y direction.
		 	/// Recall the Euler angles ... 
		 	var rotationMatrix = mat4.create();
		 	mat4.identity(rotationMatrix);
		 	mat4.rotate(rotationMatrix, degreeToRadians(deltaX), [0.0, 1.0, 0.0]);
		 	mat4.rotate(rotationMatrix, degreeToRadians(deltaY), [1.0, 0.0, 0.0]);
		 	mat4.multiply(rotationMatrix, modelMatrix, modelMatrix);
 		}
 		else
 		{
 			var translationMatrix = mat4.create();
 			mat4.identity(translationMatrix);
 			mat4.translate(translationMatrix, [deltaX * translationSensitivity, 0.0, 0.0]);
 			mat4.translate(translationMatrix, [0.0, -deltaY * translationSensitivity, 0.0]);
 			mat4.multiply(translationMatrix, modelMatrix, modelMatrix);
 		}	
 	}
 	else
 	{
 		simpleCamera.zoom += deltaX;

 		if (simpleCamera.zoom >= 0)
 		{
 			simpleCamera.zoom = 0;
 		}
 	}

 	lastPositionMouseX = currentMousePositionX;
 	lastPositionMouseY = currentMousePositionY;
 }