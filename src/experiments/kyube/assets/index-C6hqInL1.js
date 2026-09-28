(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ua="128",_l=0,Vs=1,Ml=2,da=1,fa=2,ei=3,ar=0,Qt=1,xi=2,pa=1,ii=0,ri=1,es=2,ks=3,Ws=4,wl=5,Cn=100,bl=101,Sl=102,Xs=103,qs=104,El=200,Tl=201,Al=202,Ll=203,ma=204,ga=205,Cl=206,Rl=207,Pl=208,Il=209,Dl=210,Nl=0,Fl=1,Bl=2,ns=3,zl=4,Ol=5,Ul=6,Hl=7,lr=0,Gl=1,Vl=2,si=0,kl=1,Wl=2,Xl=3,xa=4,ql=5,va=300,us=301,ds=302,Ys=303,Zs=304,fs=306,ps=307,ci=1e3,we=1001,is=1002,oe=1003,js=1004,Js=1005,pe=1006,Yl=1007,ms=1008,gs=1009,Zl=1010,jl=1011,Qi=1012,Jl=1013,Ji=1014,Ze=1015,$i=1016,Ql=1017,$l=1018,Kl=1019,oi=1020,tc=1021,an=1022,be=1023,ec=1024,nc=1025,Dn=1026,hi=1027,ic=1028,rc=1029,sc=1030,oc=1031,ac=1032,lc=1033,Qs=33776,$s=33777,Ks=33778,to=33779,eo=35840,no=35841,io=35842,ro=35843,cc=36196,so=37492,oo=37496,hc=37808,uc=37809,dc=37810,fc=37811,pc=37812,mc=37813,gc=37814,xc=37815,vc=37816,yc=37817,_c=37818,Mc=37819,wc=37820,bc=37821,Sc=36492,Ec=37840,Tc=37841,Ac=37842,Lc=37843,Cc=37844,Rc=37845,Pc=37846,Ic=37847,Dc=37848,Nc=37849,Fc=37850,Bc=37851,zc=37852,Oc=37853,Uc=2200,Hc=2201,Gc=2202,Ki=2300,tr=2301,yr=2302,Rn=2400,Pn=2401,er=2402,xs=2500,ya=2501,Vc=0,vi=3e3,_a=3001,kc=3007,Wc=3002,Xc=3003,qc=3004,Yc=3005,Zc=3006,jc=3200,Jc=3201,zn=0,Qc=1,_r=7680,$c=519,ui=35044,nr=35048,ao="300 es";class hn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Kt=[];for(let r=0;r<256;r++)Kt[r]=(r<16?"0":"")+r.toString(16);const Mr=Math.PI/180,rs=180/Math.PI;function Re(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[r&255]+Kt[r>>8&255]+Kt[r>>16&255]+Kt[r>>24&255]+"-"+Kt[t&255]+Kt[t>>8&255]+"-"+Kt[t>>16&15|64]+Kt[t>>24&255]+"-"+Kt[e&63|128]+Kt[e>>8&255]+"-"+Kt[e>>16&255]+Kt[e>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toUpperCase()}function fe(r,t,e){return Math.max(t,Math.min(e,r))}function Kc(r,t){return(r%t+t)%t}function wr(r,t,e){return(1-e)*r+e*t}function lo(r){return(r&r-1)===0&&r!==0}function th(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function eh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}class q{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}q.prototype.isVector2=!0;class te{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],m=n[8],x=i[0],y=i[3],g=i[6],f=i[1],S=i[4],E=i[7],T=i[2],v=i[5],R=i[8];return s[0]=o*x+a*f+l*T,s[3]=o*y+a*S+l*v,s[6]=o*g+a*E+l*R,s[1]=c*x+h*f+u*T,s[4]=c*y+h*S+u*v,s[7]=c*g+h*E+u*R,s[2]=d*x+p*f+m*T,s[5]=d*y+p*S+m*v,s[8]=d*g+p*E+m*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,p=c*s-o*l,m=e*u+n*d+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(h*e-i*l)*x,t[5]=(i*s-a*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],a=i[6],l=i[1],c=i[4],h=i[7];return i[0]=e*s+n*l,i[3]=e*o+n*c,i[6]=e*a+n*h,i[1]=-n*s+e*l,i[4]=-n*o+e*c,i[7]=-n*a+e*h,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}te.prototype.isMatrix3=!0;let dn;class On{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{dn===void 0&&(dn=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),dn.width=t.width,dn.height=t.height;const n=dn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=dn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}}let nh=0;class ee extends hn{constructor(t=ee.DEFAULT_IMAGE,e=ee.DEFAULT_MAPPING,n=we,i=we,s=pe,o=ms,a=be,l=gs,c=1,h=vi){super(),Object.defineProperty(this,"id",{value:nh++}),this.uuid=Re(),this.name="",this.image=t,this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.version=0,this.onUpdate=null}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.image=t.image,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=Re()),!e&&t.images[i.uuid]===void 0){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(br(i[o].image)):s.push(br(i[o]))}else s=br(i);t.images[i.uuid]={uuid:i.uuid,url:s}}n.image=i.uuid}return e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==va)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ci:t.x=t.x-Math.floor(t.x);break;case we:t.x=t.x<0?0:1;break;case is:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ci:t.y=t.y-Math.floor(t.y);break;case we:t.y=t.y<0?0:1;break;case is:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&this.version++}}ee.DEFAULT_IMAGE=void 0;ee.DEFAULT_MAPPING=va;ee.prototype.isTexture=!0;function br(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?On.getDataURL(r):r.data?{data:Array.prototype.slice.call(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}class Nt{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],m=l[9],x=l[2],y=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-y)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+y)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,E=(p+1)/2,T=(g+1)/2,v=(h+d)/4,R=(u+x)/4,I=(m+y)/4;return S>E&&S>T?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=v/n,s=R/n):E>T?E<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(E),n=v/i,s=I/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=R/s,i=I/s),this.set(n,i,s,e),this}let f=Math.sqrt((y-m)*(y-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(f)<.001&&(f=1),this.x=(y-m)/f,this.y=(u-x)/f,this.z=(d-h)/f,this.w=Math.acos((c+p+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}Nt.prototype.isVector4=!0;class ln extends hn{constructor(t,e,n){super(),this.width=t,this.height=e,this.depth=1,this.scissor=new Nt(0,0,t,e),this.scissorTest=!1,this.viewport=new Nt(0,0,t,e),n=n||{},this.texture=new ee(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:pe,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null}setTexture(t){t.image={width:this.width,height:this.height,depth:this.depth},this.texture=t}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}ln.prototype.isWebGLRenderTarget=!0;class ih extends ln{constructor(t,e,n){super(t,e,n),this.samples=4}copy(t){return super.copy.call(this,t),this.samples=t.samples,this}}ih.prototype.isWebGLMultisampleRenderTarget=!0;class ie{constructor(t=0,e=0,n=0,i=1){this._x=t,this._y=e,this._z=n,this._w=i}static slerp(t,e,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(t,e,i)}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],p=s[o+1],m=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=m,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==m){let y=1-a;const g=l*d+c*p+h*m+u*x,f=g>=0?1:-1,S=1-g*g;if(S>Number.EPSILON){const T=Math.sqrt(S),v=Math.atan2(T,g*f);y=Math.sin(y*v)/T,a=Math.sin(a*v)/T}const E=a*f;if(l=l*y+d*E,c=c*y+p*E,h=h*y+m*E,u=u*y+x*E,y===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],p=s[o+2],m=s[o+3];return t[e]=a*m+h*u+l*p-c*d,t[e+1]=l*m+h*d+c*u-a*p,t[e+2]=c*m+h*p+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!(t&&t.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),p=l(i/2),m=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"YZX":this._x=d*h*u+c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u-d*p*m;break;case"XZY":this._x=d*h*u-c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return e!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){this.copy(t).slerp(e,n)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}ie.prototype.isQuaternion=!0;class w{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(co.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(co.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=l*e+o*i-a*n,h=l*n+a*e-s*i,u=l*i+s*n-o*e,d=-s*e-o*n-a*i;return this.x=c*l+d*-s+h*-a-u*-o,this.y=h*l+d*-o+u*-s-c*-a,this.z=u*l+d*-a+c*-o-h*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t,e){return e!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sr.copy(this).projectOnVector(t),this.sub(Sr)}reflect(t){return this.sub(Sr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}w.prototype.isVector3=!0;const Sr=new w,co=new ie;class ge{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=t.length;l<c;l+=3){const h=t[l],u=t[l+1],d=t[l+2];h<e&&(e=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=t.count;l<c;l++){const h=t.getX(l),u=t.getY(l),d=t.getZ(l);h<e&&(e=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t){return this.makeEmpty(),this.expandByObject(t)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return t===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),t=new w),this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return t===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),t=new w),this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t){t.updateWorldMatrix(!1,!1);const e=t.geometry;e!==void 0&&(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox),Er.applyMatrix4(t.matrixWorld),this.union(Er));const n=t.children;for(let i=0,s=n.length;i<s;i++)this.expandByObject(n[i]);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),e=new w),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Xn),Xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qn),Mi.subVectors(this.max,qn),fn.subVectors(t.a,qn),pn.subVectors(t.b,qn),mn.subVectors(t.c,qn),He.subVectors(pn,fn),Ge.subVectors(mn,pn),sn.subVectors(fn,mn);let e=[0,-He.z,He.y,0,-Ge.z,Ge.y,0,-sn.z,sn.y,He.z,0,-He.x,Ge.z,0,-Ge.x,sn.z,0,-sn.x,-He.y,He.x,0,-Ge.y,Ge.x,0,-sn.y,sn.x,0];return!Tr(e,fn,pn,mn,Mi)||(e=[1,0,0,0,1,0,0,0,1],!Tr(e,fn,pn,mn,Mi))?!1:(wi.crossVectors(He,Ge),e=[wi.x,wi.y,wi.z],Tr(e,fn,pn,mn,Mi))}clampPoint(t,e){return e===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),e=new w),e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Xn.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return t===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(t.center),t.radius=this.getSize(Xn).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}ge.prototype.isBox3=!0;const Fe=[new w,new w,new w,new w,new w,new w,new w,new w],Xn=new w,Er=new ge,fn=new w,pn=new w,mn=new w,He=new w,Ge=new w,sn=new w,qn=new w,Mi=new w,wi=new w,on=new w;function Tr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){on.fromArray(r,s);const a=i.x*Math.abs(on.x)+i.y*Math.abs(on.y)+i.z*Math.abs(on.z),l=t.dot(on),c=e.dot(on),h=n.dot(on);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const rh=new ge,ho=new w,Ar=new w,Lr=new w;class Un{constructor(t=new w,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rh.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),e=new w),e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return t===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),t=new ge),this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){Lr.subVectors(t,this.center);const e=Lr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Lr.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return Ar.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(ho.copy(t.center).add(Ar)),this.expandByPoint(ho.copy(t.center).sub(Ar)),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Be=new w,Cr=new w,bi=new w,Ve=new w,Rr=new w,Si=new w,Pr=new w;class Hn{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e===void 0&&(console.warn("THREE.Ray: .at() target is now required"),e=new w),e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Be)),this}closestPointToPoint(t,e){e===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),e=new w),e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Be.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Be.copy(this.direction).multiplyScalar(e).add(this.origin),Be.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Cr.copy(t).add(e).multiplyScalar(.5),bi.copy(e).sub(t).normalize(),Ve.copy(this.origin).sub(Cr);const s=t.distanceTo(e)*.5,o=-this.direction.dot(bi),a=Ve.dot(this.direction),l=-Ve.dot(bi),c=Ve.lengthSq(),h=Math.abs(1-o*o);let u,d,p,m;if(h>0)if(u=o*l-a,d=o*a-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(bi).multiplyScalar(d).add(Cr),p}intersectSphere(t,e){Be.subVectors(t.center,this.origin);const n=Be.dot(this.direction),i=Be.dot(Be)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Be)!==null}intersectTriangle(t,e,n,i,s){Rr.subVectors(e,t),Si.subVectors(n,t),Pr.crossVectors(Rr,Si);let o=this.direction.dot(Pr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ve.subVectors(this.origin,t);const l=a*this.direction.dot(Si.crossVectors(Ve,Si));if(l<0)return null;const c=a*this.direction.dot(Rr.cross(Ve));if(c<0||l+c>o)return null;const h=-a*Ve.dot(Pr);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,o,a,l,c,h,u,d,p,m,x,y){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=s,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=m,g[11]=x,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/gn.setFromMatrixColumn(t,0).length(),s=1/gn.setFromMatrixColumn(t,1).length(),o=1/gn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,p=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+m*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=m+p*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,m=c*h,x=c*u;e[0]=d+x*a,e[4]=m*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-m,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,m=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=m+p*a,e[1]=p+m*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,p=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=m*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,p=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=m*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+m,e[10]=d-x*u}else if(t.order==="XZY"){const d=o*l,p=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=p*u-m,e[2]=m*u-p,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sh,t,oh)}lookAt(t,e,n){const i=this.elements;return ue.subVectors(t,e),ue.lengthSq()===0&&(ue.z=1),ue.normalize(),ke.crossVectors(n,ue),ke.lengthSq()===0&&(Math.abs(n.z)===1?ue.x+=1e-4:ue.z+=1e-4,ue.normalize(),ke.crossVectors(n,ue)),ke.normalize(),Ei.crossVectors(ue,ke),i[0]=ke.x,i[4]=Ei.x,i[8]=ue.x,i[1]=ke.y,i[5]=Ei.y,i[9]=ue.y,i[2]=ke.z,i[6]=Ei.z,i[10]=ue.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],m=n[2],x=n[6],y=n[10],g=n[14],f=n[3],S=n[7],E=n[11],T=n[15],v=i[0],R=i[4],I=i[8],N=i[12],B=i[1],H=i[5],z=i[9],A=i[13],P=i[2],D=i[6],C=i[10],X=i[14],Q=i[3],Z=i[7],st=i[11],rt=i[15];return s[0]=o*v+a*B+l*P+c*Q,s[4]=o*R+a*H+l*D+c*Z,s[8]=o*I+a*z+l*C+c*st,s[12]=o*N+a*A+l*X+c*rt,s[1]=h*v+u*B+d*P+p*Q,s[5]=h*R+u*H+d*D+p*Z,s[9]=h*I+u*z+d*C+p*st,s[13]=h*N+u*A+d*X+p*rt,s[2]=m*v+x*B+y*P+g*Q,s[6]=m*R+x*H+y*D+g*Z,s[10]=m*I+x*z+y*C+g*st,s[14]=m*N+x*A+y*X+g*rt,s[3]=f*v+S*B+E*P+T*Q,s[7]=f*R+S*H+E*D+T*Z,s[11]=f*I+S*z+E*C+T*st,s[15]=f*N+S*A+E*X+T*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],m=t[3],x=t[7],y=t[11],g=t[15];return m*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*p-n*l*p)+x*(+e*l*p-e*c*d+s*o*d-i*o*p+i*c*h-s*l*h)+y*(+e*c*u-e*a*p-s*o*u+n*o*p+s*a*h-n*c*h)+g*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],m=t[12],x=t[13],y=t[14],g=t[15],f=u*y*c-x*d*c+x*l*p-a*y*p-u*l*g+a*d*g,S=m*d*c-h*y*c-m*l*p+o*y*p+h*l*g-o*d*g,E=h*x*c-m*u*c+m*a*p-o*x*p-h*a*g+o*u*g,T=m*u*l-h*x*l-m*a*d+o*x*d+h*a*y-o*u*y,v=e*f+n*S+i*E+s*T;if(v===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/v;return t[0]=f*R,t[1]=(x*d*s-u*y*s-x*i*p+n*y*p+u*i*g-n*d*g)*R,t[2]=(a*y*s-x*l*s+x*i*c-n*y*c-a*i*g+n*l*g)*R,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*p-n*l*p)*R,t[4]=S*R,t[5]=(h*y*s-m*d*s+m*i*p-e*y*p-h*i*g+e*d*g)*R,t[6]=(m*l*s-o*y*s-m*i*c+e*y*c+o*i*g-e*l*g)*R,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*p+e*l*p)*R,t[8]=E*R,t[9]=(m*u*s-h*x*s-m*n*p+e*x*p+h*n*g-e*u*g)*R,t[10]=(o*x*s-m*a*s+m*n*c-e*x*c-o*n*g+e*a*g)*R,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*p-e*a*p)*R,t[12]=T*R,t[13]=(h*x*i-m*u*i+m*n*d-e*x*d-h*n*y+e*u*y)*R,t[14]=(m*a*i-o*x*i-m*n*l+e*x*l+o*n*y-e*a*y)*R,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n){return this.set(1,e,n,0,t,1,n,0,t,e,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,p=s*h,m=s*u,x=o*h,y=o*u,g=a*u,f=l*c,S=l*h,E=l*u,T=n.x,v=n.y,R=n.z;return i[0]=(1-(x+g))*T,i[1]=(p+E)*T,i[2]=(m-S)*T,i[3]=0,i[4]=(p-E)*v,i[5]=(1-(d+g))*v,i[6]=(y+f)*v,i[7]=0,i[8]=(m+S)*R,i[9]=(y-f)*R,i[10]=(1-(d+x))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=gn.set(i[0],i[1],i[2]).length();const o=gn.set(i[4],i[5],i[6]).length(),a=gn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ve.copy(this);const c=1/s,h=1/o,u=1/a;return ve.elements[0]*=c,ve.elements[1]*=c,ve.elements[2]*=c,ve.elements[4]*=h,ve.elements[5]*=h,ve.elements[6]*=h,ve.elements[8]*=u,ve.elements[9]*=u,ve.elements[10]*=u,e.setFromRotationMatrix(ve),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,l=2*s/(e-t),c=2*s/(n-i),h=(e+t)/(e-t),u=(n+i)/(n-i),d=-(o+s)/(o-s),p=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=p,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,o){const a=this.elements,l=1/(e-t),c=1/(n-i),h=1/(o-s),u=(e+t)*l,d=(n+i)*c,p=(o+s)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-p,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}ht.prototype.isMatrix4=!0;const gn=new w,ve=new ht,sh=new w(0,0,0),oh=new w(1,1,1),ke=new w,Ei=new w,ue=new w,uo=new ht,fo=new ie;class Gn{constructor(t=0,e=0,n=0,i=Gn.DefaultOrder){this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._order=i||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e,n){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e=e||this._order,e){case"XYZ":this._y=Math.asin(fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n!==!1&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return uo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uo,e,n)}setFromVector3(t,e){return this.set(t.x,t.y,t.z,e||this._order)}reorder(t){return fo.setFromEuler(this),this.setFromQuaternion(fo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}toVector3(t){return t?t.set(this._x,this._y,this._z):new w(this._x,this._y,this._z)}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}Gn.prototype.isEuler=!0;Gn.DefaultOrder="XYZ";Gn.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class ah{constructor(){this.mask=1}set(t){this.mask=1<<t|0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}}let lh=0;const po=new w,xn=new ie,ze=new ht,Ti=new w,Yn=new w,ch=new w,hh=new ie,mo=new w(1,0,0),go=new w(0,1,0),xo=new w(0,0,1),uh={type:"added"},vo={type:"removed"};class Ct extends hn{constructor(){super(),Object.defineProperty(this,"id",{value:lh++}),this.uuid=Re(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DefaultUp.clone();const t=new w,e=new Gn,n=new ie,i=new w(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new te}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Ct.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new ah,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return xn.setFromAxisAngle(t,e),this.quaternion.multiply(xn),this}rotateOnWorldAxis(t,e){return xn.setFromAxisAngle(t,e),this.quaternion.premultiply(xn),this}rotateX(t){return this.rotateOnAxis(mo,t)}rotateY(t){return this.rotateOnAxis(go,t)}rotateZ(t){return this.rotateOnAxis(xo,t)}translateOnAxis(t,e){return po.copy(t).applyQuaternion(this.quaternion),this.position.add(po.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(mo,t)}translateY(t){return this.translateOnAxis(go,t)}translateZ(t){return this.translateOnAxis(xo,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(ze.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ti.copy(t):Ti.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Yn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ze.lookAt(Yn,Ti,this.up):ze.lookAt(Ti,Yn,this.up),this.quaternion.setFromRotationMatrix(ze),i&&(ze.extractRotation(i.matrixWorld),xn.setFromRotationMatrix(ze),this.quaternion.premultiply(xn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(uh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vo)),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(vo)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),ze.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ze.multiply(t.parent.matrixWorld)),t.applyMatrix4(ze),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return t===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),t=new w),this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return t===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),t=new ie),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yn,t,ch),t}getWorldScale(t){return t===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),t=new w),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yn,hh,t),t}getWorldDirection(t){t===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),t=new w),this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ct.DefaultUp=new w(0,1,0);Ct.DefaultMatrixAutoUpdate=!0;Ct.prototype.isObject3D=!0;const Ir=new w,dh=new w,fh=new te;class Te{constructor(t=new w(1,0,0),e=0){this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ir.subVectors(n,e).cross(dh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),e=new w),e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){e===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),e=new w);const n=t.delta(Ir),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),t=new w),t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||fh.getNormalMatrix(t),i=this.coplanarPoint(Ir).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}Te.prototype.isPlane=!0;const ye=new w,Oe=new w,Dr=new w,Ue=new w,vn=new w,yn=new w,yo=new w,Nr=new w,Fr=new w,Br=new w;class Zt{constructor(t=new w,e=new w,n=new w){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new w),i.subVectors(n,e),ye.subVectors(t,e),i.cross(ye);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){ye.subVectors(i,e),Oe.subVectors(n,e),Dr.subVectors(t,e);const o=ye.dot(ye),a=ye.dot(Oe),l=ye.dot(Dr),c=Oe.dot(Oe),h=Oe.dot(Dr),u=o*c-a*a;if(s===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),s=new w),u===0)return s.set(-2,-1,-1);const d=1/u,p=(c*l-a*h)*d,m=(o*h-a*l)*d;return s.set(1-p-m,m,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ue),Ue.x>=0&&Ue.y>=0&&Ue.x+Ue.y<=1}static getUV(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Ue),l.set(0,0),l.addScaledVector(s,Ue.x),l.addScaledVector(o,Ue.y),l.addScaledVector(a,Ue.z),l}static isFrontFacing(t,e,n,i){return ye.subVectors(n,e),Oe.subVectors(t,e),ye.cross(Oe).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ye.subVectors(this.c,this.b),Oe.subVectors(this.a,this.b),ye.cross(Oe).length()*.5}getMidpoint(t){return t===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),t=new w),t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Zt.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),t=new Te),t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Zt.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Zt.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Zt.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Zt.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){e===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),e=new w);const n=this.a,i=this.b,s=this.c;let o,a;vn.subVectors(i,n),yn.subVectors(s,n),Nr.subVectors(t,n);const l=vn.dot(Nr),c=yn.dot(Nr);if(l<=0&&c<=0)return e.copy(n);Fr.subVectors(t,i);const h=vn.dot(Fr),u=yn.dot(Fr);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(vn,o);Br.subVectors(t,s);const p=vn.dot(Br),m=yn.dot(Br);if(m>=0&&p<=m)return e.copy(s);const x=p*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(yn,a);const y=h*m-p*u;if(y<=0&&u-h>=0&&p-m>=0)return yo.subVectors(s,i),a=(u-h)/(u-h+(p-m)),e.copy(i).addScaledVector(yo,a);const g=1/(y+x+d);return o=x*g,a=d*g,e.copy(n).addScaledVector(vn,o).addScaledVector(yn,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let ph=0;function $t(){Object.defineProperty(this,"id",{value:ph++}),this.uuid=Re(),this.name="",this.type="Material",this.fog=!0,this.blending=ri,this.side=ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=Cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}$t.prototype=Object.assign(Object.create(hn.prototype),{constructor:$t,isMaterial:!0,onBuild:function(){},onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(r){if(r!==void 0)for(const t in r){const e=r[t];if(e===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=e===pa;continue}const n=this[t];if(n===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}n&&n.isColor?n.set(e):n&&n.isVector3&&e&&e.isVector3?n.copy(e):this[t]=e}},toJSON:function(r){const t=r===void 0||typeof r=="string";t&&(r={textures:{},images:{}});const e={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),this.color&&this.color.isColor&&(e.color=this.color.getHex()),this.roughness!==void 0&&(e.roughness=this.roughness),this.metalness!==void 0&&(e.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(e.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(e.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(e.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(e.specular=this.specular.getHex()),this.shininess!==void 0&&(e.shininess=this.shininess),this.clearcoat!==void 0&&(e.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(e.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(e.clearcoatMap=this.clearcoatMap.toJSON(r).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(e.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(r).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(e.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(r).uuid,e.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(e.map=this.map.toJSON(r).uuid),this.matcap&&this.matcap.isTexture&&(e.matcap=this.matcap.toJSON(r).uuid),this.alphaMap&&this.alphaMap.isTexture&&(e.alphaMap=this.alphaMap.toJSON(r).uuid),this.lightMap&&this.lightMap.isTexture&&(e.lightMap=this.lightMap.toJSON(r).uuid,e.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(e.aoMap=this.aoMap.toJSON(r).uuid,e.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(e.bumpMap=this.bumpMap.toJSON(r).uuid,e.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(e.normalMap=this.normalMap.toJSON(r).uuid,e.normalMapType=this.normalMapType,e.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(e.displacementMap=this.displacementMap.toJSON(r).uuid,e.displacementScale=this.displacementScale,e.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(e.roughnessMap=this.roughnessMap.toJSON(r).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(e.metalnessMap=this.metalnessMap.toJSON(r).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(e.emissiveMap=this.emissiveMap.toJSON(r).uuid),this.specularMap&&this.specularMap.isTexture&&(e.specularMap=this.specularMap.toJSON(r).uuid),this.envMap&&this.envMap.isTexture&&(e.envMap=this.envMap.toJSON(r).uuid,this.combine!==void 0&&(e.combine=this.combine)),this.envMapIntensity!==void 0&&(e.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(e.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(e.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(e.gradientMap=this.gradientMap.toJSON(r).uuid),this.size!==void 0&&(e.size=this.size),this.shadowSide!==null&&(e.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(e.sizeAttenuation=this.sizeAttenuation),this.blending!==ri&&(e.blending=this.blending),this.side!==ar&&(e.side=this.side),this.vertexColors&&(e.vertexColors=!0),this.opacity<1&&(e.opacity=this.opacity),this.transparent===!0&&(e.transparent=this.transparent),e.depthFunc=this.depthFunc,e.depthTest=this.depthTest,e.depthWrite=this.depthWrite,e.colorWrite=this.colorWrite,e.stencilWrite=this.stencilWrite,e.stencilWriteMask=this.stencilWriteMask,e.stencilFunc=this.stencilFunc,e.stencilRef=this.stencilRef,e.stencilFuncMask=this.stencilFuncMask,e.stencilFail=this.stencilFail,e.stencilZFail=this.stencilZFail,e.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(e.rotation=this.rotation),this.polygonOffset===!0&&(e.polygonOffset=!0),this.polygonOffsetFactor!==0&&(e.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(e.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(e.linewidth=this.linewidth),this.dashSize!==void 0&&(e.dashSize=this.dashSize),this.gapSize!==void 0&&(e.gapSize=this.gapSize),this.scale!==void 0&&(e.scale=this.scale),this.dithering===!0&&(e.dithering=!0),this.alphaTest>0&&(e.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(e.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(e.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(e.wireframe=this.wireframe),this.wireframeLinewidth>1&&(e.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(e.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(e.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(e.morphTargets=!0),this.morphNormals===!0&&(e.morphNormals=!0),this.skinning===!0&&(e.skinning=!0),this.flatShading===!0&&(e.flatShading=this.flatShading),this.visible===!1&&(e.visible=!1),this.toneMapped===!1&&(e.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(e.userData=this.userData);function n(i){const s=[];for(const o in i){const a=i[o];delete a.metadata,s.push(a)}return s}if(t){const i=n(r.textures),s=n(r.images);i.length>0&&(e.textures=i),s.length>0&&(e.images=s)}return e},clone:function(){return new this.constructor().copy(this)},copy:function(r){this.name=r.name,this.fog=r.fog,this.blending=r.blending,this.side=r.side,this.vertexColors=r.vertexColors,this.opacity=r.opacity,this.transparent=r.transparent,this.blendSrc=r.blendSrc,this.blendDst=r.blendDst,this.blendEquation=r.blendEquation,this.blendSrcAlpha=r.blendSrcAlpha,this.blendDstAlpha=r.blendDstAlpha,this.blendEquationAlpha=r.blendEquationAlpha,this.depthFunc=r.depthFunc,this.depthTest=r.depthTest,this.depthWrite=r.depthWrite,this.stencilWriteMask=r.stencilWriteMask,this.stencilFunc=r.stencilFunc,this.stencilRef=r.stencilRef,this.stencilFuncMask=r.stencilFuncMask,this.stencilFail=r.stencilFail,this.stencilZFail=r.stencilZFail,this.stencilZPass=r.stencilZPass,this.stencilWrite=r.stencilWrite;const t=r.clippingPlanes;let e=null;if(t!==null){const n=t.length;e=new Array(n);for(let i=0;i!==n;++i)e[i]=t[i].clone()}return this.clippingPlanes=e,this.clipIntersection=r.clipIntersection,this.clipShadows=r.clipShadows,this.shadowSide=r.shadowSide,this.colorWrite=r.colorWrite,this.precision=r.precision,this.polygonOffset=r.polygonOffset,this.polygonOffsetFactor=r.polygonOffsetFactor,this.polygonOffsetUnits=r.polygonOffsetUnits,this.dithering=r.dithering,this.alphaTest=r.alphaTest,this.alphaToCoverage=r.alphaToCoverage,this.premultipliedAlpha=r.premultipliedAlpha,this.visible=r.visible,this.toneMapped=r.toneMapped,this.userData=JSON.parse(JSON.stringify(r.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Object.defineProperty($t.prototype,"needsUpdate",{set:function(r){r===!0&&this.version++}});const Ma={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_e={h:0,s:0,l:0},Ai={h:0,s:0,l:0};function zr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function Or(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ur(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}class lt{constructor(t,e,n){return e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,this}setRGB(t,e,n){return this.r=t,this.g=e,this.b=n,this}setHSL(t,e,n){if(t=Kc(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+e):n+e-n*e,s=2*n-i;this.r=zr(s,i,t+1/3),this.g=zr(s,i,t),this.b=zr(s,i,t-1/3)}return this}setStyle(t){function e(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let i;const s=n[1],o=n[2];switch(s){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,e(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,e(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const a=parseFloat(i[1])/360,l=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return e(i[4]),this.setHSL(a,l,c)}break}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const i=n[1],s=i.length;if(s===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,this;if(s===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,this}return t&&t.length>0?this.setColorName(t):this}setColorName(t){const e=Ma[t.toLowerCase()];return e!==void 0?this.setHex(e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copyGammaToLinear(t,e=2){return this.r=Math.pow(t.r,e),this.g=Math.pow(t.g,e),this.b=Math.pow(t.b,e),this}copyLinearToGamma(t,e=2){const n=e>0?1/e:1;return this.r=Math.pow(t.r,n),this.g=Math.pow(t.g,n),this.b=Math.pow(t.b,n),this}convertGammaToLinear(t){return this.copyGammaToLinear(this,t),this}convertLinearToGamma(t){return this.copyLinearToGamma(this,t),this}copySRGBToLinear(t){return this.r=Or(t.r),this.g=Or(t.g),this.b=Or(t.b),this}copyLinearToSRGB(t){return this.r=Ur(t.r),this.g=Ur(t.g),this.b=Ur(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(t){t===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),t={h:0,s:0,l:0});const e=this.r,n=this.g,i=this.b,s=Math.max(e,n,i),o=Math.min(e,n,i);let a,l;const c=(o+s)/2;if(o===s)a=0,l=0;else{const h=s-o;switch(l=c<=.5?h/(s+o):h/(2-s-o),s){case e:a=(n-i)/h+(n<i?6:0);break;case n:a=(i-e)/h+2;break;case i:a=(e-n)/h+4;break}a/=6}return t.h=a,t.s=l,t.l=c,t}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(t,e,n){return this.getHSL(_e),_e.h+=t,_e.s+=e,_e.l+=n,this.setHSL(_e.h,_e.s,_e.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(_e),t.getHSL(Ai);const n=wr(_e.h,Ai.h,e),i=wr(_e.s,Ai.s,e),s=wr(_e.l,Ai.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),t.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}lt.NAMES=Ma;lt.prototype.isColor=!0;lt.prototype.r=1;lt.prototype.g=1;lt.prototype.b=1;class cr extends $t{constructor(t){super(),this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this}}cr.prototype.isMeshBasicMaterial=!0;const Ut=new w,Li=new q;class jt{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=ui,this.updateRange={offset:0,count:-1},this.version=0,this.onUploadCallback=function(){}}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}copyColorsArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),o=new lt),e[n++]=o.r,e[n++]=o.g,e[n++]=o.b}return this}copyVector2sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),o=new q),e[n++]=o.x,e[n++]=o.y}return this}copyVector3sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),o=new w),e[n++]=o.x,e[n++]=o.y,e[n++]=o.z}return this}copyVector4sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let o=t[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),o=new Nt),e[n++]=o.x,e[n++]=o.y,e[n++]=o.z,e[n++]=o.w}return this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Li.fromBufferAttribute(this,e),Li.applyMatrix3(t),this.setXY(e,Li.x,Li.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ut.fromBufferAttribute(this,e),Ut.applyMatrix3(t),this.setXYZ(e,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ut.x=this.getX(e),Ut.y=this.getY(e),Ut.z=this.getZ(e),Ut.applyMatrix4(t),this.setXYZ(e,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ut.x=this.getX(e),Ut.y=this.getY(e),Ut.z=this.getZ(e),Ut.applyNormalMatrix(t),this.setXYZ(e,Ut.x,Ut.y,Ut.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ut.x=this.getX(e),Ut.y=this.getY(e),Ut.z=this.getZ(e),Ut.transformDirection(t),this.setXYZ(e,Ut.x,Ut.y,Ut.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){return this.array[t*this.itemSize]}setX(t,e){return this.array[t*this.itemSize]=e,this}getY(t){return this.array[t*this.itemSize+1]}setY(t,e){return this.array[t*this.itemSize+1]=e,this}getZ(t){return this.array[t*this.itemSize+2]}setZ(t,e){return this.array[t*this.itemSize+2]=e,this}getW(t){return this.array[t*this.itemSize+3]}setW(t,e){return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ui&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}jt.prototype.isBufferAttribute=!0;class wa extends jt{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ba extends jt{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class mh extends jt{constructor(t,e,n){super(new Uint16Array(t),e,n)}}mh.prototype.isFloat16BufferAttribute=!0;class Ot extends jt{constructor(t,e,n){super(new Float32Array(t),e,n)}}function Sa(r){if(r.length===0)return-1/0;let t=r[0];for(let e=1,n=r.length;e<n;++e)r[e]>t&&(t=r[e]);return t}let gh=0;const Ee=new ht,Hr=new Ct,_n=new w,de=new ge,Zn=new ge,Jt=new w;class Rt extends hn{constructor(){super(),Object.defineProperty(this,"id",{value:gh++}),this.uuid=Re(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sa(t)>65535?ba:wa)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new te().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}rotateX(t){return Ee.makeRotationX(t),this.applyMatrix4(Ee),this}rotateY(t){return Ee.makeRotationY(t),this.applyMatrix4(Ee),this}rotateZ(t){return Ee.makeRotationZ(t),this.applyMatrix4(Ee),this}translate(t,e,n){return Ee.makeTranslation(t,e,n),this.applyMatrix4(Ee),this}scale(t,e,n){return Ee.makeScale(t,e,n),this.applyMatrix4(Ee),this}lookAt(t){return Hr.lookAt(t),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_n).negate(),this.translate(_n.x,_n.y,_n.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ot(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ge);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];de.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,de.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,de.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(de.min),this.boundingBox.expandByPoint(de.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(t){const n=this.boundingSphere.center;if(de.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Zn.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(de.min,Zn.min),de.expandByPoint(Jt),Jt.addVectors(de.max,Zn.max),de.expandByPoint(Jt)):(de.expandByPoint(Zn.min),de.expandByPoint(Zn.max))}de.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Jt.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Jt));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Jt.fromBufferAttribute(a,c),l&&(_n.fromBufferAttribute(t,c),Jt.add(_n)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;e.tangent===void 0&&this.setAttribute("tangent",new jt(new Float32Array(4*a),4));const l=e.tangent.array,c=[],h=[];for(let B=0;B<a;B++)c[B]=new w,h[B]=new w;const u=new w,d=new w,p=new w,m=new q,x=new q,y=new q,g=new w,f=new w;function S(B,H,z){u.fromArray(i,B*3),d.fromArray(i,H*3),p.fromArray(i,z*3),m.fromArray(o,B*2),x.fromArray(o,H*2),y.fromArray(o,z*2),d.sub(u),p.sub(u),x.sub(m),y.sub(m);const A=1/(x.x*y.y-y.x*x.y);isFinite(A)&&(g.copy(d).multiplyScalar(y.y).addScaledVector(p,-x.y).multiplyScalar(A),f.copy(p).multiplyScalar(x.x).addScaledVector(d,-y.x).multiplyScalar(A),c[B].add(g),c[H].add(g),c[z].add(g),h[B].add(f),h[H].add(f),h[z].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let B=0,H=E.length;B<H;++B){const z=E[B],A=z.start,P=z.count;for(let D=A,C=A+P;D<C;D+=3)S(n[D+0],n[D+1],n[D+2])}const T=new w,v=new w,R=new w,I=new w;function N(B){R.fromArray(s,B*3),I.copy(R);const H=c[B];T.copy(H),T.sub(R.multiplyScalar(R.dot(H))).normalize(),v.crossVectors(I,H);const A=v.dot(h[B])<0?-1:1;l[B*4]=T.x,l[B*4+1]=T.y,l[B*4+2]=T.z,l[B*4+3]=A}for(let B=0,H=E.length;B<H;++B){const z=E[B],A=z.start,P=z.count;for(let D=A,C=A+P;D<C;D+=3)N(n[D+0]),N(n[D+1]),N(n[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new w,s=new w,o=new w,a=new w,l=new w,c=new w,h=new w,u=new w;if(t)for(let d=0,p=t.count;d<p;d+=3){const m=t.getX(d+0),x=t.getX(d+1),y=t.getX(d+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,y),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(y,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(t,e){if(!(t&&t.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);return}e===void 0&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(t.attributes[i]===void 0)continue;const o=n[i].array,a=t.attributes[i],l=a.array,c=a.itemSize*e,h=Math.min(l.length,o.length-c);for(let u=0,d=c;u<h;u++,d++)o[d]=l[u]}return this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Jt.fromBufferAttribute(t,e),Jt.normalize(),t.setXYZ(e,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,m=0;for(let x=0,y=l.length;x<y;x++){p=l[x]*h;for(let g=0;g<h;g++)d[m++]=c[p++]}return new jt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Rt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new Rt().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}Rt.prototype.isBufferGeometry=!0;const _o=new ht,Mn=new Hn,Gr=new Un,We=new w,Xe=new w,qe=new w,Vr=new w,kr=new w,Wr=new w,Ci=new w,Ri=new w,Pi=new w,Ii=new q,Di=new q,Ni=new q,Xr=new w,Fi=new w;class ae extends Ct{constructor(t=new Rt,e=new cr){super(),this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}else{const e=t.morphTargets;e!==void 0&&e.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(s),t.ray.intersectsSphere(Gr)===!1)||(_o.copy(s).invert(),Mn.copy(t.ray).applyMatrix4(_o),n.boundingBox!==null&&Mn.intersectsBox(n.boundingBox)===!1))return;let o;if(n.isBufferGeometry){const a=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,u=n.attributes.uv,d=n.attributes.uv2,p=n.groups,m=n.drawRange;if(a!==null)if(Array.isArray(i))for(let x=0,y=p.length;x<y;x++){const g=p[x],f=i[g.materialIndex],S=Math.max(g.start,m.start),E=Math.min(g.start+g.count,m.start+m.count);for(let T=S,v=E;T<v;T+=3){const R=a.getX(T),I=a.getX(T+1),N=a.getX(T+2);o=Bi(this,f,t,Mn,l,c,h,u,d,R,I,N),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=g.materialIndex,e.push(o))}}else{const x=Math.max(0,m.start),y=Math.min(a.count,m.start+m.count);for(let g=x,f=y;g<f;g+=3){const S=a.getX(g),E=a.getX(g+1),T=a.getX(g+2);o=Bi(this,i,t,Mn,l,c,h,u,d,S,E,T),o&&(o.faceIndex=Math.floor(g/3),e.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let x=0,y=p.length;x<y;x++){const g=p[x],f=i[g.materialIndex],S=Math.max(g.start,m.start),E=Math.min(g.start+g.count,m.start+m.count);for(let T=S,v=E;T<v;T+=3){const R=T,I=T+1,N=T+2;o=Bi(this,f,t,Mn,l,c,h,u,d,R,I,N),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=g.materialIndex,e.push(o))}}else{const x=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let g=x,f=y;g<f;g+=3){const S=g,E=g+1,T=g+2;o=Bi(this,i,t,Mn,l,c,h,u,d,S,E,T),o&&(o.faceIndex=Math.floor(g/3),e.push(o))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}ae.prototype.isMesh=!0;function xh(r,t,e,n,i,s,o,a){let l;if(t.side===Qt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side!==xi,a),l===null)return null;Fi.copy(a),Fi.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Fi);return c<e.near||c>e.far?null:{distance:c,point:Fi.clone(),object:r}}function Bi(r,t,e,n,i,s,o,a,l,c,h,u){We.fromBufferAttribute(i,c),Xe.fromBufferAttribute(i,h),qe.fromBufferAttribute(i,u);const d=r.morphTargetInfluences;if(t.morphTargets&&s&&d){Ci.set(0,0,0),Ri.set(0,0,0),Pi.set(0,0,0);for(let m=0,x=s.length;m<x;m++){const y=d[m],g=s[m];y!==0&&(Vr.fromBufferAttribute(g,c),kr.fromBufferAttribute(g,h),Wr.fromBufferAttribute(g,u),o?(Ci.addScaledVector(Vr,y),Ri.addScaledVector(kr,y),Pi.addScaledVector(Wr,y)):(Ci.addScaledVector(Vr.sub(We),y),Ri.addScaledVector(kr.sub(Xe),y),Pi.addScaledVector(Wr.sub(qe),y)))}We.add(Ci),Xe.add(Ri),qe.add(Pi)}r.isSkinnedMesh&&t.skinning&&(r.boneTransform(c,We),r.boneTransform(h,Xe),r.boneTransform(u,qe));const p=xh(r,t,e,n,We,Xe,qe,Xr);if(p){a&&(Ii.fromBufferAttribute(a,c),Di.fromBufferAttribute(a,h),Ni.fromBufferAttribute(a,u),p.uv=Zt.getUV(Xr,We,Xe,qe,Ii,Di,Ni,new q)),l&&(Ii.fromBufferAttribute(l,c),Di.fromBufferAttribute(l,h),Ni.fromBufferAttribute(l,u),p.uv2=Zt.getUV(Xr,We,Xe,qe,Ii,Di,Ni,new q));const m={a:c,b:h,c:u,normal:new w,materialIndex:0};Zt.getNormal(We,Xe,qe,m.normal),p.face=m}return p}class hr extends Rt{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;m("z","y","x",-1,-1,n,e,t,o,s,0),m("z","y","x",1,-1,n,e,-t,o,s,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(h,3)),this.setAttribute("uv",new Ot(u,2));function m(x,y,g,f,S,E,T,v,R,I,N){const B=E/R,H=T/I,z=E/2,A=T/2,P=v/2,D=R+1,C=I+1;let X=0,Q=0;const Z=new w;for(let st=0;st<C;st++){const rt=st*H-A;for(let ut=0;ut<D;ut++){const xt=ut*B-z;Z[x]=xt*f,Z[y]=rt*S,Z[g]=P,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[y]=0,Z[g]=v>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(ut/R),u.push(1-st/I),X+=1}}for(let st=0;st<I;st++)for(let rt=0;rt<R;rt++){const ut=d+rt+D*st,xt=d+rt+D*(st+1),G=d+(rt+1)+D*(st+1),Bt=d+(rt+1)+D*st;l.push(ut,xt,Bt),l.push(xt,G,Bt),Q+=6}a.addGroup(p,Q,N),p+=Q,d+=X}}}function Nn(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ne(r){const t={};for(let e=0;e<r.length;e++){const n=Nn(r[e]);for(const i in n)t[i]=n[i]}return t}const vh={clone:Nn,merge:ne};var yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends $t{constructor(t){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=yh,this.fragmentShader=_h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&(t.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Nn(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.lights=t.lights,this.clipping=t.clipping,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}cn.prototype.isShaderMaterial=!0;class vs extends Ct{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){t===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),t=new w),this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}vs.prototype.isCamera=!0;class he extends vs{constructor(t=50,e=1,n=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}he.prototype.isPerspectiveCamera=!0;const wn=90,bn=1;class ys extends Ct{constructor(t,e,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new he(wn,bn,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new w(1,0,0)),this.add(i);const s=new he(wn,bn,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new w(-1,0,0)),this.add(s);const o=new he(wn,bn,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new w(0,1,0)),this.add(o);const a=new he(wn,bn,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new w(0,-1,0)),this.add(a);const l=new he(wn,bn,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new w(0,0,1)),this.add(l);const c=new he(wn,bn,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new w(0,0,-1)),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,h=t.xr.enabled,u=t.getRenderTarget();t.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=d,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(u),t.xr.enabled=h}}class ur extends ee{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:us,a=a!==void 0?a:an,super(t,e,n,i,s,o,a,l,c,h),this._needsFlipEnvMap=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}ur.prototype.isCubeTexture=!0;class Ea extends ln{constructor(t,e,n){Number.isInteger(e)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),e=n),super(t,t,e),e=e||{},this.texture=new ur(void 0,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:pe,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.format=be,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new hr(5,5,5),s=new cn({name:"CubemapFromEquirect",uniforms:Nn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:ii});s.uniforms.tEquirect.value=e;const o=new ae(i,s),a=e.minFilter;return e.minFilter===ms&&(e.minFilter=pe),new ys(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}Ea.prototype.isWebGLCubeRenderTarget=!0;class Ta extends ee{constructor(t,e,n,i,s,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,s,u,d),this.image={data:t||null,width:e||1,height:n||1},this.magFilter=c!==void 0?c:oe,this.minFilter=h!==void 0?h:oe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}Ta.prototype.isDataTexture=!0;const Sn=new Un,zi=new w;class dr{constructor(t=new Te,e=new Te,n=new Te,i=new Te,s=new Te,o=new Te){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],p=n[9],m=n[10],x=n[11],y=n[12],g=n[13],f=n[14],S=n[15];return e[0].setComponents(a-i,u-l,x-d,S-y).normalize(),e[1].setComponents(a+i,u+l,x+d,S+y).normalize(),e[2].setComponents(a+s,u+c,x+p,S+g).normalize(),e[3].setComponents(a-s,u-c,x-p,S-g).normalize(),e[4].setComponents(a-o,u-h,x-m,S-f).normalize(),e[5].setComponents(a+o,u+h,x+m,S+f).normalize(),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),Sn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Sn)}intersectsSprite(t){return Sn.center.set(0,0,0),Sn.radius=.7071067811865476,Sn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Sn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(zi.x=i.normal.x>0?t.max.x:t.min.x,zi.y=i.normal.y>0?t.max.y:t.min.y,zi.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(zi)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Aa(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Mh(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,p=r.createBuffer();r.bindBuffer(h,p),r.bufferData(h,u,d),c.onUploadCallback();let m=5126;return u instanceof Float32Array?m=5126:u instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):u instanceof Uint16Array?c.isFloat16BufferAttribute?e?m=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):m=5123:u instanceof Int16Array?m=5122:u instanceof Uint32Array?m=5125:u instanceof Int32Array?m=5124:u instanceof Int8Array?m=5120:u instanceof Uint8Array&&(m=5121),{buffer:p,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,p=h.updateRange;r.bindBuffer(u,c),p.count===-1?r.bufferSubData(u,0,d):(e?r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class wh extends Rt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,p=[],m=[],x=[],y=[];for(let g=0;g<h;g++){const f=g*d-o;for(let S=0;S<c;S++){const E=S*u-s;m.push(E,-f,0),x.push(0,0,1),y.push(S/a),y.push(1-g/l)}}for(let g=0;g<l;g++)for(let f=0;f<a;f++){const S=f+c*g,E=f+c*(g+1),T=f+1+c*(g+1),v=f+1+c*g;p.push(S,E,v),p.push(E,T,v)}this.setIndex(p),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(x,3)),this.setAttribute("uv",new Ot(y,2))}}var bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Sh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eh=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,Th=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,Ah=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lh="vec3 transformed = vec3( position );",Ch=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rh=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,Ph=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Oh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Hh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Gh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vh=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Xh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zh=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,jh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tu=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,eu=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,nu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ru=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,su=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,ou=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,au=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,lu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,cu=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,hu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uu=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,du=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fu=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,pu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,mu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gu=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,vu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,yu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_u=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,wu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,bu=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,Su=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Eu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,Ru=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,Pu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,Iu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Du=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Nu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Fu=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Bu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,zu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Ou=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Uu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ku=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xu=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,qu=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yu=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Zu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ju=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ju=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,Qu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$u=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ku=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,td=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ed=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nd=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,id=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,rd=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,sd=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,od=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,ad=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,ld=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,cd=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,hd=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ud=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dd=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,fd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pd=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,xd=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_d=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ed=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Td=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ad=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ld=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cd=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pd=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Id=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dd=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nd=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fd=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,zd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Od=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ud=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Gd=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,kd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;const wt={alphamap_fragment:bh,alphamap_pars_fragment:Sh,alphatest_fragment:Eh,aomap_fragment:Th,aomap_pars_fragment:Ah,begin_vertex:Lh,beginnormal_vertex:Ch,bsdfs:Rh,bumpmap_pars_fragment:Ph,clipping_planes_fragment:Ih,clipping_planes_pars_fragment:Dh,clipping_planes_pars_vertex:Nh,clipping_planes_vertex:Fh,color_fragment:Bh,color_pars_fragment:zh,color_pars_vertex:Oh,color_vertex:Uh,common:Hh,cube_uv_reflection_fragment:Gh,defaultnormal_vertex:Vh,displacementmap_pars_vertex:kh,displacementmap_vertex:Wh,emissivemap_fragment:Xh,emissivemap_pars_fragment:qh,encodings_fragment:Yh,encodings_pars_fragment:Zh,envmap_fragment:jh,envmap_common_pars_fragment:Jh,envmap_pars_fragment:Qh,envmap_pars_vertex:$h,envmap_physical_pars_fragment:cu,envmap_vertex:Kh,fog_vertex:tu,fog_pars_vertex:eu,fog_fragment:nu,fog_pars_fragment:iu,gradientmap_pars_fragment:ru,lightmap_fragment:su,lightmap_pars_fragment:ou,lights_lambert_vertex:au,lights_pars_begin:lu,lights_toon_fragment:hu,lights_toon_pars_fragment:uu,lights_phong_fragment:du,lights_phong_pars_fragment:fu,lights_physical_fragment:pu,lights_physical_pars_fragment:mu,lights_fragment_begin:gu,lights_fragment_maps:xu,lights_fragment_end:vu,logdepthbuf_fragment:yu,logdepthbuf_pars_fragment:_u,logdepthbuf_pars_vertex:Mu,logdepthbuf_vertex:wu,map_fragment:bu,map_pars_fragment:Su,map_particle_fragment:Eu,map_particle_pars_fragment:Tu,metalnessmap_fragment:Au,metalnessmap_pars_fragment:Lu,morphnormal_vertex:Cu,morphtarget_pars_vertex:Ru,morphtarget_vertex:Pu,normal_fragment_begin:Iu,normal_fragment_maps:Du,normalmap_pars_fragment:Nu,clearcoat_normal_fragment_begin:Fu,clearcoat_normal_fragment_maps:Bu,clearcoat_pars_fragment:zu,packing:Ou,premultiplied_alpha_fragment:Uu,project_vertex:Hu,dithering_fragment:Gu,dithering_pars_fragment:Vu,roughnessmap_fragment:ku,roughnessmap_pars_fragment:Wu,shadowmap_pars_fragment:Xu,shadowmap_pars_vertex:qu,shadowmap_vertex:Yu,shadowmask_pars_fragment:Zu,skinbase_vertex:ju,skinning_pars_vertex:Ju,skinning_vertex:Qu,skinnormal_vertex:$u,specularmap_fragment:Ku,specularmap_pars_fragment:td,tonemapping_fragment:ed,tonemapping_pars_fragment:nd,transmissionmap_fragment:id,transmissionmap_pars_fragment:rd,uv_pars_fragment:sd,uv_pars_vertex:od,uv_vertex:ad,uv2_pars_fragment:ld,uv2_pars_vertex:cd,uv2_vertex:hd,worldpos_vertex:ud,background_frag:dd,background_vert:fd,cube_frag:pd,cube_vert:md,depth_frag:gd,depth_vert:xd,distanceRGBA_frag:vd,distanceRGBA_vert:yd,equirect_frag:_d,equirect_vert:Md,linedashed_frag:wd,linedashed_vert:bd,meshbasic_frag:Sd,meshbasic_vert:Ed,meshlambert_frag:Td,meshlambert_vert:Ad,meshmatcap_frag:Ld,meshmatcap_vert:Cd,meshtoon_frag:Rd,meshtoon_vert:Pd,meshphong_frag:Id,meshphong_vert:Dd,meshphysical_frag:Nd,meshphysical_vert:Fd,normal_frag:Bd,normal_vert:zd,points_frag:Od,points_vert:Ud,shadow_frag:Hd,shadow_vert:Gd,sprite_frag:Vd,sprite_vert:kd},K={common:{diffuse:{value:new lt(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new te},uv2Transform:{value:new te},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new te}},sprite:{diffuse:{value:new lt(15658734)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new te}}},Ae={basic:{uniforms:ne([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:wt.meshbasic_vert,fragmentShader:wt.meshbasic_frag},lambert:{uniforms:ne([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.fog,K.lights,{emissive:{value:new lt(0)}}]),vertexShader:wt.meshlambert_vert,fragmentShader:wt.meshlambert_frag},phong:{uniforms:ne([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:wt.meshphong_vert,fragmentShader:wt.meshphong_frag},standard:{uniforms:ne([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag},toon:{uniforms:ne([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new lt(0)}}]),vertexShader:wt.meshtoon_vert,fragmentShader:wt.meshtoon_frag},matcap:{uniforms:ne([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:wt.meshmatcap_vert,fragmentShader:wt.meshmatcap_frag},points:{uniforms:ne([K.points,K.fog]),vertexShader:wt.points_vert,fragmentShader:wt.points_frag},dashed:{uniforms:ne([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:wt.linedashed_vert,fragmentShader:wt.linedashed_frag},depth:{uniforms:ne([K.common,K.displacementmap]),vertexShader:wt.depth_vert,fragmentShader:wt.depth_frag},normal:{uniforms:ne([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:wt.normal_vert,fragmentShader:wt.normal_frag},sprite:{uniforms:ne([K.sprite,K.fog]),vertexShader:wt.sprite_vert,fragmentShader:wt.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null}},vertexShader:wt.background_vert,fragmentShader:wt.background_frag},cube:{uniforms:ne([K.envmap,{opacity:{value:1}}]),vertexShader:wt.cube_vert,fragmentShader:wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:wt.equirect_vert,fragmentShader:wt.equirect_frag},distanceRGBA:{uniforms:ne([K.common,K.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:wt.distanceRGBA_vert,fragmentShader:wt.distanceRGBA_frag},shadow:{uniforms:ne([K.lights,K.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:wt.shadow_vert,fragmentShader:wt.shadow_frag}};Ae.physical={uniforms:ne([Ae.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new q(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new lt(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag};function Wd(r,t,e,n,i){const s=new lt(0);let o=0,a,l,c=null,h=0,u=null;function d(m,x,y,g){let f=x.isScene===!0?x.background:null;f&&f.isTexture&&(f=t.get(f));const S=r.xr,E=S.getSession&&S.getSession();E&&E.environmentBlendMode==="additive"&&(f=null),f===null?p(s,o):f&&f.isColor&&(p(f,1),g=!0),(r.autoClear||g)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),f&&(f.isCubeTexture||f.mapping===fs)?(l===void 0&&(l=new ae(new hr(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Nn(Ae.cube.uniforms),vertexShader:Ae.cube.vertexShader,fragmentShader:Ae.cube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,v,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=f,l.material.uniforms.flipEnvMap.value=f.isCubeTexture&&f._needsFlipEnvMap?-1:1,(c!==f||h!==f.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,c=f,h=f.version,u=r.toneMapping),m.unshift(l,l.geometry,l.material,0,0,null)):f&&f.isTexture&&(a===void 0&&(a=new ae(new wh(2,2),new cn({name:"BackgroundMaterial",uniforms:Nn(Ae.background.uniforms),vertexShader:Ae.background.vertexShader,fragmentShader:Ae.background.fragmentShader,side:ar,depthTest:!1,depthWrite:!1,fog:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(a)),a.material.uniforms.t2D.value=f,f.matrixAutoUpdate===!0&&f.updateMatrix(),a.material.uniforms.uvTransform.value.copy(f.matrix),(c!==f||h!==f.version||u!==r.toneMapping)&&(a.material.needsUpdate=!0,c=f,h=f.version,u=r.toneMapping),m.unshift(a,a.geometry,a.material,0,0,null))}function p(m,x){e.buffers.color.setClear(m.r,m.g,m.b,x,i)}return{getClearColor:function(){return s},setClearColor:function(m,x=1){s.set(m),o=x,p(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,p(s,o)},render:d}}function Xd(r,t,e,n){const i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=x(null);let c=l;function h(A,P,D,C,X){let Q=!1;if(o){const Z=m(C,D,P);c!==Z&&(c=Z,d(c.object)),Q=y(C,X),Q&&g(C,X)}else{const Z=P.wireframe===!0;(c.geometry!==C.id||c.program!==D.id||c.wireframe!==Z)&&(c.geometry=C.id,c.program=D.id,c.wireframe=Z,Q=!0)}A.isInstancedMesh===!0&&(Q=!0),X!==null&&e.update(X,34963),Q&&(R(A,P,D,C),X!==null&&r.bindBuffer(34963,e.get(X).buffer))}function u(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(A){return n.isWebGL2?r.bindVertexArray(A):s.bindVertexArrayOES(A)}function p(A){return n.isWebGL2?r.deleteVertexArray(A):s.deleteVertexArrayOES(A)}function m(A,P,D){const C=D.wireframe===!0;let X=a[A.id];X===void 0&&(X={},a[A.id]=X);let Q=X[P.id];Q===void 0&&(Q={},X[P.id]=Q);let Z=Q[C];return Z===void 0&&(Z=x(u()),Q[C]=Z),Z}function x(A){const P=[],D=[],C=[];for(let X=0;X<i;X++)P[X]=0,D[X]=0,C[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:C,object:A,attributes:{},index:null}}function y(A,P){const D=c.attributes,C=A.attributes;let X=0;for(const Q in C){const Z=D[Q],st=C[Q];if(Z===void 0||Z.attribute!==st||Z.data!==st.data)return!0;X++}return c.attributesNum!==X||c.index!==P}function g(A,P){const D={},C=A.attributes;let X=0;for(const Q in C){const Z=C[Q],st={};st.attribute=Z,Z.data&&(st.data=Z.data),D[Q]=st,X++}c.attributes=D,c.attributesNum=X,c.index=P}function f(){const A=c.newAttributes;for(let P=0,D=A.length;P<D;P++)A[P]=0}function S(A){E(A,0)}function E(A,P){const D=c.newAttributes,C=c.enabledAttributes,X=c.attributeDivisors;D[A]=1,C[A]===0&&(r.enableVertexAttribArray(A),C[A]=1),X[A]!==P&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](A,P),X[A]=P)}function T(){const A=c.newAttributes,P=c.enabledAttributes;for(let D=0,C=P.length;D<C;D++)P[D]!==A[D]&&(r.disableVertexAttribArray(D),P[D]=0)}function v(A,P,D,C,X,Q){n.isWebGL2===!0&&(D===5124||D===5125)?r.vertexAttribIPointer(A,P,D,X,Q):r.vertexAttribPointer(A,P,D,C,X,Q)}function R(A,P,D,C){if(n.isWebGL2===!1&&(A.isInstancedMesh||C.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;f();const X=C.attributes,Q=D.getAttributes(),Z=P.defaultAttributeValues;for(const st in Q){const rt=Q[st];if(rt>=0){const ut=X[st];if(ut!==void 0){const xt=ut.normalized,G=ut.itemSize,Bt=e.get(ut);if(Bt===void 0)continue;const St=Bt.buffer,vt=Bt.type,dt=Bt.bytesPerElement;if(ut.isInterleavedBufferAttribute){const Tt=ut.data,Mt=Tt.stride,bt=ut.offset;Tt&&Tt.isInstancedInterleavedBuffer?(E(rt,Tt.meshPerAttribute),C._maxInstanceCount===void 0&&(C._maxInstanceCount=Tt.meshPerAttribute*Tt.count)):S(rt),r.bindBuffer(34962,St),v(rt,G,vt,xt,Mt*dt,bt*dt)}else ut.isInstancedBufferAttribute?(E(rt,ut.meshPerAttribute),C._maxInstanceCount===void 0&&(C._maxInstanceCount=ut.meshPerAttribute*ut.count)):S(rt),r.bindBuffer(34962,St),v(rt,G,vt,xt,0,0)}else if(st==="instanceMatrix"){const xt=e.get(A.instanceMatrix);if(xt===void 0)continue;const G=xt.buffer,Bt=xt.type;E(rt+0,1),E(rt+1,1),E(rt+2,1),E(rt+3,1),r.bindBuffer(34962,G),r.vertexAttribPointer(rt+0,4,Bt,!1,64,0),r.vertexAttribPointer(rt+1,4,Bt,!1,64,16),r.vertexAttribPointer(rt+2,4,Bt,!1,64,32),r.vertexAttribPointer(rt+3,4,Bt,!1,64,48)}else if(st==="instanceColor"){const xt=e.get(A.instanceColor);if(xt===void 0)continue;const G=xt.buffer,Bt=xt.type;E(rt,1),r.bindBuffer(34962,G),r.vertexAttribPointer(rt,3,Bt,!1,12,0)}else if(Z!==void 0){const xt=Z[st];if(xt!==void 0)switch(xt.length){case 2:r.vertexAttrib2fv(rt,xt);break;case 3:r.vertexAttrib3fv(rt,xt);break;case 4:r.vertexAttrib4fv(rt,xt);break;default:r.vertexAttrib1fv(rt,xt)}}}}T()}function I(){H();for(const A in a){const P=a[A];for(const D in P){const C=P[D];for(const X in C)p(C[X].object),delete C[X];delete P[D]}delete a[A]}}function N(A){if(a[A.id]===void 0)return;const P=a[A.id];for(const D in P){const C=P[D];for(const X in C)p(C[X].object),delete C[X];delete P[D]}delete a[A.id]}function B(A){for(const P in a){const D=a[P];if(D[A.id]===void 0)continue;const C=D[A.id];for(const X in C)p(C[X].object),delete C[X];delete D[A.id]}}function H(){z(),c!==l&&(c=l,d(c.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:H,resetDefaultState:z,dispose:I,releaseStatesOfGeometry:N,releaseStatesOfProgram:B,initAttributes:f,enableAttribute:S,disableUnusedAttributes:T}}function qd(r,t,e,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),e.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,p;if(i)d=r,p="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,c,h,u),e.update(h,s,u)}this.setMode=o,this.render=a,this.renderInstances=l}function Yd(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const v=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(v){if(v==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";v="mediump"}return v==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext;let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=e.logarithmicDepthBuffer===!0,h=r.getParameter(34930),u=r.getParameter(35660),d=r.getParameter(3379),p=r.getParameter(34076),m=r.getParameter(34921),x=r.getParameter(36347),y=r.getParameter(36348),g=r.getParameter(36349),f=u>0,S=o||t.has("OES_texture_float"),E=f&&S,T=o?r.getParameter(36183):0;return{isWebGL2:o,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:d,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:f,floatFragmentTextures:S,floatVertexTextures:E,maxSamples:T}}function Zd(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Te,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d,p){const m=u.length!==0||d||n!==0||i;return i=d,e=h(u,p,0),n=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1,c()},this.setState=function(u,d,p){const m=u.clippingPlanes,x=u.clipIntersection,y=u.clipShadows,g=r.get(u);if(!i||m===null||m.length===0||s&&!y)s?h(null):c();else{const f=s?0:n,S=f*4;let E=g.clippingState||null;l.value=E,E=h(m,d,S,p);for(let T=0;T!==S;++T)E[T]=e[T];g.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=f}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,m){const x=u!==null?u.length:0;let y=null;if(x!==0){if(y=l.value,m!==!0||y===null){const g=p+x*4,f=d.matrixWorldInverse;a.getNormalMatrix(f),(y===null||y.length<g)&&(y=new Float32Array(g));for(let S=0,E=p;S!==x;++S,E+=4)o.copy(u[S]).applyMatrix4(f,a),o.normal.toArray(y,E),y[E+3]=o.constant}l.value=y,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,y}}function jd(r){let t=new WeakMap;function e(o,a){return a===Ys?o.mapping=us:a===Zs&&(o.mapping=ds),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ys||a===Zs)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=r.getRenderTarget(),h=new Ea(l.height/2);return h.fromEquirectangularTexture(r,o),t.set(o,h),r.setRenderTarget(c),o.addEventListener("dispose",i),e(h.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}function Jd(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Qd(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)t.update(d[m],34962);const p=u.morphAttributes;for(const m in p){const x=p[m];for(let y=0,g=x.length;y<g;y++)t.update(x[y],34962)}}function c(u){const d=[],p=u.index,m=u.attributes.position;let x=0;if(p!==null){const f=p.array;x=p.version;for(let S=0,E=f.length;S<E;S+=3){const T=f[S+0],v=f[S+1],R=f[S+2];d.push(T,v,v,R,R,T)}}else{const f=m.array;x=m.version;for(let S=0,E=f.length/3-1;S<E;S+=3){const T=S+0,v=S+1,R=S+2;d.push(T,v,v,R,R,T)}}const y=new(Sa(d)>65535?ba:wa)(d,1);y.version=x;const g=s.get(u);g&&t.remove(g),s.set(u,y)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function $d(r,t,e,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,p){r.drawElements(s,p,a,d*l),e.update(p,s,1)}function u(d,p,m){if(m===0)return;let x,y;if(i)x=r,y="drawElementsInstanced";else if(x=t.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[y](s,p,a,d*l,m),e.update(p,s,m)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function Kd(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case 4:e.triangles+=a*(s/3);break;case 1:e.lines+=a*(s/2);break;case 3:e.lines+=a*(s-1);break;case 2:e.lines+=a*s;break;case 0:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tf(r,t){return r[0]-t[0]}function ef(r,t){return Math.abs(t[1])-Math.abs(r[1])}function nf(r){const t={},e=new Float32Array(8),n=[];for(let s=0;s<8;s++)n[s]=[s,0];function i(s,o,a,l){const c=s.morphTargetInfluences,h=c===void 0?0:c.length;let u=t[o.id];if(u===void 0){u=[];for(let y=0;y<h;y++)u[y]=[y,0];t[o.id]=u}for(let y=0;y<h;y++){const g=u[y];g[0]=y,g[1]=c[y]}u.sort(ef);for(let y=0;y<8;y++)y<h&&u[y][1]?(n[y][0]=u[y][0],n[y][1]=u[y][1]):(n[y][0]=Number.MAX_SAFE_INTEGER,n[y][1]=0);n.sort(tf);const d=a.morphTargets&&o.morphAttributes.position,p=a.morphNormals&&o.morphAttributes.normal;let m=0;for(let y=0;y<8;y++){const g=n[y],f=g[0],S=g[1];f!==Number.MAX_SAFE_INTEGER&&S?(d&&o.getAttribute("morphTarget"+y)!==d[f]&&o.setAttribute("morphTarget"+y,d[f]),p&&o.getAttribute("morphNormal"+y)!==p[f]&&o.setAttribute("morphNormal"+y,p[f]),e[y]=S,m+=S):(d&&o.hasAttribute("morphTarget"+y)===!0&&o.deleteAttribute("morphTarget"+y),p&&o.hasAttribute("morphNormal"+y)===!0&&o.deleteAttribute("morphNormal"+y),e[y]=0)}const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",e)}return{update:i}}function rf(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);return i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class La extends ee{constructor(t=null,e=1,n=1,i=1){super(null),this.image={data:t,width:e,height:n,depth:i},this.magFilter=oe,this.minFilter=oe,this.wrapR=we,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}La.prototype.isDataTexture2DArray=!0;class Ca extends ee{constructor(t=null,e=1,n=1,i=1){super(null),this.image={data:t,width:e,height:n,depth:i},this.magFilter=oe,this.minFilter=oe,this.wrapR=we,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}Ca.prototype.isDataTexture3D=!0;const Ra=new ee,sf=new La,of=new Ca,Pa=new ur,Mo=[],wo=[],bo=new Float32Array(16),So=new Float32Array(9),Eo=new Float32Array(4);function Vn(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Mo[i];if(s===void 0&&(s=new Float32Array(i),Mo[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function le(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function re(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ia(r,t){let e=wo[t];e===void 0&&(e=new Int32Array(t),wo[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function af(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function lf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(le(e,t))return;r.uniform2fv(this.addr,t),re(e,t)}}function cf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(le(e,t))return;r.uniform3fv(this.addr,t),re(e,t)}}function hf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(le(e,t))return;r.uniform4fv(this.addr,t),re(e,t)}}function uf(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(le(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),re(e,t)}else{if(le(e,n))return;Eo.set(n),r.uniformMatrix2fv(this.addr,!1,Eo),re(e,n)}}function df(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(le(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),re(e,t)}else{if(le(e,n))return;So.set(n),r.uniformMatrix3fv(this.addr,!1,So),re(e,n)}}function ff(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(le(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),re(e,t)}else{if(le(e,n))return;bo.set(n),r.uniformMatrix4fv(this.addr,!1,bo),re(e,n)}}function pf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function mf(r,t){const e=this.cache;le(e,t)||(r.uniform2iv(this.addr,t),re(e,t))}function gf(r,t){const e=this.cache;le(e,t)||(r.uniform3iv(this.addr,t),re(e,t))}function xf(r,t){const e=this.cache;le(e,t)||(r.uniform4iv(this.addr,t),re(e,t))}function vf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function yf(r,t){const e=this.cache;le(e,t)||(r.uniform2uiv(this.addr,t),re(e,t))}function _f(r,t){const e=this.cache;le(e,t)||(r.uniform3uiv(this.addr,t),re(e,t))}function Mf(r,t){const e=this.cache;le(e,t)||(r.uniform4uiv(this.addr,t),re(e,t))}function wf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.safeSetTexture2D(t||Ra,i)}function bf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||of,i)}function Sf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.safeSetTextureCube(t||Pa,i)}function Ef(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||sf,i)}function Tf(r){switch(r){case 5126:return af;case 35664:return lf;case 35665:return cf;case 35666:return hf;case 35674:return uf;case 35675:return df;case 35676:return ff;case 5124:case 35670:return pf;case 35667:case 35671:return mf;case 35668:case 35672:return gf;case 35669:case 35673:return xf;case 5125:return vf;case 36294:return yf;case 36295:return _f;case 36296:return Mf;case 35678:case 36198:case 36298:case 36306:case 35682:return wf;case 35679:case 36299:case 36307:return bf;case 35680:case 36300:case 36308:case 36293:return Sf;case 36289:case 36303:case 36311:case 36292:return Ef}}function Af(r,t){r.uniform1fv(this.addr,t)}function Lf(r,t){const e=Vn(t,this.size,2);r.uniform2fv(this.addr,e)}function Cf(r,t){const e=Vn(t,this.size,3);r.uniform3fv(this.addr,e)}function Rf(r,t){const e=Vn(t,this.size,4);r.uniform4fv(this.addr,e)}function Pf(r,t){const e=Vn(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function If(r,t){const e=Vn(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Df(r,t){const e=Vn(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Nf(r,t){r.uniform1iv(this.addr,t)}function Ff(r,t){r.uniform2iv(this.addr,t)}function Bf(r,t){r.uniform3iv(this.addr,t)}function zf(r,t){r.uniform4iv(this.addr,t)}function Of(r,t){r.uniform1uiv(this.addr,t)}function Uf(r,t){r.uniform2uiv(this.addr,t)}function Hf(r,t){r.uniform3uiv(this.addr,t)}function Gf(r,t){r.uniform4uiv(this.addr,t)}function Vf(r,t,e){const n=t.length,i=Ia(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.safeSetTexture2D(t[s]||Ra,i[s])}function kf(r,t,e){const n=t.length,i=Ia(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.safeSetTextureCube(t[s]||Pa,i[s])}function Wf(r){switch(r){case 5126:return Af;case 35664:return Lf;case 35665:return Cf;case 35666:return Rf;case 35674:return Pf;case 35675:return If;case 35676:return Df;case 5124:case 35670:return Nf;case 35667:case 35671:return Ff;case 35668:case 35672:return Bf;case 35669:case 35673:return zf;case 5125:return Of;case 36294:return Uf;case 36295:return Hf;case 36296:return Gf;case 35678:case 36198:case 36298:case 36306:case 35682:return Vf;case 35680:case 36300:case 36308:case 36293:return kf}}function Xf(r,t,e){this.id=r,this.addr=e,this.cache=[],this.setValue=Tf(t.type)}function Da(r,t,e){this.id=r,this.addr=e,this.cache=[],this.size=t.size,this.setValue=Wf(t.type)}Da.prototype.updateCache=function(r){const t=this.cache;r instanceof Float32Array&&t.length!==r.length&&(this.cache=new Float32Array(r.length)),re(t,r)};function Na(r){this.id=r,this.seq=[],this.map={}}Na.prototype.setValue=function(r,t,e){const n=this.seq;for(let i=0,s=n.length;i!==s;++i){const o=n[i];o.setValue(r,t[o.id],e)}};const qr=/(\w+)(\])?(\[|\.)?/g;function To(r,t){r.seq.push(t),r.map[t.id]=t}function qf(r,t,e){const n=r.name,i=n.length;for(qr.lastIndex=0;;){const s=qr.exec(n),o=qr.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){To(e,c===void 0?new Xf(a,r,t):new Da(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Na(a),To(e,u)),e=u}}}function je(r,t){this.seq=[],this.map={};const e=r.getProgramParameter(t,35718);for(let n=0;n<e;++n){const i=r.getActiveUniform(t,n),s=r.getUniformLocation(t,i.name);qf(i,s,this)}}je.prototype.setValue=function(r,t,e,n){const i=this.map[t];i!==void 0&&i.setValue(r,e,n)};je.prototype.setOptional=function(r,t,e){const n=t[e];n!==void 0&&this.setValue(r,e,n)};je.upload=function(r,t,e,n){for(let i=0,s=t.length;i!==s;++i){const o=t[i],a=e[o.id];a.needsUpdate!==!1&&o.setValue(r,a.value,n)}};je.seqWithValue=function(r,t){const e=[];for(let n=0,i=r.length;n!==i;++n){const s=r[n];s.id in t&&e.push(s)}return e};function Ao(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}let Yf=0;function Zf(r){const t=r.split(`
`);for(let e=0;e<t.length;e++)t[e]=e+1+": "+t[e];return t.join(`
`)}function Fa(r){switch(r){case vi:return["Linear","( value )"];case _a:return["sRGB","( value )"];case Wc:return["RGBE","( value )"];case qc:return["RGBM","( value, 7.0 )"];case Yc:return["RGBM","( value, 16.0 )"];case Zc:return["RGBD","( value, 256.0 )"];case kc:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case Xc:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Lo(r,t,e){const n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=r.getShaderSource(t);return"THREE.WebGLShader: gl.getShaderInfoLog() "+e+`
`+i+Zf(s)}function jn(r,t){const e=Fa(t);return"vec4 "+r+"( vec4 value ) { return "+e[0]+"ToLinear"+e[1]+"; }"}function jf(r,t){const e=Fa(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Jf(r,t){let e;switch(t){case kl:e="Linear";break;case Wl:e="Reinhard";break;case Xl:e="OptimizedCineon";break;case xa:e="ACESFilmic";break;case ql:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Qf(r){return[r.extensionDerivatives||r.envMapCubeUV||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ni).join(`
`)}function $f(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kf(r,t){const e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){const o=r.getActiveAttrib(t,i).name;e[o]=r.getAttribLocation(t,o)}return e}function ni(r){return r!==""}function Co(r,t){return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ro(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ss(r){return r.replace(tp,ep)}function ep(r,t){const e=wt[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return ss(e)}const np=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,ip=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Po(r){return r.replace(ip,Ba).replace(np,rp)}function rp(r,t,e,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Ba(r,t,e,n)}function Ba(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Io(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sp(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===da?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===fa?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ei&&(t="SHADOWMAP_TYPE_VSM"),t}function op(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case us:case ds:t="ENVMAP_TYPE_CUBE";break;case fs:case ps:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ap(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ds:case ps:t="ENVMAP_MODE_REFRACTION";break}return t}function lp(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case lr:t="ENVMAP_BLENDING_MULTIPLY";break;case Gl:t="ENVMAP_BLENDING_MIX";break;case Vl:t="ENVMAP_BLENDING_ADD";break}return t}function cp(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=sp(e),c=op(e),h=ap(e),u=lp(e),d=r.gammaFactor>0?r.gammaFactor:1,p=e.isWebGL2?"":Qf(e),m=$f(s),x=i.createProgram();let y,g,f=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=[m].filter(ni).join(`
`),y.length>0&&(y+=`
`),g=[p,m].filter(ni).join(`
`),g.length>0&&(g+=`
`)):(y=[Io(e),"#define SHADER_NAME "+e.shaderName,m,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+d,"#define MAX_BONES "+e.maxBones,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.useVertexTexture?"#define BONE_TEXTURE":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ni).join(`
`),g=[p,Io(e),"#define SHADER_NAME "+e.shaderName,m,e.alphaTest?"#define ALPHATEST "+e.alphaTest+(e.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.sheen?"#define USE_SHEEN":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(e.extensionShaderTextureLOD||e.envMap)&&e.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?wt.tonemapping_pars_fragment:"",e.toneMapping!==si?Jf("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",wt.encodings_pars_fragment,e.map?jn("mapTexelToLinear",e.mapEncoding):"",e.matcap?jn("matcapTexelToLinear",e.matcapEncoding):"",e.envMap?jn("envMapTexelToLinear",e.envMapEncoding):"",e.emissiveMap?jn("emissiveMapTexelToLinear",e.emissiveMapEncoding):"",e.lightMap?jn("lightMapTexelToLinear",e.lightMapEncoding):"",jf("linearToOutputTexel",e.outputEncoding),e.depthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ni).join(`
`)),o=ss(o),o=Co(o,e),o=Ro(o,e),a=ss(a),a=Co(a,e),a=Ro(a,e),o=Po(o),a=Po(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,y=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",e.glslVersion===ao?"":"out highp vec4 pc_fragColor;",e.glslVersion===ao?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=f+y+o,E=f+g+a,T=Ao(i,35633,S),v=Ao(i,35632,E);if(i.attachShader(x,T),i.attachShader(x,v),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x),r.debug.checkShaderErrors){const N=i.getProgramInfoLog(x).trim(),B=i.getShaderInfoLog(T).trim(),H=i.getShaderInfoLog(v).trim();let z=!0,A=!0;if(i.getProgramParameter(x,35714)===!1){z=!1;const P=Lo(i,T,"vertex"),D=Lo(i,v,"fragment");console.error("THREE.WebGLProgram: shader error: ",i.getError(),"35715",i.getProgramParameter(x,35715),"gl.getProgramInfoLog",N,P,D)}else N!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",N):(B===""||H==="")&&(A=!1);A&&(this.diagnostics={runnable:z,programLog:N,vertexShader:{log:B,prefix:y},fragmentShader:{log:H,prefix:g}})}i.deleteShader(T),i.deleteShader(v);let R;this.getUniforms=function(){return R===void 0&&(R=new je(i,x)),R};let I;return this.getAttributes=function(){return I===void 0&&(I=Kf(i,x)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.name=e.shaderName,this.id=Yf++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=v,this}function hp(r,t,e,n,i,s){const o=[],a=n.isWebGL2,l=n.logarithmicDepthBuffer,c=n.floatVertexTextures,h=n.maxVertexUniforms,u=n.vertexTextures;let d=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},m=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function x(v){const I=v.skeleton.bones;if(c)return 1024;{const B=Math.floor((h-20)/4),H=Math.min(B,I.length);return H<I.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+I.length+" bones. This GPU supports "+H+"."),0):H}}function y(v){let R;return v&&v.isTexture?R=v.encoding:v&&v.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),R=v.texture.encoding):R=vi,R}function g(v,R,I,N,B){const H=N.fog,z=v.isMeshStandardMaterial?N.environment:null,A=t.get(v.envMap||z),P=p[v.type],D=B.isSkinnedMesh?x(B):0;v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let C,X;if(P){const st=Ae[P];C=st.vertexShader,X=st.fragmentShader}else C=v.vertexShader,X=v.fragmentShader;const Q=r.getRenderTarget();return{isWebGL2:a,shaderID:P,shaderName:v.type,vertexShader:C,fragmentShader:X,defines:v.defines,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,instancing:B.isInstancedMesh===!0,instancingColor:B.isInstancedMesh===!0&&B.instanceColor!==null,supportsVertexTextures:u,outputEncoding:Q!==null?y(Q.texture):r.outputEncoding,map:!!v.map,mapEncoding:y(v.map),matcap:!!v.matcap,matcapEncoding:y(v.matcap),envMap:!!A,envMapMode:A&&A.mapping,envMapEncoding:y(A),envMapCubeUV:!!A&&(A.mapping===fs||A.mapping===ps),lightMap:!!v.lightMap,lightMapEncoding:y(v.lightMap),aoMap:!!v.aoMap,emissiveMap:!!v.emissiveMap,emissiveMapEncoding:y(v.emissiveMap),bumpMap:!!v.bumpMap,normalMap:!!v.normalMap,objectSpaceNormalMap:v.normalMapType===Qc,tangentSpaceNormalMap:v.normalMapType===zn,clearcoatMap:!!v.clearcoatMap,clearcoatRoughnessMap:!!v.clearcoatRoughnessMap,clearcoatNormalMap:!!v.clearcoatNormalMap,displacementMap:!!v.displacementMap,roughnessMap:!!v.roughnessMap,metalnessMap:!!v.metalnessMap,specularMap:!!v.specularMap,alphaMap:!!v.alphaMap,gradientMap:!!v.gradientMap,sheen:!!v.sheen,transmissionMap:!!v.transmissionMap,combine:v.combine,vertexTangents:v.normalMap&&v.vertexTangents,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&B.geometry&&B.geometry.attributes.color&&B.geometry.attributes.color.itemSize===4,vertexUvs:!!v.map||!!v.bumpMap||!!v.normalMap||!!v.specularMap||!!v.alphaMap||!!v.emissiveMap||!!v.roughnessMap||!!v.metalnessMap||!!v.clearcoatMap||!!v.clearcoatRoughnessMap||!!v.clearcoatNormalMap||!!v.displacementMap||!!v.transmissionMap,uvsVertexOnly:!(v.map||v.bumpMap||v.normalMap||v.specularMap||v.alphaMap||v.emissiveMap||v.roughnessMap||v.metalnessMap||v.clearcoatNormalMap||v.transmissionMap)&&!!v.displacementMap,fog:!!H,useFog:v.fog,fogExp2:H&&H.isFogExp2,flatShading:!!v.flatShading,sizeAttenuation:v.sizeAttenuation,logarithmicDepthBuffer:l,skinning:v.skinning&&D>0,maxBones:D,useVertexTexture:c,morphTargets:v.morphTargets,morphNormals:v.morphNormals,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:v.toneMapped?r.toneMapping:si,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:v.premultipliedAlpha,alphaTest:v.alphaTest,doubleSided:v.side===xi,flipSided:v.side===Qt,depthPacking:v.depthPacking!==void 0?v.depthPacking:!1,index0AttributeName:v.index0AttributeName,extensionDerivatives:v.extensions&&v.extensions.derivatives,extensionFragDepth:v.extensions&&v.extensions.fragDepth,extensionDrawBuffers:v.extensions&&v.extensions.drawBuffers,extensionShaderTextureLOD:v.extensions&&v.extensions.shaderTextureLOD,rendererExtensionFragDepth:a||e.has("EXT_frag_depth"),rendererExtensionDrawBuffers:a||e.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:a||e.has("EXT_shader_texture_lod"),customProgramCacheKey:v.customProgramCacheKey()}}function f(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.fragmentShader),R.push(v.vertexShader)),v.defines!==void 0)for(const I in v.defines)R.push(I),R.push(v.defines[I]);if(v.isRawShaderMaterial===!1){for(let I=0;I<m.length;I++)R.push(v[m[I]]);R.push(r.outputEncoding),R.push(r.gammaFactor)}return R.push(v.customProgramCacheKey),R.join()}function S(v){const R=p[v.type];let I;if(R){const N=Ae[R];I=vh.clone(N.uniforms)}else I=v.uniforms;return I}function E(v,R){let I;for(let N=0,B=o.length;N<B;N++){const H=o[N];if(H.cacheKey===R){I=H,++I.usedTimes;break}}return I===void 0&&(I=new cp(r,R,v,i),o.push(I)),I}function T(v){if(--v.usedTimes===0){const R=o.indexOf(v);o[R]=o[o.length-1],o.pop(),v.destroy()}}return{getParameters:g,getProgramCacheKey:f,getUniforms:S,acquireProgram:E,releaseProgram:T,programs:o}}function up(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function dp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.program!==t.program?r.program.id-t.program.id:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function fp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Do(r){const t=[];let e=0;const n=[],i=[],s={id:-1};function o(){e=0,n.length=0,i.length=0}function a(d,p,m,x,y,g){let f=t[e];const S=r.get(m);return f===void 0?(f={id:d.id,object:d,geometry:p,material:m,program:S.program||s,groupOrder:x,renderOrder:d.renderOrder,z:y,group:g},t[e]=f):(f.id=d.id,f.object=d,f.geometry=p,f.material=m,f.program=S.program||s,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=y,f.group=g),e++,f}function l(d,p,m,x,y,g){const f=a(d,p,m,x,y,g);(m.transparent===!0?i:n).push(f)}function c(d,p,m,x,y,g){const f=a(d,p,m,x,y,g);(m.transparent===!0?i:n).unshift(f)}function h(d,p){n.length>1&&n.sort(d||dp),i.length>1&&i.sort(p||fp)}function u(){for(let d=e,p=t.length;d<p;d++){const m=t[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.program=null,m.group=null}}return{opaque:n,transparent:i,init:o,push:l,unshift:c,finish:u,sort:h}}function pp(r){let t=new WeakMap;function e(i,s){let o;return t.has(i)===!1?(o=new Do(r),t.set(i,[o])):s>=t.get(i).length?(o=new Do(r),t.get(i).push(o)):o=t.get(i)[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function mp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new lt};break;case"SpotLight":e={position:new w,direction:new w,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":e={color:new lt,position:new w,halfWidth:new w,halfHeight:new w};break}return r[t.id]=e,e}}}function gp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let xp=0;function vp(r,t){return(t.castShadow?1:0)-(r.castShadow?1:0)}function yp(r,t){const e=new mp,n=gp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let h=0;h<9;h++)i.probe.push(new w);const s=new w,o=new ht,a=new ht;function l(h){let u=0,d=0,p=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,x=0,y=0,g=0,f=0,S=0,E=0,T=0;h.sort(vp);for(let R=0,I=h.length;R<I;R++){const N=h[R],B=N.color,H=N.intensity,z=N.distance,A=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=B.r*H,d+=B.g*H,p+=B.b*H;else if(N.isLightProbe)for(let P=0;P<9;P++)i.probe[P].addScaledVector(N.sh.coefficients[P],H);else if(N.isDirectionalLight){const P=e.get(N);if(P.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const D=N.shadow,C=n.get(N);C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,i.directionalShadow[m]=C,i.directionalShadowMap[m]=A,i.directionalShadowMatrix[m]=N.shadow.matrix,S++}i.directional[m]=P,m++}else if(N.isSpotLight){const P=e.get(N);if(P.position.setFromMatrixPosition(N.matrixWorld),P.color.copy(B).multiplyScalar(H),P.distance=z,P.coneCos=Math.cos(N.angle),P.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),P.decay=N.decay,N.castShadow){const D=N.shadow,C=n.get(N);C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,i.spotShadow[y]=C,i.spotShadowMap[y]=A,i.spotShadowMatrix[y]=N.shadow.matrix,T++}i.spot[y]=P,y++}else if(N.isRectAreaLight){const P=e.get(N);P.color.copy(B).multiplyScalar(H),P.halfWidth.set(N.width*.5,0,0),P.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=P,g++}else if(N.isPointLight){const P=e.get(N);if(P.color.copy(N.color).multiplyScalar(N.intensity),P.distance=N.distance,P.decay=N.decay,N.castShadow){const D=N.shadow,C=n.get(N);C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,C.shadowCameraNear=D.camera.near,C.shadowCameraFar=D.camera.far,i.pointShadow[x]=C,i.pointShadowMap[x]=A,i.pointShadowMatrix[x]=N.shadow.matrix,E++}i.point[x]=P,x++}else if(N.isHemisphereLight){const P=e.get(N);P.skyColor.copy(N.color).multiplyScalar(H),P.groundColor.copy(N.groundColor).multiplyScalar(H),i.hemi[f]=P,f++}}g>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=K.LTC_FLOAT_1,i.rectAreaLTC2=K.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=K.LTC_HALF_1,i.rectAreaLTC2=K.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=p;const v=i.hash;(v.directionalLength!==m||v.pointLength!==x||v.spotLength!==y||v.rectAreaLength!==g||v.hemiLength!==f||v.numDirectionalShadows!==S||v.numPointShadows!==E||v.numSpotShadows!==T)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=g,i.point.length=x,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=E,i.spotShadowMatrix.length=T,v.directionalLength=m,v.pointLength=x,v.spotLength=y,v.rectAreaLength=g,v.hemiLength=f,v.numDirectionalShadows=S,v.numPointShadows=E,v.numSpotShadows=T,i.version=xp++)}function c(h,u){let d=0,p=0,m=0,x=0,y=0;const g=u.matrixWorldInverse;for(let f=0,S=h.length;f<S;f++){const E=h[f];if(E.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),d++}else if(E.isSpotLight){const T=i.spot[m];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),m++}else if(E.isRectAreaLight){const T=i.rectArea[x];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),a.identity(),o.copy(E.matrixWorld),o.premultiply(g),a.extractRotation(o),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){const T=i.point[p];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),p++}else if(E.isHemisphereLight){const T=i.hemi[y];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(g),T.direction.normalize(),y++}}}return{setup:l,setupView:c,state:i}}function No(r,t){const e=new yp(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(){e.setup(n)}function c(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function _p(r,t){let e=new WeakMap;function n(s,o=0){let a;return e.has(s)===!1?(a=new No(r,t),e.set(s,[a])):o>=e.get(s).length?(a=new No(r,t),e.get(s).push(a)):a=e.get(s)[o],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class za extends $t{constructor(t){super(),this.type="MeshDepthMaterial",this.depthPacking=jc,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}za.prototype.isMeshDepthMaterial=!0;class Oa extends $t{constructor(t){super(),this.type="MeshDistanceMaterial",this.referencePosition=new w,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}Oa.prototype.isMeshDistanceMaterial=!0;var Mp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,wp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function Ua(r,t,e){let n=new dr;const i=new q,s=new q,o=new Nt,a=[],l=[],c={},h=e.maxTextureSize,u={0:Qt,1:ar,2:xi},d=new cn({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:wp,fragmentShader:Mp}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Rt;m.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ae(m,d),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da,this.render=function(v,R,I){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||v.length===0)return;const N=r.getRenderTarget(),B=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),z=r.state;z.setBlending(ii),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);for(let A=0,P=v.length;A<P;A++){const D=v[A],C=D.shadow;if(C===void 0){console.warn("THREE.WebGLShadowMap:",D,"has no shadow.");continue}if(C.autoUpdate===!1&&C.needsUpdate===!1)continue;i.copy(C.mapSize);const X=C.getFrameExtents();if(i.multiply(X),s.copy(C.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,C.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,C.mapSize.y=s.y)),C.map===null&&!C.isPointLightShadow&&this.type===ei){const Z={minFilter:pe,magFilter:pe,format:be};C.map=new ln(i.x,i.y,Z),C.map.texture.name=D.name+".shadowMap",C.mapPass=new ln(i.x,i.y,Z),C.camera.updateProjectionMatrix()}if(C.map===null){const Z={minFilter:oe,magFilter:oe,format:be};C.map=new ln(i.x,i.y,Z),C.map.texture.name=D.name+".shadowMap",C.camera.updateProjectionMatrix()}r.setRenderTarget(C.map),r.clear();const Q=C.getViewportCount();for(let Z=0;Z<Q;Z++){const st=C.getViewport(Z);o.set(s.x*st.x,s.y*st.y,s.x*st.z,s.y*st.w),z.viewport(o),C.updateMatrices(D,Z),n=C.getFrustum(),T(R,I,C.camera,D,this.type)}!C.isPointLightShadow&&this.type===ei&&g(C,I),C.needsUpdate=!1}y.needsUpdate=!1,r.setRenderTarget(N,B,H)};function g(v,R){const I=t.update(x);d.uniforms.shadow_pass.value=v.map.texture,d.uniforms.resolution.value=v.mapSize,d.uniforms.radius.value=v.radius,r.setRenderTarget(v.mapPass),r.clear(),r.renderBufferDirect(R,null,I,d,x,null),p.uniforms.shadow_pass.value=v.mapPass.texture,p.uniforms.resolution.value=v.mapSize,p.uniforms.radius.value=v.radius,r.setRenderTarget(v.map),r.clear(),r.renderBufferDirect(R,null,I,p,x,null)}function f(v,R,I){const N=v<<0|R<<1|I<<2;let B=a[N];return B===void 0&&(B=new za({depthPacking:Jc,morphTargets:v,skinning:R}),a[N]=B),B}function S(v,R,I){const N=v<<0|R<<1|I<<2;let B=l[N];return B===void 0&&(B=new Oa({morphTargets:v,skinning:R}),l[N]=B),B}function E(v,R,I,N,B,H,z){let A=null,P=f,D=v.customDepthMaterial;if(N.isPointLight===!0&&(P=S,D=v.customDistanceMaterial),D===void 0){let C=!1;I.morphTargets===!0&&(C=R.morphAttributes&&R.morphAttributes.position&&R.morphAttributes.position.length>0);let X=!1;v.isSkinnedMesh===!0&&(I.skinning===!0?X=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",v));const Q=v.isInstancedMesh===!0;A=P(C,X,Q)}else A=D;if(r.localClippingEnabled&&I.clipShadows===!0&&I.clippingPlanes.length!==0){const C=A.uuid,X=I.uuid;let Q=c[C];Q===void 0&&(Q={},c[C]=Q);let Z=Q[X];Z===void 0&&(Z=A.clone(),Q[X]=Z),A=Z}return A.visible=I.visible,A.wireframe=I.wireframe,z===ei?A.side=I.shadowSide!==null?I.shadowSide:I.side:A.side=I.shadowSide!==null?I.shadowSide:u[I.side],A.clipShadows=I.clipShadows,A.clippingPlanes=I.clippingPlanes,A.clipIntersection=I.clipIntersection,A.wireframeLinewidth=I.wireframeLinewidth,A.linewidth=I.linewidth,N.isPointLight===!0&&A.isMeshDistanceMaterial===!0&&(A.referencePosition.setFromMatrixPosition(N.matrixWorld),A.nearDistance=B,A.farDistance=H),A}function T(v,R,I,N,B){if(v.visible===!1)return;if(v.layers.test(R.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&B===ei)&&(!v.frustumCulled||n.intersectsObject(v))){v.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,v.matrixWorld);const A=t.update(v),P=v.material;if(Array.isArray(P)){const D=A.groups;for(let C=0,X=D.length;C<X;C++){const Q=D[C],Z=P[Q.materialIndex];if(Z&&Z.visible){const st=E(v,A,Z,N,I.near,I.far,B);r.renderBufferDirect(I,null,A,st,v,Q)}}}else if(P.visible){const D=E(v,A,P,N,I.near,I.far,B);r.renderBufferDirect(I,null,A,D,v,null)}}const z=v.children;for(let A=0,P=z.length;A<P;A++)T(z[A],R,I,N,B)}}function bp(r,t,e){const n=e.isWebGL2;function i(){let L=!1;const j=new Nt;let $=null;const ct=new Nt(0,0,0,0);return{setMask:function(W){$!==W&&!L&&(r.colorMask(W,W,W,W),$=W)},setLocked:function(W){L=W},setClear:function(W,ft,Pt,Xt,tn){tn===!0&&(W*=Xt,ft*=Xt,Pt*=Xt),j.set(W,ft,Pt,Xt),ct.equals(j)===!1&&(r.clearColor(W,ft,Pt,Xt),ct.copy(j))},reset:function(){L=!1,$=null,ct.set(-1,0,0,0)}}}function s(){let L=!1,j=null,$=null,ct=null;return{setTest:function(W){W?ut(2929):xt(2929)},setMask:function(W){j!==W&&!L&&(r.depthMask(W),j=W)},setFunc:function(W){if($!==W){if(W)switch(W){case Nl:r.depthFunc(512);break;case Fl:r.depthFunc(519);break;case Bl:r.depthFunc(513);break;case ns:r.depthFunc(515);break;case zl:r.depthFunc(514);break;case Ol:r.depthFunc(518);break;case Ul:r.depthFunc(516);break;case Hl:r.depthFunc(517);break;default:r.depthFunc(515)}else r.depthFunc(515);$=W}},setLocked:function(W){L=W},setClear:function(W){ct!==W&&(r.clearDepth(W),ct=W)},reset:function(){L=!1,j=null,$=null,ct=null}}}function o(){let L=!1,j=null,$=null,ct=null,W=null,ft=null,Pt=null,Xt=null,tn=null;return{setTest:function(Vt){L||(Vt?ut(2960):xt(2960))},setMask:function(Vt){j!==Vt&&!L&&(r.stencilMask(Vt),j=Vt)},setFunc:function(Vt,De,xe){($!==Vt||ct!==De||W!==xe)&&(r.stencilFunc(Vt,De,xe),$=Vt,ct=De,W=xe)},setOp:function(Vt,De,xe){(ft!==Vt||Pt!==De||Xt!==xe)&&(r.stencilOp(Vt,De,xe),ft=Vt,Pt=De,Xt=xe)},setLocked:function(Vt){L=Vt},setClear:function(Vt){tn!==Vt&&(r.clearStencil(Vt),tn=Vt)},reset:function(){L=!1,j=null,$=null,ct=null,W=null,ft=null,Pt=null,Xt=null,tn=null}}}const a=new i,l=new s,c=new o;let h={},u=null,d={},p=null,m=!1,x=null,y=null,g=null,f=null,S=null,E=null,T=null,v=!1,R=null,I=null,N=null,B=null,H=null;const z=r.getParameter(35661);let A=!1,P=0;const D=r.getParameter(7938);D.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(D)[1]),A=P>=1):D.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),A=P>=2);let C=null,X={};const Q=new Nt(0,0,r.canvas.width,r.canvas.height),Z=new Nt(0,0,r.canvas.width,r.canvas.height);function st(L,j,$){const ct=new Uint8Array(4),W=r.createTexture();r.bindTexture(L,W),r.texParameteri(L,10241,9728),r.texParameteri(L,10240,9728);for(let ft=0;ft<$;ft++)r.texImage2D(j+ft,0,6408,1,1,0,6408,5121,ct);return W}const rt={};rt[3553]=st(3553,3553,1),rt[34067]=st(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ut(2929),l.setFunc(ns),bt(!1),Y(Vs),ut(2884),Tt(ii);function ut(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function xt(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function G(L){L!==u&&(r.bindFramebuffer(36160,L),u=L)}function Bt(L,j){j===null&&u!==null&&(j=u),d[L]!==j&&(r.bindFramebuffer(L,j),d[L]=j,n&&(L===36009&&(d[36160]=j),L===36160&&(d[36009]=j)))}function St(L){return p!==L?(r.useProgram(L),p=L,!0):!1}const vt={[Cn]:32774,[bl]:32778,[Sl]:32779};if(n)vt[Xs]=32775,vt[qs]=32776;else{const L=t.get("EXT_blend_minmax");L!==null&&(vt[Xs]=L.MIN_EXT,vt[qs]=L.MAX_EXT)}const dt={[El]:0,[Tl]:1,[Al]:768,[ma]:770,[Dl]:776,[Pl]:774,[Cl]:772,[Ll]:769,[ga]:771,[Il]:775,[Rl]:773};function Tt(L,j,$,ct,W,ft,Pt,Xt){if(L===ii){m===!0&&(xt(3042),m=!1);return}if(m===!1&&(ut(3042),m=!0),L!==wl){if(L!==x||Xt!==v){if((y!==Cn||S!==Cn)&&(r.blendEquation(32774),y=Cn,S=Cn),Xt)switch(L){case ri:r.blendFuncSeparate(1,771,1,771);break;case es:r.blendFunc(1,1);break;case ks:r.blendFuncSeparate(0,0,769,771);break;case Ws:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ri:r.blendFuncSeparate(770,771,1,771);break;case es:r.blendFunc(770,1);break;case ks:r.blendFunc(0,769);break;case Ws:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}g=null,f=null,E=null,T=null,x=L,v=Xt}return}W=W||j,ft=ft||$,Pt=Pt||ct,(j!==y||W!==S)&&(r.blendEquationSeparate(vt[j],vt[W]),y=j,S=W),($!==g||ct!==f||ft!==E||Pt!==T)&&(r.blendFuncSeparate(dt[$],dt[ct],dt[ft],dt[Pt]),g=$,f=ct,E=ft,T=Pt),x=L,v=null}function Mt(L,j){L.side===xi?xt(2884):ut(2884);let $=L.side===Qt;j&&($=!$),bt($),L.blending===ri&&L.transparent===!1?Tt(ii):Tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),a.setMask(L.colorWrite);const ct=L.stencilWrite;c.setTest(ct),ct&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),tt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ut(32926):xt(32926)}function bt(L){R!==L&&(L?r.frontFace(2304):r.frontFace(2305),R=L)}function Y(L){L!==_l?(ut(2884),L!==I&&(L===Vs?r.cullFace(1029):L===Ml?r.cullFace(1028):r.cullFace(1032))):xt(2884),I=L}function J(L){L!==N&&(A&&r.lineWidth(L),N=L)}function tt(L,j,$){L?(ut(32823),(B!==j||H!==$)&&(r.polygonOffset(j,$),B=j,H=$)):xt(32823)}function at(L){L?ut(3089):xt(3089)}function nt(L){L===void 0&&(L=33984+z-1),C!==L&&(r.activeTexture(L),C=L)}function b(L,j){C===null&&nt();let $=X[C];$===void 0&&($={type:void 0,texture:void 0},X[C]=$),($.type!==L||$.texture!==j)&&(r.bindTexture(L,j||rt[L]),$.type=L,$.texture=j)}function M(){const L=X[C];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function V(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function it(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(L){Q.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Q.copy(L))}function At(L){Z.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Z.copy(L))}function pt(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},C=null,X={},u=null,d={},p=null,m=!1,x=null,y=null,g=null,f=null,S=null,E=null,T=null,v=!1,R=null,I=null,N=null,B=null,H=null,Q.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ut,disable:xt,bindFramebuffer:Bt,bindXRFramebuffer:G,useProgram:St,setBlending:Tt,setMaterial:Mt,setFlipSided:bt,setCullFace:Y,setLineWidth:J,setPolygonOffset:tt,setScissorTest:at,activeTexture:nt,bindTexture:b,unbindTexture:M,compressedTexImage2D:V,texImage2D:k,texImage3D:it,scissor:ot,viewport:At,reset:pt}}function Sp(r,t,e,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=new WeakMap;let p,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,M){return m?new OffscreenCanvas(b,M):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function y(b,M,V,k){let it=1;if((b.width>k||b.height>k)&&(it=k/Math.max(b.width,b.height)),it<1||M===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ot=M?eh:Math.floor,At=ot(it*b.width),pt=ot(it*b.height);p===void 0&&(p=x(At,pt));const L=V?x(At,pt):p;return L.width=At,L.height=pt,L.getContext("2d").drawImage(b,0,0,At,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+At+"x"+pt+")."),L}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function g(b){return lo(b.width)&&lo(b.height)}function f(b){return a?!1:b.wrapS!==we||b.wrapT!==we||b.minFilter!==oe&&b.minFilter!==pe}function S(b,M){return b.generateMipmaps&&M&&b.minFilter!==oe&&b.minFilter!==pe}function E(b,M,V,k){r.generateMipmap(b);const it=n.get(M);it.__maxMipLevel=Math.log2(Math.max(V,k))}function T(b,M,V){if(a===!1)return M;if(b!==null){if(r[b]!==void 0)return r[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let k=M;return M===6403&&(V===5126&&(k=33326),V===5131&&(k=33325),V===5121&&(k=33321)),M===6407&&(V===5126&&(k=34837),V===5131&&(k=34843),V===5121&&(k=32849)),M===6408&&(V===5126&&(k=34836),V===5131&&(k=34842),V===5121&&(k=32856)),(k===33325||k===33326||k===34842||k===34836)&&t.get("EXT_color_buffer_float"),k}function v(b){return b===oe||b===js||b===Js?9728:9729}function R(b){const M=b.target;M.removeEventListener("dispose",R),N(M),M.isVideoTexture&&d.delete(M),o.memory.textures--}function I(b){const M=b.target;M.removeEventListener("dispose",I),B(M),o.memory.textures--}function N(b){const M=n.get(b);M.__webglInit!==void 0&&(r.deleteTexture(M.__webglTexture),n.remove(b))}function B(b){const M=b.texture,V=n.get(b),k=n.get(M);if(b){if(k.__webglTexture!==void 0&&r.deleteTexture(k.__webglTexture),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let it=0;it<6;it++)r.deleteFramebuffer(V.__webglFramebuffer[it]),V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer[it]);else r.deleteFramebuffer(V.__webglFramebuffer),V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&r.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer&&r.deleteRenderbuffer(V.__webglColorRenderbuffer),V.__webglDepthRenderbuffer&&r.deleteRenderbuffer(V.__webglDepthRenderbuffer);n.remove(M),n.remove(b)}}let H=0;function z(){H=0}function A(){const b=H;return b>=l&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+l),H+=1,b}function P(b,M){const V=n.get(b);if(b.isVideoTexture&&Y(b),b.version>0&&V.__version!==b.version){const k=b.image;if(k===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(V,b,M);return}}e.activeTexture(33984+M),e.bindTexture(3553,V.__webglTexture)}function D(b,M){const V=n.get(b);if(b.version>0&&V.__version!==b.version){ut(V,b,M);return}e.activeTexture(33984+M),e.bindTexture(35866,V.__webglTexture)}function C(b,M){const V=n.get(b);if(b.version>0&&V.__version!==b.version){ut(V,b,M);return}e.activeTexture(33984+M),e.bindTexture(32879,V.__webglTexture)}function X(b,M){const V=n.get(b);if(b.version>0&&V.__version!==b.version){xt(V,b,M);return}e.activeTexture(33984+M),e.bindTexture(34067,V.__webglTexture)}const Q={[ci]:10497,[we]:33071,[is]:33648},Z={[oe]:9728,[js]:9984,[Js]:9986,[pe]:9729,[Yl]:9985,[ms]:9987};function st(b,M,V){if(V?(r.texParameteri(b,10242,Q[M.wrapS]),r.texParameteri(b,10243,Q[M.wrapT]),(b===32879||b===35866)&&r.texParameteri(b,32882,Q[M.wrapR]),r.texParameteri(b,10240,Z[M.magFilter]),r.texParameteri(b,10241,Z[M.minFilter])):(r.texParameteri(b,10242,33071),r.texParameteri(b,10243,33071),(b===32879||b===35866)&&r.texParameteri(b,32882,33071),(M.wrapS!==we||M.wrapT!==we)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(b,10240,v(M.magFilter)),r.texParameteri(b,10241,v(M.minFilter)),M.minFilter!==oe&&M.minFilter!==pe&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const k=t.get("EXT_texture_filter_anisotropic");if(M.type===Ze&&t.has("OES_texture_float_linear")===!1||a===!1&&M.type===$i&&t.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(r.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function rt(b,M){b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",R),b.__webglTexture=r.createTexture(),o.memory.textures++)}function ut(b,M,V){let k=3553;M.isDataTexture2DArray&&(k=35866),M.isDataTexture3D&&(k=32879),rt(b,M),e.activeTexture(33984+V),e.bindTexture(k,b.__webglTexture),r.pixelStorei(37440,M.flipY),r.pixelStorei(37441,M.premultiplyAlpha),r.pixelStorei(3317,M.unpackAlignment),r.pixelStorei(37443,0);const it=f(M)&&g(M.image)===!1,ot=y(M.image,it,!1,h),At=g(ot)||a,pt=s.convert(M.format);let L=s.convert(M.type),j=T(M.internalFormat,pt,L);st(k,M,At);let $;const ct=M.mipmaps;if(M.isDepthTexture)j=6402,a?M.type===Ze?j=36012:M.type===Ji?j=33190:M.type===oi?j=35056:j=33189:M.type===Ze&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Dn&&j===6402&&M.type!==Qi&&M.type!==Ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Qi,L=s.convert(M.type)),M.format===hi&&j===6402&&(j=34041,M.type!==oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=oi,L=s.convert(M.type))),e.texImage2D(3553,0,j,ot.width,ot.height,0,pt,L,null);else if(M.isDataTexture)if(ct.length>0&&At){for(let W=0,ft=ct.length;W<ft;W++)$=ct[W],e.texImage2D(3553,W,j,$.width,$.height,0,pt,L,$.data);M.generateMipmaps=!1,b.__maxMipLevel=ct.length-1}else e.texImage2D(3553,0,j,ot.width,ot.height,0,pt,L,ot.data),b.__maxMipLevel=0;else if(M.isCompressedTexture){for(let W=0,ft=ct.length;W<ft;W++)$=ct[W],M.format!==be&&M.format!==an?pt!==null?e.compressedTexImage2D(3553,W,j,$.width,$.height,0,$.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):e.texImage2D(3553,W,j,$.width,$.height,0,pt,L,$.data);b.__maxMipLevel=ct.length-1}else if(M.isDataTexture2DArray)e.texImage3D(35866,0,j,ot.width,ot.height,ot.depth,0,pt,L,ot.data),b.__maxMipLevel=0;else if(M.isDataTexture3D)e.texImage3D(32879,0,j,ot.width,ot.height,ot.depth,0,pt,L,ot.data),b.__maxMipLevel=0;else if(ct.length>0&&At){for(let W=0,ft=ct.length;W<ft;W++)$=ct[W],e.texImage2D(3553,W,j,pt,L,$);M.generateMipmaps=!1,b.__maxMipLevel=ct.length-1}else e.texImage2D(3553,0,j,pt,L,ot),b.__maxMipLevel=0;S(M,At)&&E(k,M,ot.width,ot.height),b.__version=M.version,M.onUpdate&&M.onUpdate(M)}function xt(b,M,V){if(M.image.length!==6)return;rt(b,M),e.activeTexture(33984+V),e.bindTexture(34067,b.__webglTexture),r.pixelStorei(37440,M.flipY),r.pixelStorei(37441,M.premultiplyAlpha),r.pixelStorei(3317,M.unpackAlignment),r.pixelStorei(37443,0);const k=M&&(M.isCompressedTexture||M.image[0].isCompressedTexture),it=M.image[0]&&M.image[0].isDataTexture,ot=[];for(let W=0;W<6;W++)!k&&!it?ot[W]=y(M.image[W],!1,!0,c):ot[W]=it?M.image[W].image:M.image[W];const At=ot[0],pt=g(At)||a,L=s.convert(M.format),j=s.convert(M.type),$=T(M.internalFormat,L,j);st(34067,M,pt);let ct;if(k){for(let W=0;W<6;W++){ct=ot[W].mipmaps;for(let ft=0;ft<ct.length;ft++){const Pt=ct[ft];M.format!==be&&M.format!==an?L!==null?e.compressedTexImage2D(34069+W,ft,$,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):e.texImage2D(34069+W,ft,$,Pt.width,Pt.height,0,L,j,Pt.data)}}b.__maxMipLevel=ct.length-1}else{ct=M.mipmaps;for(let W=0;W<6;W++)if(it){e.texImage2D(34069+W,0,$,ot[W].width,ot[W].height,0,L,j,ot[W].data);for(let ft=0;ft<ct.length;ft++){const Xt=ct[ft].image[W].image;e.texImage2D(34069+W,ft+1,$,Xt.width,Xt.height,0,L,j,Xt.data)}}else{e.texImage2D(34069+W,0,$,L,j,ot[W]);for(let ft=0;ft<ct.length;ft++){const Pt=ct[ft];e.texImage2D(34069+W,ft+1,$,L,j,Pt.image[W])}}b.__maxMipLevel=ct.length}S(M,pt)&&E(34067,M,At.width,At.height),b.__version=M.version,M.onUpdate&&M.onUpdate(M)}function G(b,M,V,k){const it=M.texture,ot=s.convert(it.format),At=s.convert(it.type),pt=T(it.internalFormat,ot,At);k===32879||k===35866?e.texImage3D(k,0,pt,M.width,M.height,M.depth,0,ot,At,null):e.texImage2D(k,0,pt,M.width,M.height,0,ot,At,null),e.bindFramebuffer(36160,b),r.framebufferTexture2D(36160,V,k,n.get(it).__webglTexture,0),e.bindFramebuffer(36160,null)}function Bt(b,M,V){if(r.bindRenderbuffer(36161,b),M.depthBuffer&&!M.stencilBuffer){let k=33189;if(V){const it=M.depthTexture;it&&it.isDepthTexture&&(it.type===Ze?k=36012:it.type===Ji&&(k=33190));const ot=bt(M);r.renderbufferStorageMultisample(36161,ot,k,M.width,M.height)}else r.renderbufferStorage(36161,k,M.width,M.height);r.framebufferRenderbuffer(36160,36096,36161,b)}else if(M.depthBuffer&&M.stencilBuffer){if(V){const k=bt(M);r.renderbufferStorageMultisample(36161,k,35056,M.width,M.height)}else r.renderbufferStorage(36161,34041,M.width,M.height);r.framebufferRenderbuffer(36160,33306,36161,b)}else{const k=M.texture,it=s.convert(k.format),ot=s.convert(k.type),At=T(k.internalFormat,it,ot);if(V){const pt=bt(M);r.renderbufferStorageMultisample(36161,pt,At,M.width,M.height)}else r.renderbufferStorage(36161,At,M.width,M.height)}r.bindRenderbuffer(36161,null)}function St(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),P(M.depthTexture,0);const k=n.get(M.depthTexture).__webglTexture;if(M.depthTexture.format===Dn)r.framebufferTexture2D(36160,36096,3553,k,0);else if(M.depthTexture.format===hi)r.framebufferTexture2D(36160,33306,3553,k,0);else throw new Error("Unknown depthTexture format")}function vt(b){const M=n.get(b),V=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture){if(V)throw new Error("target.depthTexture not supported in Cube render targets");St(M.__webglFramebuffer,b)}else if(V){M.__webglDepthbuffer=[];for(let k=0;k<6;k++)e.bindFramebuffer(36160,M.__webglFramebuffer[k]),M.__webglDepthbuffer[k]=r.createRenderbuffer(),Bt(M.__webglDepthbuffer[k],b,!1)}else e.bindFramebuffer(36160,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),Bt(M.__webglDepthbuffer,b,!1);e.bindFramebuffer(36160,null)}function dt(b){const M=b.texture,V=n.get(b),k=n.get(M);b.addEventListener("dispose",I),k.__webglTexture=r.createTexture(),k.__version=M.version,o.memory.textures++;const it=b.isWebGLCubeRenderTarget===!0,ot=b.isWebGLMultisampleRenderTarget===!0,At=M.isDataTexture3D||M.isDataTexture2DArray,pt=g(b)||a;if(a&&M.format===an&&(M.type===Ze||M.type===$i)&&(M.format=be,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),it){V.__webglFramebuffer=[];for(let L=0;L<6;L++)V.__webglFramebuffer[L]=r.createFramebuffer()}else if(V.__webglFramebuffer=r.createFramebuffer(),ot)if(a){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=r.createRenderbuffer(),r.bindRenderbuffer(36161,V.__webglColorRenderbuffer);const L=s.convert(M.format),j=s.convert(M.type),$=T(M.internalFormat,L,j),ct=bt(b);r.renderbufferStorageMultisample(36161,ct,$,b.width,b.height),e.bindFramebuffer(36160,V.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064,36161,V.__webglColorRenderbuffer),r.bindRenderbuffer(36161,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),Bt(V.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(it){e.bindTexture(34067,k.__webglTexture),st(34067,M,pt);for(let L=0;L<6;L++)G(V.__webglFramebuffer[L],b,36064,34069+L);S(M,pt)&&E(34067,M,b.width,b.height),e.bindTexture(34067,null)}else{let L=3553;At&&(a?L=M.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),e.bindTexture(L,k.__webglTexture),st(L,M,pt),G(V.__webglFramebuffer,b,36064,L),S(M,pt)&&E(3553,M,b.width,b.height),e.bindTexture(3553,null)}b.depthBuffer&&vt(b)}function Tt(b){const M=b.texture,V=g(b)||a;if(S(M,V)){const k=b.isWebGLCubeRenderTarget?34067:3553,it=n.get(M).__webglTexture;e.bindTexture(k,it),E(k,M,b.width,b.height),e.bindTexture(k,null)}}function Mt(b){if(b.isWebGLMultisampleRenderTarget)if(a){const M=b.width,V=b.height;let k=16384;b.depthBuffer&&(k|=256),b.stencilBuffer&&(k|=1024);const it=n.get(b);e.bindFramebuffer(36008,it.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,it.__webglFramebuffer),r.blitFramebuffer(0,0,M,V,0,0,M,V,k,9728),e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,it.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function bt(b){return a&&b.isWebGLMultisampleRenderTarget?Math.min(u,b.samples):0}function Y(b){const M=o.render.frame;d.get(b)!==M&&(d.set(b,M),b.update())}let J=!1,tt=!1;function at(b,M){b&&b.isWebGLRenderTarget&&(J===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),J=!0),b=b.texture),P(b,M)}function nt(b,M){b&&b.isWebGLCubeRenderTarget&&(tt===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),tt=!0),b=b.texture),X(b,M)}this.allocateTextureUnit=A,this.resetTextureUnits=z,this.setTexture2D=P,this.setTexture2DArray=D,this.setTexture3D=C,this.setTextureCube=X,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Mt,this.safeSetTexture2D=at,this.safeSetTextureCube=nt}function Ep(r,t,e){const n=e.isWebGL2;function i(s){let o;if(s===gs)return 5121;if(s===Ql)return 32819;if(s===$l)return 32820;if(s===Kl)return 33635;if(s===Zl)return 5120;if(s===jl)return 5122;if(s===Qi)return 5123;if(s===Jl)return 5124;if(s===Ji)return 5125;if(s===Ze)return 5126;if(s===$i)return n?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===tc)return 6406;if(s===an)return 6407;if(s===be)return 6408;if(s===ec)return 6409;if(s===nc)return 6410;if(s===Dn)return 6402;if(s===hi)return 34041;if(s===ic)return 6403;if(s===rc)return 36244;if(s===sc)return 33319;if(s===oc)return 33320;if(s===ac)return 36248;if(s===lc)return 36249;if(s===Qs||s===$s||s===Ks||s===to)if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Qs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===$s)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ks)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===to)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===eo||s===no||s===io||s===ro)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===eo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===no)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===io)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ro)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===cc)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if((s===so||s===oo)&&(o=t.get("WEBGL_compressed_texture_etc"),o!==null)){if(s===so)return o.COMPRESSED_RGB8_ETC2;if(s===oo)return o.COMPRESSED_RGBA8_ETC2_EAC}if(s===hc||s===uc||s===dc||s===fc||s===pc||s===mc||s===gc||s===xc||s===vc||s===yc||s===_c||s===Mc||s===wc||s===bc||s===Ec||s===Tc||s===Ac||s===Lc||s===Cc||s===Rc||s===Pc||s===Ic||s===Dc||s===Nc||s===Fc||s===Bc||s===zc||s===Oc)return o=t.get("WEBGL_compressed_texture_astc"),o!==null?s:null;if(s===Sc)return o=t.get("EXT_texture_compression_bptc"),o!==null?s:null;if(s===oi)return n?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:i}}class Ha extends he{constructor(t=[]){super(),this.cameras=t}}Ha.prototype.isArrayCamera=!0;class Le extends Ct{constructor(){super(),this.type="Group"}}Le.prototype.isGroup=!0;const Tp={type:"move"};class Yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred")if(a!==null&&(i=e.getPose(t.targetRaySpace,n),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tp))),c&&t.hand){o=!0;for(const x of t.hand.values()){const y=e.getJointPose(x,n);if(c.joints[x.jointName]===void 0){const f=new Le;f.matrixAutoUpdate=!1,f.visible=!1,c.joints[x.jointName]=f,c.add(f)}const g=c.joints[x.jointName];y!==null&&(g.matrix.fromArray(y.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.jointRadius=y.radius),g.visible=y!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}}class Ap extends hn{constructor(t,e){super();const n=this,i=t.state;let s=null,o=1,a=null,l="local-floor",c=null;const h=[],u=new Map,d=new he;d.layers.enable(1),d.viewport=new Nt;const p=new he;p.layers.enable(2),p.viewport=new Nt;const m=[d,p],x=new Ha;x.layers.enable(1),x.layers.enable(2);let y=null,g=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let A=h[z];return A===void 0&&(A=new Yr,h[z]=A),A.getTargetRaySpace()},this.getControllerGrip=function(z){let A=h[z];return A===void 0&&(A=new Yr,h[z]=A),A.getGripSpace()},this.getHand=function(z){let A=h[z];return A===void 0&&(A=new Yr,h[z]=A),A.getHandSpace()};function f(z){const A=u.get(z.inputSource);A&&A.dispatchEvent({type:z.type,data:z.inputSource})}function S(){u.forEach(function(z,A){z.disconnect(A)}),u.clear(),y=null,g=null,i.bindXRFramebuffer(null),t.setRenderTarget(t.getRenderTarget()),H.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){l=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){s.addEventListener("select",f),s.addEventListener("selectstart",f),s.addEventListener("selectend",f),s.addEventListener("squeeze",f),s.addEventListener("squeezestart",f),s.addEventListener("squeezeend",f),s.addEventListener("end",S),s.addEventListener("inputsourceschange",E);const A=e.getContextAttributes();A.xrCompatible!==!0&&await e.makeXRCompatible();const P={antialias:A.antialias,alpha:A.alpha,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:o},D=new XRWebGLLayer(s,e,P);s.updateRenderState({baseLayer:D}),a=await s.requestReferenceSpace(l),H.setContext(s),H.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function E(z){const A=s.inputSources;for(let P=0;P<h.length;P++)u.set(A[P],h[P]);for(let P=0;P<z.removed.length;P++){const D=z.removed[P],C=u.get(D);C&&(C.dispatchEvent({type:"disconnected",data:D}),u.delete(D))}for(let P=0;P<z.added.length;P++){const D=z.added[P],C=u.get(D);C&&C.dispatchEvent({type:"connected",data:D})}}const T=new w,v=new w;function R(z,A,P){T.setFromMatrixPosition(A.matrixWorld),v.setFromMatrixPosition(P.matrixWorld);const D=T.distanceTo(v),C=A.projectionMatrix.elements,X=P.projectionMatrix.elements,Q=C[14]/(C[10]-1),Z=C[14]/(C[10]+1),st=(C[9]+1)/C[5],rt=(C[9]-1)/C[5],ut=(C[8]-1)/C[0],xt=(X[8]+1)/X[0],G=Q*ut,Bt=Q*xt,St=D/(-ut+xt),vt=St*-ut;A.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(vt),z.translateZ(St),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const dt=Q+St,Tt=Z+St,Mt=G-vt,bt=Bt+(D-vt),Y=st*Z/Tt*dt,J=rt*Z/Tt*dt;z.projectionMatrix.makePerspective(Mt,bt,Y,J,dt,Tt)}function I(z,A){A===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(A.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.getCamera=function(z){x.near=p.near=d.near=z.near,x.far=p.far=d.far=z.far,(y!==x.near||g!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),y=x.near,g=x.far);const A=z.parent,P=x.cameras;I(x,A);for(let C=0;C<P.length;C++)I(P[C],A);z.matrixWorld.copy(x.matrixWorld),z.matrix.copy(x.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale);const D=z.children;for(let C=0,X=D.length;C<X;C++)D[C].updateMatrixWorld(!0);return P.length===2?R(x,d,p):x.projectionMatrix.copy(d.projectionMatrix),x};let N=null;function B(z,A){if(c=A.getViewerPose(a),c!==null){const D=c.views,C=s.renderState.baseLayer;i.bindXRFramebuffer(C.framebuffer);let X=!1;D.length!==x.cameras.length&&(x.cameras.length=0,X=!0);for(let Q=0;Q<D.length;Q++){const Z=D[Q],st=C.getViewport(Z),rt=m[Q];rt.matrix.fromArray(Z.transform.matrix),rt.projectionMatrix.fromArray(Z.projectionMatrix),rt.viewport.set(st.x,st.y,st.width,st.height),Q===0&&x.matrix.copy(rt.matrix),X===!0&&x.cameras.push(rt)}}const P=s.inputSources;for(let D=0;D<h.length;D++){const C=h[D],X=P[D];C.update(X,A,a)}N&&N(z,A)}const H=new Aa;H.setAnimationLoop(B),this.setAnimationLoop=function(z){N=z},this.dispose=function(){}}}function Lp(r){function t(g,f){g.fogColor.value.copy(f.color),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function e(g,f,S,E){f.isMeshBasicMaterial?n(g,f):f.isMeshLambertMaterial?(n(g,f),l(g,f)):f.isMeshToonMaterial?(n(g,f),h(g,f)):f.isMeshPhongMaterial?(n(g,f),c(g,f)):f.isMeshStandardMaterial?(n(g,f),f.isMeshPhysicalMaterial?d(g,f):u(g,f)):f.isMeshMatcapMaterial?(n(g,f),p(g,f)):f.isMeshDepthMaterial?(n(g,f),m(g,f)):f.isMeshDistanceMaterial?(n(g,f),x(g,f)):f.isMeshNormalMaterial?(n(g,f),y(g,f)):f.isLineBasicMaterial?(i(g,f),f.isLineDashedMaterial&&s(g,f)):f.isPointsMaterial?o(g,f,S,E):f.isSpriteMaterial?a(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function n(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap),f.specularMap&&(g.specularMap.value=f.specularMap);const S=r.get(f).envMap;if(S){g.envMap.value=S,g.flipEnvMap.value=S.isCubeTexture&&S._needsFlipEnvMap?-1:1,g.reflectivity.value=f.reflectivity,g.refractionRatio.value=f.refractionRatio;const v=r.get(S).__maxMipLevel;v!==void 0&&(g.maxMipLevel.value=v)}f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity);let E;f.map?E=f.map:f.specularMap?E=f.specularMap:f.displacementMap?E=f.displacementMap:f.normalMap?E=f.normalMap:f.bumpMap?E=f.bumpMap:f.roughnessMap?E=f.roughnessMap:f.metalnessMap?E=f.metalnessMap:f.alphaMap?E=f.alphaMap:f.emissiveMap?E=f.emissiveMap:f.clearcoatMap?E=f.clearcoatMap:f.clearcoatNormalMap?E=f.clearcoatNormalMap:f.clearcoatRoughnessMap&&(E=f.clearcoatRoughnessMap),E!==void 0&&(E.isWebGLRenderTarget&&(E=E.texture),E.matrixAutoUpdate===!0&&E.updateMatrix(),g.uvTransform.value.copy(E.matrix));let T;f.aoMap?T=f.aoMap:f.lightMap&&(T=f.lightMap),T!==void 0&&(T.isWebGLRenderTarget&&(T=T.texture),T.matrixAutoUpdate===!0&&T.updateMatrix(),g.uv2Transform.value.copy(T.matrix))}function i(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity}function s(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function o(g,f,S,E){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*S,g.scale.value=E*.5,f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap);let T;f.map?T=f.map:f.alphaMap&&(T=f.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),g.uvTransform.value.copy(T.matrix))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap);let S;f.map?S=f.map:f.alphaMap&&(S=f.alphaMap),S!==void 0&&(S.matrixAutoUpdate===!0&&S.updateMatrix(),g.uvTransform.value.copy(S.matrix))}function l(g,f){f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap)}function c(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===Qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===Qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===Qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===Qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function u(g,f){g.roughness.value=f.roughness,g.metalness.value=f.metalness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===Qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===Qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),r.get(f).envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function d(g,f){u(g,f),g.reflectivity.value=f.reflectivity,g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.sheen&&g.sheen.value.copy(f.sheen),f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),g.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===Qt&&g.clearcoatNormalScale.value.negate()),g.transmission.value=f.transmission,f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap)}function p(g,f){f.matcap&&(g.matcap.value=f.matcap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===Qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===Qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function m(g,f){f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function x(g,f){f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),g.referencePosition.value.copy(f.referencePosition),g.nearDistance.value=f.nearDistance,g.farDistance.value=f.farDistance}function y(g,f){f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===Qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===Qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}return{refreshFogUniforms:t,refreshMaterialUniforms:e}}function Cp(){const r=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return r.style.display="block",r}function Ft(r){r=r||{};const t=r.canvas!==void 0?r.canvas:Cp(),e=r.context!==void 0?r.context:null,n=r.alpha!==void 0?r.alpha:!1,i=r.depth!==void 0?r.depth:!0,s=r.stencil!==void 0?r.stencil:!0,o=r.antialias!==void 0?r.antialias:!1,a=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,l=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,c=r.powerPreference!==void 0?r.powerPreference:"default",h=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let u=null,d=null;const p=[],m=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=vi,this.physicallyCorrectLights=!1,this.toneMapping=si,this.toneMappingExposure=1;const x=this;let y=!1,g=0,f=0,S=null,E=-1,T=null;const v=new Nt,R=new Nt;let I=null,N=t.width,B=t.height,H=1,z=null,A=null;const P=new Nt(0,0,N,B),D=new Nt(0,0,N,B);let C=!1;const X=new dr;let Q=!1,Z=!1;const st=new ht,rt=new w,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function xt(){return S===null?H:1}let G=e;function Bt(_,O){for(let F=0;F<_.length;F++){const U=_[F],et=t.getContext(U,O);if(et!==null)return et}return null}try{const _={alpha:n,depth:i,stencil:s,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if(t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",Pt,!1),G===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),G=Bt(O,_),G===null)throw Bt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let St,vt,dt,Tt,Mt,bt,Y,J,tt,at,nt,b,M,V,k,it,ot,At,pt,L,j,$;function ct(){St=new Jd(G),vt=new Yd(G,St,r),St.init(vt),j=new Ep(G,St,vt),dt=new bp(G,St,vt),Tt=new Kd,Mt=new up,bt=new Sp(G,St,dt,Mt,vt,j,Tt),Y=new jd(x),J=new Mh(G,vt),$=new Xd(G,St,J,vt),tt=new Qd(G,J,Tt,$),at=new rf(G,tt,J,Tt),At=new nf(G),k=new Zd(Mt),nt=new hp(x,Y,St,vt,$,k),b=new Lp(Mt),M=new pp(Mt),V=new _p(St,vt),ot=new Wd(x,Y,dt,at,a),it=new Ua(x,at,vt),pt=new qd(G,St,Tt,vt),L=new $d(G,St,Tt,vt),Tt.programs=nt.programs,x.capabilities=vt,x.extensions=St,x.properties=Mt,x.renderLists=M,x.shadowMap=it,x.state=dt,x.info=Tt}ct();const W=new Ap(x,G);this.xr=W,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const _=St.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=St.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(_){_!==void 0&&(H=_,this.setSize(N,B,!1))},this.getSize=function(_){return _===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),_=new q),_.set(N,B)},this.setSize=function(_,O,F){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=_,B=O,t.width=Math.floor(_*H),t.height=Math.floor(O*H),F!==!1&&(t.style.width=_+"px",t.style.height=O+"px"),this.setViewport(0,0,_,O)},this.getDrawingBufferSize=function(_){return _===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),_=new q),_.set(N*H,B*H).floor()},this.setDrawingBufferSize=function(_,O,F){N=_,B=O,H=F,t.width=Math.floor(_*F),t.height=Math.floor(O*F),this.setViewport(0,0,_,O)},this.getCurrentViewport=function(_){return _===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),_=new Nt),_.copy(v)},this.getViewport=function(_){return _.copy(P)},this.setViewport=function(_,O,F,U){_.isVector4?P.set(_.x,_.y,_.z,_.w):P.set(_,O,F,U),dt.viewport(v.copy(P).multiplyScalar(H).floor())},this.getScissor=function(_){return _.copy(D)},this.setScissor=function(_,O,F,U){_.isVector4?D.set(_.x,_.y,_.z,_.w):D.set(_,O,F,U),dt.scissor(R.copy(D).multiplyScalar(H).floor())},this.getScissorTest=function(){return C},this.setScissorTest=function(_){dt.setScissorTest(C=_)},this.setOpaqueSort=function(_){z=_},this.setTransparentSort=function(_){A=_},this.getClearColor=function(_){return _===void 0&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),_=new lt),_.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(_,O,F){let U=0;(_===void 0||_)&&(U|=16384),(O===void 0||O)&&(U|=256),(F===void 0||F)&&(U|=1024),G.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",Pt,!1),M.dispose(),V.dispose(),Mt.dispose(),Y.dispose(),at.dispose(),$.dispose(),W.dispose(),W.removeEventListener("sessionstart",Fs),W.removeEventListener("sessionend",Bs),en.stop()};function ft(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const _=Tt.autoReset,O=it.enabled,F=it.autoUpdate,U=it.needsUpdate,et=it.type;ct(),Tt.autoReset=_,it.enabled=O,it.autoUpdate=F,it.needsUpdate=U,it.type=et}function Xt(_){const O=_.target;O.removeEventListener("dispose",Xt),tn(O)}function tn(_){Vt(_),Mt.remove(_)}function Vt(_){const O=Mt.get(_).programs;O!==void 0&&O.forEach(function(F){nt.releaseProgram(F)})}function De(_,O){_.render(function(F){x.renderBufferImmediate(F,O)})}this.renderBufferImmediate=function(_,O){$.initAttributes();const F=Mt.get(_);_.hasPositions&&!F.position&&(F.position=G.createBuffer()),_.hasNormals&&!F.normal&&(F.normal=G.createBuffer()),_.hasUvs&&!F.uv&&(F.uv=G.createBuffer()),_.hasColors&&!F.color&&(F.color=G.createBuffer());const U=O.getAttributes();_.hasPositions&&(G.bindBuffer(34962,F.position),G.bufferData(34962,_.positionArray,35048),$.enableAttribute(U.position),G.vertexAttribPointer(U.position,3,5126,!1,0,0)),_.hasNormals&&(G.bindBuffer(34962,F.normal),G.bufferData(34962,_.normalArray,35048),$.enableAttribute(U.normal),G.vertexAttribPointer(U.normal,3,5126,!1,0,0)),_.hasUvs&&(G.bindBuffer(34962,F.uv),G.bufferData(34962,_.uvArray,35048),$.enableAttribute(U.uv),G.vertexAttribPointer(U.uv,2,5126,!1,0,0)),_.hasColors&&(G.bindBuffer(34962,F.color),G.bufferData(34962,_.colorArray,35048),$.enableAttribute(U.color),G.vertexAttribPointer(U.color,3,5126,!1,0,0)),$.disableUnusedAttributes(),G.drawArrays(4,0,_.count),_.count=0},this.renderBufferDirect=function(_,O,F,U,et,Et){O===null&&(O=ut);const mt=et.isMesh&&et.matrixWorld.determinant()<0,_t=Gs(_,O,U,et);dt.setMaterial(U,mt);let zt=F.index;const yt=F.attributes.position;if(zt===null){if(yt===void 0||yt.count===0)return}else if(zt.count===0)return;let Lt=1;U.wireframe===!0&&(zt=tt.getWireframeAttribute(F),Lt=2),(U.morphTargets||U.morphNormals)&&At.update(et,F,U,_t),$.setup(et,U,_t,F,zt);let gt,It=pt;zt!==null&&(gt=J.get(zt),It=L,It.setIndex(gt));const Se=zt!==null?zt.count:yt.count,se=F.drawRange.start*Lt,nn=F.drawRange.count*Lt,Yt=Et!==null?Et.start*Lt:0,rn=Et!==null?Et.count*Lt:1/0,qt=Math.max(se,Yt),vr=Math.min(Se,se+nn,Yt+rn)-1,ce=Math.max(0,vr-qt+1);if(ce!==0){if(et.isMesh)U.wireframe===!0?(dt.setLineWidth(U.wireframeLinewidth*xt()),It.setMode(1)):It.setMode(4);else if(et.isLine){let Ne=U.linewidth;Ne===void 0&&(Ne=1),dt.setLineWidth(Ne*xt()),et.isLineSegments?It.setMode(1):et.isLineLoop?It.setMode(2):It.setMode(3)}else et.isPoints?It.setMode(0):et.isSprite&&It.setMode(4);if(et.isInstancedMesh)It.renderInstances(qt,ce,et.count);else if(F.isInstancedBufferGeometry){const Ne=Math.min(F.instanceCount,F._maxInstanceCount);It.renderInstances(qt,ce,Ne)}else It.render(qt,ce)}},this.compile=function(_,O){d=V.get(_),d.init(),_.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights(),_.traverse(function(F){const U=F.material;if(U)if(Array.isArray(U))for(let et=0;et<U.length;et++){const Et=U[et];xr(Et,_,F)}else xr(U,_,F)})};let xe=null;function gl(_){xe&&xe(_)}function Fs(){en.stop()}function Bs(){en.start()}const en=new Aa;en.setAnimationLoop(gl),typeof window<"u"&&en.setContext(window),this.setAnimationLoop=function(_){xe=_,W.setAnimationLoop(_),_===null?en.stop():en.start()},W.addEventListener("sessionstart",Fs),W.addEventListener("sessionend",Bs),this.render=function(_,O){let F,U;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),F=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),U=arguments[3]),O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;_.autoUpdate===!0&&_.updateMatrixWorld(),O.parent===null&&O.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(O=W.getCamera(O)),_.isScene===!0&&_.onBeforeRender(x,_,O,F||S),d=V.get(_,m.length),d.init(),m.push(d),st.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),X.setFromProjectionMatrix(st),Z=this.localClippingEnabled,Q=k.init(this.clippingPlanes,Z,O),u=M.get(_,p.length),u.init(),p.push(u),zs(_,O,0,x.sortObjects),u.finish(),x.sortObjects===!0&&u.sort(z,A),Q===!0&&k.beginShadows();const et=d.state.shadowsArray;it.render(et,_,O),d.setupLights(),d.setupLightsView(O),Q===!0&&k.endShadows(),this.info.autoReset===!0&&this.info.reset(),F!==void 0&&this.setRenderTarget(F),ot.render(u,_,O,U);const Et=u.opaque,mt=u.transparent;Et.length>0&&Os(Et,_,O),mt.length>0&&Os(mt,_,O),S!==null&&(bt.updateRenderTargetMipmap(S),bt.updateMultisampleRenderTarget(S)),_.isScene===!0&&_.onAfterRender(x,_,O),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1),$.resetDefaultState(),E=-1,T=null,m.pop(),m.length>0?d=m[m.length-1]:d=null,p.pop(),p.length>0?u=p[p.length-1]:u=null};function zs(_,O,F,U){if(_.visible===!1)return;if(_.layers.test(O.layers)){if(_.isGroup)F=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(O);else if(_.isLight)d.pushLight(_),_.castShadow&&d.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||X.intersectsSprite(_)){U&&rt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(st);const mt=at.update(_),_t=_.material;_t.visible&&u.push(_,mt,_t,F,rt.z,null)}}else if(_.isImmediateRenderObject)U&&rt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(st),u.push(_,null,_.material,F,rt.z,null);else if((_.isMesh||_.isLine||_.isPoints)&&(_.isSkinnedMesh&&_.skeleton.frame!==Tt.render.frame&&(_.skeleton.update(),_.skeleton.frame=Tt.render.frame),!_.frustumCulled||X.intersectsObject(_))){U&&rt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(st);const mt=at.update(_),_t=_.material;if(Array.isArray(_t)){const zt=mt.groups;for(let yt=0,Lt=zt.length;yt<Lt;yt++){const gt=zt[yt],It=_t[gt.materialIndex];It&&It.visible&&u.push(_,mt,It,F,rt.z,gt)}}else _t.visible&&u.push(_,mt,_t,F,rt.z,null)}}const Et=_.children;for(let mt=0,_t=Et.length;mt<_t;mt++)zs(Et[mt],O,F,U)}function Os(_,O,F){const U=O.isScene===!0?O.overrideMaterial:null;for(let et=0,Et=_.length;et<Et;et++){const mt=_[et],_t=mt.object,zt=mt.geometry,yt=U===null?mt.material:U,Lt=mt.group;if(F.isArrayCamera){const gt=F.cameras;for(let It=0,Se=gt.length;It<Se;It++){const se=gt[It];_t.layers.test(se.layers)&&(dt.viewport(v.copy(se.viewport)),d.setupLightsView(se),Us(_t,O,se,zt,yt,Lt))}}else Us(_t,O,F,zt,yt,Lt)}}function Us(_,O,F,U,et,Et){if(_.onBeforeRender(x,O,F,U,et,Et),_.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),_.isImmediateRenderObject){const mt=Gs(F,O,et,_);dt.setMaterial(et),$.reset(),De(_,mt)}else x.renderBufferDirect(F,O,U,et,_,Et);_.onAfterRender(x,O,F,U,et,Et)}function xr(_,O,F){O.isScene!==!0&&(O=ut);const U=Mt.get(_),et=d.state.lights,Et=d.state.shadowsArray,mt=et.state.version,_t=nt.getParameters(_,et.state,Et,O,F),zt=nt.getProgramCacheKey(_t);let yt=U.programs;U.environment=_.isMeshStandardMaterial?O.environment:null,U.fog=O.fog,U.envMap=Y.get(_.envMap||U.environment),yt===void 0&&(_.addEventListener("dispose",Xt),yt=new Map,U.programs=yt);let Lt=yt.get(zt);if(Lt!==void 0){if(U.currentProgram===Lt&&U.lightsStateVersion===mt)return Hs(_,_t),Lt}else _t.uniforms=nt.getUniforms(_),_.onBuild(_t,x),_.onBeforeCompile(_t,x),Lt=nt.acquireProgram(_t,zt),yt.set(zt,Lt),U.uniforms=_t.uniforms;const gt=U.uniforms;(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(gt.clippingPlanes=k.uniform),Hs(_,_t),U.needsLights=vl(_),U.lightsStateVersion=mt,U.needsLights&&(gt.ambientLightColor.value=et.state.ambient,gt.lightProbe.value=et.state.probe,gt.directionalLights.value=et.state.directional,gt.directionalLightShadows.value=et.state.directionalShadow,gt.spotLights.value=et.state.spot,gt.spotLightShadows.value=et.state.spotShadow,gt.rectAreaLights.value=et.state.rectArea,gt.ltc_1.value=et.state.rectAreaLTC1,gt.ltc_2.value=et.state.rectAreaLTC2,gt.pointLights.value=et.state.point,gt.pointLightShadows.value=et.state.pointShadow,gt.hemisphereLights.value=et.state.hemi,gt.directionalShadowMap.value=et.state.directionalShadowMap,gt.directionalShadowMatrix.value=et.state.directionalShadowMatrix,gt.spotShadowMap.value=et.state.spotShadowMap,gt.spotShadowMatrix.value=et.state.spotShadowMatrix,gt.pointShadowMap.value=et.state.pointShadowMap,gt.pointShadowMatrix.value=et.state.pointShadowMatrix);const It=Lt.getUniforms(),Se=je.seqWithValue(It.seq,gt);return U.currentProgram=Lt,U.uniformsList=Se,Lt}function Hs(_,O){const F=Mt.get(_);F.outputEncoding=O.outputEncoding,F.instancing=O.instancing,F.numClippingPlanes=O.numClippingPlanes,F.numIntersection=O.numClipIntersection,F.vertexAlphas=O.vertexAlphas}function Gs(_,O,F,U){O.isScene!==!0&&(O=ut),bt.resetTextureUnits();const et=O.fog,Et=F.isMeshStandardMaterial?O.environment:null,mt=S===null?x.outputEncoding:S.texture.encoding,_t=Y.get(F.envMap||Et),zt=F.vertexColors===!0&&U.geometry&&U.geometry.attributes.color&&U.geometry.attributes.color.itemSize===4,yt=Mt.get(F),Lt=d.state.lights;if(Q===!0&&(Z===!0||_!==T)){const qt=_===T&&F.id===E;k.setState(F,_,qt)}let gt=!1;F.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Lt.state.version||yt.outputEncoding!==mt||U.isInstancedMesh&&yt.instancing===!1||!U.isInstancedMesh&&yt.instancing===!0||yt.envMap!==_t||F.fog&&yt.fog!==et||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==k.numPlanes||yt.numIntersection!==k.numIntersection)||yt.vertexAlphas!==zt)&&(gt=!0):(gt=!0,yt.__version=F.version);let It=yt.currentProgram;gt===!0&&(It=xr(F,O,U));let Se=!1,se=!1,nn=!1;const Yt=It.getUniforms(),rn=yt.uniforms;if(dt.useProgram(It.program)&&(Se=!0,se=!0,nn=!0),F.id!==E&&(E=F.id,se=!0),Se||T!==_){if(Yt.setValue(G,"projectionMatrix",_.projectionMatrix),vt.logarithmicDepthBuffer&&Yt.setValue(G,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),T!==_&&(T=_,se=!0,nn=!0),F.isShaderMaterial||F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshStandardMaterial||F.envMap){const qt=Yt.map.cameraPosition;qt!==void 0&&qt.setValue(G,rt.setFromMatrixPosition(_.matrixWorld))}(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Yt.setValue(G,"isOrthographic",_.isOrthographicCamera===!0),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial||F.isShadowMaterial||F.skinning)&&Yt.setValue(G,"viewMatrix",_.matrixWorldInverse)}if(F.skinning){Yt.setOptional(G,U,"bindMatrix"),Yt.setOptional(G,U,"bindMatrixInverse");const qt=U.skeleton;if(qt){const vr=qt.bones;if(vt.floatVertexTextures){if(qt.boneTexture===null){let ce=Math.sqrt(vr.length*4);ce=th(ce),ce=Math.max(ce,4);const Ne=new Float32Array(ce*ce*4);Ne.set(qt.boneMatrices);const yl=new Ta(Ne,ce,ce,be,Ze);qt.boneMatrices=Ne,qt.boneTexture=yl,qt.boneTextureSize=ce}Yt.setValue(G,"boneTexture",qt.boneTexture,bt),Yt.setValue(G,"boneTextureSize",qt.boneTextureSize)}else Yt.setOptional(G,qt,"boneMatrices")}}return(se||yt.receiveShadow!==U.receiveShadow)&&(yt.receiveShadow=U.receiveShadow,Yt.setValue(G,"receiveShadow",U.receiveShadow)),se&&(Yt.setValue(G,"toneMappingExposure",x.toneMappingExposure),yt.needsLights&&xl(rn,nn),et&&F.fog&&b.refreshFogUniforms(rn,et),b.refreshMaterialUniforms(rn,F,H,B),je.upload(G,yt.uniformsList,rn,bt)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(je.upload(G,yt.uniformsList,rn,bt),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Yt.setValue(G,"center",U.center),Yt.setValue(G,"modelViewMatrix",U.modelViewMatrix),Yt.setValue(G,"normalMatrix",U.normalMatrix),Yt.setValue(G,"modelMatrix",U.matrixWorld),It}function xl(_,O){_.ambientLightColor.needsUpdate=O,_.lightProbe.needsUpdate=O,_.directionalLights.needsUpdate=O,_.directionalLightShadows.needsUpdate=O,_.pointLights.needsUpdate=O,_.pointLightShadows.needsUpdate=O,_.spotLights.needsUpdate=O,_.spotLightShadows.needsUpdate=O,_.rectAreaLights.needsUpdate=O,_.hemisphereLights.needsUpdate=O}function vl(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return f},this.getRenderTarget=function(){return S},this.setRenderTarget=function(_,O=0,F=0){S=_,g=O,f=F,_&&Mt.get(_).__webglFramebuffer===void 0&&bt.setupRenderTarget(_);let U=null,et=!1,Et=!1;if(_){const mt=_.texture;(mt.isDataTexture3D||mt.isDataTexture2DArray)&&(Et=!0);const _t=Mt.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(U=_t[O],et=!0):_.isWebGLMultisampleRenderTarget?U=Mt.get(_).__webglMultisampledFramebuffer:U=_t,v.copy(_.viewport),R.copy(_.scissor),I=_.scissorTest}else v.copy(P).multiplyScalar(H).floor(),R.copy(D).multiplyScalar(H).floor(),I=C;if(dt.bindFramebuffer(36160,U),dt.viewport(v),dt.scissor(R),dt.setScissorTest(I),et){const mt=Mt.get(_.texture);G.framebufferTexture2D(36160,36064,34069+O,mt.__webglTexture,F)}else if(Et){const mt=Mt.get(_.texture),_t=O||0;G.framebufferTextureLayer(36160,36064,mt.__webglTexture,F||0,_t)}},this.readRenderTargetPixels=function(_,O,F,U,et,Et,mt){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Mt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&mt!==void 0&&(_t=_t[mt]),_t){dt.bindFramebuffer(36160,_t);try{const zt=_.texture,yt=zt.format,Lt=zt.type;if(yt!==be&&j.convert(yt)!==G.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const gt=Lt===$i&&(St.has("EXT_color_buffer_half_float")||vt.isWebGL2&&St.has("EXT_color_buffer_float"));if(Lt!==gs&&j.convert(Lt)!==G.getParameter(35738)&&!(Lt===Ze&&(vt.isWebGL2||St.has("OES_texture_float")||St.has("WEBGL_color_buffer_float")))&&!gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G.checkFramebufferStatus(36160)===36053?O>=0&&O<=_.width-U&&F>=0&&F<=_.height-et&&G.readPixels(O,F,U,et,j.convert(yt),j.convert(Lt),Et):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{const zt=S!==null?Mt.get(S).__webglFramebuffer:null;dt.bindFramebuffer(36160,zt)}}},this.copyFramebufferToTexture=function(_,O,F=0){const U=Math.pow(2,-F),et=Math.floor(O.image.width*U),Et=Math.floor(O.image.height*U),mt=j.convert(O.format);bt.setTexture2D(O,0),G.copyTexImage2D(3553,F,mt,_.x,_.y,et,Et,0),dt.unbindTexture()},this.copyTextureToTexture=function(_,O,F,U=0){const et=O.image.width,Et=O.image.height,mt=j.convert(F.format),_t=j.convert(F.type);bt.setTexture2D(F,0),G.pixelStorei(37440,F.flipY),G.pixelStorei(37441,F.premultiplyAlpha),G.pixelStorei(3317,F.unpackAlignment),O.isDataTexture?G.texSubImage2D(3553,U,_.x,_.y,et,Et,mt,_t,O.image.data):O.isCompressedTexture?G.compressedTexSubImage2D(3553,U,_.x,_.y,O.mipmaps[0].width,O.mipmaps[0].height,mt,O.mipmaps[0].data):G.texSubImage2D(3553,U,_.x,_.y,mt,_t,O.image),U===0&&F.generateMipmaps&&G.generateMipmap(3553),dt.unbindTexture()},this.copyTextureToTexture3D=function(_,O,F,U,et=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const{width:Et,height:mt,data:_t}=F.image,zt=j.convert(U.format),yt=j.convert(U.type);let Lt;if(U.isDataTexture3D)bt.setTexture3D(U,0),Lt=32879;else if(U.isDataTexture2DArray)bt.setTexture2DArray(U,0),Lt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(37440,U.flipY),G.pixelStorei(37441,U.premultiplyAlpha),G.pixelStorei(3317,U.unpackAlignment);const gt=G.getParameter(3314),It=G.getParameter(32878),Se=G.getParameter(3316),se=G.getParameter(3315),nn=G.getParameter(32877);G.pixelStorei(3314,Et),G.pixelStorei(32878,mt),G.pixelStorei(3316,_.min.x),G.pixelStorei(3315,_.min.y),G.pixelStorei(32877,_.min.z),G.texSubImage3D(Lt,et,O.x,O.y,O.z,_.max.x-_.min.x+1,_.max.y-_.min.y+1,_.max.z-_.min.z+1,zt,yt,_t),G.pixelStorei(3314,gt),G.pixelStorei(32878,It),G.pixelStorei(3316,Se),G.pixelStorei(3315,se),G.pixelStorei(32877,nn),et===0&&U.generateMipmaps&&G.generateMipmap(Lt),dt.unbindTexture()},this.initTexture=function(_){bt.setTexture2D(_,0),dt.unbindTexture()},this.resetState=function(){g=0,f=0,S=null,dt.reset(),$.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Rp extends Ft{}Rp.prototype.isWebGL1Renderer=!0;class _s extends Ct{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.background!==null&&(e.object.background=this.background.toJSON(t)),this.environment!==null&&(e.object.environment=this.environment.toJSON(t)),this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}}_s.prototype.isScene=!0;class un{constructor(t,e){this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ui,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Re(),this.onUploadCallback=function(){}}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Re()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new un(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Re()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}un.prototype.isInterleavedBuffer=!0;const kt=new w;class di{constructor(t,e,n,i){this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)kt.x=this.getX(e),kt.y=this.getY(e),kt.z=this.getZ(e),kt.applyMatrix4(t),this.setXYZ(e,kt.x,kt.y,kt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)kt.x=this.getX(e),kt.y=this.getY(e),kt.z=this.getZ(e),kt.applyNormalMatrix(t),this.setXYZ(e,kt.x,kt.y,kt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)kt.x=this.getX(e),kt.y=this.getY(e),kt.z=this.getZ(e),kt.transformDirection(t),this.setXYZ(e,kt.x,kt.y,kt.z);return this}setX(t,e){return this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){return this.data.array[t*this.data.stride+this.offset]}getY(t){return this.data.array[t*this.data.stride+this.offset+1]}getZ(t){return this.data.array[t*this.data.stride+this.offset+2]}getW(t){return this.data.array[t*this.data.stride+this.offset+3]}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new jt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new di(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}di.prototype.isInterleavedBufferAttribute=!0;class Ga extends $t{constructor(t){super(),this.type="SpriteMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this}}Ga.prototype.isSpriteMaterial=!0;let En;const Jn=new w,Tn=new w,An=new w,Ln=new q,Qn=new q,Va=new ht,Oi=new w,$n=new w,Ui=new w,Fo=new q,Zr=new q,Bo=new q;class Pp extends Ct{constructor(t){if(super(),this.type="Sprite",En===void 0){En=new Rt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new un(e,5);En.setIndex([0,1,2,0,2,3]),En.setAttribute("position",new di(n,3,0,!1)),En.setAttribute("uv",new di(n,2,3,!1))}this.geometry=En,this.material=t!==void 0?t:new Ga,this.center=new q(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Tn.setFromMatrixScale(this.matrixWorld),Va.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),An.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Tn.multiplyScalar(-An.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Hi(Oi.set(-.5,-.5,0),An,o,Tn,i,s),Hi($n.set(.5,-.5,0),An,o,Tn,i,s),Hi(Ui.set(.5,.5,0),An,o,Tn,i,s),Fo.set(0,0),Zr.set(1,0),Bo.set(1,1);let a=t.ray.intersectTriangle(Oi,$n,Ui,!1,Jn);if(a===null&&(Hi($n.set(-.5,.5,0),An,o,Tn,i,s),Zr.set(0,1),a=t.ray.intersectTriangle(Oi,Ui,$n,!1,Jn),a===null))return;const l=t.ray.origin.distanceTo(Jn);l<t.near||l>t.far||e.push({distance:l,point:Jn.clone(),uv:Zt.getUV(Jn,Oi,$n,Ui,Fo,Zr,Bo,new q),face:null,object:this})}copy(t){return super.copy(t),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}Pp.prototype.isSprite=!0;function Hi(r,t,e,n,i,s){Ln.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Qn.x=s*Ln.x-i*Ln.y,Qn.y=i*Ln.x+s*Ln.y):Qn.copy(Ln),r.copy(t),r.x+=Qn.x,r.y+=Qn.y,r.applyMatrix4(Va)}const zo=new w,Oo=new Nt,Uo=new Nt,Ip=new w,Ho=new ht;class ka extends ae{constructor(t,e){super(t,e),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new ht,this.bindMatrixInverse=new ht}copy(t){return super.copy(t),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,this}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Nt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.w=e.getW(n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(t,e){const n=this.skeleton,i=this.geometry;Oo.fromBufferAttribute(i.attributes.skinIndex,t),Uo.fromBufferAttribute(i.attributes.skinWeight,t),zo.fromBufferAttribute(i.attributes.position,t).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=Uo.getComponent(s);if(o!==0){const a=Oo.getComponent(s);Ho.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Ip.copy(zo).applyMatrix4(Ho),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}ka.prototype.isSkinnedMesh=!0;class Dp extends Ct{constructor(){super(),this.type="Bone"}}Dp.prototype.isBone=!0;const Go=new ht,Vo=new ht,Gi=[],Kn=new ae;class Wa extends ae{constructor(t,e,n){super(t,e),this.instanceMatrix=new jt(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}copy(t){return super.copy(t),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Kn.geometry=this.geometry,Kn.material=this.material,Kn.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,Go),Vo.multiplyMatrices(n,Go),Kn.matrixWorld=Vo,Kn.raycast(t,Gi);for(let o=0,a=Gi.length;o<a;o++){const l=Gi[o];l.instanceId=s,l.object=this,e.push(l)}Gi.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new jt(new Float32Array(this.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}Wa.prototype.isInstancedMesh=!0;class yi extends $t{constructor(t){super(),this.type="LineBasicMaterial",this.color=new lt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.morphTargets=t.morphTargets,this}}yi.prototype.isLineBasicMaterial=!0;const ko=new w,Wo=new w,Xo=new ht,jr=new Hn,Vi=new Un;class Ms extends Ct{constructor(t=new Rt,e=new yi){super(),this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),this.material=t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.isBufferGeometry)if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)ko.fromBufferAttribute(e,i-1),Wo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ko.distanceTo(Wo);t.setAttribute("lineDistance",new Ot(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else t.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vi.copy(n.boundingSphere),Vi.applyMatrix4(i),Vi.radius+=s,t.ray.intersectsSphere(Vi)===!1)return;Xo.copy(i).invert(),jr.copy(t.ray).applyMatrix4(Xo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new w,h=new w,u=new w,d=new w,p=this.isLineSegments?2:1;if(n.isBufferGeometry){const m=n.index,y=n.attributes.position;if(m!==null){const g=Math.max(0,o.start),f=Math.min(m.count,o.start+o.count);for(let S=g,E=f-1;S<E;S+=p){const T=m.getX(S),v=m.getX(S+1);if(c.fromBufferAttribute(y,T),h.fromBufferAttribute(y,v),jr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const I=t.ray.origin.distanceTo(d);I<t.near||I>t.far||e.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,o.start),f=Math.min(y.count,o.start+o.count);for(let S=g,E=f-1;S<E;S+=p){if(c.fromBufferAttribute(y,S),h.fromBufferAttribute(y,S+1),jr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const v=t.ray.origin.distanceTo(d);v<t.near||v>t.far||e.push({distance:v,point:u.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}else{const e=t.morphTargets;e!==void 0&&e.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}Ms.prototype.isLine=!0;const qo=new w,Yo=new w;class ws extends Ms{constructor(t,e){super(t,e),this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.isBufferGeometry)if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)qo.fromBufferAttribute(e,i),Yo.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+qo.distanceTo(Yo);t.setAttribute("lineDistance",new Ot(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else t.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}}ws.prototype.isLineSegments=!0;class Np extends Ms{constructor(t,e){super(t,e),this.type="LineLoop"}}Np.prototype.isLineLoop=!0;class bs extends $t{constructor(t){super(),this.type="PointsMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.morphTargets=t.morphTargets,this}}bs.prototype.isPointsMaterial=!0;const Zo=new ht,os=new Hn,ki=new Un,Wi=new w;class Xa extends Ct{constructor(t=new Rt,e=new bs){super(),this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),this.material=t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(i),ki.radius+=s,t.ray.intersectsSphere(ki)===!1)return;Zo.copy(i).invert(),os.copy(t.ray).applyMatrix4(Zo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a;if(n.isBufferGeometry){const c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let m=d,x=p;m<x;m++){const y=c.getX(m);Wi.fromBufferAttribute(u,y),jo(Wi,y,l,i,t,e,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let m=d,x=p;m<x;m++)Wi.fromBufferAttribute(u,m),jo(Wi,m,l,i,t,e,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}else{const e=t.morphTargets;e!==void 0&&e.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}Xa.prototype.isPoints=!0;function jo(r,t,e,n,i,s,o){const a=os.distanceSqToPoint(r);if(a<e){const l=new w;os.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Fp extends ee{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.format=a!==void 0?a:an,this.minFilter=o!==void 0?o:pe,this.magFilter=s!==void 0?s:pe,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}Fp.prototype.isVideoTexture=!0;class Bp extends ee{constructor(t,e,n,i,s,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,s,u,d),this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}Bp.prototype.isCompressedTexture=!0;class Ss extends ee{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.needsUpdate=!0}}Ss.prototype.isCanvasTexture=!0;class zp extends ee{constructor(t,e,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:Dn,h!==Dn&&h!==hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Dn&&(n=Qi),n===void 0&&h===hi&&(n=oi),super(null,i,s,o,a,l,h,n,c),this.image={width:t,height:e},this.magFilter=a!==void 0?a:oe,this.minFilter=l!==void 0?l:oe,this.flipY=!1,this.generateMipmaps=!1}}zp.prototype.isDepthTexture=!0;class Op extends Rt{constructor(t=1,e=1,n=1,i=8,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],p=[];let m=0;const x=[],y=n/2;let g=0;f(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Ot(u,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(p,2));function f(){const E=new w,T=new w;let v=0;const R=(e-t)/n;for(let I=0;I<=s;I++){const N=[],B=I/s,H=B*(e-t)+t;for(let z=0;z<=i;z++){const A=z/i,P=A*l+a,D=Math.sin(P),C=Math.cos(P);T.x=H*D,T.y=-B*n+y,T.z=H*C,u.push(T.x,T.y,T.z),E.set(D,R,C).normalize(),d.push(E.x,E.y,E.z),p.push(A,1-B),N.push(m++)}x.push(N)}for(let I=0;I<i;I++)for(let N=0;N<s;N++){const B=x[N][I],H=x[N+1][I],z=x[N+1][I+1],A=x[N][I+1];h.push(B,H,A),h.push(H,z,A),v+=6}c.addGroup(g,v,0),g+=v}function S(E){const T=m,v=new q,R=new w;let I=0;const N=E===!0?t:e,B=E===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,y*B,0),d.push(0,B,0),p.push(.5,.5),m++;const H=m;for(let z=0;z<=i;z++){const P=z/i*l+a,D=Math.cos(P),C=Math.sin(P);R.x=N*C,R.y=y*B,R.z=N*D,u.push(R.x,R.y,R.z),d.push(0,B,0),v.x=D*.5+.5,v.y=C*.5*B+.5,p.push(v.x,v.y),m++}for(let z=0;z<i;z++){const A=T+z,P=H+z;E===!0?h.push(P,P+1,A):h.push(P+1,P,A),I+=3}c.addGroup(g,I,E===!0?1:2),g+=I}}}class Up extends Op{constructor(t=1,e=1,n=8,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}}class Hp extends Rt{constructor(t,e,n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Ot(s,3)),this.setAttribute("normal",new Ot(s.slice(),3)),this.setAttribute("uv",new Ot(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(f){const S=new w,E=new w,T=new w;for(let v=0;v<e.length;v+=3)p(e[v+0],S),p(e[v+1],E),p(e[v+2],T),l(S,E,T,f)}function l(f,S,E,T){const v=T+1,R=[];for(let I=0;I<=v;I++){R[I]=[];const N=f.clone().lerp(E,I/v),B=S.clone().lerp(E,I/v),H=v-I;for(let z=0;z<=H;z++)z===0&&I===v?R[I][z]=N:R[I][z]=N.clone().lerp(B,z/H)}for(let I=0;I<v;I++)for(let N=0;N<2*(v-I)-1;N++){const B=Math.floor(N/2);N%2===0?(d(R[I][B+1]),d(R[I+1][B]),d(R[I][B])):(d(R[I][B+1]),d(R[I+1][B+1]),d(R[I+1][B]))}}function c(f){const S=new w;for(let E=0;E<s.length;E+=3)S.x=s[E+0],S.y=s[E+1],S.z=s[E+2],S.normalize().multiplyScalar(f),s[E+0]=S.x,s[E+1]=S.y,s[E+2]=S.z}function h(){const f=new w;for(let S=0;S<s.length;S+=3){f.x=s[S+0],f.y=s[S+1],f.z=s[S+2];const E=y(f)/2/Math.PI+.5,T=g(f)/Math.PI+.5;o.push(E,1-T)}m(),u()}function u(){for(let f=0;f<o.length;f+=6){const S=o[f+0],E=o[f+2],T=o[f+4],v=Math.max(S,E,T),R=Math.min(S,E,T);v>.9&&R<.1&&(S<.2&&(o[f+0]+=1),E<.2&&(o[f+2]+=1),T<.2&&(o[f+4]+=1))}}function d(f){s.push(f.x,f.y,f.z)}function p(f,S){const E=f*3;S.x=t[E+0],S.y=t[E+1],S.z=t[E+2]}function m(){const f=new w,S=new w,E=new w,T=new w,v=new q,R=new q,I=new q;for(let N=0,B=0;N<s.length;N+=9,B+=6){f.set(s[N+0],s[N+1],s[N+2]),S.set(s[N+3],s[N+4],s[N+5]),E.set(s[N+6],s[N+7],s[N+8]),v.set(o[B+0],o[B+1]),R.set(o[B+2],o[B+3]),I.set(o[B+4],o[B+5]),T.copy(f).add(S).add(E).divideScalar(3);const H=y(T);x(v,B+0,f,H),x(R,B+2,S,H),x(I,B+4,E,H)}}function x(f,S,E,T){T<0&&f.x===1&&(o[S]=f.x-1),E.x===0&&E.z===0&&(o[S]=T/2/Math.PI+.5)}function y(f){return Math.atan2(f.z,-f.x)}function g(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}}}class Gp extends Hp{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}}const Vp={triangulate:function(r,t,e){e=e||2;const n=t&&t.length,i=n?t[0]*e:r.length;let s=qa(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,p;if(n&&(s=Yp(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let m=e;m<i;m+=e)u=r[m],d=r[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-a,h-l),p=p!==0?1/p:0}return fi(s,o,e,a,l,p),o}};function qa(r,t,e,n,i){let s,o;if(i===rm(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Jo(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Jo(s,r[s],r[s+1],o);return o&&fr(o,o.next)&&(mi(o),o=o.next),o}function Qe(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(fr(e,e.next)||Gt(e.prev,e,e.next)===0)){if(mi(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fi(r,t,e,n,i,s,o){if(!r)return;!o&&s&&$p(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Wp(r,n,i,s):kp(r)){t.push(l.i/e),t.push(r.i/e),t.push(c.i/e),mi(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=Xp(Qe(r),t,e),fi(r,t,e,n,i,s,2)):o===2&&qp(r,t,e,n,i,s):fi(Qe(r),t,e,n,i,s,1);break}}}function kp(r){const t=r.prev,e=r,n=r.next;if(Gt(t,e,n)>=0)return!1;let i=r.next.next;for(;i!==r.prev;){if(In(t.x,t.y,e.x,e.y,n.x,n.y,i.x,i.y)&&Gt(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function Wp(r,t,e,n){const i=r.prev,s=r,o=r.next;if(Gt(i,s,o)>=0)return!1;const a=i.x<s.x?i.x<o.x?i.x:o.x:s.x<o.x?s.x:o.x,l=i.y<s.y?i.y<o.y?i.y:o.y:s.y<o.y?s.y:o.y,c=i.x>s.x?i.x>o.x?i.x:o.x:s.x>o.x?s.x:o.x,h=i.y>s.y?i.y>o.y?i.y:o.y:s.y>o.y?s.y:o.y,u=as(a,l,t,e,n),d=as(c,h,t,e,n);let p=r.prevZ,m=r.nextZ;for(;p&&p.z>=u&&m&&m.z<=d;){if(p!==r.prev&&p!==r.next&&In(i.x,i.y,s.x,s.y,o.x,o.y,p.x,p.y)&&Gt(p.prev,p,p.next)>=0||(p=p.prevZ,m!==r.prev&&m!==r.next&&In(i.x,i.y,s.x,s.y,o.x,o.y,m.x,m.y)&&Gt(m.prev,m,m.next)>=0))return!1;m=m.nextZ}for(;p&&p.z>=u;){if(p!==r.prev&&p!==r.next&&In(i.x,i.y,s.x,s.y,o.x,o.y,p.x,p.y)&&Gt(p.prev,p,p.next)>=0)return!1;p=p.prevZ}for(;m&&m.z<=d;){if(m!==r.prev&&m!==r.next&&In(i.x,i.y,s.x,s.y,o.x,o.y,m.x,m.y)&&Gt(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function Xp(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!fr(i,s)&&Ya(i,n,n.next,s)&&pi(i,s)&&pi(s,i)&&(t.push(i.i/e),t.push(n.i/e),t.push(s.i/e),mi(n),mi(n.next),n=r=s),n=n.next}while(n!==r);return Qe(n)}function qp(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&em(o,a)){let l=Za(o,a);o=Qe(o,o.next),l=Qe(l,l.next),fi(o,t,e,n,i,s),fi(l,t,e,n,i,s);return}a=a.next}o=o.next}while(o!==r)}function Yp(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=qa(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(tm(c));for(i.sort(Zp),s=0;s<i.length;s++)jp(i[s],e),e=Qe(e,e.next);return e}function Zp(r,t){return r.x-t.x}function jp(r,t){if(t=Jp(r,t),t){const e=Za(t,r);Qe(t,t.next),Qe(e,e.next)}}function Jp(r,t){let e=t;const n=r.x,i=r.y;let s=-1/0,o;do{if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>s){if(s=d,d===n){if(i===e.y)return e;if(i===e.next.y)return e.next}o=e.x<e.next.x?e:e.next}}e=e.next}while(e!==t);if(!o)return null;if(n===s)return o;const a=o,l=o.x,c=o.y;let h=1/0,u;e=o;do n>=e.x&&e.x>=l&&n!==e.x&&In(i<c?n:s,i,l,c,i<c?s:n,i,e.x,e.y)&&(u=Math.abs(i-e.y)/(n-e.x),pi(e,r)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Qp(o,e)))&&(o=e,h=u)),e=e.next;while(e!==a);return o}function Qp(r,t){return Gt(r.prev,r,t.prev)<0&&Gt(t.next,r,r.next)<0}function $p(r,t,e,n){let i=r;do i.z===null&&(i.z=as(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Kp(i)}function Kp(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function as(r,t,e,n,i){return r=32767*(r-e)*i,t=32767*(t-n)*i,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function tm(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function In(r,t,e,n,i,s,o,a){return(i-o)*(t-a)-(r-o)*(s-a)>=0&&(r-o)*(n-a)-(e-o)*(t-a)>=0&&(e-o)*(s-a)-(i-o)*(n-a)>=0}function em(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!nm(r,t)&&(pi(r,t)&&pi(t,r)&&im(r,t)&&(Gt(r.prev,r,t.prev)||Gt(r,t.prev,t))||fr(r,t)&&Gt(r.prev,r,r.next)>0&&Gt(t.prev,t,t.next)>0)}function Gt(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function fr(r,t){return r.x===t.x&&r.y===t.y}function Ya(r,t,e,n){const i=qi(Gt(r,t,e)),s=qi(Gt(r,t,n)),o=qi(Gt(e,n,r)),a=qi(Gt(e,n,t));return!!(i!==s&&o!==a||i===0&&Xi(r,e,t)||s===0&&Xi(r,n,t)||o===0&&Xi(e,r,n)||a===0&&Xi(e,t,n))}function Xi(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function qi(r){return r>0?1:r<0?-1:0}function nm(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Ya(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function pi(r,t){return Gt(r.prev,r,r.next)<0?Gt(r,t,r.next)>=0&&Gt(r,r.prev,t)>=0:Gt(r,t,r.prev)<0||Gt(r,r.next,t)<0}function im(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Za(r,t){const e=new ls(r.i,r.x,r.y),n=new ls(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Jo(r,t,e,n){const i=new ls(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mi(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ls(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function rm(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Je{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return Je.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];Qo(t),$o(n,t);let o=t.length;e.forEach(Qo);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,$o(n,e[l]);const a=Vp.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Qo(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function $o(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class pr extends Rt{constructor(t,e){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Ot(i,3)),this.setAttribute("uv",new Ot(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1;let u=e.depth!==void 0?e.depth:100,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:6,m=e.bevelSize!==void 0?e.bevelSize:p-2,x=e.bevelOffset!==void 0?e.bevelOffset:0,y=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,f=e.UVGenerator!==void 0?e.UVGenerator:sm;e.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),u=e.amount);let S,E=!1,T,v,R,I;g&&(S=g.getSpacedPoints(h),E=!0,d=!1,T=g.computeFrenetFrames(h,!1),v=new w,R=new w,I=new w),d||(y=0,p=0,m=0,x=0);const N=a.extractPoints(c);let B=N.shape;const H=N.holes;if(!Je.isClockWise(B)){B=B.reverse();for(let Y=0,J=H.length;Y<J;Y++){const tt=H[Y];Je.isClockWise(tt)&&(H[Y]=tt.reverse())}}const A=Je.triangulateShape(B,H),P=B;for(let Y=0,J=H.length;Y<J;Y++){const tt=H[Y];B=B.concat(tt)}function D(Y,J,tt){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().multiplyScalar(tt).add(Y)}const C=B.length,X=A.length;function Q(Y,J,tt){let at,nt,b;const M=Y.x-J.x,V=Y.y-J.y,k=tt.x-Y.x,it=tt.y-Y.y,ot=M*M+V*V,At=M*it-V*k;if(Math.abs(At)>Number.EPSILON){const pt=Math.sqrt(ot),L=Math.sqrt(k*k+it*it),j=J.x-V/pt,$=J.y+M/pt,ct=tt.x-it/L,W=tt.y+k/L,ft=((ct-j)*it-(W-$)*k)/(M*it-V*k);at=j+M*ft-Y.x,nt=$+V*ft-Y.y;const Pt=at*at+nt*nt;if(Pt<=2)return new q(at,nt);b=Math.sqrt(Pt/2)}else{let pt=!1;M>Number.EPSILON?k>Number.EPSILON&&(pt=!0):M<-Number.EPSILON?k<-Number.EPSILON&&(pt=!0):Math.sign(V)===Math.sign(it)&&(pt=!0),pt?(at=-V,nt=M,b=Math.sqrt(ot)):(at=M,nt=V,b=Math.sqrt(ot/2))}return new q(at/b,nt/b)}const Z=[];for(let Y=0,J=P.length,tt=J-1,at=Y+1;Y<J;Y++,tt++,at++)tt===J&&(tt=0),at===J&&(at=0),Z[Y]=Q(P[Y],P[tt],P[at]);const st=[];let rt,ut=Z.concat();for(let Y=0,J=H.length;Y<J;Y++){const tt=H[Y];rt=[];for(let at=0,nt=tt.length,b=nt-1,M=at+1;at<nt;at++,b++,M++)b===nt&&(b=0),M===nt&&(M=0),rt[at]=Q(tt[at],tt[b],tt[M]);st.push(rt),ut=ut.concat(rt)}for(let Y=0;Y<y;Y++){const J=Y/y,tt=p*Math.cos(J*Math.PI/2),at=m*Math.sin(J*Math.PI/2)+x;for(let nt=0,b=P.length;nt<b;nt++){const M=D(P[nt],Z[nt],at);vt(M.x,M.y,-tt)}for(let nt=0,b=H.length;nt<b;nt++){const M=H[nt];rt=st[nt];for(let V=0,k=M.length;V<k;V++){const it=D(M[V],rt[V],at);vt(it.x,it.y,-tt)}}}const xt=m+x;for(let Y=0;Y<C;Y++){const J=d?D(B[Y],ut[Y],xt):B[Y];E?(R.copy(T.normals[0]).multiplyScalar(J.x),v.copy(T.binormals[0]).multiplyScalar(J.y),I.copy(S[0]).add(R).add(v),vt(I.x,I.y,I.z)):vt(J.x,J.y,0)}for(let Y=1;Y<=h;Y++)for(let J=0;J<C;J++){const tt=d?D(B[J],ut[J],xt):B[J];E?(R.copy(T.normals[Y]).multiplyScalar(tt.x),v.copy(T.binormals[Y]).multiplyScalar(tt.y),I.copy(S[Y]).add(R).add(v),vt(I.x,I.y,I.z)):vt(tt.x,tt.y,u/h*Y)}for(let Y=y-1;Y>=0;Y--){const J=Y/y,tt=p*Math.cos(J*Math.PI/2),at=m*Math.sin(J*Math.PI/2)+x;for(let nt=0,b=P.length;nt<b;nt++){const M=D(P[nt],Z[nt],at);vt(M.x,M.y,u+tt)}for(let nt=0,b=H.length;nt<b;nt++){const M=H[nt];rt=st[nt];for(let V=0,k=M.length;V<k;V++){const it=D(M[V],rt[V],at);E?vt(it.x,it.y+S[h-1].y,S[h-1].x+tt):vt(it.x,it.y,u+tt)}}}G(),Bt();function G(){const Y=i.length/3;if(d){let J=0,tt=C*J;for(let at=0;at<X;at++){const nt=A[at];dt(nt[2]+tt,nt[1]+tt,nt[0]+tt)}J=h+y*2,tt=C*J;for(let at=0;at<X;at++){const nt=A[at];dt(nt[0]+tt,nt[1]+tt,nt[2]+tt)}}else{for(let J=0;J<X;J++){const tt=A[J];dt(tt[2],tt[1],tt[0])}for(let J=0;J<X;J++){const tt=A[J];dt(tt[0]+C*h,tt[1]+C*h,tt[2]+C*h)}}n.addGroup(Y,i.length/3-Y,0)}function Bt(){const Y=i.length/3;let J=0;St(P,J),J+=P.length;for(let tt=0,at=H.length;tt<at;tt++){const nt=H[tt];St(nt,J),J+=nt.length}n.addGroup(Y,i.length/3-Y,1)}function St(Y,J){let tt=Y.length;for(;--tt>=0;){const at=tt;let nt=tt-1;nt<0&&(nt=Y.length-1);for(let b=0,M=h+y*2;b<M;b++){const V=C*b,k=C*(b+1),it=J+at+V,ot=J+nt+V,At=J+nt+k,pt=J+at+k;Tt(it,ot,At,pt)}}}function vt(Y,J,tt){l.push(Y),l.push(J),l.push(tt)}function dt(Y,J,tt){Mt(Y),Mt(J),Mt(tt);const at=i.length/3,nt=f.generateTopUV(n,i,at-3,at-2,at-1);bt(nt[0]),bt(nt[1]),bt(nt[2])}function Tt(Y,J,tt,at){Mt(Y),Mt(J),Mt(at),Mt(J),Mt(tt),Mt(at);const nt=i.length/3,b=f.generateSideWallUV(n,i,nt-6,nt-3,nt-2,nt-1);bt(b[0]),bt(b[1]),bt(b[3]),bt(b[1]),bt(b[2]),bt(b[3])}function Mt(Y){i.push(l[Y*3+0]),i.push(l[Y*3+1]),i.push(l[Y*3+2])}function bt(Y){s.push(Y.x),s.push(Y.y)}}}toJSON(){const t=Rt.prototype.toJSON.call(this),e=this.parameters.shapes,n=this.parameters.options;return om(e,n,t)}}const sm={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new q(s,o),new q(a,l),new q(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],p=t[i*3+1],m=t[i*3+2],x=t[s*3],y=t[s*3+1],g=t[s*3+2];return Math.abs(a-h)<.01?[new q(o,1-l),new q(c,1-u),new q(d,1-m),new q(x,1-g)]:[new q(a,1-l),new q(h,1-u),new q(p,1-m),new q(y,1-g)]}};function om(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class am extends Rt{constructor(t,e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ot(i,3)),this.setAttribute("normal",new Ot(s,3)),this.setAttribute("uv",new Ot(o,2));function c(h){const u=i.length/3,d=h.extractPoints(e);let p=d.shape;const m=d.holes;Je.isClockWise(p)===!1&&(p=p.reverse());for(let y=0,g=m.length;y<g;y++){const f=m[y];Je.isClockWise(f)===!0&&(m[y]=f.reverse())}const x=Je.triangulateShape(p,m);for(let y=0,g=m.length;y<g;y++){const f=m[y];p=p.concat(f)}for(let y=0,g=p.length;y<g;y++){const f=p[y];i.push(f.x,f.y,0),s.push(0,0,1),o.push(f.x,f.y)}for(let y=0,g=x.length;y<g;y++){const f=x[y],S=f[0]+u,E=f[1]+u,T=f[2]+u;n.push(S,E,T),l+=3}}}toJSON(){const t=Rt.prototype.toJSON.call(this),e=this.parameters.shapes;return lm(e,t)}}function lm(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class ja extends Rt{constructor(t=1,e=8,n=6,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new w,d=new w,p=[],m=[],x=[],y=[];for(let g=0;g<=n;g++){const f=[],S=g/n;let E=0;g==0&&o==0?E=.5/e:g==n&&l==Math.PI&&(E=-.5/e);for(let T=0;T<=e;T++){const v=T/e;u.x=-t*Math.cos(i+v*s)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(i+v*s)*Math.sin(o+S*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),y.push(v+E,1-S),f.push(c++)}h.push(f)}for(let g=0;g<n;g++)for(let f=0;f<e;f++){const S=h[g][f+1],E=h[g][f],T=h[g+1][f],v=h[g+1][f+1];(g!==0||o>0)&&p.push(S,E,v),(g!==n-1||l<Math.PI)&&p.push(E,T,v)}this.setIndex(p),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(x,3)),this.setAttribute("uv",new Ot(y,2))}}class cm extends $t{constructor(t){super(),this.type="ShadowMaterial",this.color=new lt(0),this.transparent=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this}}cm.prototype.isShadowMaterial=!0;class hm extends cn{constructor(t){super(t),this.type="RawShaderMaterial"}}hm.prototype.isRawShaderMaterial=!0;class Fn extends $t{constructor(t){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zn,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.vertexTangents=!1,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this.vertexTangents=t.vertexTangents,this}}Fn.prototype.isMeshStandardMaterial=!0;class um extends Fn{constructor(t){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(e){this.reflectivity=fe(2.5*(e-1)/(e+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.reflectivity=t.reflectivity,t.sheen?this.sheen=(this.sheen||new lt).copy(t.sheen):this.sheen=null,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this}}um.prototype.isMeshPhysicalMaterial=!0;class dm extends $t{constructor(t){super(),this.type="MeshPhongMaterial",this.color=new lt(16777215),this.specular=new lt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zn,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}dm.prototype.isMeshPhongMaterial=!0;class fm extends $t{constructor(t){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new lt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zn,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this}}fm.prototype.isMeshToonMaterial=!0;class pm extends $t{constructor(t){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zn,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}pm.prototype.isMeshNormalMaterial=!0;class mm extends $t{constructor(t){super(),this.type="MeshLambertMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this}}mm.prototype.isMeshLambertMaterial=!0;class gm extends $t{constructor(t){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new lt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zn,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}gm.prototype.isMeshMatcapMaterial=!0;class xm extends yi{constructor(t){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}xm.prototype.isLineDashedMaterial=!0;const Ht={arraySlice:function(r,t,e){return Ht.isTypedArray(r)?new r.constructor(r.subarray(t,e!==void 0?e:r.length)):r.slice(t,e)},convertArray:function(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)},isTypedArray:function(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)},getKeyframeOrder:function(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n},sortedArray:function(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let l=0;l!==t;++l)i[o++]=r[a+l]}return i},flattenJSON:function(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)},subclip:function(r,t,e,n,i=30){const s=r.clone();s.name=t;const o=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let p=0;p<c.times.length;++p){const m=c.times[p]*i;if(!(m<e||m>=n)){u.push(c.times[p]);for(let x=0;x<h;++x)d.push(c.values[p*h+x])}}u.length!==0&&(c.times=Ht.convertArray(u,c.times.constructor),c.values=Ht.convertArray(d,c.values.constructor),o.push(c))}s.tracks=o;let a=1/0;for(let l=0;l<s.tracks.length;++l)a>s.tracks[l].times[0]&&(a=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*a);return s.resetDuration(),s},makeClipAdditive:function(r,t=0,e=r,n=30){n<=0&&(n=30);const i=e.tracks.length,s=t/n;for(let o=0;o<i;++o){const a=e.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(g){return g.name===a.name&&g.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const p=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=p/3);const m=a.times.length-1;let x;if(s<=a.times[0]){const g=h,f=u-h;x=Ht.arraySlice(a.values,g,f)}else if(s>=a.times[m]){const g=m*u+h,f=g+u-h;x=Ht.arraySlice(a.values,g,f)}else{const g=a.createInterpolant(),f=h,S=u-h;g.evaluate(s),x=Ht.arraySlice(g.resultBuffer,f,S)}l==="quaternion"&&new ie().fromArray(x).normalize().conjugate().toArray(x);const y=c.times.length;for(let g=0;g<y;++g){const f=g*p+d;if(l==="quaternion")ie.multiplyQuaternionsFlat(c.values,f,x,0,c.values,f);else{const S=p-d*2;for(let E=0;E<S;++E)c.values[f+E]-=x[E]}}}return r.blendMode=ya,r}};class $e{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,t,s)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.beforeStart_(0,t,i);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.beforeStart_(0,t,i);if(i===void 0)return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,s,t)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}$e.prototype.beforeStart_=$e.prototype.copySampleValue_;$e.prototype.afterEnd_=$e.prototype.copySampleValue_;class vm extends $e{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rn,endingEnd:Rn}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Pn:s=t,a=2*e-n;break;case er:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Pn:o=t,l=2*n-e;break;case er:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(n-e)/(i-e),x=m*m,y=x*m,g=-d*y+2*d*x-d*m,f=(1+d)*y+(-1.5-2*d)*x+(-.5+d)*m+1,S=(-1-p)*y+(1.5+p)*x+.5*m,E=p*y-p*x;for(let T=0;T!==a;++T)s[T]=g*o[h+T]+f*o[c+T]+S*o[l+T]+E*o[u+T];return s}}class Ja extends $e{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class ym extends $e{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Ie{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ht.convertArray(e,this.TimeBufferType),this.values=Ht.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ht.convertArray(t.times,Array),values:Ht.convertArray(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ym(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new vm(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ki:e=this.InterpolantFactoryMethodDiscrete;break;case tr:e=this.InterpolantFactoryMethodLinear;break;case yr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ki;case this.InterpolantFactoryMethodLinear:return tr;case this.InterpolantFactoryMethodSmooth:return yr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=Ht.arraySlice(n,s,o),this.values=Ht.arraySlice(this.values,s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Ht.isTypedArray(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=Ht.arraySlice(this.times),e=Ht.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===yr,s=t.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,d=u-n,p=u+n;for(let m=0;m!==n;++m){const x=e[u+m];if(x!==e[d+m]||x!==e[p+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=Ht.arraySlice(t,0,o),this.values=Ht.arraySlice(e,0,o*n)):(this.times=t,this.values=e),this}clone(){const t=Ht.arraySlice(this.times,0),e=Ht.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Ie.prototype.TimeBufferType=Float32Array;Ie.prototype.ValueBufferType=Float32Array;Ie.prototype.DefaultInterpolation=tr;class kn extends Ie{}kn.prototype.ValueTypeName="bool";kn.prototype.ValueBufferType=Array;kn.prototype.DefaultInterpolation=Ki;kn.prototype.InterpolantFactoryMethodLinear=void 0;kn.prototype.InterpolantFactoryMethodSmooth=void 0;class Qa extends Ie{}Qa.prototype.ValueTypeName="color";class ir extends Ie{}ir.prototype.ValueTypeName="number";class _m extends $e{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)ie.slerpFlat(s,0,o,c-a,o,c,l);return s}}class _i extends Ie{InterpolantFactoryMethodLinear(t){return new _m(this.times,this.values,this.getValueSize(),t)}}_i.prototype.ValueTypeName="quaternion";_i.prototype.DefaultInterpolation=tr;_i.prototype.InterpolantFactoryMethodSmooth=void 0;class Wn extends Ie{}Wn.prototype.ValueTypeName="string";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=Ki;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;class rr extends Ie{}rr.prototype.ValueTypeName="vector";class Ko{constructor(t,e=-1,n,i=xs){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Re(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(wm(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(Ie.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=Ht.getKeyframeOrder(l);l=Ht.sortedArray(l,1,h),c=Ht.sortedArray(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ir(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,m,x){if(p.length!==0){const y=[],g=[];Ht.flattenJSON(p,y,g,m),y.length!==0&&x.push(new u(d,y,g))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)p[d[m].morphTargets[x]]=-1;for(const x in p){const y=[],g=[];for(let f=0;f!==d[m].morphTargets.length;++f){const S=d[m];y.push(S.time),g.push(S.morphTarget===x?1:0)}i.push(new ir(".morphTargetInfluence["+x+"]",y,g))}l=p.length*o}else{const p=".bones["+e[u].name+"]";n(rr,p+".position",d,"pos",i),n(_i,p+".quaternion",d,"rot",i),n(rr,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Mm(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ir;case"vector":case"vector2":case"vector3":case"vector4":return rr;case"color":return Qa;case"quaternion":return _i;case"bool":case"boolean":return kn;case"string":return Wn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function wm(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Mm(r.type);if(r.times===void 0){const e=[],n=[];Ht.flattenJSON(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const Bn={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class bm{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],m=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}}const Sm=new bm;class Ke{constructor(t){this.manager=t!==void 0?t:Sm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}const Me={};class Em extends Ke{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Bn.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;if(Me[t]!==void 0){Me[t].push({onLoad:e,onProgress:n,onError:i});return}const a=/^data:(.*?)(;base64)?,(.*)$/,l=t.match(a);let c;if(l){const h=l[1],u=!!l[2];let d=l[3];d=decodeURIComponent(d),u&&(d=atob(d));try{let p;const m=(this.responseType||"").toLowerCase();switch(m){case"arraybuffer":case"blob":const x=new Uint8Array(d.length);for(let g=0;g<d.length;g++)x[g]=d.charCodeAt(g);m==="blob"?p=new Blob([x.buffer],{type:h}):p=x.buffer;break;case"document":p=new DOMParser().parseFromString(d,h);break;case"json":p=JSON.parse(d);break;default:p=d;break}setTimeout(function(){e&&e(p),s.manager.itemEnd(t)},0)}catch(p){setTimeout(function(){i&&i(p),s.manager.itemError(t),s.manager.itemEnd(t)},0)}}else{Me[t]=[],Me[t].push({onLoad:e,onProgress:n,onError:i}),c=new XMLHttpRequest,c.open("GET",t,!0),c.addEventListener("load",function(h){const u=this.response,d=Me[t];if(delete Me[t],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),Bn.add(t,u);for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onLoad&&x.onLoad(u)}s.manager.itemEnd(t)}else{for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onError&&x.onError(h)}s.manager.itemError(t),s.manager.itemEnd(t)}},!1),c.addEventListener("progress",function(h){const u=Me[t];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onProgress&&m.onProgress(h)}},!1),c.addEventListener("error",function(h){const u=Me[t];delete Me[t];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onError&&m.onError(h)}s.manager.itemError(t),s.manager.itemEnd(t)},!1),c.addEventListener("abort",function(h){const u=Me[t];delete Me[t];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onError&&m.onError(h)}s.manager.itemError(t),s.manager.itemEnd(t)},!1),this.responseType!==void 0&&(c.responseType=this.responseType),this.withCredentials!==void 0&&(c.withCredentials=this.withCredentials),c.overrideMimeType&&c.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(const h in this.requestHeader)c.setRequestHeader(h,this.requestHeader[h]);c.send(null)}return s.manager.itemStart(t),c}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class $a extends Ke{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Bn.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=document.createElementNS("http://www.w3.org/1999/xhtml","img");function l(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1),Bn.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(h){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1),i&&i(h),s.manager.itemError(t),s.manager.itemEnd(t)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class Tm extends Ke{constructor(t){super(t)}load(t,e,n,i){const s=new ur,o=new $a(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(t[c],function(h){s.images[c]=h,a++,a===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return s}}class Am extends Ke{constructor(t){super(t)}load(t,e,n,i){const s=new ee,o=new $a(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a;const l=t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0;s.format=l?an:be,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class me{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,p=(o-h)/d;return(i+p)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new q:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new w,i=[],s=[],o=[],a=new w,l=new ht;for(let p=0;p<=t;p++){const m=p/t;i[p]=this.getTangentAt(m,new w),i[p].normalize()}s[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(fe(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(i[p],s[p])}if(e===!0){let p=Math.acos(fe(s[0].dot(s[t]),-1,1));p/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],p*m)),o[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class mr extends me{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e){const n=e||new q,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}mr.prototype.isEllipseCurve=!0;class Ka extends mr{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.type="ArcCurve"}}Ka.prototype.isArcCurve=!0;function Es(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,i(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Yi=new w,Jr=new Es,Qr=new Es,$r=new Es;class tl extends me{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new w){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Yi.subVectors(i[0],i[1]).add(i[0]),c=Yi);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Yi.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Yi),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),y=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),m<1e-4&&(m=x),y<1e-4&&(y=x),Jr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,y),Qr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,y),$r.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,y)}else this.curveType==="catmullrom"&&(Jr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Qr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),$r.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Jr.calc(l),Qr.calc(l),$r.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new w().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}tl.prototype.isCatmullRomCurve3=!0;function ta(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function Lm(r,t){const e=1-r;return e*e*t}function Cm(r,t){return 2*(1-r)*r*t}function Rm(r,t){return r*r*t}function ai(r,t,e,n){return Lm(r,t)+Cm(r,e)+Rm(r,n)}function Pm(r,t){const e=1-r;return e*e*e*t}function Im(r,t){const e=1-r;return 3*e*e*r*t}function Dm(r,t){return 3*(1-r)*r*r*t}function Nm(r,t){return r*r*r*t}function li(r,t,e,n,i){return Pm(r,t)+Im(r,e)+Dm(r,n)+Nm(r,i)}class Ts extends me{constructor(t=new q,e=new q,n=new q,i=new q){super(),this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new q){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(li(t,i.x,s.x,o.x,a.x),li(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}Ts.prototype.isCubicBezierCurve=!0;class el extends me{constructor(t=new w,e=new w,n=new w,i=new w){super(),this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new w){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(li(t,i.x,s.x,o.x,a.x),li(t,i.y,s.y,o.y,a.y),li(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}el.prototype.isCubicBezierCurve3=!0;class gr extends me{constructor(t=new q,e=new q){super(),this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e){const n=e||new q;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}gr.prototype.isLineCurve=!0;class Fm extends me{constructor(t=new w,e=new w){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=t,this.v2=e}getPoint(t,e=new w){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class As extends me{constructor(t=new q,e=new q,n=new q){super(),this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new q){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(ai(t,i.x,s.x,o.x),ai(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}As.prototype.isQuadraticBezierCurve=!0;class nl extends me{constructor(t=new w,e=new w,n=new w){super(),this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new w){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(ai(t,i.x,s.x,o.x),ai(t,i.y,s.y,o.y),ai(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}nl.prototype.isQuadraticBezierCurve3=!0;class Ls extends me{constructor(t=[]){super(),this.type="SplineCurve",this.points=t}getPoint(t,e=new q){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ta(a,l.x,c.x,h.x,u.x),ta(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new q().fromArray(i))}return this}}Ls.prototype.isSplineCurve=!0;var Bm=Object.freeze({__proto__:null,ArcCurve:Ka,CatmullRomCurve3:tl,CubicBezierCurve:Ts,CubicBezierCurve3:el,EllipseCurve:mr,LineCurve:gr,LineCurve3:Fm,QuadraticBezierCurve:As,QuadraticBezierCurve3:nl,SplineCurve:Ls});class zm extends me{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);t.equals(e)||this.curves.push(new gr(e,t))}getPoint(t){const e=t*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=e){const s=n[i]-e,o=this.curves[i],a=o.getLength(),l=a===0?0:1-s/a;return o.getPointAt(l)}i++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o&&o.isEllipseCurve?t*2:o&&(o.isLineCurve||o.isLineCurve3)?1:o&&o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Bm[i.type]().fromJSON(i))}return this}}class cs extends zm{constructor(t){super(),this.type="Path",this.currentPoint=new q,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new gr(this.currentPoint.clone(),new q(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new As(this.currentPoint.clone(),new q(t,e),new q(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Ts(this.currentPoint.clone(),new q(t,e),new q(n,i),new q(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ls(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new mr(t,e,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Cs extends cs{constructor(t){super(t),this.uuid=Re(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new cs().fromJSON(i))}return this}}class Pe extends Ct{constructor(t,e=1){super(),this.type="Light",this.color=new lt(t),this.intensity=e}dispose(){}copy(t){return super.copy(t),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}Pe.prototype.isLight=!0;class Om extends Pe{constructor(t,e,n){super(t,n),this.type="HemisphereLight",this.position.copy(Ct.DefaultUp),this.updateMatrix(),this.groundColor=new lt(e)}copy(t){return Pe.prototype.copy.call(this,t),this.groundColor.copy(t.groundColor),this}}Om.prototype.isHemisphereLight=!0;const ea=new ht,na=new w,ia=new w;class Rs{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new q(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;na.setFromMatrixPosition(t.matrixWorld),e.position.copy(na),ia.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ia),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(e.projectionMatrix),n.multiply(e.matrixWorldInverse)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class il extends Rs{constructor(){super(new he(50,1,.5,500)),this.focus=1}updateMatrices(t){const e=this.camera,n=rs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}il.prototype.isSpotLightShadow=!0;class Um extends Pe{constructor(t,e,n=0,i=Math.PI/3,s=0,o=1){super(t,e),this.type="SpotLight",this.position.copy(Ct.DefaultUp),this.updateMatrix(),this.target=new Ct,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.shadow=new il}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}Um.prototype.isSpotLight=!0;const ra=new ht,ti=new w,Kr=new w;class rl extends Rs{constructor(){super(new he(90,1,.5,500)),this._frameExtents=new q(4,2),this._viewportCount=6,this._viewports=[new Nt(2,1,1,1),new Nt(0,1,1,1),new Nt(3,1,1,1),new Nt(1,1,1,1),new Nt(3,0,1,1),new Nt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ti.setFromMatrixPosition(t.matrixWorld),n.position.copy(ti),Kr.copy(n.position),Kr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Kr),n.updateMatrixWorld(),i.makeTranslation(-ti.x,-ti.y,-ti.z),ra.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra)}}rl.prototype.isPointLightShadow=!0;class sl extends Pe{constructor(t,e,n=0,i=1){super(t,e),this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new rl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}sl.prototype.isPointLight=!0;class ol extends vs{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}ol.prototype.isOrthographicCamera=!0;class al extends Rs{constructor(){super(new ol(-5,5,5,-5,.5,500))}}al.prototype.isDirectionalLightShadow=!0;class hs extends Pe{constructor(t,e){super(t,e),this.type="DirectionalLight",this.position.copy(Ct.DefaultUp),this.updateMatrix(),this.target=new Ct,this.shadow=new al}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}hs.prototype.isDirectionalLight=!0;class ll extends Pe{constructor(t,e){super(t,e),this.type="AmbientLight"}}ll.prototype.isAmbientLight=!0;class Hm extends Pe{constructor(t,e,n=10,i=10){super(t,e),this.type="RectAreaLight",this.width=n,this.height=i}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}Hm.prototype.isRectAreaLight=!0;class cl{constructor(){this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new w)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*i),e.addScaledVector(o[2],.488603*s),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*i)),e.addScaledVector(o[5],1.092548*(i*s)),e.addScaledVector(o[6],.315392*(3*s*s-1)),e.addScaledVector(o[7],1.092548*(n*s)),e.addScaledVector(o[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],2*.511664*i),e.addScaledVector(o[2],2*.511664*s),e.addScaledVector(o[3],2*.511664*n),e.addScaledVector(o[4],2*.429043*n*i),e.addScaledVector(o[5],2*.429043*i*s),e.addScaledVector(o[6],.743125*s*s-.247708),e.addScaledVector(o[7],2*.429043*n*s),e.addScaledVector(o[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}cl.prototype.isSphericalHarmonics3=!0;class Ps extends Pe{constructor(t=new cl,e=1){super(void 0,e),this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}Ps.prototype.isLightProbe=!0;class Gm{static decodeText(t){if(typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.substr(0,e+1)}}class Vm extends Rt{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){const t=super.toJSON(this);return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}Vm.prototype.isInstancedBufferGeometry=!0;class km extends jt{constructor(t,e,n,i){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(t,e,n),this.meshPerAttribute=i||1}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}km.prototype.isInstancedBufferAttribute=!0;class Wm extends Ke{constructor(t){super(t),typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Bn.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){Bn.add(t,l),e&&e(l),s.manager.itemEnd(t)}).catch(function(l){i&&i(l),s.manager.itemError(t),s.manager.itemEnd(t)}),s.manager.itemStart(t)}}Wm.prototype.isImageBitmapLoader=!0;let Zi;const Xm={getContext:function(){return Zi===void 0&&(Zi=new(window.AudioContext||window.webkitAudioContext)),Zi},setContext:function(r){Zi=r}};class qm extends Ke{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Em(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{const l=a.slice(0);Xm.getContext().decodeAudioData(l,function(h){e(h)})}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}}class Ym extends Ps{constructor(t,e,n=1){super(void 0,n);const i=new lt().set(t),s=new lt().set(e),o=new w(i.r,i.g,i.b),a=new w(s.r,s.g,s.b),l=Math.sqrt(Math.PI),c=l*Math.sqrt(.75);this.sh.coefficients[0].copy(o).add(a).multiplyScalar(l),this.sh.coefficients[1].copy(o).sub(a).multiplyScalar(c)}}Ym.prototype.isHemisphereLightProbe=!0;class Zm extends Ps{constructor(t,e=1){super(void 0,e);const n=new lt().set(t);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}}Zm.prototype.isAmbientLightProbe=!0;class jm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=sa(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=sa();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function sa(){return(typeof performance>"u"?Date:performance).now()}class Jm extends Ct{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){if(this.detune=t,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}class Qm{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){ie.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;ie.multiplyQuaternionsFlat(t,o,t,e,t,n),ie.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Is="\\[\\]\\.:\\/",$m=new RegExp("["+Is+"]","g"),Ds="[^"+Is+"]",Km="[^"+Is.replace("\\.","")+"]",tg=/((?:WC+[\/:])*)/.source.replace("WC",Ds),eg=/(WCOD+)?/.source.replace("WCOD",Km),ng=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ds),ig=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ds),rg=new RegExp("^"+tg+eg+ng+ig+"$"),sg=["material","materials","bones"];class og{constructor(t,e,n){const i=n||Dt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class Dt{constructor(t,e,n){this.path=e,this.parsedPath=n||Dt.parseTrackName(e),this.node=Dt.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Dt.Composite(t,e,n):new Dt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($m,"")}static parseTrackName(t){const e=rg.exec(t);if(!e)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);sg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(!e||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.node[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=Dt.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(t.geometry.isBufferGeometry){if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Dt.Composite=og;Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray];Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ag{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),l={endingStart:Rn,endingEnd:Rn};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Hc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;if(l<0||n===0)return;this._startTime=null,e=n*l}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ya:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case xs:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===Gc;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===Uc){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Pn,i.endingEnd=Pn):(t?i.endingStart=this.zeroSlopeAtStart?Pn:Rn:i.endingStart=er,e?i.endingEnd=this.zeroSlopeAtEnd?Pn:Rn:i.endingEnd=er)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=e,a[1]=s+t,l[1]=n,this}}class lg extends hn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],p=d.name;let m=h[p];if(m!==void 0)o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,p));continue}const x=e&&e._propertyBindings[u].binding.parsedPath;m=new Qm(Dt.create(n,p,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,p),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Ja(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?Ko.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=xs),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new ag(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Ko.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}lg.prototype._controlInterpolantsResultBuffer=new Float32Array(1);class cg extends un{constructor(t,e,n=1){super(t,e),this.meshPerAttribute=n||1}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}cg.prototype.isInstancedInterleavedBuffer=!0;class hg extends Ct{constructor(t){super(),this.material=t,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}}hg.prototype.isImmediateRenderObject=!0;const Ye=new w,ji=new ht,ts=new ht;class ug extends ws{constructor(t){const e=hl(t),n=new Rt,i=[],s=[],o=new lt(0,0,1),a=new lt(0,1,0);for(let c=0;c<e.length;c++){const h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(o.r,o.g,o.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new Ot(i,3)),n.setAttribute("color",new Ot(s,3));const l=new yi({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");ts.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<e.length;s++){const a=e[s];a.parent&&a.parent.isBone&&(ji.multiplyMatrices(ts,a.matrixWorld),Ye.setFromMatrixPosition(ji),i.setXYZ(o,Ye.x,Ye.y,Ye.z),ji.multiplyMatrices(ts,a.parent.matrixWorld),Ye.setFromMatrixPosition(ji),i.setXYZ(o+1,Ye.x,Ye.y,Ye.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}}function hl(r){const t=[];r&&r.isBone&&t.push(r);for(let e=0;e<r.children.length;e++)t.push.apply(t,hl(r.children[e]));return t}class dg extends ws{constructor(t=10,e=10,n=4473924,i=8947848){n=new lt(n),i=new lt(i);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,p=0,m=-a;d<=e;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const x=d===s?n:i;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const h=new Rt;h.setAttribute("position",new Ot(l,3)),h.setAttribute("color",new Ot(c,3));const u=new yi({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}}const fg=new Float32Array(1);new Int32Array(fg.buffer);const pg=new cr({side:Qt,depthWrite:!1,depthTest:!1});new ae(new hr,pg);me.create=function(r,t){return console.log("THREE.Curve.create() has been deprecated"),r.prototype=Object.create(me.prototype),r.prototype.constructor=r,r.prototype.getPoint=t,r};cs.prototype.fromPoints=function(r){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(r)};dg.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};ug.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};Ke.prototype.extractUrlBase=function(r){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Gm.extractUrlBase(r)};Ke.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}};ge.prototype.center=function(r){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(r)};ge.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()};ge.prototype.isIntersectionBox=function(r){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(r)};ge.prototype.isIntersectionSphere=function(r){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(r)};ge.prototype.size=function(r){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(r)};Un.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()};dr.prototype.setFromMatrix=function(r){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(r)};te.prototype.flattenToArrayOffset=function(r,t){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(r,t)};te.prototype.multiplyVector3=function(r){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),r.applyMatrix3(this)};te.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")};te.prototype.applyToBufferAttribute=function(r){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),r.applyMatrix3(this)};te.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")};te.prototype.getInverse=function(r){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(r).invert()};ht.prototype.extractPosition=function(r){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(r)};ht.prototype.flattenToArrayOffset=function(r,t){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(r,t)};ht.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new w().setFromMatrixColumn(this,3)};ht.prototype.setRotationFromQuaternion=function(r){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(r)};ht.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")};ht.prototype.multiplyVector3=function(r){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),r.applyMatrix4(this)};ht.prototype.multiplyVector4=function(r){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),r.applyMatrix4(this)};ht.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")};ht.prototype.rotateAxis=function(r){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),r.transformDirection(this)};ht.prototype.crossVector=function(r){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),r.applyMatrix4(this)};ht.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")};ht.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")};ht.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")};ht.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")};ht.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")};ht.prototype.applyToBufferAttribute=function(r){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),r.applyMatrix4(this)};ht.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")};ht.prototype.makeFrustum=function(r,t,e,n,i,s){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(r,t,n,e,i,s)};ht.prototype.getInverse=function(r){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(r).invert()};Te.prototype.isIntersectionLine=function(r){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(r)};ie.prototype.multiplyVector3=function(r){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),r.applyQuaternion(this)};ie.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()};Hn.prototype.isIntersectionBox=function(r){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(r)};Hn.prototype.isIntersectionPlane=function(r){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(r)};Hn.prototype.isIntersectionSphere=function(r){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(r)};Zt.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()};Zt.prototype.barycoordFromPoint=function(r,t){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(r,t)};Zt.prototype.midpoint=function(r){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(r)};Zt.prototypenormal=function(r){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(r)};Zt.prototype.plane=function(r){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(r)};Zt.barycoordFromPoint=function(r,t,e,n,i){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),Zt.getBarycoord(r,t,e,n,i)};Zt.normal=function(r,t,e,n){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),Zt.getNormal(r,t,e,n)};Cs.prototype.extractAllPoints=function(r){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(r)};Cs.prototype.extrude=function(r){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new pr(this,r)};Cs.prototype.makeGeometry=function(r){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new am(this,r)};q.prototype.fromAttribute=function(r,t,e){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(r,t,e)};q.prototype.distanceToManhattan=function(r){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(r)};q.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};w.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")};w.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")};w.prototype.getPositionFromMatrix=function(r){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(r)};w.prototype.getScaleFromMatrix=function(r){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(r)};w.prototype.getColumnFromMatrix=function(r,t){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(t,r)};w.prototype.applyProjection=function(r){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(r)};w.prototype.fromAttribute=function(r,t,e){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(r,t,e)};w.prototype.distanceToManhattan=function(r){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(r)};w.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Nt.prototype.fromAttribute=function(r,t,e){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(r,t,e)};Nt.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Ct.prototype.getChildByName=function(r){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(r)};Ct.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")};Ct.prototype.translate=function(r,t){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(t,r)};Ct.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")};Ct.prototype.applyMatrix=function(r){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(r)};Object.defineProperties(Ct.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(r){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=r}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});ae.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")};Object.defineProperties(ae.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),Vc},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}});ka.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")};he.prototype.setLens=function(r,t){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),t!==void 0&&(this.filmGauge=t),this.setFocalLength(r)};Object.defineProperties(Pe.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(r){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=r}},shadowCameraLeft:{set:function(r){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=r}},shadowCameraRight:{set:function(r){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=r}},shadowCameraTop:{set:function(r){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=r}},shadowCameraBottom:{set:function(r){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=r}},shadowCameraNear:{set:function(r){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=r}},shadowCameraFar:{set:function(r){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=r}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(r){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=r}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(r){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=r}},shadowMapHeight:{set:function(r){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=r}}});Object.defineProperties(jt.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===nr},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(nr)}}});jt.prototype.setDynamic=function(r){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(r===!0?nr:ui),this};jt.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},jt.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};Rt.prototype.addIndex=function(r){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(r)};Rt.prototype.addAttribute=function(r,t){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(t&&t.isBufferAttribute)&&!(t&&t.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(r,new jt(arguments[1],arguments[2]))):r==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(t),this):this.setAttribute(r,t)};Rt.prototype.addDrawCall=function(r,t,e){e!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(r,t)};Rt.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()};Rt.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")};Rt.prototype.removeAttribute=function(r){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(r)};Rt.prototype.applyMatrix=function(r){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(r)};Object.defineProperties(Rt.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}});un.prototype.setDynamic=function(r){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(r===!0?nr:ui),this};un.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};pr.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")};pr.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")};pr.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")};_s.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")};Object.defineProperties($t.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new lt}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(r){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=r===pa}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(r){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=r}}});Object.defineProperties(cn.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(r){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=r}}});Ft.prototype.clearTarget=function(r,t,e,n){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(r),this.clear(t,e,n)};Ft.prototype.animate=function(r){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(r)};Ft.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()};Ft.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()};Ft.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision};Ft.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()};Ft.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")};Ft.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")};Ft.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")};Ft.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")};Ft.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")};Ft.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")};Ft.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures};Ft.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")};Ft.prototype.enableScissorTest=function(r){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(r)};Ft.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")};Ft.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")};Ft.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")};Ft.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")};Ft.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")};Ft.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")};Ft.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")};Ft.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")};Ft.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")};Ft.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()};Object.defineProperties(Ft.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(r){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=r}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(r){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=r}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(r){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=r===!0?_a:vi}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}});Object.defineProperties(Ua.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(ln.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(r){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=r}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(r){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=r}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(r){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=r}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(r){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=r}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(r){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=r}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(r){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=r}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(r){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=r}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(r){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=r}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(r){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=r}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(r){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=r}}});Jm.prototype.load=function(r){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const t=this;return new qm().load(r,function(n){t.setBuffer(n)}),this};ys.prototype.updateCubeMap=function(r,t){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(r,t)};ys.prototype.clear=function(r,t,e,n){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(r,t,e,n)};On.crossOrigin=void 0;On.loadTexture=function(r,t,e,n){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const i=new Am;i.setCrossOrigin(this.crossOrigin);const s=i.load(r,e,void 0,n);return t&&(s.mapping=t),s};On.loadTextureCube=function(r,t,e,n){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const i=new Tm;i.setCrossOrigin(this.crossOrigin);const s=i.load(r,e,void 0,n);return t&&(s.mapping=t),s};On.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};On.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ua}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ua);function mg(){const r=document.createElement("canvas");r.width=512,r.height=512;const t=r.getContext("2d"),e=t.createImageData(512,512);for(let i=0;i<e.data.length;i+=4){const s=Math.floor(100+Math.random()*140);e.data[i]=s,e.data[i+1]=s,e.data[i+2]=s,e.data[i+3]=255}t.putImageData(e,0,0);const n=new Ss(r);return n.wrapS=ci,n.wrapT=ci,n.repeat.set(2,2),n}function gg(){const r=document.createElement("canvas");r.width=64,r.height=64;const t=r.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255, 255, 255, 1.0)"),e.addColorStop(.2,"rgba(255, 200, 140, 0.6)"),e.addColorStop(.5,"rgba(120, 80, 200, 0.15)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Ss(r)}const ul=new lt(526346),xg=new lt(15265007);function vg(){const r=new _s;return r.background=ul.clone(),r}function yg(){const r=new he(50,window.innerWidth/window.innerHeight,.001,100);return r.position.set(0,0,7.5),r}function _g(r){const t=new Ft({antialias:!0,powerPreference:"high-performance"});return t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.shadowMap.enabled=!0,t.shadowMap.type=fa,t.toneMapping=xa,t.toneMappingExposure=1.2,r.appendChild(t.domElement),t}function Mg(r,t){const e=new sl(16755268,9.5,16);e.position.set(0,0,0),e.castShadow=!0,r.add(e);const n=new ae(new ja(.022,16,16),new cr({color:16765064}));r.add(n);const i=new hs(16775146,1.8);i.position.set(3.5,5,4),i.castShadow=!0,t.add(i);const s=new hs(16772568,.5);s.position.set(-4,-3,-3),t.add(s);const o=new ll(16769216,.45);return t.add(o),{coreLight:e,coreOrbMesh:n,sunKeyLight:i,sunShaftLight:s,ambientLight:o}}function wg(){return{targetZoom:7.5,currentZoom:7.5,targetRotX:.35,targetRotY:.65,targetCoreIntensity:9.5,isOrbitingMode:!1,isExternalSunMode:!1,showGas:!0,showMoss:!0,isDragging:!1,prevX:0,prevY:0}}const bg={outside:{zoom:7.5,rotX:.35,rotY:.65,coreIntensity:9.5,orbit:!1},inside:{zoom:.15,rotX:.45,rotY:1.2,coreIntensity:22,orbit:!1},orbit:{zoom:9.5,rotX:-.2,rotY:0,coreIntensity:12,orbit:!0}};function Sg(r,t){r.targetZoom=t.zoom,r.targetRotX=t.rotX,r.targetRotY=t.rotY,r.targetCoreIntensity=t.coreIntensity,r.isOrbitingMode=t.orbit}function Eg(r,t){window.addEventListener("pointerdown",e=>{t.isOverUI(e.target)||(r.isDragging=!0,r.prevX=e.clientX,r.prevY=e.clientY)},{passive:!0}),window.addEventListener("pointermove",e=>{r.isDragging&&(r.targetRotY+=(e.clientX-r.prevX)*.007,r.targetRotX+=(e.clientY-r.prevY)*.007,r.targetRotX=Math.max(-Math.PI/2.1,Math.min(Math.PI/2.1,r.targetRotX)),r.prevX=e.clientX,r.prevY=e.clientY)},{passive:!0}),window.addEventListener("pointerup",()=>{r.isDragging=!1},{passive:!0}),window.addEventListener("wheel",e=>{t.isModalActive()||(e.preventDefault(),r.targetZoom+=e.deltaY*.0035,r.targetZoom=Math.max(.02,Math.min(16,r.targetZoom)))},{passive:!1})}const Tg=[{x:-.44,y:.44,z:.88,w:.92,h:.92,d:.32},{x:.46,y:.48,z:.88,w:.86,h:.82,d:.32},{x:-.46,y:-.45,z:.88,w:.88,h:.86,d:.32},{x:.5,y:-.4,z:.88,w:.82,h:.92,d:.32},{x:.44,y:.44,z:-.88,w:.92,h:.92,d:.32},{x:-.46,y:.48,z:-.88,w:.86,h:.82,d:.32},{x:.46,y:-.45,z:-.88,w:.88,h:.86,d:.32},{x:-.5,y:-.4,z:-.88,w:.82,h:.92,d:.32},{x:.88,y:.44,z:-.44,w:.32,h:.92,d:.92},{x:.88,y:.48,z:.46,w:.32,h:.82,d:.86},{x:.88,y:-.45,z:-.46,w:.32,h:.86,d:.88},{x:.88,y:-.4,z:.5,w:.32,h:.92,d:.82},{x:-.88,y:.44,z:.44,w:.32,h:.92,d:.92},{x:-.88,y:.48,z:-.46,w:.32,h:.82,d:.86},{x:-.88,y:-.45,z:.46,w:.32,h:.86,d:.88},{x:-.88,y:-.4,z:-.5,w:.32,h:.92,d:.82},{x:-.44,y:.88,z:.44,w:.92,h:.32,d:.92},{x:.46,y:.88,z:-.48,w:.86,h:.32,d:.82},{x:-.46,y:.88,z:-.45,w:.88,h:.32,d:.86},{x:.5,y:.88,z:.4,w:.82,h:.32,d:.92},{x:-.44,y:-.88,z:-.42,w:.92,h:.32,d:.92},{x:.46,y:-.88,z:.48,w:.86,h:.32,d:.82},{x:-.46,y:-.88,z:.45,w:.88,h:.32,d:.86},{x:.5,y:-.88,z:-.4,w:.82,h:.32,d:.92}];function Ag(r,t,e,n){const i=new hr(r,t,e,32,32,32),s=i.attributes.position;for(let a=0;a<s.count;a++){const l=s.getX(a),c=s.getY(a),h=s.getZ(a),u=l/(r/2),d=c/(t/2),p=h/(e/2),x=1+Math.cos(u*Math.PI*.47)*Math.cos(d*Math.PI*.47)*Math.cos(p*Math.PI*.47)*.2,y=Math.sin(u*3.5+d*2.5)*Math.cos(p*3.5)*.04,g=Math.cos(u*7+p*7)*.02;s.setXYZ(a,l*x+y*(r/2),c*x+g*(t/2),h*x+y*(e/2))}i.computeVertexNormals();const o=new ae(i,n);return o.castShadow=!0,o.receiveShadow=!0,o}function Lg(r){const t=new Le;return Tg.forEach(e=>{const n=Ag(e.w,e.h,e.d,r);n.position.set(e.x,e.y,e.z),t.add(n)}),t}function Cg(r,t=11e3){const e=new Up(.024,.048,6);e.translate(0,.024,0);const n=new Wa(e,r,t),i=new Ct,s=1.02;let o=0;const a=[];for(let u=0;u<16;u++){const d=u/16*Math.PI*2,p=.1+Math.random()*.7;a.push({center:new w(Math.cos(d)*p,s,Math.sin(d)*p),radius:.45,density:1.1,type:"top"})}for(let u=0;u<16;u++){const d=u/16*Math.PI*2,p=.1+Math.random()*.7;a.push({center:new w(Math.cos(d)*p,-s,Math.sin(d)*p),radius:.45,density:1.1,type:"bottom"})}[{x:s,z:s},{x:-s,z:s},{x:s,z:-s},{x:-s,z:-s}].forEach(u=>{for(let d=0;d<12;d++){const p=d/11;a.push({center:new w(u.x*1.05,s-p*(s*2),u.z*1.05),radius:.35,density:1,type:"corner"})}}),[{x:0,y:.3,z:s},{x:0,y:.2,z:-s},{x:s,y:.4,z:0},{x:-s,y:.1,z:0},{x:0,y:-.4,z:s},{x:0,y:-.3,z:-s},{x:s,y:-.3,z:0},{x:-s,y:-.4,z:0}].forEach(u=>{a.push({center:new w(u.x,u.y,u.z),radius:.45,density:.9,type:"side"})});const h=new w(0,1,0);return a.forEach(u=>{const d=Math.floor(t/a.length*u.density*1.2);for(let p=0;p<d&&o<t;p++){const m=Math.pow(Math.random(),.5)*u.radius,x=Math.random()*Math.PI*2,y=(Math.random()-.5)*Math.PI;let g=u.center.x+m*Math.cos(x),f=u.center.y+(u.type==="top"||u.type==="bottom"?(Math.random()-.5)*.12:m*Math.sin(y)),S=u.center.z+m*Math.sin(x);const E=new w;if(u.type==="top")f=s+.01+Math.random()*.04,E.set(0,1,0);else if(u.type==="bottom")f=-s-.01-Math.random()*.04,E.set(0,-1,0);else{const I=Math.abs(g),N=Math.abs(f),B=Math.abs(S),H=Math.max(I,N,B);H===I?(g=Math.sign(g)*(s+Math.random()*.04),E.set(Math.sign(g),0,0)):H===N?(f=Math.sign(f)*(s+Math.random()*.04),E.set(0,Math.sign(f),0)):(S=Math.sign(S)*(s+Math.random()*.04),E.set(0,0,Math.sign(S)))}i.position.set(g,f,S);const T=new ie().setFromUnitVectors(h,E);i.rotation.setFromQuaternion(T),i.rotateY(Math.random()*Math.PI*2),i.rotateX((Math.random()-.5)*.4);const v=1-m/u.radius,R=(.75+Math.random()*.6)*(.6+v*.7);i.scale.set(R,R*(1.1+Math.random()*.5),R),i.updateMatrix(),n.setMatrixAt(o++,i.matrix)}}),n.instanceMatrix.needsUpdate=!0,n.castShadow=!0,n.receiveShadow=!0,n}const oa=[{rock:12229517,moss:5930290},{rock:7235704,moss:2849391},{rock:8546651,moss:9720872},{rock:7037818,moss:9059189},{rock:5659730,moss:4687159}];function Rg(r,t,e){const n=new Le,i=oa[t%oa.length],s=new Fn({color:i.rock,roughness:.82,metalness:.05,bumpMap:e,bumpScale:.02}),o=new Fn({color:i.moss,roughness:.9}),a=new Gp(.55*r,3),l=a.attributes.position;for(let h=0;h<l.count;h++){let u=l.getX(h),d=l.getY(h),p=l.getZ(h);if(d<0){const x=1+d/r*.45;u*=Math.max(x,.15),p*=Math.max(x,.15),d*=1.3}else d*=.65;const m=(Math.sin(u*8)*Math.cos(d*8)+Math.sin(p*8))*.08*r;l.setXYZ(h,u+m,d+m,p+m)}a.computeVertexNormals(),a.center();const c=new ae(a,s);if(c.castShadow=!0,c.receiveShadow=!0,n.add(c),r>.25){const h=new ae(new ja(.2*r,10,8),o);h.position.set(0,.14*r,0),h.scale.set(1.4,.3,1.2),n.add(h)}return n}function Pg(r,t=45){const e=new Le,n=[],i=[];for(let s=0;s<t;s++){const o=.25+Math.random()*.85,a=.55*o,l=new w;let c=!1,h=0;for(;!c&&h<120;){h++;const u=3.2+Math.random()*5.3,d=Math.random()*Math.PI*2,p=Math.acos(Math.random()*2-1);l.set(u*Math.sin(p)*Math.cos(d),u*Math.sin(p)*Math.sin(d),u*Math.cos(p)),c=!0;for(const m of i){const x=l.distanceTo(m.pos),y=a+m.radius+.4;if(x<y){c=!1;break}}}if(c){i.push({pos:l,radius:a});const u=Rg(o,s,r);u.position.copy(l),u.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2),n.push({mesh:u,rotSpeedX:(Math.random()-.5)*.005,rotSpeedY:(Math.random()-.5)*.005,floatPhase:Math.random()*Math.PI*2,floatSpeed:.6+Math.random()*.8,initialY:u.position.y}),e.add(u)}}return{group:e,animatedRocks:n}}function Ig(r){const t=new Le,e=400,n=new Rt,i=new Float32Array(e*3);for(let a=0;a<e*3;a+=3)i[a]=(Math.random()-.5)*16,i[a+1]=(Math.random()-.5)*16,i[a+2]=(Math.random()-.5)*16;n.setAttribute("position",new jt(i,3));const s=new bs({size:.2,map:r,transparent:!0,opacity:.65,blending:es,depthWrite:!1}),o=new Xa(n,s);return t.add(o),t}function Dg(){return{bar:document.getElementById("cinematic-bar"),toggleToolbarBtn:document.getElementById("toggle-toolbar-btn"),closeBarBtn:document.getElementById("btn-close-bar"),toggleMossBtn:document.getElementById("toggle-moss"),toggleGasBtn:document.getElementById("toggle-gas"),toggleModeBtn:document.getElementById("toggle-mode"),btnOutside:document.getElementById("btn-outside"),btnInside:document.getElementById("btn-inside"),btnOrbit:document.getElementById("btn-orbit")}}function Ng(r,t,e){t.closeBarBtn.addEventListener("click",()=>{t.bar.classList.add("closed"),t.toggleToolbarBtn.style.display="block"}),t.toggleToolbarBtn.addEventListener("click",()=>{t.bar.classList.remove("closed"),t.toggleToolbarBtn.style.display="none"}),t.toggleMossBtn.addEventListener("click",()=>{r.showMoss=!r.showMoss,t.toggleMossBtn.classList.toggle("off",!r.showMoss),e.onMossToggle(r.showMoss)}),t.toggleGasBtn.addEventListener("click",()=>{r.showGas=!r.showGas,t.toggleGasBtn.classList.toggle("off",!r.showGas),e.onGasToggle(r.showGas)}),t.toggleModeBtn.addEventListener("click",()=>{r.isExternalSunMode=!r.isExternalSunMode,t.toggleModeBtn.textContent=r.isExternalSunMode?"🌙 ":"☀️ "}),[[t.btnOutside,"outside"],[t.btnInside,"inside"],[t.btnOrbit,"orbit"]].forEach(([i,s])=>{i.addEventListener("click",()=>{document.querySelectorAll(".pill-btn").forEach(o=>o.classList.remove("active")),i.classList.add("active"),Sg(r,bg[s])})})}function Fg(){return{modal:document.getElementById("info-modal"),openBtn:document.getElementById("btn-top-info"),closeBtn:document.getElementById("btn-close-modal")}}function Bg(r){r.openBtn.addEventListener("click",()=>{r.modal.classList.add("active")}),r.closeBtn.addEventListener("click",()=>{r.modal.classList.remove("active")}),r.modal.addEventListener("click",t=>{t.target===r.modal&&r.modal.classList.remove("active")})}function zg(r){return r.modal.classList.contains("active")}const Og=document.getElementById("canvas-container"),sr=vg(),gi=yg(),dl=_g(Og),Wt=wg();gi.position.z=Wt.currentZoom;const Ce=new Le;sr.add(Ce);const Ns=mg(),Ug=gg(),Hg=new Fn({color:4341566,roughness:.88,metalness:.05,bumpMap:Ns,bumpScale:.035,side:xi}),Gg=new Fn({color:5934889,roughness:.95,metalness:0,bumpMap:Ns,bumpScale:.015}),Vg=Lg(Hg);Ce.add(Vg);const fl=Cg(Gg,11e3);Ce.add(fl);const{group:kg,animatedRocks:Wg}=Pg(Ns,45);Ce.add(kg);const or=Ig(Ug);Ce.add(or);const{coreLight:aa,sunKeyLight:la,sunShaftLight:ca,ambientLight:ha}=Mg(Ce,sr),Xg=Dg(),pl=Fg();Bg(pl);Ng(Wt,Xg,{onMossToggle:r=>{fl.visible=r},onGasToggle:r=>{or.visible=r}});Eg(Wt,{isModalActive:()=>zg(pl),isOverUI:r=>r instanceof Element?r.closest("#cinematic-bar")!==null||r.closest("#info-modal")!==null||r.closest("#top-right-info")!==null||r.closest("#toggle-toolbar-btn")!==null:!1});window.addEventListener("resize",()=>{gi.aspect=window.innerWidth/window.innerHeight,gi.updateProjectionMatrix(),dl.setSize(window.innerWidth,window.innerHeight)},{passive:!0});const qg=new jm;function ml(){requestAnimationFrame(ml);const r=qg.getElapsedTime();Wt.currentZoom+=(Wt.targetZoom-Wt.currentZoom)*.05,gi.position.z=Wt.currentZoom,Wt.showGas&&(or.rotation.y=r*.02,or.rotation.x=Math.sin(r*.01)*.1);const t=Wt.isExternalSunMode?2.5:Wt.targetCoreIntensity;aa.intensity+=(t-aa.intensity)*.08,la.intensity+=((Wt.isExternalSunMode?3.2:1.8)-la.intensity)*.08,ca.intensity+=((Wt.isExternalSunMode?1.4:.5)-ca.intensity)*.08,ha.intensity+=((Wt.isExternalSunMode?.75:.45)-ha.intensity)*.08,sr.background.lerp(Wt.isExternalSunMode?xg:ul,.05),Wg.forEach(e=>{e.mesh.rotation.x+=e.rotSpeedX,e.mesh.rotation.y+=e.rotSpeedY,e.mesh.position.y=e.initialY+Math.sin(r*e.floatSpeed+e.floatPhase)*.025}),Wt.isOrbitingMode?(Wt.targetRotY+=.008,Wt.targetRotX=Math.sin(r*.4)*.25):Wt.isDragging||(Wt.targetRotY+=.0012),Ce.rotation.x+=(Wt.targetRotX-Ce.rotation.x)*.05,Ce.rotation.y+=(Wt.targetRotY-Ce.rotation.y)*.05,dl.render(sr,gi)}ml();
