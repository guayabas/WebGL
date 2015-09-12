/**
 * @fileoverview Load shaders
 * @author Alejandro Guayaquil
 * @version 1.0.0
 */
 
/// Create shader program
var shadersOK = false;
var shaderProgram;

/// Editors from the library, for the highlighting 
var editorVS;
var editorFS;

function loadShaders()
{
	/// Vertex Shader Compilation
	var vertexShader;

	/// Here I am not sure if the member .value will be robust enough for a big project
	vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, editorVS.getValue());
	gl.compileShader(vertexShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(vertexShader));
		shadersOK = false;
		return null;
	}

	/// Fragment Shader Compilation
	var fragmentShader;

	/// Here I am not sure if the member .value will be robust enough for a big project
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, editorFS.getValue());
	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(fragmentShader));
		shadersOK = false;
		return null;
	}

	/// Linking
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, fragmentShader);
	gl.attachShader(shaderProgram, vertexShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
	{
		alert(gl.getProgramInfoLog(shaderProgram));
		shadersOK = false;
		return null;
	}

	/// Everything correct, start using shaders
	gl.useProgram(shaderProgram);
	shadersOK = true;

	/// Enable attributes
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shaderProgram.vertexTextureAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexture");
	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");

	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexTextureAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	/// Fetch matrix locations
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uM");
	shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uV");
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uP");

	/// Fetch variables locations
	shaderProgram.timeUniform = gl.getUniformLocation(shaderProgram, "uTime");
}