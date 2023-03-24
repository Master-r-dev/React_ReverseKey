(async ()=>{ 
    try { 
        document.addEventListener("u", async (e) => {   
            await browser.storage.local.set({ "s" : e.detail })
        });
        document.dispatchEvent(new CustomEvent("s", { detail: await browser.storage.local.get("s") })); 
    } catch (error) {
        document.getElementById("app").innerHTML =`Something went wrong with local storage/background script. Send message with description of your situation to solobutoalexey@gmail.com. Log:${error}`
    } 
})();
