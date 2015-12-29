/**
 * @fileoverview Some global variables
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */

/// Initialize define empty objects, later fill them ... 
var light =
{
    position: [],
    specular: [],
    diffuse: [],
    ambient: []
}

var simpleCamera = 
{
	zoom: -70.0
}

var timeClientSite = 0;
var activetex = false;
var animation = false;
var wireframe = false;
var textureID = -1;
var gl = null;