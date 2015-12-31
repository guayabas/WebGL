/**
 * @fileoverview Procedural cylinder
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
var cylinder = { buffers: null };

function loadCylinder(radius, stacks, height)
{
	cylinder.buffers = {};
	
	stacks = typeof stacks !== 'undefined' ? stacks : 20;
	radius = typeof radius !== 'undefined' ? radius : 10.0;
	height = typeof height !== 'undefined' ? height : 30.0;

	var halfHeight = (0.5 * height);

	/// Generate geometry
	var positionData = [];
	var textureData = [];
	var normalData = [];
	var colorData = [];
	for (var stack = 0; stack < stacks; stack++) 
	{
		var normalizedValue0 = ((stack + 0) / stacks);
		var normalizedValue1 = ((stack + 1) / stacks);
		
		var theta0 = normalizedValue0 * (2.0 * Math.PI);
		var theta1 = normalizedValue1 * (2.0 * Math.PI);
		
		var sinTheta0 = Math.sin(theta0);
		var cosTheta0 = Math.cos(theta0);
		
		var sinTheta1 = Math.sin(theta1);
		var cosTheta1 = Math.cos(theta1);
		
		/// Positions normalized
		var x0 = sinTheta0;
		var z0 = cosTheta0;
		var x1 = sinTheta1;
		var z1 = cosTheta1;
		var y0 = -halfHeight;
		var y1 = +halfHeight;
		
		positionData.push(radius * x0);
		positionData.push(y0);
		positionData.push(radius * z0);
		
		positionData.push(radius * x1);
		positionData.push(y0);
		positionData.push(radius * z1);
		
		positionData.push(radius * x1);
		positionData.push(y1);
		positionData.push(radius * z1);
		
		positionData.push(radius * x0);
		positionData.push(y1);
		positionData.push(radius * z0);
		
		normalData.push(x0);
		normalData.push(0);
		normalData.push(z0);
		
		normalData.push(x1);
		normalData.push(0);
		normalData.push(z1);
		
		normalData.push(x1);
		normalData.push(0);
		normalData.push(z1);
		
		normalData.push(x0);
		normalData.push(0);
		normalData.push(z0);
		
		textureData.push(normalizedValue0);
		textureData.push(0.0);
		
		textureData.push(normalizedValue1);
		textureData.push(0.0);
		
		textureData.push(normalizedValue1);
		textureData.push(1.0);
		
		textureData.push(normalizedValue0);
		textureData.push(1.0);
		
		colorData.push(0.0);
		colorData.push(1.0);
		colorData.push(0.0);
		colorData.push(1.0);
		
		colorData.push(0.0);
		colorData.push(1.0);
		colorData.push(0.0);
		colorData.push(1.0);
		
		colorData.push(0.0);
		colorData.push(1.0);
		colorData.push(0.0);
		colorData.push(1.0);
		
		colorData.push(0.0);
		colorData.push(1.0);
		colorData.push(0.0);
		colorData.push(1.0);
	}

	/// Generate topology
	var indexData = [];
	for (var stack = 0; stack < stacks; stack++) 
	{
		var i0 = (4 * stack) + 0;
		var i1 = (4 * stack) + 1;
		var i2 = (4 * stack) + 2;
		var i3 = (4 * stack) + 3;
		
		indexData.push(i0);
		indexData.push(i1);
		indexData.push(i2);
		
		indexData.push(i0);
		indexData.push(i2);
		indexData.push(i3);
	}

	/// raw 3D geometric data - positions
	cylinder.buffers.vertexPosition = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinder.buffers.vertexPosition);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
	cylinder.buffers.vertexPosition.itemSize = 3;
	cylinder.buffers.vertexPosition.numItems = positionData.length / 3;

	/// raw 3D geometric data - normals
	cylinder.buffers.vertexNormal = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinder.buffers.vertexNormal);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
	cylinder.buffers.vertexNormal.itemSize = 3;
	cylinder.buffers.vertexNormal.numItems = normalData.length / 3;

	/// raw RGBA color data
	cylinder.buffers.vertexColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinder.buffers.vertexColor);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
	cylinder.buffers.vertexColor.itemSize = 4;
	cylinder.buffers.vertexColor.numItems = colorData.length / 4;

	/// raw 2D image data
	cylinder.buffers.vertexTexture = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinder.buffers.vertexTexture);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
	cylinder.buffers.vertexTexture.itemSize = 2;
	cylinder.buffers.vertexTexture.numItems = textureData.length / 2;

	/// 16bit indices 
	cylinder.buffers.vertexIndices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinder.buffers.vertexIndices);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	cylinder.buffers.vertexIndices.itemSize = 1;
	cylinder.buffers.vertexIndices.numItems = indexData.length;
} 