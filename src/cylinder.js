/**
 * @fileoverview Procedural cylinder
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
 var cylinder = { buffers: {} };
 
 function loadCylinder(radius, stacks, height)
 {
	stacks = typeof stacks !== 'undefined' ? stacks : 10;
    radius = typeof radius !== 'undefined' ? radius : 10.0;
    height = typeof height !== 'undefined' ? height : 10.0;
	
	var halfHeight = (0.5 * height);
	
	/// Generate geometry
	var positionData = [];
    var textureData = [];
    var normalData = [];
	for (var stack = 0; stack < stacks; stack++) 
	{
		var theta0 = ((stack + 0) / stacks) * (2.0 * Math.PI);
		var theta1 = ((stack + 1) / stacks) * (2.0 * Math.PI);
		
        var sinTheta0 = Math.sin(theta0);
        var cosTheta0 = Math.cos(theta0);
		
		var sinTheta1 = Math.sin(theta1);
        var cosTheta1 = Math.cos(theta1);
		
		/// Positions normalized
		var x0 = sinTheta0;
		var y0 = cosTheta0;
		var x1 = sinTheta1;
		var y1 = cosTheta1;
		var z0 = -halfHeight;
		var z1 = +halfHeight;
		
		positionData.push(radius * x0);
        positionData.push(radius * y0);
        positionData.push(radius * z0);
		
		positionData.push(radius * x1);
        positionData.push(radius * y1);
        positionData.push(radius * z0);
		
		positionData.push(radius * x1);
        positionData.push(radius * y1);
        positionData.push(radius * z1);
		
		positionData.push(radius * x0);
        positionData.push(radius * y0);
        positionData.push(radius * z1);
		
		normalData.push(x0);
        normalData.push(y0);
		normalData.push(0);
		
		normalData.push(x1);
        normalData.push(y1);
		normalData.push(0);
		
		normalData.push(x1);
        normalData.push(y1);
		normalData.push(0);
		
		normalData.push(x0);
        normalData.push(y0);
		normalData.push(0);
	}
	
	/// Generate topology
    var indexData = [];
	for (var stack = 0; stack <= stacks; stack++) 
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