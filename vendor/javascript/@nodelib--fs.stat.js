import*as t from"fs";var e={};Object.defineProperty(e,"__esModule",{value:true});e.read=void 0;function read$1(t,e,a){e.fs.lstat(t,((s,n)=>{null===s?n.isSymbolicLink()&&e.followSymbolicLink?e.fs.stat(t,((t,s)=>{if(null===t){e.markSymbolicLink&&(s.isSymbolicLink=()=>true);callSuccessCallback(a,s)}else{if(e.throwErrorOnBrokenSymbolicLink){callFailureCallback(a,t);return}callSuccessCallback(a,n)}})):callSuccessCallback(a,n):callFailureCallback(a,s)}))}e.read=read$1;function callFailureCallback(t,e){t(e)}function callSuccessCallback(t,e){t(null,e)}var a={};Object.defineProperty(a,"__esModule",{value:true});a.read=void 0;function read(t,e){const a=e.fs.lstatSync(t);if(!a.isSymbolicLink()||!e.followSymbolicLink)return a;try{const a=e.fs.statSync(t);e.markSymbolicLink&&(a.isSymbolicLink=()=>true);return a}catch(t){if(!e.throwErrorOnBrokenSymbolicLink)return a;throw t}}a.read=read;var s="default"in t?t.default:t;var n={};Object.defineProperty(n,"__esModule",{value:true});n.createFileSystemAdapter=n.FILE_SYSTEM_ADAPTER=void 0;const i=s;n.FILE_SYSTEM_ADAPTER={lstat:i.lstat,stat:i.stat,lstatSync:i.lstatSync,statSync:i.statSync};function createFileSystemAdapter(t){return void 0===t?n.FILE_SYSTEM_ADAPTER:Object.assign(Object.assign({},n.FILE_SYSTEM_ADAPTER),t)}n.createFileSystemAdapter=createFileSystemAdapter;var l={};Object.defineProperty(l,"__esModule",{value:true});const r=n;class Settings$1{constructor(t={}){this._options=t;this.followSymbolicLink=this._getValue(this._options.followSymbolicLink,true);this.fs=r.createFileSystemAdapter(this._options.fs);this.markSymbolicLink=this._getValue(this._options.markSymbolicLink,false);this.throwErrorOnBrokenSymbolicLink=this._getValue(this._options.throwErrorOnBrokenSymbolicLink,true)}_getValue(t,e){return null!==t&&void 0!==t?t:e}}l.default=Settings$1;var o={};Object.defineProperty(o,"__esModule",{value:true});o.statSync=o.stat=o.Settings=void 0;const c=e;const u=a;const S=l;o.Settings=S.default;function stat(t,e,a){"function"!==typeof e?c.read(t,getSettings(e),a):c.read(t,getSettings(),e)}o.stat=stat;function statSync(t,e){const a=getSettings(e);return u.read(t,a)}o.statSync=statSync;function getSettings(t={}){return t instanceof S.default?t:new S.default(t)}const d=o.__esModule,f=o.Settings;const y=o.statSync,k=o.stat;export default o;export{f as Settings,d as __esModule,k as stat,y as statSync};

