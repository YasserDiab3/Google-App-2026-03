"use strict";const{headersMap}=require("./headers-schema"),{getDatabase}=require("./database");function initSchema(t=getDatabase()){for(const[s,a]of Object.entries(headersMap)){const c=`"${s}"`,o=a.map(e=>`${`"${e}"`} TEXT`),r=`CREATE TABLE IF NOT EXISTS ${c} (
            ${o.join(`,
            `)}
        );`;try{t.exec(r)}catch{}const n=["id","userId","createdAt","date","status","riskLevel","observerName","siteName","permitId","entryDate"];for(const e of n)if(a.includes(e))try{t.exec(`CREATE INDEX IF NOT EXISTS "idx_${s}_${e}" ON ${c} ("${e}");`)}catch{}}}module.exports={initSchema};
