/**
 * @fileoverview Mouse events handler
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
 var lastDistancePointer = null;
 var lastPositionMouseX = null;
 var lastPositionMouseY = null;
 var shiftModifier = false;
 var altModifier = false;
 var mouseDown = false;
 var pointers = [];

 function zoom(delta)
 {
	simpleCamera.zoom += delta;
	if (simpleCamera.zoom >= 0)
	{
		simpleCamera.zoom = 0;
	}
 }
 
 function handleMouseWheel(event)
 {
	var deltaWheel;
	if (event.wheelDelta > 0 || event.detail > 0)
	{
		deltaWheel = +2;
	}
	else
	{
		deltaWheel = -2;
	}
	zoom(deltaWheel);
 }
 
 function handleMouseDown(event)
 {
 	mouseDown = true;
 	lastPositionMouseX = event.pageX;
 	lastPositionMouseY = event.pageY;
	event.preventDefault();
	
	pointers.push(event.clientX);
	pointers.push(event.clientY);
 }

 function handleMouseUp(event)
 {
 	mouseDown = false;
	pointers = [];
 }

 function handleMouseMove(event)
 { 
 	if (!mouseDown) return;

 	var currentMousePositionX = event.pageX;
 	var currentMousePositionY = event.pageY;

 	var deltaX = (currentMousePositionX - lastPositionMouseX);
 	var deltaY = (currentMousePositionY - lastPositionMouseY);

	/// Two finger touch - functional with horrible hack
	if (pointers.length == 4)
	{
		if (event.pointerId == 2)
		{
			pointers[0] = event.clientX;
			pointers[1] = event.clientY;
		}
		if (event.pointerId == 3)
		{
			pointers[2] = event.clientX;
			pointers[3] = event.clientY;
		}
		
		var x1 = pointers[0];
		var y1 = pointers[1];
		var x2 = pointers[2];
		var y2 = pointers[3];
		
		var dx = (x2 - x1) / document.getElementById("WebGLCanvas").clientWidth;
		var dy = (y2 - y1) / document.getElementById("WebGLCanvas").clientHeight;
		
		distance = Math.sqrt((dx * dx) + (dy * dy));
		if (distance < lastDistancePointer)
		{
			deltaX = -distance / 2;
		}
		else
		{
			deltaX = +distance / 2;
		}
		
		lastDistancePointer = distance;
		shiftModifier = true;
	}
	
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
		zoom(deltaX);
 	}

 	lastPositionMouseX = currentMousePositionX;
 	lastPositionMouseY = currentMousePositionY;
	event.preventDefault();
 }