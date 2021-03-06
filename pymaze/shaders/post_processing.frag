#version 330 core

const float PI = 3.1415926535f;

out vec4 fragColor;

in vec2 texCoords;

uniform sampler2D colorTexture;
uniform sampler2D depthTexture; 

uniform float uSeconds;
uniform vec2 uResolution;

/*
    Inbuilt -
        "gl_FragCoord" = Pixel coordinate(vec2) between (0 - uResolution) from bottomleft
    
    
    Uniforms - 
        "uResolution" = Display resolution
        "uSeconds" = Game running time
*/


// Get depth (Linearized)
float getDepth(vec2 uv)
{
    // TODO: Bring these via uniforms?
    // Right now they need to match with the values in the "c_near" and "c_far" constants in "constants.py"
    float near = 0.01f;
    float far = 100.0f;

    // Linearize the depth
    float depth = texture2D(depthTexture, uv).x;
    return (2.0f * near) / (far + near - depth * (far - near));
}


// Get color
vec3 getColor(vec2 uv)
{
    return texture2D(colorTexture, uv).rgb;
}

//#define T texture2D(colorTexture, 0.5f + (p.xy *= 0.992))

/*
const float stitching_size = 16.0f;
const int invert = 0;

vec4 PostFX(sampler2D tex, vec2 uv, float time)
{
    float rt_w = uResolution.x;
    float rt_h = uResolution.y;

    vec4 c = vec4(0.0);
    
    float size = stitching_size;
    vec2 cPos = uv * vec2(rt_w, rt_h);
    
    vec2 tlPos = floor(cPos / vec2(size, size));
    tlPos *= size;
    
    int remX = int(mod(cPos.x, size));
    int remY = int(mod(cPos.y, size));
    
    if (remX == 0 && remY == 0){
        tlPos = cPos;   
    }

    vec2 blPos = tlPos;
    blPos.y += (size - 1.0f);
    
    if ((remX == remY) || (((int(cPos.x) - int(blPos.x)) == (int(blPos.y) - int(cPos.y)))))
    {
        if (invert == 1){
            c = vec4(0.2f, 0.15f, 0.05f, 1.0f);
        }
        else {
            c = texture2D(tex, tlPos * vec2(1.0f / rt_w, 1.0f / rt_h)) * 1.4f;
        }
    }
    else
    {
        if (invert == 1) {
            c = texture2D(tex, tlPos * vec2(1.0f / rt_w, 1.0f / rt_h)) * 1.4f;
        }
        else {
            c = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
    
    return c;
}
*/

void main()
{
    vec2 tex = texCoords;

    //float r = 0.025f * sin(uSeconds + 1.0f / uResolution.y * gl_FragCoord.y * 16.0f);
    //tex.x += r;

    float depth = getDepth(tex);
    vec3 color = getColor(tex);

    // --------

    /*
    vec2 uv = texCoords;
    fragColor = PostFX(colorTexture, uv, uSeconds);
    */

    /*
    float aperture = 180.0f;
    float apertureHalf = 0.5f * aperture * (PI / 180.0f);
    float maxFactor = sin(apertureHalf);

    vec2 uv;
    vec2 xy = 2.0f * texCoords.xy - 1.0f;
    xy.x *= uResolution.x / uResolution.y;

    float d = length(xy);

    if (d < (2.0f - maxFactor))
    {
        d = length(xy * maxFactor);
        float z = sqrt(1.0f - d * d);
        float r = atan(d, z) / PI;
        float phi = atan(xy.y, xy.x);
        
        uv.x = r * cos(phi) + 0.5f;
        uv.y = r * sin(phi) + 0.5f;
    }
    else
    {
        uv = texCoords.xy;
    }

    vec4 c = texture2D(colorTexture, uv);
    fragColor = c;
    */

    /*
    vec3 p = vec3(gl_FragCoord.xy / uResolution - 0.5f, 0.0f);
    vec3 o = T.rbb;
    for (float i=0.;i<100.;i++){
        p.z += pow(max(0.0f, 0.5f - length(T.rg)), 2.0f) * exp(-i * .008f);
    }

    fragColor = vec4(o * o + p.z, 1.0f);
    */

    fragColor = vec4(color, 1.0f);
} 