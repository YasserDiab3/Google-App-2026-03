const RiskMatrix={generate(e,l={}){const{selectedLikelihood:d=null,selectedConsequence:r=null,interactive:b=!0}=l,g=[{value:5,label:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F"},{value:4,label:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B"},{value:3,label:"\u0645\u062D\u062A\u0645\u0644"},{value:2,label:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644"},{value:1,label:"\u0646\u0627\u062F\u0631"}],u=[{value:1,label:"\u0636\u0626\u064A\u0644\u0629"},{value:2,label:"\u0628\u0633\u064A\u0637\u0629"},{value:3,label:"\u0645\u062A\u0648\u0633\u0637\u0629"},{value:4,label:"\u0643\u0628\u064A\u0631\u0629"},{value:5,label:"\u0643\u0627\u0631\u062B\u064A\u0629"}],c=(t,i)=>{const o=t*i;return o>=15?{level:"critical",label:"\u062D\u0631\u062C",color:"#fff",bg:"linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",border:"#991b1b"}:o>=10?{level:"high",label:"\u0639\u0627\u0644\u064A",color:"#fff",bg:"linear-gradient(135deg, #f97316 0%, #ea580c 100%)",border:"#ea580c"}:o>=5?{level:"medium",label:"\u0645\u062A\u0648\u0633\u0637",color:"#000",bg:"linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",border:"#f59e0b"}:{level:"low",label:"\u0645\u0646\u062E\u0641\u0636",color:"#fff",bg:"linear-gradient(135deg, #10b981 0%, #059669 100%)",border:"#059669"}};return`
            <style>
                .risk-matrix-compact {
                    max-width: 450px;
                    margin: 0 auto;
                    font-family: 'Cairo', 'Segoe UI', sans-serif;
                }
                .risk-matrix-compact table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 3px;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    padding: 8px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                .risk-matrix-compact th {
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    color: white;
                    padding: 6px 3px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-align: center;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .risk-matrix-compact th.corner {
                    width: 70px;
                    font-size: 0.65rem;
                }
                .risk-matrix-compact td.label {
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    color: white;
                    padding: 6px 3px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-align: center;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .risk-matrix-compact .risk-cell {
                    padding: 8px 4px;
                    text-align: center;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .risk-matrix-compact .risk-cell:hover {
                    transform: scale(1.12) translateY(-2px);
                    z-index: 10;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                }
                .risk-matrix-compact .risk-cell.selected {
                    transform: scale(1.15) translateY(-3px);
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5), 0 8px 20px rgba(0,0,0,0.25);
                    z-index: 20;
                }
                .risk-matrix-compact .risk-cell .score {
                    font-size: 1.2rem;
                    font-weight: 900;
                    line-height: 1;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }
                .risk-matrix-compact .risk-cell .level {
                    font-size: 0.6rem;
                    font-weight: 700;
                    margin-top: 2px;
                    opacity: 0.95;
                }
                .risk-legend {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                    margin-top: 12px;
                    font-size: 0.7rem;
                }
                .risk-legend-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 8px;
                    background: white;
                    border-radius: 6px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .risk-legend-color {
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
            </style>
            
            <div class="risk-matrix-compact">
                <table>
                    <thead>
                        <tr>
                            <th class="corner">
                                <div style="font-size: 0.65rem;">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629</div>
                                <div style="font-size: 0.55rem; opacity: 0.8;">\u2193</div>
                            </th>
                            ${u.map(t=>`
                                <th>
                                    <div>${t.label}</div>
                                    <div style="font-size: 0.85rem; margin-top: 1px;">${t.value}</div>
                                </th>
                            `).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${g.map(t=>`
                            <tr>
                                <td class="label">
                                    <div>${t.label}</div>
                                    <div style="font-size: 0.85rem; margin-top: 1px;">${t.value}</div>
                                </td>
                                ${u.map(i=>{const o=c(t.value,i.value),x=t.value*i.value;return`
                                        <td class="risk-cell ${d===t.value&&r===i.value?"selected":""}"
                                            data-likelihood="${t.value}"
                                            data-likelihood-label="${t.label}"
                                            data-consequence="${i.value}"
                                            data-consequence-label="${i.label}"
                                            data-score="${x}"
                                            data-level="${o.level}"
                                            data-level-label="${o.label}"
                                            style="background: ${o.bg}; color: ${o.color};"
                                            onclick="RiskMatrix.selectCell(this, '${e}')">
                                            <div class="score">${x}</div>
                                            <div class="level">${o.label}</div>
                                        </td>
                                    `}).join("")}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                
                <div class="risk-legend">
                    <div class="risk-legend-item">
                        <div class="risk-legend-color" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"></div>
                        <span style="color: #059669; font-weight: 700;">\u0645\u0646\u062E\u0641\u0636 (1-4)</span>
                    </div>
                    <div class="risk-legend-item">
                        <div class="risk-legend-color" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);"></div>
                        <span style="color: #d97706; font-weight: 700;">\u0645\u062A\u0648\u0633\u0637 (5-9)</span>
                    </div>
                    <div class="risk-legend-item">
                        <div class="risk-legend-color" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);"></div>
                        <span style="color: #ea580c; font-weight: 700;">\u0639\u0627\u0644\u064A (10-14)</span>
                    </div>
                    <div class="risk-legend-item">
                        <div class="risk-legend-color" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);"></div>
                        <span style="color: #dc2626; font-weight: 700;">\u062D\u0631\u062C (15-25)</span>
                    </div>
                </div>
            </div>
        `},selectCell(e,l){const d=document.getElementById(l);if(!d)return;d.querySelectorAll(".risk-cell").forEach(p=>{p.classList.remove("selected")}),e.classList.add("selected");const r=parseInt(e.getAttribute("data-likelihood")),b=e.getAttribute("data-likelihood-label"),g=parseInt(e.getAttribute("data-consequence")),u=e.getAttribute("data-consequence-label"),c=parseInt(e.getAttribute("data-score")),t=e.getAttribute("data-level"),i=e.getAttribute("data-level-label"),o=l==="investigation-risk-matrix";if(l==="ptw-risk-matrix"){const p=document.getElementById("ptw-risk-likelihood"),f=document.getElementById("ptw-risk-consequence");p&&(p.value=r),f&&(f.value=g);const s=document.getElementById("ptw-risk-notes");if(s){const n=`\u{1F4CA} \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u062F:
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u2022 \u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629: ${b} (${r})
\u2022 \u0627\u0644\u0639\u0648\u0627\u0642\u0628: ${u} (${g})
\u2022 \u0627\u0644\u0646\u062A\u064A\u062C\u0629: ${c}
\u2022 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631: ${i}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629:
`,a=s.value.trim();!a||a.startsWith("\u{1F4CA} \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u062F:")?s.value=n:s.value=n+`
`+a,s.style.background="#fef3c7",s.style.borderColor="#f59e0b",setTimeout(()=>{s.style.background="",s.style.borderColor=""},1e3)}}else if(o){const p=document.getElementById("investigation-risk-probability"),f=document.getElementById("investigation-risk-severity"),s=document.getElementById("investigation-risk-level");p&&(p.value=r),f&&(f.value=g),s&&(s.value=c);const n=document.getElementById("investigation-risk-result");if(n){let v=i;n.value=v,n.style.background=this.getRiskBackgroundColor(t),n.style.color=t==="low"||t==="medium"?"#000":"#fff",n.style.fontWeight="700",n.style.textAlign="center",setTimeout(()=>{n.style.background="#f0fdfa",n.style.color="#000"},2e3)}const a=document.getElementById("investigation-risk-explanation");if(a){const v=`\u{1F4CA} \u0646\u062A\u0627\u0626\u062C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0644\u0644\u062D\u0627\u062F\u062B:
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u2022 \u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 (Likelihood): ${b} - \u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${r}/5
\u2022 \u0627\u0644\u0634\u062F\u0629/\u0627\u0644\u0639\u0648\u0627\u0642\u0628 (Consequence): ${u} - \u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${g}/5
\u2022 \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0643\u0644\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0637\u0631: ${c} \u0646\u0642\u0637\u0629
\u2022 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u062F: ${i}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\u0627\u0644\u062A\u0641\u0633\u064A\u0631 \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A:
${this.getRiskExplanationText(c,i,b,u)}

\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u062D\u0642\u0642:
`,k=a.value.trim();!k||k.startsWith("\u{1F4CA} \u0646\u062A\u0627\u0626\u062C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"),a.value=v,a.style.background="#ecfdf5",a.style.borderColor="#10b981",a.style.borderWidth="2px",setTimeout(()=>{a.style.background="#f0fdfa",a.style.borderColor="#14b8a6",a.style.borderWidth="1px"},2e3)}}const m=new CustomEvent("riskMatrixSelect",{detail:{likelihood:r,likelihoodLabel:b,consequence:g,consequenceLabel:u,score:c,level:t,levelLabel:i,containerId:l},bubbles:!0});d.dispatchEvent(m),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631: ${i} (${c})`),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Risk Matrix Selection:",{container:l,likelihood:`${b} (${r})`,consequence:`${u} (${g})`,score:c,level:`${i} (${t})`})},getRiskBackgroundColor(e){const l={low:"linear-gradient(135deg, #10b981 0%, #059669 100%)",medium:"linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",high:"linear-gradient(135deg, #f97316 0%, #ea580c 100%)",critical:"linear-gradient(135deg, #dc2626 0%, #991b1b 100%)"};return l[e]||l.low},getRiskExplanationText(e,l,d,r){return{\u0645\u0646\u062E\u0641\u0636:`\u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u064F\u0635\u0646\u0641 \u0636\u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0646\u062E\u0641\u0636\u0629 (${e} \u0646\u0642\u0627\u0637)\u060C \u062D\u064A\u062B \u0623\u0646 \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u062D\u062F\u0648\u062B\u0647 ${d} \u0648\u0627\u0644\u0639\u0648\u0627\u0642\u0628 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 ${r}. \u064A\u064F\u0646\u0635\u062D \u0628\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0648\u0636\u0639 \u0648\u0627\u062A\u062E\u0627\u0630 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0648\u0642\u0627\u0626\u064A\u0629 \u0628\u0633\u064A\u0637\u0629 \u0644\u062A\u062C\u0646\u0628 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u0627\u062F\u062B.`,\u0645\u062A\u0648\u0633\u0637:`\u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u064F\u0635\u0646\u0641 \u0636\u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629 (${e} \u0646\u0642\u0627\u0637)\u060C \u0645\u0645\u0627 \u064A\u0639\u0646\u064A \u0623\u0646 \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u062D\u062F\u0648\u062B\u0647 ${d} \u0648\u0627\u0644\u0639\u0648\u0627\u0642\u0628 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 ${r}. \u064A\u062A\u0637\u0644\u0628 \u0627\u0644\u0623\u0645\u0631 \u0627\u062A\u062E\u0627\u0630 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u062F\u0648\u0631\u064A\u0629 \u0644\u0636\u0645\u0627\u0646 \u0639\u062F\u0645 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u0627\u062F\u062B \u0623\u0648 \u062A\u0637\u0648\u0631\u0647 \u0625\u0644\u0649 \u062E\u0637\u0631 \u0623\u0639\u0644\u0649.`,\u0639\u0627\u0644\u064A:`\u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u064F\u0635\u0646\u0641 \u0636\u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0639\u0627\u0644\u064A\u0629 (${e} \u0646\u0642\u0627\u0637)\u060C \u062D\u064A\u062B \u0623\u0646 \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u062D\u062F\u0648\u062B\u0647 ${d} \u0648\u0627\u0644\u0639\u0648\u0627\u0642\u0628 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 ${r}. \u064A\u062A\u0637\u0644\u0628 \u0627\u062A\u062E\u0627\u0630 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0627\u062C\u0644\u0629 \u0648\u0634\u0627\u0645\u0644\u0629\u060C \u0645\u0639 \u0636\u0631\u0648\u0631\u0629 \u062A\u062E\u0635\u064A\u0635 \u0645\u0648\u0627\u0631\u062F \u0643\u0627\u0641\u064A\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0643\u062B\u0641\u0629 \u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0644\u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u0627\u062F\u062B.`,\u062D\u0631\u062C:`\u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u064F\u0635\u0646\u0641 \u0636\u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u062C\u0629 (${e} \u0646\u0642\u0627\u0637)\u060C \u0648\u0647\u0648 \u0623\u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u0649 \u062E\u0637\u0648\u0631\u0629! \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u062D\u062F\u0648\u062B\u0647 ${d} \u0648\u0627\u0644\u0639\u0648\u0627\u0642\u0628 ${r}. \u064A\u062A\u0637\u0644\u0628 \u062A\u062F\u062E\u0644\u0627\u064B \u0641\u0648\u0631\u064A\u0627\u064B \u0648\u0625\u064A\u0642\u0627\u0641 \u0623\u064A \u0623\u0646\u0634\u0637\u0629 \u0645\u0634\u0627\u0628\u0647\u0629 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0645\u0639\u0627\u0644\u062C\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629. \u064A\u062C\u0628 \u0631\u0641\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0641\u0648\u0631\u0627\u064B \u0645\u0639 \u062E\u0637\u0629 \u0639\u0645\u0644 \u0634\u0627\u0645\u0644\u0629.`}[l]||"\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629."}};(function(){"use strict";try{typeof window<"u"&&typeof RiskMatrix<"u"&&(window.RiskMatrix=RiskMatrix,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 RiskMatrix module loaded and available on window.RiskMatrix"))}catch{if(typeof window<"u"&&typeof RiskMatrix<"u")try{window.RiskMatrix=RiskMatrix}catch{}}})();
