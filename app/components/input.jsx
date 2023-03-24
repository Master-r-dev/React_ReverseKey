const React = require("react");
const { useState , useRef, useEffect } = require("react");
const {layout_EngUkr,layout_EngGeo,layout_EngArm,layout_EngHeb,layout_EngHin,layout_EngGre,layout_EngArab,layout_EngJap,layout_EngRus}=require( "../layouts.jsx")
const list =["Ukranian | Українська","Georgian | ქართული","Armenian | հայերեն","Hebrew | עִברִית","Hindi | हिंदी","Greek | Ελληνικά","Arabic | عربي","Japanese | 日本語","russian | русский"]
 

function Input(){
    const [text,setText]=useState("");  
    const [select,setSelect]=useState("0") ;  
    const inp=useRef(null); 
    useEffect(() => { 
        document.addEventListener("s", (e) => {  
            setSelect(e.detail["s"])  
        });
        return () => {
            document.removeEventListener("s", (e) => {
                setSelect(e.detail["s"]);
            }); 
        };
    }, []);
    const translate = function() {  
        if (typeof inp.current === "undefined" || inp.current===null) return;
        let k,layout,n_text="";   
        switch (select) {
            case "0": 
                layout=layout_EngUkr;            
                break;
            case "1": 
                layout=layout_EngGeo; 
                break;
            case "2": 
                layout=layout_EngArm; 
                break; 
            case "3": 
                layout=layout_EngHeb; 
                break;
            case "4": 
                layout=layout_EngHin; 
                break;
            case "5": 
                layout=layout_EngGre; 
                break;
            case "6": 
                layout=layout_EngArab; 
                break;
            case "7": 
                layout=layout_EngJap; 
                break;
            case "8": 
                layout=layout_EngRus; 
                break;
            default: 
                setText("Something went wrong with loading layouts.\
                 Send message with description of your situation to solobutoalexey@gmail.com");
                return;             
        }  
        for (let y of inp.current.value){
            k=0;            
            for(let x of Object.keys(layout)){ 
                if(x==y){
                    n_text+=layout[x];
                    k=1;
                    break;
                }
                if (layout[x]==y){
                    n_text+=x;
                    k=1;
                    break;
                }
            }
            if (!k) n_text+=y;
        } 
        setText(n_text); 
    };
    const handleSelect= (e)=> {
        setSelect(e.target.value);  
        document.dispatchEvent(new CustomEvent("u", { detail: e.target.value })); 
    }  
    useEffect(() => {
      translate ()
    }, [select])   
    return (<div id="main">
                <select  onChange={handleSelect} >
                    {list.map((e,i)=><option value={i} selected={i==select ? 'selected' :''}>{e}</option>)} 
                </select>
                {select!="" ? (<input ref={inp} onKeyUp={translate}   />) : 
                (<input disabled  />)} 
                { text.length>0 ? (<div id="output">{text}</div>) : (<div style={{color:"grey"}}>Here will be the reverse...</div>) }
            </div>
    );
}
  
module.exports = Input;