browser.runtime.onInstalled.addListener(async() => {
    try { 
            await browser.storage.local.set({ "s" :"0"});            
            await browser.menus.create({
                id: "ReverseKey_b",
                title: "Reverse this text",
                contexts: ["selection"], 
            });
    }catch(e) {
        console.log(e);
    } 
});
browser.menus.onClicked.addListener( (info, tab) => { 
  if (info.menuItemId === "ReverseKey_b") { 
      try {
         browser.scripting.executeScript({
            target: {
              tabId: tab.id,
              allFrames: true,
            },
            files: ["content-script.js"],
          }).then(()=>{ 
              browser.tabs.sendMessage(tab.id, { eId: info.targetElementId , highlight: info.selectionText},{frameId:info.frameId}) 
          }); 
        } catch (err) {
          console.error(`failed to execute script: ${err}`);
        }   
  }  
});  
              
