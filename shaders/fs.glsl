/// Alejandro Guayaquil
/// 09.2015

/// Check what is the purpose of this line
precision mediump float;

/// Input from previous stages
varying vec2 vTexture;
varying vec3 vNormal;
varying vec4 vColor;

void main(void)
{
    gl_FragColor = vColor;
}