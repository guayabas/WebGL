/**
 * @fileoverview Initialize GL context
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Create context and dimensions
var gl;

function initGL()
{
	/// Get container for the WebGL display
	var canvas = document.getElementById("WebGLCanvas");
	
	/// Do not pay attention to the try-catch block
	/// In programming is a "way" of coding safe stuff
	try
	{
		/// Search about the Context argument
		/// http://www.w3schools.com/tags/ref_canvas.asp
		gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
	}
	catch(e)
	{
		alert("Not initialization available for WebGL");
	}
	
	/// Resize the pixels to match the container
	resize(gl);
}