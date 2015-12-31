/**
 * @fileoverview Procedural box
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */

var box = { buffers: [], numMeshes: 1};

function loadCubeColorPerFace()
{
	for (var mesh = 0; mesh < box.numMeshes; mesh++)
	{
		/// Create last mesh to append
		box.buffers.push({});
		
		/// Get last index
		var lastIndexMesh = (box.buffers.length - 1);
		
		/// raw 3D geometric data - positions
		box.buffers[lastIndexMesh].vertexPosition = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers[lastIndexMesh].vertexPosition);

		var halflen = 10.0;
		var vertices = [
		/// front face
		-halflen, -halflen, -halflen, // v0
		-halflen, +halflen, -halflen, // v1
		+halflen, +halflen, -halflen, // v2
		+halflen, -halflen, -halflen, // v3
		
		/// back face
		-halflen, -halflen, +halflen, // v4
		+halflen, -halflen, +halflen, // v5
		+halflen, +halflen, +halflen, // v6
		-halflen, +halflen, +halflen, // v7
		
		/// right face
		-halflen, -halflen, -halflen, // v0
		-halflen, -halflen, +halflen, // v4
		-halflen, +halflen, +halflen, // v7 
		-halflen, +halflen, -halflen, // v1
		
		/// left face
		+halflen, -halflen, -halflen, // v3
		+halflen, +halflen, -halflen, // v2
		+halflen, +halflen, +halflen, // v6
		+halflen, -halflen, +halflen, // v5
		
		/// top face
		-halflen, +halflen, -halflen, // v1
		+halflen, +halflen, -halflen, // v2
		+halflen, +halflen, +halflen, // v6
		-halflen, +halflen, +halflen, // v7
		
		/// bottom face
		-halflen, -halflen, -halflen, // v0
		-halflen, -halflen, +halflen, // v4
		+halflen, -halflen, +halflen, // v5
		+halflen, -halflen, -halflen  // v3
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		box.buffers[lastIndexMesh].vertexPosition.itemSize = 3;
		box.buffers[lastIndexMesh].vertexPosition.numItems = 24;

		/// raw RGBA color data
		box.buffers[lastIndexMesh].vertexColor = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers[lastIndexMesh].vertexColor);

		var colors = [
		1.0, 0.0, 0.0, 1.0, // red
		1.0, 0.0, 0.0, 1.0, 
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		
		0.0, 1.0, 0.0, 1.0, // green
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		
		0.0, 0.0, 1.0, 1.0, // blue
		0.0, 0.0, 1.0, 1.0, 
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		
		0.0, 1.0, 1.0, 1.0, // cyan
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0,
		0.0, 1.0, 1.0, 1.0,
		
		1.0, 1.0, 0.0, 1.0, // yellow
		1.0, 1.0, 0.0, 1.0, 
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		
		1.0, 0.0, 1.0, 1.0, // purple
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		box.buffers[lastIndexMesh].vertexColor.itemSize = 4;
		box.buffers[lastIndexMesh].vertexColor.numItems = 24;

		/// raw 3D geometric data - normals
		box.buffers[lastIndexMesh].vertexNormal = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers[lastIndexMesh].vertexNormal);

		var normals = [
		0.0, 0.0, +1.0, 
		0.0, 0.0, +1.0, 
		0.0, 0.0, +1.0,
		0.0, 0.0, +1.0,
		
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		
		+1.0, 0.0, 0.0, 
		+1.0, 0.0, 0.0, 
		+1.0, 0.0, 0.0,
		+1.0, 0.0, 0.0,
		
		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0,
		
		0.0, +1.0, 0.0, 
		0.0, +1.0, 0.0, 
		0.0, +1.0, 0.0,
		0.0, +1.0, 0.0,
		
		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
		box.buffers[lastIndexMesh].vertexNormal.itemSize = 3;
		box.buffers[lastIndexMesh].vertexNormal.numItems = 24;

		/// raw 2D image data
		box.buffers[lastIndexMesh].vertexTexture = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers[lastIndexMesh].vertexTexture);

		var textures = [
		0.0, 0.0, 
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
		box.buffers[lastIndexMesh].vertexTexture.itemSize = 2;
		box.buffers[lastIndexMesh].vertexTexture.numItems = 24;
		
		/// 16bit Indices 
		box.buffers[lastIndexMesh].vertexIndices = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, box.buffers[lastIndexMesh].vertexIndices);
		
		var indices = [
			0, 1, 2, 0, 2, 3, // front face
			4, 5, 6, 4, 6, 7, // back face
			8, 9, 10, 8, 10, 11, // right face
			12, 13, 14, 12, 14, 15, // left face
			16, 17, 18, 16, 18, 19, // top face
			20, 21, 22, 20, 22, 23  // bottom face
		];
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		box.buffers[lastIndexMesh].vertexIndices.itemSize = 1;
		box.buffers[lastIndexMesh].vertexIndices.numItems = 36;
	}
}