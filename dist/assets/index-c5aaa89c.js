class A{constructor(){this.resolve=void 0,this.reject=void 0,this.promise=new Promise((e,s)=>{this.resolve=e,this.reject=s})}}function _(r,e,s){const a=new XMLHttpRequest;a.open("GET",r,!0),a.responseType="arraybuffer",a.onload=()=>{a.status==200||a.status==0&&a.response?e(a.response):s()},a.onerror=s,a.send(null)}function E(r,e,s){_(r,a=>{e(new Uint8Array(a))},()=>{if(s)s();else throw new Error(`Loading data file ${r} failed.`)})}async function h(r){const e=r.map(s=>new Promise((a,l)=>{E(s.serverFilename,i=>{a({filename:s.virtualFilename,data:i})},()=>{console.error(`Error fetching file: ${s.serverFilename}`)})}));return await Promise.all(e)}async function I(){return await new Promise((r,e)=>{E("https://chuck.stanford.edu/webchuck/src/webchuck.wasm",r,e)})}const d=()=>new A;var t;(function(r){r.LOAD_FILE="loadFile",r.RUN_CODE="runChuckCode",r.RUN_CODE_WITH_REPLACEMENT_DAC="runChuckCodeWithReplacementDac",r.REPLACE_CODE="replaceChuckCode",r.REPLACE_CODE_WITH_REPLACEMENT_DAC="replaceChuckCodeWithReplacementDac",r.REMOVE_LAST_CODE="removeLastCode",r.RUN_FILE="runChuckFile",r.RUN_FILE_WITH_REPLACEMENT_DAC="runChuckFileWithReplacementDac",r.RUN_FILE_WITH_ARGS="runChuckFileWithArgs",r.REPLACE_FILE="replaceChuckFile",r.REPLACE_FILE_WITH_REPLACEMENT_DAC="replaceChuckFileWithReplacementDac",r.REPLACE_FILE_WITH_ARGS="replaceChuckFileWithArgs",r.REMOVE_SHRED="removeShred",r.IS_SHRED_ACTIVE="isShredActive",r.SIGNAL_EVENT="signalChuckEvent",r.BROADCAST_EVENT="broadcastChuckEvent",r.LISTEN_FOR_EVENT_ONCE="listenForEventOnce",r.START_LISTENING_FOR_EVENT="startListeningForChuckEvent",r.STOP_LISTENING_FOR_EVENT="stopListeningForChuckEvent",r.SET_INT="setChuckInt",r.GET_INT="getChuckInt",r.SET_FLOAT="setChuckFloat",r.GET_FLOAT="getChuckFloat",r.SET_STRING="setChuckString",r.GET_STRING="getChuckString",r.SET_INT_ARRAY="setGlobalIntArray",r.GET_INT_ARRAY="getGlobalIntArray",r.SET_INT_ARRAY_VALUE="setGlobalIntArrayValue",r.GET_INT_ARRAY_VALUE="getGlobalIntArrayValue",r.SET_ASSOCIATIVE_INT_ARRAY_VALUE="setGlobalAssociativeIntArrayValue",r.GET_ASSOCIATIVE_INT_ARRAY_VALUE="getGlobalAssociativeIntArrayValue",r.SET_FLOAT_ARRAY="setGlobalFloatArray",r.GET_FLOAT_ARRAY="getGlobalFloatArray",r.SET_FLOAT_ARRAY_VALUE="setGlobalFloatArrayValue",r.GET_FLOAT_ARRAY_VALUE="getGlobalFloatArrayValue",r.SET_ASSOCIATIVE_FLOAT_ARRAY_VALUE="setGlobalAssociativeFloatArrayValue",r.GET_ASSOCIATIVE_FLOAT_ARRAY_VALUE="getGlobalAssociativeFloatArrayValue",r.CLEAR_INSTANCE="clearInstance",r.CLEAR_GLOBALS="clearGlobals"})(t||(t={}));var c;(function(r){r.INIT_DONE="initCallback",r.PRINT="console print",r.EVENT="eventCallback",r.INT="intCallback",r.FLOAT="floatCallback",r.STRING="stringCallback",r.INT_ARRAY="intArrayCallback",r.FLOAT_ARRAY="floatArrayCallback",r.NEW_SHRED="newShredCallback",r.REPLACED_SHRED="replacedShredCallback",r.REMOVED_SHRED="removedShredCallback"})(c||(c={}));class n extends window.AudioWorkletNode{constructor(e,s,a,l=2){super(s,"chuck-node",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[l],processorOptions:{chuckID:n.chuckID,srate:s.sampleRate,preloadedFiles:e,wasm:a}}),this.deferredPromises={},this.deferredPromiseCounter=0,this.eventCallbacks={},this.eventCallbackCounter=0,this.isReady=d(),this.port.onmessage=this.receiveMessage.bind(this),this.onprocessorerror=i=>console.error(i),n.chuckID++}static async init(e,s,a=2){const l=await I();typeof s>"u"&&(s=new AudioContext),s.state==="suspended"&&await s.resume(),await s.audioWorklet.addModule("https://chuck.stanford.edu/webchuck/src/webchuck.js");const i=await h(e),o=new n(i,s,l,a);return o.connect(s.destination),await o.isReady.promise,o}nextDeferID(){const e=this.deferredPromiseCounter++;return this.deferredPromises[e]=d(),e}createFile(e,s,a){this.sendMessage(t.LOAD_FILE,{directory:e,filename:s,data:a})}runCode(e){const s=this.nextDeferID();return this.sendMessage(t.RUN_CODE,{callback:s,code:e}),this.deferredPromises[s]}runCodeWithReplacementDac(e,s){const a=this.nextDeferID();return this.sendMessage(t.RUN_CODE_WITH_REPLACEMENT_DAC,{callback:a,code:e,dac_name:s}),this.deferredPromises[a]}replaceCode(e){const s=this.nextDeferID();return this.sendMessage(t.REPLACE_CODE,{callback:s,code:e}),this.deferredPromises[s]}replaceCodeWithReplacementDac(e,s){const a=this.nextDeferID();return this.sendMessage(t.REPLACE_CODE_WITH_REPLACEMENT_DAC,{callback:a,code:e,dac_name:s}),this.deferredPromises[a]}removeLastCode(){const e=this.nextDeferID();return this.sendMessage(t.REMOVE_LAST_CODE,{callback:e}),this.deferredPromises[e]}runFile(e){const s=this.nextDeferID();return this.sendMessage(t.RUN_FILE,{callback:s,filename:e}),this.deferredPromises[s]}runFileWithReplacementDac(e,s){const a=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_REPLACEMENT_DAC,{callback:a,dac_name:s,filename:e}),this.deferredPromises[a]}runFileWithArgs(e,s){const a=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_ARGS,{callback:a,colon_separated_args:s,filename:e}),this.deferredPromises[a]}runFileWithArgsWithReplacementDac(e,s,a){const l=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_ARGS,{callback:l,colon_separated_args:s,dac_name:a,filename:e}),this.deferredPromises[l]}replaceFile(e){const s=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE,{callback:s,filename:e}),this.deferredPromises[s]}replaceFileWithReplacementDac(e,s){const a=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_REPLACEMENT_DAC,{callback:a,dac_name:s,filename:e}),this.deferredPromises[a]}replaceFileWithArgs(e,s){const a=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_ARGS,{callback:a,colon_separated_args:s,filename:e}),this.deferredPromises[a]}replaceFileWithArgsWithReplacementDac(e,s,a){const l=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_ARGS,{callback:l,colon_separated_args:s,dac_name:a,filename:e}),this.deferredPromises[l]}removeShred(e){const s=this.nextDeferID();return this.sendMessage(t.REMOVE_SHRED,{shred:e,callback:s}),this.deferredPromises[s]}isShredActive(e){const s=this.nextDeferID();return this.sendMessage(t.IS_SHRED_ACTIVE,{shred:e,callback:s}),this.deferredPromises[s]}signalEvent(e){this.sendMessage(t.SIGNAL_EVENT,{variable:e})}broadcastEvent(e){this.sendMessage(t.BROADCAST_EVENT,{variable:e})}listenForEventOnce(e,s){const a=this.eventCallbackCounter++;this.eventCallbacks[a]=s,this.sendMessage(t.LISTEN_FOR_EVENT_ONCE,{variable:e,callback:a})}startListeningForEvent(e,s){const a=this.eventCallbackCounter++;return this.eventCallbacks[a]=s,this.sendMessage(t.START_LISTENING_FOR_EVENT,{variable:e,callback:a}),a}stopListeningForEvent(e,s){this.sendMessage(t.STOP_LISTENING_FOR_EVENT,{variable:e,callback:s})}setInt(e,s){this.sendMessage(t.SET_INT,{variable:e,value:s})}getInt(e){const s=this.nextDeferID();return this.sendMessage(t.GET_INT,{variable:e,callback:s}),this.deferredPromises[s]}setFloat(e,s){this.sendMessage(t.SET_FLOAT,{variable:e,value:s})}getFloat(e){const s=this.nextDeferID();return this.sendMessage(t.GET_FLOAT,{variable:e,callback:s}),this.deferredPromises[s]}setString(e,s){this.sendMessage(t.SET_STRING,{variable:e,value:s})}getString(e){const s=this.nextDeferID();return this.sendMessage(t.GET_STRING,{variable:e,callback:s}),this.deferredPromises[s]}setIntArray(e,s){this.sendMessage(t.SET_INT_ARRAY,{variable:e,values:s})}getIntArray(e){const s=this.nextDeferID();return this.sendMessage(t.GET_INT_ARRAY,{variable:e,callback:s}),this.deferredPromises[s]}setIntArrayValue(e,s,a){this.sendMessage(t.SET_INT_ARRAY_VALUE,{variable:e,index:s,value:a})}getIntArrayValue(e,s){const a=this.nextDeferID();return this.sendMessage(t.GET_INT_ARRAY_VALUE,{variable:e,index:s,callback:a}),this.deferredPromises[a]}setAssociativeIntArrayValue(e,s,a){this.sendMessage(t.SET_ASSOCIATIVE_INT_ARRAY_VALUE,{variable:e,key:s,value:a})}getAssociativeIntArrayValue(e,s){const a=this.nextDeferID();return this.sendMessage(t.GET_ASSOCIATIVE_INT_ARRAY_VALUE,{variable:e,key:s,callback:a}),this.deferredPromises[a]}setFloatArray(e,s){this.sendMessage(t.SET_FLOAT_ARRAY,{variable:e,values:s})}getFloatArray(e){const s=this.nextDeferID();return this.sendMessage(t.GET_FLOAT_ARRAY,{variable:e,callback:s}),this.deferredPromises[s]}setFloatArrayValue(e,s,a){this.sendMessage(t.SET_FLOAT_ARRAY_VALUE,{variable:e,index:s,value:a})}getFloatArrayValue(e,s){const a=this.nextDeferID();return this.sendMessage(t.GET_FLOAT_ARRAY_VALUE,{variable:e,index:s,callback:a}),this.deferredPromises[a]}setAssociativeFloatArrayValue(e,s,a){this.sendMessage(t.SET_ASSOCIATIVE_FLOAT_ARRAY_VALUE,{variable:e,key:s,value:a})}getAssociativeFloatArrayValue(e,s){const a=this.nextDeferID();return this.sendMessage(t.GET_ASSOCIATIVE_FLOAT_ARRAY_VALUE,{variable:e,key:s,callback:a}),this.deferredPromises[a]}clearChuckInstance(){this.sendMessage(t.CLEAR_INSTANCE)}clearGlobals(){this.sendMessage(t.CLEAR_GLOBALS)}chuckPrint(e){console.log(e)}sendMessage(e,s){const a=s?{type:e,...s}:{type:e};this.port.postMessage(a)}receiveMessage(e){switch(e.data.type){case c.INIT_DONE:this.isReady&&this.isReady.resolve&&this.isReady.resolve();break;case c.PRINT:this.chuckPrint(e.data.message);break;case c.EVENT:if(e.data.callback in this.eventCallbacks){const a=this.eventCallbacks[e.data.callback];a()}break;case c.INT:case c.FLOAT:case c.STRING:case c.INT_ARRAY:case c.FLOAT_ARRAY:if(e.data.callback in this.deferredPromises){const a=this.deferredPromises[e.data.callback];a.resolve&&a.resolve(e.data.result),delete this.deferredPromises[e.data.callback]}break;case c.NEW_SHRED:if(e.data.callback in this.deferredPromises){const a=this.deferredPromises[e.data.callback];e.data.shred>0?a.resolve&&a.resolve(e.data.shred):a.reject&&a.reject("Running code failed")}break;case c.REPLACED_SHRED:if(e.data.callback in this.deferredPromises){const a=this.deferredPromises[e.data.callback];e.data.newShred>0?a.resolve&&a.resolve({newShred:e.data.newShred,oldShred:e.data.oldShred}):a.reject&&a.reject("Replacing code failed")}break;case c.REMOVED_SHRED:if(e.data.callback in this.deferredPromises){const a=this.deferredPromises[e.data.callback];e.data.shred>0?a.resolve&&a.resolve(e.data.shred):a.reject&&a.reject("Removing code failed")}break}}}n.chuckID=1;export{n as Chuck,A as DeferredPromise};
