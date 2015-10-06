/**
 * @fileoverview Draw scene
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// To radians
function degreeToRadians(degrees)
{
	return (degrees * (Math.PI / 180.0));
}
 
/// Translate camera
function translateCamera()
{
	mat4.translate(viewMatrix, [0.0, 0.0, -70.0]);
}
 
/// Rotate camera
function rotateCamera()
{
	mat4.rotate(viewMatrix, degreeToRadians(timeClientSite), [0.0, 1.0, 0.0]);
	mat4.rotate(viewMatrix, degreeToRadians(+45.0), [0.0, 1.0, 0.0]);
	mat4.rotate(viewMatrix, degreeToRadians(+45.0), [1.0, 0.0, 0.0]);
}
 
/// Draw objects
function drawScene()
{
	resize(gl);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	/// Create perspective projection
	mat4.perspective(30, gl.canvas.width / gl.canvas.height, 0.1, 1000.0, projectionMatrix);

	/// Create view matrix
	mat4.identity(viewMatrix);
	translateCamera();
	rotateCamera();	
	
	/// Create model matrix
	mat4.identity(modelMatrix);

	/// Compute normal matrix
	mat4.identity(mvMatrix);
	mat4.multiply(viewMatrix, modelMatrix, mvMatrix);
	mat4.toInverseMat3(mvMatrix, normalMatrix);
	mat3.transpose(normalMatrix);
	
	if (shadersOK)
	{
	    /// Choose the model to render
	    var currentMeshID = parseInt(localStorage.getItem("modelID"));

        /// Maybe just use one buffer and padding
	    var vertexPositionBufferID;
	    var vertexTextureBufferID;
	    var vertexNormalBufferID;
	    var vertexColorBufferID;
	    var indexBufferID;
	    var numIndices;

        /// Box
	    if (currentMeshID == 0)
	    {
	        vertexPositionBufferID = box.buffers.vertexPosition;
	        vertexTextureBufferID = box.buffers.vertexTexture;
	        vertexNormalBufferID = box.buffers.vertexNormal;
	        indexBufferID = box.buffers.vertexIndices;
	    }
        /// Mesh
	    else if (currentMeshID == 1)
	    {
	        vertexPositionBufferID = mesh.buffers.vertexPosition;
	        vertexTextureBufferID = mesh.buffers.vertexTexture;
	        vertexNormalBufferID = mesh.buffers.vertexNormal;
	        indexBufferID = mesh.buffers.vertexIndices;
	    }
	    else if (currentMeshID == 2)
	    {
	        vertexPositionBufferID = sphere.buffers.vertexPosition;
	        vertexTextureBufferID = sphere.buffers.vertexTexture;
	        vertexNormalBufferID = sphere.buffers.vertexNormal;
	        indexBufferID = sphere.buffers.vertexIndices;
	    }

	    /// Bind buffers
        /// Currently supporting (required) : Position, Texture, Normal, Index
	    {
	        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferID);
	        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	    }
	    {
	        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureBufferID);
	        gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
	    }
	    {
	        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBufferID);
	        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
	    }
	    {
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferID);
	    }

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
		gl.drawElements(gl.TRIANGLES, indexBufferID.numItems, gl.UNSIGNED_SHORT, 0);
	}
}