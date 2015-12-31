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
    pathToModel = typeof pathToModel !== 'undefined' ? pathToModel : "assets/models/teapot.json";

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

var mesh = { buffers: null, numMeshes: null, boundingBox: null};

function meshLoader(meshData)
{
	mesh.buffers = [];
	mesh.boundingBox = [];
	mesh.numMeshes = meshData.model.length;
	for (var meshID = 0; meshID < mesh.numMeshes; meshID++)
	{
		/// Create last mesh to append
		mesh.buffers.push({});
		
		/// raw 3D geometric data - positions
		mesh.buffers[meshID].vertexPosition = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers[meshID].vertexPosition);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.model[meshID].vertexPositions), gl.STATIC_DRAW);
		mesh.buffers[meshID].vertexPosition.itemSize = 3;
		mesh.buffers[meshID].vertexPosition.numItems = meshData.model[meshID].vertexPositions.length / 3;

		/// raw 3D geometric data - normals
		mesh.buffers[meshID].vertexNormal = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers[meshID].vertexNormal);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.model[meshID].vertexNormals), gl.STATIC_DRAW);
		mesh.buffers[meshID].vertexNormal.itemSize = 3;
		mesh.buffers[meshID].vertexNormal.numItems = meshData.model[meshID].vertexNormals.length / 3;

		/// Make the color procedural, expensive data so later fetch from file
		var numVertices = mesh.buffers[meshID].vertexPosition.numItems;
		var colorData = [];
		var redChannel = Math.random();
		var greenChannel = Math.random();
		var blueChannel = Math.random();
		for (var vertex = 0; vertex < numVertices; vertex++)
		{
			colorData.push(redChannel);
			colorData.push(greenChannel);
			colorData.push(blueChannel);
			colorData.push(1.0);
		}
		mesh.buffers[meshID].vertexColor = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers[meshID].vertexColor);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
		mesh.buffers[meshID].vertexColor.itemSize = 4;
		mesh.buffers[meshID].vertexColor.numItems = colorData.length / 4;
		
		/// raw 2D image data
		mesh.buffers[meshID].vertexTexture = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffers[meshID].vertexTexture);
		var textures;
		if (meshData.model[meshID].vertexTextures === undefined || meshData.model[meshID].vertexTextures.length == 0)
		{
			var textureData = [];
			for (var vertex = 0; vertex < numVertices; vertex++)
			{
				/// Fix to actually do the texture mapping!
				textureData.push(0.0);
				textureData.push(0.0);
			}
			textures = textureData;
		}
		else
		{
			textures = meshData.model[meshID].vertexTextures;
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
		mesh.buffers[meshID].vertexTexture.itemSize = 2;
		mesh.buffers[meshID].vertexTexture.numItems = textures.length / 2;
		
		/// 16bit indices 
		mesh.buffers[meshID].vertexIndices = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.buffers[meshID].vertexIndices);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshData.model[meshID].indices), gl.STATIC_DRAW);
		mesh.buffers[meshID].vertexIndices.itemSize = 1;
		mesh.buffers[meshID].vertexIndices.numItems = meshData.model[meshID].indices.length;
	}
	
	/// Generate bounding box
	mesh.boundingBox.push(meshData.boundingBox[0]);
	mesh.boundingBox.push(meshData.boundingBox[1]);
	mesh.boundingBox.push(meshData.boundingBox[2]);
	mesh.boundingBox.push(meshData.boundingBox[3]);
	mesh.boundingBox.push(meshData.boundingBox[4]);
	mesh.boundingBox.push(meshData.boundingBox[5]);
}