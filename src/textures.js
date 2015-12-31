/**
 * @fileoverview Initialize textures
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
function loadTexture(pathToTexture)
{
    pathToTexture = typeof pathToTexture !== 'undefined' ? pathToTexture : "assets/textures/Image03.jpg";

	textureID = gl.createTexture();
	textureID.image = new Image();
	
	textureID.image.onload = function ()
	{
		/// Bind the current texture to set parameters
        gl.bindTexture(gl.TEXTURE_2D, textureID);
		
		/// Way of storing the texture, look over internet about the UNPACK option
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		
		/// The pointer to the image and the settings 
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureID.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		
		/// Reset the binding
        gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	/// Load source of the image
	textureID.image.src = pathToTexture;
}