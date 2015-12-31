/**
 * @fileoverview Procedural sphere
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
var sphere = { buffers: null };

/// http://learningwebgl.com/blog/?p=1253
function loadSphere(radius, latitudeBands, longitudeBands)
{
	buffers = {};
	
    longitudeBands = typeof longitudeBands !== 'undefined' ? longitudeBands : 20;
    latitudeBands = typeof latitudeBands !== 'undefined' ? latitudeBands : 20;
    radius = typeof radius !== 'undefined' ? radius : 10.0;

    /// Generate geometry
    var positionData = [];
    var textureData = [];
    var normalData = [];
	var colorData = [];
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            /// Positions normalized
            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            /// Textures
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

            positionData.push(radius * x);
            positionData.push(radius * y);
            positionData.push(radius * z);
            textureData.push(u);
            textureData.push(v);
            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
			colorData.push(1.0);
			colorData.push(0.0);
			colorData.push(0.0);
			colorData.push(1.0);
        }
    }

    /// Generate topology
    var indexData = [];
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }

    /// raw 3D geometric data - positions
    sphere.buffers.vertexPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.buffers.vertexPosition);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
    sphere.buffers.vertexPosition.itemSize = 3;
    sphere.buffers.vertexPosition.numItems = positionData.length / 3;

    /// raw 3D geometric data - normals
    sphere.buffers.vertexNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.buffers.vertexNormal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    sphere.buffers.vertexNormal.itemSize = 3;
    sphere.buffers.vertexNormal.numItems = normalData.length / 3;

	/// raw RGBA color data
	sphere.buffers.vertexColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphere.buffers.vertexColor);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
	sphere.buffers.vertexColor.itemSize = 4;
	sphere.buffers.vertexColor.numItems = colorData.length / 4;
	
    /// raw 2D image data
    sphere.buffers.vertexTexture = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.buffers.vertexTexture);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
    sphere.buffers.vertexTexture.itemSize = 2;
    sphere.buffers.vertexTexture.numItems = textureData.length / 2;

    /// 16bit indices 
    sphere.buffers.vertexIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.buffers.vertexIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    sphere.buffers.vertexIndices.itemSize = 1;
    sphere.buffers.vertexIndices.numItems = indexData.length;
}