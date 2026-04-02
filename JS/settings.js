// what i should add

/*
    create a setting for how the site should look
        dark mode
        light mode
    font size adjustment
    reset to default
    if the time in the header should appear or not
    change unit measurements (like metric to imperial or something idk)
    favourite categories/bookmarks
    scroll behaviour
        smooth
        instant

    other information

    this is just for the settings page, ties in with it.



*/

// getting storage sizes and whatnot
async function getStorageUsage() {
  if (!navigator.storage || !navigator.storage.estimate) {
    console.log("Storage API not supported");
    return;
  }
  // code i found off the internet
  const estimate = await navigator.storage.estimate();
  console.log(`Used: ${(estimate.usage / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Quota: ${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)} GB`);

  // parts where i changed, basically just setting the <p> tags to include the data
  let used = (estimate.usage / (1024 * 1024)).toFixed(2);
  let percent = (estimate.usage / estimate.quota * 100).toFixed(2);
  document.getElementById("storage").innerHTML = "IndexedDBStorage: " + used + "Mb";
  document.getElementById("storageUsed").innerHTML = "IndexedDB used Storage percentage: " + percent + "%";

  console.log(`Usage: ${(estimate.usage / estimate.quota * 100).toFixed(2)}%`);

  // Optional: Breakdown by storage type (Chrome/Edge/Opera only)
  if (estimate.usageDetails) {
    console.log("IndexedDB usage:", estimate.usageDetails.indexedDB);
  }
    // added inanother thing for local storage
    // working in local storage
    const localStorageSize = new Blob(Object.values(localStorage)).size;
    document.getElementById("localStorage").innerHTML = "Local Storage Size: " + (localStorageSize / 1024).toFixed(2) + ' KB';
    console.log((localStorageSize / 1024).toFixed(2) + ' KB'); // Size in KB

}

setInterval(getStorageUsage, 30000); //update the page periodically (every 30 seconds)






// essentially just a function to load things in the info section once, when loaded into the settings page
document.addEventListener("DOMContentLoaded", function () {
    getStorageUsage();    
});

// the actual settings form

// saves the form
function save() {
    // light/dark mode
    let darkOrLight = document.getElementById("light/darkMode").checked;
    localStorage.setItem("light/dark mode",darkOrLight);

    //scroll behaviour
    let smoothScrool = document.getElementById("scrollBehaviour").checked; //just realized i totally misspelled scroll but honestly dont car enought to change it
    localStorage.setItem("scrollBehaviour", smoothScrool);

    // if the time in the header should be enabled or disabled
    let time = document.getElementById("time").checked;
    localStorage.setItem("time", time);
}


// clearing the storage
document.getElementById("clrLclStr").addEventListener("click", onClick);

function onClick(){
    localStorage.clear();
    console.log("Local Storage Cleared");
    getStorageUsage();
}