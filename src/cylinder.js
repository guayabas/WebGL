/**
 * @fileoverview Initialize buffers
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Usage of separate buffers
var buffers = {
    /// Flags
    positionEnabled: true,
    indicesEnabled: true,
    textureEnabled: true,
    normalEnabled: true,
    colorEnabled: false,

    /// Handle for buffers
    vertexPosition: -1,
    vertexTexture: -1,
    vertexNormal: -1,
    vertexColor: -1,
    indices: -1
};

function loadCubeColorPerFace()
{
	/// raw 3D geometric data - positions
    buffers.vertexPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);

	var halflen = 0.5;
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
	buffers.vertexPosition.itemSize = 3;
	buffers.vertexPosition.numItems = 24;

	/// raw RGBA color data
	buffers.vertexColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexColor);

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
	buffers.vertexColor.itemSize = 4;
	buffers.vertexColor.numItems = 24;

	/// raw 3D geometric data - normals
	buffers.vertexNormal = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);

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
	buffers.vertexNormal.itemSize = 3;
	buffers.vertexNormal.numItems = 24;

	/// raw 2D image data
	buffers.vertexTexture = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexTexture);

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
	buffers.vertexTexture.itemSize = 2;
	buffers.vertexTexture.numItems = 24;
	
	/// 16bit Indices 
	buffers.indices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	
	var indices = [
		0, 1, 2, 0, 2, 3, /// front face
		4, 5, 6, 4, 6, 7, /// back face
		8, 9, 10, 8, 10, 11, /// right face
		12, 13, 14, 12, 14, 15, /// left face
		16, 17, 18, 16, 18, 19, /// top face
		20, 21, 22, 20, 22, 23  /// bottom face
	];
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	buffers.indices.itemSize = 1;
	buffers.indices.numItems = 36;
}