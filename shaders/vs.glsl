/// Alejandro Guayaquil 
/// 09.2015 

/// Check what is the purpose of this line
precision mediump float;

/// Properties per vertex
attribute vec3 aVertexPosition;
attribute vec2 aVertexTexture;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

/// Variable from the CPU
uniform float uTime;

/// The model-view-projection
uniform mat4 uM;
uniform mat4 uV;
uniform mat4 uP;

/// Output variables for next stages
varying vec2 vTexture;
varying vec3 vNormal;
varying vec4 vColor;

void main(void)
{
    vTexture = aVertexTexture;
    vNormal = aVertexNormal;
    vColor = aVertexColor;

    /// Rotation using trigonometry, not matrices
    float x = aVertexPosition.x * cos(uTime);
    float y = aVertexPosition.y;
    float z = aVertexPosition.z * sin(uTime);

    gl_Position = uP * uV * uM * vec4(vec3(x, y, z), 1.0);
}