import e from"fill-range";var t={};t.isInteger=e=>"number"===typeof e?Number.isInteger(e):"string"===typeof e&&""!==e.trim()&&Number.isInteger(Number(e));t.find=(e,t)=>e.nodes.find(e=>e.type===t);t.exceedsLimit=(e,r,n=1,l)=>false!==l&&(!(!t.isInteger(e)||!t.isInteger(r))&&(Number(r)-Number(e))/Number(n)>=l);t.escapeNode=(e,t=0,r)=>{let n=e.nodes[t];if(n&&(r&&n.type===r||"open"===n.type||"close"===n.type)&&true!==n.escaped){n.value="\\"+n.value;n.escaped=true}};t.encloseBrace=e=>{if("brace"!==e.type)return false;if(e.commas>>0+e.ranges>>0===0){e.invalid=true;return true}return false};t.isInvalidBrace=e=>{if("brace"!==e.type)return false;if(true===e.invalid||e.dollar)return true;if(e.commas>>0+e.ranges>>0===0){e.invalid=true;return true}if(true!==e.open||true!==e.close){e.invalid=true;return true}return false};t.isOpenOrClose=e=>"open"===e.type||"close"===e.type||(true===e.open||true===e.close);t.reduce=e=>e.reduce((e,t)=>{"text"===t.type&&e.push(t.value);"range"===t.type&&(t.type="text");return e},[]);t.flatten=(...e)=>{const t=[];const flat=e=>{for(let r=0;r<e.length;r++){let n=e[r];Array.isArray(n)?flat(n,t):void 0!==n&&t.push(n)}return t};flat(e);return t};var r={};const n=t;r=(e,t={})=>{let stringify=(e,r={})=>{let l=t.escapeInvalid&&n.isInvalidBrace(r);let a=true===e.invalid&&true===t.escapeInvalid;let s="";if(e.value)return(l||a)&&n.isOpenOrClose(e)?"\\"+e.value:e.value;if(e.value)return e.value;if(e.nodes)for(let t of e.nodes)s+=stringify(t);return s};return stringify(e)};var l=r;var a={};const s=e;const o=t;const compile=(e,t={})=>{let walk=(e,r={})=>{let n=o.isInvalidBrace(r);let l=true===e.invalid&&true===t.escapeInvalid;let a=true===n||true===l;let u=true===t.escapeInvalid?"\\":"";let p="";if(true===e.isOpen)return u+e.value;if(true===e.isClose)return u+e.value;if("open"===e.type)return a?u+e.value:"(";if("close"===e.type)return a?u+e.value:")";if("comma"===e.type)return"comma"===e.prev.type?"":a?e.value:"|";if(e.value)return e.value;if(e.nodes&&e.ranges>0){let r=o.reduce(e.nodes);let n=s(...r,{...t,wrap:false,toRegex:true});if(0!==n.length)return r.length>1&&n.length>1?`(${n})`:n}if(e.nodes)for(let t of e.nodes)p+=walk(t,e);return p};return walk(e)};a=compile;var u=a;var p={};const i=e;const A=l;const R=t;const append=(e="",t="",r=false)=>{let n=[];e=[].concat(e);t=[].concat(t);if(!t.length)return e;if(!e.length)return r?R.flatten(t).map(e=>`{${e}}`):t;for(let l of e)if(Array.isArray(l))for(let e of l)n.push(append(e,t,r));else for(let e of t){true===r&&"string"===typeof e&&(e=`{${e}}`);n.push(Array.isArray(e)?append(l,e,r):l+e)}return R.flatten(n)};const expand=(e,t={})=>{let r=void 0===t.rangeLimit?1e3:t.rangeLimit;let walk=(e,n={})=>{e.queue=[];let l=n;let a=n.queue;while("brace"!==l.type&&"root"!==l.type&&l.parent){l=l.parent;a=l.queue}if(e.invalid||e.dollar){a.push(append(a.pop(),A(e,t)));return}if("brace"===e.type&&true!==e.invalid&&2===e.nodes.length){a.push(append(a.pop(),["{}"]));return}if(e.nodes&&e.ranges>0){let n=R.reduce(e.nodes);if(R.exceedsLimit(...n,t.step,r))throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");let l=i(...n,t);0===l.length&&(l=A(e,t));a.push(append(a.pop(),l));e.nodes=[];return}let s=R.encloseBrace(e);let o=e.queue;let u=e;while("brace"!==u.type&&"root"!==u.type&&u.parent){u=u.parent;o=u.queue}for(let t=0;t<e.nodes.length;t++){let r=e.nodes[t];if("comma"!==r.type||"brace"!==e.type)"close"!==r.type?r.value&&"open"!==r.type?o.push(append(o.pop(),r.value)):r.nodes&&walk(r,e):a.push(append(a.pop(),o,s));else{1===t&&o.push("");o.push("")}}return o};return R.flatten(walk(e))};p=expand;var _=p;var f={};f={MAX_LENGTH:1024*64,CHAR_0:"0",CHAR_9:"9",CHAR_UPPERCASE_A:"A",CHAR_LOWERCASE_A:"a",CHAR_UPPERCASE_Z:"Z",CHAR_LOWERCASE_Z:"z",CHAR_LEFT_PARENTHESES:"(",CHAR_RIGHT_PARENTHESES:")",CHAR_ASTERISK:"*",CHAR_AMPERSAND:"&",CHAR_AT:"@",CHAR_BACKSLASH:"\\",CHAR_BACKTICK:"`",CHAR_CARRIAGE_RETURN:"\r",CHAR_CIRCUMFLEX_ACCENT:"^",CHAR_COLON:":",CHAR_COMMA:",",CHAR_DOLLAR:"$",CHAR_DOT:".",CHAR_DOUBLE_QUOTE:'"',CHAR_EQUAL:"=",CHAR_EXCLAMATION_MARK:"!",CHAR_FORM_FEED:"\f",CHAR_FORWARD_SLASH:"/",CHAR_HASH:"#",CHAR_HYPHEN_MINUS:"-",CHAR_LEFT_ANGLE_BRACKET:"<",CHAR_LEFT_CURLY_BRACE:"{",CHAR_LEFT_SQUARE_BRACKET:"[",CHAR_LINE_FEED:"\n",CHAR_NO_BREAK_SPACE:" ",CHAR_PERCENT:"%",CHAR_PLUS:"+",CHAR_QUESTION_MARK:"?",CHAR_RIGHT_ANGLE_BRACKET:">",CHAR_RIGHT_CURLY_BRACE:"}",CHAR_RIGHT_SQUARE_BRACKET:"]",CHAR_SEMICOLON:";",CHAR_SINGLE_QUOTE:"'",CHAR_SPACE:" ",CHAR_TAB:"\t",CHAR_UNDERSCORE:"_",CHAR_VERTICAL_LINE:"|",CHAR_ZERO_WIDTH_NOBREAK_SPACE:"\ufeff"};var C=f;var c={};const E=l;const{MAX_LENGTH:d,CHAR_BACKSLASH:y,CHAR_BACKTICK:H,CHAR_COMMA:v,CHAR_DOT:g,CHAR_LEFT_PARENTHESES:h,CHAR_RIGHT_PARENTHESES:T,CHAR_LEFT_CURLY_BRACE:m,CHAR_RIGHT_CURLY_BRACE:L,CHAR_LEFT_SQUARE_BRACKET:S,CHAR_RIGHT_SQUARE_BRACKET:x,CHAR_DOUBLE_QUOTE:I,CHAR_SINGLE_QUOTE:O,CHAR_NO_BREAK_SPACE:N,CHAR_ZERO_WIDTH_NOBREAK_SPACE:B}=C;const parse=(e,t={})=>{if("string"!==typeof e)throw new TypeError("Expected a string");let r=t||{};let n="number"===typeof r.maxLength?Math.min(d,r.maxLength):d;if(e.length>n)throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${n})`);let l={type:"root",input:e,nodes:[]};let a=[l];let s=l;let o=l;let u=0;let p=e.length;let i=0;let A=0;let R;let _={};const advance=()=>e[i++];const push=e=>{"text"===e.type&&"dot"===o.type&&(o.type="text");if(!o||"text"!==o.type||"text"!==e.type){s.nodes.push(e);e.parent=s;e.prev=o;o=e;return e}o.value+=e.value};push({type:"bos"});while(i<p){s=a[a.length-1];R=advance();if(R!==B&&R!==N)if(R!==y)if(R!==x)if(R!==S)if(R!==h)if(R!==T)if(R!==I&&R!==O&&R!==H)if(R!==m)if(R!==L)if(R===v&&A>0){if(s.ranges>0){s.ranges=0;let e=s.nodes.shift();s.nodes=[e,{type:"text",value:E(s)}]}push({type:"comma",value:R});s.commas++}else if(R===g&&A>0&&0===s.commas){let e=s.nodes;if(0===A||0===e.length){push({type:"text",value:R});continue}if("dot"===o.type){s.range=[];o.value+=R;o.type="range";if(3!==s.nodes.length&&5!==s.nodes.length){s.invalid=true;s.ranges=0;o.type="text";continue}s.ranges++;s.args=[];continue}if("range"===o.type){e.pop();let t=e[e.length-1];t.value+=o.value+R;o=t;s.ranges--;continue}push({type:"dot",value:R})}else push({type:"text",value:R});else{if("brace"!==s.type){push({type:"text",value:R});continue}let e="close";s=a.pop();s.close=true;push({type:e,value:R});A--;s=a[a.length-1]}else{A++;let e=o.value&&"$"===o.value.slice(-1)||true===s.dollar;let t={type:"brace",open:true,close:false,dollar:e,depth:A,commas:0,ranges:0,nodes:[]};s=push(t);a.push(s);push({type:"open",value:R})}else{let e=R;let r;true!==t.keepQuotes&&(R="");while(i<p&&(r=advance()))if(r!==y){if(r===e){true===t.keepQuotes&&(R+=r);break}R+=r}else R+=r+advance();push({type:"text",value:R})}else{if("paren"!==s.type){push({type:"text",value:R});continue}s=a.pop();push({type:"text",value:R});s=a[a.length-1]}else{s=push({type:"paren",nodes:[]});a.push(s);push({type:"text",value:R})}else{u++;let e=true;let t;while(i<p&&(t=advance())){R+=t;if(t!==S)if(t!==y){if(t===x){u--;if(0===u)break}}else R+=advance();else u++}push({type:"text",value:R})}else push({type:"text",value:"\\"+R});else push({type:"text",value:(t.keepEscaping?R:"")+advance()})}do{s=a.pop();if("root"!==s.type){s.nodes.forEach(e=>{if(!e.nodes){"open"===e.type&&(e.isOpen=true);"close"===e.type&&(e.isClose=true);e.nodes||(e.type="text");e.invalid=true}});let e=a[a.length-1];let t=e.nodes.indexOf(s);e.nodes.splice(t,1,...s.nodes)}}while(a.length>0);push({type:"eos"});return l};c=parse;var U=c;var b={};const K=l;const P=u;const w=_;const M=U;const braces=(e,t={})=>{let r=[];if(Array.isArray(e))for(let n of e){let e=braces.create(n,t);Array.isArray(e)?r.push(...e):r.push(e)}else r=[].concat(braces.create(e,t));t&&true===t.expand&&true===t.nodupes&&(r=[...new Set(r)]);return r};braces.parse=(e,t={})=>M(e,t);braces.stringify=(e,t={})=>K("string"===typeof e?braces.parse(e,t):e,t);braces.compile=(e,t={})=>{"string"===typeof e&&(e=braces.parse(e,t));return P(e,t)};braces.expand=(e,t={})=>{"string"===typeof e&&(e=braces.parse(e,t));let r=w(e,t);true===t.noempty&&(r=r.filter(Boolean));true===t.nodupes&&(r=[...new Set(r)]);return r};braces.create=(e,t={})=>""===e||e.length<3?[e]:true!==t.expand?braces.compile(e,t):braces.expand(e,t);b=braces;var G=b;export default G;

