
const hubID = "b.24d2d632-e01b-4ca0-b988-385be827cb04"
const account_id = "24d2d632-e01b-4ca0-b988-385be827cb04"
const bucketKey = "wip.dm.emea.2"
const projectID = "5d4652f8-1ac5-4b46-9956-5445396cd040"
const topFolder = "urn:adsk.wipemea:fs.folder:co.Pa3WAcebSmumgQaqMRhybg" // KELTBRAY - WIP Folder

let templateFolderID
let selectedOptionStartType
let uploadFileList

var AccessToken_DataCreate
var AccessToken_DataRead
var AccessToken_BucketCreate
let accessTokenDataWrite

let ProjectList =[]
let ProjectListRaw

let newProjectName
let subContractorsListHtml
let arraySelectedContractorArray = []; 
let access_token
let topFolderData
let createdFolders = []
let webhookFolders = []
let statusElement
let newFolderLink
let newFolderLinkBtn
let submitBtn

let regionFolders
let stateFolders
let regionFolderID
let stateFolderID

let regionList
let stateList
let jobDateInput
let jobCaseNumberInput
let jobAddressInput

let jobCaseNumberValue
let jobAddressValue

let folderListElement

const projectFolderStructure = [
    {folder:"01_Original Survey",parentFolder:"TOP_FOLDER",requireNS:"N"},
    {folder:"02_Survey_Pack",parentFolder:"TOP_FOLDER",requireNS:"Y"},
    {folder:"03_Safe Digs",parentFolder:"TOP_FOLDER",requireNS:"Y"},
    {folder:"04_Site Photos",parentFolder:"TOP_FOLDER",requireNS:"Y"},
    {folder:"05_Workpack",parentFolder:"TOP_FOLDER",requireNS:"Y"},
    {folder:"06_Completed Work Pack",parentFolder:"TOP_FOLDER",requireNS:"Y"},
    {folder:"07_Site Clearance",parentFolder:"TOP_FOLDER",requireNS:"N"},
    {folder:"08_Waste Management",parentFolder:"TOP_FOLDER",requireNS:"N"},
    {folder:"09_Jointers Sketch",parentFolder:"TOP_FOLDER",requireNS:"N"},
    {folder:"10_Commercial",parentFolder:"TOP_FOLDER",requireNS:"N"}
]

const CommercialFolders = [
    {folder:"BOQ",parentFolder:"10_Commercial"},

]
const permssions =[
    {level:"FullController",actions:["PUBLISH","PUBLISH_MARKUP","VIEW","DOWNLOAD","COLLABORATE","EDIT","CONTROL"]},
    {level:"Edit",actions:["PUBLISH","PUBLISH_MARKUP","VIEW","DOWNLOAD","COLLABORATE","EDIT"]},
    {level:"createFull",actions:["PUBLISH","PUBLISH_MARKUP","VIEW","DOWNLOAD","COLLABORATE"]},
    {level:"createPart",actions:["PUBLISH_MARKUP","VIEW","DOWNLOAD","COLLABORATE"]},
    {level:"viewFull",actions:["VIEW","DOWNLOAD","COLLABORATE"]},
    {level:"viewPart",actions:["VIEW","COLLABORATE"]}
];

const folderPermissionList =[
    {folderName:"01_Original Survey",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"02_Survey_Pack",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"03_Safe Digs",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"04_Site Photos",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"05_Workpack",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"06_Completed Work Pack",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"07_Site Clearance",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"08_Waste Management",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"09_Jointers Sketch",folderPermissions:[
        {name:"Keltbray",subjectId:"6b11172f-c01a-4fde-9abe-a3a12a978861",autodeskId:"",subjectType:"COMPANY",actions:"createFull"},
    ]},
    {folderName:"10_Commercial",folderPermissions:[
        {name:"Commercial Manager",subjectId:"56c32a83-be46-4aa6-a39e-45438be36e4a",autodeskId:"",subjectType:"ROLE",actions:"Edit"},
    ]},

]
document.addEventListener('DOMContentLoaded', function() {
    newFolderLinkBtn = document.getElementById('newFolderLinkBtn')
    submitBtn = document.getElementById('submitBtn')
    statusElement = document.getElementById('statusUpdate');
    regionList = document.getElementById('input_region');
    stateList = document.getElementById('input_state');
    jobCaseNumberInput = document.getElementById('input_caseNumber');
    jobAddressInput = document.getElementById('input_caseAddress');
    newFolderLinkBtn.style.display = "none"

    regionList.onchange = (event) => {
        regionFolderID = event.target.value;
        console.log("Region Folder ID",regionFolderID);
        getStateRegionData()
    }

    stateList.onchange = (event) => {
        stateFolderID = event.target.value;
        console.log("State Folder ID",stateFolderID);
    }
  });

  









