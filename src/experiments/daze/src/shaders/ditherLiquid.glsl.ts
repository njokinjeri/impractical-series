import { FRAGMENT_PRELUDE } from './prelude.glsl';

export const DITHER_LIQUID_SHADER = FRAGMENT_PRELUDE + `
  float bayer8(vec2 uv) {
    ivec2 p = ivec2(mod(uv, 8.0));
    int x = p.x; int y = p.y;
    int M[64];
    M[0]=0;  M[1]=32; M[2]=8;  M[3]=40; M[4]=2;  M[5]=34; M[6]=10; M[7]=42;
    M[8]=48; M[9]=16; M[10]=56;M[11]=24;M[12]=50;M[13]=18;M[14]=58;M[15]=26;
    M[16]=12;M[17]=44;M[18]=4; M[19]=36;M[20]=14;M[21]=46;M[22]=6; M[23]=38;
    M[24]=60;M[25]=28;M[26]=52;M[27]=20;M[28]=62;M[29]=30;M[30]=54;M[31]=22;
    M[32]=3; M[33]=35;M[34]=11;M[35]=43;M[36]=1; M[37]=33;M[38]=9; M[39]=41;
    M[40]=51;M[41]=19;M[42]=59;M[43]=27;M[44]=49;M[45]=17;M[46]=57;M[47]=25;
    M[48]=15;M[49]=47;M[50]=7; M[51]=39;M[52]=13;M[53]=45;M[54]=5; M[55]=37;
    M[56]=63;M[57]=31;M[58]=55;M[59]=23;M[60]=61;M[61]=29;M[62]=53;M[63]=21;
    for(int i=0; i<64; i++) {
      if (i == y * 8 + x) return float(M[i]) / 64.0;
    }
    return 0.0;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    
    float d = length(st - tNorm);
    float touchRipple = sin(d * 25.0 - uTime * 6.0) * smoothstep(0.5, 0.0, d) * uTouchActive;
    
    float wave = sin(st.x * 4.0 + uTime + touchRipple * 2.5 + fbm(st * 2.0) * 4.0) * 0.5 + 0.5;
    vec2 bayerCoord = gl_FragCoord.xy - (uTouchDelta * 10.0) + (touchRipple * 20.0);
    float bayer = bayer8(bayerCoord);
    
    float quantized = step(bayer, wave);
    quantized += addGrain(vUv);
    
    gl_FragColor = vec4(applyDuotone(quantized), 1.0);
  }
`;