/**
 * @fileoverview Draw scene
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Draw objects
function drawScene()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	/// Create perspective projection
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, projectionMatrix);

	/// Create view matrix
	mat4.identity(viewMatrix);
	
	/// Create model matrix
	mat4.identity(modelMatrix);

	if (shadersOK)
	{
		/// Bind buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, vertexTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		
		/// Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureID);
		
		/// Set matrices in the GPU
		setMatrixUniforms();

		/// Set time for animation
		setUniforms();

		/// Finally, RENDER!
		/// Remember that if we are not using index buffer we could use glDrawArray(...)
		/// but check the documentation since we need to repeat data https://www.opengl.org/sdk/docs/man3/xhtml/glDrawArrays.xml
		/// gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.numItems);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	}
}