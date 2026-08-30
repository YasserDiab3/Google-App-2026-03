"use strict";const{headersMap}=require("./headers-schema"),{getDatabase}=require("./database");function initSchema(t=getDatabase()){for(const[c,a]of Object.entries(headersMap)){const s=`"${c}"`,r=a.map(e=>`${`"${e}"`} TEXT`),i=`CREATE TABLE IF NOT EXISTS ${s} (
            ${r.join(`,
            `)}
        );`;try{t.exec(i)}catch{}if(a.includes("id"))try{t.exec(`CREATE INDEX IF NOT EXISTS "idx_${c}_id" ON ${s} ("id");`)}catch{}if(a.includes("userId"))try{t.exec(`CREATE INDEX IF NOT EXISTS "idx_${c}_userId" ON ${s} ("userId");`)}catch{}if(a.includes("createdAt"))try{t.exec(`CREATE INDEX IF NOT EXISTS "idx_${c}_createdAt" ON ${s} ("createdAt");`)}catch{}}}module.exports={initSchema};
