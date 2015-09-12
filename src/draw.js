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

		/// Set matrices in the GPU
		setMatrixUniforms();

		/// Set time for animation
		setUniforms();

		/// Finally, RENDER!
		gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.numItems);
	}
}