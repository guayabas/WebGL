/**
 * @fileoverview Draw scene
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
  
/// Translate camera
function translateCamera()
{
	mat4.translate(viewMatrix, [0.0, 0.0, simpleCamera.zoom]);
}
 
/// Rotate camera
function rotateCamera()
{
	mat4.rotate(viewMatrix, degreeToRadians(timeClientSite), [0.0, 1.0, 0.0]);
	//mat4.rotate(viewMatrix, degreeToRadians(-45.0), [0.0, 1.0, 0.0]);
	//mat4.rotate(viewMatrix, degreeToRadians(+45.0), [1.0, 0.0, 0.0]);
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

	/// WARNING: The model matrix is defined in the mouse.js file since handles
	/// the mouse events and yes is maybe a bad design but meh, works, have fun!

	/// Compute normal matrix
	mat4.identity(mvMatrix);
	mat4.multiply(viewMatrix, modelMatrix, mvMatrix);
	mat4.toInverseMat3(mvMatrix, normalMatrix);
	mat3.transpose(normalMatrix);
	
	if (shadersOK)
	{
	    /// Choose the model to render
	    var currentMeshID = parseInt(localStorage.getItem("modelID"));

	    /// Not the best choice ... but works, move it to another function
	    /// that is not called per tick
	    var loadModel = parseInt(localStorage.getItem("loadNewModel"));
	    if (loadModel == 1)
        {
            /// Teapot
            if (currentMeshID == 3)
                loadMesh("assets/models/Teapot.json");
            /// Bunny
            if (currentMeshID == 4)
                loadMesh("assets/models/Bunny.json");
            /// Knot
            if (currentMeshID == 5)
                loadMesh("assets/models/Knot.json");
        
            localStorage.loadNewModel = 0;
        }

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
			vertexColorBufferID = box.buffers.vertexColor;
	        indexBufferID = box.buffers.vertexIndices;
	    }
        /// Sphere
	    else if (currentMeshID == 1)
	    {
	        vertexPositionBufferID = sphere.buffers.vertexPosition;
	        vertexTextureBufferID = sphere.buffers.vertexTexture;
	        vertexNormalBufferID = sphere.buffers.vertexNormal;
			vertexColorBufferID = sphere.buffers.vertexColor;
	        indexBufferID = sphere.buffers.vertexIndices;
	    }
		/// Cylinder
		else if (currentMeshID == 2)
		{
			vertexPositionBufferID = cylinder.buffers.vertexPosition;
	        vertexTextureBufferID = cylinder.buffers.vertexTexture;
	        vertexNormalBufferID = cylinder.buffers.vertexNormal;
			vertexColorBufferID = cylinder.buffers.vertexColor;
	        indexBufferID = cylinder.buffers.vertexIndices;
		}
	    /// Any Mesh! (To support reading the material from file ... )
	    else if (currentMeshID > 2)
	    {
	        vertexPositionBufferID = mesh.buffers.vertexPosition;
	        vertexTextureBufferID = mesh.buffers.vertexTexture;
	        vertexNormalBufferID = mesh.buffers.vertexNormal;
			vertexColorBufferID = mesh.buffers.vertexColor;
	        indexBufferID = mesh.buffers.vertexIndices;
	    }

	    /// Bind buffers
        /// Currently supporting (required) : Position, Texture, Normal, Color, Index
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
	        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferID);
	        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
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
		/// gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBufferID.numItems);

		/// Check the types of rendering in OpenGL 3.3 >= since I am not sure this is the most efficient
		/// way for rendering wireframe
		var renderingType;
		if (wireframe)
		{
			renderingType = gl.LINES;
		}
		else
		{
			renderingType = gl.TRIANGLES;
		}			
		gl.drawElements(renderingType, indexBufferID.numItems, gl.UNSIGNED_SHORT, 0);
		
	}
}