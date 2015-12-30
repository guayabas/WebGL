/**
 * @fileoverview Resize viewport
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Resize container
function resize(gl) 
{
	/// http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
	var realToCSSPixels = window.devicePixelRatio || 1;

	/// Lookup the size the browser is displaying the canvas in CSS pixels
	/// and compute a size needed to make our drawingbuffer match it in
	/// device pixels.
	var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
	var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);

	/// Check if the canvas is not the same size.
	if (gl.canvas.width != displayWidth || gl.canvas.height != displayHeight) 
	{
		/// Make the canvas the same size
		gl.canvas.width  = displayWidth;
		gl.canvas.height = displayHeight;

		/// Set the viewport to match
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	}
}