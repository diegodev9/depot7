import t from"util";import e from"to-regex-range";var r={};const n=t;const s=e;const isObject=t=>null!==t&&"object"===typeof t&&!Array.isArray(t);const transform=t=>e=>true===t?Number(e):String(e);const isValidValue=t=>"number"===typeof t||"string"===typeof t&&""!==t;const isNumber=t=>Number.isInteger(+t);const zeros=t=>{let e=`${t}`;let r=-1;"-"===e[0]&&(e=e.slice(1));if("0"===e)return false;while("0"===e[++r]);return r>0};const stringify=(t,e,r)=>"string"===typeof t||"string"===typeof e||true===r.stringify;const pad=(t,e,r)=>{if(e>0){let r="-"===t[0]?"-":"";r&&(t=t.slice(1));t=r+t.padStart(r?e-1:e,"0")}return false===r?String(t):t};const toMaxLen=(t,e)=>{let r="-"===t[0]?"-":"";if(r){t=t.slice(1);e--}while(t.length<e)t="0"+t;return r?"-"+t:t};const toSequence=(t,e)=>{t.negatives.sort((t,e)=>t<e?-1:t>e?1:0);t.positives.sort((t,e)=>t<e?-1:t>e?1:0);let r=e.capture?"":"?:";let n="";let s="";let i;t.positives.length&&(n=t.positives.join("|"));t.negatives.length&&(s=`-(${r}${t.negatives.join("|")})`);i=n&&s?`${n}|${s}`:n||s;return e.wrap?`(${r}${i})`:i};const toRange=(t,e,r,n)=>{if(r)return s(t,e,{wrap:false,...n});let i=String.fromCharCode(t);if(t===e)return i;let l=String.fromCharCode(e);return`[${i}-${l}]`};const toRegex=(t,e,r)=>{if(Array.isArray(t)){let e=true===r.wrap;let n=r.capture?"":"?:";return e?`(${n}${t.join("|")})`:t.join("|")}return s(t,e,r)};const rangeError=(...t)=>new RangeError("Invalid range arguments: "+n.inspect(...t));const invalidRange=(t,e,r)=>{if(true===r.strictRanges)throw rangeError([t,e]);return[]};const invalidStep=(t,e)=>{if(true===e.strictRanges)throw new TypeError(`Expected step "${t}" to be a number`);return[]};const fillNumbers=(t,e,r=1,n={})=>{let s=Number(t);let i=Number(e);if(!Number.isInteger(s)||!Number.isInteger(i)){if(true===n.strictRanges)throw rangeError([t,e]);return[]}0===s&&(s=0);0===i&&(i=0);let l=s>i;let o=String(t);let a=String(e);let u=String(r);r=Math.max(Math.abs(r),1);let f=zeros(o)||zeros(a)||zeros(u);let g=f?Math.max(o.length,a.length,u.length):0;let c=false===f&&false===stringify(t,e,n);let p=n.transform||transform(c);if(n.toRegex&&1===r)return toRange(toMaxLen(t,g),toMaxLen(e,g),true,n);let h={negatives:[],positives:[]};let push=t=>h[t<0?"negatives":"positives"].push(Math.abs(t));let m=[];let w=0;while(l?s>=i:s<=i){true===n.toRegex&&r>1?push(s):m.push(pad(p(s,w),g,c));s=l?s-r:s+r;w++}return true===n.toRegex?r>1?toSequence(h,n):toRegex(m,null,{wrap:false,...n}):m};const fillLetters=(t,e,r=1,n={})=>{if(!isNumber(t)&&t.length>1||!isNumber(e)&&e.length>1)return invalidRange(t,e,n);let s=n.transform||(t=>String.fromCharCode(t));let i=`${t}`.charCodeAt(0);let l=`${e}`.charCodeAt(0);let o=i>l;let a=Math.min(i,l);let u=Math.max(i,l);if(n.toRegex&&1===r)return toRange(a,u,false,n);let f=[];let g=0;while(o?i>=l:i<=l){f.push(s(i,g));i=o?i-r:i+r;g++}return true===n.toRegex?toRegex(f,null,{wrap:false,options:n}):f};const fill=(t,e,r,n={})=>{if(null==e&&isValidValue(t))return[t];if(!isValidValue(t)||!isValidValue(e))return invalidRange(t,e,n);if("function"===typeof r)return fill(t,e,1,{transform:r});if(isObject(r))return fill(t,e,0,r);let s={...n};true===s.capture&&(s.wrap=true);r=r||s.step||1;return isNumber(r)?isNumber(t)&&isNumber(e)?fillNumbers(t,e,r,s):fillLetters(t,e,Math.max(Math.abs(r),1),s):null==r||isObject(r)?fill(t,e,1,r):invalidStep(r,s)};r=fill;var i=r;export default i;
