/**
 * @fileoverview Simple mesh loader
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */

/// Request for loading (Supporting .JSON)
function loadMesh(modelName)
{
    var request = new XMLHttpRequest();
    request.open("GET", modelName, true);
    
    request.onreadystatechange = function()
    {
        if (request.readyState == 4)
        {
            meshLoader(JSON.parse(request.responseText));
        }
    }

    request.send();
}
 
/// Usage of separate buffers
var buffers =
{
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

function meshLoader(meshData)
{
	/// raw 3D geometric data - positions
    buffers.vertexPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexPositions), gl.STATIC_DRAW);
	buffers.vertexPosition.itemSize = 3;
	buffers.vertexPosition.numItems = meshData.vertexPositions.length / 3;

	/// raw 3D geometric data - normals
	buffers.vertexNormal = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexNormals), gl.STATIC_DRAW);
	buffers.vertexNormal.itemSize = 3;
	buffers.vertexNormal.numItems = meshData.vertexNormals.length / 3;

	/// raw 2D image data
	buffers.vertexTexture = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexTexture);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexTextures), gl.STATIC_DRAW);
	buffers.vertexTexture.itemSize = 2;
	buffers.vertexTexture.numItems = meshData.vertexTextures.length / 2;
	
	/// 16bit indices 
	buffers.indices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshData.indices), gl.STATIC_DRAW);
	buffers.indices.itemSize = 1;
	buffers.indices.numItems = meshData.indices.length;
}