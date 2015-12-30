/**
 * @fileoverview Simple mesh loader
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */

/// Request for loading (Supporting .JSON)
/// WARNING: Chrome seems to be secure enough to not admit the protocol for 
/// loading the object. Test over Firefox when developing, will save some time
/// debugging some values that are correct but just Chrome will disable them
function loadMesh(pathToModel)
{
    pathToModel = typeof pathToModel !== 'undefined' ? pathToModel : "assets/models/Teapot.json";

    var request = new XMLHttpRequest();
    request.open("GET", pathToModel, true);
	request.overrideMimeType("application/json");
    
    request.onreadystatechange = function()
    {
        if (request.readyState == 4)
        {
            meshLoader(JSON.parse(request.responseText));
        }
    }

    request.send();
}

var mesh = { buffers: {} };

function meshLoader(meshData)
{
	/// raw 3D geometric data - positions
    mesh.buffers.vertexPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers.vertexPosition);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexPositions), gl.STATIC_DRAW);
	mesh.buffers.vertexPosition.itemSize = 3;
	mesh.buffers.vertexPosition.numItems = meshData.vertexPositions.length / 3;

	/// raw 3D geometric data - normals
	mesh.buffers.vertexNormal = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers.vertexNormal);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexNormals), gl.STATIC_DRAW);
	mesh.buffers.vertexNormal.itemSize = 3;
	mesh.buffers.vertexNormal.numItems = meshData.vertexNormals.length / 3;

	/// raw 2D image data
	mesh.buffers.vertexTexture = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers.vertexTexture);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertexTextures), gl.STATIC_DRAW);
	mesh.buffers.vertexTexture.itemSize = 2;
	mesh.buffers.vertexTexture.numItems = meshData.vertexTextures.length / 2;
	
	/// 16bit indices 
	mesh.buffers.vertexIndices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.buffers.vertexIndices);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshData.indices), gl.STATIC_DRAW);
	mesh.buffers.vertexIndices.itemSize = 1;
	mesh.buffers.vertexIndices.numItems = meshData.indices.length;
}