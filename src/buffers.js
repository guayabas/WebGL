/**
 * @fileoverview Initialize buffers
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Usage of separate buffers
var vertexPositionBuffer;
var vertexTextureBuffer;
var vertexNormalBuffer;
var vertexColorBuffer;
var indicesBuffer;

function initBuffers()
{
	/// raw 3D geometric data - positions
	vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

	var vertices = [
	-0.5, -0.5, 0.0, 
	+0.5, -0.5, 0.0, 
	+0.5, +0.5, 0.0,
	-0.5, +0.5, 0.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexPositionBuffer.itemSize = 3;
	vertexPositionBuffer.numItems = 4;

	/// raw RGBA color data
	vertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

	var colors = [
	1.0, 0.0, 0.0, 1.0, 
	0.0, 0.0, 1.0, 1.0, 
	0.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 0.0, 1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	vertexColorBuffer.itemSize = 4;
	vertexColorBuffer.numItems = 4;

	/// raw 3D geometric data - normals
	vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);

	var normals = [
	0.0, 0.0, 1.0, 
	0.0, 0.0, 1.0, 
	0.0, 0.0, 1.0,
	0.0, 0.0, 1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	vertexNormalBuffer.itemSize = 3;
	vertexNormalBuffer.numItems = 4;

	/// raw 2D image data
	vertexTextureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureBuffer);

	var textures = [
	-1.0, -1.0, 
	+1.0, -1.0, 
	+1.0, +1.0,
	-1.0, -1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
	vertexTextureBuffer.itemSize = 2;
	vertexTextureBuffer.numItems = 4;
	
	
	/// 32bit Indices 
	indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	
	var indices = [
		0, 1, 2, /// 1st triangle
		0, 2, 3  /// 2nd triangle 
	];
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	indicesBuffer.numItems = 6;
	
}