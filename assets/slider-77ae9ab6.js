import{o as k,w as f,r as S,m as t,S as g,j as l,f as o,v as A}from"./index-619593df.js";import{S as E}from"./slider-item-41faa3e5.js";const N="_button_1kvuj_47",O="_button_left_1kvuj_91",y="_button_right_1kvuj_103",C="_text_1kvuj_115",s={"slider-container":"_slider-container_1kvuj_1","slider-outer-window":"_slider-outer-window_1kvuj_19","slider-inner-window":"_slider-inner-window_1kvuj_31",button:N,button_left:O,button_right:y,text:C},$=k(i=>{const c=f*2,h=c*100/o,_=f/c,r=i.filteredItems.length*f,x=r*100/o/h,I=r*x/100,u=r-o;let n=r-o;const d=(r-o)/c;S.useEffect(()=>{t.sliderStore.setRestWidth(u)},[i.filteredItems]),S.useEffect(()=>{t.sliderStore.restWidth+I<I?t.sliderStore.setFullTranslate(d*h):t.sliderStore.setFullTranslate(t.sliderStore.activeIndex*h)},[t.sliderStore.activeIndex]),S.useEffect(()=>{var e,m;if(((e=t.sliderStore.currentActiveItem)==null?void 0:e.sliderItemActivator)===g.FULL_LIST){for(let a=0;a<t.filtersDataStore.filteredWarships.length;a++)if(t.filtersDataStore.filteredWarships[a].warship===((m=t.sliderStore.currentActiveItem)==null?void 0:m.warship)){const W=a*_;W>=d?t.sliderStore.setActiveIndex(d):t.sliderStore.setActiveIndex(W);break}}},[t.sliderStore.currentActiveItem]);const v=e=>{e>d&&(e=d),e<0&&(e=0),t.sliderStore.setActiveIndex(e)},b=()=>{if(n=t.sliderStore.restWidth-r*10/100,n<=0){t.sliderStore.setRestWidth(0);return}t.sliderStore.setRestWidth(n)},w=()=>{if(n=t.sliderStore.restWidth+r*10/100,n>=u){t.sliderStore.setRestWidth(u);return}t.sliderStore.setRestWidth(n)},j=()=>{t.filtersDataStore.setVisibleItems(A),v(t.sliderStore.activeIndex+1),b()},R=()=>{v(t.sliderStore.activeIndex-1),w()};return l.jsxs("div",{className:s["slider-container"],children:[l.jsx("button",{className:`${s.button} ${s.button_left}`,disabled:t.sliderStore.activeIndex===0||i.filteredItems.length<1,onClick:R}),l.jsx("div",{className:s["slider-outer-window"],children:l.jsx("div",{className:s["slider-inner-window"],style:{transform:`translateX(-${t.sliderStore.fullTranslate}%)`},children:i.filteredItems.length>0?i.filteredItems.map(e=>l.jsx(E,{sliderItemStore:e},e==null?void 0:e.warship.id)):l.jsx("p",{className:s.text,children:"Nothing was found"})})}),l.jsx("button",{className:`${s.button} ${s.button_right}`,disabled:t.sliderStore.activeIndex===d||i.filteredItems.length<1||i.filteredItems.length<7,onClick:j})]})});export{$ as default};
