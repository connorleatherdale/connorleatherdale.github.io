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





*/

async function getStorageUsage() {
  if (!navigator.storage || !navigator.storage.estimate) {
    console.log("Storage API not supported");
    return;
  }

  const estimate = await navigator.storage.estimate();
  console.log(`Used: ${(estimate.usage / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Quota: ${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)} GB`);
  let used = (estimate.usage / (1024 * 1024)).toFixed(2);
  let percent = (estimate.usage / estimate.quota * 100).toFixed(2);
  document.getElementById("storage").innerHTML = "IndexedDBStorage: " + used + "Mb";
  document.getElementById("storageUsed").innerHTML = "IndexedDB used Storage percentage: " + percent + "%";

  console.log(`Usage: ${(estimate.usage / estimate.quota * 100).toFixed(2)}%`);

  // Optional: Breakdown by storage type (Chrome/Edge/Opera only)
  if (estimate.usageDetails) {
    console.log("IndexedDB usage:", estimate.usageDetails.indexedDB);
  }
    // working in local storage
    const size = new Blob(Object.values(localStorage)).size;
    document.getElementById("localStorage").innerHTML = "Local Storage Size: " + (size / 1024).toFixed(2) + ' KB';
    console.log((size / 1024).toFixed(2) + ' KB'); // Size in KB

}






// essentially just a function to load things in the info section once, when loaded into the settings page
document.addEventListener("DOMContentLoaded", function () {
    getStorageUsage();    
});

// the actual settings form
function save() {
    let darkOrLight = document.getElementById("light/darkMode").checked;
    localStorage.setItem("light/dark mode",darkOrLight);
}


// clearing the storage
document.getElementById("clrLclStr").addEventListener("click", onClick) 

function onClick(){
    localStorage.clear();
    console.log("Local Storage Cleared");
    getStorageUsage();
}