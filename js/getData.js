onStart()



async function onStart(){
    access_token = await getAccessToken("data:read")
    await getRegionDropDownData()
}
async function getRegionDropDownData() {
    regionFolders = await getFolder(topFolder)
    regionFolders.data.forEach(element => {
        if(element.type == "folders" && element.attributes.name !== "0A.INCOMING" && element.attributes.name !== "0B.GENERAL"){
            var item = document.createElement('option');
            item.text = element.attributes.name
            item.value = element.id;
            regionList.appendChild(item);
        }
    });
}

async function getStateRegionData() {
    stateFolders = await getFolder(regionFolderID)
    stateFolders.data.forEach(element => {
        if(element.type == "folders"){
            var item = document.createElement('option');
            item.text = element.attributes.name
            item.value = element.id;
            stateList.appendChild(item);
        }
    });
}

async function getFolder(folderID){
 
    const bodyData = {

          }

    const headers = {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+access_token
    };

    const requestOptions = {
        method: 'GET',
        headers: headers,
        //body: JSON.stringify(bodyData)
    };

    const apiUrl = `https://developer.api.autodesk.com/data/v1/projects/b.${projectID}/folders/${folderID}/contents`;
    //console.log(apiUrl)
    console.log(requestOptions)
    responeData = await fetch(apiUrl,requestOptions)
        .then(response => response.json())
        .then(data => {
            const JSONdata = data

        //console.log(JSONdata)

        return JSONdata
        })
        .catch(error => console.error('Error fetching data:', error));


    return responeData
    }

async function getAccessToken(scopeInput){

    const bodyData = {
        scope: scopeInput,
        };

    const headers = {
        'Content-Type':'application/json'
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodyData)
    };

    const apiUrl = "https://prod-30.uksouth.logic.azure.com:443/workflows/df0aebc4d2324e98bcfa94699154481f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jHsW0eISklveK7XAJcG0nhfEnffX62AP0mLqJrtLq9c";
    //console.log(apiUrl)
    //console.log(requestOptions)
    signedURLData = await fetch(apiUrl,requestOptions)
        .then(response => response.json())
        .then(data => {
            const JSONdata = data

        //console.log(JSONdata)

        return JSONdata.access_token
        })
        .catch(error => console.error('Error fetching data:', error));


    return signedURLData
    }