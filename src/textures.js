/**
 * @fileoverview Initialize textures
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
var textureID;
 
function initTextures()
{
	textureID = gl.createTexture();
	textureID. image = new Image();
	textureID.image.onload = function() 
	{
		/// Bind the current texture to set parameters
        gl.bindTexture(gl.TEXTURE_2D, texture);
		
		/// Way of storing the texture, look over internet about the UNPACK option
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		
		/// The pointer to the image and the settings 
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureID.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		
		/// Reset the binding
        gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	/// Load source of the image
	textureID.image.src = "../images/FlagMexico.png";
}